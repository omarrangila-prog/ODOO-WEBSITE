import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  Code2,
  Boxes,
  Globe,
  Megaphone,
  Clapperboard,
  Users,
} from 'lucide-react';

/**
 * The seven ODOOVATIONS capability divisions.
 *
 * This file is the source of truth for the "What We Do" hub, the homepage
 * ecosystem grid and the mega menu. Odoo is ONE division here, not the whole
 * company — that is the point of the structure.
 *
 * Rules that apply to every entry:
 *  - `capabilities` lists work the company genuinely intends to deliver.
 *  - `outcome` is a plain-language business result, never a metric claim.
 *  - No partner status, awards, ROI figures or delivery guarantees.
 */
export interface Division {
  id: string;
  /** Short label for nav and cards. */
  label: string;
  /** Full title for the hub page and headings. */
  title: string;
  href: string;
  icon: LucideIcon;
  /** Menu/card one-liner. */
  summary: string;
  /** Business outcome revealed on hover — what the client actually gets. */
  outcome: string;
  /** Answer-first paragraph for the hub page and AI retrieval. */
  answer: string;
  /** Grouped capability lists. Grouping keeps long lists readable. */
  capabilities: { group: string; items: string[] }[];
  /** Intent-matched CTA label (section 55 of the brief). */
  ctaLabel: string;
  /** Service/solution pages that belong to this division. */
  pages: { label: string; href: string }[];
  /** Visual weight in the homepage bento grid. */
  weight: 'lg' | 'md' | 'sm';
}

export const divisions: Division[] = [
  {
    id: 'ai-automation',
    label: 'AI & Automation',
    title: 'AI & Automation',
    href: '/services/ai-automation',
    icon: BrainCircuit,
    summary: 'AI agents and automated workflows that reduce repetitive work.',
    outcome: 'Reduce repetitive work and respond faster.',
    answer:
      'We build practical AI automation: agents that answer and qualify customers on WhatsApp, workflows that move documents and approvals without manual chasing, and assistants that answer questions from your own company data. Everything connects to the business systems you already run, with human approval wherever a decision carries risk.',
    capabilities: [
      {
        group: 'AI agents',
        items: [
          'WhatsApp AI agents',
          'AI sales agents',
          'AI lead qualification',
          'Customer support AI',
          'AI voice agents',
          'AI receptionists',
          'AI knowledge assistants',
          'AI reporting assistants',
        ],
      },
      {
        group: 'Workflow automation',
        items: [
          'Email automation',
          'Document automation',
          'Invoice automation',
          'Approval automation',
          'CRM automation',
          'Sales automation',
          'Marketing automation',
          'Operations automation',
          'Data entry automation',
        ],
      },
      {
        group: 'Operations & industry',
        items: [
          'Factory & production automation',
          'Warehouse automation',
          'Manufacturing workflow automation',
          'Inventory and reorder automation',
        ],
      },
      {
        group: 'AI engineering',
        items: [
          'LLM integration',
          'Internal knowledge systems (RAG)',
          'AI dashboards and analytics',
          'API-based AI integrations',
          'Custom AI solutions',
        ],
      },
    ],
    ctaLabel: 'Find What We Can Automate',
    pages: [
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
      { label: 'AI Agents', href: '/solutions/odoo-ai-agents' },
      { label: 'Factory Automation', href: '/solutions/factory-automation' },
    ],
    weight: 'lg',
  },
  {
    id: 'custom-software',
    label: 'Custom Software',
    title: 'Custom Software & Product Development',
    href: '/services/custom-software-development',
    icon: Code2,
    summary: 'Software built around how your business actually works.',
    outcome: 'Build the system your business actually needs.',
    answer:
      'When off-the-shelf tools stop fitting, we design and build the system around your process instead of forcing your process into someone else’s software. That covers business applications, POS, accounting, inventory, portals, dashboards, web apps and mobile apps — built to be maintained, not abandoned.',
    capabilities: [
      {
        group: 'Business systems',
        items: [
          'Custom business software',
          'Accounting software',
          'Sales & purchase software',
          'Inventory software',
          'Warehouse software',
          'Order management software',
          'Production & manufacturing software',
          'Export and import management software',
          'CRM software',
          'ERP systems',
        ],
      },
      {
        group: 'Point of sale',
        items: [
          'POS software',
          'Restaurant POS',
          'Retail POS',
          'Multi-branch POS',
          'Centralised POS reporting',
        ],
      },
      {
        group: 'Sector systems',
        items: [
          'Hospital management systems',
          'Clinic management systems',
          'Appointment systems',
          'School management software',
          'Learning management systems',
          'HR, payroll and attendance systems',
          'Field force applications',
          'Booking systems',
        ],
      },
      {
        group: 'Products & platforms',
        items: [
          'Customer, supplier and dealer portals',
          'Dashboards and management information systems',
          'SaaS product development',
          'Web applications',
          'Mobile applications',
          'APIs and integrations',
        ],
      },
    ],
    ctaLabel: 'Show Us Your Workflow',
    pages: [
      { label: 'Custom Software Development', href: '/services/custom-software-development' },
      { label: 'Accounting Software', href: '/solutions/accounting-software' },
      { label: 'POS Software', href: '/solutions/pos-software' },
      { label: 'Hospital Management', href: '/solutions/hospital-management-system' },
    ],
    weight: 'lg',
  },
  {
    id: 'odoo-erp',
    label: 'Odoo & ERP',
    title: 'Odoo & ERP',
    // Straight to the Odoo implementation page. This used to point at the
    // general services hub, so "Odoo ERP" links landed on a page about everything.
    href: '/services/odoo-implementation-pakistan',
    icon: Boxes,
    summary: 'Put sales, purchases, stock, accounts and reporting in one system.',
    outcome: 'One connected system instead of ten disconnected ones.',
    answer:
      'We implement, customise, integrate and support Odoo for businesses that need their departments working from the same data. We are an independent Odoo implementation and development team — not an official Odoo partner — and we scope customisation only where it earns its cost.',
    capabilities: [
      {
        group: 'Implementation',
        items: [
          'Odoo implementation',
          'Odoo consulting',
          'Odoo configuration',
          'Odoo migration',
          'Data migration',
          'Odoo training',
          'Odoo support & maintenance',
        ],
      },
      {
        group: 'Development',
        items: [
          'Custom Odoo development',
          'Custom Odoo modules',
          'Odoo integrations',
          'API integration',
          'Odoo dashboards',
          'Odoo reporting',
        ],
      },
      {
        group: 'Modules',
        items: [
          'Odoo CRM',
          'Odoo Sales',
          'Odoo Purchase',
          'Odoo Inventory',
          'Odoo Accounting',
          'Odoo Manufacturing',
          'Odoo POS',
          'Odoo Website & E-commerce',
        ],
      },
      {
        group: 'Pakistan & automation',
        items: [
          'FBR digital invoicing readiness',
          'Odoo WhatsApp integration',
          'Odoo business automation',
          'Odoo AI dashboards',
        ],
      },
    ],
    ctaLabel: 'Build My Odoo Roadmap',
    pages: [
      { label: 'Odoo Implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
      { label: 'Odoo Integration', href: '/services/odoo-integration' },
      { label: 'FBR Digital Invoicing', href: '/solutions/fbr-digital-invoicing-pakistan' },
    ],
    weight: 'lg',
  },
  {
    id: 'web-apps',
    label: 'Websites & Apps',
    title: 'Web, App & Digital Experience',
    href: '/services/web-development',
    icon: Globe,
    summary: 'Websites and web apps built to look premium, load fast and convert.',
    outcome: 'A site that generates leads instead of sitting there.',
    answer:
      'We build corporate websites, landing pages, e-commerce stores, portals, dashboards and mobile apps — each designed around a specific business goal such as generating leads, taking orders, booking appointments or connecting to an internal system.',
    capabilities: [
      {
        group: 'Websites',
        items: [
          'Corporate and business websites',
          'Landing pages',
          'E-commerce websites',
          'Website redesign',
          'Website optimisation',
          'Conversion-focused landing pages',
        ],
      },
      {
        group: 'Applications',
        items: [
          'Web applications',
          'Customer portals',
          'Dashboards',
          'SaaS interfaces',
          'Mobile applications',
          'Progressive web apps',
        ],
      },
      {
        group: 'Engineering',
        items: [
          'Frontend development',
          'Backend development',
          'API development',
          'UI/UX design',
          'Performance optimisation',
        ],
      },
      {
        group: 'Setup & upkeep',
        items: [
          'Domain and DNS setup',
          'Hosting and cloud deployment',
          'Technical SEO',
          'Analytics setup',
          'Maintenance',
        ],
      },
    ],
    ctaLabel: 'Start a Web Project',
    pages: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Custom Software', href: '/services/custom-software-development' },
    ],
    weight: 'md',
  },
  {
    id: 'marketing',
    label: 'Marketing & Ads',
    title: 'Marketing, Advertising & Growth',
    href: '/services/digital-marketing',
    icon: Megaphone,
    summary: 'Campaigns, ads and lead systems measured on business outcomes.',
    outcome: 'Reach, convert and measure the right audience.',
    answer:
      'We run performance marketing as a connected system: audience, creative, landing page or WhatsApp entry point, lead capture, qualification, CRM handoff and measurement. We do not sell guaranteed rankings or fixed return figures — we test, measure and improve lead quality.',
    capabilities: [
      {
        group: 'Paid media',
        items: [
          'Meta Ads (Facebook & Instagram)',
          'Google Ads',
          'YouTube Ads',
          'Search ads',
          'Retargeting',
          'Performance marketing',
        ],
      },
      {
        group: 'Lead generation',
        items: [
          'B2B lead generation',
          'Landing page strategy',
          'Lead qualification flows',
          'CRM marketing',
          'Email marketing',
          'Marketing automation',
        ],
      },
      {
        group: 'Search',
        items: ['SEO', 'Local SEO', 'Content SEO', 'Technical SEO'],
      },
      {
        group: 'Strategy & measurement',
        items: [
          'Digital marketing strategy',
          'Campaign strategy',
          'Creative strategy',
          'Ad copywriting',
          'Campaign analytics',
          'Conversion optimisation',
          'Growth consulting',
        ],
      },
    ],
    ctaLabel: 'Plan My Campaign',
    pages: [
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Creative & Media', href: '/services/creative-media' },
    ],
    weight: 'md',
  },
  {
    id: 'creative',
    label: 'Creative & Media',
    title: 'Creative, Media & Content Studio',
    href: '/services/creative-media',
    icon: Clapperboard,
    summary: 'Design, video and content that make a complex offer easy to grasp.',
    outcome: 'Turn a complicated offer into something people understand.',
    answer:
      'Our creative studio produces the design, video, animation and writing that carry a technical business to market — brand systems, ad creative, product and explainer videos, motion graphics, corporate profiles and the copy that goes with them.',
    capabilities: [
      {
        group: 'Design',
        items: [
          'Graphic design',
          'Brand design',
          'Social media design',
          'Ad creative',
          'Campaign design',
          'Presentation design',
          'Corporate profiles and brochures',
          'Posters and packaging design',
        ],
      },
      {
        group: 'Video & motion',
        items: [
          'Video editing',
          'Motion graphics',
          '2D and 3D animation',
          'Product animation',
          'Explainer videos',
          'Corporate and commercial video',
          'Videography and photography',
          'Short-form content and reels',
        ],
      },
      {
        group: 'Words',
        items: [
          'Copywriting',
          'Content writing',
          'Script writing',
          'Website copy',
          'Sales and ad copy',
          'Blog writing',
          'Storyboarding',
        ],
      },
    ],
    ctaLabel: 'Start a Creative Project',
    pages: [{ label: 'Creative & Media', href: '/services/creative-media' }],
    weight: 'md',
  },
  {
    id: 'content-social',
    label: 'Content & Social',
    title: 'Creator, Social & Digital Brand Management',
    href: '/services/content-social',
    icon: Users,
    summary: 'Content systems, social operations and creator campaigns.',
    outcome: 'A brand that publishes consistently instead of sporadically.',
    answer:
      'We plan and run the ongoing content side of a brand: calendars, publishing, community management, creator and influencer campaigns, and the analytics that show which content is actually working.',
    capabilities: [
      {
        group: 'Content operations',
        items: [
          'Content planning',
          'Content calendars',
          'Publishing',
          'Content repurposing',
          'Short-form content systems',
        ],
      },
      {
        group: 'Creator & community',
        items: [
          'Creator management',
          'Influencer campaigns',
          'Creator outreach',
          'Campaign coordination',
          'UGC campaign coordination',
          'Brand partnerships',
          'Community management',
        ],
      },
      {
        group: 'Measurement',
        items: ['Social media operations', 'Creative analytics'],
      },
    ],
    ctaLabel: 'Plan My Content',
    pages: [{ label: 'Content & Social', href: '/services/content-social' }],
    weight: 'sm',
  },
];

export function getDivision(id: string) {
  return divisions.find((d) => d.id === id);
}

/**
 * Capability strip shown under the hero. Short, scannable, and deliberately
 * mixed across divisions so no single discipline reads as "the whole company".
 */
export const capabilityStrip = [
  'AI Automation',
  'Custom Software',
  'Odoo ERP',
  'Web Development',
  'Mobile Apps',
  'WhatsApp Automation',
  'POS Systems',
  'Digital Marketing',
  'Video Production',
  'Graphic Design',
  'Content',
  'AI Agents',
];
