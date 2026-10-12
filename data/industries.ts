export interface Industry {
  slug: string;
  href: string;
  name: string; // title_below_image from manifest
  /**
   * Photographic hero. Optional: industries added after the original eight
   * have no commissioned photography yet, and the template renders a
   * typographic gradient hero instead of requesting a missing file.
   */
  image?: string; // /images/*.webp
  imageMobile?: string; // /mobile/*.webp
  imageWidth?: number;
  imageHeight?: number;
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

  /**
   * Page H1. The original eight keep the "Odoo for X" heading they already
   * rank on — do not change those. Industries added during the repositioning
   * set their own broader heading here.
   */
  h1?: string;
  /**
   * What this industry typically needs from us beyond the ERP itself —
   * custom software, automation, web and creative. Answers the "what else is
   * relevant to this industry" question rather than leaving every industry
   * page looking like an Odoo-only pitch.
   */
  beyond?: { label: string; body: string; href: string }[];
  /**
   * Industry-specific FAQs. Every industry page previously rendered one
   * identical shared set, which meant fourteen pages emitting the same
   * FAQPage schema and answering questions nobody asked on that page.
   */
  faqs?: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    faqs: [
      {
        question: 'Can Odoo handle our bills of materials and production routing?',
        answer:
          'Yes — multi-level BoMs, work centres, routings and work orders are standard manufacturing functionality. The real work is capturing how your shop floor actually sequences jobs, including the informal steps people have learned to do, rather than the version written in a procedure document.',
      },
      {
        question: 'How do we track actual production cost versus estimate?',
        answer:
          'By recording material consumption and work-centre time against each manufacturing order, so the costed BoM can be compared with what was really consumed. This only produces trustworthy numbers if the shop floor records scrap and rework honestly, which is a process question before it is a software one.',
      },
      {
        question: 'What about subcontracted operations?',
        answer:
          'Odoo supports subcontracting, where components are issued to a vendor and a finished or semi-finished item comes back. It needs deciding upfront who owns the stock while it is out, because that affects both your inventory valuation and what you can promise customers.',
      },
      {
        question: 'Do operators need to use the system directly?',
        answer:
          'For accurate data, yes — someone at the point of work has to confirm what was produced and consumed. A tablet at the work centre with a deliberately small set of actions works far better than asking the office to key in yesterday\'s paperwork.',
      },
    ],
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
    beyond: [
      { label: 'Factory automation', body: 'Job cards, shop-floor capture, quality checkpoints and live production dashboards.', href: '/solutions/factory-automation' },
      { label: 'Inventory management', body: 'Barcode receiving and picking so material records match the floor.', href: '/solutions/inventory-management' },
      { label: 'AI & automation', body: 'Automated reorder alerts, downtime analysis and production reporting.', href: '/services/ai-automation' },
      { label: 'Creative & media', body: 'Product photography, factory video and the profile that wins buyer audits.', href: '/services/creative-media' },
    ],
  },
  {
    slug: 'textile-apparel',
    faqs: [
      {
        question: 'Can the system handle style, colour and size variants?',
        answer:
          'Yes. Product variants are designed for exactly this, so one style carries its colour and size combinations without creating hundreds of unrelated products. Getting the variant structure right at the start matters, because restructuring it later affects every historical transaction.',
      },
      {
        question: 'How do we handle fabric consumption and wastage?',
        answer:
          'Through the bill of materials with a wastage allowance, and by recording actual consumption against production. Cutting wastage varies by marker efficiency and fabric, so a single fixed percentage across all styles will quietly misstate your costs.',
      },
      {
        question: 'Can we manage export documentation from the same system?',
        answer:
          'Export paperwork can be generated from the sales and delivery records rather than retyped into separate templates. What each destination requires differs, so the document set is configured to your markets rather than assumed.',
      },
      {
        question: 'What about seasonal and sample production?',
        answer:
          'Samples are typically handled as their own production flow so their cost does not distort production costing for bulk orders. Seasonal planning depends more on how far ahead your buyers commit than on the software.',
      },
    ],
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
    beyond: [
      { label: 'Factory automation', body: 'Production stages, job cards and rejection tracking across cutting, stitching and finishing.', href: '/solutions/factory-automation' },
      { label: 'Export management', body: 'Landed costing, buyer documentation and shipment tracking.', href: '/industries/import-export' },
      { label: 'Custom software', body: 'The costing and order-tracking logic no standard product covers.', href: '/services/custom-software-development' },
      { label: 'Creative & media', body: 'Lookbooks, product video and buyer-facing brand material.', href: '/services/creative-media' },
    ],
  },
  {
    slug: 'distribution',
    faqs: [
      {
        question: 'Can we manage multiple warehouses and inter-warehouse transfers?',
        answer:
          'Yes, including transfer routes, lead times between locations and stock reservations per warehouse. The configuration decision that matters is which location fulfils which customer, because that drives both availability promises and replenishment.',
      },
      {
        question: 'How does the system handle batch or expiry tracking?',
        answer:
          'Lots and serial numbers track batches, with removal strategies such as FEFO so stock nearest expiry is picked first. This requires scanning or recording at receipt, which is the step most often skipped and the reason traceability later fails.',
      },
      {
        question: 'Can we set different prices for different customers?',
        answer:
          'Yes — price lists by customer, customer group, quantity break or date range. Where pricing currently lives in individual sales reps\' heads, the hardest part is agreeing the actual rules, not configuring them.',
      },
      {
        question: 'What about goods returned from customers?',
        answer:
          'Returns are handled as reverse movements with their own quality decision: back to saleable stock, to quarantine, or to scrap. Deciding that routing explicitly prevents returned goods from silently re-entering stock in unknown condition.',
      },
    ],
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
    beyond: [
      { label: 'Inventory management', body: 'Multi-warehouse stock, batch and expiry control, and cycle counting.', href: '/solutions/inventory-management' },
      { label: 'WhatsApp automation', body: 'Order confirmations, dispatch updates and payment reminders, sent automatically.', href: '/services/whatsapp-automation' },
      { label: 'Custom software', body: 'Dealer and distributor portals so customers order without calling.', href: '/services/custom-software-development' },
      { label: 'Digital marketing', body: 'Reaching retailers and generating qualified trade enquiries.', href: '/services/digital-marketing' },
    ],
  },
  {
    slug: 'retail-ecommerce',
    faqs: [
      {
        question: 'Can Odoo keep our online store and physical stock in sync?',
        answer:
          'Yes, through integration with your e-commerce platform or by running the store on Odoo itself. The critical design question is which system owns stock levels, because two systems both believing they can allocate the same unit is how overselling happens.',
      },
      {
        question: 'Does the POS work when the internet drops?',
        answer:
          'Odoo POS continues taking sales offline and synchronises when the connection returns. It is worth testing this deliberately before go-live rather than discovering the behaviour during a busy trading day.',
      },
      {
        question: 'Can we run promotions and loyalty?',
        answer:
          'Discounts, coupons, promotional pricing and loyalty programmes are standard. The practical limit is usually how clearly the promotion rules are defined — overlapping promotions need a stated precedence or the result is unpredictable.',
      },
      {
        question: 'How do we handle online orders that are picked in store?',
        answer:
          'As a delivery operation from that store\'s location, so stock is deducted where it physically was. This only works if in-store stock accuracy is good enough to trust, which often needs addressing first.',
      },
    ],
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
    beyond: [
      { label: 'POS software', body: 'Offline-capable tills, central pricing and consolidated multi-branch reporting.', href: '/solutions/pos-software' },
      { label: 'Inventory management', body: 'One stock pool across shop, warehouse and online so you stop overselling.', href: '/solutions/inventory-management' },
      { label: 'Digital marketing', body: 'Meta and Google campaigns measured on orders rather than clicks.', href: '/services/digital-marketing' },
      { label: 'Creative & media', body: 'Product photography, ad creative and short-form video that sells.', href: '/services/creative-media' },
    ],
  },
  {
    slug: 'pharmaceuticals',
    faqs: [
      {
        question: 'Does the system support batch traceability and expiry control?',
        answer:
          'Yes — lot tracking with expiry dates, FEFO picking, and the ability to trace a batch forward to customers and back to supplier receipt. Traceability depends entirely on lot capture at every movement, so the process has to make that unavoidable rather than optional.',
      },
      {
        question: 'Can we handle recalls?',
        answer:
          'Lot traceability lets you identify every delivery containing an affected batch. How quickly you can act then depends on the quality of your customer and delivery records, which is worth auditing before you need them.',
      },
      {
        question: 'What about regulatory documentation?',
        answer:
          'Documents can be generated from transaction records rather than maintained separately. We do not claim any pre-certified regulatory compliance: what the system produces must be reviewed against your obligations by someone qualified to do that.',
      },
      {
        question: 'Can we control which stock is released for sale?',
        answer:
          'Yes, through quality control states and separate quarantine locations, so material is not saleable until it has been released. This is a configuration of your own release process, which has to be documented first.',
      },
    ],
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
    beyond: [
      { label: 'Inventory management', body: 'Batch, expiry and first-expiry-first-out picking as a hard requirement.', href: '/solutions/inventory-management' },
      { label: 'Custom software', body: 'Distribution, recall traceability and regulatory documentation.', href: '/services/custom-software-development' },
      { label: 'AI & automation', body: 'Expiry alerting, reorder automation and exception reporting.', href: '/services/ai-automation' },
      { label: 'Accounting software', body: 'Stock valuation and margin that reconcile with batch movement.', href: '/solutions/accounting-software' },
    ],
  },
  {
    slug: 'construction',
    faqs: [
      {
        question: 'Can we track cost per project rather than per month?',
        answer:
          'Yes — analytic accounting attributes material, labour and subcontractor cost to a specific project or phase, so margin is visible per job. The usual obstacle is site costs that never reach the office as documents, not the accounting structure.',
      },
      {
        question: 'How do we handle variations and change orders?',
        answer:
          'As amendments to the project scope with their own approved value, kept distinct from the original contract. Keeping them separate is what lets you show a client why the final figure differs from the quotation.',
      },
      {
        question: 'Can the system manage retention?',
        answer:
          'Retention held against invoices can be tracked so the outstanding amount and its release date remain visible rather than being forgotten until someone reconciles the ledger.',
      },
      {
        question: 'What about equipment and plant?',
        answer:
          'Equipment can be tracked with maintenance schedules and allocated to projects. Whether to charge internal plant to a project at a rate is a policy decision that should be settled before configuration.',
      },
    ],
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
    beyond: [
      { label: 'Custom software', body: 'Project costing, subcontractor billing and site progress tracking.', href: '/services/custom-software-development' },
      { label: 'AI & automation', body: 'Approval routing for variations, purchases and payment certificates.', href: '/services/ai-automation' },
      { label: 'Websites & apps', body: 'Site-team mobile capture and a portfolio site that wins tenders.', href: '/services/web-development' },
      { label: 'Creative & media', body: 'Project photography, drone footage and completed-work case material.', href: '/services/creative-media' },
    ],
  },
  {
    slug: 'professional-services',
    faqs: [
      {
        question: 'Can we track billable time accurately?',
        answer:
          'Timesheets link time to a project and task, and can feed invoicing directly. Accuracy depends on how quickly people record time — reconstructed at the end of the month, timesheets become an estimate rather than a record.',
      },
      {
        question: 'Does it handle fixed-price as well as time-and-materials?',
        answer:
          'Yes. Fixed-price work still needs time recorded to show whether the engagement was profitable, even though the client is not billed on it.',
      },
      {
        question: 'Can we see utilisation across the team?',
        answer:
          'Yes, from recorded time against available capacity. Utilisation is only meaningful once you have defined what counts as billable, which is a question firms frequently answer inconsistently between teams.',
      },
      {
        question: 'What about retainers and recurring billing?',
        answer:
          'Recurring invoices with an agreed scope are supported, and drawdown against a retainer balance can be tracked so both sides can see what remains.',
      },
    ],
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
    beyond: [
      { label: 'Custom software', body: 'Project, retainer and client portal systems shaped to your practice.', href: '/services/custom-software-development' },
      { label: 'AI & automation', body: 'Document drafting support, knowledge assistants and automated status reporting.', href: '/services/ai-automation' },
      { label: 'Websites & apps', body: 'A credible site and client portal that reduce administrative load.', href: '/services/web-development' },
      { label: 'Digital marketing', body: 'B2B lead generation and content that demonstrates expertise.', href: '/services/digital-marketing' },
    ],
  },
  {
    slug: 'food-hospitality',
    faqs: [
      {
        question: 'Can it handle recipes and portion costing?',
        answer:
          'Yes, through bills of materials for menu items, so ingredient cost rolls up to the plate. Yields and trim loss need to be realistic, otherwise theoretical food cost will not match what the stock count says.',
      },
      {
        question: 'Does it support multiple outlets?',
        answer:
          'Yes, with per-location stock and sales, and central purchasing where that makes sense. Outlets usually need some local autonomy over ordering, which is a policy question to settle before configuration.',
      },
      {
        question: 'Can we track wastage?',
        answer:
          'Wastage can be recorded as its own stock movement with a reason, which is what makes the difference between theoretical and actual consumption explainable rather than just visible.',
      },
      {
        question: 'What about kitchen display and order routing?',
        answer:
          'Orders can be routed to the relevant preparation area from the point of sale. How many stations and what routing rules apply depends on your kitchen layout rather than on the software.',
      },
    ],
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
    beyond: [
      { label: 'Restaurant POS', body: 'Orders, kitchen display, table management and recipe-level food costing.', href: '/solutions/restaurant-pos' },
      { label: 'WhatsApp automation', body: 'Reservations, order updates and customer follow-up handled automatically.', href: '/services/whatsapp-automation' },
      { label: 'Digital marketing', body: 'Local campaigns and delivery-platform performance.', href: '/services/digital-marketing' },
      { label: 'Creative & media', body: 'Food photography, reels and the menu design that carries the brand.', href: '/services/creative-media' },
    ],
  },
  {
    slug: 'healthcare-clinics',
    faqs: [
      {
        question: 'Can we manage appointments and patient records?',
        answer:
          'Scheduling, patient records and billing can run in one system. Clinical record requirements vary by jurisdiction and specialism, so what may be stored and for how long must be confirmed against your own obligations rather than assumed.',
      },
      {
        question: 'How is patient data protected?',
        answer:
          'Through role-based access so staff see only what their role requires, plus audit logging of access. We do not claim certification against any specific health data standard; the controls are configured to the requirements you are subject to.',
      },
      {
        question: 'Can we handle insurance or panel billing?',
        answer:
          'Billing to a third party such as an insurer or corporate panel can be configured with its own rates and approval steps. The complexity is in the claim rules, which differ per payer.',
      },
      {
        question: 'Does it handle pharmacy or consumable stock?',
        answer:
          'Yes, including batch and expiry tracking for medicines and consumables, with the same traceability as any other lot-tracked stock.',
      },
    ],
    href: '/industries/healthcare-clinics',
    name: 'Healthcare & Clinics',
    h1: 'Software for Hospitals, Clinics and Diagnostic Centres',
    metaTitle: 'Software for Hospitals & Clinics in Pakistan | ODOOVATIONS',
    metaDescription:
      'Hospital and clinic management software — registration, appointments, OPD and IPD, billing, pharmacy, laboratory and records with role-based access.',
    description:
      'Connect registration, appointments, consultation, pharmacy, laboratory and billing so a patient episode is one record instead of six registers.',
    workflow: ['Registration', 'Appointment', 'Consultation', 'Lab / Pharmacy', 'Billing', 'Records'],
    problems: [
      'Patient history is split across a register, a file and a doctor’s memory.',
      'Billing misses items because the pharmacy and lab bill separately.',
      'Panel and insurance claims are prepared by hand and rejected for format.',
      'Nobody can say how many patients a department actually saw last month.',
      'Pharmacy stock expires unnoticed because expiry is tracked on paper.',
    ],
    modules: ['Registration', 'Appointments', 'OPD & IPD', 'Pharmacy', 'Laboratory', 'Billing'],
    outcomes: [
      'One patient record across every department',
      'Bills that capture every chargeable item',
      'Claim documentation prepared in a consistent format',
      'Expiry and batch control in the pharmacy',
      'Department-level activity and revenue reporting',
    ],
    approach:
      'Healthcare is the one sector where we actively argue against implementing everything at once. We start with registration, appointments, OPD and billing — the departments every patient passes through — then add pharmacy and laboratory, then inpatient. Access control is treated as a governance decision rather than a configuration checkbox, because patient data carries real legal and ethical obligations. We are a software company, not a regulatory authority: your facility stays responsible for its clinical and legal duties, and we recommend reviewing the design with your own compliance advisor.',
    departments: ['Reception & registration', 'OPD', 'IPD & wards', 'Pharmacy', 'Laboratory', 'Billing & claims', 'Administration'],
    beyond: [
      { label: 'Hospital management system', body: 'The full system: registration through to discharge, billing and records.', href: '/solutions/hospital-management-system' },
      { label: 'WhatsApp automation', body: 'Appointment reminders, report-ready notifications and follow-up messages sent automatically.', href: '/services/whatsapp-automation' },
      { label: 'Websites & booking', body: 'A site where patients can find a doctor, see timings and request an appointment.', href: '/services/web-development' },
      { label: 'Marketing & creative', body: 'Ethical, compliant promotion of services, camps and new departments.', href: '/services/digital-marketing' },
    ],
  },
  {
    slug: 'logistics-transport',
    faqs: [
      {
        question: 'Can we track shipments and delivery status?',
        answer:
          'Yes, with delivery orders, routes and status visible to both operations and customer service, so the answer to "where is my order" does not require a phone call to the driver.',
      },
      {
        question: 'Does it integrate with courier services?',
        answer:
          'Where the courier offers an API, label generation and tracking updates can be automated. Couriers without one usually still support a file exchange, which is slower but workable.',
      },
      {
        question: 'Can we calculate freight cost per consignment?',
        answer:
          'Freight cost can be attributed to a consignment or job so margin is visible per movement rather than only as a monthly total. Accuracy depends on fuel, toll and driver costs reaching the system.',
      },
      {
        question: 'What about fleet maintenance?',
        answer:
          'Vehicles can be tracked with service schedules and cost history, which makes the running cost of individual vehicles comparable rather than pooled.',
      },
    ],
    href: '/industries/logistics-transport',
    name: 'Logistics & Transport',
    h1: 'Software for Logistics, Transport and Delivery Businesses',
    metaTitle: 'Software for Logistics & Transport Companies | ODOOVATIONS',
    metaDescription:
      'Systems for logistics and transport businesses — consignment tracking, fleet and trip costing, delivery confirmation, customer portals and billing.',
    description:
      'Track consignments, cost trips honestly, confirm deliveries in the field and bill from the same records your operations team works in.',
    workflow: ['Booking', 'Dispatch', 'In transit', 'Delivery proof', 'Billing', 'Trip costing'],
    problems: [
      'Consignment status lives in phone calls to the driver.',
      'Trip profitability is estimated after the fact, if at all.',
      'Proof of delivery is a paper slip that arrives days later, or not at all.',
      'Customers call the office because they have no way to check status themselves.',
      'Fuel, maintenance and driver costs are never matched to the trips that caused them.',
    ],
    modules: ['Orders', 'Fleet', 'Inventory', 'Field App', 'Accounting', 'Reporting'],
    outcomes: [
      'Consignment status visible without a phone call',
      'Trip-level cost and margin measured, not guessed',
      'Digital proof of delivery captured at the door',
      'Customers self-serving through a portal',
      'Vehicle running costs attributed to real trips',
    ],
    approach:
      'The defining problem in transport is that the operational truth is on the road and the records are in the office. We close that gap with a field application drivers will actually use — scanning and single taps, not typing — capturing dispatch, transit milestones and delivery proof at the moment they happen. That feeds trip costing, customer visibility and billing from one set of records, so the invoice and the operation finally agree.',
    departments: ['Booking & customer service', 'Dispatch', 'Drivers & field staff', 'Fleet & maintenance', 'Billing', 'Management'],
    beyond: [
      { label: 'Custom software', body: 'Field applications, consignment tracking and dealer or customer portals.', href: '/services/custom-software-development' },
      { label: 'Inventory management', body: 'Warehouse and transit stock that reconciles at both ends of a movement.', href: '/solutions/inventory-management' },
      { label: 'AI & automation', body: 'Automated status notifications, exception alerts and delivery follow-ups.', href: '/services/ai-automation' },
      { label: 'WhatsApp automation', body: 'Consignment updates and delivery confirmations sent to customers automatically.', href: '/services/whatsapp-automation' },
    ],
  },
  {
    slug: 'wholesale-trading',
    faqs: [
      {
        question: 'Can we manage customer-specific pricing at scale?',
        answer:
          'Yes, through price lists by customer, group, quantity and date. Where pricing is currently negotiated per order and remembered informally, the configuration work is mostly agreeing what the rules actually are.',
      },
      {
        question: 'How do we handle credit limits?',
        answer:
          'Credit limits can block or warn on new orders when a customer is over their limit or overdue. Whether it blocks or warns is a commercial decision, and it is worth deciding before go-live rather than during a dispute.',
      },
      {
        question: 'Can we see real margin per customer or product?',
        answer:
          'Yes, provided landed costs are recorded. Margin calculated on purchase price alone will overstate profitability wherever freight and duty are significant.',
      },
      {
        question: 'What about partial deliveries and backorders?',
        answer:
          'Partial delivery with an automatic backorder for the remainder is standard, so what is owed to the customer stays visible rather than being tracked on a side list.',
      },
    ],
    href: '/industries/wholesale-trading',
    name: 'Wholesale & Trading',
    h1: 'Software for Wholesale and Trading Businesses',
    metaTitle: 'Software for Wholesale & Trading Businesses | ODOOVATIONS',
    metaDescription:
      'Systems for wholesalers and traders — customer-specific pricing, credit control, fast order entry, stock accuracy, recovery tracking and margin reporting.',
    description:
      'Handle customer-specific pricing, credit limits, fast order entry and recovery in one system — with margin you can actually see per customer.',
    workflow: ['Purchase', 'Stock', 'Order', 'Dispatch', 'Invoice', 'Recovery'],
    problems: [
      'Every customer has a different rate and it lives in the salesman’s notebook.',
      'Credit limits are informal, so exposure is discovered when payment stops.',
      'Recovery and ageing are tracked in a separate ledger from sales.',
      'Margin per customer is unknown because discounts are applied ad hoc.',
      'Stock in the godown does not match stock in the records.',
    ],
    modules: ['Sales', 'Purchase', 'Inventory', 'Pricing', 'Accounting', 'Reporting'],
    outcomes: [
      'Customer-specific price lists applied automatically',
      'Credit limits enforced at order entry, not after dispatch',
      'Receivables ageing and recovery visible against live sales',
      'True margin per customer, product and salesperson',
      'Godown stock that reconciles',
    ],
    approach:
      'Trading businesses run on two numbers most systems never connect: the rate this particular customer gets, and how much they already owe. We put customer-specific pricing and credit control at the point of order entry, so a salesman sees the right rate and a blocked account before the order is confirmed rather than after the goods have gone. Everything else — stock, invoicing, recovery, margin — follows from that single record.',
    departments: ['Sales & order booking', 'Godown / warehouse', 'Purchase', 'Recovery', 'Accounts', 'Management'],
    beyond: [
      { label: 'Inventory management', body: 'Barcode receiving and picking so godown stock matches the record.', href: '/solutions/inventory-management' },
      { label: 'Accounting software', body: 'Receivables, payables and recovery working from the same sales records.', href: '/solutions/accounting-software' },
      { label: 'WhatsApp automation', body: 'Order confirmations, dispatch updates and payment reminders sent automatically.', href: '/services/whatsapp-automation' },
      { label: 'Custom software', body: 'Dealer and distributor portals so customers place their own orders.', href: '/services/custom-software-development' },
    ],
  },
  {
    slug: 'import-export',
    faqs: [
      {
        question: 'Can the system handle landed cost?',
        answer:
          'Yes — freight, duty, clearing and other charges can be apportioned across a shipment so the true cost per unit is known rather than estimated. The apportionment basis, whether value, weight or volume, should be chosen deliberately as it changes unit costs.',
      },
      {
        question: 'Does it support multiple currencies?',
        answer:
          'Yes, with transaction currency, revaluation and realised exchange differences handled in the ledger. The configuration needs to match how your accountant expects gains and losses to be recognised.',
      },
      {
        question: 'Can we track consignments through customs stages?',
        answer:
          'Shipment status can be tracked through its stages so delays are visible before they affect a customer commitment. The stages are configured to your actual process and destinations.',
      },
      {
        question: 'What about export documentation?',
        answer:
          'Documents can be generated from the underlying records rather than retyped. Requirements differ per destination, so the document set is built for the markets you ship to.',
      },
    ],
    href: '/industries/import-export',
    name: 'Import & Export',
    h1: 'Software for Importers, Exporters and Trading Houses',
    metaTitle: 'Export & Import Management Software | ODOOVATIONS',
    metaDescription:
      'Systems for importers and exporters — shipment and consignment tracking, landed costing, document sets, multi-currency accounting and buyer communication.',
    description:
      'Track shipments and documents, land costs accurately across duty and freight, and keep buyers informed without rebuilding a spreadsheet each week.',
    workflow: ['Enquiry', 'Order', 'Production / Procurement', 'Documents', 'Shipment', 'Landed cost'],
    problems: [
      'Landed cost is a spreadsheet only one person understands.',
      'Document sets are assembled by hand for every shipment and something is always missing.',
      'Multi-currency gains and losses are reconciled long after the fact.',
      'Buyers ask for status updates that take half a day to compile.',
      'Nobody can say the true margin on a completed shipment.',
    ],
    modules: ['Sales', 'Purchase', 'Inventory', 'Multi-currency', 'Documents', 'Costing'],
    outcomes: [
      'Landed cost calculated consistently across freight, duty and handling',
      'Document sets generated from shipment data rather than retyped',
      'Multi-currency handled in the accounts, not on the side',
      'Shipment status answerable in seconds',
      'Real margin per shipment and per buyer',
    ],
    approach:
      'Export and import margins are decided by costs that arrive after the sale — freight, duty, handling, currency movement. If those land in a spreadsheet, the business is always reporting last quarter’s truth. We structure landed costing into the system so each shipment absorbs its real costs as they are incurred, generate the document set from shipment data instead of retyping it, and give the buyer-facing team a status they can answer immediately.',
    departments: ['Sales & buyer relations', 'Procurement / production', 'Documentation', 'Shipping & logistics', 'Accounts', 'Management'],
    beyond: [
      { label: 'Custom software', body: 'Export management, document generation and buyer portals.', href: '/services/custom-software-development' },
      { label: 'Accounting software', body: 'Multi-currency accounting with landed cost feeding real margin.', href: '/solutions/accounting-software' },
      { label: 'AI & automation', body: 'Document processing and automated buyer status updates.', href: '/services/ai-automation' },
      { label: 'Websites & creative', body: 'An English-language site and profile that stands up to international buyer scrutiny.', href: '/services/web-development' },
    ],
  },
  {
    slug: 'education',
    faqs: [
      {
        question: 'Can we manage student enrolment and fees?',
        answer:
          'Enrolment, fee schedules, invoicing and payment tracking can run in one place, including instalment plans and the follow-up of what is outstanding.',
      },
      {
        question: 'Does it handle multiple programmes or campuses?',
        answer:
          'Yes, with separate programmes, intakes and locations, and reporting that can be viewed per campus or consolidated.',
      },
      {
        question: 'Can parents or students see their own records?',
        answer:
          'A portal can expose fee statements and payment history to the account holder. What else is exposed is a policy decision, particularly where students are minors.',
      },
      {
        question: 'What about staff payroll and HR?',
        answer:
          'HR records, leave and payroll can be managed in the same system. Payroll rules are country-specific and must be configured to local regulation rather than assumed from a template.',
      },
    ],
    href: '/industries/education',
    name: 'Education',
    h1: 'Software for Schools, Colleges and Training Institutes',
    metaTitle: 'School & Institute Management Software | ODOOVATIONS',
    metaDescription:
      'Systems for schools, colleges and training institutes — admissions, attendance, fee collection and recovery, results, parent communication and reporting.',
    description:
      'Run admissions, attendance, fees, results and parent communication from one system instead of four registers and a WhatsApp group.',
    workflow: ['Admission', 'Attendance', 'Fees', 'Assessment', 'Results', 'Communication'],
    problems: [
      'Fee defaulters are identified weeks late, by hand.',
      'Attendance is on paper and never reaches parents in time to matter.',
      'Admissions enquiries are lost between a phone, a register and a form.',
      'Results are compiled manually every term under time pressure.',
      'Parent communication depends on whoever is managing the WhatsApp group.',
    ],
    modules: ['Admissions', 'Attendance', 'Fees', 'Assessment', 'Communication', 'Accounting'],
    outcomes: [
      'Fee status and recovery visible continuously, not at term end',
      'Attendance recorded once and shared with parents automatically',
      'Admission enquiries tracked from first contact to enrolment',
      'Results compiled from marks already in the system',
      'Consistent parent communication that does not rely on one person',
    ],
    approach:
      'Schools rarely need more software; they need the four things they already do to stop being four separate systems. Admissions, attendance, fees and assessment share the same student record, so a fee reminder knows which class the student is in and an attendance alert reaches the right parent without anyone maintaining a second list. Fee recovery is usually where the value shows up first, because it moves from a term-end scramble to a continuous, visible position.',
    departments: ['Admissions', 'Academics & teaching staff', 'Examinations', 'Accounts & fee collection', 'Administration', 'Parent communication'],
    beyond: [
      { label: 'Custom software', body: 'School, college and learning management systems built to your structure.', href: '/services/custom-software-development' },
      { label: 'WhatsApp automation', body: 'Attendance alerts, fee reminders and result notifications sent to parents.', href: '/services/whatsapp-automation' },
      { label: 'Websites & apps', body: 'An admissions site and parent portal that reduce front-desk load.', href: '/services/web-development' },
      { label: 'Marketing & creative', body: 'Admission campaigns, prospectus design and campus video.', href: '/services/digital-marketing' },
    ],
  },
  {
    slug: 'agencies-media',
    faqs: [
      {
        question: 'Can we track profitability per client and per project?',
        answer:
          'Yes, by attributing time and external costs to a project. The common gap is unbilled scope creep, which only becomes visible once time is recorded against the job it actually served.',
      },
      {
        question: 'Does it handle retainers?',
        answer:
          'Retainers with an agreed monthly scope are supported, with drawdown visible so overservicing can be identified while there is still time to discuss it.',
      },
      {
        question: 'Can we manage freelancer and supplier costs?',
        answer:
          'External costs can be attributed to the project they belong to, so project margin reflects bought-in work rather than only internal time.',
      },
      {
        question: 'What about approvals and revisions?',
        answer:
          'Approval stages can be tracked so it is clear what was signed off and when. Where revision rounds are contractually limited, recording them is what makes an additional-cost conversation possible.',
      },
    ],
    href: '/industries/agencies-media',
    name: 'Agencies & Media',
    h1: 'Systems for Agencies, Studios and Media Businesses',
    metaTitle: 'Software for Agencies & Media Businesses | ODOOVATIONS',
    metaDescription:
      'Systems for agencies and studios — project and retainer tracking, time and utilisation, approvals, client portals, invoicing and profitability per client.',
    description:
      'Track projects, retainers, time and approvals so you can see which clients are actually profitable and which are quietly costing you.',
    workflow: ['Pitch', 'Project', 'Production', 'Approval', 'Delivery', 'Invoice'],
    problems: [
      'Scope creeps and nobody notices until the project is underwater.',
      'Time is not recorded, so profitability per client is a feeling rather than a number.',
      'Retainer usage is argued about at renewal because nothing was tracked.',
      'Client approvals live in email threads and get lost.',
      'Invoicing lags delivery by weeks because nobody assembles it.',
    ],
    modules: ['Projects', 'Timesheets', 'CRM', 'Approvals', 'Invoicing', 'Reporting'],
    outcomes: [
      'Profitability visible per client, project and retainer',
      'Scope changes recorded when they happen, not at the post-mortem',
      'Retainer usage evidenced at renewal',
      'Approvals tracked against the deliverable',
      'Invoicing triggered by delivery rather than memory',
    ],
    approach:
      'Agencies rarely fail on creative quality — they fail on the two clients who consume three times the hours they are billed for. Fixing that needs time and scope recorded as a normal part of doing the work, not as an administrative chore people skip when busy. We keep capture light, tie approvals to the deliverable rather than an inbox, and surface utilisation and client profitability where the people making pricing decisions will actually see them.',
    departments: ['New business', 'Account management', 'Creative & production', 'Traffic / project management', 'Finance', 'Leadership'],
    beyond: [
      { label: 'Custom software', body: 'Project, retainer and client portal systems shaped to how your agency works.', href: '/services/custom-software-development' },
      { label: 'AI & automation', body: 'Automated status reporting, approval chasing and timesheet reminders.', href: '/services/ai-automation' },
      { label: 'Websites & apps', body: 'Portfolio sites and client portals that carry your own creative standard.', href: '/services/web-development' },
      { label: 'Creative & media', body: 'White-label production capacity when your own studio is at capacity.', href: '/services/creative-media' },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
