/**
 * Intros for the 23 family hubs and 8 division hubs (master brief, Appendix C). A hub lists the real pages
 * in it with their starting prices; the intro says what the family is for and what it is not.
 */
export const familyIntro: Record<string, { lede: string; boundary: string; existing?: { label: string; href: string }[] }> = {
  F01: { lede: 'Be found, understood and cited in search and AI answers.', boundary: 'No ranking or citation is guaranteed.' },
  F02: { lede: 'Paid campaigns, landing pages and tracking that report qualified enquiries, not just clicks.', boundary: 'Media spend is always separate and stays in your accounts.', existing: [{ label: 'Digital marketing', href: '/services/digital-marketing' }] },
  F03: { lede: 'Social publishing, content, PR and reputation work built on original material and honest feedback.', boundary: 'No fake reviews, bought praise or guaranteed coverage.', existing: [{ label: 'Content and social', href: '/services/content-social' }] },
  F04: { lede: 'Email, SMS and WhatsApp messages people agreed to receive, sent at the right moment and measured.', boundary: 'Platform and message fees are separate; lists are permission-based.' },
  F05: { lede: 'AI that does a named job, with tests, permissions, human approval and a known running cost.', boundary: 'No claim of zero errors; model usage is billed to you.', existing: [{ label: 'AI automation', href: '/services/ai-automation' }, { label: 'Odoo AI agents', href: '/solutions/odoo-ai-agents' }] },
  F06: { lede: 'Workflows and document handling that run between your systems with validation, retries and logs.', boundary: 'Hosting, licences and API usage are separate.', existing: [{ label: 'WhatsApp automation', href: '/services/whatsapp-automation' }] },
  F07: { lede: 'Odoo and ERPNext implemented phase by phase, with reconciled data, training and support.', boundary: 'Independent team; no official or tiered partner status is claimed.', existing: [{ label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' }, { label: 'Custom Odoo development', href: '/services/custom-odoo-development' }, { label: 'Odoo integration', href: '/services/odoo-integration' }, { label: 'Odoo migration', href: '/services/odoo-migration' }, { label: 'Odoo support', href: '/services/odoo-support-maintenance' }, { label: 'Odoo training', href: '/services/odoo-training' }] },
  F08: { lede: 'Microsoft, SAP and NetSuite work that starts with paid discovery and names who delivers what.', boundary: 'No vendor partner status is claimed; full implementations are quoted after discovery.' },
  F09: { lede: 'CRMs set up around how you actually sell, with clean data, routing and reports both teams trust.', boundary: 'CRM licences are separate; no pipeline is guaranteed.' },
  F10: { lede: 'Custom software built around accepted user journeys, with tests and the code handed to you.', boundary: 'Starting fees buy a bounded phase, not a whole platform.', existing: [{ label: 'Custom software development', href: '/services/custom-software-development' }] },
  F11: { lede: 'Testing that produces reproducible defects, honest coverage and a clear release decision.', boundary: 'Automated scans alone do not prove accessibility or security.' },
  F12: { lede: 'Websites and online stores built to take enquiries and orders reliably, then handed over.', boundary: 'Hosting, platform fees and paid plugins are separate; no platform partnership is claimed.', existing: [{ label: 'Web development', href: '/services/web-development' }] },
  F13: { lede: 'Marketplace accounts run with accurate listings and watched account health, in accounts you own.', boundary: 'Eligibility is checked first; reinstatement and sales are not promised.' },
  F14: { lede: 'iOS, Android and cross-platform apps, plus store listings and ongoing maintenance.', boundary: 'Store review time and accounts are outside our control.' },
  F15: { lede: 'Research, interface design and brand identity delivered as editable files and working prototypes.', boundary: 'Two consolidated revision rounds by default; trademark registration is separate.', existing: [{ label: 'Creative and media', href: '/services/creative-media' }] },
  F16: { lede: 'Video, photography and animation planned from a brief, with duration, revisions and rights stated.', boundary: 'Shoots are quoted from the brief; music and voice licences are separate.' },
  F17: { lede: 'Data pipelines, models and dashboards whose numbers trace back to the records behind them.', boundary: 'Missing data is shown as missing; no access controls are bypassed.' },
  F18: { lede: 'Cloud infrastructure, pipelines and operations with tested recovery and stated coverage hours.', boundary: 'Cloud bills are yours; no invented uptime guarantees.' },
  F19: { lede: 'Authorised security reviews with validated findings, evidence and a retest plan.', boundary: 'No accreditation, certification or breach-proof claims; written authorisation first.' },
  F20: { lede: 'IT support, engineering capacity and technical leadership with stated hours and real availability.', boundary: 'Business hours unless wider cover is scoped and staffed.' },
  F21: { lede: 'Customer contact, finance, legal and recruitment process work with SOPs, QA and escalation.', boundary: 'Hours are capacity, not unlimited contacts; professional opinions need qualified people.' },
  F22: { lede: 'Playable prototypes, XR experiences, connected devices and Web3 features, bounded and tested.', boundary: 'Simulations are labelled; no released titles or audited contracts are claimed.' },
  F23: { lede: 'Operational systems for specific industries, starting with paid discovery of your real workflow.', boundary: 'Discovery packages produce a blueprint and estimate, not a finished system.' },
};

export const divisionIntro: Record<string, string> = {
  'Search and growth': 'Get found, run campaigns that bring qualified enquiries, publish useful content and keep customers engaged.',
  'AI and automation': 'Put AI and automation to work on named tasks, with tests, approvals and logs.',
  'ERP and CRM': 'Run operations and sales on systems that fit how you work, implemented in phases with reconciled data.',
  'Software and apps': 'Build and look after custom software, mobile apps and interactive products.',
  'Commerce and marketplaces': 'Sell online through your own store and the marketplaces your buyers use.',
  'Design and media': 'Brand, interface design, video and animation produced to a brief.',
  'Data and cloud': 'Make data trustworthy, infrastructure dependable and systems secure.',
  'Managed operations': 'Ongoing IT, team capacity and back-office work with stated hours and owners.',
};
