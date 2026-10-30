/**
 * Editorial content for one catalogue leaf page. The manifest says what the brief requires; this says it to
 * a buyer. A leaf page is built only when an entry exists here, so the site never serves a shell: briefs
 * without content stay "to build" in audit/catalogue/COVERAGE.md and have no URL.
 */
export interface LeafContent {
  /** Manifest brief ID, e.g. "S006". */
  id: string;
  /** Under 160 characters; unique. */
  metaDescription: string;
  /** Public names for the three tiers, specific to this service. */
  tierNames: [string, string, string];
  /** One or two sentences: what it is and what the buyer gets. Answers "what is X?". */
  definition: string;
  /** The concrete problem in the buyer's terms. */
  problem: string;
  whoFor: string;
  /** When this is the wrong first purchase, and what to buy instead. */
  wrongFirst: string;
  /** What we need before we can quote or start. */
  prerequisites: string[];
  /** Included work with its boundary. */
  deliverables: string[];
  /** What the client does or provides. */
  clientDoes: string[];
  process: { step: string; detail: string }[];
  /** What "done" means and who owns the result. */
  completion: string;
  /** An original example of the work product. Always labelled as sample data. */
  sample: { title: string; caption: string; columns: string[]; rows: string[][] };
  /** What is measured, with honest limits. */
  measures: string[];
  faqs: { q: string; a: string }[];
  /** Other manifest IDs or existing site paths to link to. */
  related: string[];
  /** One existing industry or solution page where this work commonly applies. */
  industry?: { label: string; href: string };
  reviewed: string;
}
