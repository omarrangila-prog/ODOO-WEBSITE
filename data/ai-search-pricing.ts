/**
 * ODOOVATIONS AI SEARCH: THE ONE PRICING CONFIGURATION
 *
 * Every price, limit and term shown anywhere on the site (the pricing page, the audit page, the
 * hub's preview, the enquiry form's plan list, the Offer markup in the page's JSON-LD, llms.txt)
 * is read from this file. Change a number here and every page follows; `scripts/ai-search-check.ts`
 * fails the build checks if a page and this file disagree.
 *
 * STATUS: proposed launch offers, set by management for this launch. They are not market averages
 * and the site does not describe them as such. Prices are in USD, before taxes. A fixed PKR quotation
 * is available on request; no live currency conversion is shown or implied.
 *
 * What is deliberately NOT here: the company's internal commercial targets (kept in
 * audit/ai-search/delivery-model.md, never published), customer results, and anything that would turn a
 * plan button into a checkout. A plan button starts a conversation; no billing workflow exists yet.
 */

import { pkr, pkrNote } from './currency';

export const CURRENCY = 'USD';

export type PlanId = 'audit' | 'foundation' | 'growth' | 'authority' | 'enterprise';

/** The places visibility is measured. Names identify where we look; they imply no partnership or endorsement. */
export const searchExperiences = [
  { id: 'chatgpt', label: 'ChatGPT search' },
  { id: 'google', label: 'Google AI Overviews and AI Mode' },
  { id: 'perplexity', label: 'Perplexity' },
  { id: 'copilot', label: 'Microsoft Copilot' },
] as const;

export const experienceNotice =
  'Platform names identify where visibility is measured. ODOOVATIONS is not a partner of, and is not endorsed by, any of these companies. The agreed set can change as products change.';

export interface Plan {
  id: PlanId;
  name: string;
  /** USD amount; null for a custom quote. */
  price: number | null;
  cadence: 'one-time' | 'month' | 'quote';
  /** One line under the name. */
  forWho: string;
  /** What is included, in the order a buyer reads it. */
  includes: string[];
  /** The comparison-table row values for this plan. */
  facts: Record<FactKey, string>;
  cta: string;
  /** Target for a one-time report; a delivery commitment, not a promise of results. */
  delivery?: string;
}

export type FactKey =
  | 'sites'
  | 'markets'
  | 'questions'
  | 'experiences'
  | 'content'
  | 'technical'
  | 'brand'
  | 'competitors'
  | 'outreach'
  | 'measurement'
  | 'calls'
  | 'term';

export const factRows: { key: FactKey; label: string; hint?: string }[] = [
  { key: 'sites', label: 'Websites' },
  { key: 'markets', label: 'Markets and languages' },
  { key: 'questions', label: 'Agreed buyer questions', hint: 'The questions a buyer would ask, agreed with you, that we test and report on.' },
  { key: 'experiences', label: 'Search experiences measured' },
  { key: 'content', label: 'Content units each month', hint: 'A content unit is one agreed new page or one substantial improvement to an existing page.' },
  { key: 'technical', label: 'Technical work' },
  { key: 'brand', label: 'Brand and entity consistency' },
  { key: 'competitors', label: 'Competitors tracked' },
  { key: 'outreach', label: 'Outreach' },
  { key: 'measurement', label: 'Measurement and reporting' },
  { key: 'calls', label: 'Calls' },
  { key: 'term', label: 'Commitment' },
];

const dash = 'Not included';

export const plans: Plan[] = [
  {
    id: 'audit',
    name: 'AI Search Audit',
    price: 390,
    cadence: 'one-time',
    forWho: 'A dated baseline and a written plan, with no ongoing commitment.',
    includes: [
      'One website and one target market and language',
      'Up to 20 buyer questions',
      'Three search experiences',
      'Up to three competitors',
      'Technical and content review',
      'A dated visibility baseline',
      'A prioritised written action plan',
      'One 30-minute review call',
    ],
    facts: {
      sites: '1',
      markets: '1',
      questions: 'Up to 20',
      experiences: '3',
      content: dash,
      technical: 'Review and recommendations',
      brand: 'Reviewed in the plan',
      competitors: 'Up to 3',
      outreach: dash,
      measurement: 'One dated baseline',
      calls: 'One 30-minute review call',
      term: 'One-time',
    },
    cta: 'Ask about the audit',
    delivery: 'Target delivery: five business days after the information we need has been received. That is a commitment about when you get the report, not a promise of search results.',
  },
  {
    id: 'foundation',
    name: 'Foundation',
    price: 1250,
    cadence: 'month',
    forWho: 'Fix the basics and publish steadily, with a monthly report.',
    includes: [
      'One website and one target market and language',
      '20 agreed buyer questions across three search experiences',
      'Two substantial content units each month',
      'Priority technical work within a defined capacity',
      'A monthly report and one review call',
    ],
    facts: {
      sites: '1',
      markets: '1',
      questions: '20',
      experiences: '3',
      content: '2',
      technical: 'Priority work within a defined capacity',
      brand: dash,
      competitors: dash,
      outreach: dash,
      measurement: 'Monthly report',
      calls: 'One review call each month',
      term: 'Initial 90 days, then monthly',
    },
    cta: 'Discuss Foundation',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 2000,
    cadence: 'month',
    forWho: 'The full programme for one market, with weekly measurement.',
    includes: [
      'One website and one target market and language',
      '40 agreed buyer questions across three search experiences',
      'Four substantial content units each month',
      'Technical and structured-data improvements',
      'Brand consistency work',
      'Up to three tracked competitors',
      'Relevant outreach, with the agreed activity scope',
      'Weekly measurement snapshots',
      'A monthly report and one strategy call',
    ],
    facts: {
      sites: '1',
      markets: '1',
      questions: '40',
      experiences: '3',
      content: '4',
      technical: 'Technical and structured-data improvements',
      brand: 'Included',
      competitors: 'Up to 3',
      outreach: 'Relevant outreach, agreed scope',
      measurement: 'Weekly snapshots and a monthly report',
      calls: 'One strategy call each month',
      term: 'Initial 90 days, then monthly',
    },
    cta: 'Discuss Growth',
  },
  {
    id: 'authority',
    name: 'Authority',
    price: 3500,
    cadence: 'month',
    forWho: 'More questions, more content and a second market where capacity allows.',
    includes: [
      'One website',
      'Up to two agreed markets and languages, where resources support delivery',
      '80 agreed questions across four search experiences',
      'Six substantial content units each month',
      'Broader technical and authority work',
      'Up to five tracked competitors',
      'Monthly reporting and two review calls',
    ],
    facts: {
      sites: '1',
      markets: 'Up to 2, where resources support delivery',
      questions: '80',
      experiences: '4',
      content: '6',
      technical: 'Broader technical and authority work',
      brand: 'Included in the authority work',
      competitors: 'Up to 5',
      outreach: 'Included in the authority work',
      measurement: 'Monthly reporting',
      calls: 'Two review calls each month',
      term: 'Initial 90 days, then monthly',
    },
    cta: 'Discuss Authority',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    cadence: 'quote',
    forWho: 'Several sites, markets or teams, scoped and quoted individually.',
    includes: [
      'Scope, capacity and measurement agreed before a quote',
      'Several websites, markets or languages, where resources support delivery',
      'Specialist expert input and translation scoped separately',
    ],
    facts: {
      sites: 'By agreement',
      markets: 'By agreement',
      questions: 'By agreement',
      experiences: 'By agreement',
      content: 'By agreement',
      technical: 'By agreement',
      brand: 'By agreement',
      competitors: 'By agreement',
      outreach: 'By agreement',
      measurement: 'By agreement',
      calls: 'By agreement',
      term: 'By agreement',
    },
    cta: 'Request a quote',
  },
];

export const monthlyPlans = plans.filter((p) => p.cadence === 'month');
export const getPlan = (id: string | null | undefined) => plans.find((p) => p.id === id);

export const contentUnit =
  'A content unit is one agreed new page, or one substantial improvement to an existing page. Complexity is agreed before production, so a unit is never open-ended.';

export const capacityNote =
  'Technical work is delivered within a defined monthly capacity that is agreed in writing. Nothing here is unlimited, and work beyond the agreed capacity is quoted before it is started.';

export const terms: { title: string; body: string }[] = [
  { title: 'Programme length', body: 'Monthly plans start with a 90-day programme, then renew monthly.' },
  { title: 'Cancelling', body: 'After the initial 90 days, cancel with 30 days’ notice.' },
  { title: 'Taxes and third-party costs', body: 'Prices exclude taxes. Any third-party cost is shown to you and approved before it is incurred.' },
  { title: 'Monitoring', body: 'Monitoring within the agreed scope is included in the monthly price.' },
  { title: 'Scoped separately', body: 'Translation, specialist expert input and publisher or directory charges are scoped separately and agreed first.' },
  { title: 'Currency', body: pkrNote },
  { title: 'Starting', body: 'A plan begins after a written scope is agreed. There is no online checkout: every plan button starts a conversation, and submitting an enquiry is free.' },
];

export const outcomeNotice =
  'The packages describe work and measurement, not results. No one can guarantee that an AI assistant will mention or cite a business, and we do not.';

export function formatPrice(p: Plan): string {
  if (p.price === null) return 'Custom quote';
  const n = `${CURRENCY} ${p.price.toLocaleString('en-US')}`;
  return p.cadence === 'month' ? `${n}/month` : n;
}

/** Short price for compact places (menus, cards): "USD 1,250/mo". */
export function formatPriceShort(p: Plan): string {
  if (p.price === null) return 'Custom quote';
  const n = `${CURRENCY} ${p.price.toLocaleString('en-US')}`;
  return p.cadence === 'month' ? `${n}/mo` : n;
}

/** Indicative rupee figure for a plan, at the dated rate in data/currency.ts. */
export function formatPkr(p: Plan): string {
  if (p.price === null) return '';
  return p.cadence === 'month' ? `≈ ${pkr(p.price)}/month` : `≈ ${pkr(p.price)}`;
}
