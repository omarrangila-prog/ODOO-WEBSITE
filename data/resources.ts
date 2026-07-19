/**
 * Resources — evergreen, high-intent decision-support guides. No blog filler,
 * no fabricated numbers, no invented projects. Each guide answers a genuine
 * buying / comparison / implementation / migration / pricing question.
 *
 * Content blocks render generically so every guide stays unique in substance.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; text: string };

export interface Resource {
  slug: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  summary: string; // answer-first
  updated: string; // ISO date, only where genuinely maintained
  readMinutes: number;
  primaryKeyword: string;
  blocks: Block[];
  faqs: { question: string; answer: string }[];
  relatedServices: { label: string; href: string }[];
  relatedResources: string[]; // slugs
}

export const resources: Resource[] = [
  {
    slug: 'odoo-implementation-cost-pakistan',
    href: '/resources/odoo-implementation-cost-pakistan',
    metaTitle: 'Odoo Implementation Cost in Pakistan (What Drives It) | ODOOVATIONS',
    metaDescription:
      'What actually drives Odoo implementation cost in Pakistan — modules, users, customisation, integrations, migration and support. An honest breakdown of the factors, not a fake price.',
    h1: 'What Drives Odoo Implementation Cost in Pakistan',
    eyebrow: 'Pricing guide',
    summary:
      'There is no single price for an Odoo implementation. Cost is driven by how many modules you connect, how many users you have, how much custom development and integration you need, how much data must be migrated, and whether you use Odoo Community or Enterprise. This guide explains each factor so you can estimate a realistic range for your own business.',
    updated: '2026-07-16',
    readMinutes: 6,
    primaryKeyword: 'Odoo implementation cost Pakistan',
    blocks: [
      { type: 'h2', text: 'The main cost drivers' },
      { type: 'p', text: 'Two businesses can pay very different amounts for "an Odoo implementation" because the work behind it is different. These are the factors that move the number most.' },
      {
        type: 'table',
        head: ['Factor', 'Lower cost', 'Higher cost'],
        rows: [
          ['Modules', 'Sales + Inventory + Accounting', 'Manufacturing, MRP, POS, HR, custom flows'],
          ['Users', 'A handful of core users', 'Many users across departments'],
          ['Customisation', 'Standard Odoo, well configured', 'Custom modules, approvals, pricing logic'],
          ['Integrations', 'None', 'E-commerce, courier, banking, biometric, APIs'],
          ['Data migration', 'Small, clean data', 'Years of messy multi-source data'],
          ['Edition', 'Community', 'Enterprise (per-user licensing)'],
        ],
      },
      { type: 'h2', text: 'Licensing vs implementation' },
      { type: 'p', text: 'Keep two things separate. Odoo Enterprise licensing is a per-user subscription paid to Odoo. Implementation is the work of configuring, customising, integrating, migrating and training — that is what an implementation company like ODOOVATIONS delivers. Odoo Community has no licence fee but usually needs more configuration and self-hosting.' },
      { type: 'h2', text: 'One-time vs ongoing' },
      { type: 'list', items: [
        'One-time: discovery, configuration, custom development, integration, data migration, training and go-live.',
        'Ongoing: support and maintenance, future enhancements, and (for Enterprise) the per-user subscription.',
        'Hosting: Odoo Online, Odoo.sh, or your own server — each has different cost and control trade-offs.',
      ] },
      { type: 'h2', text: 'How to get a realistic estimate' },
      { type: 'p', text: 'The reliable way to price your project is a short discovery conversation that maps your real workflow and required modules. From there you receive a scope that separates standard configuration from any custom development, so the estimate reflects your business — not a generic package.' },
      { type: 'note', text: 'We do not publish a fixed price because it would be misleading. Cost depends on the factors above. Share your workflow and we will scope a realistic range.' },
    ],
    faqs: [
      { question: 'Is Odoo cheaper than other ERPs in Pakistan?', answer: 'Odoo is often more cost-effective than large traditional ERPs because it is modular — you implement only what you need and add more later. The total still depends on modules, customisation, integration and migration, so compare on scope, not headline price.' },
      { question: 'Do I need Odoo Enterprise or is Community enough?', answer: 'It depends on the features you need and your hosting preference. Community has no licence fee but fewer built-in features and needs self-hosting. Enterprise adds features and hosting options for a per-user subscription. We help you choose based on your actual requirements — see our Community vs Enterprise guide.' },
      { question: 'Can I start small and expand later?', answer: 'Yes, and it is usually the sensible approach. Many businesses start with sales, inventory and accounting, prove the system, then add manufacturing, POS, HR or custom modules in later phases.' },
    ],
    relatedServices: [
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
      { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
    ],
    relatedResources: ['odoo-community-vs-enterprise', 'standard-odoo-vs-custom-development'],
  },
  {
    slug: 'odoo-community-vs-enterprise',
    href: '/resources/odoo-community-vs-enterprise',
    metaTitle: 'Odoo Community vs Enterprise: How to Choose | ODOOVATIONS',
    metaDescription:
      'A practical comparison of Odoo Community and Enterprise — features, licensing, hosting and support — to help you choose the right edition for your business.',
    h1: 'Odoo Community vs Enterprise: Which Edition Is Right for You',
    eyebrow: 'Comparison guide',
    summary:
      'Odoo Community is free and open-source but has fewer features and must be self-hosted. Odoo Enterprise adds features, mobile apps, studio, official support and hosting options for a per-user subscription. The right choice depends on the features you need, your budget model, and how much you want to manage yourself.',
    updated: '2026-07-16',
    readMinutes: 5,
    primaryKeyword: 'Odoo Community vs Enterprise',
    blocks: [
      { type: 'h2', text: 'The short answer' },
      { type: 'p', text: 'Choose Community if you want no licence fee, are comfortable self-hosting, and standard/community modules cover your needs. Choose Enterprise if you want the fuller feature set, official support, and managed hosting, and can budget for a per-user subscription.' },
      {
        type: 'table',
        head: ['Aspect', 'Community', 'Enterprise'],
        rows: [
          ['Licence fee', 'None (open source)', 'Per-user subscription'],
          ['Feature set', 'Core apps', 'Core + advanced (Studio, accounting, more)'],
          ['Mobile apps', 'Limited', 'Included'],
          ['Hosting', 'Self-hosted', 'Odoo Online / Odoo.sh / self-host'],
          ['Official support', 'Community only', 'Included with subscription'],
          ['Best for', 'Technical teams, tighter budgets', 'Businesses wanting features + support'],
        ],
      },
      { type: 'h2', text: 'What most Pakistani SMEs pick' },
      { type: 'p', text: 'There is no universally correct answer. Some businesses run well on Community with a good implementation partner; others prefer Enterprise for the advanced accounting, Studio and official support. The decision should follow your feature list and how much you want to self-manage — not a default.' },
      { type: 'h2', text: 'How we help you decide' },
      { type: 'list', items: [
        'Map the features you actually need against each edition.',
        'Compare total cost of ownership, including hosting and support.',
        'Consider your team’s ability to self-host and maintain.',
        'Plan an edition you can grow into, so you are not forced to migrate later.',
      ] },
    ],
    faqs: [
      { question: 'Can I move from Community to Enterprise later?', answer: 'Yes. Businesses often start on Community and move to Enterprise as they grow or need advanced features. Planning the data model well from the start makes that transition smoother.' },
      { question: 'Does Community get security updates?', answer: 'Community is actively maintained as open source, but you are responsible for applying updates and hosting. Enterprise includes maintenance as part of the subscription.' },
    ],
    relatedServices: [
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
      { label: 'Odoo Migration', href: '/services/odoo-migration' },
    ],
    relatedResources: ['odoo-implementation-cost-pakistan', 'standard-odoo-vs-custom-development'],
  },
  {
    slug: 'standard-odoo-vs-custom-development',
    href: '/resources/standard-odoo-vs-custom-development',
    metaTitle: 'Standard Odoo vs Custom Development: When to Build | ODOOVATIONS',
    metaDescription:
      'When should you use standard Odoo and when is custom development justified? A decision framework to avoid both over-customisation and forcing your business into generic software.',
    h1: 'Standard Odoo vs Custom Development: A Decision Framework',
    eyebrow: 'Decision framework',
    summary:
      'Use standard Odoo wherever it fits — it is faster, cheaper and easier to maintain. Justify custom development only when a requirement genuinely affects how your business operates and standard configuration cannot cover it. The goal is "standard where possible, custom where valuable".',
    updated: '2026-07-16',
    readMinutes: 5,
    primaryKeyword: 'standard Odoo vs custom development',
    blocks: [
      { type: 'h2', text: 'Why over-customisation is a risk' },
      { type: 'p', text: 'Every custom module adds cost to build, test, maintain and upgrade. Too much customisation makes your system fragile and expensive to keep current. That is why a good partner pushes back on unnecessary custom work.' },
      { type: 'h2', text: 'When custom development is justified' },
      { type: 'list', items: [
        'A core workflow is genuinely unique to your business and standard Odoo cannot model it.',
        'A manual step causes real, recurring operational pain (a specific approval, pricing rule, or report).',
        'An integration to a platform you depend on has no standard connector.',
        'A compliance or industry requirement must be enforced in the system.',
      ] },
      { type: 'h2', text: 'When to stay standard' },
      { type: 'list', items: [
        'The requirement is a preference, not an operational need.',
        'Standard Odoo does it a slightly different — but acceptable — way.',
        'A process change would remove the need entirely.',
      ] },
      { type: 'note', text: 'Our approach: configure standard Odoo first, then build only the missing layer — and agree that scope before any code is written.' },
    ],
    faqs: [
      { question: 'Will custom modules break when Odoo updates?', answer: 'Well-built custom modules follow Odoo’s development conventions so they survive upgrades with predictable maintenance. Poorly built ones break. This is why development quality and testing matter more than the amount of customisation.' },
      { question: 'How do you decide what to customise?', answer: 'We start from your real workflow, map it against standard Odoo, and propose custom development only for the gaps that genuinely affect your operations. You approve the scope before work begins.' },
    ],
    relatedServices: [
      { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
      { label: 'Odoo Business Automation', href: '/services/odoo-business-automation' },
    ],
    relatedResources: ['odoo-implementation-cost-pakistan', 'common-odoo-implementation-mistakes'],
  },
  {
    slug: 'odoo-data-migration-checklist',
    href: '/resources/odoo-data-migration-checklist',
    metaTitle: 'Odoo Data Migration Checklist (Excel & Legacy ERP) | ODOOVATIONS',
    metaDescription:
      'A practical checklist for migrating data into Odoo from Excel or a legacy ERP — what to prepare, clean, map, validate and verify so your new system starts accurate.',
    h1: 'Odoo Data Migration Checklist',
    eyebrow: 'Implementation checklist',
    summary:
      'Successful data migration is mostly preparation. Before go-live you need clean master data, a clear field mapping, a migration order that respects dependencies, and a validation step your team signs off. This checklist covers each stage.',
    updated: '2026-07-16',
    readMinutes: 6,
    primaryKeyword: 'Odoo data migration checklist',
    blocks: [
      { type: 'h2', text: 'Before migration' },
      { type: 'list', items: [
        'Identify every data source (Excel files, old ERP, POS, bank statements).',
        'Decide what to migrate — you rarely need all historical data.',
        'Clean master data: customers, suppliers, products, chart of accounts.',
        'Remove duplicates and standardise names, units and codes.',
        'Agree who owns and signs off each data set.',
      ] },
      { type: 'h2', text: 'Mapping and order' },
      { type: 'list', items: [
        'Map each source field to the correct Odoo field.',
        'Migrate in dependency order: contacts and products before orders; accounts before transactions.',
        'Preserve reference numbers your team recognises.',
        'Decide opening balances and stock as of the go-live date.',
      ] },
      { type: 'h2', text: 'Validation before go-live' },
      { type: 'list', items: [
        'Reconcile record counts and financial totals against the source.',
        'Spot-check a sample of customers, products and transactions.',
        'Have real users confirm the data looks right in day-to-day screens.',
        'Keep the old system read-only for a safe period after go-live.',
      ] },
      { type: 'note', text: 'Migrating messy data unchanged is the fastest way to lose trust in a new system. Clean first, then migrate.' },
    ],
    faqs: [
      { question: 'Do we need to migrate all our history?', answer: 'Usually not. Most businesses migrate open items, current stock, master data and a limited period of history. Full historical archives can stay in the old system for reference, which reduces cost and risk.' },
      { question: 'How long does migration take?', answer: 'It depends on data volume and cleanliness. Clean, well-structured data migrates quickly; messy multi-source data takes longer because cleaning is the real work. We scope this during discovery.' },
    ],
    relatedServices: [
      { label: 'Odoo Migration', href: '/services/odoo-migration' },
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
    ],
    relatedResources: ['common-odoo-implementation-mistakes', 'odoo-implementation-timeline'],
  },
  {
    slug: 'how-to-choose-an-odoo-implementation-company',
    href: '/resources/how-to-choose-an-odoo-implementation-company',
    metaTitle: 'How to Choose an Odoo Implementation Company | ODOOVATIONS',
    metaDescription:
      'What to look for when choosing an Odoo implementation partner in Pakistan — process, custom-development discipline, communication, support and honest scoping.',
    h1: 'How to Choose an Odoo Implementation Company',
    eyebrow: 'Buyer’s guide',
    summary:
      'The best Odoo partner starts by understanding your business, not by selling modules. Look for a clear methodology, discipline about custom development, transparent scope, strong communication, and real support after go-live — and be cautious of anyone promising a fixed price before understanding your workflow.',
    updated: '2026-07-16',
    readMinutes: 5,
    primaryKeyword: 'how to choose an Odoo implementation company',
    blocks: [
      { type: 'h2', text: 'Questions worth asking' },
      { type: 'list', items: [
        'How do you understand our business before proposing a solution?',
        'How do you decide what stays standard and what gets customised?',
        'What does your implementation process look like, stage by stage?',
        'How do you handle data migration and training?',
        'What support do we get after go-live, and how do we reach you?',
      ] },
      { type: 'h2', text: 'Green flags' },
      { type: 'list', items: [
        'They ask about your workflow before quoting.',
        'They push back on unnecessary customisation.',
        'They separate standard configuration from custom development in the scope.',
        'They communicate clearly and set expectations.',
      ] },
      { type: 'h2', text: 'Red flags' },
      { type: 'list', items: [
        'A fixed price before understanding your process.',
        'Claims of an official partnership or certification without proof.',
        'Promises to customise everything.',
        'No clear plan for data migration, training or support.',
      ] },
    ],
    faqs: [
      { question: 'Does the partner need to be in my city?', answer: 'Not necessarily. A structured remote process works well for most projects. A local presence helps for on-site discovery and go-live, which is why some businesses prefer a partner who can do both — like a Karachi-based team serving clients Pakistan-wide.' },
      { question: 'Should I trust "Official Odoo Partner" claims?', answer: 'Only if they can be verified. Partnership status is not a guarantee of good delivery, and it should never be claimed without proof. Judge a partner on process, communication and real work.' },
    ],
    relatedServices: [
      { label: 'Odoo Consulting', href: '/services/odoo-consulting' },
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
    ],
    relatedResources: ['odoo-implementation-timeline', 'common-odoo-implementation-mistakes'],
  },
  {
    slug: 'odoo-implementation-timeline',
    href: '/resources/odoo-implementation-timeline',
    metaTitle: 'Odoo Implementation Timeline: What to Expect | ODOOVATIONS',
    metaDescription:
      'How long does an Odoo implementation take? The stages that make up a project — discovery, blueprint, build, migration, training and go-live — and what affects the timeline.',
    h1: 'Odoo Implementation Timeline: What Affects How Long It Takes',
    eyebrow: 'Planning guide',
    summary:
      'There is no fixed duration for an Odoo project. Timeline is driven by the number of modules, the amount of custom development and integration, data volume and quality, and how quickly your team can review and make decisions. This guide breaks the project into stages so you can plan realistically.',
    updated: '2026-07-16',
    readMinutes: 5,
    primaryKeyword: 'Odoo implementation timeline',
    blocks: [
      { type: 'h2', text: 'The stages of a project' },
      {
        type: 'table',
        head: ['Stage', 'What happens', 'What affects duration'],
        rows: [
          ['Discovery', 'Map workflow and requirements', 'Business complexity, access to people'],
          ['Blueprint', 'Agree scope: standard vs custom', 'Decision speed, number of modules'],
          ['Build & test', 'Configure, develop, integrate, test', 'Amount of custom work and integration'],
          ['Data & training', 'Migrate data, train the team', 'Data volume and cleanliness'],
          ['Go-live & support', 'Launch and stabilise', 'Readiness and change management'],
        ],
      },
      { type: 'h2', text: 'What makes projects slower' },
      { type: 'list', items: [
        'Unclear or changing requirements.',
        'Messy data that needs heavy cleaning.',
        'Many custom modules and integrations.',
        'Slow internal reviews and approvals.',
      ] },
      { type: 'h2', text: 'What makes projects faster' },
      { type: 'list', items: [
        'A clear scope agreed early.',
        'Clean, well-structured data.',
        'Staying standard where possible.',
        'An engaged internal team that reviews promptly.',
      ] },
      { type: 'note', text: 'We give a realistic timeline range after discovery, once the scope is clear — not a fixed promise before understanding your business.' },
    ],
    faqs: [
      { question: 'Can we go live in phases?', answer: 'Yes. Phased go-live — starting with core modules and adding more later — reduces risk and often gets you value sooner than trying to launch everything at once.' },
      { question: 'What delays most projects?', answer: 'In our experience, unclear requirements and messy data cause the most delay — not the software. Preparation and prompt internal decisions keep projects on track.' },
    ],
    relatedServices: [
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
      { label: 'Odoo Migration', href: '/services/odoo-migration' },
    ],
    relatedResources: ['odoo-data-migration-checklist', 'odoo-readiness-assessment'],
  },
  {
    slug: 'odoo-readiness-assessment',
    href: '/resources/odoo-readiness-assessment',
    metaTitle: 'Is Your Business Ready for Odoo? A Readiness Check | ODOOVATIONS',
    metaDescription:
      'A short readiness assessment to check whether your business is prepared for an Odoo implementation — process clarity, data, ownership, and change readiness.',
    h1: 'Is Your Business Ready for Odoo? A Practical Readiness Check',
    eyebrow: 'Readiness assessment',
    summary:
      'You are ready for Odoo when you understand your own processes, someone owns the project internally, your data is reachable (even if messy), and your team is open to changing how they work. This guide gives you a quick self-check before you start.',
    updated: '2026-07-16',
    readMinutes: 4,
    primaryKeyword: 'Odoo readiness assessment',
    blocks: [
      { type: 'h2', text: 'Signs you are ready' },
      { type: 'list', items: [
        'You can describe how orders, stock, purchasing and accounting flow today.',
        'One person will own the project internally and make decisions.',
        'Your data exists somewhere you can export it — even Excel.',
        'Leadership supports changing manual habits.',
        'You know the top problems you want the system to solve.',
      ] },
      { type: 'h2', text: 'Signs you need preparation first' },
      { type: 'list', items: [
        'Nobody can clearly explain the current workflow.',
        'No one is available to own the project.',
        'Data is scattered and undocumented with no clear owner.',
        'The team is strongly resistant to any change.',
      ] },
      { type: 'note', text: 'Not fully ready is normal. A good discovery process helps you get ready — mapping your workflow is often the first valuable outcome, before any software is configured.' },
    ],
    faqs: [
      { question: 'What if our processes are not documented?', answer: 'That is common and not a blocker. Part of discovery is mapping your current process. You do not need documentation beforehand — you need people who understand how the business actually runs.' },
      { question: 'Do we need a dedicated IT team?', answer: 'No. You need a business owner for the project and access to the people who run each department. Technical delivery is handled by the implementation team.' },
    ],
    relatedServices: [
      { label: 'Odoo Consulting', href: '/services/odoo-consulting' },
      { label: 'Odoo Implementation in Pakistan', href: '/services/odoo-implementation-pakistan' },
    ],
    relatedResources: ['how-to-choose-an-odoo-implementation-company', 'odoo-implementation-timeline'],
  },
  {
    slug: 'common-odoo-implementation-mistakes',
    href: '/resources/common-odoo-implementation-mistakes',
    metaTitle: 'Common Odoo Implementation Mistakes (and How to Avoid Them) | ODOOVATIONS',
    metaDescription:
      'The mistakes that cause Odoo projects to struggle — over-customisation, skipping discovery, poor data, no ownership, weak training — and how to avoid each one.',
    h1: 'Common Odoo Implementation Mistakes and How to Avoid Them',
    eyebrow: 'Lessons guide',
    summary:
      'Most struggling Odoo projects fail for the same avoidable reasons: skipping discovery, over-customising, migrating messy data, having no internal owner, and under-investing in training. Knowing these upfront is the easiest way to avoid them.',
    updated: '2026-07-16',
    readMinutes: 5,
    primaryKeyword: 'common Odoo implementation mistakes',
    blocks: [
      { type: 'h2', text: 'The mistakes we see most' },
      { type: 'list', items: [
        'Skipping discovery and configuring before understanding the real workflow.',
        'Over-customising instead of adapting the process to good standard Odoo.',
        'Migrating messy data and losing trust in the system on day one.',
        'No internal project owner, so decisions stall.',
        'Treating training as an afterthought, so adoption fails.',
        'Trying to launch every module at once instead of phasing.',
      ] },
      { type: 'h2', text: 'How to avoid them' },
      { type: 'list', items: [
        'Invest in discovery — it de-risks everything after it.',
        'Stay standard where possible; customise only where it adds value.',
        'Clean data before migration and validate before go-live.',
        'Name an internal owner with authority to decide.',
        'Train on real workflows, not abstract demos.',
        'Phase the rollout to build confidence.',
      ] },
      { type: 'note', text: 'None of these are software problems — they are project problems. A disciplined process prevents most of them.' },
    ],
    faqs: [
      { question: 'What is the single biggest mistake?', answer: 'Skipping discovery. Almost every other problem — wrong customisation, bad data, poor adoption — traces back to not understanding the real workflow before building.' },
      { question: 'Is over-customisation really that risky?', answer: 'Yes. Excess customisation raises cost, makes upgrades harder and can make the system fragile. Good partners customise deliberately, only where it genuinely helps the business.' },
    ],
    relatedServices: [
      { label: 'Odoo Consulting', href: '/services/odoo-consulting' },
      { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
    ],
    relatedResources: ['standard-odoo-vs-custom-development', 'odoo-data-migration-checklist'],
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
