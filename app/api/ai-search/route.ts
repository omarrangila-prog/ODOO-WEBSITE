import { NextResponse } from 'next/server';
import { aiSearchSchema, requestTypes, planChoices } from '@/lib/ai-search/request';
import { normalizeWebsite } from '@/lib/ai-search/website';
import { processLead } from '@/lib/leadintel/pipeline';
import { leadRef, cleanLandingPath } from '@/lib/leadintel/ref';
import type { SessionData } from '@/lib/leadintel/session';

export const runtime = 'nodejs';

/*
 * The AI Search enquiry endpoint.
 *
 * - zod validation, a honeypot and a per-address rate limit (in memory: replace with a shared store
 *   if the site ever runs on several instances);
 * - one-time token, so a double click or a retry after a slow response does not send twice;
 * - success is returned only after the notification email has actually been accepted by the mail
 *   provider. With no provider key a production build answers with an error rather than a false
 *   success; ODV_DRY_RUN=1 validates without sending, for local runs only;
 * - the website address is validated but never fetched.
 */

const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();
const seenTokens = new Map<string, number>();
const TOKEN_TTL = 15 * 60 * 1000;

function limited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  e.count += 1;
  return e.count > RATE_LIMIT;
}

function alreadySeen(token: string): boolean {
  const now = Date.now();
  for (const [t, at] of seenTokens) if (now - at > TOKEN_TTL) seenTokens.delete(t);
  if (seenTokens.has(token)) return true;
  seenTokens.set(token, now);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (limited(ip)) {
      return NextResponse.json({ ok: false, error: 'Too many requests from this connection. Please try again in a few minutes, or email us.' }, { status: 429 });
    }

    const form = await req.formData();
    const get = (k: string) => String(form.get(k) ?? '');
    const raw = {
      fullName: get('fullName'),
      email: get('email'),
      website: get('website'),
      requestType: get('requestType'),
      company: get('company'),
      market: get('market'),
      competitors: get('competitors'),
      plan: get('plan'),
      problem: get('problem'),
      consent: get('consent') === 'true',
      marketingConsent: get('marketingConsent'),
      token: get('token'),
      nickname: get('nickname'),
    };

    // Honeypot: look accepted, do nothing.
    if (raw.nickname) return NextResponse.json({ ok: true });

    const parsed = aiSearchSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your details and try again.' }, { status: 400 });
    }
    const d = parsed.data;

    // A repeat of a token that was already accepted: acknowledge without sending again.
    if (alreadySeen(d.token)) return NextResponse.json({ ok: true, duplicate: true });

    const site = normalizeWebsite(d.website);
    const requestLabel = requestTypes.find((r) => r.id === d.requestType)!.label;
    const planLabel = planChoices.find((p) => p.id === d.plan)?.label;

    const ref = leadRef();
    const landing = cleanLandingPath(form.get('landingPage'));
    let session: SessionData | null = null;
    try {
      const raw = String(form.get('sessionData') ?? '');
      session = raw && raw.length <= 8000 ? (JSON.parse(raw) as SessionData) : null;
    } catch {
      session = null;
    }

    const lines = [
      `Reference: ${ref}`,
      ...(landing ? [`Sent from: ${landing}`] : []),
      '',
      `AI Search enquiry from ${d.fullName}${d.company ? ` (${d.company})` : ''}`,
      '',
      `Request: ${requestLabel}`,
      ...(planLabel && d.requestType !== 'free-review' ? [`Plan of interest: ${planLabel}`] : []),
      `Email: ${d.email}`,
      `Website: ${site.ok ? site.url : d.website}`,
      ...(d.market ? [`Target country / language: ${d.market}`] : []),
      ...(d.competitors ? [`Competitors named: ${d.competitors}`] : []),
      '',
      'Visibility problem, in their words:',
      d.problem || '(not provided)',
      '',
      'Nothing has been charged. A paid audit or plan starts only after a written scope is agreed.',
    ].join('\n');

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      if (process.env.NODE_ENV === 'production' && process.env.ODV_DRY_RUN !== '1') {
        seenTokens.delete(d.token);
        throw new Error('Email delivery is not configured');
      }
      console.info('[ai-search] DRY RUN: validated, nothing sent', { requestType: d.requestType, plan: d.plan || null });
    } else {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? 'website@odoovations.com',
          to: process.env.CONTACT_TO_EMAIL ?? 'hello@odoovations.com',
          reply_to: d.email,
          subject: `[${ref}] AI Search enquiry (${requestLabel}${planLabel && d.requestType !== 'free-review' ? `, ${planLabel}` : ''}) — ${d.company || d.fullName}`,
          text: lines,
        }),
      });
      if (!res.ok) {
        seenTokens.delete(d.token); // let them retry the same form
        throw new Error('Email delivery failed');
      }
    }

    // The lead pipeline (CRM record, acknowledgement) is best effort and never blocks the answer.
    const marketingConsent = d.marketingConsent === true || d.marketingConsent === 'true';
    try {
      await processLead(
        {
          fullName: d.fullName,
          company: d.company,
          email: d.email,
          country: d.market,
          challenge: `Reference ${ref}${landing ? `, sent from ${landing}` : ''}.\n${requestLabel}${planLabel ? ` (${planLabel})` : ''}. Website: ${site.ok ? site.url : d.website}.\n\n${d.problem || ''}`.trim(),
          services: ['AI Search (AEO / GEO)'],
          preferredContact: 'email',
          contactPermission: d.consent,
          marketingConsent,
        },
        session,
      );
    } catch {
      /* downstream failures must not turn an accepted enquiry into an error */
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'We could not send your request. Please try again, or email hello@odoovations.com or message us on WhatsApp.' }, { status: 500 });
  }
}
