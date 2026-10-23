/**
 * PRODUCT CATALOGUE
 *
 * The model, and the gate, for products ODOOVATIONS offers. It is built to hold
 * 60 to 80 or more entries over time; the number is not a target. A product is
 * added when it exists, not so there is something to rank.
 *
 * This file starts with ONE record and it is not public: WhatsApp Karobar OS is
 * management-confirmed as in development, and a concept is never presented as
 * a live product. Until at least one record passes `isPublishable()`:
 *  - /products returns 404,
 *  - no /products/<slug> page is generated,
 *  - nothing appears in the sitemap.
 *
 * `isPublishable()` is the only route to the public site. It refuses a record
 * that is a concept, lacks a description, features, a target customer or a stated
 * problem, has nothing a visitor could look at (a demo link or an approved
 * screenshot, for live / demo / beta), or has evidence that is not yet verified.
 * See docs/PRODUCTS.md for how to add one.
 */

export type ProductStatus = 'live' | 'demo' | 'beta' | 'custom-solution' | 'in-development';

export const productStatusLabel: Record<ProductStatus, string> = {
  live: 'Live product',
  demo: 'Demo available',
  beta: 'Beta',
  'custom-solution': 'Custom solution',
  'in-development': 'In development',
};

export type ProductCategoryId =
  | 'accounting-finance'
  | 'inventory-warehouse'
  | 'sales-purchasing'
  | 'pos-retail'
  | 'manufacturing'
  | 'import-export'
  | 'crm'
  | 'hr-attendance'
  | 'healthcare-admin'
  | 'education-admin'
  | 'ai-agents'
  | 'document-automation'
  | 'ecommerce-integrations';

export const productCategories: { id: ProductCategoryId; label: string }[] = [
  { id: 'accounting-finance', label: 'Accounting and finance systems' },
  { id: 'inventory-warehouse', label: 'Inventory and warehouse systems' },
  { id: 'sales-purchasing', label: 'Sales and purchasing' },
  { id: 'pos-retail', label: 'POS and retail' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'import-export', label: 'Import / export and trading' },
  { id: 'crm', label: 'CRM' },
  { id: 'hr-attendance', label: 'HR and attendance' },
  { id: 'healthcare-admin', label: 'Healthcare administration' },
  { id: 'education-admin', label: 'Education administration' },
  { id: 'ai-agents', label: 'AI agents' },
  { id: 'document-automation', label: 'Document automation' },
  { id: 'ecommerce-integrations', label: 'E-commerce integrations' },
];

export interface ProductScreenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** The owner has approved this exact image, and it shows the real product. */
  approved: boolean;
}

export interface ProductEvidence {
  /** Someone has checked every statement on the record against the product itself. */
  verified: boolean;
  /** Where the facts came from, e.g. "management confirmation, 2026-09-12". */
  source: string;
}

export interface Product {
  name: string;
  slug: string;
  category: ProductCategoryId;
  status: ProductStatus;
  targetCustomer: string;
  businessProblem: string;
  description: string;
  features: string[];
  screenshots: ProductScreenshot[];
  demoUrl?: string;
  integrations: string[];
  deploymentModel: string;
  /** How it is priced, in words. No figures unless they are real and current. */
  pricingApproach: string;
  implementationRequirements: string[];
  support: string;
  /** Slugs of other products. Only published ones are linked. */
  related: string[];
  evidence: ProductEvidence;
}

export const products: Product[] = [
  {
    name: 'WhatsApp Karobar OS',
    slug: 'whatsapp-karobar-os',
    category: 'ai-agents',
    status: 'in-development',
    targetCustomer: 'Small and mid-sized businesses that run daily operations over WhatsApp.',
    businessProblem: 'Orders, invoices, stock questions and reminders live in chat threads, away from the system of record.',
    description:
      'A business operating layer reached from WhatsApp: customer messages, orders, invoices, stock, reminders and reports through conversational workflows connected to the business system behind them.',
    features: ['Customer messages', 'Orders and invoices', 'Stock and reminders', 'Reports', 'AI assistance'],
    screenshots: [],
    integrations: [],
    deploymentModel: 'Not yet defined.',
    pricingApproach: 'Not yet defined.',
    implementationRequirements: [],
    support: 'Not yet defined.',
    related: [],
    evidence: { verified: false, source: 'Management confirmation, 2026-09-12: an ODOOVATIONS product in delivery. Status to be corrected if it is a client build.' },
  },
];

const PUBLIC_STATUSES: ProductStatus[] = ['live', 'demo', 'beta', 'custom-solution'];

/** Every reason a product cannot be published yet. Empty means it may be. */
export function productBlockers(p: Product): string[] {
  const out: string[] = [];
  const need = (ok: unknown, why: string) => {
    if (!ok) out.push(why);
  };
  need(PUBLIC_STATUSES.includes(p.status), `status is "${p.status}"; only live, demo, beta and custom-solution are public`);
  need(p.evidence.verified, 'evidence not marked verified');
  need(p.evidence.source.trim(), 'no evidence source recorded');
  need(p.description.trim().length >= 80, 'description is missing or too short');
  need(p.targetCustomer.trim(), 'target customer missing');
  need(p.businessProblem.trim(), 'business problem missing');
  need(p.features.length >= 3, 'fewer than three features listed');
  need(p.deploymentModel.trim() && p.deploymentModel !== 'Not yet defined.', 'deployment model not defined');
  need(p.pricingApproach.trim() && p.pricingApproach !== 'Not yet defined.', 'pricing approach not defined');
  need(p.support.trim() && p.support !== 'Not yet defined.', 'support arrangement not defined');
  if (p.status !== 'custom-solution') {
    const approved = p.screenshots.filter((s) => s.approved && s.alt.trim());
    need(p.demoUrl || approved.length > 0, 'no demo link and no approved screenshot with alt text');
  }
  for (const s of p.screenshots) {
    if (s.approved) need(s.alt.trim(), `screenshot ${s.src} has no alt text`);
  }
  return out;
}

export function isPublishable(p: Product): boolean {
  return productBlockers(p).length === 0;
}

export function publishedProducts(): Product[] {
  return products.filter(isPublishable);
}

export function getPublishedProduct(slug: string): Product | undefined {
  return publishedProducts().find((p) => p.slug === slug);
}

/** Slugs must be unique and URL-safe, or two records would compete for one page. */
export function duplicateSlugs(): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const p of products) {
    if (seen.has(p.slug)) dup.add(p.slug);
    seen.add(p.slug);
  }
  return [...dup];
}
