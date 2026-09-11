import { divisions } from './divisions';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
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
  { label: 'Home', href: '/' },
  {
    label: 'What We Do',
    href: '/services',
    children: divisions.map((d) => ({
      label: d.label,
      href: d.href,
      description: d.summary,
    })),
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      {
        label: 'Accounting Software',
        href: '/solutions/accounting-software',
        description: 'Sales, purchases, expenses, receivables and reports in one place.',
      },
      {
        label: 'Sales & Purchase Software',
        href: '/solutions/sales-purchase-software',
        description: 'Sell, buy, track and report from one connected record.',
      },
      {
        label: 'POS Software',
        href: '/solutions/pos-software',
        description: 'Retail and multi-branch point of sale with central reporting.',
      },
      {
        label: 'Restaurant POS',
        href: '/solutions/restaurant-pos',
        description: 'Orders, kitchen, tables, delivery and food costing.',
      },
      {
        label: 'Inventory Management',
        href: '/solutions/inventory-management',
        description: 'Stock that matches what is physically on the shelf.',
      },
      {
        label: 'Hospital Management',
        href: '/solutions/hospital-management-system',
        description: 'Patients, appointments, billing, pharmacy and records.',
      },
      {
        label: 'Factory Automation',
        href: '/solutions/factory-automation',
        description: 'Production, job cards, quality and shop-floor reporting.',
      },
      {
        label: 'Import / Export Trading',
        href: '/solutions/trading-software',
        description: 'Orders, shipments, documents, currencies and reconciliation.',
      },
      {
        label: 'Reconciliation Software',
        href: '/solutions/reconciliation-software',
        description: 'What matches, what does not, and what still needs action.',
      },
      {
        label: 'Appointment System',
        href: '/solutions/appointment-system',
        description: 'Booking, reminders and no-show control for service businesses.',
      },
      {
        label: 'WhatsApp Automation',
        href: '/services/whatsapp-automation',
        description: 'Instant replies, lead qualification and order updates.',
      },
      {
        label: 'AI Agents',
        href: '/solutions/odoo-ai-agents',
        description: 'Agents that answer, qualify and route using your own data.',
      },
      {
        label: 'FBR Digital Invoicing',
        href: '/solutions/fbr-digital-invoicing-pakistan',
        description: 'Getting invoicing data ready for digital-invoicing rules.',
      },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Textile & Apparel', href: '/industries/textile-apparel' },
      { label: 'Distribution', href: '/industries/distribution' },
      { label: 'Retail & E-commerce', href: '/industries/retail-ecommerce' },
      { label: 'Pharmaceuticals', href: '/industries/pharmaceuticals' },
      { label: 'Construction', href: '/industries/construction' },
      { label: 'Professional Services', href: '/industries/professional-services' },
      { label: 'Food & Hospitality', href: '/industries/food-hospitality' },
      { label: 'Healthcare & Clinics', href: '/industries/healthcare-clinics' },
      { label: 'Logistics & Transport', href: '/industries/logistics-transport' },
      { label: 'Wholesale & Trading', href: '/industries/wholesale-trading' },
      { label: 'Import & Export', href: '/industries/import-export' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Agencies & Media', href: '/industries/agencies-media' },
    ],
  },
  { label: 'Rapid Delivery', href: '/rapid-delivery' },
  { label: 'Our Work', href: '/case-studies' },
  { label: 'Resources', href: '/resources' },
  {
    label: 'Company',
    href: '/company/about',
    children: [
      { label: 'About Us', href: '/company/about', description: 'Who we are and how we work.' },
      { label: 'Our Methodology', href: '/company/methodology', description: 'Discovery to go-live, step by step.' },
      { label: 'Global Delivery', href: '/company/global-delivery', description: 'Built in Pakistan, delivered worldwide.' },
      { label: 'Brand Information', href: '/company/brand', description: 'Official name, logo, contact and boilerplate.' },
    ],
  },
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
    { label: 'Global Delivery', href: '/company/global-delivery' },
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
