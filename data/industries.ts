export interface Industry {
  slug: string;
  href: string;
  name: string; // title_below_image from manifest
  image: string; // /images/*.webp
  imageMobile: string; // /mobile/*.webp
  imageWidth: number;
  imageHeight: number;
  metaTitle: string;
  metaDescription: string;
  description: string;
  workflow: string[];
  problems: string[];
  modules: string[];
  outcomes: string[];
  /** Genuine, industry-specific narrative (added for depth). Optional so the
   *  page still renders for any industry that hasn't been written up yet. */
  approach?: string;
  departments?: string[];
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    href: '/industries/manufacturing',
    name: 'Manufacturing',
    image: '/images/industry-manufacturing.webp',
    imageMobile: '/mobile/industry-manufacturing-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Manufacturing in Pakistan | ODOOVATIONS',
    metaDescription:
      'Connect production, inventory, purchasing and costing with Odoo for manufacturers in Pakistan. Real-time visibility from raw material to finished goods.',
    description:
      'Plan production, control materials and cost every job accurately — from raw material to finished goods — in one connected system.',
    workflow: ['Raw Material', 'Production', 'Quality', 'Warehouse', 'Sales', 'Accounts'],
    problems: [
      'Production plans live in spreadsheets, disconnected from stock.',
      'Material shortages are discovered too late.',
      'Job costing is estimated rather than measured.',
      'No live view of work-in-progress across the floor.',
    ],
    modules: ['Manufacturing', 'Inventory', 'Purchase', 'Accounting', 'Reporting'],
    outcomes: [
      'Accurate, real-time job costing',
      'Planned material availability',
      'Live visibility of work-in-progress',
      'Fewer delays and shortages',
    ],
    approach:
      'Manufacturing is where disconnected systems hurt most: a sales order the floor never sees, a material shortage found on the day of production, a job cost guessed at month-end. We implement Odoo Manufacturing (MRP) on top of your real bill of materials and routing, so a confirmed order pulls material, schedules work centres, tracks quality and posts actual cost automatically. Standard Odoo covers most of it; we customise only the steps unique to your product — special routings, subcontracting rules or industry certifications.',
    departments: ['Production planning', 'Purchasing', 'Warehouse', 'Quality', 'Costing & accounts', 'Management'],
  },
  {
    slug: 'textile-apparel',
    href: '/industries/textile-apparel',
    name: 'Textile & Apparel',
    image: '/images/industry-textile-apparel.webp',
    imageMobile: '/mobile/industry-textile-apparel-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Textile & Apparel in Pakistan | ODOOVATIONS',
    metaDescription:
      'Manage raw materials, production, subcontracting, quality and orders in one Odoo system built for textile and apparel businesses in Pakistan.',
    description:
      'Manage raw materials, production, subcontracting, quality, finished stock, orders and accounts through one connected system.',
    workflow: ['Raw Material', 'Production', 'Quality', 'Warehouse', 'Sales', 'Accounts'],
    problems: [
      'Subcontracting and in-house work are tracked separately.',
      'Fabric and trims stock is hard to reconcile.',
      'Quality issues are logged on paper, not against orders.',
      'Order status is chased over calls and WhatsApp.',
    ],
    modules: ['Manufacturing', 'Inventory', 'Purchase', 'Sales', 'Accounting'],
    outcomes: [
      'One view across in-house and subcontracted work',
      'Reliable fabric and trims tracking',
      'Quality linked to orders and batches',
      'Clear, live order status',
    ],
    approach:
      'Textile runs on a chain most ERPs handle badly: raw material → spinning or knitting → dyeing → subcontracting → quality → finished stock → orders. The hard parts are subcontracting (goods leaving and returning against a job) and matching lots through production. We configure Odoo to track material against each subcontract, hold quality at the right stages, and keep finished-goods stock accurate by design, colour and size — then connect it straight to sales and accounts.',
    departments: ['Raw material store', 'Production', 'Subcontracting', 'Quality', 'Finished goods', 'Sales & accounts'],
  },
  {
    slug: 'distribution',
    href: '/industries/distribution',
    name: 'Distribution',
    image: '/images/industry-distribution.webp',
    imageMobile: '/mobile/industry-distribution-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Distribution & Wholesale in Pakistan | ODOOVATIONS',
    metaDescription:
      'Control multi-warehouse stock, orders, pricing and receivables with Odoo for distribution and wholesale businesses in Pakistan and beyond.',
    description:
      'Control stock across warehouses, process orders quickly and keep pricing, deliveries and receivables aligned.',
    workflow: ['Purchase', 'Warehouse', 'Sales', 'Delivery', 'Invoicing', 'Accounts'],
    problems: [
      'Stock differs between warehouses and the system.',
      'Pricing and discounts vary by customer with no control.',
      'Deliveries and invoices fall out of sync.',
      'Receivables are hard to track in real time.',
    ],
    modules: ['Inventory', 'Sales', 'Purchase', 'Accounting', 'Point of Sale'],
    outcomes: [
      'Accurate multi-warehouse stock',
      'Controlled customer pricing',
      'Deliveries and invoicing aligned',
      'Live receivables visibility',
    ],
    approach:
      'For distributors the whole business is accuracy and speed: does stock match records across warehouses, is customer-specific pricing applied correctly, and are receivables under control. We implement Odoo so inventory is live across locations, pricing rules apply automatically per customer, deliveries reconcile against invoices, and management sees receivables and fast/slow movers in real time — replacing per-warehouse spreadsheets and manual price lists.',
    departments: ['Sales', 'Procurement', 'Warehouse', 'Dispatch', 'Accounts receivable', 'Management'],
  },
  {
    slug: 'retail-ecommerce',
    href: '/industries/retail-ecommerce',
    name: 'Retail & E-commerce',
    image: '/images/industry-retail-ecommerce.webp',
    imageMobile: '/mobile/industry-retail-ecommerce-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Retail & E-commerce in Pakistan | ODOOVATIONS',
    metaDescription:
      'Unify POS, online store, inventory and accounts with Odoo for retail and e-commerce businesses. One stock, one truth, across every channel.',
    description:
      'Sell in-store and online from one stock and one system — POS, e-commerce, inventory and accounts working together.',
    workflow: ['Catalog', 'Online / POS', 'Inventory', 'Fulfilment', 'Invoicing', 'Accounts'],
    problems: [
      'Online and in-store stock are counted separately.',
      'Overselling happens when channels are not synced.',
      'Reconciling sales across channels takes hours.',
      'No single view of best-selling products.',
    ],
    modules: ['Point of Sale', 'E-commerce', 'Inventory', 'Sales', 'Accounting'],
    outcomes: [
      'One stock across every channel',
      'No more overselling',
      'Fast, unified reconciliation',
      'Clear product performance insight',
    ],
    approach:
      'Retail and e-commerce fail when the shop floor, the website and the back office each keep their own numbers. We connect Odoo POS and e-commerce to one inventory and one set of accounts, so a sale in-store or online updates the same stock and invoicing stays consistent for compliance. This is also the foundation for FBR digital invoicing — structured, connected sales data that can be submitted reliably.',
    departments: ['Store / POS', 'E-commerce', 'Inventory', 'Purchasing', 'Accounts', 'Customer service'],
  },
  {
    slug: 'pharmaceuticals',
    href: '/industries/pharmaceuticals',
    name: 'Pharmaceuticals',
    image: '/images/industry-pharmaceuticals.webp',
    imageMobile: '/mobile/industry-pharmaceuticals-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Pharmaceuticals & Healthcare Supply | ODOOVATIONS',
    metaDescription:
      'Batch and expiry tracking, traceability and compliant inventory with Odoo for pharmaceutical and healthcare supply businesses in Pakistan.',
    description:
      'Track batches, expiry and traceability with disciplined inventory and accounting suited to regulated products.',
    workflow: ['Purchase', 'Batch Intake', 'Warehouse', 'Sales', 'Traceability', 'Accounts'],
    problems: [
      'Batch and expiry are tracked manually and error-prone.',
      'Recalls and traceability are difficult to action.',
      'Near-expiry stock is discovered too late.',
      'Compliance reporting is time-consuming.',
    ],
    modules: ['Inventory', 'Purchase', 'Sales', 'Accounting', 'Custom Modules'],
    outcomes: [
      'Reliable batch and expiry control',
      'Fast, accurate traceability',
      'Proactive near-expiry management',
      'Simpler compliance reporting',
    ],
    approach:
      'Pharma demands traceability: batch and expiry tracking, controlled handling and accurate stock valuation. We implement Odoo so every batch is tracked from intake through sale with expiry visibility, quality gates are enforced, and accounts reflect true inventory value. Customisation focuses only on the regulatory and traceability requirements specific to your products — not unnecessary complexity.',
    departments: ['Procurement', 'Batch intake & QA', 'Warehouse', 'Sales', 'Accounts', 'Compliance'],
  },
  {
    slug: 'construction',
    href: '/industries/construction',
    name: 'Construction',
    image: '/images/industry-construction.webp',
    imageMobile: '/mobile/industry-construction-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Construction & Contracting | ODOOVATIONS',
    metaDescription:
      'Track projects, procurement, subcontractors and costs with Odoo for construction and contracting businesses in Pakistan and internationally.',
    description:
      'Run projects, procurement, subcontractors and costs together so every site stays on budget and on schedule.',
    workflow: ['Project', 'Procurement', 'Site', 'Subcontractors', 'Billing', 'Accounts'],
    problems: [
      'Project costs are known only after the fact.',
      'Procurement and site needs are poorly coordinated.',
      'Subcontractor billing is hard to reconcile.',
      'No live view of budget versus actual.',
    ],
    modules: ['Project', 'Purchase', 'Inventory', 'Accounting', 'Custom Modules'],
    outcomes: [
      'Live budget-versus-actual per project',
      'Coordinated procurement and sites',
      'Cleaner subcontractor billing',
      'Better project profitability',
    ],
    approach:
      'Construction and contracting live or die on project cost control: procurement, subcontractors, site materials and billing spread across sites and months. We implement Odoo around the project — budgets, purchase orders, subcontractor costs and progress billing all roll up per project — so every site stays on budget and management sees margin while the job is still running, not after it closes.',
    departments: ['Estimation', 'Procurement', 'Site management', 'Subcontractors', 'Billing', 'Finance'],
  },
  {
    slug: 'professional-services',
    href: '/industries/professional-services',
    name: 'Professional Services',
    image: '/images/industry-professional-services.webp',
    imageMobile: '/mobile/industry-professional-services-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Professional Services & Agencies | ODOOVATIONS',
    metaDescription:
      'Manage projects, timesheets, billing and pipeline with Odoo for consultancies, agencies and professional services firms.',
    description:
      'Connect pipeline, projects, timesheets and billing so utilisation, profitability and cash flow stay clear.',
    workflow: ['CRM', 'Project', 'Timesheets', 'Delivery', 'Invoicing', 'Accounts'],
    problems: [
      'Billable time is captured inconsistently.',
      'Project profitability is unclear until it is too late.',
      'Pipeline and delivery are managed in separate tools.',
      'Invoicing lags behind delivered work.',
    ],
    modules: ['CRM', 'Project', 'Sales', 'Accounting', 'HR and Payroll'],
    outcomes: [
      'Reliable time and utilisation data',
      'Clear per-project profitability',
      'Pipeline connected to delivery',
      'Faster, accurate invoicing',
    ],
    approach:
      'For service firms the product is time, and the leaks are untracked hours, slow invoicing and no view of project profitability. We implement Odoo to connect the pipeline (CRM) to projects, timesheets and invoicing — so work is captured, billed promptly, and every engagement’s profitability is visible. Standard Odoo covers most of this cleanly; we tailor approval and billing rules to how your firm actually works.',
    departments: ['Sales / CRM', 'Project delivery', 'Timesheets', 'Billing', 'Finance', 'Management'],
  },
  {
    slug: 'food-hospitality',
    href: '/industries/food-hospitality',
    name: 'Food & Hospitality',
    image: '/images/industry-food-hospitality.webp',
    imageMobile: '/mobile/industry-food-hospitality-mobile.webp',
    imageWidth: 1400,
    imageHeight: 900,
    metaTitle: 'Odoo for Food & Hospitality | ODOOVATIONS',
    metaDescription:
      'Connect POS, inventory, recipes and purchasing with Odoo for restaurants, cafés and food businesses in Pakistan. Control food cost and stock.',
    description:
      'Connect POS, recipes, inventory and purchasing to control food cost, reduce waste and keep outlets stocked.',
    workflow: ['Purchase', 'Inventory', 'Recipes', 'POS', 'Sales', 'Accounts'],
    problems: [
      'Food cost is estimated, not measured.',
      'Stock and wastage are hard to track across outlets.',
      'Purchasing is reactive and inconsistent.',
      'Sales and inventory are not linked.',
    ],
    modules: ['Point of Sale', 'Inventory', 'Purchase', 'Accounting', 'Manufacturing'],
    outcomes: [
      'Measured food cost per item',
      'Less waste and stock-outs',
      'Consistent, planned purchasing',
      'POS linked to live inventory',
    ],
    approach:
      'Food and hospitality run on tight margins and perishable stock, where recipe costing and waste decide profitability. We implement Odoo POS with inventory and recipe/BoM costing, so each sale depletes ingredients, food cost is measured rather than guessed, and multi-outlet stock stays accurate. It connects straight to accounts for a real, current view of margin per outlet.',
    departments: ['Front of house / POS', 'Kitchen', 'Inventory & purchasing', 'Recipe costing', 'Accounts', 'Operations'],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
