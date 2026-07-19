/**
 * Lead pipeline orchestration: identify → CRM → score → route → email.
 * Pure/awaitable; no framework dependency, so it is unit-testable and reusable
 * from the contact API route.
 */

import { scoreLead, routeLead, type ScoreInput } from './leadScore';
import { mapToOdooLead, createOrUpdateLead, type LeadInput, type CrmResult } from './crm';
import { runPostLeadEmails, type AutomationOutcome } from './emailAutomation';
import type { SessionData } from './session';

export interface PipelineResult {
  ok: boolean;
  score: number;
  band: string;
  queue: string;
  crm: CrmResult;
  email: AutomationOutcome;
  degraded: boolean; // true if CRM or email failed but the enquiry was still captured
}

export async function processLead(
  lead: LeadInput,
  session: SessionData | null,
  opts: { forceCrmFail?: boolean; forceEmailFail?: boolean } = {},
): Promise<PipelineResult> {
  const scoreInput: ScoreInput = {
    industry: lead.industry,
    companySize: lead.companySize,
    services: lead.services,
    timeline: lead.timeline,
    budget: lead.budget,
    country: lead.country,
    pageViews: session?.pageViews,
    visits: session?.visits,
    interestCategories: session?.interestCategories,
  };

  const score = scoreLead(scoreInput);
  const routing = routeLead(scoreInput, score);

  const fields = mapToOdooLead(lead, score, routing, session);
  const crm = await createOrUpdateLead(fields, { forceFail: opts.forceCrmFail });

  const email = await runPostLeadEmails({
    email: lead.email,
    marketingConsent: lead.marketingConsent,
    contactPermission: lead.contactPermission,
    opts: { forceFailTransactional: opts.forceEmailFail },
  });

  const degraded = !crm.ok || !email.transactional.ok;
  return {
    ok: true, // the enquiry is always captured, even if downstream is degraded
    score: score.score,
    band: score.band,
    queue: routing.queue,
    crm,
    email,
    degraded,
  };
}
