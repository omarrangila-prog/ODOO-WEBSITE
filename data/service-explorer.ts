/**
 * SERVICE EXPLORER
 *
 * The homepage's way into the whole service catalogue: five groups, each with
 * compact cards. Every card points at a page that exists and describes work the
 * company has confirmed it does. Nothing here introduces a new capability; the
 * detail stays on the service, solution and platform pages.
 *
 * `visual` selects one of the small illustrations in
 * components/home/MicroVisual.tsx. They are decoration that hints at the kind of
 * system, not screenshots of any client's.
 */

export type VisualKind =
  | 'modules'
  | 'ledger'
  | 'stock'
  | 'receipt'
  | 'route'
  | 'sync'
  | 'apps'
  | 'blocks'
  | 'migrate'
  | 'support'
  | 'workflow'
  | 'chat'
  | 'agent'
  | 'approval'
  | 'browser'
  | 'cart'
  | 'store'
  | 'editor'
  | 'growth'
  | 'film'
  | 'calendar';

export interface ExplorerCard {
  title: string;
  /** The customer's problem, in their words. */
  problem: string;
  /** What we build or do about it. */
  does: string;
  href: string;
  visual: VisualKind;
}

export interface ExplorerGroup {
  id: string;
  label: string;
  /** One line under the tab, for the panel header. */
  line: string;
  /** Where "see everything in this group" goes. */
  href: string;
  cards: ExplorerCard[];
}

export const explorerGroups: ExplorerGroup[] = [
  {
    id: 'software',
    label: 'Software & business systems',
    line: 'Systems built around how your business runs, not the other way round.',
    href: '/services/custom-software-development',
    cards: [
      { title: 'Custom software', problem: 'No off-the-shelf tool fits your process.', does: 'Business applications with workflows, dashboards, portals and role-based access.', href: '/services/custom-software-development', visual: 'modules' },
      { title: 'Accounting software', problem: 'Books, invoices and reports that disagree.', does: 'Ledgers, invoicing, reconciliation and reporting that draw on the same entries.', href: '/solutions/accounting-software', visual: 'ledger' },
      { title: 'Inventory & warehouse', problem: 'Stock records that never match the shelf.', does: 'Stock movement, warehouses, reorder rules and counts in one record.', href: '/solutions/inventory-management', visual: 'stock' },
      { title: 'POS & retail', problem: 'Branches selling from different numbers.', does: 'Counter, restaurant and multi-branch point of sale tied to stock and accounts.', href: '/solutions/pos-software', visual: 'receipt' },
      { title: 'Import / export & trading', problem: 'Contracts, shipments and costs scattered across files.', does: 'Contracts, documents, containers and landed cost kept together.', href: '/solutions/trading-software', visual: 'route' },
      { title: 'QuickBooks integrations', problem: 'The same invoice typed twice.', does: 'Orders, invoices and payments carried into QuickBooks. Integration only, not bookkeeping.', href: '/platforms/quickbooks', visual: 'sync' },
    ],
  },
  {
    id: 'odoo',
    label: 'Odoo & ERP',
    line: 'Sales, stock and accounts working from the same numbers.',
    href: '/services/odoo-implementation-pakistan',
    cards: [
      { title: 'Odoo implementation', problem: 'Departments keep their own version of the truth.', does: 'Modules chosen and configured around your workflow, with data migration and training.', href: '/services/odoo-implementation-pakistan', visual: 'apps' },
      { title: 'Custom Odoo modules', problem: 'Standard Odoo almost fits.', does: 'Approval flows, pricing rules, reports and forms built to match your process.', href: '/services/custom-odoo-development', visual: 'blocks' },
      { title: 'Odoo integration', problem: 'Odoo and your other systems do not talk.', does: 'Stores, WhatsApp, payments, couriers, banks and custom APIs connected.', href: '/services/odoo-integration', visual: 'sync' },
      { title: 'Migration & upgrades', problem: 'Data stuck in Excel or an old ERP.', does: 'Data prepared, cleaned and validated before go-live.', href: '/services/odoo-migration', visual: 'migrate' },
      { title: 'Support & training', problem: 'Nobody owns the system after launch.', does: 'Issue resolution, safe upgrades and training on your real workflows.', href: '/services/odoo-support-maintenance', visual: 'support' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & automation',
    line: 'Repetitive follow-ups turned into connected workflows, with people approving what matters.',
    href: '/services/ai-automation',
    cards: [
      { title: 'AI automation', problem: 'The same manual steps, every day.', does: 'Document, approval, email and data-entry workflows connected to your systems.', href: '/services/ai-automation', visual: 'workflow' },
      { title: 'WhatsApp automation', problem: 'Enquiries wait for someone to see them.', does: 'Automated replies and qualification on WhatsApp, handed to a person for decisions.', href: '/services/whatsapp-automation', visual: 'chat' },
      { title: 'AI agents', problem: 'Staff answer the same questions repeatedly.', does: 'Assistants that answer from your own data and act inside your system within set limits.', href: '/solutions/odoo-ai-agents', visual: 'agent' },
      { title: 'Business automation', problem: 'Approvals chase people through chat.', does: 'Rules, reminders and approval chains built into the system.', href: '/services/odoo-business-automation', visual: 'approval' },
    ],
  },
  {
    id: 'web',
    label: 'Websites, apps & e-commerce',
    line: 'Storefronts and sites connected to the business behind them.',
    href: '/services/web-development',
    cards: [
      { title: 'Websites, web & mobile apps', problem: 'A site or app that does not do the job.', does: 'Corporate sites, portals, dashboards, web applications and mobile apps.', href: '/services/web-development', visual: 'browser' },
      { title: 'Shopify', problem: 'Orders are re-typed behind the store.', does: 'Store development and integration with stock, invoicing and fulfilment.', href: '/platforms/shopify', visual: 'cart' },
      { title: 'WooCommerce', problem: 'A store only the developer can run.', does: 'Self-hosted stores your team can operate, connected to the back office.', href: '/platforms/woocommerce', visual: 'store' },
      { title: 'WordPress', problem: 'Every text change needs a developer.', does: 'Company and content sites with an editor your team can use.', href: '/platforms/wordpress', visual: 'editor' },
    ],
  },
  {
    id: 'creative',
    label: 'Marketing & creative',
    line: 'Campaigns, content and video planned alongside the systems they feed.',
    href: '/services/digital-marketing',
    cards: [
      { title: 'Digital marketing', problem: 'Spend with no way to see what came back.', does: 'Campaigns and advertising connected to your CRM so enquiries can be traced.', href: '/services/digital-marketing', visual: 'growth' },
      { title: 'Creative & motion', problem: 'A product that is hard to explain.', does: 'Explainers, software demonstrations, motion graphics and brand visuals.', href: '/services/creative-media', visual: 'film' },
      { title: 'Content & social', problem: 'No time to post, nothing to say.', does: 'Content planning, design and publishing support.', href: '/services/content-social', visual: 'calendar' },
    ],
  },
];
