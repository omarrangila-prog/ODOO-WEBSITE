export interface Service {
  slug: string;
  href: string;
  title: string;
  navLabel: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problems: string[];
  whatWeDo: { title: string; body: string }[];
  modules: string[];
  outcomes: string[];
  process: string[];
}

export const services: Service[] = [
  {
    slug: 'odoo-implementation-pakistan',
    href: '/services/odoo-implementation-pakistan',
    title: 'Odoo Implementation in Pakistan',
    navLabel: 'Odoo Implementation',
    tagline: 'End-to-end Odoo setup, built around how your business actually runs.',
    metaTitle: 'Odoo Implementation in Pakistan | ODOOVATIONS',
    metaDescription:
      'End-to-end Odoo implementation for businesses in Pakistan and worldwide. We map your real workflow, configure the right modules and deliver a working system.',
    intro:
      'We implement Odoo around your real operations — not a generic template. From sales and inventory to accounting and manufacturing, we connect your departments into one system your team will actually use.',
    problems: [
      'Orders and approvals live in WhatsApp, email and paper.',
      'Stock records never match what is physically in the warehouse.',
      'Reporting is manual, slow and out of date by the time it arrives.',
      'Sales, purchase and accounts each keep their own version of the truth.',
    ],
    whatWeDo: [
      {
        title: 'Workflow-first configuration',
        body: 'We start from how your team works today and configure Odoo to match — then improve it, step by step.',
      },
      {
        title: 'Right-sized module scope',
        body: 'Only the modules you need, connected properly, so the system stays simple to run and easy to grow.',
      },
      {
        title: 'Data, permissions and training',
        body: 'Existing data is prepared and validated, roles are set correctly, and your team learns on real workflows.',
      },
    ],
    modules: ['CRM', 'Sales', 'Purchase', 'Inventory', 'Accounting', 'Reporting'],
    outcomes: [
      'One connected system across departments',
      'Live, accurate operational visibility',
      'Fewer manual errors and duplicate data entry',
      'A stable platform you can grow on',
    ],
    process: [
      'Business Discovery',
      'Solution Blueprint',
      'Prototype',
      'Build & Test',
      'Data & Training',
      'Go-Live & Support',
    ],
  },
  {
    slug: 'custom-odoo-development',
    href: '/services/custom-odoo-development',
    title: 'Custom Odoo Development',
    navLabel: 'Custom Odoo Development',
    tagline: 'Custom modules built only where they create measurable value.',
    metaTitle: 'Custom Odoo Development & Module Building | ODOOVATIONS',
    metaDescription:
      'Custom Odoo module development for Pakistani and international businesses. Approval flows, industry forms, pricing rules, custom reports and integrations — no unnecessary complexity.',
    intro:
      'When standard Odoo does not fully match your process, we build precise custom modules — approval flows, industry-specific forms, pricing logic, reports and integrations — without over-engineering.',
    problems: [
      'A critical part of your process has no home in standard Odoo.',
      'Manual approvals and exceptions slow everything down.',
      'Your pricing or reporting rules are more nuanced than the defaults.',
      'Previous customisations became fragile and hard to maintain.',
    ],
    whatWeDo: [
      {
        title: 'Custom approval & workflow logic',
        body: 'Multi-step approvals, conditional routing and automations that reflect real responsibilities.',
      },
      {
        title: 'Industry-specific forms & reports',
        body: 'Data structures, documents and reports designed for how your sector actually operates.',
      },
      {
        title: 'Maintainable, upgrade-safe code',
        body: 'We customise only where it pays off, and build so future Odoo upgrades stay smooth.',
      },
    ],
    modules: ['Custom Modules', 'Business Intelligence and Reporting', 'Documents'],
    outcomes: [
      'Software that fits the business, not the reverse',
      'Automated approvals and fewer bottlenecks',
      'Reports that answer your real questions',
      'A codebase that stays maintainable over time',
    ],
    process: [
      'Business Discovery',
      'Solution Blueprint',
      'Prototype',
      'Build & Test',
      'Data & Training',
      'Go-Live & Support',
    ],
  },
  {
    slug: 'odoo-integration',
    href: '/services/odoo-integration',
    title: 'Odoo Integration Services',
    navLabel: 'Odoo Integration',
    tagline: 'Connect Odoo with the platforms your business already relies on.',
    metaTitle: 'Odoo Integration Services | ODOOVATIONS',
    metaDescription:
      'Connect Odoo with Shopify, WooCommerce, WhatsApp, payment gateways, couriers, banking and custom APIs. One reliable flow of information across your systems.',
    intro:
      'We connect Odoo with the tools you already use so information flows in one direction of truth. Integration availability depends on the platform, API access and scope — we scope this clearly before we build.',
    problems: [
      'Your online store and Odoo hold different stock and order data.',
      'Payments, couriers and banking are reconciled by hand.',
      'The same record is typed into two or three systems.',
      'You want to keep proven tools without losing a single source of truth.',
    ],
    whatWeDo: [
      {
        title: 'E-commerce & channel sync',
        body: 'Shopify and WooCommerce orders, products and stock kept aligned with Odoo.',
      },
      {
        title: 'Payments, couriers & banking',
        body: 'Connect gateways, courier services and bank feeds to reduce manual reconciliation.',
      },
      {
        title: 'Custom API bridges',
        body: 'Where no standard connector exists, we build reliable, well-documented API integrations.',
      },
    ],
    modules: ['Sales', 'Inventory', 'Accounting', 'E-commerce', 'Custom Modules'],
    outcomes: [
      'One reliable flow of information',
      'Far less manual reconciliation',
      'Fewer channel and stock mismatches',
      'Keep the tools your team already trusts',
    ],
    process: [
      'Business Discovery',
      'Solution Blueprint',
      'Prototype',
      'Build & Test',
      'Data & Training',
      'Go-Live & Support',
    ],
  },
  {
    slug: 'odoo-consulting',
    href: '/services/odoo-consulting',
    title: 'Odoo Consulting',
    navLabel: 'Consulting',
    tagline: 'Clarify scope, priorities and the right next step before you invest.',
    metaTitle: 'Odoo Consulting & Advisory | ODOOVATIONS',
    metaDescription:
      'Odoo consulting for businesses in Pakistan and abroad. We assess your workflow, define a clear scope and prevent unnecessary customisation before implementation begins.',
    intro:
      'Not sure where to start, or whether a previous setup went wrong? We assess your operations objectively and give you a clear, honest scope — including what you should not build.',
    problems: [
      'You are unsure which modules you actually need.',
      'A previous implementation stalled or was over-complicated.',
      'Stakeholders disagree on priorities and scope.',
      'You need a realistic plan and budget before committing.',
    ],
    whatWeDo: [
      {
        title: 'Operational assessment',
        body: 'We map current workflows, bottlenecks and responsibilities across departments.',
      },
      {
        title: 'Clear scope & roadmap',
        body: 'A prioritised plan showing what to configure, customise, integrate — and what to leave alone.',
      },
      {
        title: 'Independent second opinion',
        body: 'A candid review of an existing setup, with a practical path to fix it.',
      },
    ],
    modules: ['CRM', 'Sales', 'Inventory', 'Accounting', 'Reporting'],
    outcomes: [
      'A clear, prioritised roadmap',
      'A realistic budget and timeline',
      'Less risk of scope creep',
      'Confidence before you invest',
    ],
    process: ['Business Discovery', 'Solution Blueprint', 'Prototype'],
  },
  {
    slug: 'odoo-support-maintenance',
    href: '/services/odoo-support-maintenance',
    title: 'Odoo Support & Maintenance',
    navLabel: 'Support & Maintenance',
    tagline: 'Keep your system stable, fast and evolving after go-live.',
    metaTitle: 'Odoo Support & Maintenance in Pakistan | ODOOVATIONS',
    metaDescription:
      'Ongoing Odoo support and maintenance for businesses in Pakistan and worldwide. Issue resolution, performance, upgrades and continuous improvement after go-live.',
    intro:
      'Going live is the start, not the end. We keep your Odoo system stable and continuously improved — resolving issues, tuning performance and adding capability as you grow.',
    problems: [
      'Issues after go-live have nowhere reliable to go.',
      'Nobody owns performance, upgrades or backups.',
      'New requirements pile up with no plan to deliver them.',
      'Your team needs a dependable technical partner.',
    ],
    whatWeDo: [
      {
        title: 'Issue resolution & stabilisation',
        body: 'A clear channel for problems, with prioritised, tracked resolution.',
      },
      {
        title: 'Performance & upgrades',
        body: 'Ongoing tuning, safe upgrades and healthy backups so the system stays reliable.',
      },
      {
        title: 'Continuous improvement',
        body: 'A steady cadence for new automations, reports and enhancements as needs evolve.',
      },
    ],
    modules: ['All configured modules', 'Custom Modules', 'Reporting'],
    outcomes: [
      'A stable, well-maintained system',
      'Faster resolution of issues',
      'Safe, planned upgrades',
      'A dependable long-term partner',
    ],
    process: ['Go-Live & Support'],
  },
  {
    slug: 'odoo-training',
    href: '/services/odoo-training',
    title: 'Odoo Training',
    navLabel: 'Training',
    tagline: 'Teams that learn the system on real workflows, not slides.',
    metaTitle: 'Odoo Training for Teams | ODOOVATIONS',
    metaDescription:
      'Practical Odoo training for your team in English or Urdu. Role-based sessions on real workflows so adoption sticks and your investment pays off.',
    intro:
      'A system is only as good as its adoption. We train your team on their real day-to-day workflows — in English or Urdu — so people are confident and the system actually gets used.',
    problems: [
      'Staff resist the new system and fall back to old habits.',
      'Training was generic and did not match real roles.',
      'Only one or two people understand how the system works.',
      'Onboarding new staff is slow and inconsistent.',
    ],
    whatWeDo: [
      {
        title: 'Role-based sessions',
        body: 'Focused training for sales, warehouse, accounts and management on the tasks each role performs.',
      },
      {
        title: 'Real-workflow practice',
        body: 'Hands-on practice using your actual processes and data, not sample demos.',
      },
      {
        title: 'Reference materials',
        body: 'Clear internal guides so onboarding new staff stays fast and consistent.',
      },
    ],
    modules: ['All configured modules'],
    outcomes: [
      'Confident, self-sufficient teams',
      'Higher adoption and fewer errors',
      'Faster onboarding for new staff',
      'A better return on your Odoo investment',
    ],
    process: ['Data & Training', 'Go-Live & Support'],
  },
  {
    slug: 'odoo-migration',
    href: '/services/odoo-migration',
    title: 'Odoo Migration Services',
    navLabel: 'Odoo Migration',
    tagline: 'Move from Excel or a legacy system to Odoo — with clean, validated data.',
    metaTitle: 'Odoo Migration Services (Excel & Legacy ERP) | ODOOVATIONS',
    metaDescription:
      'Migrate to Odoo from Excel or another ERP with prepared, mapped and validated data. We move master data, open items and stock so your new system starts accurate.',
    intro:
      'Migrating to Odoo is mostly about data discipline, not just software. We prepare, map and validate your existing records — from Excel or a legacy ERP — so your new system starts with numbers your team can trust from day one.',
    problems: [
      'Years of data spread across spreadsheets, an old ERP and POS exports.',
      'Duplicate customers, inconsistent product codes and unclear opening balances.',
      'Fear that go-live will start with wrong stock and wrong accounts.',
      'No clear owner or sign-off for each data set.',
    ],
    whatWeDo: [
      { title: 'Source mapping & cleaning', body: 'We identify every source, remove duplicates and standardise names, units and codes before anything moves.' },
      { title: 'Field mapping & migration order', body: 'Each field is mapped to the correct Odoo field and migrated in dependency order — contacts and products before orders, accounts before transactions.' },
      { title: 'Validation & sign-off', body: 'Record counts and financial totals are reconciled against the source, and your team confirms the data before go-live.' },
    ],
    modules: ['Contacts', 'Products', 'Inventory', 'Accounting', 'Sales', 'Purchase'],
    outcomes: [
      'Accurate opening data from day one',
      'No duplicate or inconsistent master records',
      'Correct opening stock and balances',
      'A safe, reversible cutover',
    ],
    process: ['Business Discovery', 'Solution Blueprint', 'Build & Test', 'Data & Training', 'Go-Live & Support'],
  },
  {
    slug: 'odoo-ai-dashboards',
    href: '/services/odoo-ai-dashboards',
    title: 'Odoo AI Dashboards & Analytics',
    navLabel: 'AI Dashboards',
    tagline: 'Turn the data Odoo already holds into decisions, not just charts.',
    metaTitle: 'Odoo AI Dashboards & Reporting Analytics | ODOOVATIONS',
    metaDescription:
      'AI-assisted Odoo dashboards and reporting that surface trends, anomalies and next actions from your operational data — built on one source of truth.',
    intro:
      'Once your operations run on Odoo, the data to run the business better is already there. We build live dashboards and AI-assisted reporting that highlight trends, flag anomalies and point to the next action — drawn from a single source of truth.',
    problems: [
      'Reports arrive late and are already out of date.',
      'Numbers are reconciled by hand from separate spreadsheets.',
      'Management sees lagging summaries, not live signals.',
      'It is hard to spot problems — stockouts, slow payers — before they hurt.',
    ],
    whatWeDo: [
      { title: 'Live KPI dashboards', body: 'Real-time views of sales, inventory, cash and operations, drawn straight from your Odoo data.' },
      { title: 'AI-assisted insight', body: 'Surfacing anomalies, trends and plain-language summaries so decisions are faster and better informed.' },
      { title: 'Reports that fit your business', body: 'Custom reports and scheduled delivery tailored to how your management team actually reviews performance.' },
    ],
    modules: ['Reporting', 'Business Intelligence', 'Sales', 'Inventory', 'Accounting'],
    outcomes: [
      'One live, trusted view of the business',
      'Earlier warning of operational problems',
      'Less time spent building manual reports',
      'Faster, evidence-based decisions',
    ],
    process: ['Business Discovery', 'Solution Blueprint', 'Build & Test', 'Go-Live & Support'],
  },
  {
    slug: 'odoo-business-automation',
    href: '/services/odoo-business-automation',
    title: 'Odoo Business Process Automation',
    navLabel: 'Business Automation',
    tagline: 'Remove the repetitive work that slows your team down.',
    metaTitle: 'Odoo Business Process Automation | ODOOVATIONS',
    metaDescription:
      'Automate approvals, reordering, notifications and routine data entry in Odoo so your team focuses on decisions, not admin. Rule-based workflows built around your process.',
    intro:
      'Much of the work that slows teams down is repetitive — chasing approvals, re-entering data, sending the same notifications. We automate those steps inside Odoo with reliable, rule-based workflows so your people spend their time on decisions, not admin.',
    problems: [
      'Approvals depend on repeated follow-ups and reminders.',
      'The same data is entered into more than one place.',
      'Reordering and notifications are manual and easily missed.',
      'Routine tasks eat hours that could go into real work.',
    ],
    whatWeDo: [
      { title: 'Approval automations', body: 'Multi-step approval flows that route, notify and record decisions automatically — no more chasing.' },
      { title: 'Automated reordering & alerts', body: 'Stock reordering, payment reminders and scheduled notifications triggered by real business rules.' },
      { title: 'Rule-based workflows', body: 'Repetitive steps automated end-to-end, with the exceptions still visible for a human to handle.' },
    ],
    modules: ['Automation', 'Inventory', 'Purchase', 'Sales', 'Accounting'],
    outcomes: [
      'Hours of repetitive work removed each week',
      'Faster, more consistent approvals',
      'Fewer missed reorders and follow-ups',
      'Teams focused on higher-value work',
    ],
    process: ['Business Discovery', 'Solution Blueprint', 'Build & Test', 'Go-Live & Support'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
