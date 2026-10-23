import { divisions } from './divisions';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  /** Heading this link is listed under in a grouped (mega) dropdown. */
  group?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  /** Path prefixes that mark this item active. Defaults to its own href. */
  match?: string[];
}

/**
 * Primary navigation.
 *
 * Structured around the seven capability divisions rather than a flat list of
 * every service — the full capability list lives on the hub pages, not in the
 * menu. Odoo keeps its own entry because it carries the site's existing search
 * equity, but it sits alongside the other divisions rather than above them.
 */
export const primaryNav: NavItem[] = [
  {
    label: 'Studio',
    href: '/company/about',
    match: ['/company/about', '/company/methodology', '/company/global-delivery', '/company/clients', '/company/pricing', '/company/brand', '/rapid-delivery', '/resources', '/faq'],
    children: [
      { label: 'About ODOOVATIONS', href: '/company/about', description: 'Who we are and how we work.' },
      { label: 'Our Methodology', href: '/company/methodology', description: 'Discovery to go-live, step by step.' },
      { label: 'Rapid Delivery', href: '/rapid-delivery', description: 'A fast first version, then iterate.' },
      { label: 'Global Delivery', href: '/company/global-delivery', description: 'Built in Pakistan, delivered worldwide.' },
      { label: 'Selected Clients', href: '/company/clients', description: 'Businesses the group has worked with.' },
      { label: 'How We Price', href: '/company/pricing', description: 'Scope-based pricing and engagement models.' },
      { label: 'Resources', href: '/resources', description: 'Guides written from real projects.' },
      { label: 'FAQ', href: '/faq', description: 'Straight answers to common questions.' },
      { label: 'Brand Information', href: '/company/brand', description: 'Official name, logo, contact and boilerplate.' },
    ],
  },
  {
    label: 'Expertise',
    href: '/services',
    match: ['/services', '/solutions', '/industries', '/locations'],
    children: [
      ...divisions.map((d) => ({ label: d.label, href: d.href, description: d.summary, group: 'Capabilities' })),
      { label: 'All solutions', href: '/solutions', group: 'Solutions' },
      { label: 'Accounting Software', href: '/solutions/accounting-software', group: 'Solutions' },
      { label: 'POS Software', href: '/solutions/pos-software', group: 'Solutions' },
      { label: 'Inventory Management', href: '/solutions/inventory-management', group: 'Solutions' },
      { label: 'Factory Automation', href: '/solutions/factory-automation', group: 'Solutions' },
      { label: 'AI Agents', href: '/solutions/odoo-ai-agents', group: 'Solutions' },
      { label: 'FBR Digital Invoicing', href: '/solutions/fbr-digital-invoicing-pakistan', group: 'Solutions' },
      { label: 'All industries', href: '/industries', group: 'Industries' },
      { label: 'Manufacturing', href: '/industries/manufacturing', group: 'Industries' },
      { label: 'Distribution', href: '/industries/distribution', group: 'Industries' },
      { label: 'Retail & E-commerce', href: '/industries/retail-ecommerce', group: 'Industries' },
      { label: 'Healthcare & Clinics', href: '/industries/healthcare-clinics', group: 'Industries' },
      { label: 'Logistics & Transport', href: '/industries/logistics-transport', group: 'Industries' },
      { label: 'Import & Export', href: '/industries/import-export', group: 'Industries' },
    ],
  },
  { label: 'Work', href: '/case-studies', match: ['/case-studies', '/projects'] },
  { label: 'Team', href: '/company/team' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  capabilities: divisions.map((d) => ({ label: d.label, href: d.href })),
  solutions: [
    { label: 'Accounting Software', href: '/solutions/accounting-software' },
    { label: 'Sales & Purchase Software', href: '/solutions/sales-purchase-software' },
    { label: 'POS Software', href: '/solutions/pos-software' },
    { label: 'Restaurant POS', href: '/solutions/restaurant-pos' },
    { label: 'Trading Software', href: '/solutions/trading-software' },
    { label: 'Reconciliation Software', href: '/solutions/reconciliation-software' },
    { label: 'Inventory Management', href: '/solutions/inventory-management' },
    { label: 'Hospital Management', href: '/solutions/hospital-management-system' },
    { label: 'Factory Automation', href: '/solutions/factory-automation' },
    { label: 'FBR Digital Invoicing', href: '/solutions/fbr-digital-invoicing-pakistan' },
    { label: 'AI Agents', href: '/solutions/odoo-ai-agents' },
  ],
  odoo: [
    { label: 'Odoo Implementation', href: '/services/odoo-implementation-pakistan' },
    { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
    { label: 'Odoo Integration', href: '/services/odoo-integration' },
    { label: 'Odoo Migration', href: '/services/odoo-migration' },
    { label: 'Business Automation', href: '/services/odoo-business-automation' },
    { label: 'Support & Maintenance', href: '/services/odoo-support-maintenance' },
  ],
  industries: [
    { label: 'Manufacturing', href: '/industries/manufacturing' },
    { label: 'Textile', href: '/industries/textile-apparel' },
    { label: 'Distribution', href: '/industries/distribution' },
    { label: 'Retail', href: '/industries/retail-ecommerce' },
    { label: 'Pharmaceuticals', href: '/industries/pharmaceuticals' },
    { label: 'Construction', href: '/industries/construction' },
    { label: 'Healthcare & Clinics', href: '/industries/healthcare-clinics' },
    { label: 'Logistics & Transport', href: '/industries/logistics-transport' },
    { label: 'Wholesale & Trading', href: '/industries/wholesale-trading' },
    { label: 'Import & Export', href: '/industries/import-export' },
    { label: 'Education', href: '/industries/education' },
  ],
  company: [
    { label: 'About Us', href: '/company/about' },
    { label: 'Our Methodology', href: '/company/methodology' },
    { label: 'Our Team', href: '/company/team' },
    { label: 'Global Delivery', href: '/company/global-delivery' },
    { label: 'Selected Clients', href: '/company/clients' },
    { label: 'How We Price', href: '/company/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Rapid Delivery', href: '/rapid-delivery' },
    { label: 'Brand Information', href: '/company/brand' },
    { label: 'Resources', href: '/resources' },
    { label: 'Our Work', href: '/case-studies' },
  ],
  locations: [
    { label: 'Odoo Services in Karachi', href: '/locations/odoo-services-karachi' },
    { label: 'Odoo Services in Pakistan', href: '/locations/odoo-services-pakistan' },
    { label: 'Software & AI in Pakistan', href: '/locations/software-ai-automation-pakistan' },
  ],
};

/** Group a flat child list under its `group` headings, preserving order. */
export function groupChildren(children: NavChild[]): { heading: string | null; items: NavChild[] }[] {
  const out: { heading: string | null; items: NavChild[] }[] = [];
  for (const c of children) {
    const heading = c.group ?? null;
    const last = out[out.length - 1];
    if (last && last.heading === heading) last.items.push(c);
    else out.push({ heading, items: [c] });
  }
  return out;
}
