/**
 * THE SERVICE CONTENT MODEL
 *
 * One typed record per public service page (brief section 12). Packages are not written per page: a record
 * names a pricing blueprint, gives the three public tier names, and may override single fields of a tier.
 * `lib/catalogue/resolve.ts` turns that into the three public offers; `lib/catalogue/validate.ts` checks the
 * whole set. Internal codes (blueprint codes, catalogue IDs) never reach public UI.
 */

export type Billing = 'one-time' | 'monthly' | 'monthly-from' | 'starting' | 'discovery' | 'hourly' | 'quote';
export type TierNumber = 1 | 2 | 3;

export interface BlueprintTier {
  tier: TierNumber;
  /** USD; null for a scoped quote. */
  price: number | null;
  billing: Billing;
  /** What the tier buys, in the blueprint's own units. Service-specific nouns are applied per record. */
  scope: string[];
}

export interface Blueprint {
  /** Internal code, e.g. "ai_search". Never displayed. */
  code: string;
  label: string;
  /** The unit the tiers are counted in. */
  baseUnit: string;
  tiers: [BlueprintTier, BlueprintTier, BlueprintTier];
  /** Delivery standard shared by the tiers. */
  standard: string;
  /** Costs and limits that are scoped or paid separately. */
  extras: string;
  /** Planning range wording; never an outcome promise. */
  planning: string;
  /** Where this blueprint came from, for the source register. */
  source: string;
}

/** A field-level change to one tier for one service (the brief's "leaf overrides"). */
export type TierOverride = Partial<Omit<BlueprintTier, 'tier'>>;
export type Overrides = Partial<Record<TierNumber, TierOverride>>;

export type Template =
  | 'growth'
  | 'ai-automation'
  | 'erp-platform'
  | 'software'
  | 'quality-security'
  | 'creative'
  | 'managed'
  | 'industry';

/** What is true about who delivers it. Pages may offer scoping while this is not "verified". */
export type Availability = 'scoping-only' | 'in-house-verified' | 'partner-delivered';

export interface Faq {
  q: string;
  a: string;
}

export interface Evidence {
  kind: 'client-project' | 'original-demo' | 'self-study' | 'method-only';
  /** Project id from data/projects.ts, when kind is client-project. */
  projectId?: string;
  note: string;
}

export interface ServiceRecord {
  /** Stable internal ID. */
  id: string;
  /** The original 170-entry catalogue ID, when this record maps to one. Extension IDs stay separate. */
  sourceCatalogueId: string | null;
  route: string;
  legacyRoutes: string[];
  division: string;
  family: string;
  template: Template;
  title: string;
  /** Primary buyer intent in one phrase. */
  buyerIntent: string;
  /** The page-specific substance that makes this page not a clone of its siblings. */
  focus: string;
  definition: string;
  buyerFit: string;
  wrongFirstPurchase: string;
  deliverables: string[];
  scopeLimits: string[];
  prerequisites: string[];
  /** Pricing blueprint code and the public names of its three tiers. */
  blueprint: string;
  tierNames: [string, string, string];
  overrides: Overrides;
  /** Tiers cleared for public display. Tier 1 must be among them. */
  publishedTiers: TierNumber[];
  planningRange: string;
  extraCosts: string[];
  process: { step: string; detail: string }[];
  acceptance: string;
  evidence: Evidence[];
  measures: string[];
  faqs: Faq[];
  relatedIds: string[];
  metaTitle: string;
  metaDescription: string;
  claimEvidence: string[];
  availability: Availability;
  owner: string;
  reviewed: string;
}

/** What the public sees for one tier: no internal codes. */
export interface PublicOffer {
  serviceId: string;
  route: string;
  family: string;
  serviceTitle: string;
  name: string;
  tier: TierNumber;
  price: number | null;
  billing: Billing;
  scope: string[];
  baseUnit: string;
  planning: string;
  extras: string;
}
