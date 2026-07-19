/**
 * ODOOVATIONS — Topic / Demand-Intelligence model (file-based, editor-approved).
 *
 * This is the honest, deployable form of the "trend intelligence" system:
 *  - Topics live here as typed data. An editor edits this file (or a PR) to move
 *    a topic through the workflow — that IS the approval workflow.
 *  - Only topics with status 'published' AND not past `expiresOn` render publicly.
 *  - Scores are computed by an explicit, documented formula (see `scoreTopic`),
 *    NOT from a live scrape or an unverified Trends API.
 *  - Freshness labels are transparent ('New guide', 'Updated', 'Compliance update',
 *    'Popular question', 'Rising topic'). 'Rising topic' should only be used when a
 *    real evidence source (GSC / uploaded Trends CSV) is cited in `sources`.
 *
 * NO fake popularity percentages or "N searches today" labels are stored or shown.
 * `trendScore` is a RELATIVE 0–100 editor estimate, never presented as search volume.
 */

export type TopicStatus =
  | 'detected'
  | 'under_review'
  | 'approved'
  | 'drafted'
  | 'fact_checked'
  | 'published'
  | 'archived';

export type FreshnessLabel =
  | 'New guide'
  | 'Updated'
  | 'Compliance update'
  | 'Popular question'
  | 'Rising topic';

export type TopicCluster =
  | 'Compliance'
  | 'AI & Automation'
  | 'CRM & Communication'
  | 'Core ERP'
  | 'Industry';

export interface TopicScores {
  /** 0–100 each; editor-assigned from evidence. Overall is computed. */
  odooRelevance: number;
  commercialIntent: number;
  pakistanRelevance: number;
  trendMomentum: number; // relative estimate, NOT search volume
  searchConsoleOpportunity: number; // 0 until GSC data exists
  sourceConfidence: number;
  freshness: number;
}

export interface Topic {
  id: string;
  title: string; // card title
  shortAnswer: string; // answer-first summary shown on the card
  whyItMatters: string;
  cluster: TopicCluster;
  freshnessLabel: FreshnessLabel;
  readMinutes: number;
  /** Where this topic routes on click (existing service/solution/resource page). */
  targetHref: string;
  ctaLabel: string;
  relatedService: string;
  sources: { label: string; url: string }[]; // credible references
  scores: TopicScores;
  status: TopicStatus;
  detectedOn: string; // ISO
  lastCheckedOn: string; // ISO
  expiresOn: string | null; // null = evergreen
  homepage: boolean; // editor may keep a published topic off the homepage
}

/** Documented weighting from the brief. Sums to 1.0. */
export const SCORE_WEIGHTS = {
  odooRelevance: 0.3,
  commercialIntent: 0.25,
  pakistanRelevance: 0.15,
  trendMomentum: 0.1,
  searchConsoleOpportunity: 0.1,
  sourceConfidence: 0.05,
  freshness: 0.05,
} as const;

/** Overall priority score 0–100. */
export function scoreTopic(s: TopicScores): number {
  const total =
    s.odooRelevance * SCORE_WEIGHTS.odooRelevance +
    s.commercialIntent * SCORE_WEIGHTS.commercialIntent +
    s.pakistanRelevance * SCORE_WEIGHTS.pakistanRelevance +
    s.trendMomentum * SCORE_WEIGHTS.trendMomentum +
    s.searchConsoleOpportunity * SCORE_WEIGHTS.searchConsoleOpportunity +
    s.sourceConfidence * SCORE_WEIGHTS.sourceConfidence +
    s.freshness * SCORE_WEIGHTS.freshness;
  return Math.round(total);
}

export function priorityBand(score: number): 'High' | 'Resource' | 'Monitor' | 'Hold' {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Resource';
  if (score >= 40) return 'Monitor';
  return 'Hold';
}

// ---------------------------------------------------------------------------
// TOPICS. Edit this list to run the workflow. Only `published` + not-expired +
// homepage:true are shown on the homepage trending module.
// ---------------------------------------------------------------------------
export const topics: Topic[] = [
  {
    id: 'fbr-digital-invoicing',
    title: 'FBR Digital Invoicing: What Pakistani Businesses Should Prepare',
    shortAnswer:
      'FBR is expanding digital/e-invoicing requirements. Your billing, POS and sales data need to be structured and connectable — which is exactly where a well-configured Odoo system helps.',
    whyItMatters:
      'Businesses that get their invoicing data in order early avoid last-minute scrambles and manual rework.',
    cluster: 'Compliance',
    freshnessLabel: 'Compliance update',
    readMinutes: 6,
    targetHref: '/solutions/fbr-digital-invoicing-pakistan',
    ctaLabel: 'Plan FBR-ready invoicing',
    relatedService: 'Odoo Integration',
    sources: [{ label: 'Federal Board of Revenue (official)', url: 'https://www.fbr.gov.pk/' }],
    scores: {
      odooRelevance: 85,
      commercialIntent: 90,
      pakistanRelevance: 100,
      trendMomentum: 70,
      searchConsoleOpportunity: 0,
      sourceConfidence: 90,
      freshness: 90,
    },
    status: 'published',
    detectedOn: '2026-07-01',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: true,
  },
  {
    id: 'odoo-whatsapp-integration',
    title: 'Odoo + WhatsApp: Automate Sales and Support Conversations',
    shortAnswer:
      'Connect WhatsApp to Odoo so orders, follow-ups and payment reminders flow into your CRM instead of living in scattered chats.',
    whyItMatters:
      'Most Pakistani businesses run sales on WhatsApp. Connecting it to Odoo keeps a real record and automates follow-up.',
    cluster: 'CRM & Communication',
    freshnessLabel: 'Popular question',
    readMinutes: 5,
    targetHref: '/solutions/odoo-whatsapp-integration',
    ctaLabel: 'Explore WhatsApp integration',
    relatedService: 'Odoo Integration',
    sources: [{ label: 'ODOOVATIONS integration practice', url: '/services/odoo-integration' }],
    scores: {
      odooRelevance: 90,
      commercialIntent: 85,
      pakistanRelevance: 95,
      trendMomentum: 65,
      searchConsoleOpportunity: 0,
      sourceConfidence: 80,
      freshness: 75,
    },
    status: 'published',
    detectedOn: '2026-06-20',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: true,
  },
  {
    id: 'odoo-ai-agents',
    title: 'Odoo AI Agents: What They Can Realistically Automate',
    shortAnswer:
      'AI-assisted dashboards and agents can surface anomalies, draft summaries and speed up reporting on top of your Odoo data — useful when the underlying system is clean.',
    whyItMatters:
      'AI adds most value after your operations are connected in one system, not before.',
    cluster: 'AI & Automation',
    freshnessLabel: 'New guide',
    readMinutes: 5,
    targetHref: '/solutions/odoo-ai-agents',
    ctaLabel: 'Explore Odoo AI dashboards',
    relatedService: 'AI Dashboards',
    sources: [{ label: 'ODOOVATIONS AI dashboards service', url: '/services/odoo-ai-dashboards' }],
    scores: {
      odooRelevance: 80,
      commercialIntent: 75,
      pakistanRelevance: 70,
      trendMomentum: 80,
      searchConsoleOpportunity: 0,
      sourceConfidence: 75,
      freshness: 85,
    },
    status: 'published',
    detectedOn: '2026-07-05',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: true,
  },
  {
    id: 'odoo-community-vs-enterprise',
    title: 'Odoo Community vs Enterprise: Which Edition Fits',
    shortAnswer:
      'Community is free and self-hosted with fewer features; Enterprise adds features, support and hosting for a per-user subscription. The right choice follows your feature list.',
    whyItMatters: 'Choosing the wrong edition early leads to avoidable migration later.',
    cluster: 'Core ERP',
    freshnessLabel: 'Updated',
    readMinutes: 5,
    targetHref: '/resources/odoo-community-vs-enterprise',
    ctaLabel: 'Compare editions',
    relatedService: 'Odoo Implementation',
    sources: [{ label: 'ODOOVATIONS comparison guide', url: '/resources/odoo-community-vs-enterprise' }],
    scores: {
      odooRelevance: 85,
      commercialIntent: 70,
      pakistanRelevance: 75,
      trendMomentum: 55,
      searchConsoleOpportunity: 0,
      sourceConfidence: 85,
      freshness: 70,
    },
    status: 'published',
    detectedOn: '2026-05-10',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: true,
  },
  {
    id: 'excel-to-odoo-migration',
    title: 'Migrating from Excel to Odoo Without Losing Data',
    shortAnswer:
      'Clean, map and validate your spreadsheets before go-live so your new system starts with numbers your team trusts.',
    whyItMatters: 'Messy data migrated unchanged is the fastest way to lose trust in a new ERP.',
    cluster: 'Core ERP',
    freshnessLabel: 'Popular question',
    readMinutes: 6,
    targetHref: '/resources/odoo-data-migration-checklist',
    ctaLabel: 'See the migration checklist',
    relatedService: 'Odoo Migration',
    sources: [{ label: 'ODOOVATIONS migration checklist', url: '/resources/odoo-data-migration-checklist' }],
    scores: {
      odooRelevance: 80,
      commercialIntent: 78,
      pakistanRelevance: 80,
      trendMomentum: 50,
      searchConsoleOpportunity: 0,
      sourceConfidence: 85,
      freshness: 65,
    },
    status: 'published',
    detectedOn: '2026-05-02',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: true,
  },
  // Example of a topic held back from publishing (workflow demonstration).
  {
    id: 'odoo-pos-fbr',
    title: 'Connecting Odoo POS to FBR Systems',
    shortAnswer: 'Retail POS data needs to be structured for digital invoicing submission.',
    whyItMatters: 'Retailers face specific POS-level compliance considerations.',
    cluster: 'Compliance',
    freshnessLabel: 'Compliance update',
    readMinutes: 5,
    targetHref: '/solutions/fbr-digital-invoicing-pakistan',
    ctaLabel: 'Discuss POS compliance',
    relatedService: 'Odoo Integration',
    sources: [{ label: 'Federal Board of Revenue (official)', url: 'https://www.fbr.gov.pk/' }],
    scores: {
      odooRelevance: 80,
      commercialIntent: 85,
      pakistanRelevance: 95,
      trendMomentum: 60,
      searchConsoleOpportunity: 0,
      sourceConfidence: 70,
      freshness: 80,
    },
    status: 'under_review', // NOT published — will not render
    detectedOn: '2026-07-14',
    lastCheckedOn: '2026-07-16',
    expiresOn: null,
    homepage: false,
  },
];

/** Topics that may render publicly: published, not expired. */
export function publicTopics(now: Date = new Date()): Topic[] {
  return topics
    .filter((t) => t.status === 'published')
    .filter((t) => !t.expiresOn || new Date(t.expiresOn) > now)
    .sort((a, b) => scoreTopic(b.scores) - scoreTopic(a.scores));
}

/** Homepage trending module: top published topics flagged for homepage (3–6). */
export function homepageTopics(now: Date = new Date()): Topic[] {
  return publicTopics(now)
    .filter((t) => t.homepage)
    .slice(0, 6);
}
