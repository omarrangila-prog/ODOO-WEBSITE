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
  /** Capability / module tags rendered as pills under the hero. */
  modules: string[];
  outcomes: string[];
  process: string[];

  /* ---- Optional, used by the broader (non-Odoo) capability pages ---- */

  /** Which capability division this belongs to — see data/divisions.ts. */
  division?: string;
  /**
   * Answer-first summary placed near the top of the page. Written so a person
   * skimming (or a retrieval system quoting) gets the whole answer in one
   * paragraph before any marketing language.
   */
  answer?: string;
  /** Intent-matched CTA so pages don't all say the same thing. */
  ctaLabel?: string;
  /**
   * A named, ordered flow rendered as a diagram — the honest version of "how
   * it works", showing where a human still approves things.
   */
  flow?: { label: string; steps: string[]; note?: string };
  /** Page-specific FAQs. Falls back to the shared Odoo FAQ set when absent. */
  faqs?: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: 'odoo-implementation-pakistan',
    division: 'odoo-erp',
    faqs: [
      {
        question: 'Do we have to move everything to Odoo at once?',
        answer:
          'No. A phased go-live is usually safer: start with the modules that carry the most daily pain — often sales, inventory or accounting — run them properly, then add the rest. A single big-bang cutover concentrates every risk on one weekend, and it also asks your team to learn everything simultaneously.',
      },
      {
        question: 'What do you need from our team during implementation?',
        answer:
          'Time from the people who actually do the work, not only management. We need someone per area who can say how the process really runs, answer questions during configuration, and test their own workflows before go-live. Implementations slow down far more often from unavailable decision-makers than from technical problems.',
      },
      {
        question: 'What happens to our existing data?',
        answer:
          'It is prepared, cleaned and validated before go-live rather than copied as-is. Most sources — Excel, an older ERP, or a mix — contain duplicates, inconsistent names and incomplete records that would otherwise become permanent. We agree exactly what moves during the blueprint stage.',
      },
      {
        question: 'Is Odoo a sensible choice for a small business?',
        answer:
          'Often, because you run only the modules you need and add more later. It is a poor choice if you want something that works with no configuration at all, or if nobody internally will own the system. We will tell you if we think a simpler tool fits your situation better.',
      },
    ],
    href: '/services/odoo-implementation-pakistan',
    title: 'Odoo Implementation in Pakistan',
    navLabel: 'Odoo Implementation',
    tagline: 'End-to-end Odoo setup, built around how your business actually runs.',
    metaTitle: 'Odoo Implementation in Pakistan | ODOOVATIONS',
    metaDescription:
      'End-to-end Odoo implementation for businesses in Pakistan and worldwide. We map your real workflow, configure the right modules and deliver a working system.',
    answer:
      'ODOOVATIONS is an independent Odoo implementation team based in Karachi, Pakistan. It configures Odoo around how a business already works, covering sales, purchase, inventory, accounting, CRM and reporting, then migrates the existing data, sets user permissions and trains staff on their real workflows. Module scope is agreed in writing before configuration starts. ODOOVATIONS does not claim official Odoo partner status.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'When is custom development the wrong answer?',
        answer:
          'When standard Odoo already does the job in a slightly different way to your current habit. Every custom module is code that must be maintained and re-tested at each upgrade, so we look first for configuration, then for an existing app, and only then build. Changing a process is sometimes cheaper than encoding it forever.',
      },
      {
        question: 'Will custom modules break when Odoo upgrades?',
        answer:
          'Custom code is the part most likely to need work at an upgrade — that is true of any Odoo project. We reduce the cost by keeping customisations in separate modules rather than editing core, and by preferring documented extension points over overrides, so an upgrade is a review rather than a rewrite.',
      },
      {
        question: 'Who owns the code you write?',
        answer:
          'You do. Custom modules built for your project are yours, and you receive the source. You are not locked into us to keep the system running, and another competent Odoo developer can pick the work up.',
      },
      {
        question: 'Can you work on modules another developer built?',
        answer:
          'Usually yes, after reading the code. We ask for repository access and look at how it was built before quoting, because taking over undocumented customisations without reviewing them first is how estimates go badly wrong.',
      },
    ],
    href: '/services/custom-odoo-development',
    title: 'Custom Odoo Development',
    navLabel: 'Custom Odoo Development',
    tagline: 'Custom modules built only where they create measurable value.',
    metaTitle: 'Custom Odoo Development & Module Building | ODOOVATIONS',
    metaDescription:
      'Custom Odoo module development for Pakistani and international businesses. Approval flows, industry forms, pricing rules, custom reports and integrations — no unnecessary complexity.',
    answer:
      'ODOOVATIONS builds custom Odoo modules when standard Odoo does not match a process: approval flows, pricing rules, industry-specific forms, reports and integrations. Modules follow Odoo’s development conventions so they can be maintained through upgrades, and each one is scoped against what standard Odoo already does, so nothing is built that configuration could handle.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'What can Odoo realistically integrate with?',
        answer:
          'Anything with a documented API or a reliable file exchange: payment gateways, couriers, e-commerce platforms, bank statements, marketplaces, WhatsApp, and most modern SaaS. Systems with no API can sometimes be bridged with scheduled file imports, which is slower and more fragile but often sufficient.',
      },
      {
        question: 'What happens when an integration fails at 2am?',
        answer:
          'A well-built integration queues and retries rather than silently dropping the record, and logs failures somewhere a person will actually see. We design for the failure case explicitly, because the question is not whether an external service will be unavailable but what your system does when it is.',
      },
      {
        question: 'Can you integrate with a system we built in-house?',
        answer:
          'Yes, if it can expose data in some consistent way. The practical constraint is rarely Odoo — it is whether the other system has a stable interface and someone who understands it well enough to answer questions.',
      },
      {
        question: 'Is two-way sync always the right design?',
        answer:
          'No. Two-way sync creates conflicts when the same record changes on both sides, so it needs rules about which system wins. Where one system is clearly the source of truth, one-way sync is simpler, cheaper and much easier to debug.',
      },
    ],
    href: '/services/odoo-integration',
    title: 'Odoo Integration Services',
    navLabel: 'Odoo Integration',
    tagline: 'Connect Odoo with the platforms your business already relies on.',
    metaTitle: 'Odoo Integration Services | ODOOVATIONS',
    metaDescription:
      'Connect Odoo with Shopify, WooCommerce, WhatsApp, payment gateways, couriers, banking and custom APIs. One reliable flow of information across your systems.',
    answer:
      'ODOOVATIONS connects Odoo to the other systems a business runs: online stores such as Shopify and WooCommerce, WhatsApp, payment gateways, couriers, banks and custom software through their APIs. What each integration can do depends on the other platform’s API and plan, so the direction of each sync and the records involved are agreed in writing before building.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'What does a consulting engagement produce?',
        answer:
          'A written assessment of how your processes currently run, where the system is being worked around, and what we would recommend changing — in what order and why. It is useful on its own: you can take it to another implementer, or to your own team.',
      },
      {
        question: 'Can you review an Odoo system someone else implemented?',
        answer:
          'Yes, and it is a common request. We look at configuration, customisations, data quality and how the system is actually used day to day, which is often where the real problem sits rather than in the software.',
      },
      {
        question: 'Do you only recommend Odoo?',
        answer:
          'No. If your requirement is genuinely served better by something else, or by fixing a process rather than buying software, we will say so. A recommendation that ignores that is not worth paying for.',
      },
      {
        question: 'Is consulting worth it if we already know what we want?',
        answer:
          'Sometimes not, and we will tell you. It earns its cost when the requirement is unclear, when stakeholders disagree about what the system should do, or when a previous attempt failed and nobody has established why.',
      },
    ],
    href: '/services/odoo-consulting',
    title: 'Odoo Consulting',
    navLabel: 'Consulting',
    tagline: 'Clarify scope, priorities and the right next step before you invest.',
    metaTitle: 'Odoo Consulting & Advisory | ODOOVATIONS',
    metaDescription:
      'Odoo consulting for businesses in Pakistan and abroad. We assess your workflow, define a clear scope and prevent unnecessary customisation before implementation begins.',
    answer:
      'ODOOVATIONS offers independent Odoo consulting: an assessment of how the business operates, a written scope and roadmap, and a second opinion on an existing or failing setup. The output says what to build, what to configure from standard Odoo and what not to build at all, so a business can decide before committing to an implementation.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'What does support actually cover?',
        answer:
          'Fixing things that break, answering how-to questions, applying updates, monitoring the parts that fail quietly, and making small changes as the business shifts. What it covers for you is written down before we start, so neither side is guessing.',
      },
      {
        question: 'How quickly do you respond?',
        answer:
          'Response targets are agreed in writing per engagement rather than advertised as a single number, because a stopped production line and a formatting question are not the same urgency. We do not claim staffed 24/7 cover: enquiries sent outside working hours are received automatically and picked up by a person when work resumes.',
      },
      {
        question: 'Do you support systems you did not build?',
        answer:
          'Yes, after a review. We need to understand the configuration and any custom modules before taking responsibility for keeping them running, so there is usually a short assessment first.',
      },
      {
        question: 'What happens if we stop support?',
        answer:
          'The system keeps running and remains yours — support is not a licence. You lose the monitoring, the updates and the person who knows your configuration, which matters most at upgrades and when something breaks.',
      },
    ],
    href: '/services/odoo-support-maintenance',
    title: 'Odoo Support & Maintenance',
    navLabel: 'Support & Maintenance',
    tagline: 'Keep your system stable, fast and evolving after go-live.',
    metaTitle: 'Odoo Support & Maintenance in Pakistan | ODOOVATIONS',
    metaDescription:
      'Ongoing Odoo support and maintenance for businesses in Pakistan and worldwide. Issue resolution, performance, upgrades and continuous improvement after go-live.',
    answer:
      'ODOOVATIONS supports Odoo systems after go-live: fixing issues, stabilising and tuning performance, planning version upgrades and adding capability as the business grows. The support arrangement, including what is covered and how requests are raised, is agreed in advance. Support is provided by people during Pakistan business hours; no round-the-clock cover is offered.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'Who should attend training?',
        answer:
          'The people who will use the system daily, in their own workflows, rather than one representative who then has to teach everyone else. Second-hand training is where most of the understanding is lost.',
      },
      {
        question: 'Is training a one-off session?',
        answer:
          'It works better as a short session before go-live and another once people have hit real situations, because the useful questions only appear after a few weeks of actual use. A single pre-launch session tends to be forgotten.',
      },
      {
        question: 'Do you train administrators differently from end users?',
        answer:
          'Yes. End users need their own daily tasks done confidently. Administrators need to understand configuration, user access, and what they can safely change themselves without calling anyone.',
      },
      {
        question: 'Do we get materials we can reuse?',
        answer:
          'Yes — documentation covering your configuration, not generic Odoo manuals, so new staff can be brought up to speed without repeating the whole engagement.',
      },
    ],
    href: '/services/odoo-training',
    title: 'Odoo Training',
    navLabel: 'Training',
    tagline: 'Teams that learn the system on real workflows, not slides.',
    metaTitle: 'Odoo Training for Teams | ODOOVATIONS',
    metaDescription:
      'Practical Odoo training for your team in English or Urdu. Role-based sessions on real workflows so adoption sticks and your investment pays off.',
    answer:
      'ODOOVATIONS trains each team on its own day-to-day Odoo workflows rather than on a generic demo, in English or Urdu. Sessions are organised by role, so sales, warehouse and accounts staff each practise the steps they will actually perform, and teams receive reference material to keep after the sessions.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'How long does a migration take?',
        answer:
          'It depends almost entirely on data quality and how much custom code exists, not on the record count. Clean data in a standard configuration moves quickly; years of inconsistent entry and undocumented customisations are what extend the timeline. We assess both before giving you a schedule.',
      },
      {
        question: 'Will we lose data?',
        answer:
          'The source system stays intact and available until you have accepted the new one. Migration is a copy that is validated, not a move, and we agree the verification checks with you beforehand so acceptance is based on evidence rather than impression.',
      },
      {
        question: 'Can we migrate from Excel rather than another ERP?',
        answer:
          'Yes, and it is common. Spreadsheets usually need more cleaning than an ERP export because they allow inconsistencies a database would have rejected — duplicate customers, varying date formats, totals typed by hand.',
      },
      {
        question: 'Do we have to migrate all our history?',
        answer:
          'No, and often you should not. Open transactions and current master data are essential; ten years of closed records may be better kept as an archive you can still read, rather than carried into the new system where it slows everything down.',
      },
    ],
    href: '/services/odoo-migration',
    title: 'Odoo Migration Services',
    navLabel: 'Odoo Migration',
    tagline: 'Move from Excel or a legacy system to Odoo — with clean, validated data.',
    metaTitle: 'Odoo Migration Services (Excel & Legacy ERP) | ODOOVATIONS',
    metaDescription:
      'Migrate to Odoo from Excel or another ERP with prepared, mapped and validated data. We move master data, open items and stock so your new system starts accurate.',
    answer:
      'ODOOVATIONS migrates business data into Odoo from Excel or a legacy ERP. The work is mostly data discipline: mapping the old records to Odoo fields, cleaning duplicates and errors, loading them in the right order (contacts, products, opening stock, balances, open orders) and validating the totals with the business before sign-off, so the new system starts with numbers people trust.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'Are the figures in your demo dashboard real?',
        answer:
          'No. Every number in the dashboard shown on this site is sample data, labelled as such on the page. Your dashboards are built from your own Odoo records.',
      },
      {
        question: 'What makes a dashboard actually get used?',
        answer:
          'Answering a question someone already has, and being trustworthy. A dashboard that disagrees with the numbers people check elsewhere gets abandoned immediately, so reconciling definitions — what counts as a sale, when revenue is recognised — matters more than the visualisation.',
      },
      {
        question: 'What does the AI part do?',
        answer:
          'It summarises and explains what the data shows, surfaces changes worth attention, and answers questions in plain language. It does not invent figures: the numbers come from your records, and where a conclusion is uncertain it should be presented as uncertain.',
      },
      {
        question: 'Can dashboards show data from outside Odoo?',
        answer:
          'Yes, where that data can be reached through an API or a scheduled import. Combining Odoo with, say, advertising spend or marketplace sales is a frequent requirement.',
      },
    ],
    href: '/services/odoo-ai-dashboards',
    title: 'Odoo AI Dashboards & Analytics',
    navLabel: 'AI Dashboards',
    tagline: 'Turn the data Odoo already holds into decisions, not just charts.',
    metaTitle: 'Odoo AI Dashboards & Reporting Analytics | ODOOVATIONS',
    metaDescription:
      'AI-assisted Odoo dashboards and reporting that surface trends, anomalies and next actions from your operational data — built on one source of truth.',
    answer:
      'ODOOVATIONS builds live dashboards and AI-assisted reporting on top of Odoo data: KPI views for sales, stock and finance, reports shaped to how the business is managed, and assistance that highlights trends and anomalies. Everything reads from the same Odoo records, so figures agree across departments.',
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
    division: 'odoo-erp',
    faqs: [
      {
        question: 'What is worth automating first?',
        answer:
          'High-frequency, rule-based steps where a human adds no judgement: status updates, document generation, routine approvals that always follow the same rule, notifications. The best early candidates are usually boring and daily rather than complex and occasional.',
      },
      {
        question: 'What should not be automated?',
        answer:
          'Decisions involving negotiation, exceptions or judgement, and any process nobody can describe consistently. Automating an unclear process makes it faster and harder to fix, so we document how it actually runs before writing a rule.',
      },
      {
        question: 'What happens when an automated step is wrong?',
        answer:
          'There must be a way for a person to see it happened and reverse it. Automation without visibility produces errors that compound silently, so we build logging and an override path alongside the rule itself.',
      },
      {
        question: 'Will automation replace our staff?',
        answer:
          'In our experience it removes specific repetitive tasks rather than roles, and the realistic gain is people spending less time on data entry and chasing. We would rather set that expectation than promise headcount savings we cannot evidence.',
      },
    ],
    href: '/services/odoo-business-automation',
    title: 'Odoo Business Process Automation',
    navLabel: 'Business Automation',
    tagline: 'Remove the repetitive work that slows your team down.',
    metaTitle: 'Odoo Business Process Automation | ODOOVATIONS',
    metaDescription:
      'Automate approvals, reordering, notifications and routine data entry in Odoo so your team focuses on decisions, not admin. Rule-based workflows built around your process.',
    answer:
      'ODOOVATIONS automates repetitive work inside Odoo with rule-based workflows: approval chains, reorder rules and stock alerts, reminders, and notifications that would otherwise be sent by hand. Rules are agreed with the people who own each process, and decisions that carry financial or customer risk keep a person approving them.',
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
  {
    slug: 'ai-automation',
    href: '/services/ai-automation',
    division: 'ai-automation',
    title: 'AI Automation Built Around Real Business Workflows',
    navLabel: 'AI & Automation',
    tagline: 'Automate the repetitive work, not the decisions that matter.',
    metaTitle: 'AI Automation & AI Agent Development | ODOOVATIONS',
    metaDescription:
      'AI automation and AI agent development for businesses in Pakistan and worldwide. Automate customer conversations, document processing, follow-ups, reporting and internal workflows.',
    answer:
      'ODOOVATIONS builds AI automation that connects to the systems a business already runs. Typical work includes AI agents that answer and qualify customers on WhatsApp, workflows that process documents and route approvals, assistants that answer staff questions from internal company documents, and automated reporting. We keep a human approval step wherever a decision carries financial, legal or customer risk.',
    intro:
      'Most businesses do not need "AI" in the abstract. They need a specific repetitive process to stop consuming staff hours: the same enquiry answered forty times a day, invoices retyped from PDFs, follow-ups that never happen, a weekly report someone rebuilds by hand. We automate those processes using AI where AI genuinely helps, and ordinary rules where rules are more reliable.',
    problems: [
      'The same customer questions are answered manually, all day, every day.',
      'Leads from ads go cold because nobody replies fast enough.',
      'Information is retyped from PDFs, emails and forms into your systems.',
      'Reports are rebuilt by hand every week from data that already exists.',
      'Approvals sit in someone\u2019s inbox until they are chased.',
    ],
    whatWeDo: [
      {
        title: 'AI agents for customers',
        body: 'Agents on WhatsApp, web chat or voice that answer common questions, qualify a lead against your criteria and hand a real buyer to a salesperson with the conversation attached.',
      },
      {
        title: 'Document and data automation',
        body: 'Read invoices, purchase orders, forms and emails, extract the fields you actually use, validate them against your records and write them into your system \u2014 with anything uncertain flagged for a person.',
      },
      {
        title: 'Workflow and approval automation',
        body: 'Triggers, routing and notifications so approvals, follow-ups and handoffs happen on their own, and exceptions are the only thing a human has to look at.',
      },
      {
        title: 'Internal knowledge assistants',
        body: 'An assistant your team can ask questions of, answering from your own policies, product data and documents rather than from the open internet.',
      },
      {
        title: 'Reporting assistants and AI dashboards',
        body: 'Scheduled summaries and live dashboards built from the data your business already records, so management stops waiting for someone to compile it.',
      },
      {
        title: 'Integration with your existing systems',
        body: 'Automation is only useful when it can read and write real data. We connect to Odoo, your CRM, accounting system, e-commerce platform or custom database through supported APIs.',
      },
    ],
    modules: [
      'AI Agents',
      'WhatsApp AI',
      'Document Automation',
      'Workflow Automation',
      'Knowledge Assistants (RAG)',
      'AI Dashboards',
    ],
    flow: {
      label: 'How an automation actually runs',
      steps: ['Trigger', 'AI step', 'Your business data', 'Human approval', 'Action', 'Recorded'],
      note: 'The human approval step is deliberate. We automate the work, not the accountability \u2014 and every run is logged so you can audit what happened.',
    },
    outcomes: [
      'Repetitive digital work removed from staff workload',
      'Faster first response to enquiries and leads',
      'Fewer transcription errors between systems',
      'Reporting that arrives without anyone assembling it',
      'A clear record of what was automated and what a person approved',
    ],
    process: [
      'Process Audit',
      'Automation Map',
      'Prototype',
      'Build & Test',
      'Supervised Rollout',
      'Measure & Improve',
    ],
    ctaLabel: 'Find What We Can Automate',
    faqs: [
      {
        question: 'What can AI realistically automate in my business?',
        answer:
          'Repetitive digital processes with a clear input and a clear output: answering common enquiries, qualifying leads, reading documents into a system, routing approvals, drafting replies, summarising data and generating reports. Work that requires judgement, negotiation or physical handling is not a good automation candidate, and we will say so during the audit.',
      },
      {
        question: 'What cannot be automated?',
        answer:
          'Anything where the rules are genuinely ambiguous, where a wrong answer is expensive and undetectable, or where the process is not documented anywhere including in people\u2019s heads. In those cases the first useful step is usually defining the process, not automating it.',
      },
      {
        question: 'Will an AI agent make mistakes in front of my customers?',
        answer:
          'Any language model can be wrong. We reduce that risk by grounding answers in your own approved content, limiting what the agent is allowed to state, handing over to a human on anything outside its scope, and reviewing transcripts during the first weeks of live use.',
      },
      {
        question: 'What happens to our data?',
        answer:
          'We agree in writing which systems the automation may read and write, and what is sent to any third-party AI provider. Where data sensitivity requires it, we scope the design so sensitive fields are never transmitted externally.',
      },
      {
        question: 'How long does an AI automation project take?',
        answer:
          'A single well-defined automation \u2014 one WhatsApp agent, one document flow \u2014 can be prototyped quickly and running in a matter of days. Automating a process that spans several departments and systems takes longer because the integrations and the testing take longer. We give a timeline after the process audit, not before.',
      },
    ],
  },
  {
    slug: 'whatsapp-automation',
    href: '/services/whatsapp-automation',
    division: 'ai-automation',
    title: 'WhatsApp Automation for Sales, Support & Operations',
    navLabel: 'WhatsApp Automation',
    tagline: 'Answer every enquiry in seconds, and never lose a lead in the inbox.',
    metaTitle: 'WhatsApp Automation & WhatsApp AI Agents | ODOOVATIONS',
    metaDescription:
      'WhatsApp automation for sales, support and operations \u2014 instant replies, lead qualification, CRM handoff, order updates, payment reminders and appointment booking.',
    answer:
      'WhatsApp automation connects your WhatsApp number to your business systems so enquiries get an instant reply, leads are qualified and passed to a salesperson with context, and routine messages \u2014 order status, payment reminders, appointment confirmations, invoice delivery \u2014 are sent automatically. ODOOVATIONS builds these flows on the official WhatsApp Business Platform (Cloud API) where the use case requires reliability and compliance.',
    intro:
      'In Pakistan, WhatsApp is where business actually happens. The problem is what happens after hours, during a rush, or when one person is holding the number: enquiries sit unread, ad spend turns into unanswered messages, and follow-ups depend on someone remembering. WhatsApp automation fixes the mechanics of that, without turning your business into a robot.',
    problems: [
      'Ad leads message at 11pm and get a reply the next afternoon \u2014 if at all.',
      'One person owns the WhatsApp number, so nothing is visible to the rest of the team.',
      'Follow-ups depend on memory, and most never happen.',
      'Order status and payment reminders are typed out by hand, one customer at a time.',
      'There is no record of conversations in your CRM.',
    ],
    whatWeDo: [
      {
        title: 'Instant reply and qualification',
        body: 'A lead from a Facebook, Instagram or Google ad lands on WhatsApp, gets an immediate welcome, answers a few qualifying questions and is routed to the right salesperson.',
      },
      {
        title: 'CRM handoff with the full conversation',
        body: 'The lead, its answers and its source are written into your CRM or Odoo, with a follow-up task assigned so nothing depends on someone remembering.',
      },
      {
        title: 'Operational messaging',
        body: 'Order confirmations, dispatch and delivery updates, payment reminders, invoice and document delivery, and appointment confirmations \u2014 triggered by events in your system.',
      },
      {
        title: 'Support deflection',
        body: 'Common questions answered instantly from your approved content, with a clean handover to a human for anything the agent should not attempt.',
      },
      {
        title: 'Internal alerts',
        body: 'Your team notified on WhatsApp when something needs attention \u2014 a high-value enquiry, a stuck approval, a failed payment.',
      },
      {
        title: 'Shared team inbox',
        body: 'Conversations visible to the people who need them, so the business owns the customer relationship rather than an individual phone.',
      },
    ],
    modules: [
      'WhatsApp Business Platform',
      'Lead Qualification',
      'CRM Handoff',
      'Order Notifications',
      'Payment Reminders',
      'Appointment Booking',
    ],
    flow: {
      label: 'Ad to salesperson, automatically',
      steps: ['Ad click', 'WhatsApp', 'Instant welcome', 'Qualification', 'CRM record', 'Salesperson', 'Follow-up'],
    },
    outcomes: [
      'Every enquiry answered immediately, including outside office hours',
      'Qualified leads reaching a salesperson with context attached',
      'Routine operational messages sent without manual typing',
      'Conversations recorded against the customer, not lost on a phone',
    ],
    process: [
      'Use-case Definition',
      'Platform & Number Setup',
      'Flow Design',
      'Build & Test',
      'Supervised Launch',
      'Refine',
    ],
    ctaLabel: 'Automate My WhatsApp',
    faqs: [
      {
        question: 'Is this the official WhatsApp API or an unofficial tool?',
        answer:
          'For business-critical messaging we build on the official WhatsApp Business Platform (Cloud API), which requires a verified business, an approved sender number and message templates approved by Meta. Unofficial automation tools exist and are cheaper, but they carry a genuine risk of the number being blocked. We will tell you plainly which route a use case needs. ODOOVATIONS is not a Meta partner and does not claim any special status with Meta.',
      },
      {
        question: 'Can it use our existing WhatsApp number?',
        answer:
          'Usually yes, but a number moved onto the Cloud API can no longer be used in the normal WhatsApp or WhatsApp Business app on a phone. That trade-off matters, so it is a decision we walk through before starting.',
      },
      {
        question: 'Will customers know they are talking to automation?',
        answer:
          'We recommend being straightforward about it, and designing a fast, obvious route to a human. Pretending an automation is a person tends to damage trust the first time it gets something wrong.',
      },
      {
        question: 'Can it connect to Odoo or our CRM?',
        answer:
          'Yes. That is usually the point \u2014 the value comes from WhatsApp being connected to real order, stock, invoice and customer data rather than running as an isolated chatbot.',
      },
      {
        question: 'What does WhatsApp itself cost?',
        answer:
          'Meta charges per conversation on the official platform, with rates that vary by country and conversation category, and those charges are billed to you directly by Meta. Our fee covers design, build and integration. We estimate the likely message volume during scoping so there are no surprises.',
      },
    ],
  },
  {
    slug: 'custom-software-development',
    href: '/services/custom-software-development',
    division: 'custom-software',
    title: 'Custom Software for Businesses That Have Outgrown Generic Tools',
    navLabel: 'Custom Software',
    tagline: 'Tell us how your business works. We design the software around your process.',
    metaTitle: 'Custom Software Development in Pakistan | ODOOVATIONS',
    metaDescription:
      'Custom software development for business systems, POS, accounting, inventory, portals, dashboards, web apps and mobile apps \u2014 built around your workflow, not a template.',
    answer:
      'ODOOVATIONS designs and builds custom business software: accounting, sales and purchase, inventory, POS, manufacturing, HR, hospital and clinic systems, customer and supplier portals, dashboards, web applications and mobile applications. We start from how your business actually operates, build only the system that process needs, and hand over something your team can run and we can keep maintaining.',
    intro:
      'Generic software works until the day your business does something the software has no concept of \u2014 a pricing rule, an approval chain, a job card, a way of counting stock. At that point people start keeping a parallel spreadsheet, and the software stops telling the truth. Custom software is the answer when the process is the thing that makes you money and it does not fit in a box.',
    problems: [
      'The real process lives in spreadsheets running alongside the official system.',
      'Your pricing, approval or costing rules are more specific than any product supports.',
      'Three systems hold three different versions of the same number.',
      'Adding a branch, a product line or a user costs more in licences than in value.',
      'The previous developer left and nobody can safely change anything.',
    ],
    whatWeDo: [
      {
        title: 'Workflow mapping before code',
        body: 'We sit with the people who do the work and document the process as it actually runs, including the exceptions everybody handles informally. That document is what we build against.',
      },
      {
        title: 'The system your process needs',
        body: 'Sales, purchase, accounting, inventory, production, orders, customers, suppliers, payments, approvals, reports, dashboards and mobile access \u2014 scoped to what you will genuinely use.',
      },
      {
        title: 'Integrations with what you keep',
        body: 'New software rarely replaces everything. We connect to the accounting package, e-commerce store, payment gateway or ERP you are keeping, so data moves instead of being retyped.',
      },
      {
        title: 'Reporting management will actually read',
        body: 'The reports and dashboards designed around the decisions your management makes, not a generic analytics screen nobody opens.',
      },
      {
        title: 'Built to be handed over',
        body: 'Documented, source code in your possession, and written so another competent developer can pick it up. You should not be locked to us by obscurity.',
      },
      {
        title: 'Support after launch',
        body: 'Software is not finished at go-live. We stay on for issues, changes and the improvements that only become obvious once people use it daily.',
      },
    ],
    modules: [
      'Business Systems',
      'POS',
      'Accounting',
      'Inventory',
      'Portals & Dashboards',
      'Web Apps',
      'Mobile Apps',
      'APIs',
    ],
    flow: {
      label: 'How a custom build is scoped',
      steps: ['Your process', 'Our engineering', 'A working prototype', 'Your software'],
      note: 'We prototype the core workflow early so you are reacting to a working screen rather than a document.',
    },
    outcomes: [
      'One system that matches how the business genuinely runs',
      'Spreadsheets retired instead of quietly maintained on the side',
      'Reports built from a single, trustworthy set of records',
      'Source code and documentation you own',
    ],
    process: [
      'Workflow Discovery',
      'Scope & Estimate',
      'Architecture',
      'Prototype',
      'Build & Test',
      'Data & Training',
      'Deploy & Support',
    ],
    ctaLabel: 'Show Us Your Workflow',
    faqs: [
      {
        question: 'How much does custom software cost in Pakistan?',
        answer:
          'It is driven by scope: the number of distinct workflows, how many users and roles, how many integrations, whether mobile access is needed, and how much existing data must be migrated. A single-workflow internal tool and a multi-branch operations system are different orders of magnitude. We quote against a written scope after discovery rather than guessing from a category name.',
      },
      {
        question: 'Custom software or off-the-shelf \u2014 how do we decide?',
        answer:
          'If a standard product covers your process with configuration alone, buy it; it will be cheaper and better supported. Custom becomes the right answer when the part of your process that differentiates you is the part no product handles, or when licence costs scale badly against the value you get. We are happy to recommend the off-the-shelf route when that is the honest answer.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A focused internal tool or dashboard can be delivered quickly. A full operations system with several modules, integrations and data migration is a phased project measured in months. We scope in phases so something useful goes live early instead of everything arriving at the end.',
      },
      {
        question: 'Do we own the source code?',
        answer:
          'Yes. Ownership terms are set out in the agreement before work starts.',
      },
      {
        question: 'Can you take over software somebody else built?',
        answer:
          'Often, yes. We start with a short technical review of the existing code and data to establish what is salvageable and what is not, and give you an honest assessment before committing to a takeover.',
      },
    ],
  },
  {
    slug: 'web-development',
    href: '/services/web-development',
    division: 'web-apps',
    title: 'Websites & Web Applications Built to Perform',
    navLabel: 'Websites & Apps',
    tagline: 'Not just pages \u2014 digital systems designed around a business goal.',
    metaTitle: 'Web Development & Web Applications | ODOOVATIONS',
    metaDescription:
      'Corporate websites, landing pages, e-commerce, web applications, portals, dashboards and mobile apps \u2014 fast, accessible, SEO-ready and built around a specific business goal.',
    answer:
      'ODOOVATIONS builds corporate websites, conversion-focused landing pages, e-commerce stores, web applications, customer portals, dashboards and mobile apps. Every build starts from the goal \u2014 generate leads, take orders, book appointments, serve customers, connect to an internal system \u2014 and is engineered for speed, search visibility and accessibility from the start rather than patched afterwards.',
    intro:
      'A website earns its cost by doing a job. Most do not, because they were built as a brochure and measured as a brochure. We start by naming the job \u2014 the enquiry, the order, the booking, the portal login \u2014 and design backwards from it, then build it to load fast on a mid-range phone on a Pakistani mobile network.',
    problems: [
      'The site looks acceptable but produces almost no enquiries.',
      'It takes too long to load, especially on mobile data.',
      'Nobody can update content without going back to a developer.',
      'It ranks for the company name and nothing else.',
      'The site knows nothing about your stock, orders or customers.',
    ],
    whatWeDo: [
      {
        title: 'Websites with a defined job',
        body: 'Corporate sites, landing pages and e-commerce built around one primary action, with the path to it made obvious rather than decorated.',
      },
      {
        title: 'Web applications and portals',
        body: 'Customer, supplier and dealer portals, internal dashboards and SaaS interfaces \u2014 with authentication, roles and real data behind them.',
      },
      {
        title: 'Mobile applications',
        body: 'Native or cross-platform apps, and progressive web apps where an install is friction you do not need.',
      },
      {
        title: 'Performance as a requirement',
        body: 'Server-rendered content, optimised images in modern formats, controlled JavaScript and disciplined third-party scripts \u2014 targeted at good Core Web Vitals on real devices.',
      },
      {
        title: 'SEO-ready and accessible from day one',
        body: 'Clean URLs, correct canonicals, structured data, semantic headings, keyboard navigation and contrast handled during the build, not bolted on later.',
      },
      {
        title: 'Connected to your systems',
        body: 'Forms into your CRM, stock and pricing from your ERP, payments through a gateway, orders flowing into the system that fulfils them.',
      },
    ],
    modules: [
      'Corporate Sites',
      'Landing Pages',
      'E-commerce',
      'Web Apps',
      'Portals',
      'Dashboards',
      'Mobile Apps',
      'Technical SEO',
    ],
    outcomes: [
      'A site measured by enquiries or orders, not by page views',
      'Fast loading on mid-range phones and mobile networks',
      'Content your team can update without a developer',
      'Search and analytics correctly configured from launch',
    ],
    process: [
      'Goal & Audience',
      'Structure & Wireframes',
      'Design',
      'Build',
      'Content & SEO',
      'Test & Launch',
      'Measure',
    ],
    ctaLabel: 'Start a Web Project',
    faqs: [
      {
        question: 'How much should a business website cost?',
        answer:
          'It depends on how much of it is genuinely custom. A well-built multi-page corporate site with custom design and proper SEO groundwork sits in a very different range from an e-commerce store with payment and courier integrations, or a portal with logins and live data. We price against a page and feature list, and will tell you when a smaller scope would serve you better.',
      },
      {
        question: 'What is the difference between a website and a web application?',
        answer:
          'A website mainly publishes information to visitors. A web application does work for a specific user \u2014 it has logins, roles, records and actions, such as a customer checking their orders or a manager approving a request. Many projects need a site with a small application behind it.',
      },
      {
        question: 'Can you redesign our existing site without losing our search rankings?',
        answer:
          'Yes, and that is a deliberate piece of work: we inventory the existing URLs, keep the ones with search equity, map permanent redirects for anything that must change, preserve the content that is ranking, and monitor after launch. Redesigns lose rankings when this step is skipped.',
      },
      {
        question: 'Do you host and maintain the site?',
        answer:
          'We handle domain, DNS, hosting and cloud deployment, and offer ongoing maintenance. You can also take the build and host it yourself \u2014 we will hand it over properly either way.',
      },
    ],
  },
  {
    slug: 'aeo-geo-ai-search-optimisation',
    href: '/services/aeo-geo-ai-search-optimisation',
    division: 'marketing',
    title: 'AEO & GEO: Getting Your Business Into AI Answers',
    navLabel: 'AEO & GEO (AI Search)',
    tagline: 'Be the business ChatGPT, Gemini, Claude and Perplexity can describe correctly.',
    metaTitle: 'AEO & GEO Services: AI Search Optimisation',
    metaDescription:
      'Answer engine optimisation (AEO) and generative engine optimisation (GEO): make your business findable, quotable and correctly described by ChatGPT, Gemini, Claude, Perplexity and Google AI answers.',
    answer:
      'ODOOVATIONS provides answer engine optimisation (AEO) and generative engine optimisation (GEO): the work that helps AI assistants such as ChatGPT, Gemini, Claude, Perplexity and Google’s AI answers find a business, understand what it does and describe it correctly. It covers a single fact sheet for the business, answer-first page content, structured data, an llms.txt file, crawler access, directory and profile consistency, and repeated testing of what the assistants actually say. No one can guarantee that an AI assistant will name or recommend a business, and we do not.',
    intro:
      'More buyers now ask an assistant before they search. The assistant answers from what it can read and trust: your own site, directories, reviews, press and profiles. If those sources are thin, inconsistent or hard for a machine to parse, the answer names someone else, or gets you wrong. AEO and GEO fix the parts you control and build the parts you do not yet have.',
    problems: [
      'Ask ChatGPT or Perplexity about your business and it finds nothing, or confuses you with someone else.',
      'Competitors are named in AI answers for searches you should win.',
      'Your site says different things on different pages, so no single fact is safe to quote.',
      'Your services are described in marketing language that answers no question.',
      'Directory listings, social profiles and your website disagree on your name, address or services.',
    ],
    whatWeDo: [
      { title: 'Entity and fact sheet', body: 'One checked list of facts about the business (name, location, services, what you do not do) published on the site and reused everywhere, so every source says the same thing.' },
      { title: 'Answer-first content', body: 'Each important page opens with a direct, quotable answer to the question a buyer would ask, followed by the detail. Questions people actually ask become visible FAQs.' },
      { title: 'Structured data and llms.txt', body: 'An Organization, Service and FAQ graph that links together, and llms.txt files that summarise the site for language models in their own format.' },
      { title: 'Crawler access and technical health', body: 'Search and AI crawlers allowed and able to read every public page, sitemaps with honest dates, fast pages, share images, Bing and Google verification, and recrawl requests after changes.' },
      { title: 'Off-site signals', body: 'Consistent Google Business Profile, directory listings and social profiles, plus a plan for the reviews and mentions that assistants weigh when they choose whom to name.' },
      { title: 'AI visibility testing', body: 'A fixed set of buyer questions asked of the main assistants on a schedule, with the answers recorded, so changes are measured against what the assistants really say rather than assumed.' },
    ],
    modules: ['AEO', 'GEO', 'Structured Data', 'llms.txt', 'Technical SEO', 'Entity SEO', 'Local SEO', 'AI Visibility Testing'],
    flow: {
      label: 'From invisible to quotable',
      steps: ['Baseline AI answers', 'Fact sheet', 'Answer-first pages', 'Structured data & llms.txt', 'Crawler access', 'Profiles & directories', 'Retest & report'],
      note: 'The baseline is recorded first, so every later test is compared with what the assistants said before any change.',
    },
    outcomes: [
      'A record of what the main AI assistants say about the business, before and after',
      'One consistent set of facts across the site, profiles and directories',
      'Pages that answer buyer questions directly and can be quoted',
      'A site that search and AI crawlers can read in full',
    ],
    process: ['Baseline test', 'Fact sheet', 'Content & schema', 'Technical & crawler access', 'Off-site profiles', 'Retest & report'],
    ctaLabel: 'Check My AI Visibility',
    faqs: [
      { question: 'What is AEO?', answer: 'Answer engine optimisation is the work of making a business’s information easy for answer engines (Google’s AI answers, voice assistants and chat assistants) to find and quote: direct answers to real questions, clear structure and structured data.' },
      { question: 'What is GEO?', answer: 'Generative engine optimisation focuses on large language model assistants such as ChatGPT, Gemini, Claude and Perplexity: making sure they can read your site, find consistent facts about you across the web, and describe your business correctly when someone asks.' },
      { question: 'How is this different from SEO?', answer: 'It builds on SEO rather than replacing it. SEO aims for a ranked link; AEO and GEO aim for your business to be the answer, or to be named and described correctly inside one. Consistent facts, direct answers and off-site reputation matter more than they do for classic rankings.' },
      { question: 'Can you guarantee ChatGPT or Google will recommend us?', answer: 'No. Nobody controls what an AI assistant says, and anyone who guarantees it is not being straight with you. We improve what assistants can read and trust, and we measure what they actually say over time.' },
      { question: 'How long does it take?', answer: 'Changes to your own site can be made in weeks. Search engines and assistants then need time to recrawl, and off-site signals such as reviews and directory profiles build over months. We report against the recorded baseline so you can see what has moved.' },
      { question: 'Have you done this for anyone?', answer: 'We applied it to odoovations.com in October 2026: a published fact sheet, answer-first service pages, a linked structured-data graph, llms.txt files, named crawler access and IndexNow submission. Results are still being measured and will be published only with evidence.' },
    ],
  },
  {
    slug: 'digital-marketing',
    href: '/services/digital-marketing',
    division: 'marketing',
    title: 'Digital Marketing Built Around Leads, Sales & Measurable Growth',
    navLabel: 'Marketing & Ads',
    tagline: 'Campaigns judged on qualified enquiries, not impressions.',
    metaTitle: 'Digital Marketing, Meta Ads & Google Ads | ODOOVATIONS',
    metaDescription:
      'Performance marketing, Meta and Google Ads, lead generation, SEO, email, landing pages and conversion optimisation \u2014 measured on lead quality and business outcomes.',
    answer:
      'ODOOVATIONS runs digital marketing as a connected system: audience and creative, a landing page or WhatsApp entry point, lead capture, qualification, CRM handoff, follow-up and measurement. Services include Meta Ads, Google Ads, YouTube Ads, retargeting, SEO, email marketing and conversion optimisation. We do not sell guaranteed rankings, guaranteed return figures or guaranteed lead volumes.',
    intro:
      'Most underperforming campaigns are not a targeting problem. The ad works, the click lands somewhere unconvincing, the enquiry arrives at an inbox nobody watches, and no one can say which ad produced the one deal that closed. We build the whole path and instrument it, so the money goes where the evidence points.',
    problems: [
      'Spend goes up, enquiries do not, and nobody can explain why.',
      'Leads arrive but most are unqualified or unreachable.',
      'There is no record of which campaign produced which customer.',
      'The ad promises one thing and the landing page says another.',
      'Reporting stops at clicks and cost per lead, never reaching revenue.',
    ],
    whatWeDo: [
      {
        title: 'Paid media that is actually managed',
        body: 'Meta, Google, YouTube and search campaigns built on a tested structure, with creative and audiences iterated on evidence rather than refreshed at random.',
      },
      {
        title: 'The landing experience',
        body: 'Landing pages and WhatsApp entry points written to continue the promise of the ad, with one clear action and no distractions competing for it.',
      },
      {
        title: 'Lead capture and qualification',
        body: 'Forms and conversational flows that collect what your sales team needs to prioritise, so unqualified enquiries are filtered before they consume selling time.',
      },
      {
        title: 'CRM handoff and follow-up',
        body: 'Leads written into your CRM with source, campaign and answers attached, assigned to an owner with a follow-up task and automated nurture where it fits.',
      },
      {
        title: 'SEO alongside paid',
        body: 'Technical SEO, content and local SEO to build search visibility that does not stop the day the ad budget stops.',
      },
      {
        title: 'Measurement end to end',
        body: 'Attribution from source and campaign through to enquiry, qualified lead and \u2014 where your CRM records it \u2014 closed business.',
      },
    ],
    modules: [
      'Meta Ads',
      'Google Ads',
      'Lead Generation',
      'Landing Pages',
      'SEO',
      'Email Marketing',
      'Retargeting',
      'Analytics',
    ],
    flow: {
      label: 'The campaign system',
      steps: ['Audience', 'Creative', 'Landing page / WhatsApp', 'Lead', 'Qualification', 'CRM', 'Follow-up', 'Measurement'],
      note: 'Every stage is instrumented. When performance drops, we can see which stage caused it instead of guessing.',
    },
    outcomes: [
      'Enquiries traceable to the campaign that produced them',
      'Better lead quality reaching the sales team',
      'Creative decisions based on tested results',
      'Reporting that connects spend to business outcomes',
    ],
    process: [
      'Goals & Baseline',
      'Tracking Setup',
      'Offer & Creative',
      'Launch',
      'Test & Iterate',
      'Report & Scale',
    ],
    ctaLabel: 'Plan My Campaign',
    faqs: [
      {
        question: 'Can you guarantee a number of leads or a return on ad spend?',
        answer:
          'No, and any agency that does is guessing. Results depend on your offer, pricing, market, competition, sales follow-up and budget \u2014 most of which sit outside our control. What we commit to is a properly structured campaign, honest measurement, and a clear recommendation when the evidence says the money should move or stop.',
      },
      {
        question: 'Can you guarantee first position on Google?',
        answer:
          'No. Nobody can guarantee organic rankings, and Google says so explicitly. SEO work improves the factors we can influence \u2014 technical health, content quality, relevance and authority \u2014 and is reported against visibility and traffic rather than a promised position.',
      },
      {
        question: 'What budget do we need to start?',
        answer:
          'Enough for the platform to gather meaningful data before you judge it. Too small a budget spread across too many campaigns produces numbers nobody can learn from. We recommend a starting structure based on your market and objective during scoping.',
      },
      {
        question: 'Do you handle the creative as well?',
        answer:
          'Yes \u2014 our creative studio produces the ad creative, video and copy, which means the creative and the campaign are not arguing with each other.',
      },
      {
        question: 'Who owns the ad accounts?',
        answer:
          'You do. We work inside your Meta Business Manager and Google Ads accounts wherever possible, so the account history, audiences and data stay yours if we ever part ways.',
      },
    ],
  },
  {
    slug: 'creative-media',
    href: '/services/creative-media',
    division: 'creative',
    title: 'Creative, Video & Content That Makes Complex Businesses Easy to Understand',
    navLabel: 'Creative & Media',
    tagline: 'Creative that explains, persuades and sells.',
    metaTitle: 'Creative Studio: Design, Video & Animation | ODOOVATIONS',
    metaDescription:
      'Graphic design, brand identity, ad creative, video production, motion graphics, 2D and 3D animation, explainer videos, copywriting and content \u2014 from one studio.',
    answer:
      'The ODOOVATIONS creative studio produces graphic design, brand identity, ad creative, presentation and corporate profile design, video production and editing, motion graphics, 2D and 3D animation, explainer and product videos, short-form content, and the copywriting and scripts that go with them.',
    intro:
      'Technical businesses lose deals for an unglamorous reason: the buyer never quite understood the offer. Good creative is not decoration on top of that problem \u2014 it is the work of making a complicated thing clear enough to say yes to, in a format the audience will actually watch or read.',
    problems: [
      'What you sell takes ten minutes to explain and you have about eight seconds.',
      'The design looks improvised because everything was made by a different hand.',
      'Ad creative gets refreshed constantly without anyone learning from it.',
      'The product is genuinely good and the pictures make it look ordinary.',
      'Nobody on the team has time to write the copy properly.',
    ],
    whatWeDo: [
      {
        title: 'Brand and graphic design',
        body: 'Identity systems, social and campaign design, corporate profiles, brochures, presentations, posters and packaging \u2014 consistent, so the brand looks like one company.',
      },
      {
        title: 'Ad creative built for testing',
        body: 'Creative produced in variations against a clear hypothesis, so the campaign has something meaningful to compare instead of one asset and a hope.',
      },
      {
        title: 'Video production and editing',
        body: 'Corporate, commercial, product and testimonial video, from script and shoot through to edit, grade and delivery in the formats each platform needs.',
      },
      {
        title: 'Motion graphics and animation',
        body: '2D and 3D animation, product animation and explainer videos \u2014 the most efficient way to show a process, a system or a product that is hard to photograph.',
      },
      {
        title: 'Short-form content',
        body: 'Reels and short video produced as a repeatable system rather than a one-off burst that stops after two weeks.',
      },
      {
        title: 'Copy and scripts',
        body: 'Website copy, sales and ad copy, scripts, storyboards, articles and voiceover scripts \u2014 written by people who understood the product first.',
      },
    ],
    modules: [
      'Graphic Design',
      'Brand Identity',
      'Ad Creative',
      'Video Production',
      'Motion Graphics',
      '2D & 3D Animation',
      'Copywriting',
      'Short-form Content',
    ],
    outcomes: [
      'An offer a non-expert buyer can understand quickly',
      'Visual consistency across every touchpoint',
      'Creative variations a campaign can genuinely learn from',
      'Assets delivered in the formats each channel needs',
    ],
    process: [
      'Brief & Objective',
      'Concept',
      'Script / Storyboard',
      'Production',
      'Edit & Review',
      'Delivery',
    ],
    ctaLabel: 'Start a Creative Project',
    faqs: [
      {
        question: 'Do you only do creative for your own software clients?',
        answer:
          'No. The studio takes standalone design, video and content work. It happens to be unusually good at technical and B2B subjects because the rest of the company builds those systems.',
      },
      {
        question: 'How long does a video take?',
        answer:
          'A short social edit from footage you already have can turn around quickly. A scripted explainer with custom animation runs longer because scripting, storyboarding, animation and revisions each take real time. We give a schedule with the quote, and the number of revision rounds is agreed up front.',
      },
      {
        question: 'Can you work from our existing brand guidelines?',
        answer:
          'Yes. If guidelines exist we work inside them; if they do not, we can build a lightweight system so future work stays consistent.',
      },
      {
        question: 'Do you use AI in creative production?',
        answer:
          'Where it genuinely helps \u2014 drafting variations, rough cuts, background work. We do not pass off generic AI output as bespoke production, and anything delivered is reviewed and finished by a person.',
      },
    ],
  },
  {
    slug: 'content-social',
    href: '/services/content-social',
    division: 'content-social',
    title: 'Content, Social & Creator Management',
    navLabel: 'Content & Social',
    tagline: 'A brand that publishes consistently instead of in bursts.',
    metaTitle: 'Social Media Management & Creator Campaigns | ODOOVATIONS',
    metaDescription:
      'Content planning, social media management, publishing, community management, creator and influencer campaign coordination, and creative analytics.',
    answer:
      'ODOOVATIONS plans and runs the ongoing content side of a brand: content strategy and calendars, production, scheduling and publishing, community management, creator and influencer campaign coordination, UGC campaigns, content repurposing and creative analytics.',
    intro:
      'Most brands do not have a content idea problem. They have an operating problem: nobody owns the calendar, production depends on whoever is free, and the account goes quiet for three weeks. Content works when it is run as an operation with a schedule, a pipeline and someone accountable for it.',
    problems: [
      'Posting is enthusiastic for two weeks, then stops.',
      'Every post is made from scratch, so output depends on who has time.',
      'Comments and DMs go unanswered and get treated as noise.',
      'Creator collaborations are arranged ad hoc with no brief and no measurement.',
      'Nobody knows which content actually moved anything.',
    ],
    whatWeDo: [
      {
        title: 'Content strategy and calendars',
        body: 'Themes, formats and a publishing rhythm your business can actually sustain, planned far enough ahead that production is never a scramble.',
      },
      {
        title: 'Production and publishing',
        body: 'Assets produced against the calendar, scheduled and published across the channels that matter for your audience.',
      },
      {
        title: 'Community management',
        body: 'Comments, messages and mentions handled on a defined response standard \u2014 including the enquiries hiding among them.',
      },
      {
        title: 'Creator and influencer campaigns',
        body: 'Creator identification and outreach, briefing, deliverable and timeline coordination, and campaign reporting.',
      },
      {
        title: 'Repurposing',
        body: 'One shoot, one webinar or one long article turned into a month of short-form content instead of a single post.',
      },
      {
        title: 'Creative analytics',
        body: 'Reporting on which formats, hooks and topics performed, so the next calendar is informed by the last one.',
      },
    ],
    modules: [
      'Content Strategy',
      'Content Calendars',
      'Publishing',
      'Community Management',
      'Creator Campaigns',
      'UGC',
      'Repurposing',
      'Analytics',
    ],
    outcomes: [
      'A consistent publishing rhythm that survives busy months',
      'Enquiries from social actually picked up and routed',
      'Creator campaigns briefed and measured properly',
      'A content library that keeps producing after it is made',
    ],
    process: [
      'Audience & Goals',
      'Content Strategy',
      'Calendar',
      'Production',
      'Publish & Engage',
      'Report & Adjust',
    ],
    ctaLabel: 'Plan My Content',
    faqs: [
      {
        question: 'Do you guarantee follower growth?',
        answer:
          'No. Follower counts can be bought and are a poor measure of anything. We report on reach, engagement quality, content performance and \u2014 where it applies \u2014 enquiries generated from social.',
      },
      {
        question: 'Can you manage creator campaigns and the paid ads together?',
        answer:
          'Yes, and it usually works better that way, because creator content that performs organically can be put behind paid spend instead of being made twice.',
      },
      {
        question: 'Who approves posts before they go out?',
        answer:
          'You do. We work from an approved calendar with a review step, and agree in advance which categories of reply the community manager can send without checking.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
