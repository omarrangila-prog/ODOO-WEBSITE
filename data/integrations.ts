export interface Integration {
  name: string;
  category: string;
  use: string;
  dataExchanged: string;
  direction: 'One-way' | 'Two-way';
  type: 'Standard' | 'Custom';
}

/**
 * Integration availability depends on the platform, API access, business
 * requirements and implementation scope. "Standard" means a common, well-worn
 * connector path; "Custom" means we build a bridge for it.
 */
export const integrations: Integration[] = [
  {
    name: 'Shopify',
    category: 'E-commerce',
    use: 'Sync online orders, products and stock.',
    dataExchanged: 'Orders, products, inventory, customers',
    direction: 'Two-way',
    type: 'Standard',
  },
  {
    name: 'WooCommerce',
    category: 'E-commerce',
    use: 'Keep your WordPress store aligned with Odoo.',
    dataExchanged: 'Orders, products, inventory',
    direction: 'Two-way',
    type: 'Standard',
  },
  {
    name: 'WhatsApp',
    category: 'Messaging',
    use: 'Notifications and order/enquiry capture.',
    dataExchanged: 'Messages, order confirmations',
    direction: 'Two-way',
    type: 'Custom',
  },
  {
    name: 'Payment Gateways',
    category: 'Payments',
    use: 'Reconcile online and card payments.',
    dataExchanged: 'Payments, statuses, refunds',
    direction: 'Two-way',
    type: 'Standard',
  },
  {
    name: 'Courier Services',
    category: 'Logistics',
    use: 'Automate booking and tracking updates.',
    dataExchanged: 'Shipments, tracking, statuses',
    direction: 'Two-way',
    type: 'Custom',
  },
  {
    name: 'Banking Systems',
    category: 'Finance',
    use: 'Import statements for faster reconciliation.',
    dataExchanged: 'Statements, transactions',
    direction: 'One-way',
    type: 'Custom',
  },
  {
    name: 'Biometric Devices',
    category: 'HR',
    use: 'Feed attendance directly into payroll.',
    dataExchanged: 'Attendance punches',
    direction: 'One-way',
    type: 'Custom',
  },
  {
    name: 'Mobile Applications',
    category: 'Field Ops',
    use: 'Field data capture and approvals on the go.',
    dataExchanged: 'Orders, tasks, approvals',
    direction: 'Two-way',
    type: 'Custom',
  },
  {
    name: 'External APIs',
    category: 'Custom',
    use: 'Connect any system with an accessible API.',
    dataExchanged: 'Varies by system',
    direction: 'Two-way',
    type: 'Custom',
  },
  {
    name: 'Existing Business Systems',
    category: 'Legacy',
    use: 'Bridge legacy tools during transition.',
    dataExchanged: 'Master data, transactions',
    direction: 'Two-way',
    type: 'Custom',
  },
];
