/**
 * The eight combined buying paths (Revision 3 §3, Appendix J). A programme is a coordinated set of existing
 * packages, priced from those packages: no bundle discount is invented, project and monthly fees are shown
 * separately, and third-party costs stay outside. Duplicated setup or discovery is removed in the written
 * proposal, not assumed here.
 */
export interface ProgrammePart {
  briefId: string;
  /** 0-based tier index into the brief's three packages. */
  tier: 0 | 1 | 2;
  role: string;
  optional?: boolean;
}

export interface Programme {
  slug: string;
  name: string;
  forWho: string;
  outcome: string;
  parts: ProgrammePart[];
  thirdParty: string;
  noDoubleCharge: string;
}

export const programmes: Programme[] = [
  {
    slug: 'ai-visibility', name: 'AI Visibility Programme',
    forWho: 'Businesses that want to know how AI assistants describe them, then improve it steadily.',
    outcome: 'A dated baseline, then one coherent AEO and GEO programme with monthly evidence.',
    parts: [
      { briefId: 'S003', tier: 0, role: 'Start: a finite audit you can use on its own' },
      { briefId: 'S001', tier: 1, role: 'Then, if it fits: one AEO/GEO programme' },
      { briefId: 'S004', tier: 0, role: 'If facts disagree across profiles', optional: true },
    ],
    thirdParty: 'Specialist research, translation and publisher fees.',
    noDoubleCharge: 'Content units are inside the monthly programme; AEO and GEO are one engagement, not two.',
  },
  {
    slug: 'lead-to-crm', name: 'Lead-to-CRM Programme',
    forWho: 'Businesses spending on marketing without knowing which enquiries turn into sales.',
    outcome: 'Tracked campaigns, a working landing page, and every lead routed into a CRM with an owner.',
    parts: [
      { briefId: 'S020', tier: 0, role: 'Tracking you can trust' },
      { briefId: 'S097', tier: 0, role: 'A campaign landing page that takes enquiries' },
      { briefId: 'S051', tier: 0, role: 'Leads into the CRM, de-duplicated and routed' },
      { briefId: 'S013', tier: 0, role: 'Search ads in your account', optional: true },
    ],
    thirdParty: 'Ad spend, CRM licences and platform fees.',
    noDoubleCharge: 'Tracking set up for the landing page is not charged again inside ads management.',
  },
  {
    slug: 'commerce-retention', name: 'Commerce and Retention Programme',
    forWho: 'Online sellers who need a reliable store and customers who come back.',
    outcome: 'A tested store, tracking, and lifecycle flows that follow up automatically.',
    parts: [
      { briefId: 'S094', tier: 0, role: 'Store set up and tested end to end' },
      { briefId: 'S020', tier: 0, role: 'Purchase and funnel tracking' },
      { briefId: 'S029', tier: 1, role: 'Welcome, cart and post-purchase flows' },
      { briefId: 'S028', tier: 0, role: 'Monthly campaigns', optional: true },
    ],
    thirdParty: 'Store platform and app fees, payment fees, email platform charges, photography.',
    noDoubleCharge: 'Flow setup is a one-time build; monthly campaigns are optional and separate.',
  },
  {
    slug: 'connected-operations', name: 'Connected Operations Programme',
    forWho: 'Teams retyping data between systems or chasing approvals by email.',
    outcome: 'A mapped process, working automations with logs, and someone to keep them running.',
    parts: [
      { briefId: 'S048', tier: 0, role: 'Map the process first' },
      { briefId: 'S046', tier: 1, role: 'Build the agreed workflows' },
      { briefId: 'S058', tier: 0, role: 'Support capacity to keep them running', optional: true },
    ],
    thirdParty: 'Automation platform licences, hosting and API usage.',
    noDoubleCharge: 'The mapping done in the audit is not charged again in the build.',
  },
  {
    slug: 'erp-rollout', name: 'ERP Rollout Programme',
    forWho: 'Businesses moving from spreadsheets or an old system onto Odoo.',
    outcome: 'Agreed modules live with reconciled opening data, trained users and support.',
    parts: [
      { briefId: 'S054', tier: 1, role: 'Three modules or workstreams, including scoped migration' },
      { briefId: 'S059-1', tier: 1, role: 'Role-based training' },
      { briefId: 'S058', tier: 1, role: 'Monthly support after go-live' },
    ],
    thirdParty: 'Odoo licences and hosting.',
    noDoubleCharge: 'Scoped migration is inside the rollout phase; no separate migration fee for the same data.',
  },
  {
    slug: 'product-build', name: 'Product Build Programme',
    forWho: 'Founders and companies turning an idea into working software.',
    outcome: 'Validated scope, a working first release with tests, and the code in your hands.',
    parts: [
      { briefId: 'S078', tier: 0, role: 'Discovery and validation' },
      { briefId: 'S079', tier: 1, role: 'Build three accepted journeys' },
      { briefId: 'S086', tier: 0, role: 'Automated regression checks', optional: true },
    ],
    thirdParty: 'Hosting and third-party services; maintenance is scoped after launch.',
    noDoubleCharge: 'Ordinary testing is part of the build; automated regression is optional extra coverage.',
  },
  {
    slug: 'brand-launch', name: 'Brand and Launch Programme',
    forWho: 'New or repositioned businesses that need an identity and a site.',
    outcome: 'An original identity, a built website and, if wanted, content that keeps going.',
    parts: [
      { briefId: 'S113', tier: 1, role: 'Identity system and guidelines' },
      { briefId: 'S091', tier: 1, role: 'Website built on that identity' },
      { briefId: 'S022', tier: 0, role: 'Monthly content', optional: true },
    ],
    thirdParty: 'Domain, hosting, printing, trademark registration.',
    noDoubleCharge: 'Design-only and built deliverables are separate lines; nothing is designed twice.',
  },
  {
    slug: 'remote-operations', name: 'Remote Operations Programme',
    forWho: 'Businesses that need technical capacity and leadership without hiring.',
    outcome: 'A verified role working your priorities, with senior oversight and clear hours.',
    parts: [
      { briefId: 'S150', tier: 0, role: 'One dedicated, verified role' },
      { briefId: 'S152', tier: 0, role: 'Part-time technical leadership' },
    ],
    thirdParty: 'Equipment, licences and any specialist costs.',
    noDoubleCharge: 'Leadership hours are advisory; delivery hours sit with the role.',
  },
];
