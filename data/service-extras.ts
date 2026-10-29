/**
 * SERVICE PAGE EXTRAS
 *
 * What data/services.ts does not carry for each service: a hook written from
 * the buyer's side, who the service is for, what moves the price and the
 * timeline, what it connects to, and the real work that backs it.
 *
 * Kept apart from services.ts so that file stays the description of the service
 * and this one is the buying guidance. Every service has an entry; the build
 * check at the end of this file fails if one is missing.
 *
 * Evidence is stated as it is. Where there is a client project on record it is
 * named; where only a labelled demonstration exists, the page says so; where
 * there is neither, the page says that and does not imply otherwise.
 */
import { services } from './services';

export interface EvidenceItem {
  label: string;
  href?: string;
  /** What kind of thing it is, so a demonstration is never read as a client project. */
  kind: 'client-project' | 'demonstration' | 'none';
}

export interface ServiceExtra {
  hook: string;
  audience: string[];
  priceFactors: string[];
  timelineFactors: string[];
  /** Systems it commonly connects to and what to watch for. */
  connects: string[];
  evidence: EvidenceItem[];
  /** A drawing shown beside the hero text on large screens. */
  visual?: 'one-system';
}

const noClientCaseStudy = (what: string): EvidenceItem => ({
  label: `We do not yet publish a client case study for ${what}.`,
  kind: 'none',
});

export const serviceExtras: Record<string, ServiceExtra> = {
  'odoo-implementation-pakistan': {
    visual: 'one-system',
    hook: 'Sales, stock and accounts, working from the same numbers.',
    audience: [
      'Businesses running on spreadsheets and disconnected tools.',
      'Owners who cannot get one reliable figure for stock, receivables or margin.',
      'Companies outgrowing entry-level accounting or inventory software.',
    ],
    priceFactors: [
      'Which modules you need, and how many users.',
      'How far your process departs from standard Odoo.',
      'Integrations with stores, banks, couriers or other software.',
      'Volume and condition of the data to migrate.',
      'Training and support after go-live.',
    ],
    timelineFactors: ['How available your process owners are during discovery.', 'The size of the first phase.', 'Data readiness and testing time.'],
    connects: ['Online stores, WhatsApp, payment gateways, couriers and banks, covered on the Odoo integration page.', 'Odoo Community and Enterprise differ in features and licence cost, which we explain before you choose.'],
    evidence: [
      { label: 'Demonstration: Odoo for a Textile Manufacturer', href: '/case-studies/textile-manufacturer', kind: 'demonstration' },
      { label: 'Demonstration: Odoo for a Distribution Business', href: '/case-studies/distribution-company', kind: 'demonstration' },
      noClientCaseStudy('an Odoo implementation'),
    ],
  },
  'custom-odoo-development': {
    hook: 'Standard Odoo, bent exactly where your process differs.',
    audience: [
      'Odoo users whose approvals, pricing or reports do not fit the standard behaviour.',
      'Businesses with an industry rule that no standard module covers.',
      'Teams that want to stay upgradeable rather than fork Odoo.',
    ],
    priceFactors: ['The number and complexity of custom modules.', 'How many existing Odoo apps they touch.', 'Reports and forms to build.', 'Testing and documentation depth.', 'Support after delivery.'],
    timelineFactors: ['How clearly the rule is defined at the start.', 'Reviews and sign-off between stages.', 'Your Odoo version and its upgrade plans.'],
    connects: ['Built as Odoo modules in Python, so they run inside your own instance.', 'We keep customisation to what earns its cost, so future Odoo upgrades stay manageable.'],
    evidence: [
      { label: 'Demonstration: Odoo for a Textile Manufacturer', href: '/case-studies/textile-manufacturer', kind: 'demonstration' },
      noClientCaseStudy('a custom Odoo module'),
    ],
  },
  'odoo-integration': {
    hook: 'Make Odoo the centre of your tools instead of one more silo.',
    audience: ['Businesses selling through Shopify, WooCommerce or marketplaces.', 'Teams passing data between Odoo and other systems by hand.', 'Companies that need WhatsApp, payment or courier steps inside the workflow.'],
    priceFactors: ['The number of systems connected.', 'One-way or two-way sync.', 'Quality and limits of the other system’s API.', 'Volume of records and the need for retries and error handling.', 'Monitoring and support.'],
    timelineFactors: ['Access to the other system’s API and test account.', 'Third-party approvals, such as a payment gateway.', 'How many edge cases (returns, partial shipments) must be handled.'],
    connects: ['Shopify and WooCommerce: see the platform pages.', 'WhatsApp Business Platform, payment gateways, couriers and bank feeds, through their documented APIs.', 'Availability depends on the platform, API access and scope, which we confirm before building.'],
    evidence: [
      { label: 'Client project: WhatsApp Digital Connection (software to WhatsApp document delivery)', href: '/case-studies', kind: 'client-project' },
    ],
  },
  'odoo-consulting': {
    hook: 'Know what to build, and in what order, before you spend on it.',
    audience: ['Owners deciding whether Odoo suits them.', 'Teams with a failed or stalled implementation.', 'Businesses choosing between Odoo editions or between Odoo and custom software.'],
    priceFactors: ['The size of the business and number of processes reviewed.', 'Depth of the written output you need.', 'Whether it covers a rescue of an existing system.', 'Time with your team.'],
    timelineFactors: ['Availability of the people who know the process.', 'How much documentation already exists.', 'The decisions you need at the end.'],
    connects: ['Advice is independent of what we build: where a simpler tool fits, we say so.'],
    evidence: [noClientCaseStudy('a consulting engagement')],
  },
  'odoo-support-maintenance': {
    hook: 'A system that somebody owns, long after go-live.',
    audience: ['Businesses running on Odoo without in-house developers.', 'Teams that postponed upgrades and now worry about them.', 'Organisations whose original implementer is no longer available.'],
    priceFactors: ['Number of users and modules.', 'Extent of customisation to look after.', 'Response arrangements you want agreed.', 'Planned upgrades and improvements.'],
    timelineFactors: ['Access to your instance and its history.', 'Backlog of existing issues.', 'Upgrade complexity.'],
    connects: ['Support arrangements and hours are agreed in writing. We do not claim round-the-clock cover.'],
    evidence: [noClientCaseStudy('an Odoo support arrangement')],
  },
  'odoo-training': {
    hook: 'Staff trained on the workflows they actually use.',
    audience: ['Teams going live on Odoo.', 'New starters joining a business already on Odoo.', 'Managers who need reports they can trust and read.'],
    priceFactors: ['Number of people and roles.', 'Modules covered.', 'Language and on-site or remote delivery.', 'Whether reference material is produced.'],
    timelineFactors: ['Go-live date.', 'Staff availability.', 'How stable the configuration is before training starts.'],
    connects: ['Delivered in English or Urdu where needed, on your own configuration and data wherever possible.'],
    evidence: [noClientCaseStudy('Odoo training')],
  },
  'odoo-migration': {
    hook: 'Leave Excel and the old ERP behind without leaving your data.',
    audience: ['Businesses moving from spreadsheets to Odoo.', 'Companies replacing an older ERP.', 'Teams upgrading between Odoo versions.'],
    priceFactors: ['Volume and condition of the source data.', 'Number of data types: customers, items, balances, history.', 'Rules for cleaning and duplicates.', 'How many rehearsals you want.', 'Validation effort by your own team.'],
    timelineFactors: ['How quickly source data is supplied.', 'Number of cleaning rounds.', 'Cut-over date and the rehearsal it needs.'],
    connects: ['We agree exactly what is migrated during the blueprint stage, and validate it with the people who own the data.'],
    evidence: [noClientCaseStudy('a data migration')],
  },
  'odoo-ai-dashboards': {
    hook: 'Questions answered from the numbers Odoo already holds.',
    audience: ['Managers who export to Excel each week to see their numbers.', 'Owners who want one view across branches.', 'Finance teams building the same report every month.'],
    priceFactors: ['Number of dashboards and measures.', 'Data quality inside Odoo.', 'Whether AI-assisted answers are wanted as well as charts.', 'Access rules by role.'],
    timelineFactors: ['Clarity on the questions to answer.', 'Data cleaning before reporting.', 'Review rounds with the people who use it.'],
    connects: ['Built on the data in your Odoo instance. A dashboard is only as reliable as the records beneath it, and we say where they need work.'],
    evidence: [noClientCaseStudy('an Odoo dashboard project')],
  },
  'odoo-business-automation': {
    hook: 'Let the system do the chasing.',
    audience: ['Teams chasing approvals by chat.', 'Finance and sales staff repeating the same entry.', 'Businesses with rules that live in one person’s head.'],
    priceFactors: ['Number of workflows.', 'Approval levels and exceptions.', 'Notifications and channels.', 'Integration with other systems.'],
    timelineFactors: ['How clearly the rules are written down.', 'Sign-off on each workflow.', 'Testing with real exceptions.'],
    connects: ['Automations act inside Odoo, with approval steps where a decision carries risk.'],
    evidence: [noClientCaseStudy('Odoo business automation')],
  },
  'ai-automation': {
    hook: 'Turn repetitive follow-ups into connected workflows.',
    audience: ['Teams repeating the same email, document or data-entry steps.', 'Businesses whose enquiries wait for someone to read them.', 'Operations managers who want a person approving anything risky.'],
    priceFactors: ['Number of workflows and the systems they touch.', 'How many decisions need a person to approve them.', 'Volume of messages or documents.', 'AI model usage costs, which run separately from our fees.', 'Monitoring and support.'],
    timelineFactors: ['Clarity of the current process.', 'Access to the systems involved.', 'Time to test with real examples.'],
    connects: ['Third-party AI models are integrated; we do not claim to have trained our own.', 'Workflows connect to the business system behind them, and sensitive actions keep a human reviewer.'],
    evidence: [
      { label: 'Demonstration: WhatsApp Lead Qualification', href: '/case-studies/whatsapp-lead-automation', kind: 'demonstration' },
      { label: 'Client project: WhatsApp Digital Connection', href: '/case-studies', kind: 'client-project' },
    ],
  },
  'whatsapp-automation': {
    hook: 'Reply where customers already are, with a person approving what matters.',
    audience: ['Businesses that take orders and enquiries on WhatsApp.', 'Sales teams losing leads in an unread inbox.', 'Companies sending invoices and reminders by hand.'],
    priceFactors: ['Message volume and number of conversation flows.', 'Connection to your CRM or ERP.', 'Documents to generate and send.', 'Approval steps for people.', 'WhatsApp and AI provider charges, which are separate from our fees.'],
    timelineFactors: ['WhatsApp Business account set-up and approvals, which we do not control.', 'Clarity of the questions and rules.', 'Testing with real conversations.'],
    connects: ['The WhatsApp Business Platform, your CRM or Odoo, and a document service for invoices and statements.', 'Message templates and sending limits are set by WhatsApp and affect the design.'],
    evidence: [
      { label: 'Client project: WhatsApp Digital Connection', href: '/case-studies', kind: 'client-project' },
      { label: 'Demonstration: WhatsApp Lead Qualification', href: '/case-studies/whatsapp-lead-automation', kind: 'demonstration' },
    ],
  },
  'custom-software-development': {
    hook: 'Software shaped like your business, not the other way round.',
    audience: ['Businesses whose process no off-the-shelf tool fits.', 'Organisations running a specialised operation, such as an election or a tournament.', 'Teams that have outgrown spreadsheets and generic software.'],
    priceFactors: ['The number of user roles and workflows.', 'Reports and integrations.', 'Data migration from what you use now.', 'Hosting and security requirements.', 'Support and further development after launch.'],
    timelineFactors: ['How settled the requirements are.', 'Review and approval speed.', 'Whether the first release is a smaller core.'],
    connects: ['Built as database-backed web applications with role-based access, and connected to your other systems through their APIs where they have one.'],
    evidence: [
      { label: 'Client project: KCCI Election System', href: '/case-studies', kind: 'client-project' },
      { label: 'Client project: Al Jadeed Election System', href: '/case-studies', kind: 'client-project' },
      { label: 'Client project: Scrabble Tournament Timer', href: '/case-studies', kind: 'client-project' },
    ],
  },
  'web-development': {
    hook: 'A website that does a job, not just a page that exists.',
    audience: ['Companies whose site does not bring in enquiries.', 'Teams that need a portal, dashboard or web application.', 'Businesses planning a store or app on the same foundation.'],
    priceFactors: ['Number and type of pages and templates.', 'Custom design versus an adapted theme.', 'Applications, accounts or payments.', 'Content writing and migration.', 'Integrations and languages.'],
    timelineFactors: ['When content and images are ready.', 'Decision speed on design.', 'Complexity of any application behind the site.'],
    connects: ['WordPress, WooCommerce and Shopify have their own pages. Custom builds use the stack on the technology page.', 'Enquiries can feed your CRM, including Odoo.'],
    evidence: [{ label: 'Demonstration: B2B Lead-Generation Website', href: '/case-studies/lead-generation-website', kind: 'demonstration' }, noClientCaseStudy('a website build')],
  },
  'digital-marketing': {
    hook: 'Judge campaigns by enquiries you can trace.',
    audience: ['Businesses spending on ads with no clear view of what came back.', 'Teams whose enquiries are not recorded in one place.', 'Owners who want marketing connected to sales follow-up.'],
    priceFactors: ['Channels and the number of campaigns.', 'Creative production needed.', 'Tracking and CRM set-up.', 'Advertising spend, which is paid to the platforms and not to us.', 'Reporting frequency.'],
    timelineFactors: ['Account access and approvals.', 'Creative turnaround.', 'The time a campaign needs before results mean anything.'],
    connects: ['Campaign enquiries can be recorded in a CRM so leads can be traced to their source. Rankings and results are not guaranteed.'],
    evidence: [{ label: 'Demonstration: Campaign-to-CRM System', href: '/case-studies/campaign-to-crm-system', kind: 'demonstration' }, noClientCaseStudy('a marketing campaign')],
  },
  'aeo-geo-ai-search-optimisation': {
    hook: 'When a buyer asks an AI assistant, be the business it can describe.',
    audience: ['Businesses that AI assistants cannot find or describe correctly.', 'Firms losing AI-answer mentions to competitors.', 'Companies whose website, profiles and listings disagree with each other.'],
    priceFactors: ['Number of pages to rewrite answer-first.', 'State of the site’s structured data and technical health.', 'How many profiles and directories need correcting.', 'How many assistants and questions are tested, and how often.'],
    timelineFactors: ['Access to the site and profiles.', 'Time for search engines and assistants to recrawl.', 'Building reviews and mentions, which takes months.'],
    connects: ['Works alongside SEO and the website itself; content changes can be made on WordPress, custom sites or Odoo websites.', 'No ranking or recommendation by any AI assistant is guaranteed.'],
    evidence: [{ label: 'Applied to odoovations.com in October 2026; results not yet measured.', href: '/llms.txt', kind: 'none' }],
  },
  'creative-media': {
    hook: 'Make the complicated part easy to see.',
    audience: ['Companies whose product or software is hard to explain.', 'Teams needing demonstration videos or explainers.', 'Brands that need consistent visuals across channels.'],
    priceFactors: ['Length and format of each piece.', 'Amount of motion and animation.', 'Script and voice-over needs.', 'Number of revisions.', 'Variants for different channels.'],
    timelineFactors: ['Script and asset approval.', 'Revision rounds.', 'Length and complexity of animation.'],
    connects: ['Produced by video editors, motion graphics specialists and graphic designers. 3D animation is not offered as a verified capability.'],
    evidence: [noClientCaseStudy('a creative project')],
  },
  'content-social': {
    hook: 'Publish steadily, not in bursts.',
    audience: ['Brands that post irregularly or not at all.', 'Teams without time to plan and design content.', 'Businesses wanting one calendar across channels.'],
    priceFactors: ['Channels and posting frequency.', 'Design and video included.', 'Writing volume.', 'Approval process.', 'Reporting.'],
    timelineFactors: ['Brand and approval materials supplied.', 'Approval turnaround.', 'Content planned in advance.'],
    connects: ['Content is planned alongside your website and campaigns so the messages agree.'],
    evidence: [noClientCaseStudy('a content programme')],
  },
};

/** Run by scripts at build time: every service must have an entry. */
export function missingServiceExtras(): string[] {
  return services.filter((s) => !serviceExtras[s.slug]).map((s) => s.slug);
}
