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

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Odoo Implementation',
        href: '/services/odoo-implementation-pakistan',
        description: 'End-to-end Odoo setup around your real workflow.',
      },
      {
        label: 'Custom Odoo Development',
        href: '/services/custom-odoo-development',
        description: 'Modules built only where they add measurable value.',
      },
      {
        label: 'Odoo Integration',
        href: '/services/odoo-integration',
        description: 'Connect Odoo with the tools you already use.',
      },
      {
        label: 'Consulting',
        href: '/services/odoo-consulting',
        description: 'Clarify scope, priorities and the right next step.',
      },
      {
        label: 'Support & Maintenance',
        href: '/services/odoo-support-maintenance',
        description: 'Keep your system stable after go-live.',
      },
      {
        label: 'Odoo Migration',
        href: '/services/odoo-migration',
        description: 'Move from Excel or a legacy ERP with clean data.',
      },
      {
        label: 'Business Automation',
        href: '/services/odoo-business-automation',
        description: 'Automate approvals, reordering and routine work.',
      },
      {
        label: 'AI Dashboards',
        href: '/services/odoo-ai-dashboards',
        description: 'Turn operational data into live decisions.',
      },
      {
        label: 'Training',
        href: '/services/odoo-training',
        description: 'Teams learn the system on real workflows.',
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
    ],
  },
  { label: 'Resources', href: '/resources' },
  { label: 'Our Work', href: '/case-studies' },
  { label: 'About', href: '/company/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/company/about' },
    { label: 'Our Methodology', href: '/company/methodology' },
    { label: 'Resources', href: '/resources' },
    { label: 'Our Work', href: '/case-studies' },
  ],
  services: [
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
  ],
  locations: [
    { label: 'Odoo Services in Karachi', href: '/locations/odoo-services-karachi' },
    { label: 'Odoo Services in Pakistan', href: '/locations/odoo-services-pakistan' },
  ],
  solutions: [
    { label: 'FBR Digital Invoicing', href: '/solutions/fbr-digital-invoicing-pakistan' },
    { label: 'Odoo WhatsApp Integration', href: '/solutions/odoo-whatsapp-integration' },
    { label: 'Odoo AI Agents', href: '/solutions/odoo-ai-agents' },
  ],
};
