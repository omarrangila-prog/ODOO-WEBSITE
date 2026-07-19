/**
 * Odoo CRM adapter.
 *
 * When ODOO_URL/ODOO_DB/ODOO_USER/ODOO_API_KEY are all set, `createOrUpdateLead`
 * talks to Odoo's external API (crm.lead model). When any is missing, it runs a
 * MOCK adapter that performs the same field mapping, duplicate check and history
 * attachment in memory — so the whole pipeline is testable without credentials.
 *
 * Duplicate handling: an existing open lead with the same email is UPDATED (notes
 * appended, score/interest refreshed) rather than duplicated.
 */

import type { ScoreResult, RoutingResult } from './leadScore';
import type { SessionData } from './session';

export interface LeadInput {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  companySize: string;
  currentSystems?: string;
  timeline?: string;
  budget?: string;
  challenge: string;
  services: string[];
  preferredContact: string;
  /** Separate from marketing consent — the person asked us to contact them. */
  contactPermission: boolean;
  marketingConsent: boolean;
}

/** Maps our lead + score + session to Odoo crm.lead fields. */
export function mapToOdooLead(
  lead: LeadInput,
  score: ScoreResult,
  routing: RoutingResult,
  session: SessionData | null,
): Record<string, unknown> {
  const first = session?.firstTouch;
  const last = session?.lastTouch;
  const desc = [
    lead.challenge,
    '',
    `Services: ${lead.services.join(', ')}`,
    `Timeline: ${lead.timeline || '—'}  Budget: ${lead.budget || '—'}`,
    `Current systems: ${lead.currentSystems || '—'}`,
    `Lead score: ${score.score} (${score.band}) — ${score.reasons.join('; ')}`,
    session
      ? `Anonymous history: ${session.pageViews} page views over ${session.visits} visit(s); interests: ${session.interestCategories.join(', ') || 'none'}`
      : 'No prior anonymous session.',
    first ? `First touch: ${first.landingPage} via ${utmStr(first.utm)} (ref: ${first.referrer || 'direct'})` : '',
    last ? `Last touch: ${last.page} via ${utmStr(last.utm)}` : '',
  ].join('\n');

  return {
    name: `${lead.company} — ${lead.services[0] ?? 'Odoo enquiry'}`,
    contact_name: lead.fullName,
    partner_name: lead.company,
    email_from: lead.email,
    phone: lead.phone,
    country_code: lead.country,
    description: desc,
    type: 'lead',
    priority: routing.priority === 'P1' ? '3' : routing.priority === 'P2' ? '2' : '1',
    // custom fields (x_*) are conventional for extra Odoo attributes
    x_lead_score: score.score,
    x_lead_band: score.band,
    x_sales_queue: routing.queue,
    x_utm_source: last?.utm.source ?? first?.utm.source ?? '',
    x_utm_campaign: last?.utm.campaign ?? first?.utm.campaign ?? '',
    x_marketing_consent: lead.marketingConsent,
    x_contact_permission: lead.contactPermission,
    x_anon_id: session?.anonId ?? '',
  };
}

function utmStr(utm: { source?: string; medium?: string; campaign?: string }): string {
  const parts = [utm.source, utm.medium, utm.campaign].filter(Boolean);
  return parts.length ? parts.join(' / ') : 'direct';
}

export interface CrmResult {
  ok: boolean;
  mode: 'live' | 'mock';
  action: 'created' | 'updated' | 'failed';
  leadId?: number | string;
  error?: string;
}

/* ---- In-memory mock store (dev/test) ---- */
const mockLeads = new Map<string, { id: number; fields: Record<string, unknown>; notes: string[] }>();
let mockSeq = 1000;
export function _resetMockCrm() { mockLeads.clear(); mockSeq = 1000; }

function hasCreds(): boolean {
  return Boolean(process.env.ODOO_URL && process.env.ODOO_DB && process.env.ODOO_USER && process.env.ODOO_API_KEY);
}

/**
 * Create or update an Odoo lead. `forceFail` lets tests exercise CRM failure.
 */
export async function createOrUpdateLead(
  fields: Record<string, unknown>,
  opts: { forceFail?: boolean } = {},
): Promise<CrmResult> {
  const mode: CrmResult['mode'] = hasCreds() ? 'live' : 'mock';

  if (opts.forceFail) {
    return { ok: false, mode, action: 'failed', error: 'CRM provider unavailable (simulated)' };
  }

  if (mode === 'mock') {
    const email = String(fields.email_from ?? '').toLowerCase();
    const existing = mockLeads.get(email);
    if (existing) {
      existing.fields = { ...existing.fields, ...fields };
      existing.notes.push(`Re-enquiry at ${new Date().toISOString()}`);
      return { ok: true, mode, action: 'updated', leadId: existing.id };
    }
    const id = ++mockSeq;
    mockLeads.set(email, { id, fields, notes: [] });
    return { ok: true, mode, action: 'created', leadId: id };
  }

  // LIVE path (Odoo JSON-RPC). Only runs when creds exist.
  try {
    const url = `${process.env.ODOO_URL}/jsonrpc`;
    const email = String(fields.email_from ?? '').toLowerCase();
    // 1) search existing open lead by email
    const existing = await odooCall(url, 'search', ['crm.lead', [['email_from', '=', email], ['type', '=', 'lead']]]);
    if (Array.isArray(existing) && existing.length > 0) {
      await odooCall(url, 'write', ['crm.lead', existing, fields]);
      return { ok: true, mode, action: 'updated', leadId: existing[0] };
    }
    const id = await odooCall(url, 'create', ['crm.lead', fields]);
    return { ok: true, mode, action: 'created', leadId: id as number };
  } catch (e) {
    return { ok: false, mode, action: 'failed', error: e instanceof Error ? e.message : 'CRM error' };
  }
}

/** Minimal Odoo JSON-RPC call (execute_kw). Live path only. */
async function odooCall(url: string, method: string, args: unknown[]): Promise<unknown> {
  const body = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'object',
      method: 'execute_kw',
      args: [process.env.ODOO_DB, Number(process.env.ODOO_UID ?? 2), process.env.ODOO_API_KEY, args[0], method, [args[1]], args[2] ?? {}],
    },
  };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: { message?: string } };
  if (json.error) throw new Error(json.error.message ?? 'Odoo RPC error');
  return json.result;
}
