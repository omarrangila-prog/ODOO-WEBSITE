export interface CaseStudyMetric {
  /** Only set `verified: true` when the business has confirmed the number. */
  label: string;
  value: string;
  verified: boolean;
}

/**
 * Portfolio category. Drives the filter on /case-studies so work can be
 * browsed by capability rather than only by industry.
 */
export type WorkCategory =
  | 'AI Automation'
  | 'Custom Software'
  | 'Odoo'
  | 'Web'
  | 'Marketing'
  | 'Integrations';

export interface CaseStudy {
  slug: string;
  label: string; // neutral label until a real client name is verified
  industry: string;
  /** Capability category for the portfolio filter. */
  category: WorkCategory;
  /** Short meta description. Falls back to industry + challenge when absent. */
  metaDescription?: string;
  /** Optional — scenarios added later have no commissioned photography. */
  image?: string;
  imageMobile?: string;
  imageWidth?: number;
  imageHeight?: number;
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
    category: 'Odoo',
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
    category: 'Odoo',
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
  {
    slug: 'whatsapp-lead-automation',
    metaDescription:
      'Ad leads answered in seconds instead of hours — instant WhatsApp qualification, salesperson routing and a CRM record for every enquiry.',
    label: 'WhatsApp Lead Qualification',
    industry: 'Retail & E-commerce',
    category: 'AI Automation',
    isDemonstration: true,
    challenge:
      'Paid ads generated WhatsApp enquiries around the clock, but replies depended on one person checking a phone. Leads paid for at 11pm were answered the following afternoon, by which point most had stopped responding.',
    existingWorkflow:
      'Ad click opens WhatsApp, message lands on a personal handset, someone replies when they can, and the lead is written in a notebook if it looks serious.',
    solution:
      'An automated flow on the official WhatsApp Business Platform: instant welcome, three qualifying questions, routing to the right salesperson, a CRM record carrying the ad source and the answers, and an automated follow-up when there is no reply.',
    modules: ['WhatsApp Business Platform', 'Lead Qualification', 'CRM', 'Automated Follow-up'],
    outcome:
      'Every enquiry answered within seconds regardless of hour, with qualified leads reaching a named salesperson and the conversation recorded against the customer rather than a personal phone.',
    before: 'Leads answered hours late, tracked informally, and owned by one handset.',
    after: 'Immediate response, qualification before a salesperson is involved, and a CRM record for every enquiry.',
    highlightMetric: { value: 'Seconds', label: 'to first response, any hour' },
    resultLine:
      'Illustrative outcome: first response moves from hours to seconds, and no enquiry depends on one person watching a phone.',
    metrics: [],
  },
  {
    slug: 'multi-branch-inventory-sales',
    metaDescription:
      'One product catalogue and enforced pricing across four branches, with barcode stock control and live head-office reporting.',
    label: 'Multi-Branch Inventory & Sales System',
    industry: 'Wholesale & Trading',
    category: 'Custom Software',
    isDemonstration: true,
    challenge:
      'Four branches each kept their own stock sheet and their own version of customer pricing. Head office learned the day’s sales by WhatsApp message, and stock differences surfaced only at the annual count.',
    existingWorkflow:
      'Per-branch Excel stock sheets, rates held in salesmen’s notebooks, daily totals messaged to head office, and an annual physical count to reconcile the gap.',
    solution:
      'A custom system with one product catalogue and central price lists, barcode receiving and picking per branch, inter-branch transfers recorded at both ends, credit limits enforced at order entry, and consolidated head-office reporting.',
    modules: ['Inventory', 'Sales', 'Pricing & Credit Control', 'Branch Transfers', 'Reporting'],
    outcome:
      'Stock that reconciles branch by branch, customer pricing applied automatically instead of remembered, and a head-office view that does not wait for anyone to send a number.',
    before: 'Four stock sheets, informal pricing, and a yearly reconciliation surprise.',
    after: 'One catalogue, enforced pricing and credit limits, and live consolidated reporting.',
    highlightMetric: { value: 'One', label: 'catalogue across four branches' },
    resultLine:
      'Illustrative outcome: branch stock and pricing brought onto one record, with cycle counting replacing the annual shutdown.',
    metrics: [],
  },
  {
    slug: 'lead-generation-website',
    metaDescription:
      'A manufacturer\u2019s site rebuilt around buyer search intent, with every enquiry attributed to the page and source that produced it.',
    label: 'B2B Lead-Generation Website',
    industry: 'Manufacturing',
    category: 'Web',
    isDemonstration: true,
    challenge:
      'An established manufacturer had a site that ranked for its own company name and nothing else. Buyers researching the product category never found it, and the handful of enquiries it did produce arrived at an unmonitored inbox.',
    existingWorkflow:
      'A brochure site built years earlier, no analytics beyond a visitor counter, contact form emailing an address nobody owned.',
    solution:
      'A rebuild structured around what buyers actually search for: capability and application pages, technical specifications in crawlable text rather than PDFs, a clear enquiry path, server-rendered content with performance engineered for mobile networks, and enquiries routed into the CRM with source tracking.',
    modules: ['Corporate Website', 'Technical SEO', 'Conversion Design', 'CRM Integration', 'Analytics'],
    outcome:
      'A site that can be found for the products it sells rather than only its own name, with every enquiry attributed to the page and source that produced it.',
    before: 'Visible only to people who already knew the company name.',
    after: 'Structured around buyer search intent, with measurable enquiry attribution.',
    highlightMetric: { value: 'Measured', label: 'enquiries, by source and page' },
    resultLine:
      'Illustrative outcome: content structured for category search, and enquiries traced to the page that generated them.',
    metrics: [],
  },
  {
    slug: 'campaign-to-crm-system',
    metaDescription:
      'Landing pages, lead qualification and CRM attribution connecting ad spend through to qualified leads and closed business.',
    label: 'Campaign-to-CRM System',
    industry: 'Professional Services',
    category: 'Marketing',
    isDemonstration: true,
    challenge:
      'Meta and Google spend was rising while enquiries stayed flat. Nobody could say which campaign produced the clients that closed, so budget decisions were made on impressions and gut feeling.',
    existingWorkflow:
      'Ads pointing at the homepage, a generic contact form, leads emailed to a shared inbox, and no connection between ad spend and closed business.',
    solution:
      'A connected campaign system: dedicated landing pages matched to each ad promise, qualification built into the form, leads written into the CRM with source, campaign and answers attached, an owner and follow-up task assigned automatically, and reporting from spend through to qualified lead and closed deal.',
    modules: ['Meta Ads', 'Google Ads', 'Landing Pages', 'CRM Integration', 'Attribution & Reporting'],
    outcome:
      'Spend decisions based on which campaigns produce qualified leads and revenue, rather than which produce the cheapest clicks.',
    before: 'Rising spend, flat enquiries, and no link between campaign and customer.',
    after: 'Attribution from ad through to closed business, with unqualified enquiries filtered early.',
    highlightMetric: { value: 'Traceable', label: 'ad spend to closed business' },
    resultLine:
      'Illustrative outcome: every enquiry carries its source, so budget follows evidence rather than impressions.',
    metrics: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
