/**
 * Exact-intent SOLUTION landing pages. Each serves a genuinely distinct search
 * intent and links to (does not duplicate) the relevant service page.
 * No fabricated compliance guarantees, metrics or partner claims.
 */

export type SolBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'workflow'; steps: string[] }
  | { type: 'note'; text: string };

export interface Solution {
  slug: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  answer: string; // answer-first
  primaryKeyword: string;
  forWho: string;
  modules: string[];
  costFactors: string[];
  timelineFactors: string[];
  risks: string[];
  blocks: SolBlock[];
  faqs: { question: string; answer: string }[];
  relatedServices: { label: string; href: string }[];
  relatedResources: { label: string; href: string }[];
  officialSources?: { label: string; url: string }[];
  ctaLabel: string;
}

export const solutions: Solution[] = [
  {
    slug: 'fbr-digital-invoicing-pakistan',
    href: '/solutions/fbr-digital-invoicing-pakistan',
    primaryKeyword: 'FBR digital invoicing Pakistan',
    metaTitle: 'FBR Digital Invoicing with Odoo (Pakistan) | ODOOVATIONS',
    metaDescription:
      'How Pakistani businesses can prepare invoicing, POS and sales data in Odoo for FBR digital invoicing. Implementation help — not tax or legal advice.',
    h1: 'FBR Digital Invoicing: Preparing Your Odoo System',
    eyebrow: 'Pakistan compliance',
    answer:
      'FBR is expanding digital / e-invoicing requirements for businesses in Pakistan. Meeting them starts with structured, connected invoicing data — where your sales, POS and billing live in one system that can format and submit invoices reliably. ODOOVATIONS helps you get your Odoo system ready for that; we are an Odoo implementation company, not a tax authority or licensed tax advisor.',
    forWho: 'Retailers, distributors, manufacturers and service businesses in Pakistan whose invoicing, POS or billing data is currently spread across spreadsheets, separate software or manual processes.',
    modules: ['Accounting', 'Invoicing', 'Point of Sale', 'Sales', 'Inventory'],
    costFactors: [
      'Number of POS / billing points to connect',
      'Whether standard configuration is enough or custom development is needed',
      'Volume and cleanliness of existing invoice and product data',
      'Any integration to external or government systems within scope',
    ],
    timelineFactors: [
      'How ready your current invoicing data is',
      'Number of locations and users',
      'Scope of testing and validation required',
    ],
    risks: [
      'Requirements and formats can change — always confirm current rules with FBR',
      'Messy product / tax data slows every downstream step',
      'Under-scoping POS or multi-location complexity',
    ],
    blocks: [
      { type: 'h2', text: 'What digital invoicing means in practice' },
      { type: 'p', text: 'Digital invoicing means your invoices are generated, formatted and (where required) submitted electronically in a structured, validated way — rather than as free-form documents. For most businesses the real work is getting the underlying data right: consistent products, correct tax setup, and one reliable place where sales and billing happen.' },
      { type: 'h2', text: 'How Odoo helps' },
      { type: 'p', text: 'A well-configured Odoo system gives you one source of truth for sales, POS, products and accounting. That makes it far easier to produce consistent, structured invoices and to connect them to a submission workflow when required.' },
      { type: 'h2', text: 'A typical readiness workflow' },
      { type: 'workflow', steps: ['Sales / POS', 'Structured invoice', 'Tax & product validation', 'Submission workflow', 'Record kept in Odoo', 'Reporting'] },
      { type: 'h2', text: 'Compliance-readiness checklist' },
      { type: 'list', items: [
        'Products and services have consistent codes and tax categories',
        'Invoicing happens in one system, not scattered tools',
        'POS and billing points feed the same records',
        'Tax setup is reviewed against current requirements',
        'A clear submission and record-keeping workflow exists',
      ] },
      { type: 'note', text: 'This page explains how we help prepare your Odoo system. It is not tax or legal advice and does not guarantee FBR approval or compliance. Always confirm current requirements with FBR or a qualified tax advisor.' },
    ],
    faqs: [
      { question: 'Can you guarantee FBR compliance?', answer: 'No — and you should be cautious of anyone who does. We are an Odoo implementation company. We help structure and connect your invoicing data so it can meet digital-invoicing requirements, but compliance depends on current FBR rules and your own tax position. Confirm requirements with FBR or a qualified tax advisor.' },
      { question: 'Do you work with retail POS as well as billing?', answer: 'Yes. We connect Odoo Point of Sale and standard invoicing so both feed the same structured records, which is important for retailers with multiple tills or locations.' },
      { question: 'We use Excel for invoices today — is that a problem?', answer: 'It is a common starting point. Part of the work is moving that data into one structured system and cleaning it so invoicing becomes consistent and connectable.' },
    ],
    relatedServices: [
      { label: 'Odoo Integration', href: '/services/odoo-integration' },
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
    ],
    relatedResources: [
      { label: 'Odoo for Retail & E-commerce', href: '/industries/retail-ecommerce' },
    ],
    officialSources: [{ label: 'Federal Board of Revenue (FBR) — official site', url: 'https://www.fbr.gov.pk/' }],
    ctaLabel: 'Plan FBR-ready invoicing',
  },
  {
    slug: 'odoo-whatsapp-integration',
    href: '/solutions/odoo-whatsapp-integration',
    primaryKeyword: 'Odoo WhatsApp integration',
    metaTitle: 'Odoo WhatsApp Integration for Sales & Support | ODOOVATIONS',
    metaDescription:
      'Connect WhatsApp to Odoo so orders, follow-ups and payment reminders flow into your CRM — with a real record instead of scattered chats.',
    h1: 'Odoo + WhatsApp: Sales and Support in One Place',
    eyebrow: 'CRM & communication',
    answer:
      'Most businesses in Pakistan run a large share of sales and support on WhatsApp — but those conversations rarely become structured records. Connecting WhatsApp to Odoo means enquiries, orders and follow-ups land in your CRM, where they can be tracked, assigned and automated.',
    forWho: 'Businesses that take orders, quotes or support requests over WhatsApp and want them recorded and followed up systematically.',
    modules: ['CRM', 'Sales', 'Helpdesk', 'Accounting'],
    costFactors: [
      'Which WhatsApp option is used (Business app vs API provider)',
      'Volume of conversations and users',
      'How much automation (routing, reminders) is in scope',
      'Whether custom development is needed for specific flows',
    ],
    timelineFactors: ['Provider/API setup', 'Number of automated flows', 'Team training needs'],
    risks: [
      'WhatsApp Business API access depends on an approved provider',
      'Over-automating replies can feel impersonal — balance is important',
      'Data-handling and consent should be considered',
    ],
    blocks: [
      { type: 'h2', text: 'What connecting WhatsApp to Odoo gives you' },
      { type: 'list', items: [
        'Enquiries become CRM leads with a real history',
        'Follow-ups and reminders can be scheduled automatically',
        'Orders and quotes link to the customer record',
        'Support requests can be tracked to resolution',
      ] },
      { type: 'h2', text: 'A typical flow' },
      { type: 'workflow', steps: ['WhatsApp message', 'CRM lead in Odoo', 'Assigned & followed up', 'Quote / order', 'Invoice', 'Payment reminder'] },
      { type: 'note', text: 'WhatsApp Business API access is provided through approved partners. We help you choose an appropriate option and connect it to Odoo; provider approval and messaging policies are set by WhatsApp/Meta.' },
    ],
    faqs: [
      { question: 'Do we need the WhatsApp Business API?', answer: 'For structured, automated integration into Odoo you typically need WhatsApp Business API access through an approved provider. For lighter use, the WhatsApp Business app plus disciplined process can be a starting point. We help you decide based on your volume and goals.' },
      { question: 'Can it send automatic payment reminders?', answer: 'Yes. Once invoicing is in Odoo, reminders can be triggered by rules — but message templates and sending policies are governed by WhatsApp/Meta.' },
    ],
    relatedServices: [
      { label: 'Odoo Integration', href: '/services/odoo-integration' },
      { label: 'Business Automation', href: '/services/odoo-business-automation' },
    ],
    relatedResources: [
      { label: 'Common Odoo implementation mistakes', href: '/resources/common-odoo-implementation-mistakes' },
    ],
    ctaLabel: 'Explore WhatsApp integration',
  },
  {
    slug: 'odoo-ai-agents',
    href: '/solutions/odoo-ai-agents',
    primaryKeyword: 'Odoo AI agents',
    metaTitle: 'Odoo AI Agents & AI Dashboards | ODOOVATIONS',
    metaDescription:
      'What AI agents and AI-assisted dashboards can realistically automate on top of your Odoo data — anomaly detection, summaries and faster reporting.',
    h1: 'Odoo AI Agents: What They Can Realistically Do',
    eyebrow: 'AI & automation',
    answer:
      'AI adds the most value once your operations are already connected in Odoo. On top of clean, unified data, AI-assisted dashboards and agents can surface anomalies, draft summaries and speed up reporting — helping managers see problems earlier and decide faster.',
    forWho: 'Businesses already running (or implementing) Odoo who want faster insight and less manual reporting.',
    modules: ['Reporting', 'Business Intelligence', 'Sales', 'Inventory', 'Accounting'],
    costFactors: [
      'How clean and connected your Odoo data already is',
      'Which insights and dashboards are in scope',
      'Any custom development for specific analyses',
    ],
    timelineFactors: ['Data readiness', 'Number of dashboards / insights', 'Review cycles'],
    risks: [
      'AI on messy or disconnected data produces misleading output',
      'Treating AI output as fact rather than a prompt to investigate',
      'Scope creep — start with the decisions that matter most',
    ],
    blocks: [
      { type: 'h2', text: 'Where AI genuinely helps' },
      { type: 'list', items: [
        'Flagging anomalies — unusual stock movements, slow-paying customers',
        'Drafting plain-language summaries of performance',
        'Speeding up routine reporting your team does by hand today',
        'Highlighting trends worth a human decision',
      ] },
      { type: 'h2', text: 'Why data comes first' },
      { type: 'p', text: 'AI is only as good as the data underneath it. That is why we focus on connecting and cleaning your Odoo system first — then layer AI-assisted dashboards on a foundation you can trust.' },
      { type: 'workflow', steps: ['Connected Odoo data', 'Live dashboards', 'AI-assisted insight', 'Human decision', 'Action'] },
      { type: 'note', text: 'We describe realistic, useful automation. AI supports decisions; it does not replace human judgement, and its output should always be verifiable against your Odoo data.' },
    ],
    faqs: [
      { question: 'Do we need Odoo already running to use AI dashboards?', answer: 'Effectively yes — AI-assisted dashboards work on top of your Odoo data. If you are still implementing, we build the reporting foundation as part of the project so AI can be added meaningfully.' },
      { question: 'Will AI replace our reporting team?', answer: 'No. It removes repetitive report-building and surfaces things worth attention, so your team spends more time on decisions and less on assembling numbers by hand.' },
    ],
    relatedServices: [
      { label: 'Odoo AI Dashboards', href: '/services/odoo-ai-dashboards' },
      { label: 'Business Automation', href: '/services/odoo-business-automation' },
    ],
    relatedResources: [
      { label: 'Standard Odoo vs custom development', href: '/resources/standard-odoo-vs-custom-development' },
    ],
    ctaLabel: 'Explore Odoo AI dashboards',
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
