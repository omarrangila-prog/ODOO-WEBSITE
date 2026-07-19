/**
 * Lead scoring + salesperson routing (pure, testable).
 *
 * Score 0–100 from firmographics + intent + engagement. Higher = hotter.
 * Routing assigns a salesperson queue by primary interest + score band.
 * No PII beyond what the lead voluntarily provided is used.
 */

export interface ScoreInput {
  industry?: string;
  companySize?: string;
  services?: string[];
  timeline?: string;
  budget?: string;
  country?: string;
  // engagement (from anonymous session, attached on identify)
  pageViews?: number;
  visits?: number;
  interestCategories?: string[];
}

export interface ScoreResult {
  score: number;
  band: 'hot' | 'warm' | 'cool';
  reasons: string[];
}

const HIGH_VALUE_SERVICES = ['Odoo Implementation', 'Custom Odoo Development', 'Odoo Integration', 'Odoo Migration'];
const HIGH_VALUE_INDUSTRIES = ['Manufacturing', 'Textile', 'Textile & Apparel', 'Distribution', 'Pharmaceuticals'];

export function scoreLead(i: ScoreInput): ScoreResult {
  let score = 0;
  const reasons: string[] = [];

  // Timeline (urgency) — up to 25
  if (i.timeline === 'As soon as possible') { score += 25; reasons.push('Urgent timeline (+25)'); }
  else if (i.timeline === 'Within 1–3 months') { score += 18; reasons.push('1–3 month timeline (+18)'); }
  else if (i.timeline === 'Within 3–6 months') { score += 10; reasons.push('3–6 month timeline (+10)'); }
  else if (i.timeline === 'Just exploring') { score += 3; reasons.push('Exploring (+3)'); }

  // Budget signal — up to 20
  if (i.budget === 'Large / multi-module') { score += 20; reasons.push('Large budget (+20)'); }
  else if (i.budget === 'Mid-size project') { score += 13; reasons.push('Mid-size budget (+13)'); }
  else if (i.budget === 'Small / starter scope') { score += 6; reasons.push('Starter budget (+6)'); }

  // Company size — up to 15
  if (/(201|500|1000|\+)/.test(i.companySize ?? '')) { score += 15; reasons.push('Large company (+15)'); }
  else if (/(51|100|200)/.test(i.companySize ?? '')) { score += 10; reasons.push('Mid company (+10)'); }
  else if (i.companySize) { score += 5; reasons.push('SMB (+5)'); }

  // Services requested — up to 15
  const hvServices = (i.services ?? []).filter((s) => HIGH_VALUE_SERVICES.includes(s)).length;
  if (hvServices > 0) { const pts = Math.min(15, hvServices * 8); score += pts; reasons.push(`High-value service(s) (+${pts})`); }

  // Industry fit — up to 10
  if (HIGH_VALUE_INDUSTRIES.some((h) => (i.industry ?? '').includes(h))) { score += 10; reasons.push('Priority industry (+10)'); }

  // Engagement — up to 15
  const pv = i.pageViews ?? 0;
  const eng = Math.min(10, Math.floor(pv / 2));
  if (eng > 0) { score += eng; reasons.push(`Engagement: ${pv} page views (+${eng})`); }
  if ((i.visits ?? 0) > 1) { score += 5; reasons.push('Returning visitor (+5)'); }

  score = Math.min(100, score);
  const band: ScoreResult['band'] = score >= 65 ? 'hot' : score >= 40 ? 'warm' : 'cool';
  return { score, band, reasons };
}

export interface RoutingResult {
  queue: string;
  salesperson: string;
  priority: 'P1' | 'P2' | 'P3';
}

/**
 * Route by primary interest + score band. Queues map to Odoo sales teams; the
 * salesperson placeholders are replaced by real user ids/emails in production.
 */
export function routeLead(input: ScoreInput, result: ScoreResult): RoutingResult {
  const interests = input.interestCategories ?? [];
  const primary =
    interests.includes('fbr-compliance') ? 'compliance' :
    interests.includes('custom-development') ? 'development' :
    interests.includes('ai-automation') ? 'automation' :
    interests.includes('integration') || interests.includes('crm-communication') ? 'integration' :
    'implementation';

  const queueByInterest: Record<string, { queue: string; owner: string }> = {
    compliance: { queue: 'FBR & Compliance', owner: 'SALES_COMPLIANCE' },
    development: { queue: 'Custom Development', owner: 'SALES_DEV' },
    automation: { queue: 'AI & Automation', owner: 'SALES_AUTOMATION' },
    integration: { queue: 'Integration & CRM', owner: 'SALES_INTEGRATION' },
    implementation: { queue: 'Implementation', owner: 'SALES_IMPLEMENTATION' },
  };

  const { queue, owner } = queueByInterest[primary]!;
  const priority = result.band === 'hot' ? 'P1' : result.band === 'warm' ? 'P2' : 'P3';
  return { queue, salesperson: owner, priority };
}
