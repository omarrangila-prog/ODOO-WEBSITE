/**
 * Resources — evergreen, high-intent decision-support guides. No blog filler,
 * no fabricated numbers, no invented projects. Each guide answers a genuine
 * buying / comparison / implementation / migration / pricing question.
 *
 * Content blocks render generically so every guide stays unique in substance.
 */

import { techGuides } from './resources-tech';

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

const coreResources: Resource[] = [
  {
    slug: 'odoo-implementation-cost-pakistan',
    href: '/resources/odoo-implementation-cost-pakistan',
    metaTitle: 'Odoo Implementation Cost in Pakistan | ODOOVATIONS',
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
    metaTitle: 'Odoo Data Migration Checklist | ODOOVATIONS',
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
    metaTitle: 'Common Odoo Implementation Mistakes | ODOOVATIONS',
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
  {
    slug: 'what-ai-can-automate-in-a-business',
    href: '/resources/what-ai-can-automate-in-a-business',
    metaTitle: 'What Can AI Actually Automate in a Business? | ODOOVATIONS',
    metaDescription:
      'A practical list of what AI can and cannot automate in a Pakistani business — with the test we use to decide whether a process is worth automating at all.',
    h1: 'What Can AI Actually Automate in a Business?',
    eyebrow: 'AI & automation',
    summary:
      'AI reliably automates repetitive digital processes with a clear input, a clear output and a way to check the result: answering common enquiries, qualifying leads, reading documents into a system, routing approvals, drafting replies and generating reports. It does not reliably automate judgement calls, undocumented processes, or work where a wrong answer is both expensive and invisible. This guide gives the test we apply before quoting any automation.',
    updated: '2026-09-11',
    readMinutes: 9,
    primaryKeyword: 'what can AI automate in a business',
    blocks: [
      { type: 'h2', text: 'The test that matters' },
      { type: 'p', text: 'Before looking at any tool, we ask four questions about the process. If the answer to all four is yes, automation will probably work. If any answer is no, that gap is the real project — and automating on top of it usually makes things worse rather than better.' },
      { type: 'list', items: [
        'Is it repetitive? Something done many times a week, not a handful of times a year.',
        'Is it digital? The information already exists in a system, a document or a message — not in someone’s head or on a shelf.',
        'Are the rules writable down? Someone can state what should happen in each case, including the awkward ones.',
        'Can a wrong result be caught? There is a check, a threshold or a person who would notice before the mistake becomes expensive.',
      ] },
      { type: 'p', text: 'That fourth question is the one most often skipped, and it is the one that decides whether an automation is an asset or a liability. An automation that is wrong 2% of the time is excellent if the errors are visible and cheap, and unacceptable if they silently corrupt your accounts.' },
      { type: 'h2', text: 'What genuinely works today' },
      { type: 'list', items: [
        'Answering repeated customer questions from your own approved content, on WhatsApp, web chat or email.',
        'Qualifying inbound leads against your criteria and routing them to the right salesperson with the conversation attached.',
        'Reading invoices, purchase orders and forms, extracting the fields you use, and writing them into your system with uncertain ones flagged.',
        'Drafting replies, quotations and follow-up messages for a person to review and send.',
        'Routing approvals based on rules — amount, category, department — and chasing them automatically.',
        'Summarising long documents, threads or call transcripts into something scannable.',
        'Answering staff questions from internal policies, product data and documentation.',
        'Generating scheduled reports and flagging figures that moved unusually.',
      ] },
      { type: 'h2', text: 'What does not work, and why' },
      { type: 'table', head: ['Process', 'Why it fails'], rows: [
        ['Anything the business has never written down', 'There is nothing to automate against. Different staff do it differently and each believes theirs is the standard.'],
        ['Genuine negotiation or judgement', 'The value is in weighing factors that are not in any system — relationship history, a supplier’s reliability, what the customer is not saying.'],
        ['Final approval of payments', 'The cost of a silent error is high and it may not surface for weeks. A person approves; the automation prepares.'],
        ['Work needing physical handling', 'Software automation does not move, count or inspect physical goods. That is separate equipment.'],
        ['Processes that change every month', 'By the time the automation is tested, the rules have moved. Stabilise the process first.'],
      ] },
      { type: 'h2', text: 'Where the returns usually are' },
      { type: 'p', text: 'In our experience with businesses in Pakistan, the fastest return is almost never the most sophisticated project. It is the first-response problem: enquiries arriving from ads outside office hours and being answered the next afternoon. Fixing that requires modest technology and changes revenue immediately, because the lead was already paid for.' },
      { type: 'p', text: 'The second is document entry — invoices and orders retyped from PDFs and photographs. It is unglamorous, highly repetitive, and the errors it removes were costing real money in reconciliation time.' },
      { type: 'h2', text: 'How to start without wasting money' },
      { type: 'list', items: [
        'Pick one process, not a strategy. Breadth is what kills these projects.',
        'Choose one where you can measure the before state — how many enquiries, how long a reply takes, how many hours of entry.',
        'Run it supervised first: the automation proposes, a person approves, for long enough to see its error pattern.',
        'Only then widen the scope, and only to the next single process.',
      ] },
      { type: 'note', text: 'Anyone promising to "automate your entire business with AI" in one project is selling something. Automation compounds through a series of narrow, verified wins — and each one has to earn the next.' },
    ],
    faqs: [
      { question: 'Do we need a lot of data to use AI?', answer: 'For the common cases, no. Answering questions from your documents, processing invoices or qualifying leads needs your existing content and rules, not a large training dataset. Training a custom model would need substantial data — but that is rarely what a business actually needs.' },
      { question: 'Will AI replace our staff?', answer: 'In the projects we deliver it removes tasks, not roles — the retyping, the repeated answers, the report assembly. What usually changes is that the same team handles more volume without more headcount. We would rather scope it that way honestly than promise headcount cuts we cannot predict.' },
      { question: 'What does it cost to start?', answer: 'A single well-defined automation is a modest project priced against a written scope. The cost driver is integration complexity — how many systems have to be read from and written to — far more than the AI itself.' },
      { question: 'Is our data sent to an external AI provider?', answer: 'That depends on the design, and it is agreed in writing before we start. Where data sensitivity requires it, we scope so sensitive fields never leave your environment.' },
    ],
    relatedServices: [
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
    ],
    relatedResources: ['custom-software-cost-pakistan', 'whatsapp-automation-guide'],
  },
  {
    slug: 'custom-software-cost-pakistan',
    href: '/resources/custom-software-cost-pakistan',
    metaTitle: 'How Much Does Custom Software Cost in Pakistan? | ODOOVATIONS',
    metaDescription:
      'What actually drives custom software cost in Pakistan — scope, users, integrations, data migration and mobile. The factors behind the number, not a fake price list.',
    h1: 'How Much Does Custom Software Cost in Pakistan?',
    eyebrow: 'Custom software',
    summary:
      'There is no single price, because "custom software" covers everything from a one-screen internal tool to a multi-branch operations platform. Cost is driven by the number of distinct workflows, user roles, integrations, the state of your existing data, and whether mobile access is needed. This guide explains each factor so you can judge a quote — including ours — rather than comparing numbers with no scope attached.',
    updated: '2026-09-11',
    readMinutes: 10,
    primaryKeyword: 'custom software cost Pakistan',
    blocks: [
      { type: 'h2', text: 'Why nobody can quote from a category name' },
      { type: 'p', text: '"An inventory system" can mean a single-warehouse stock list, or multi-location stock with batch and expiry tracking, barcode picking, e-commerce sync and valuation posting into accounts. Those are not variations of one project; they are different projects that happen to share a noun. Any firm quoting a firm price before seeing your workflow is either padding heavily or planning to raise it later through change requests.' },
      { type: 'h2', text: 'The six factors that move the number most' },
      { type: 'table', head: ['Factor', 'What increases cost'], rows: [
        ['Distinct workflows', 'Each genuinely different process — sales, purchase, production, approvals — is separate design, build and testing. Two workflows is not twice one; five is not five times one, but it is not far off.'],
        ['User roles & permissions', 'One role is simple. Eight roles with different visibility, approval limits and edit rights multiplies the testing more than the building.'],
        ['Integrations', 'Each connected system adds work, and the cost depends on the other side. A documented modern API is straightforward; an old system with no API may need an entirely different approach.'],
        ['Data migration', 'Clean data in a consistent format is quick. Years of spreadsheets with inconsistent product names and duplicate customers is often the single largest line in the project.'],
        ['Mobile access', 'A responsive web interface is modest. A genuine native app for both platforms, with offline capability, is a substantial addition.'],
        ['Reporting depth', 'Standard lists are cheap. Custom analytics with drill-downs, cross-module calculations and scheduled distribution costs real engineering.'],
      ] },
      { type: 'h2', text: 'Costs people forget to budget for' },
      { type: 'list', items: [
        'Data cleaning before migration — usually your team’s time rather than ours, but it is real time.',
        'Training, including staff on rotating shifts and the ones who join three months later.',
        'Hosting, backups and any third-party service the system depends on, billed monthly forever.',
        'Support and changes after go-live, which will be needed, because the first month of real use always reveals something.',
        'Your own people’s time during discovery and testing — the largest hidden cost, and the one that most affects whether the project succeeds.',
      ] },
      { type: 'h2', text: 'How to make a quote comparable' },
      { type: 'p', text: 'Ask every firm to quote against the same written scope, and insist that scope lists workflows, roles, integrations and reports by name. If two quotes differ by a large multiple, they are almost always describing different projects rather than different rates. Ask specifically what happens to the price when something is discovered mid-build — a firm with an honest answer to that question is usually the safer choice.' },
      { type: 'h2', text: 'Phasing, and why it usually saves money' },
      { type: 'p', text: 'Building everything before anything goes live is the most expensive way to run these projects, because every wrong assumption survives until the end. Phasing puts one workflow into real use early, which exposes the assumptions while they are still cheap to correct. It also means the business gets value months earlier, which is usually worth more than the discount from doing it all at once.' },
      { type: 'note', text: 'We quote against a written scope after discovery. If discovery suggests an off-the-shelf product would serve you better, we will say so — losing a build we should not have sold is cheaper for us than delivering one that fails.' },
    ],
    faqs: [
      { question: 'Is custom software cheaper than buying a product?', answer: 'Usually not upfront. It can be cheaper over several years if per-user licence costs scale badly against the value you get, or if the product cannot do the thing that actually differentiates your business. Compare total cost over three to five years, not the first invoice.' },
      { question: 'Can we start small and extend later?', answer: 'Yes, and it is usually the right approach — provided the architecture anticipates it. Ask explicitly whether the design allows for the modules you expect to add, because retrofitting them into something built narrowly is expensive.' },
      { question: 'Do we own the source code?', answer: 'With us, yes, and it is stated in the agreement. Always confirm this in writing with any firm before starting — it is the difference between owning an asset and renting one indefinitely.' },
      { question: 'What if we run out of budget halfway?', answer: 'This is exactly why we phase. Each phase should leave you with something usable rather than a half-built system. If a project can only deliver value at the very end, that is a structural risk worth questioning.' },
    ],
    relatedServices: [
      { label: 'Custom Software Development', href: '/services/custom-software-development' },
      { label: 'Accounting Software', href: '/solutions/accounting-software' },
    ],
    relatedResources: ['what-ai-can-automate-in-a-business', 'standard-odoo-vs-custom-development'],
  },
  {
    slug: 'whatsapp-automation-guide',
    href: '/resources/whatsapp-automation-guide',
    metaTitle: 'WhatsApp Automation for Business: Complete Guide | ODOOVATIONS',
    metaDescription:
      'How WhatsApp automation works for Pakistani businesses — official API versus unofficial tools, what it costs, what it can do, and the risks worth knowing first.',
    h1: 'WhatsApp Automation for Business: A Practical Guide',
    eyebrow: 'AI & automation',
    summary:
      'WhatsApp automation connects your business number to your systems so enquiries get an instant reply, leads are qualified and passed to a salesperson, and routine messages are sent automatically. The single most important decision is official WhatsApp Business Platform (Cloud API) versus an unofficial tool — it determines reliability, cost and whether your number can be blocked. This guide covers both honestly.',
    updated: '2026-09-11',
    readMinutes: 11,
    primaryKeyword: 'WhatsApp automation business Pakistan',
    blocks: [
      { type: 'h2', text: 'The decision that matters most' },
      { type: 'p', text: 'Everything else is detail. There are two routes to automating WhatsApp, and they have genuinely different risk profiles.' },
      { type: 'table', head: ['', 'Official Cloud API', 'Unofficial tools'], rows: [
        ['How it works', 'Meta’s sanctioned business platform, via a verified business and approved number.', 'Software driving the normal WhatsApp app, often through an unofficial connection.'],
        ['Cost', 'Meta charges per conversation, varying by country and category, billed to you.', 'Usually a flat monthly tool fee, so cheaper at volume.'],
        ['Risk', 'Sanctioned. Your number is not at risk for using it as intended.', 'Against WhatsApp’s terms. Numbers can be and are blocked, sometimes permanently.'],
        ['Template messages', 'Business-initiated messages need pre-approved templates.', 'No approval step, which is why it appeals.'],
        ['Phone app', 'The number can no longer be used in the normal app on a handset.', 'The number stays on the phone.'],
        ['Suits', 'Anything the business depends on — order updates, invoices, payment reminders.', 'Low-stakes experiments where losing the number would not hurt.'],
      ] },
      { type: 'p', text: 'Our position is straightforward: if losing the number would damage the business, use the official platform. The monthly saving from an unofficial tool is not worth the day your customer-facing number stops working with no appeal process.' },
      { type: 'h2', text: 'What businesses actually automate' },
      { type: 'list', items: [
        'Instant welcome and qualification for leads arriving from Meta and Google ads.',
        'Routing a qualified lead to the right salesperson with the conversation attached.',
        'Order confirmation, dispatch and delivery updates triggered by your system.',
        'Payment reminders on a schedule, before the account ages badly.',
        'Invoice, quotation and document delivery.',
        'Appointment booking, confirmation and reminders.',
        'Answering common questions from approved content, with a fast route to a human.',
        'Internal alerts to your own team when something needs attention.',
      ] },
      { type: 'h2', text: 'The flow that produces the most value' },
      { type: 'p', text: 'For most businesses running paid ads, one flow outperforms everything else: ad click, WhatsApp, instant welcome, two or three qualifying questions, CRM record, assignment to a salesperson, automated follow-up if there is no reply. The value is not the chatbot. It is that a lead you already paid for gets answered in seconds instead of tomorrow, and that it is now recorded somewhere other than one person’s phone.' },
      { type: 'h2', text: 'Getting set up on the official platform' },
      { type: 'list', items: [
        'A Meta Business account with business verification completed — this takes time and needs real documentation.',
        'A phone number not currently active on the normal WhatsApp or WhatsApp Business app.',
        'A display name that meets Meta’s guidelines.',
        'Message templates submitted for approval before you can start conversations.',
        'A connection between the platform and your CRM, ERP or database — which is where the actual engineering is.',
      ] },
      { type: 'h2', text: 'Mistakes worth avoiding' },
      { type: 'list', items: [
        'Migrating your main number without realising it leaves the phone app permanently.',
        'Writing templates so promotional that Meta rejects them, then relaunching late.',
        'Building a bot that traps people with no visible route to a human.',
        'Automating outbound messages at a volume that reads as spam and earns you blocks from recipients.',
        'Treating it as a chatbot project rather than an integration project — the value is in the connection to real data.',
      ] },
      { type: 'note', text: 'ODOOVATIONS is not a Meta partner and claims no special status with Meta. Platform rules, pricing and approval requirements are set by Meta and change; confirm current terms with Meta’s own documentation.' },
    ],
    faqs: [
      { question: 'Can we keep using the number on our phone?', answer: 'Not on the official Cloud API. Once a number is migrated it leaves the normal WhatsApp and WhatsApp Business apps. Many businesses move a secondary number, or accept the change and work through a shared team inbox instead.' },
      { question: 'How much does Meta charge?', answer: 'Per conversation, with rates varying by country and conversation category, billed directly to you by Meta rather than through us. We estimate likely volume during scoping so the running cost is not a surprise.' },
      { question: 'Will customers find it annoying?', answer: 'They find slow replies more annoying. What causes complaints is a bot with no escape route, or outbound messaging people did not ask for — both are design choices you control.' },
      { question: 'Can it read our stock and order data?', answer: 'Yes, and that is where the value is. A message that can answer "where is my order" from real data is worth far more than one that can only answer general questions.' },
    ],
    relatedServices: [
      { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
      { label: 'AI Automation', href: '/services/ai-automation' },
    ],
    relatedResources: ['what-ai-can-automate-in-a-business', 'business-website-cost-pakistan'],
  },
  {
    slug: 'business-website-cost-pakistan',
    href: '/resources/business-website-cost-pakistan',
    metaTitle: 'How Much Should a Business Website Cost? | ODOOVATIONS',
    metaDescription:
      'What drives business website cost in Pakistan — pages, custom design, e-commerce, integrations and SEO groundwork — plus the ongoing costs most quotes leave out.',
    h1: 'How Much Should a Business Website Cost?',
    eyebrow: 'Web & digital',
    summary:
      'Website cost is driven by how much of the build is genuinely custom: template versus custom design, number of unique page types, whether e-commerce or logins are involved, how many systems it connects to, and whether SEO and analytics groundwork is included. This guide explains the factors and the ongoing costs that quotes routinely omit.',
    updated: '2026-09-11',
    readMinutes: 9,
    primaryKeyword: 'business website cost Pakistan',
    blocks: [
      { type: 'h2', text: 'Why quotes vary so widely' },
      { type: 'p', text: 'The same brief can produce quotes an order of magnitude apart, and both can be honest. One is a template with your logo and text placed into it. The other is custom design, custom page types, content structure planned for search, integrations into your systems, and performance engineered rather than hoped for. Neither is wrong — but they are not the same product, and comparing their prices tells you nothing.' },
      { type: 'h2', text: 'What actually drives the number' },
      { type: 'table', head: ['Factor', 'Effect on cost'], rows: [
        ['Design approach', 'A template is the cheapest route. Custom design costs more and is what stops you looking like every competitor using the same theme.'],
        ['Unique page types', 'Cost follows distinct layouts, not page count. Forty pages using three layouts is far cheaper than eight pages each designed differently.'],
        ['E-commerce', 'Catalogue, cart, payment gateway, shipping and order flow is a substantial step up from a brochure site.'],
        ['Logins & portals', 'Accounts, roles and customer-specific data move the project from a website into an application.'],
        ['Integrations', 'CRM, ERP, payment, courier or WhatsApp connections each add real work.'],
        ['Content', 'Who writes the copy and sources the images? If it is us, it is a line in the quote. If it is you, it is the most common reason these projects run late.'],
        ['SEO & analytics groundwork', 'Structure, metadata, schema, redirects from an old site and tracking setup — cheap during the build, expensive to retrofit.'],
      ] },
      { type: 'h2', text: 'The ongoing costs quotes leave out' },
      { type: 'list', items: [
        'Domain renewal, annually.',
        'Hosting, monthly or annually, scaling with traffic.',
        'SSL, usually included now but worth confirming.',
        'Maintenance and security updates — the cost of not doing this is eventually a compromised site.',
        'Content updates, unless your team can do them without a developer.',
        'Any paid plugin, font licence or third-party service the build depends on.',
      ] },
      { type: 'h2', text: 'Where spending more is usually justified' },
      { type: 'list', items: [
        'Performance. A site that loads slowly on a mid-range phone on mobile data loses visitors before they read anything, and most of Pakistan browses exactly that way.',
        'Content structure. Pages built around what people actually search for keep producing enquiries years later.',
        'Conversion design. A clear path to one action is worth more than an extra animation.',
        'A redesign migration plan. Rebuilding without mapping old URLs is how companies lose rankings they spent years earning.',
      ] },
      { type: 'h2', text: 'Where spending more is usually wasted' },
      { type: 'list', items: [
        'Heavy animation that slows the first load.',
        'A large custom CMS when a standard one would do.',
        'Twenty pages nobody searches for, built because a competitor has them.',
        'A mobile app before the mobile website works properly.',
      ] },
      { type: 'note', text: 'The most useful question to ask any web quote is: what is this site supposed to make happen, and how will we know whether it did? A quote that cannot answer that is pricing decoration.' },
    ],
    faqs: [
      { question: 'Is a cheap template site a bad idea?', answer: 'Not necessarily. For a small business that mainly needs to exist credibly and be contactable, a well-built template site is a sensible use of money. It becomes a false economy when the site is a primary sales channel, or when it needs to connect to your systems.' },
      { question: 'How long does a website take?', answer: 'The build is rarely the constraint — content is. Sites wait on copy, images and approvals far more often than on development. Committing a person to own content on your side does more for the timeline than anything we do.' },
      { question: 'Will we be able to update it ourselves?', answer: 'Ask this explicitly before signing, and ask to see how. "Yes" can mean a genuine editor or it can mean editing code. It is a legitimate cost either way, but you should know which you are buying.' },
      { question: 'Will redesigning lose our Google rankings?', answer: 'It can, and it is entirely avoidable. The old URLs must be inventoried, ranking content preserved, and permanent redirects mapped for anything that changes. Ask any agency how they handle this — the answer tells you a great deal.' },
    ],
    relatedServices: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
    relatedResources: ['custom-software-cost-pakistan', 'whatsapp-automation-guide'],
  },
];

// Guides for the wider technology questions people search (apps, ERP, platforms, AI, AEO/GEO).
export const resources: Resource[] = [...coreResources, ...techGuides];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
