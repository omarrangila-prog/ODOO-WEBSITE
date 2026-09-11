/**
 * Location pages — ONE genuine Karachi page (real office) plus Pakistan-wide
 * service pages split by intent: Odoo/ERP, and the broader software, AI and
 * digital capability range. No fabricated branch cities (no Lahore/Islamabad/
 * Dubai pages). Content is unique per page to avoid doorway/duplication issues.
 */

export interface LocationPage {
  slug: string;
  href: string;
  kind: 'city' | 'country';
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  primaryKeyword: string;
  ctaLabel: string;
  sections: { heading: string; body: string }[];
  services: { label: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

export const locations: LocationPage[] = [
  {
    slug: 'odoo-services-karachi',
    href: '/locations/odoo-services-karachi',
    kind: 'city',
    primaryKeyword: 'Odoo services Karachi',
    metaTitle: 'Odoo Developer & Consultant in Karachi | ODOOVATIONS',
    metaDescription:
      'ODOOVATIONS is a Karachi-based Odoo implementation and development team. On-site and remote Odoo consulting, custom modules, integration and support for Karachi businesses.',
    h1: 'Odoo Implementation, Development & Support in Karachi',
    eyebrow: 'Karachi, Pakistan',
    intro:
      'ODOOVATIONS is an Odoo implementation and custom-development team based in Karachi. We help Karachi manufacturers, distributors, textile companies and retailers replace disconnected spreadsheets and manual coordination with one connected Odoo system — with the option of on-site meetings at our Karachi office or fully remote delivery.',
    ctaLabel: 'Book a Karachi Odoo Consultation',
    sections: [
      {
        heading: 'Working with a local Karachi Odoo team',
        body: 'Being based in Karachi means we can meet your team in person during discovery and go-live, understand how your business actually operates on the ground, and coordinate in your working hours. For businesses that prefer it, the entire engagement can also run remotely with structured documentation and regular check-ins.',
      },
      {
        heading: 'Karachi industries we work with',
        body: 'Karachi concentrates a large share of Pakistan’s manufacturing, textile, trading, distribution and retail businesses. We tailor Odoo to each — connecting sales, inventory, purchasing, accounting and reporting so management gets one accurate, real-time view instead of separate spreadsheets and WhatsApp threads.',
      },
      {
        heading: 'How a local engagement usually starts',
        body: 'Most Karachi projects begin with a short discovery conversation — in person or online — where we map your current workflow and bottlenecks. From there you receive a clear implementation scope showing what will be configured with standard Odoo and what, if anything, needs custom development. No unnecessary customisation.',
      },
    ],
    services: [
      { label: 'Odoo implementation in Karachi', body: 'End-to-end setup of the modules your business needs, configured to your real workflow.' },
      { label: 'Custom Odoo development', body: 'Precise custom modules for the gaps standard Odoo cannot cover — only where they create value.' },
      { label: 'Odoo integration', body: 'Connect Odoo with e-commerce, payments, couriers, banking and existing systems.' },
      { label: 'Odoo support & maintenance', body: 'Ongoing issue resolution, upgrades and continuous improvement after go-live.' },
    ],
    faqs: [
      {
        question: 'Do you provide on-site Odoo support in Karachi?',
        answer:
          'Yes. Because our team is based in Karachi, we can meet on-site for discovery, key training sessions and go-live where it adds value, and handle the rest remotely. Many Karachi clients use a mix of on-site and remote work depending on the phase of the project.',
      },
      {
        question: 'Which Karachi industries do you work with most?',
        answer:
          'We work most often with manufacturing, textile and apparel, distribution, trading, retail and professional-service businesses in Karachi — sectors where sales, inventory, purchasing and accounting need to be connected in one system.',
      },
      {
        question: 'Can you work with a business outside Karachi?',
        answer:
          'Yes. We serve clients Pakistan-wide and internationally through structured remote delivery. Being in Karachi simply means on-site options are easier for local businesses.',
      },
    ],
  },
  {
    slug: 'odoo-services-pakistan',
    href: '/locations/odoo-services-pakistan',
    kind: 'country',
    primaryKeyword: 'Odoo implementation Pakistan',
    metaTitle: 'Odoo Implementation Company in Pakistan | ODOOVATIONS',
    metaDescription:
      'Odoo implementation, custom development, integration, migration and support for businesses across Pakistan. Local operational understanding with structured, remote-friendly delivery.',
    h1: 'Odoo Implementation & Custom Development Across Pakistan',
    eyebrow: 'Pakistan-wide service',
    intro:
      'ODOOVATIONS provides Odoo ERP implementation, custom module development, integration, data migration and support to businesses across Pakistan. We combine an understanding of how Pakistani businesses actually operate — manual approvals, WhatsApp orders, disconnected reports — with structured, international-standard implementation delivered on-site in Karachi or remotely nationwide.',
    ctaLabel: 'Request an Odoo Implementation Roadmap',
    sections: [
      {
        heading: 'Odoo built for how Pakistani businesses run',
        body: 'Many growing Pakistani businesses run on a mix of Excel, WhatsApp, paper and separate software. We implement Odoo around that reality — connecting sales, inventory, purchasing, accounting and management reporting so decisions are based on one accurate, current picture rather than reconciled spreadsheets.',
      },
      {
        heading: 'Delivered on-site or remotely, nationwide',
        body: 'Our office is in Karachi, and we deliver to businesses across Pakistan through a structured remote process: mapped workflows, a clear scope, prototype review, testing, data migration, training on real workflows, and supported go-live. Distance does not change the quality of the implementation.',
      },
      {
        heading: 'Standard where possible, custom where valuable',
        body: 'We configure standard Odoo wherever it fits and build custom modules only where they create measurable business value — custom approvals, industry-specific forms, automated pricing, specialised reporting and third-party integrations. No complexity for its own sake.',
      },
    ],
    services: [
      { label: 'Odoo implementation Pakistan', body: 'Full ERP setup configured to your operations, with training and supported go-live.' },
      { label: 'Custom Odoo development', body: 'Custom modules, workflows and automations built around your specific process.' },
      { label: 'Odoo migration', body: 'Move from Excel or another system with prepared, validated data.' },
      { label: 'Integration & support', body: 'Connect the tools you use and keep the system improving after launch.' },
    ],
    faqs: [
      {
        question: 'Do you serve businesses outside Karachi?',
        answer:
          'Yes. We work with businesses across Pakistan through a structured remote delivery process — discovery, scope, prototype, build, data migration, training and supported go-live — with on-site options available for clients who want them.',
      },
      {
        question: 'Can you migrate our data from Excel or another ERP?',
        answer:
          'Yes. Data migration is a standard part of our process. We prepare, map and validate your existing data before go-live so the new system starts with accurate records, and we involve your team so nothing important is lost.',
      },
      {
        question: 'How do you prevent unnecessary customisation?',
        answer:
          'We start from your real workflow and use standard, well-configured Odoo wherever it fits. Custom development is proposed only where standard Odoo genuinely cannot cover a requirement that matters to your business — and the scope is agreed before any code is written.',
      },
    ],
  },
  {
    slug: 'software-ai-automation-pakistan',
    href: '/locations/software-ai-automation-pakistan',
    kind: 'country',
    primaryKeyword: 'software and AI automation company Pakistan',
    metaTitle: 'Software & AI Automation Company in Pakistan | ODOOVATIONS',
    metaDescription:
      'Custom software development, AI automation, web and mobile apps, marketing and creative production for businesses across Pakistan — delivered from Karachi, on-site or remotely.',
    h1: 'Software, AI Automation & Digital Services Across Pakistan',
    eyebrow: 'Pakistan-wide service',
    intro:
      'ODOOVATIONS builds custom software, AI automation, websites, mobile applications, marketing campaigns and creative content for businesses across Pakistan. This page covers the full capability range; if your requirement is specifically an Odoo ERP implementation, the Odoo page covers that in depth.',
    ctaLabel: 'Tell Us What You Need',
    sections: [
      {
        heading: 'Built for how business actually works here',
        body: 'Orders arrive on WhatsApp. Stock lives in Excel. Payments are chased by phone. Approvals happen in person. Software designed for a different operating environment tends to be abandoned within months, because it assumes conditions that do not exist. We design for the conditions that do — intermittent connectivity, mixed literacy on the shop floor, staff who will not type when they can scan, and a genuine need for English and Urdu to coexist.',
      },
      {
        heading: 'What we build most often',
        body: 'Custom business systems — accounting, POS, inventory, production, hospital and clinic management. AI automation, particularly WhatsApp agents that answer and qualify leads, and document processing that removes retyping. Websites and web applications built to generate enquiries rather than to exist. And the marketing, video and creative work that brings customers to all of it.',
      },
      {
        heading: 'Delivered from Karachi, nationwide',
        body: 'Our office is in Karachi, which means on-site discovery, training and go-live support are straightforward for Karachi businesses. For clients elsewhere in Pakistan we deliver through a structured remote process: mapped workflows, written scope, prototype review, testing, data migration, training and supported go-live. Karachi is our only office — we do not maintain branches in other cities and will not claim to.',
      },
      {
        heading: 'Pricing in a market that shops on price',
        body: 'We are not the cheapest option in Pakistan and do not try to be. The cheapest quote usually reflects a smaller scope, a template, or a plan to recover margin through change requests later. We quote against a written scope after discovery, phase the work so value arrives early, and will tell you when an off-the-shelf product would serve you better than anything we could build.',
      },
    ],
    services: [
      { label: 'Custom software development', body: 'Business systems built around your process — accounting, POS, inventory, production, sector-specific platforms.' },
      { label: 'AI automation & AI agents', body: 'WhatsApp agents, document processing, approval routing and reporting assistants connected to your real data.' },
      { label: 'Websites & mobile apps', body: 'Corporate sites, e-commerce, portals, dashboards and applications built for speed on mobile networks.' },
      { label: 'Digital marketing & advertising', body: 'Meta and Google campaigns, SEO and lead generation measured on qualified enquiries.' },
      { label: 'Creative, video & content', body: 'Design, product and explainer video, animation, photography and the copy that goes with it.' },
      { label: 'Odoo & ERP', body: 'Implementation, customisation, integration and support — covered in depth on the Odoo Pakistan page.' },
    ],
    faqs: [
      {
        question: 'Do you work with businesses outside Karachi?',
        answer:
          'Yes, across Pakistan. Our office is in Karachi, so on-site meetings are easiest for Karachi businesses, but the delivery process is built to work remotely: video discovery with screen sharing, written scope everyone can read, a working environment you can check at any time, and remote training and support. We do not have offices in other cities and will not pretend otherwise.',
      },
      {
        question: 'Can you work in Urdu?',
        answer:
          'Project documentation and scope stay in professional English so there is one authoritative written record. Discussion, training and support can run in Urdu where that is more comfortable for your team — which matters most for shop-floor and counter staff who will actually use the system daily.',
      },
      {
        question: 'How much does custom software cost in Pakistan?',
        answer:
          'It depends on scope — the number of distinct workflows, user roles, integrations, data migration and whether mobile access is needed. There is no useful category price. Our guide on custom software cost explains each factor so you can judge any quote, including ours.',
      },
      {
        question: 'Do you only build on Odoo?',
        answer:
          'No. Odoo is one of seven divisions and the right answer for many businesses, but plenty of what we build is not Odoo at all — custom applications, AI automation, websites and mobile apps. We recommend the foundation that fits the process and the budget, not the one that suits us.',
      },
      {
        question: 'Can you take over a project another company started?',
        answer:
          'Often yes. We begin with a short technical review of the existing code and data to establish what is salvageable, and give you an honest assessment before committing. Sometimes the right answer is to continue it; sometimes it is to rebuild, and we will say which.',
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
