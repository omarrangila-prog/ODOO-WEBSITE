/**
 * PLATFORMS
 *
 * The third-party platforms ODOOVATIONS builds on and connects to.
 *
 * What this file does and does not say:
 *  - The owner has confirmed Shopify, WooCommerce, WordPress, QuickBooks-related
 *    integration work and Odoo as platform capabilities. Nothing here claims an
 *    official partnership, certification, listing or endorsement from any of
 *    them. `platformNotice` is rendered wherever platform names appear.
 *  - QuickBooks is software and integration work only. It is never bookkeeping,
 *    tax advice or accounting services, and the page says so. The exact supported
 *    scope is still to be confirmed by the owner (audit/MISSING-ASSETS.md), so
 *    the page describes integration work in general terms and defers specifics
 *    to scoping.
 *  - No project evidence is invented. `evidence` states plainly what can be shown.
 *  - Platform wordmarks are set as plain text, not official logos, so nothing
 *    suggests a partnership.
 */

export const platformNotice =
  'Platform names are used only to describe what we build on and connect to. They are trademarks of their owners and do not imply partnership with, certification by or endorsement from them. ODOOVATIONS is an independent development team.';

export type PlatformGroupId = 'erp' | 'commerce' | 'accounting' | 'communications' | 'infrastructure';

export interface PlatformGroup {
  id: PlatformGroupId;
  label: string;
  /** What the visitor is trying to do, in their words. */
  question: string;
}

export const platformGroups: PlatformGroup[] = [
  { id: 'erp', label: 'ERP & operations', question: 'Run sales, stock, purchasing and accounts from one system.' },
  { id: 'commerce', label: 'Commerce', question: 'Sell online and keep the store tied to the business behind it.' },
  { id: 'accounting', label: 'Accounting integrations', question: 'Stop re-entering orders, invoices and payments by hand.' },
  { id: 'communications', label: 'Customer communications', question: 'Reach and answer customers where they already are.' },
  { id: 'infrastructure', label: 'Connections & infrastructure', question: 'Join systems that were never designed to talk to each other.' },
];

/** One item in the homepage platform map and the /platforms hub. */
export interface PlatformEntry {
  id: string;
  name: string;
  group: PlatformGroupId;
  /** What we do with it, in one line. */
  does: string;
  /** Where the visitor goes. A dedicated page where one exists. */
  href: string;
  /** True when href is a dedicated /platforms page rather than an existing service page. */
  dedicated: boolean;
}

export const platformEntries: PlatformEntry[] = [
  { id: 'odoo', name: 'Odoo', group: 'erp', does: 'Implementation, custom modules, integrations, migration and support.', href: '/services/odoo-implementation-pakistan', dedicated: false },
  { id: 'shopify', name: 'Shopify', group: 'commerce', does: 'Store development, and connecting orders, stock and customers to your back office.', href: '/platforms/shopify', dedicated: true },
  { id: 'woocommerce', name: 'WooCommerce', group: 'commerce', does: 'Self-hosted WordPress stores your team can operate, with back-office integration.', href: '/platforms/woocommerce', dedicated: true },
  { id: 'wordpress', name: 'WordPress', group: 'commerce', does: 'Company websites and content sites with an editor your team can use.', href: '/platforms/wordpress', dedicated: true },
  { id: 'quickbooks', name: 'QuickBooks', group: 'accounting', does: 'Software integrations that carry orders, invoices and payments into QuickBooks.', href: '/platforms/quickbooks', dedicated: true },
  { id: 'whatsapp', name: 'WhatsApp Business Platform', group: 'communications', does: 'Automated, human-reviewed customer conversations and document delivery.', href: '/services/whatsapp-automation', dedicated: false },
  { id: 'apis', name: 'Payment, courier and banking APIs', group: 'infrastructure', does: 'Gateways, couriers and bank feeds connected through their documented APIs.', href: '/services/odoo-integration', dedicated: false },
  { id: 'custom-api', name: 'Custom APIs and webhooks', group: 'infrastructure', does: 'Bridges to any system that exposes an accessible API.', href: '/services/custom-software-development', dedicated: false },
];

export interface PlatformPage {
  slug: 'shopify' | 'woocommerce' | 'wordpress' | 'quickbooks';
  href: string;
  name: string;
  group: PlatformGroupId;
  /** Page H1. */
  title: string;
  /** The one-line promise under the H1. */
  hook: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Answer-first paragraph for people skimming and for retrieval. */
  answer: string;
  /** A typical sequence, set as text. Illustrative; the real one is agreed per project. */
  flow: { label: string; steps: string[]; note: string };
  audience: string[];
  problems: string[];
  included: { title: string; body: string }[];
  /** Systems it commonly connects to and what to watch for when it does. */
  integrations: { name: string; note: string }[];
  considerations: string[];
  process: { title: string; body: string }[];
  priceFactors: string[];
  timelineFactors: string[];
  /** Cases where this platform is the wrong choice. Honest guidance converts better than a sales page. */
  notAFit: string[];
  /** Plain statement of what can and cannot be shown today. */
  evidence: string;
  faqs: { question: string; answer: string }[];
  /** Printed under the hero when the page needs a boundary stated (QuickBooks). */
  boundary?: string;
  related: { label: string; href: string }[];
  /** Service preselected in the enquiry form. Must match data/formOptions.ts serviceOptions; data/enquiry-paths.ts maps it to the path whose questions the form then asks. */
  formService: string;
  ctaLabel: string;
}

const independent =
  'ODOOVATIONS is an independent development team. This page does not claim partner status, certification or endorsement from the platform’s owner.';

export const platformPages: PlatformPage[] = [
  {
    slug: 'shopify',
    href: '/platforms/shopify',
    name: 'Shopify',
    group: 'commerce',
    title: 'Shopify Development & Integrations',
    hook: 'Connect your storefront to the business behind every order.',
    metaTitle: 'Shopify Development & Integrations | ODOOVATIONS',
    metaDescription:
      'Shopify store development and back-office integration: orders, stock and customers connected to Odoo or your own software, built by an independent team in Karachi.',
    intro:
      'A Shopify store takes the order. What happens next — stock, invoice, dispatch, follow-up — is where most stores quietly lose time. We build and customise Shopify stores, and connect them to the systems that run the rest of your business.',
    answer:
      'ODOOVATIONS develops Shopify storefronts and integrates them with back-office software such as Odoo or custom systems, so orders, products, stock and customer records move between them without re-typing. The scope, the direction of each sync and what the Shopify plan allows are agreed in writing before building starts.',
    flow: {
      label: 'A typical order, illustrated',
      steps: ['Customer orders in Shopify', 'Order created in the back office', 'Stock reduced', 'Invoice raised', 'Dispatch and tracking sent back'],
      note:
        "Illustrative. Which system owns each step, and what waits for a person's approval, is agreed in the scope.",
    },
    audience: [
      'Brands and retailers selling online who also hold physical stock.',
      'Wholesalers and manufacturers adding a direct-to-customer channel.',
      'Businesses already on Odoo, or planning it, that want the store to feed it.',
      'Sellers whose store has outgrown its theme and its apps.',
    ],
    problems: [
      'Online orders are copied by hand into the system that raises invoices.',
      'The store shows stock that the warehouse no longer has, and oversells.',
      'Couriers are booked and tracking numbers pasted in one order at a time.',
      'Sales reports live in Shopify, finance lives somewhere else, and they disagree.',
      'The theme cannot do what the business needs, and the app list keeps growing.',
    ],
    included: [
      { title: 'Store build and theme customisation', body: 'Design and build to your brand, with the catalogue, collections, navigation and page templates organised around how customers search.' },
      { title: 'Catalogue and data import', body: 'Products, variants, prices and images prepared and loaded from your spreadsheets or existing system, checked before they go live.' },
      { title: 'Checkout, payments and shipping set-up', body: 'Configured for the markets you sell in. Availability of payment and shipping options differs by country, and we confirm it during scoping rather than assume it.' },
      { title: 'Back-office integration', body: 'Orders, products, stock levels and customers connected to Odoo or your own software, in one direction or both depending on what each system should own.' },
      { title: 'Custom features where the store needs them', body: 'An existing app where one fits; custom development where it does not, with the trade-off between recurring app fees and a one-off build explained.' },
      { title: 'Launch, handover and support', body: 'Testing on real order scenarios, a walkthrough for your team, and an agreed support arrangement after launch.' },
    ],
    integrations: [
      { name: 'Odoo', note: 'Orders become sales orders; stock and prices flow back to the store. The SKU is the shared key, so SKU hygiene decides how smooth this is.' },
      { name: 'Custom or legacy software', note: 'Through its API, where one exists. Where it does not, we say so before scoping.' },
      { name: 'Payment gateways', note: 'Depends on what Shopify supports in your country and on the gateway provider.' },
      { name: 'Couriers', note: 'Booking and tracking where the courier offers an API; otherwise a semi-automated hand-off.' },
      { name: 'WhatsApp', note: 'Order confirmations and follow-ups through the WhatsApp Business Platform, with human review for anything unusual.' },
    ],
    considerations: [
      'Shopify applies API rate limits, so integrations queue and retry instead of firing everything at once.',
      'Refunds, returns, partial shipments and cancelled orders are the edge cases that break naive syncs. We design for them first.',
      'Some checkout customisation depends on your Shopify plan. We check this before promising a design.',
      'Multi-location inventory needs a decision about which system is the source of truth for each location.',
      'Every app adds cost and a failure point. We prefer fewer, and we say which ones we would keep.',
    ],
    process: [
      { title: 'Understand', body: 'Your catalogue, channels, markets, back-office and what currently goes wrong between order and delivery.' },
      { title: 'Design', body: 'Store structure and look, the integration map (what moves, which way, what happens on a failure) and a written scope.' },
      { title: 'Build and connect', body: 'Store first, then integrations, with review milestones where you see working screens and not slide decks.' },
      { title: 'Test on real scenarios', body: 'Normal orders, then the awkward ones: refund, partial dispatch, out-of-stock, discount stacking, a failed payment.' },
      { title: 'Launch and support', body: 'A planned go-live, handover for your team and a support arrangement agreed in advance.' },
    ],
    priceFactors: [
      'Number of products and variants, and how clean the source data is.',
      'Custom design versus adapting an existing theme.',
      'Number of integrations and whether each is one-way or two-way.',
      'Custom features or apps beyond the standard store.',
      'Number of markets, currencies and languages.',
      'Migration from an existing store or platform.',
      'The support arrangement after launch.',
    ],
    timelineFactors: [
      'How soon product data and images are ready.',
      'Decision speed on design and scope.',
      'Third-party onboarding that we do not control, such as payment-gateway approval.',
      'Access to the API of the system you want connected.',
    ],
    notAFit: [
      'If you need heavily bespoke business logic at checkout, a custom-built store may serve you better than Shopify.',
      'If you want full ownership of hosting and code, a self-hosted platform such as WooCommerce may fit better.',
      'If you have a handful of products and no back-office system, a simpler setup may be enough and we will say so.',
    ],
    evidence:
      'We do not yet publish a client case study for a Shopify build. If you want to see how we would scope yours, or to speak to the people who would build it, ask and we will arrange it.',
    faqs: [
      { question: 'Can Shopify connect to Odoo?', answer: 'In many cases, yes. Orders, products, stock and customers can be synchronised, in one direction or both. What is possible depends on your Shopify plan, the Odoo setup and what each system should own, which we confirm during scoping.' },
      { question: 'Do I have to use Odoo?', answer: 'No. We connect Shopify to Odoo, to custom software and to other systems that offer an API. If you have no back-office system, we will tell you whether you need one yet.' },
      { question: 'Which payment gateways can you set up?', answer: 'It depends on your country and on what Shopify and the gateway providers support. We check the current options for your market while scoping and do not promise a gateway before confirming it.' },
      { question: 'Are you an official Shopify partner?', answer: independent },
      { question: 'What does it cost?', answer: 'It depends on the factors listed above, and a useful number needs a short conversation about your catalogue and integrations. We quote against a written scope.' },
    ],
    related: [
      { label: 'Odoo integration', href: '/services/odoo-integration' },
      { label: 'WooCommerce', href: '/platforms/woocommerce' },
      { label: 'Websites and web applications', href: '/services/web-development' },
      { label: 'Retail and e-commerce', href: '/industries/retail-ecommerce' },
    ],
    formService: 'Shopify Integration',
    ctaLabel: 'Discuss a Shopify project',
  },

  {
    slug: 'woocommerce',
    href: '/platforms/woocommerce',
    name: 'WooCommerce',
    group: 'commerce',
    title: 'WooCommerce Development & Integrations',
    hook: 'Build a store your team can actually operate.',
    metaTitle: 'WooCommerce Development & Integrations | ODOOVATIONS',
    metaDescription:
      'WooCommerce store development and back-office integration on WordPress: a store you own and your team can run, connected to Odoo or your own software.',
    intro:
      'WooCommerce puts a store on your own WordPress site, with the control and the maintenance that come with that. We build stores that your staff can run day to day, and connect them to the stock, invoicing and fulfilment behind them.',
    answer:
      'ODOOVATIONS develops WooCommerce stores on WordPress and integrates them with back-office systems such as Odoo or custom software. Because the store is self-hosted, hosting, performance, plugin choice and updates are part of the scope, and we set them out in writing up front.',
    flow: {
      label: 'A typical order, illustrated',
      steps: ['Customer orders in the store', 'Order passed to the back office', 'Stock and price updated both ways', 'Invoice raised', 'Status returned to the store'],
      note:
        'Illustrative. Hosting, plugins and the direction of each sync are agreed in the scope.',
    },
    audience: [
      'Businesses that want to own their store, hosting and data.',
      'Teams with an existing WordPress site that now needs to sell.',
      'Retailers and distributors with product rules a hosted platform handles awkwardly.',
      'Businesses whose staff, not developers, will run the store each day.',
    ],
    problems: [
      'The store is slow, and nobody knows whether the cause is hosting, the theme or a plugin.',
      'A plugin update broke checkout and there was no staging site to test it on.',
      'Orders reach the store, and then someone re-keys them into the accounting or stock system.',
      'Staff cannot change prices, stock or banners without calling the developer.',
      'The plugin list has grown until nobody is sure what is safe to remove.',
    ],
    included: [
      { title: 'Store build on WordPress', body: 'Product structure, theme, pages and checkout built to your brand and to the way your customers buy.' },
      { title: 'An editor your team can use', body: 'Products, prices, stock, pages and promotions manageable by staff, with roles that limit who can change what.' },
      { title: 'Plugin selection and custom code', body: 'A short list of plugins we are willing to depend on, and custom code only where a plugin would be a poor fit.' },
      { title: 'Back-office integration', body: 'Orders, products and stock connected to Odoo or your own software through the WooCommerce REST API, with errors surfaced and not swallowed.' },
      { title: 'Performance, security and updates', body: 'Hosting recommendations, caching, backups, a staging copy for testing updates, and an update routine.' },
      { title: 'Launch, training and support', body: 'A walkthrough for the people who will run the store and an agreed support arrangement.' },
    ],
    integrations: [
      { name: 'Odoo', note: 'Orders into sales orders, stock and prices back to the store. Product identifiers must match on both sides.' },
      { name: 'Custom or legacy software', note: 'Through its API where there is one.' },
      { name: 'Payment gateways', note: 'Many gateways provide WooCommerce plugins. Whether one exists for your market and suits your business is confirmed during scoping.' },
      { name: 'Couriers', note: 'Booking and tracking where an API is offered.' },
      { name: 'WhatsApp', note: 'Order updates and follow-ups through the WhatsApp Business Platform.' },
    ],
    considerations: [
      'A self-hosted store is only as fast and as safe as its hosting and its plugins. Both are part of the design.',
      'Plugin updates can conflict. A staging site lets us test them before they reach customers.',
      'A backup is only useful if it can be restored, so the restore process is agreed as well as the schedule.',
      'Large catalogues and heavy traffic need attention to the database and caching from the start.',
      'WooCommerce, WordPress and plugins are released separately, so compatibility is checked before each update.',
    ],
    process: [
      { title: 'Understand', body: 'Catalogue, buying journey, staff who will run it, hosting situation and the systems to connect.' },
      { title: 'Design', body: 'Store structure and look, hosting and plugin plan, integration map, and a written scope.' },
      { title: 'Build and connect', body: 'Store first, then integrations, with milestones where you review working pages.' },
      { title: 'Test', body: 'Ordinary orders, then refunds, partial shipments, stock-outs and payment failures, on a staging copy.' },
      { title: 'Launch and support', body: 'Planned go-live, training for your team and an update and support routine.' },
    ],
    priceFactors: [
      'Catalogue size, product types and variations.',
      'Custom design versus a customised theme.',
      'Number and direction of integrations.',
      'Custom features beyond standard WooCommerce.',
      'Hosting, performance and security requirements.',
      'Languages, currencies and markets.',
      'Migration from another platform.',
      'Ongoing maintenance and support.',
    ],
    timelineFactors: [
      'Readiness of product data and images.',
      'Decisions on design and scope.',
      'Gateway or courier onboarding that sits outside our control.',
      'Hosting set-up and access.',
    ],
    notAFit: [
      'If nobody will look after updates, backups and security, a hosted platform is safer.',
      'If you want the least possible maintenance, Shopify usually asks less of you.',
      'If your store is really a custom application, a bespoke build suits better than plugins.',
    ],
    evidence:
      'We do not yet publish a client case study for a WooCommerce build. Ask and we will walk you through how we would scope and structure yours.',
    faqs: [
      { question: 'WooCommerce or Shopify?', answer: 'WooCommerce gives you more control and more responsibility: hosting, updates and security are yours. Shopify is hosted and asks less of you, with less freedom in places. We will say which we think fits your business and why, including when the answer is neither.' },
      { question: 'Can WooCommerce connect to Odoo?', answer: 'In many cases, yes. Orders, products and stock can be synchronised through the WooCommerce REST API. The direction of each sync and the rules for conflicts are agreed during scoping.' },
      { question: 'Who looks after the store after launch?', answer: 'You can run the day-to-day yourselves, and we can provide ongoing maintenance and support on an agreed basis. Either way, the update and backup routine is set out before launch.' },
      { question: 'Are you an official WooCommerce or WordPress partner?', answer: independent },
      { question: 'What does it cost?', answer: 'It depends on the factors above. We quote against a written scope after a short conversation about your catalogue, hosting and integrations.' },
    ],
    related: [
      { label: 'WordPress development', href: '/platforms/wordpress' },
      { label: 'Shopify', href: '/platforms/shopify' },
      { label: 'Odoo integration', href: '/services/odoo-integration' },
      { label: 'Retail and e-commerce', href: '/industries/retail-ecommerce' },
    ],
    formService: 'WooCommerce Integration',
    ctaLabel: 'Discuss a WooCommerce project',
  },

  {
    slug: 'wordpress',
    href: '/platforms/wordpress',
    name: 'WordPress',
    group: 'commerce',
    title: 'WordPress Development',
    hook: 'A website your team can edit without calling a developer.',
    metaTitle: 'WordPress Development | ODOOVATIONS',
    metaDescription:
      'WordPress website development for companies and content sites: a design built to your brand, an editor your team can use, and honest advice on when WordPress is the wrong tool.',
    intro:
      'WordPress suits websites that people will keep changing: company sites, service pages, blogs and campaign pages. We build them so the people who own the content can edit it, and so the site stays quick and secure after launch.',
    answer:
      'ODOOVATIONS develops WordPress websites with custom or customised themes, structured editing, search-friendly foundations and an agreed maintenance routine. When a project is really a web application with complex logic, we say so and recommend a different approach.',
    flow: {
      label: 'How a change reaches the site',
      steps: ['Editor changes a page', 'Preview on a staging copy', 'Approval', 'Published to the live site', 'Backed up automatically'],
      note:
        'Illustrative. The editing roles and the approval step are set up around your team.',
    },
    audience: [
      'Companies that need a professional site their own staff can update.',
      'Teams publishing articles, resources or case studies regularly.',
      'Organisations that want to own their site rather than rent a builder.',
      'Businesses planning to add a WooCommerce store later.',
    ],
    problems: [
      'Every text change means contacting the agency that built the site.',
      'The site loads slowly, particularly on phones.',
      'Pages look fine on a laptop and badly on a phone.',
      'Updates are never applied because nobody dares break the site.',
      'The site is hard to find in search and nobody knows why.',
    ],
    included: [
      { title: 'Design and theme', body: 'A theme built or customised to your brand, with page templates your team can reuse without breaking the layout.' },
      { title: 'Editing set up for your team', body: 'Structured content types and editable blocks, so a page is edited in clear fields and not rebuilt from scratch.' },
      { title: 'Search-friendly foundations', body: 'Clean headings, page titles and descriptions, sensible URLs, image handling and a sitemap, ready for you to build on.' },
      { title: 'Performance and mobile layout', body: 'Image sizing, caching and a lean set of plugins, checked at phone widths.' },
      { title: 'Security, backups and updates', body: 'Hosting guidance, a backup and restore arrangement, a staging copy and an update routine.' },
      { title: 'Handover and optional maintenance', body: 'Training for the people who will edit the site and an agreed maintenance arrangement if you want one.' },
    ],
    integrations: [
      { name: 'Forms and enquiries', note: 'Enquiries delivered to email, and to a CRM such as Odoo where you use one.' },
      { name: 'WooCommerce', note: 'If the site will later sell products, we plan the structure for it now.' },
      { name: 'Analytics and consent', note: 'Set up so measurement respects visitor consent. No personal data in event tracking.' },
      { name: 'WhatsApp', note: 'A click-to-chat link or an automated conversation, depending on the need.' },
      { name: 'Languages', note: 'Multilingual sites are possible. Translations have to be written and reviewed by people, and we plan for that.' },
    ],
    considerations: [
      'Every plugin is code someone must keep updated. We keep the list short.',
      'Page builders speed up editing and can slow the site down, so the choice is deliberate.',
      'Hosting quality changes speed and reliability more than most people expect.',
      'Accessibility and mobile layout are designed in, not added at the end.',
      'Search visibility depends on content and competition as well as the technical foundations. We build the foundations; we cannot guarantee rankings.',
    ],
    process: [
      { title: 'Understand', body: 'Who the site is for, what you want visitors to do, who will edit it and what already exists.' },
      { title: 'Design', body: 'Structure, page templates and visual direction, reviewed with you before building.' },
      { title: 'Build', body: 'Theme, content types, pages and forms, reviewed at milestones on a staging site.' },
      { title: 'Test', body: 'Phones, tablets and desktops, forms, speed, accessibility and the editing experience.' },
      { title: 'Launch and handover', body: 'A planned go-live, training and an agreed maintenance and update routine.' },
    ],
    priceFactors: [
      'Number and complexity of page templates.',
      'Custom design versus a customised theme.',
      'Amount of content to write, migrate or restructure.',
      'Integrations such as CRM, WhatsApp or a store.',
      'Languages.',
      'Hosting and security requirements.',
      'Ongoing maintenance.',
    ],
    timelineFactors: [
      'When content and images are ready.',
      'How quickly design and copy are approved.',
      'Number of review rounds.',
      'Access to domain, hosting and existing accounts.',
    ],
    notAFit: [
      'If the site is really an application with accounts, workflows and complex logic, a custom build is a better foundation.',
      'If nobody will maintain it, a simpler static site or a hosted builder may be safer.',
      'If you need a very small one-page site, a lighter approach may do and we will say so.',
    ],
    evidence:
      'We do not yet publish a client case study for a WordPress build. Ask and we will discuss how we would approach yours.',
    faqs: [
      { question: 'Can we edit the site ourselves?', answer: 'Yes. That is the main reason to choose WordPress. We set up editing around the content you actually change and train the people who will do it.' },
      { question: 'Will the site rank in search?', answer: 'We build the technical foundations that let search engines read the site. Rankings depend on your content, your competition and time, and we do not guarantee positions.' },
      { question: 'Can you improve or rescue an existing WordPress site?', answer: 'Often, yes. We start with an audit of speed, security, plugins and structure, and tell you whether to fix or rebuild before you commit.' },
      { question: 'Do you also build sites that are not on WordPress?', answer: 'Yes. We build custom websites and web applications too, and recommend the approach that fits the project. See our websites and web applications service.' },
      { question: 'Are you an official WordPress partner?', answer: independent },
    ],
    related: [
      { label: 'Websites and web applications', href: '/services/web-development' },
      { label: 'WooCommerce', href: '/platforms/woocommerce' },
      { label: 'Content and social media', href: '/services/content-social' },
      { label: 'Digital marketing', href: '/services/digital-marketing' },
    ],
    formService: 'Website',
    ctaLabel: 'Discuss a WordPress project',
  },

  {
    slug: 'quickbooks',
    href: '/platforms/quickbooks',
    name: 'QuickBooks',
    group: 'accounting',
    title: 'QuickBooks Integrations',
    hook: 'Connect orders, invoices and payments without repeated entry.',
    metaTitle: 'QuickBooks Integrations | ODOOVATIONS',
    metaDescription:
      'Software integrations that carry orders, invoices and payments from your store, ERP or custom software into QuickBooks. Integration work only: not bookkeeping or tax advice.',
    intro:
      'If sales happen in one system and your books live in QuickBooks, somebody is typing the same numbers twice. We build the connection between your sales systems and QuickBooks, so the data arrives once, correctly, and mismatches are flagged instead of buried.',
    answer:
      'ODOOVATIONS builds software integrations between QuickBooks and the systems where sales and operations happen, such as an online store, Odoo or custom software. This is integration engineering only. We do not keep books, give tax advice or prepare returns, and decisions about accounts and tax treatment stay with your accountant.',
    boundary:
      'What this is not: ODOOVATIONS does not provide bookkeeping, tax advice, tax filing or outsourced accounting, and does not set up your chart of accounts or tax treatment. Those decisions belong to you and your accountant. We build the software that carries your data to QuickBooks.',
    flow: {
      label: 'How a sale reaches your books',
      steps: ['Sale recorded in the store or ERP', 'Mapped to your items, tax codes and accounts', 'Sent to QuickBooks', 'Failures held in a queue for review', 'Differences listed in a reconciliation view'],
      note:
        'Illustrative. Your accountant approves the mapping, and the integration is tested on a test company first.',
    },
    audience: [
      'Businesses that sell through a store, an ERP or their own software and record the books in QuickBooks.',
      'Teams re-entering invoices, receipts or payments by hand.',
      'Finance staff who spend month-end finding why two systems disagree.',
      'Developers and accountants who need a reliable data feed, not another spreadsheet.',
    ],
    problems: [
      'Invoices are created twice: once where the sale happens and once in QuickBooks.',
      'Payments received in one place are not marked as paid in the other.',
      'Customer and product lists drift apart and produce duplicates.',
      'Tax, rounding and currency differences surface only at month-end.',
      'Nobody can say which system is right when the totals do not match.',
    ],
    included: [
      { title: 'Integration design', body: 'A written map of what moves, in which direction, how often, and which system owns each piece of data.' },
      { title: 'Sales documents into QuickBooks', body: 'Customers, items, invoices or sales receipts and their payment status carried across from the source system, using the structure your accountant has set up.' },
      { title: 'Mapping tables', body: 'Your products, tax codes, payment methods and accounts mapped explicitly, agreed with your accountant, and visible rather than hidden in code.' },
      { title: 'Error queue and mismatch reports', body: 'Anything that fails to sync is held, shown and retryable. A reconciliation view lists differences between the two systems.' },
      { title: 'Testing with your accountant', body: 'Sample transactions checked on a test company file before anything touches live data.' },
      { title: 'Handover and support', body: 'Documentation of what the integration does and an agreed support arrangement.' },
    ],
    integrations: [
      { name: 'Online stores', note: 'Shopify or WooCommerce orders and payments carried into QuickBooks.' },
      { name: 'Odoo', note: 'Where Odoo handles sales and operations and QuickBooks remains the book of record.' },
      { name: 'Custom software', note: 'Through the API of your own system, where it has one.' },
      { name: 'Payment platforms', note: 'Payout and fee data matched to invoices, where the provider exposes it.' },
    ],
    considerations: [
      'What is possible depends on your QuickBooks product and edition, your region and the API access available to you. We confirm this before scoping.',
      'Tax set-up differs by country and must be decided by your accountant. We map to it; we do not decide it.',
      'Rounding, multi-currency and discounts are the usual sources of small differences, and we design for them first.',
      'Each sync must be safe to repeat, so a retry never creates a duplicate invoice.',
      'We use test data and a test company before any live transaction.',
    ],
    process: [
      { title: 'Understand', body: 'How sales are recorded today, where QuickBooks sits, which edition and region, and what your accountant requires.' },
      { title: 'Design', body: 'The data map and sync rules, agreed in writing with you and your accountant.' },
      { title: 'Build and validate', body: 'The integration on a test company, with sample transactions checked line by line.' },
      { title: 'Parallel run', body: 'A period where results are compared against your current process before you rely on it.' },
      { title: 'Go-live and support', body: 'A planned switch-over, documentation and an agreed support arrangement.' },
    ],
    priceFactors: [
      'The systems being connected and the quality of their APIs.',
      'Number of document types: invoices, receipts, credit notes, payments, customers, items.',
      'One-way or two-way sync.',
      'Tax, currency and discount complexity.',
      'Volume of transactions, and whether historical data is involved.',
      'Reporting and reconciliation requirements.',
      'Support arrangement.',
    ],
    timelineFactors: [
      'How quickly your accountant can confirm the mapping.',
      'Access to a test company file and API credentials.',
      'Condition of the data being connected.',
      'Length of the parallel run you want.',
    ],
    notAFit: [
      'If you want someone to do your bookkeeping or file your taxes, you need an accounting firm. We are not one.',
      'If you are choosing accounting software from scratch, we can advise on integration, but the accounting choice belongs with your accountant.',
      'If your volume is a few transactions a month, manual entry or an off-the-shelf connector may cost less.',
    ],
    evidence:
      'We do not yet publish a client case study for a QuickBooks integration, and the exact range of QuickBooks products we support is confirmed per project. Ask us and we will tell you plainly whether your set-up is something we can take on.',
    faqs: [
      { question: 'Do you offer bookkeeping or accounting services?', answer: 'No. We build software. Keeping the books, tax advice and tax filing are accountants’ work, and we do not do them.' },
      { question: 'Which QuickBooks products do you support?', answer: 'It depends on the edition, your region and the API access available, so we confirm it before scoping rather than promise it here.' },
      { question: 'Can this replace my accountant’s review?', answer: 'No, and it should not. The integration moves data accurately and flags mismatches. Your accountant still decides what is correct.' },
      { question: 'Is it safe to connect to live accounts?', answer: 'We build and test against a test company first, run in parallel with your current process, and go live only when you are satisfied with the comparison.' },
      { question: 'Are you affiliated with Intuit or QuickBooks?', answer: independent },
    ],
    related: [
      { label: 'Odoo accounting software', href: '/solutions/accounting-software' },
      { label: 'Odoo integration', href: '/services/odoo-integration' },
      { label: 'Shopify', href: '/platforms/shopify' },
      { label: 'Custom software', href: '/services/custom-software-development' },
    ],
    formService: 'QuickBooks Integration',
    ctaLabel: 'Discuss a QuickBooks integration',
  },
];

export function getPlatformPage(slug: string): PlatformPage | undefined {
  return platformPages.find((p) => p.slug === slug);
}
