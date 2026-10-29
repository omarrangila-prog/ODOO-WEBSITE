/**
 * ENQUIRY PATHS
 *
 * The enquiry form opens with "What is this about?". Each answer is a path:
 * it selects the service the enquiry is filed under and asks two or three
 * questions that only matter for that kind of work. A Shopify enquiry is asked
 * what the store should connect to; a QuickBooks enquiry is asked which
 * QuickBooks product and what has to move between systems.
 *
 * Every path is optional context. The visitor can ignore the questions and the
 * form still submits with a name, an email and a description. Answers travel as
 * a small JSON string, and `describePathAnswers()` is the only place that turns
 * them back into text, so the server never trusts a key or a value the path did
 * not offer.
 *
 * Platform paths keep the platform notice: the names are the platforms' own,
 * and ODOOVATIONS is not a partner of any of them. QuickBooks is integration
 * and software work only.
 */

export type QuestionKind = 'choice' | 'multi' | 'text';

export interface PathQuestion {
  id: string;
  label: string;
  kind: QuestionKind;
  /** Options for 'choice' and 'multi'. */
  options?: string[];
  placeholder?: string;
}

export interface EnquiryPath {
  id: string;
  /** Short label on the chooser. */
  label: string;
  /** One line under it. */
  blurb: string;
  /** Service filed under in the enquiry. Must exist in serviceOptions. */
  service: string;
  questions: PathQuestion[];
  /** A sentence shown above the questions where the scope needs stating. */
  scopeNote?: string;
  /** The page that explains this kind of work. */
  learnMore?: { label: string; href: string };
}

export type PathAnswers = Record<string, string | string[]>;

export const enquiryPaths: EnquiryPath[] = [
  {
    id: 'shopify',
    label: 'Shopify',
    blurb: 'A store, fixes, or connecting it to your back office.',
    service: 'Shopify Integration',
    questions: [
      { id: 'need', label: 'What do you need?', kind: 'multi', options: ['New store', 'Fix or improve an existing store', 'Connect to accounting', 'Connect to stock or an ERP', 'Orders and fulfilment automation'] },
      { id: 'connect', label: 'What should it connect to?', kind: 'text', placeholder: 'e.g. QuickBooks, Odoo, a courier, WhatsApp' },
      { id: 'store', label: 'Store address, if it exists', kind: 'text', placeholder: 'your-store.myshopify.com or your domain' },
    ],
    learnMore: { label: 'Shopify development and integration', href: '/platforms/shopify' },
  },
  {
    id: 'woocommerce',
    label: 'WooCommerce',
    blurb: 'A store your team can run, or connecting one you have.',
    service: 'WooCommerce Integration',
    questions: [
      { id: 'need', label: 'What do you need?', kind: 'multi', options: ['New store', 'Speed, fixes or maintenance', 'Connect to accounting', 'Connect to stock or an ERP', 'Payment or courier integration'] },
      { id: 'connect', label: 'What should it connect to?', kind: 'text', placeholder: 'e.g. QuickBooks, Odoo, a payment gateway, a courier' },
      { id: 'site', label: 'Site address, if it exists', kind: 'text', placeholder: 'your domain' },
    ],
    learnMore: { label: 'WooCommerce development and integration', href: '/platforms/woocommerce' },
  },
  {
    id: 'quickbooks',
    label: 'QuickBooks integration',
    blurb: 'Carry orders, invoices and payments into QuickBooks.',
    service: 'QuickBooks Integration',
    scopeNote: 'Integration and software work only. We do not offer bookkeeping, accounting services or tax advice.',
    questions: [
      { id: 'product', label: 'Which QuickBooks do you use?', kind: 'choice', options: ['QuickBooks Online', 'QuickBooks Desktop', 'Not sure'] },
      { id: 'moves', label: 'What has to move into QuickBooks?', kind: 'multi', options: ['Sales orders as invoices', 'Payments', 'Customers', 'Items and stock', 'Something else'] },
      { id: 'source', label: 'Where do those records start today?', kind: 'text', placeholder: 'e.g. Shopify, WooCommerce, Odoo, a custom system, spreadsheets' },
    ],
    learnMore: { label: 'QuickBooks integration', href: '/platforms/quickbooks' },
  },
  {
    id: 'odoo',
    label: 'Odoo & ERP',
    blurb: 'Implementation, custom modules, integration or support.',
    service: 'Odoo / ERP',
    questions: [
      { id: 'stage', label: 'Where are you?', kind: 'choice', options: ['Choosing a system', 'New implementation', 'Improving an existing Odoo', 'Migrating from another system', 'Support for a live system'] },
      { id: 'areas', label: 'Which areas?', kind: 'multi', options: ['Sales and purchase', 'Inventory and warehouse', 'Accounting', 'Manufacturing', 'CRM', 'Integrations'] },
      { id: 'users', label: 'How many people will use it?', kind: 'choice', options: ['Under 10', '10 to 50', '50 to 200', 'More than 200', 'Not sure'] },
    ],
    learnMore: { label: 'Odoo implementation', href: '/services/odoo-implementation-pakistan' },
  },
  {
    id: 'software',
    label: 'Custom software',
    blurb: 'An internal system, portal or application built to order.',
    service: 'Custom Software',
    questions: [
      { id: 'kind', label: 'What kind of system?', kind: 'choice', options: ['Internal business system', 'Customer or member portal', 'Accounting, POS or inventory', 'Integration between systems', 'Not sure yet'] },
      { id: 'users', label: 'Who will use it?', kind: 'text', placeholder: 'e.g. 20 staff in three branches, or members of an association' },
      { id: 'today', label: 'How is it done today?', kind: 'text', placeholder: 'e.g. Excel, paper, an old program' },
    ],
    learnMore: { label: 'Custom software development', href: '/services/custom-software-development' },
  },
  {
    id: 'ai',
    label: 'AI & automation',
    blurb: 'Documents, approvals, WhatsApp and data entry, automated.',
    service: 'AI / Automation',
    questions: [
      { id: 'what', label: 'What would you like automated?', kind: 'multi', options: ['Replies on WhatsApp', 'Documents and invoices', 'Approvals', 'Data entry', 'Reports'] },
      { id: 'where', label: 'Where does the work start?', kind: 'text', placeholder: 'e.g. emails, WhatsApp messages, an ERP' },
    ],
    learnMore: { label: 'AI and automation', href: '/services/ai-automation' },
  },
  {
    id: 'web',
    label: 'Website or app',
    blurb: 'A company site, WordPress, a web application or a mobile app.',
    service: 'Website',
    questions: [
      { id: 'kind', label: 'What do you need?', kind: 'choice', options: ['Company website', 'WordPress site', 'Web application', 'Mobile app', 'Redesign of what I have'] },
      { id: 'site', label: 'Current site, if any', kind: 'text', placeholder: 'your domain' },
    ],
    learnMore: { label: 'Websites and web applications', href: '/services/web-development' },
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Marketing, video, design, or not sure yet. Just describe it.',
    service: 'Something Else',
    questions: [
      { id: 'area', label: 'Which area?', kind: 'choice', options: ['Digital marketing', 'AEO & GEO (AI search)', 'Advertising', 'Video', 'Graphic design', 'Content and social', 'Not sure yet'] },
    ],
  },
];

export function getPath(id: string | null | undefined): EnquiryPath | undefined {
  return enquiryPaths.find((p) => p.id === id);
}

/**
 * Where a link that only carries `?service=` lands. Services that have no path of their own
 * (marketing, video, design) open "Something else" with the matching area already chosen, and
 * a few open their nearest path with the matching answer filled in. The service the link
 * named is still what the enquiry is filed under.
 */
const servicePrefill: Record<string, { path: string; answers?: PathAnswers }> = {
  'AI / Automation': { path: 'ai' },
  'WhatsApp Automation': { path: 'ai', answers: { what: ['Replies on WhatsApp'] } },
  'Custom Software': { path: 'software' },
  'Business System': { path: 'software', answers: { kind: 'Internal business system' } },
  'Odoo / ERP': { path: 'odoo' },
  Website: { path: 'web' },
  'Mobile App': { path: 'web', answers: { kind: 'Mobile app' } },
  'Shopify Integration': { path: 'shopify' },
  'WooCommerce Integration': { path: 'woocommerce' },
  'QuickBooks Integration': { path: 'quickbooks' },
  Marketing: { path: 'other', answers: { area: 'Digital marketing' } },
  'AEO / GEO': { path: 'other', answers: { area: 'AEO & GEO (AI search)' } },
  Advertising: { path: 'other', answers: { area: 'Advertising' } },
  Video: { path: 'other', answers: { area: 'Video' } },
  'Graphic Design': { path: 'other', answers: { area: 'Graphic design' } },
  Content: { path: 'other', answers: { area: 'Content and social' } },
  'Something Else': { path: 'other' },
};

export function pathForService(service: string): { path: EnquiryPath; answers: PathAnswers } | undefined {
  const hit = servicePrefill[service];
  const path = getPath(hit?.path);
  return hit && path ? { path, answers: hit.answers ?? {} } : undefined;
}

const MAX_TEXT = 160;
const plain = (label: string) => label.replace(/\?$/, '');

/**
 * Turns the submitted JSON back into labelled lines, keeping only questions the
 * path actually asks and, for choices, only options it actually offers. Anything
 * else is dropped. Returns [] for an unknown path or unreadable input.
 */
export function describePathAnswers(pathId: string | undefined, raw: string | undefined): string[] {
  const path = getPath(pathId);
  if (!path || !raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return [];
  const answers = parsed as Record<string, unknown>;

  const lines: string[] = [];
  for (const q of path.questions) {
    const v = answers[q.id];
    if (q.kind === 'text') {
      if (typeof v === 'string' && v.trim()) lines.push(`${plain(q.label)}: ${v.trim().slice(0, MAX_TEXT)}`);
    } else if (q.kind === 'choice') {
      if (typeof v === 'string' && q.options?.includes(v)) lines.push(`${plain(q.label)}: ${v}`);
    } else if (Array.isArray(v)) {
      const picked = v.filter((x): x is string => typeof x === 'string' && Boolean(q.options?.includes(x)));
      if (picked.length) lines.push(`${plain(q.label)}: ${picked.join(', ')}`);
    }
  }
  return lines;
}

/** Contact URL for a path: preselects it and records where the visitor came from. */
export function pathHref(pathId: string, from?: string): string {
  const sp = new URLSearchParams({ path: pathId });
  if (from) sp.set('from', from);
  return `/contact?${sp.toString()}#form`;
}
