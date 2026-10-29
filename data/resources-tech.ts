/**
 * Guides for the common questions people ask across the technology industry, beyond Odoo:
 * app cost, ERP basics, platform comparisons, AI agents, AEO and GEO, choosing a firm.
 *
 * Same rules as data/resources.ts: answer first, no invented prices or statistics, no
 * claims about a third-party product beyond what is generally and verifiably true, and
 * the honest answer even when it is "you may not need us".
 */
import type { Resource } from './resources';

const UPDATED = '2026-10-29';

export const techGuides: Resource[] = [
  {
    slug: 'mobile-app-development-cost-pakistan',
    href: '/resources/mobile-app-development-cost-pakistan',
    metaTitle: 'How Much Does a Mobile App Cost in Pakistan? | ODOOVATIONS',
    metaDescription:
      'What drives mobile app development cost in Pakistan: platforms, features, back end, integrations, design and upkeep. The factors behind a quote, not a made-up price.',
    h1: 'How Much Does a Mobile App Cost in Pakistan?',
    eyebrow: 'Apps',
    summary:
      'An app’s cost is set by what it must do, not by the word "app". The main drivers are whether you need iOS, Android or both, how many screens and user roles there are, whether it needs its own back end and admin panel, which systems it connects to (payments, maps, your ERP), and who keeps it updated after launch. A simple app that shows information from an existing system costs a fraction of a marketplace with payments, chat and live tracking.',
    updated: UPDATED,
    readMinutes: 7,
    primaryKeyword: 'mobile app development cost Pakistan',
    blocks: [
      { type: 'h2', text: 'The factors that move the number' },
      {
        type: 'table',
        head: ['Factor', 'What increases cost'],
        rows: [
          ['Platforms', 'One platform is cheaper than two. A cross-platform framework can serve iOS and Android from one codebase; separate native apps cost more but sometimes perform better for heavy features.'],
          ['Features and screens', 'Every distinct flow (sign-up, ordering, payment, tracking, chat) is design, build and testing. Count flows, not screens.'],
          ['Back end and admin', 'Most apps need a server, a database and an admin panel to manage content, users and orders. This is often as much work as the app itself.'],
          ['Integrations', 'Payment gateways, maps, SMS or WhatsApp, and your ERP or accounting system each add work, and the effort depends on the other system’s API.'],
          ['Design', 'A clean standard design is quicker than a fully custom visual identity with animation.'],
          ['After launch', 'App store updates, operating-system changes, bug fixes and hosting continue every month the app is live.'],
        ],
      },
      { type: 'h2', text: 'Do you need an app at all?' },
      {
        type: 'p',
        text: 'Many businesses need a fast mobile website or a web app rather than a store-listed app. If customers will use it once or twice, a mobile web page they can open from a WhatsApp link is cheaper, needs no download and is found by search engines. An installed app earns its cost when people use it often, need notifications, offline use, the camera or location in the background.',
      },
      { type: 'h2', text: 'How to get a quote you can compare' },
      {
        type: 'list',
        items: [
          'Write down every user type and what each must be able to do.',
          'List every system the app must talk to.',
          'Say who will run the admin side and what they need to change without a developer.',
          'Ask each firm to quote the first version and the monthly upkeep separately.',
          'Ask who owns the source code and the app store accounts. It should be you.',
        ],
      },
      { type: 'note', text: 'We quote against a written scope after a short discovery, and we will tell you when a mobile website would serve you better than an app.' },
    ],
    faqs: [
      { question: 'Is it cheaper to build for Android only?', answer: 'Usually, for the first version, and Android is the larger platform in Pakistan. If your customers are abroad or corporate, check which phones they actually use before deciding.' },
      { question: 'How long does a first version take?', answer: 'It depends on the number of flows and integrations. A focused first version with a few core flows is a matter of weeks to a few months; a platform with payments, tracking and multiple user types takes longer. We give a timeline only after scoping.' },
      { question: 'Who owns the app after it is built?', answer: 'You should own the source code, the app store developer accounts and the server accounts. Put it in the contract.' },
    ],
    relatedServices: [
      { label: 'Websites, web and mobile apps', href: '/services/web-development' },
      { label: 'Custom software', href: '/services/custom-software-development' },
    ],
    relatedResources: ['custom-software-cost-pakistan', 'business-website-cost-pakistan', 'custom-software-vs-off-the-shelf'],
  },
  {
    slug: 'what-is-erp-software',
    href: '/resources/what-is-erp-software',
    metaTitle: 'What Is ERP Software? Does Your Business Need It?',
    metaDescription:
      'ERP software explained in plain language: what it does, the signs a business needs one, the main options (Odoo, SAP, Microsoft and others), and how implementation works.',
    h1: 'What Is ERP Software, and Does Your Business Need It?',
    eyebrow: 'ERP basics',
    summary:
      'ERP (enterprise resource planning) software keeps a business’s core records in one system: sales, purchasing, stock, accounting, and often manufacturing, HR and CRM. Instead of each department keeping its own spreadsheet, every transaction updates the same records, so stock, receivables and margins agree. A business usually needs one when the same figure is typed into several places, nobody trusts the stock count, or month-end takes days of reconciling.',
    updated: UPDATED,
    readMinutes: 7,
    primaryKeyword: 'what is ERP software',
    blocks: [
      { type: 'h2', text: 'What an ERP actually does' },
      {
        type: 'list',
        items: [
          'A sale reduces stock and creates the invoice and the receivable without re-typing.',
          'A purchase updates stock, the supplier balance and the cost of goods.',
          'Accounts are produced from the same transactions operations already recorded.',
          'Reports show one version of stock, sales and cash, across branches if there are several.',
        ],
      },
      { type: 'h2', text: 'Signs you have outgrown spreadsheets' },
      {
        type: 'list',
        items: [
          'Sales sells stock the warehouse does not have.',
          'Month-end closing takes days of matching figures.',
          'Two people give two different answers to "how much stock do we have?"',
          'Growth means hiring people only to move data between files.',
        ],
      },
      { type: 'h2', text: 'The main kinds of ERP' },
      {
        type: 'table',
        head: ['Type', 'Typical fit'],
        rows: [
          ['Modular open-core ERP (for example Odoo)', 'Small and mid-sized businesses that want to start with a few modules and add more; can be extended with custom modules.'],
          ['Large-vendor ERP (for example SAP, Oracle, Microsoft Dynamics)', 'Larger organisations with complex, multi-entity needs and the budget for longer implementations and licences.'],
          ['Industry-specific or custom systems', 'Businesses whose core process is unusual enough that a general ERP would need heavy changes.'],
        ],
      },
      { type: 'h2', text: 'What implementation involves' },
      {
        type: 'p',
        text: 'Choosing the software is the smaller decision. Most of the work is mapping how the business really operates, configuring the system to match, cleaning and migrating data, and training people. Projects fail far more often from skipped discovery and poor data than from the wrong product.',
      },
      { type: 'note', text: 'ODOOVATIONS implements Odoo and builds custom systems, so we will tell you which one fits, and when neither does. We are an independent Odoo team and do not claim official Odoo partner status.' },
    ],
    faqs: [
      { question: 'Is ERP only for large companies?', answer: 'No. Modular systems such as Odoo let a small business start with sales, stock and accounting and add the rest later.' },
      { question: 'How is ERP different from accounting software?', answer: 'Accounting software records the financial result. An ERP also runs the operations that produce it, such as stock, purchasing and sales, so the accounts come from the same transactions.' },
      { question: 'How long does an ERP take to implement?', answer: 'It depends on modules, users, data and integrations. A focused first phase is much quicker than everything at once, which is why we phase implementations.' },
    ],
    relatedServices: [
      { label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'Custom software', href: '/services/custom-software-development' },
    ],
    relatedResources: ['odoo-implementation-cost-pakistan', 'odoo-vs-sap-vs-quickbooks', 'odoo-readiness-assessment'],
  },
  {
    slug: 'odoo-vs-sap-vs-quickbooks',
    href: '/resources/odoo-vs-sap-vs-quickbooks',
    metaTitle: 'Odoo vs SAP Business One vs QuickBooks | ODOOVATIONS',
    metaDescription:
      'Odoo, SAP Business One and QuickBooks compared in plain terms: what each is built for, who it suits, and the questions that decide between them.',
    h1: 'Odoo vs SAP Business One vs QuickBooks',
    eyebrow: 'Comparison',
    summary:
      'They solve different problems. QuickBooks is accounting software: it records invoices, bills, payments and produces financial statements. SAP Business One and Odoo are ERPs: they also run sales, purchasing, stock and often manufacturing, so the accounts come from operational transactions. Between the two ERPs, Odoo is modular and extensible with an open-source community edition, while SAP Business One is a proprietary ERP from SAP aimed at small and mid-sized companies. The right choice depends on whether you need accounting only or operations too, how much you will customise, and your budget for licences and implementation.',
    updated: UPDATED,
    readMinutes: 6,
    primaryKeyword: 'Odoo vs SAP vs QuickBooks',
    blocks: [
      { type: 'h2', text: 'At a glance' },
      {
        type: 'table',
        head: ['', 'QuickBooks', 'SAP Business One', 'Odoo'],
        rows: [
          ['What it is', 'Accounting software', 'Proprietary SME ERP', 'Modular ERP, open-core'],
          ['Best when', 'You need clean books, and operations are simple', 'You want a large-vendor ERP and its partner ecosystem', 'You want to start small, add modules and customise'],
          ['Stock and operations', 'Basic', 'Yes', 'Yes'],
          ['Customisation', 'Limited, mainly through apps', 'Through SAP partners and add-ons', 'Custom modules in Python, plus a large app ecosystem'],
        ],
      },
      { type: 'h2', text: 'Questions that decide it' },
      {
        type: 'list',
        items: [
          'Do you need stock, purchasing and sales in the same system as accounts, or only accounting?',
          'How far does your process differ from standard software?',
          'What is the total cost over three years: licences, implementation, hosting and support?',
          'Who will support it locally after go-live?',
        ],
      },
      { type: 'h2', text: 'They can also work together' },
      {
        type: 'p',
        text: 'Some businesses run operations in Odoo or a custom system and keep QuickBooks for the accounts their accountant already uses. That works if the integration is designed carefully: which system owns each record, and what moves between them.',
      },
      { type: 'note', text: 'We implement Odoo and build QuickBooks integrations; we do not implement SAP. QuickBooks work is integration and software only, never bookkeeping or tax.' },
    ],
    faqs: [
      { question: 'Can QuickBooks replace an ERP?', answer: 'For accounting, yes. For running stock, purchasing and production, usually not on its own; that is where an ERP or an integration comes in.' },
      { question: 'Is Odoo free?', answer: 'Odoo has an open-source Community edition and a paid Enterprise edition with more features and support. Implementation, hosting and customisation cost money either way.' },
      { question: 'Which is best for a business in Pakistan?', answer: 'It depends on the scope above and on local support. Compare total cost over several years and the partner who will actually support you.' },
    ],
    relatedServices: [
      { label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'QuickBooks integrations', href: '/platforms/quickbooks' },
    ],
    relatedResources: ['what-is-erp-software', 'odoo-community-vs-enterprise', 'odoo-implementation-cost-pakistan'],
  },
  {
    slug: 'shopify-vs-woocommerce-pakistan',
    href: '/resources/shopify-vs-woocommerce-pakistan',
    metaTitle: 'Shopify vs WooCommerce for a Pakistani Store | ODOOVATIONS',
    metaDescription:
      'Shopify or WooCommerce for an online store in Pakistan: hosting, cost structure, payments, control and back-office integration compared plainly.',
    h1: 'Shopify vs WooCommerce for a Store in Pakistan',
    eyebrow: 'E-commerce',
    summary:
      'Shopify is a hosted platform: you pay a monthly subscription and Shopify runs the servers, security and updates. WooCommerce is a free plugin for WordPress that you host yourself, so you control everything but are responsible for hosting, updates and security. Shopify is usually quicker to launch and easier to run without a developer; WooCommerce gives more control and no platform subscription. For a Pakistani store, check how each handles the local payment methods and couriers you need, and how it will connect to your stock and accounts.',
    updated: UPDATED,
    readMinutes: 6,
    primaryKeyword: 'Shopify vs WooCommerce Pakistan',
    blocks: [
      { type: 'h2', text: 'The real differences' },
      {
        type: 'table',
        head: ['', 'Shopify', 'WooCommerce'],
        rows: [
          ['Hosting', 'Included, run by Shopify', 'Your own hosting'],
          ['Ongoing cost', 'Monthly plan plus apps', 'Hosting, plugins and maintenance'],
          ['Control', 'Within Shopify’s rules', 'Full control of code and data'],
          ['Running it', 'Easier without a developer', 'Needs someone to keep WordPress and plugins updated'],
          ['Content and SEO', 'Good', 'Strong, because it sits on WordPress'],
        ],
      },
      { type: 'h2', text: 'Questions specific to Pakistan' },
      {
        type: 'list',
        items: [
          'Which card gateway and which wallets (for example JazzCash or Easypaisa) do you need, and is there a maintained app or plugin for each on that platform?',
          'Is cash on delivery a large share of orders, and how will it be reconciled?',
          'Which couriers will you use, and can orders and tracking be sent to them automatically?',
          'Where do stock and invoices live: Odoo, QuickBooks, a custom system or spreadsheets?',
        ],
      },
      { type: 'h2', text: 'The part most stores forget' },
      {
        type: 'p',
        text: 'The store takes the order; the work starts after. If orders are re-typed into another system for stock, invoicing and dispatch, the platform choice matters less than connecting it properly to the back office.',
      },
      { type: 'note', text: 'Shopify, WooCommerce and WordPress are trademarks of their owners. ODOOVATIONS builds on and integrates them as an independent team and claims no partnership.' },
    ],
    faqs: [
      { question: 'Which is cheaper?', answer: 'WooCommerce has no platform subscription, but hosting, premium plugins and maintenance cost money. Compare the full monthly cost, not just the plan price.' },
      { question: 'Can either connect to Odoo or QuickBooks?', answer: 'Yes, through apps, plugins or a custom integration. The right approach depends on order volume and which system owns stock and invoices.' },
      { question: 'Can I move from one to the other later?', answer: 'Yes. Products, customers and orders can be migrated, though themes and some features must be rebuilt.' },
    ],
    relatedServices: [
      { label: 'Shopify development and integration', href: '/platforms/shopify' },
      { label: 'WooCommerce development and integration', href: '/platforms/woocommerce' },
    ],
    relatedResources: ['business-website-cost-pakistan', 'odoo-vs-sap-vs-quickbooks'],
  },
  {
    slug: 'what-are-aeo-and-geo',
    href: '/resources/what-are-aeo-and-geo',
    metaTitle: 'What Are AEO and GEO? Getting Into AI Answers | ODOOVATIONS',
    metaDescription:
      'AEO (answer engine optimisation) and GEO (generative engine optimisation) explained: how ChatGPT, Gemini, Claude and Perplexity choose which businesses to mention, and what you can do about it.',
    h1: 'What Are AEO and GEO? How Businesses Get Into AI Answers',
    eyebrow: 'AI search',
    summary:
      'AEO (answer engine optimisation) makes your information easy for answer engines to quote: direct answers, clear structure and structured data. GEO (generative engine optimisation) focuses on AI assistants such as ChatGPT, Gemini, Claude and Perplexity: making sure they can read your site, find the same facts about you across the web, and describe you correctly. Both build on SEO. The assistants mostly name businesses that are indexed, consistent, and talked about by other trusted sites such as directories, reviews and press.',
    updated: UPDATED,
    readMinutes: 7,
    primaryKeyword: 'what is AEO and GEO',
    blocks: [
      { type: 'h2', text: 'How AI assistants decide who to mention' },
      {
        type: 'list',
        items: [
          'They search: assistants with web search read pages from search indexes such as Google and Bing. A site that is not indexed cannot be found.',
          'They look for agreement: the same name, address and services on your site, Google Business Profile, LinkedIn and directories.',
          'They look for others vouching for you: reviews, directory listings, press and articles.',
          'They quote clear text: pages that answer a question directly in the first lines are easier to use.',
        ],
      },
      { type: 'h2', text: 'What to do on your own website' },
      {
        type: 'list',
        items: [
          'Publish one fact sheet about the business and keep every page consistent with it.',
          'Open each service page with a direct, quotable answer to the buyer’s question.',
          'Add structured data (Organization, Service, FAQ) that links together.',
          'Publish an llms.txt file that summarises the site for language models.',
          'Let search and AI crawlers read every public page, and verify the site in Google Search Console and Bing Webmaster Tools.',
        ],
      },
      { type: 'h2', text: 'What to do off your website' },
      {
        type: 'list',
        items: [
          'Create and verify a Google Business Profile, and ask real clients for reviews.',
          'Create consistent profiles on LinkedIn and on directories your buyers use.',
          'Earn mentions in industry press and articles.',
        ],
      },
      { type: 'h2', text: 'How to measure it' },
      {
        type: 'p',
        text: 'Write down the questions your buyers ask, ask them of the main assistants in a fresh chat, and record the answers. Repeat every few weeks. Rankings tools do not show AI answers yet, so a recorded baseline is the honest measure.',
      },
      { type: 'note', text: 'No one can guarantee that an AI assistant will name or recommend a business. Be wary of anyone who does.' },
    ],
    faqs: [
      { question: 'Is GEO replacing SEO?', answer: 'No. AI assistants with search rely on search indexes, so SEO is the foundation. AEO and GEO add consistency, direct answers and off-site reputation on top.' },
      { question: 'What is llms.txt?', answer: 'A plain-text file at the root of a website that summarises the site and links its key pages for language models. It is a proposed standard; it helps machines read a site but does not by itself make an assistant mention you.' },
      { question: 'How long until ChatGPT mentions my business?', answer: 'Questions about your own name can change within weeks of being indexed. Broad "best company" questions depend on reviews and mentions that build over months.' },
    ],
    relatedServices: [
      { label: 'AEO & GEO (AI search optimisation)', href: '/services/aeo-geo-ai-search-optimisation' },
      { label: 'Digital marketing and SEO', href: '/services/digital-marketing' },
    ],
    relatedResources: ['business-website-cost-pakistan', 'how-to-choose-a-software-company-pakistan'],
  },
  {
    slug: 'how-to-choose-a-software-company-pakistan',
    href: '/resources/how-to-choose-a-software-company-pakistan',
    metaTitle: 'How to Choose a Software Company in Pakistan | ODOOVATIONS',
    metaDescription:
      'How to choose a software development company in Pakistan: what to ask, what to check, red flags, and how to compare quotes fairly.',
    h1: 'How to Choose a Software Development Company in Pakistan',
    eyebrow: 'Buying guide',
    summary:
      'Choose the firm that understands your process, not the one with the lowest number. Ask to see work similar to yours, speak to a past client, and have each firm quote against the same written scope. Check who will actually do the work, who owns the code, how changes are priced, and what support looks like after launch. Be cautious of guaranteed timelines before scoping, unverifiable awards or partner badges, and quotes given without questions.',
    updated: UPDATED,
    readMinutes: 7,
    primaryKeyword: 'software development company Pakistan',
    blocks: [
      { type: 'h2', text: 'Questions to ask every firm' },
      {
        type: 'list',
        items: [
          'Can you show a system similar to ours, and can we speak to that client?',
          'Who exactly will build and test it, and are they employees or subcontractors?',
          'What do you need from our team during discovery and testing?',
          'How is a change priced once building has started?',
          'Who owns the source code, the hosting and the accounts?',
          'What does support cost after launch, and how are requests handled?',
        ],
      },
      { type: 'h2', text: 'What to check yourself' },
      {
        type: 'list',
        items: [
          'Claimed partner status: Odoo, Microsoft and others publish partner directories you can search.',
          'Reviews on Google, Clutch or similar sites, and whether they name real clients.',
          'Whether their proposal describes your process back to you correctly.',
        ],
      },
      { type: 'h2', text: 'Red flags' },
      {
        type: 'list',
        items: [
          'A fixed price before anyone has asked how your business works.',
          'Guaranteed delivery dates, rankings or returns.',
          'Awards, ratings or client logos that cannot be verified.',
          'No written scope, or a scope with no exclusions.',
        ],
      },
      { type: 'note', text: 'ODOOVATIONS publishes what it does not claim: no Odoo partner status, no 24/7 support, no guaranteed results. Every project on our site carries its status, and demonstrations are labelled as demonstrations.' },
    ],
    faqs: [
      { question: 'Should I choose the cheapest quote?', answer: 'Only if every quote is against the same scope. Large differences usually mean the firms are describing different projects.' },
      { question: 'Is a local firm better than a remote one?', answer: 'Local firms understand local tax, payment and courier systems and can meet in person; remote delivery works well with a clear scope and agreed working hours. Choose on understanding and evidence.' },
      { question: 'How do I protect myself in the contract?', answer: 'Get the scope, exclusions, payment milestones, code ownership, change pricing and support terms in writing.' },
    ],
    relatedServices: [
      { label: 'Custom software', href: '/services/custom-software-development' },
      { label: 'Odoo consulting', href: '/services/odoo-consulting' },
    ],
    relatedResources: ['custom-software-cost-pakistan', 'how-to-choose-an-odoo-implementation-company', 'custom-software-vs-off-the-shelf'],
  },
  {
    slug: 'custom-software-vs-off-the-shelf',
    href: '/resources/custom-software-vs-off-the-shelf',
    metaTitle: 'Custom Software vs Off-the-Shelf: Which Is Right?',
    metaDescription:
      'Custom software or off-the-shelf software: when each makes sense, the hidden costs of both, and the middle path of configuring a platform and building only the gaps.',
    h1: 'Custom Software vs Off-the-Shelf: Which Is Right for You?',
    eyebrow: 'Decision guide',
    summary:
      'Use off-the-shelf software when your process is common and the product fits it with configuration; it is quicker and cheaper to start. Build custom when the process is what makes your business different, when no product fits without heavy workarounds, or when licence costs across many users outgrow a build. Often the best answer is in between: a proven platform such as Odoo, configured, with custom modules only for the steps it genuinely misses.',
    updated: UPDATED,
    readMinutes: 6,
    primaryKeyword: 'custom software vs off the shelf',
    blocks: [
      { type: 'h2', text: 'Compared' },
      {
        type: 'table',
        head: ['', 'Off-the-shelf', 'Custom'],
        rows: [
          ['Start', 'Fast', 'Slower; needs discovery and build'],
          ['Fit', 'You adapt to the product', 'The software adapts to you'],
          ['Cost pattern', 'Subscription per user, ongoing', 'Build cost, then hosting and support'],
          ['Ownership', 'The vendor’s roadmap', 'You own it'],
          ['Risk', 'Workarounds and lock-in', 'A poor build or poor scope'],
        ],
      },
      { type: 'h2', text: 'Signs custom is worth it' },
      {
        type: 'list',
        items: [
          'Your team keeps spreadsheets next to the product to make it work.',
          'The process is a competitive advantage you do not want to bend.',
          'You are paying for many users of a product you use a small part of.',
        ],
      },
      { type: 'h2', text: 'The middle path' },
      {
        type: 'p',
        text: 'Most business systems are mostly standard: invoices, stock, purchasing. Building those from scratch is waste. Configuring a proven platform and building custom only where your process is genuinely different usually costs less and lasts longer than either extreme.',
      },
    ],
    faqs: [
      { question: 'Is custom software always more expensive?', answer: 'Up front, usually. Over several years, per-user subscriptions and workarounds can cost more than a well-scoped build.' },
      { question: 'What if the developer disappears?', answer: 'Own the code, the hosting and the documentation, and use common, well-supported technology, so another team can take over.' },
      { question: 'Can we start off-the-shelf and go custom later?', answer: 'Yes, and it is often sensible: you learn what you actually need before building.' },
    ],
    relatedServices: [
      { label: 'Custom software', href: '/services/custom-software-development' },
      { label: 'Custom Odoo development', href: '/services/custom-odoo-development' },
    ],
    relatedResources: ['custom-software-cost-pakistan', 'standard-odoo-vs-custom-development', 'what-is-erp-software'],
  },
  {
    slug: 'what-is-an-ai-agent-for-business',
    href: '/resources/what-is-an-ai-agent-for-business',
    metaTitle: 'What Is an AI Agent for Business? | ODOOVATIONS',
    metaDescription:
      'AI agents for business explained: what they are, practical uses (WhatsApp replies, documents, internal questions, reporting), their limits, and how to start safely.',
    h1: 'What Is an AI Agent, and What Can It Do for a Business?',
    eyebrow: 'AI',
    summary:
      'An AI agent is software that uses a language model to understand a request and then take steps: look something up, fill in a record, draft a reply, or pass the task to a person. In a business it is useful where work is repetitive and text-heavy: answering and qualifying customer messages on WhatsApp, reading invoices and documents, answering staff questions from company documents, and preparing reports. It should work inside clear limits, with a person approving anything that carries financial, legal or customer risk.',
    updated: UPDATED,
    readMinutes: 6,
    primaryKeyword: 'AI agent for business',
    blocks: [
      { type: 'h2', text: 'Practical uses' },
      {
        type: 'list',
        items: [
          'Customer messages: instant first replies, answers from your price list or policies, and qualification before a salesperson steps in.',
          'Documents: reading invoices, orders or forms and filling the data into your system for checking.',
          'Internal questions: staff ask in plain language and get answers from your own documents.',
          'Reporting: summaries of sales, stock or collections, with the figures drawn from your system.',
        ],
      },
      { type: 'h2', text: 'Limits to plan for' },
      {
        type: 'list',
        items: [
          'Models can be wrong with confidence, so answers must come from your own data and be checkable.',
          'Anything that moves money, commits stock or changes a customer record should have a person approve it.',
          'Customer data needs the same privacy care as anywhere else.',
        ],
      },
      { type: 'h2', text: 'How to start' },
      {
        type: 'p',
        text: 'Pick one repetitive task with a clear right answer, measure how long it takes today, automate it with a human check, and compare after a few weeks. Expand only what works.',
      },
      { type: 'note', text: 'ODOOVATIONS integrates third-party AI models; it does not claim to have trained its own foundation model.' },
    ],
    faqs: [
      { question: 'Will an AI agent replace staff?', answer: 'In practice it removes repetitive steps so people spend time on decisions and customers. Plan it as a tool for the team.' },
      { question: 'Can it work on WhatsApp?', answer: 'Yes, through the WhatsApp Business Platform, with the customer’s consent and with a person taking over when needed.' },
      { question: 'Is our data safe?', answer: 'It depends on the design: which model provider is used, what data is sent, and how it is stored. Decide this before building.' },
    ],
    relatedServices: [
      { label: 'AI and automation', href: '/services/ai-automation' },
      { label: 'WhatsApp automation', href: '/services/whatsapp-automation' },
    ],
    relatedResources: ['what-ai-can-automate-in-a-business', 'whatsapp-automation-guide'],
  },
  {
    slug: 'outsourcing-software-development-to-pakistan',
    href: '/resources/outsourcing-software-development-to-pakistan',
    metaTitle: 'Outsourcing Software Development to Pakistan',
    metaDescription:
      'Outsourcing software development to Pakistan: how remote delivery works, time zones, communication, contracts, code ownership and how to choose a team.',
    h1: 'Outsourcing Software Development to Pakistan: A Practical Guide',
    eyebrow: 'International clients',
    summary:
      'Pakistan has a large software industry serving clients abroad, and remote delivery works well when the scope is written down, communication is scheduled, and ownership is clear. Pakistan Standard Time is UTC+5, which overlaps with the working day in the Gulf, Europe and the UK, and with the morning in North America. Choose a team on evidence of similar work and how well they understand your process, agree working-hour overlap and a single point of contact, and make sure you own the code, the hosting and the accounts.',
    updated: UPDATED,
    readMinutes: 7,
    primaryKeyword: 'outsourcing software development to Pakistan',
    blocks: [
      { type: 'h2', text: 'How remote delivery works well' },
      {
        type: 'list',
        items: [
          'Discovery on video, with the people who do the work, not only management.',
          'A written scope with exclusions, signed before building.',
          'A shared environment where you can test working software at each milestone.',
          'An agreed overlap of working hours and one named contact on each side.',
          'Remote training and a support arrangement agreed before go-live.',
        ],
      },
      { type: 'h2', text: 'Time-zone overlap' },
      {
        type: 'table',
        head: ['Client region', 'Overlap with Pakistan (UTC+5)'],
        rows: [
          ['UAE, Saudi Arabia, Qatar', 'Most of the working day'],
          ['UK and Europe', 'Pakistan afternoon, client morning'],
          ['North America', 'Pakistan evening, client morning; agree a fixed daily window'],
          ['Australia', 'Pakistan morning, client afternoon'],
        ],
      },
      { type: 'h2', text: 'Contract essentials' },
      {
        type: 'list',
        items: [
          'Scope, exclusions and acceptance criteria for each milestone.',
          'Payment tied to milestones you can test.',
          'Ownership of source code, designs, domains, hosting and app store accounts.',
          'Confidentiality and data-protection terms suited to your country.',
          'How changes are priced and how support is provided after launch.',
        ],
      },
      { type: 'note', text: 'ODOOVATIONS has one office, in Karachi, and serves international clients remotely. It does not have offices abroad and does not claim to.' },
    ],
    faqs: [
      { question: 'Is it safe to outsource to Pakistan?', answer: 'It is as safe as the contract and the team you choose. Own the code and accounts, pay against milestones you can test, and check references.' },
      { question: 'What language is used?', answer: 'English is the working language of the Pakistani software industry for documents, code and meetings.' },
      { question: 'How do payments work?', answer: 'Usually by international bank transfer against milestones, invoiced in an agreed currency.' },
    ],
    relatedServices: [
      { label: 'Custom software', href: '/services/custom-software-development' },
      { label: 'Global delivery', href: '/company/global-delivery' },
    ],
    relatedResources: ['how-to-choose-a-software-company-pakistan', 'custom-software-cost-pakistan'],
  },
  {
    slug: 'what-is-crm-software',
    href: '/resources/what-is-crm-software',
    metaTitle: 'What Is CRM Software? A Plain Guide | ODOOVATIONS',
    metaDescription:
      'CRM software explained: what a CRM does, signs you need one, CRM inside an ERP versus standalone, and connecting it to WhatsApp, your website and ads.',
    h1: 'What Is CRM Software, and When Does a Business Need One?',
    eyebrow: 'Sales systems',
    summary:
      'A CRM (customer relationship management) system keeps every lead, customer, conversation and follow-up in one place, so no enquiry is lost and every salesperson can see the history. A business needs one when leads arrive from several channels (website, WhatsApp, ads, calls), follow-ups are forgotten, or nobody can say which campaign produced which customer. A CRM can be standalone or part of an ERP such as Odoo, where quotes, orders and invoices follow from the same customer record.',
    updated: UPDATED,
    readMinutes: 5,
    primaryKeyword: 'what is CRM software',
    blocks: [
      { type: 'h2', text: 'What a CRM does' },
      {
        type: 'list',
        items: [
          'Captures leads from the website, WhatsApp, ads and calls into one list.',
          'Assigns each lead to an owner with a next step and a date.',
          'Keeps the history of every message, call and quote.',
          'Shows the pipeline: what is likely to close, and when.',
          'Records the source, so marketing spend can be judged by sales, not clicks.',
        ],
      },
      { type: 'h2', text: 'Standalone or inside an ERP?' },
      {
        type: 'table',
        head: ['', 'Standalone CRM', 'CRM inside an ERP'],
        rows: [
          ['Best for', 'Sales-led businesses with simple fulfilment', 'Businesses where the sale turns into stock, delivery and invoice'],
          ['After the sale', 'Needs an integration to accounts and stock', 'Quote, order and invoice follow from the same record'],
        ],
      },
      { type: 'h2', text: 'Making it actually used' },
      {
        type: 'p',
        text: 'A CRM fails when entering data is extra work. Capture leads automatically from forms and WhatsApp, keep required fields few, and make the CRM the place where the next task appears, so using it saves the salesperson time.',
      },
    ],
    faqs: [
      { question: 'Do small businesses need a CRM?', answer: 'Once leads come from more than one channel or more than one person follows up, a simple CRM usually pays for itself in enquiries not lost.' },
      { question: 'Can WhatsApp messages go into a CRM?', answer: 'Yes, through the WhatsApp Business Platform, with the conversation and the lead source recorded against the customer.' },
      { question: 'Does Odoo include a CRM?', answer: 'Yes. Odoo has a CRM module that connects to its sales, invoicing and other modules.' },
    ],
    relatedServices: [
      { label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'WhatsApp automation', href: '/services/whatsapp-automation' },
    ],
    relatedResources: ['what-is-erp-software', 'whatsapp-automation-guide'],
  },
  {
    slug: 'digital-marketing-cost-pakistan',
    href: '/resources/digital-marketing-cost-pakistan',
    metaTitle: 'Digital Marketing Cost in Pakistan: What Drives It',
    metaDescription:
      'What digital marketing costs depend on in Pakistan: ad spend versus management, channels, creative, tracking and CRM. How to judge a proposal by leads, not reach.',
    h1: 'How Much Does Digital Marketing Cost in Pakistan?',
    eyebrow: 'Marketing',
    summary:
      'Digital marketing cost has two parts that are often confused: the advertising spend paid to Meta, Google or other platforms, and the fee for the people who plan, create, run and measure the campaigns. The fee depends on the number of channels and campaigns, how much creative is produced, whether tracking and CRM are set up, and how often you get reports. Judge a proposal by how it will measure qualified enquiries and sales, not by impressions or followers.',
    updated: UPDATED,
    readMinutes: 5,
    primaryKeyword: 'digital marketing cost Pakistan',
    blocks: [
      { type: 'h2', text: 'What you pay for' },
      {
        type: 'table',
        head: ['Part', 'What drives it'],
        rows: [
          ['Ad spend', 'Paid to the platforms; you set it, and it should be shown separately on every proposal'],
          ['Management', 'Number of channels and campaigns, and how often they are tested and adjusted'],
          ['Creative', 'Images, videos and copy needed each month'],
          ['Tracking and CRM', 'Setting up conversion tracking and getting leads into a system with their source'],
          ['Landing pages', 'Pages or WhatsApp entry points built for each campaign'],
        ],
      },
      { type: 'h2', text: 'Questions to ask an agency' },
      {
        type: 'list',
        items: [
          'Is ad spend separate from your fee, and do we own the ad accounts?',
          'How will you know which campaign produced which customer?',
          'What happens to a lead in the first hour?',
          'What will you change if results are poor, and when?',
        ],
      },
      { type: 'note', text: 'We do not sell guaranteed rankings, return figures or lead volumes. Anyone who guarantees them is guessing.' },
    ],
    faqs: [
      { question: 'What budget should I start with?', answer: 'Enough to run a test long enough to learn from, on one channel, with tracking in place. Spreading a small budget across many channels teaches nothing.' },
      { question: 'Should I do SEO or ads?', answer: 'Ads bring traffic while you pay; SEO and AEO build visibility that lasts. Most businesses need ads for now and search for later.' },
      { question: 'Do I own my ad accounts?', answer: 'You should. Insist the accounts are in your business name with the agency added as a user.' },
    ],
    relatedServices: [
      { label: 'Digital marketing', href: '/services/digital-marketing' },
      { label: 'AEO & GEO', href: '/services/aeo-geo-ai-search-optimisation' },
    ],
    relatedResources: ['what-are-aeo-and-geo', 'business-website-cost-pakistan'],
  },
  {
    slug: 'what-is-api-integration',
    href: '/resources/what-is-api-integration',
    metaTitle: 'What Is API Integration? Connecting Systems',
    metaDescription:
      'API integration in plain language: how business systems such as stores, ERPs, accounting, WhatsApp, payments and couriers exchange data, and what to decide before building one.',
    h1: 'What Is API Integration, and Why Do Business Systems Need It?',
    eyebrow: 'Integrations',
    summary:
      'An API (application programming interface) is the door a piece of software offers so other software can read or write its data. An API integration connects two systems through those doors, so an order in an online store can create the invoice in the ERP, update stock and notify the courier without anyone re-typing it. Before building one, decide which system owns each record, which direction data moves, how often, and what happens when one side is unavailable.',
    updated: UPDATED,
    readMinutes: 5,
    primaryKeyword: 'what is API integration',
    blocks: [
      { type: 'h2', text: 'Common business integrations' },
      {
        type: 'list',
        items: [
          'Online store to ERP or accounting: orders, customers, stock and invoices.',
          'Business software to WhatsApp: order confirmations, invoices and reminders.',
          'Payment gateways and banks: payment status and reconciliation.',
          'Couriers: booking, labels and tracking.',
          'Website forms and ads to a CRM: leads with their source.',
        ],
      },
      { type: 'h2', text: 'Decide these before building' },
      {
        type: 'table',
        head: ['Question', 'Why it matters'],
        rows: [
          ['Which system owns each record?', 'Two systems both editing the same data is how duplicates and wrong stock appear'],
          ['One way or both ways?', 'Two-way sync is much harder to get right than one-way'],
          ['Real time or scheduled?', 'Real time needs webhooks or queues; scheduled syncs are simpler'],
          ['What if a side is down?', 'A queue that retries prevents lost orders'],
          ['What does the API allow?', 'The other platform’s API and plan set the limits of what is possible'],
        ],
      },
    ],
    faqs: [
      { question: 'Can any two systems be connected?', answer: 'If both offer an API, usually yes. Old systems without one may need file exports or a different approach.' },
      { question: 'Should I use a ready-made connector?', answer: 'If it does exactly what you need and is maintained, yes. Build custom when your rules do not fit the connector.' },
      { question: 'Who maintains it?', answer: 'Platforms change their APIs, so agree who monitors and updates the integration after launch.' },
    ],
    relatedServices: [
      { label: 'Odoo integration', href: '/services/odoo-integration' },
      { label: 'QuickBooks integrations', href: '/platforms/quickbooks' },
    ],
    relatedResources: ['shopify-vs-woocommerce-pakistan', 'odoo-vs-sap-vs-quickbooks'],
  },
  {
    slug: 'explainer-video-cost',
    href: '/resources/explainer-video-cost',
    metaTitle: 'Explainer Video Cost: What Drives the Price',
    metaDescription:
      'What drives the cost of an explainer, product demo or motion graphics video: length, style, animation, script, voice-over and revisions. How to brief one well.',
    h1: 'How Much Does an Explainer Video Cost?',
    eyebrow: 'Creative',
    summary:
      'An explainer video’s cost is driven by its length, its style (screen recording, motion graphics, character animation or live action), how much animation is needed, whether the script and voice-over are included, and how many revision rounds are allowed. A 60-second motion-graphics explainer of a software product costs very differently from a character-animated story. A clear brief with the audience, the one message and the call to action does more for the result than a bigger budget.',
    updated: UPDATED,
    readMinutes: 4,
    primaryKeyword: 'explainer video cost',
    blocks: [
      { type: 'h2', text: 'What moves the price' },
      {
        type: 'table',
        head: ['Factor', 'Effect'],
        rows: [
          ['Length', 'Every second is designed and animated; shorter is cheaper and usually better'],
          ['Style', 'Screen recordings are quickest; motion graphics more; character animation and live action most'],
          ['Script and voice-over', 'Writing, professional voice and languages add cost'],
          ['Revisions', 'Rounds after animation has started are the most expensive changes'],
          ['Versions', 'Square, vertical and short cut-downs for social channels'],
        ],
      },
      { type: 'h2', text: 'A good brief answers' },
      {
        type: 'list',
        items: [
          'Who watches it, and where (website, ads, sales meetings, WhatsApp)?',
          'The one thing they should understand.',
          'What they should do next.',
          'The brand assets, product screens and examples you like.',
        ],
      },
    ],
    faqs: [
      { question: 'How long should an explainer be?', answer: 'Usually 60 to 90 seconds for a website, shorter for ads and social.' },
      { question: 'Can you show our software in the video?', answer: 'Yes. Software demonstrations and motion graphics built from real product screens are a common request.' },
      { question: 'How long does production take?', answer: 'It depends on length, style and approval speed; script approval before animation saves the most time.' },
    ],
    relatedServices: [
      { label: 'Creative and media', href: '/services/creative-media' },
      { label: 'Content and social', href: '/services/content-social' },
    ],
    relatedResources: ['digital-marketing-cost-pakistan'],
  },
  {
    slug: 'cloud-vs-on-premise-erp',
    href: '/resources/cloud-vs-on-premise-erp',
    metaTitle: 'Cloud vs On-Premise ERP: Which Should You Choose?',
    metaDescription:
      'Cloud or on-premise ERP for a business in Pakistan: cost pattern, internet dependence, security, backups, control and how to decide.',
    h1: 'Cloud vs On-Premise ERP: Which Should You Choose?',
    eyebrow: 'ERP hosting',
    summary:
      'Cloud ERP runs on servers managed by a provider and is reached through the internet; on-premise ERP runs on servers in your own office. Cloud usually costs less to start, needs no server room, and makes backups and remote access easier, but depends on a reliable internet connection. On-premise gives full physical control and works during internet outages, but you are responsible for hardware, power, backups and security. Many businesses choose cloud with a backup internet line.',
    updated: UPDATED,
    readMinutes: 5,
    primaryKeyword: 'cloud vs on-premise ERP',
    blocks: [
      { type: 'h2', text: 'Compared' },
      {
        type: 'table',
        head: ['', 'Cloud', 'On-premise'],
        rows: [
          ['Start-up cost', 'Lower; monthly hosting', 'Server hardware and setup'],
          ['Internet outage', 'Access depends on the connection', 'Office keeps working locally'],
          ['Remote and branch access', 'Built in', 'Needs VPN or extra setup'],
          ['Backups and updates', 'Usually handled by the provider or partner', 'Your responsibility'],
          ['Control', 'Within the provider’s terms', 'Full'],
        ],
      },
      { type: 'h2', text: 'How to decide' },
      {
        type: 'list',
        items: [
          'How reliable is internet at every site that must use the system?',
          'Do branches or staff need access from outside the office?',
          'Who will manage the server, backups and security if it is on-premise?',
          'Are there rules about where your data must be stored?',
        ],
      },
    ],
    faqs: [
      { question: 'Is cloud ERP safe?', answer: 'With a reputable provider, encrypted connections, strong passwords, access rights and tested backups, usually safer than an unmanaged office server.' },
      { question: 'Can Odoo run on-premise?', answer: 'Yes. Odoo can be hosted on your own server, on a cloud server, or on Odoo’s own hosting, depending on the edition and your needs.' },
      { question: 'What about power cuts?', answer: 'On-premise servers need backup power; cloud systems need the office internet and devices to stay up. Plan for both.' },
    ],
    relatedServices: [
      { label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'Odoo support and maintenance', href: '/services/odoo-support-maintenance' },
    ],
    relatedResources: ['what-is-erp-software', 'odoo-community-vs-enterprise'],
  },
];
