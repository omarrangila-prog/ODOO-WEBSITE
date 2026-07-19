export interface CaseStudyMetric {
  /** Only set `verified: true` when the business has confirmed the number. */
  label: string;
  value: string;
  verified: boolean;
}

export interface CaseStudy {
  slug: string;
  label: string; // neutral label until a real client name is verified
  industry: string;
  image: string;
  imageMobile: string;
  imageWidth: number;
  imageHeight: number;
  /**
   * These are DEMONSTRATION scenarios illustrating how Odoo maps to an industry
   * — not real client projects. The UI labels them "Demonstration". Replace with
   * a real, verified case study (and only then set isDemonstration: false and add
   * verified metrics) once a client agrees to be featured.
   */
  isDemonstration: boolean;
  challenge: string;
  existingWorkflow: string;
  solution: string;
  modules: string[];
  outcome: string;
  before: string;
  after: string;
  /** Qualitative outcome shown on the card — never a fabricated percentage. */
  highlightMetric: { value: string; label: string };
  resultLine: string;
  /** Real numbers only, with verified:true. Empty until a client confirms them. */
  metrics: CaseStudyMetric[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'textile-manufacturer',
    label: 'Odoo for a Textile Manufacturer',
    industry: 'Textile & Apparel',
    image: '/images/case-study-textile-manufacturer.webp',
    imageMobile: '/mobile/case-study-textile-manufacturer-mobile.webp',
    imageWidth: 1800,
    imageHeight: 1200,
    isDemonstration: true,
    challenge:
      'Production, subcontracting and stock were tracked across separate spreadsheets, with order status chased manually.',
    existingWorkflow:
      'Raw material logs in Excel, subcontracting on paper, sales orders over WhatsApp and accounts kept separately.',
    solution:
      'A connected Odoo system covering raw material, production, quality, warehouse, sales and accounts, with subcontracting tracked against orders.',
    modules: ['Manufacturing', 'Inventory', 'Purchase', 'Sales', 'Accounting'],
    outcome:
      'One connected view from raw material to finished goods, with live order status and accurate stock.',
    before: 'Disconnected reporting, manual visibility and repetitive coordination.',
    after: 'Connected operations, live information and controlled workflows.',
    highlightMetric: { value: 'Faster', label: 'reporting & order visibility' },
    resultLine:
      'Illustrative outcome: manual reporting replaced by live dashboards, with order status visible end to end.',
    metrics: [],
  },
  {
    slug: 'distribution-company',
    label: 'Odoo for a Distribution Business',
    industry: 'Distribution',
    image: '/images/case-study-distribution-company.webp',
    imageMobile: '/mobile/case-study-distribution-company-mobile.webp',
    imageWidth: 1800,
    imageHeight: 1200,
    isDemonstration: true,
    challenge:
      'Multi-warehouse stock never matched records, customer pricing was inconsistent, and receivables were hard to track.',
    existingWorkflow:
      'Separate stock sheets per warehouse, manual pricing per customer, and deliveries reconciled against invoices by hand.',
    solution:
      'Odoo inventory, sales, purchase and accounting connected into one flow, with controlled customer pricing and live receivables.',
    modules: ['Inventory', 'Sales', 'Purchase', 'Accounting', 'Point of Sale'],
    outcome:
      'Accurate multi-warehouse stock, controlled pricing and a live view of receivables.',
    before: 'Disconnected reporting, manual visibility and repetitive coordination.',
    after: 'Connected operations, live information and controlled workflows.',
    highlightMetric: { value: 'Accurate', label: 'multi-warehouse stock' },
    resultLine:
      'Illustrative outcome: multi-warehouse stock kept accurate, customer pricing controlled and receivables visible live.',
    metrics: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
