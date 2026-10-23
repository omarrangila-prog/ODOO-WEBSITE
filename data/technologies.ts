/**
 * TECHNOLOGY
 *
 * What ODOOVATIONS builds with, and, for every entry, how that is known.
 *
 * A technology is listed only when there is a reason to list it. The reason is
 * recorded in `basis` and printed beside the entry, so the page cannot quietly
 * turn into a keyword list. Adding a language or framework here without a basis
 * is not possible: `basis` is required and `scripts/technology-check.ts` fails
 * on any entry that lacks one.
 *
 * Bases:
 *  - `this-site`   used to build and run odoovations.com, which anyone can inspect.
 *  - `odoo-stack`  part of how Odoo itself is built, so custom Odoo work uses it.
 *  - `department`  a capability the owner reported for a department on the team
 *                  page (data/team.ts). It is an area of work, not a claim that
 *                  every person holds the skill.
 *  - `owner`       a platform capability the owner has confirmed.
 *
 * Mobile frameworks, other backend languages and cloud providers are absent on
 * purpose: nothing verifies them yet. Add an entry, with a basis, when it does
 * (audit/MISSING-ASSETS.md lists what to confirm).
 */
export type TechBasis = 'this-site' | 'odoo-stack' | 'department' | 'owner';

export const basisLabel: Record<TechBasis, string> = {
  'this-site': 'Used to build this website',
  'odoo-stack': 'Part of the Odoo platform',
  department: 'Reported department capability',
  owner: 'Confirmed platform capability',
};

export interface TechItem {
  name: string;
  basis: TechBasis;
  /** What we use it for, in a short phrase. */
  use: string;
}

export interface TechGroup {
  id: string;
  label: string;
  intro: string;
  items: TechItem[];
  /** Printed when a group has nothing verified to list. */
  none?: string;
}

export const techGroups: TechGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    intro: 'What customers see and use in the browser.',
    items: [
      { name: 'React', basis: 'this-site', use: 'Interface components' },
      { name: 'Next.js', basis: 'this-site', use: 'Server-rendered pages, routing and APIs' },
      { name: 'TypeScript', basis: 'this-site', use: 'Typed application code' },
      { name: 'Tailwind CSS', basis: 'this-site', use: 'Styling and design tokens' },
      { name: 'Responsive websites', basis: 'department', use: 'Layouts that work from phones to wide screens' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    intro: 'Where business rules, data and integrations run.',
    items: [
      { name: 'Node.js', basis: 'this-site', use: 'Server code and API routes' },
      { name: 'Python (Odoo modules)', basis: 'odoo-stack', use: 'Custom Odoo logic, reports and integrations' },
      { name: 'API integrations', basis: 'department', use: 'Connecting systems that expose an API' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    intro: 'Phone and tablet applications.',
    items: [],
    none: 'Mobile apps are scoped per project, and the framework is chosen and named in the proposal. No framework is listed here until it has been verified.',
  },
  {
    id: 'data',
    label: 'Databases',
    intro: 'Where the records live.',
    items: [
      { name: 'PostgreSQL', basis: 'odoo-stack', use: 'The database behind Odoo' },
      { name: 'Database-backed applications', basis: 'department', use: 'Custom systems with structured data and reporting' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & automation',
    intro: 'Assistants and workflows, with a person reviewing what matters.',
    items: [
      { name: 'LLM integration', basis: 'department', use: 'Third-party language models inside business workflows' },
      { name: 'AI agents', basis: 'department', use: 'Assistants that answer from your own data' },
      { name: 'WhatsApp Business Platform', basis: 'department', use: 'Automated, human-reviewed conversations' },
      { name: 'Workflow and document automation', basis: 'department', use: 'Approvals, invoices, reminders and data entry' },
    ],
  },
  {
    id: 'erp-commerce',
    label: 'ERP & commerce',
    intro: 'The platforms businesses already run on.',
    items: [
      { name: 'Odoo', basis: 'owner', use: 'Implementation, custom modules, integration, migration' },
      { name: 'Shopify', basis: 'owner', use: 'Store development and integration' },
      { name: 'WooCommerce', basis: 'owner', use: 'Store development and integration' },
      { name: 'WordPress', basis: 'owner', use: 'Websites with editable content' },
      { name: 'QuickBooks', basis: 'owner', use: 'Software integration only; not bookkeeping' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & infrastructure',
    intro: 'Hosting, deployment and keeping systems running.',
    items: [
      { name: 'Vercel', basis: 'this-site', use: 'Hosting and deployment of this website' },
      { name: 'Server configuration and deployment', basis: 'department', use: 'Environments, releases and access management' },
      { name: 'Backup and recovery coordination', basis: 'department', use: 'Backup and restore arrangements agreed with the client' },
    ],
  },
  {
    id: 'qa',
    label: 'Quality assurance',
    intro: 'How a build is checked before it is handed over.',
    items: [
      { name: 'Functional and regression testing', basis: 'department', use: 'Checking that features work and keep working' },
      { name: 'Browser compatibility testing', basis: 'department', use: 'Checking behaviour across browsers' },
      { name: 'Workflow and business-logic review', basis: 'department', use: 'Checking the rules match how the work is done' },
    ],
  },
];

export function allTechItems(): TechItem[] {
  return techGroups.flatMap((g) => g.items);
}
