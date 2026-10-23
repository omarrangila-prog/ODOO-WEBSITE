/**
 * Team — the single source of truth for every team statement on the site.
 *
 * Everything here is owner-reported and public. Nothing in this file is an
 * HR record: no salaries, contracts, ages, contact details or national IDs
 * belong here, and this file ships to the browser. Keep private records
 * elsewhere (see docs/TEAM-DATA.md).
 *
 * WHAT IS AND IS NOT CLAIMED
 *  - `count` is the number of ROLE POSITIONS the owner has reported, not a
 *    verified count of unique employees. One person may hold two roles, and
 *    the owner has not yet confirmed that every position is a separate
 *    person, that interns are all included, or which roles are employees
 *    rather than contractors.
 *  - `count: null` means the number has NOT been supplied. It is never
 *    rendered as zero and never guessed.
 *  - The aggregate is computed by reportedRolePositions() for internal checks
 *    only. The public pages show it only if `verifiedUniqueEmployees` below is
 *    set to a number the owner has confirmed.
 */

export type DepartmentGroupId =
  | 'leadership'
  | 'engineering'
  | 'creative'
  | 'quality-validation'
  | 'sales-client'
  | 'office-operations'
  | 'infrastructure'
  | 'extended';

export interface DepartmentGroup {
  id: DepartmentGroupId;
  label: string;
  /** What this group is, in a sentence, for the explorer tabs. */
  summary: string;
}

export interface TeamRole {
  /** Stable key. Do not change once published. */
  id: string;
  title: string;
  /** Reported role positions. null = not supplied, never a guess. */
  count: number | null;
  /** Interns are shown inside their department, labelled as interns. */
  intern?: boolean;
  /** Shown beneath the title. Factual and editable. */
  note?: string;
}

export interface Department {
  id: string;
  group: DepartmentGroupId;
  name: string;
  headline: string;
  description: string;
  roles: TeamRole[];
  /** Department-level areas of work. Not a claim that every person holds every skill. */
  capabilities: string[];
  /** How this department takes part in delivering a project. */
  inDelivery: string;
  services: { label: string; href: string }[];
  /** Extra factual caveat printed under the roles, where one is needed. */
  caveat?: string;
}

export const departmentGroups: DepartmentGroup[] = [
  { id: 'leadership', label: 'Leadership & Strategy', summary: 'Business direction, technology and finance.' },
  { id: 'engineering', label: 'Engineering & Technology', summary: 'Software, Odoo, AI automation and data science.' },
  { id: 'creative', label: 'Creative Production', summary: 'Video, motion graphics and design.' },
  { id: 'quality-validation', label: 'Quality & Business Validation', summary: 'Testing, accounting and inventory review, workflow checks and senior supervision.' },
  { id: 'sales-client', label: 'Sales & Client Relations', summary: 'Sales executives and client communication.' },
  { id: 'office-operations', label: 'Office Operations', summary: 'Reception, HR, coordination and administration.' },
  { id: 'infrastructure', label: 'Infrastructure', summary: 'Servers, hosting and deployment operations.' },
  { id: 'extended', label: 'Extended Collaboration', summary: 'Interns in their departments, and separate freelance resources.' },
];

export const departments: Department[] = [
  {
    id: 'executive-leadership',
    group: 'leadership',
    name: 'Executive Leadership',
    headline: 'Direction, Technology and Financial Oversight.',
    description:
      'Three executive roles set the commercial, technical and financial direction of the company. These are general role descriptions, not personal biographies.',
    roles: [
      { id: 'ceo', title: 'Chief Executive Officer (CEO)', count: 1, note: 'Strategy & business leadership: business direction, client relationships, major projects, commercial decisions and organisational growth.' },
      { id: 'cto', title: 'Chief Technology Officer (CTO)', count: 1, note: 'Technology & engineering leadership: technical strategy, software architecture, engineering standards, technical delivery and infrastructure decisions.' },
      { id: 'cfo', title: 'Chief Financial Officer (CFO)', count: 1, note: 'Finance & commercial governance: financial planning, budgets, commercial controls and financial oversight.' },
    ],
    capabilities: ['Business strategy', 'Technical architecture', 'Financial planning', 'Commercial governance'],
    inDelivery: 'Set scope, standards and commercial terms, and oversee delivery across departments.',
    services: [{ label: 'Discuss a project', href: '/contact#form' }],
  },
  {
    id: 'software-engineering',
    group: 'engineering',
    name: 'Software Engineering & Development',
    headline: 'Engineering the Systems Businesses Depend On.',
    description:
      'From websites and custom applications to complex business software, our development teams work across different levels of engineering, supported by senior developers, junior developers and a growing internship programme.',
    roles: [
      { id: 'senior-software-dev', title: 'Senior Software Developers', count: 8 },
      { id: 'junior-software-dev', title: 'Junior Software Developers', count: 10 },
      { id: 'web-software-dev', title: 'Dedicated Website & Software Developers', count: 10, note: 'A separate group from the senior and junior developers above.' },
      { id: 'software-intern', title: 'Software Development Interns', count: 7, intern: true },
    ],
    capabilities: [
      'Custom software development',
      'Enterprise web applications',
      'Business management systems',
      'ERP integrations',
      'POS software',
      'Inventory management software',
      'Accounting and reporting systems',
      'Responsive websites',
      'SaaS applications',
      'API integrations',
      'Database-backed applications',
      'Software maintenance',
      'Testing support',
    ],
    inDelivery: 'Design and build the application, website or integration once the workflow is understood and reviewed.',
    services: [
      { label: 'Custom Software', href: '/services/custom-software-development' },
      { label: 'Websites & Apps', href: '/services/web-development' },
    ],
    caveat: 'Capabilities are department-level areas, not a claim that every developer holds every skill.',
  },
  {
    id: 'odoo-engineering',
    group: 'engineering',
    name: 'Odoo ERP Engineering & Implementation',
    headline: '13 Odoo Development Roles. Business-First ERP Engineering.',
    description:
      'Our Odoo development capability combines senior technical expertise and implementation resources to configure, customise and connect ERP workflows around business requirements.',
    roles: [
      { id: 'senior-odoo-dev', title: 'Senior Odoo Developers', count: 5 },
      { id: 'odoo-dev', title: 'Odoo Developers', count: 8 },
    ],
    capabilities: [
      'Odoo implementation',
      'Odoo configuration',
      'Custom Odoo modules',
      'Sales and purchase workflows',
      'Inventory and warehouse operations',
      'Accounting integrations',
      'Manufacturing workflows',
      'CRM configuration',
      'Data migration',
      'Reporting',
      'Third-party integrations',
      'Odoo maintenance and support',
    ],
    inDelivery: 'Configure, extend and connect Odoo around the validated business workflow, then migrate data and support go-live.',
    services: [
      { label: 'Odoo Implementation', href: '/services/odoo-implementation-pakistan' },
      { label: 'Custom Odoo Development', href: '/services/custom-odoo-development' },
    ],
    caveat:
      'ODOOVATIONS is an independent Odoo development and implementation provider. It does not claim official, certified or tiered Odoo partner status, and having these development roles does not establish any.',
  },
  {
    id: 'ai-data',
    group: 'engineering',
    name: 'AI, LLMs, Automation & Data Science',
    headline: 'Practical AI Built for Real Business Workflows.',
    description:
      'Our AI and automation team works on intelligent assistants, LLM integrations, connected business workflows and data-driven applications, with dedicated resources for data science and model development.',
    roles: [
      { id: 'ai-specialist', title: 'AI Automation & LLM Specialists', count: 5 },
      { id: 'ai-intern', title: 'AI Automation Interns', count: 5, intern: true },
      { id: 'data-scientist', title: 'Data Science & Model Training Specialist', count: 1 },
    ],
    capabilities: [
      'AI agent development',
      'LLM integration',
      'Business workflow automation',
      'AI-assisted reporting',
      'WhatsApp AI workflows',
      'AI customer support',
      'Document processing',
      'Model experimentation',
      'Data science',
      'Machine learning',
      'Model training and evaluation',
      'Third-party AI integrations',
    ],
    inDelivery: 'Build the assistants and automations, with a person reviewing anything sensitive or business-critical.',
    services: [
      { label: 'AI & Automation', href: '/services/ai-automation' },
      { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
    ],
    caveat:
      'ODOOVATIONS integrates third-party AI models. It does not claim to have trained its own foundation model or to own proprietary AI models. Sensitive or business-critical actions keep a human reviewer.',
  },
  {
    id: 'creative-production',
    group: 'creative',
    name: 'Creative, Motion & Digital Production',
    headline: 'Creative Technology That Makes Complex Ideas Clear.',
    description:
      'Our creative production specialists turn technical products, business ideas and marketing messages into clear, compelling visuals, animation and video.',
    roles: [
      { id: 'video-editor', title: 'Video Editors', count: 2 },
      { id: 'motion-specialist', title: 'Motion Graphics & Animation Specialists', count: 4, note: 'A separate specialism from video editing.' },
      { id: 'graphic-designer', title: 'Graphic Designers', count: 2 },
    ],
    capabilities: [
      'Motion graphics',
      '2D animation',
      'Product explainers',
      'Software demonstration videos',
      'Video editing',
      'Brand graphics',
      'Marketing creatives',
      'Presentation graphics',
      'Social content design',
      'Digital visual production',
    ],
    inDelivery: 'Produce the explainers, demonstrations and brand material that present a finished system or campaign.',
    services: [
      { label: 'Creative & Media', href: '/services/creative-media' },
      { label: 'Content & Social', href: '/services/content-social' },
    ],
    caveat: '3D animation is not listed as a capability because it has not been verified.',
  },
  {
    id: 'quality-assurance',
    group: 'quality-validation',
    name: 'Quality Assurance & Software Testing',
    headline: 'Quality Checked Before Delivery.',
    description:
      'Testers work alongside engineers and business-domain reviewers, so a feature is checked both for whether it runs and for whether it matches how the business works.',
    roles: [{ id: 'qa-tester', title: 'QA Testers', count: 2 }],
    capabilities: [
      'Functional testing',
      'Regression testing',
      'User acceptance preparation',
      'Bug verification',
      'Workflow testing',
      'Browser compatibility',
      'Application validation',
      'Release checks',
    ],
    inDelivery: 'Verify system behaviour after development and before deployment.',
    services: [{ label: 'Custom Software', href: '/services/custom-software-development' }],
    caveat: 'This describes the intended quality workflow. It is not a claim of a formal testing certification.',
  },
  {
    id: 'business-operations',
    group: 'quality-validation',
    name: 'Business Operations, Validation & Supervision',
    headline: 'Real Business Understanding, Inside the Build.',
    description:
      'These roles combine software engineering with business-process understanding. Reviewers who know accounting, stock movement and day-to-day operations check the logic that developers implement.',
    roles: [
      { id: 'hr-coordination', title: 'HR, Management & Meeting Coordination', count: 1, note: 'Internal management coordination, team scheduling, meetings, HR operations and resource coordination.' },
      { id: 'workflow-verification', title: 'Manual Workflow & Business Logic Verification', count: 1, note: 'Reviews whether workflows make practical sense, finds missing steps and process exceptions, and coordinates corrections with developers.' },
      { id: 'accounting-domain', title: 'Accounting Domain Specialist', count: 1, note: 'Validates accounting-related software logic: debit and credit behaviour, ledger structure, financial workflows, reports and reconciliation.' },
      { id: 'inventory-domain', title: 'Inventory Management Domain Specialist', count: 1, note: 'Reviews stock-movement logic, purchase and sales inventory flows, warehouse processes, balances and exceptions.' },
      { id: 'senior-supervisor', title: 'Senior Supervisor', count: 1, note: 'Senior operational review and mentorship.' },
    ],
    capabilities: [
      'Workflow and business-logic review',
      'Accounting logic validation',
      'Inventory logic validation',
      'Process exception review',
      'Management coordination',
      'Senior supervision',
    ],
    inDelivery: 'Review the workflow before it is built and the behaviour once it is.',
    services: [{ label: 'Our methodology', href: '/company/methodology' }],
    caveat:
      'The accounting specialist supports internal review of software logic. ODOOVATIONS builds accounting software; it does not offer bookkeeping, tax filing or outsourced accounting services.',
  },
  {
    id: 'infrastructure',
    group: 'infrastructure',
    name: 'Infrastructure & Server Operations',
    headline: 'Infrastructure Behind Reliable Digital Systems.',
    description: 'Server and deployment operations support the hosting and release of the systems the other departments build.',
    roles: [
      { id: 'server-manager', title: 'Server Manager', count: 1 },
      { id: 'server-ops', title: 'Server Operations Specialist', count: 1 },
    ],
    capabilities: [
      'Hosting administration',
      'Server configuration',
      'Deployment coordination',
      'Environment management',
      'Application monitoring',
      'Infrastructure troubleshooting',
      'Backup and recovery coordination',
      'Access management',
    ],
    inDelivery: 'Prepare environments and support deployment.',
    services: [{ label: 'Odoo Support & Maintenance', href: '/services/odoo-support-maintenance' }],
    caveat: 'No 24/7 monitoring, uptime guarantee, disaster-recovery guarantee or certification is claimed.',
  },
  {
    id: 'sales-business-development',
    group: 'sales-client',
    name: 'Sales & Business Development',
    headline: 'Connecting Businesses With the Right Technology.',
    description:
      'Our sales and business development team serves as an important point of connection between prospective clients and our technical specialists, helping businesses explore relevant technology services and communicate their requirements.',
    roles: [{ id: 'sales-executive', title: 'Sales Executives', count: 2, note: 'Both Sales Executive roles are held by women.' }],
    capabilities: [
      'Client enquiries',
      'Sales communication',
      'Service introductions',
      'Follow-up coordination',
      'Project requirement discussions',
      'Client relationship support',
      'Coordination with technical departments',
    ],
    inDelivery: 'Take the first enquiry and carry the requirement to the right technical team.',
    services: [{ label: 'Discuss a project', href: '/contact#form' }],
    caveat: 'Only the title Sales Executive has been confirmed. No senior sales or business-development titles are used.',
  },
  {
    id: 'reception-front-desk',
    group: 'office-operations',
    name: 'Reception & Front Desk Operations',
    headline: 'The First Point of Contact Matters.',
    description:
      'Our front desk team supports communication, visitor coordination and the daily administrative experience that keeps office interactions organised and professional.',
    roles: [{ id: 'receptionist', title: 'Receptionists', count: 2, note: 'One woman and one man, with equal standing. No hierarchy between them has been reported.' }],
    capabilities: [
      'Reception duties',
      'Visitor coordination',
      'General enquiries',
      'Call handling',
      'Meeting coordination',
      'Administrative assistance',
    ],
    inDelivery: 'Receive visitors and calls, and coordinate meetings with the right people.',
    services: [{ label: 'Contact', href: '/contact' }],
  },
  {
    id: 'client-communication',
    group: 'sales-client',
    name: 'Client Communication & Service Coordination',
    headline: 'Smooth Interactions Between Clients and Departments.',
    description:
      'Our client-facing teams include both men and women working across communication, enquiries and service coordination, supporting smooth interactions between customers and the relevant departments.',
    roles: [{ id: 'client-communication-staff', title: 'Client communication & service coordination staff', count: null, note: 'Headcount not yet confirmed. Some of these people may also be counted in the Sales or Reception teams.' }],
    capabilities: [
      'Inbound client communication',
      'Outbound customer follow-ups',
      'Service-related enquiries',
      'Meeting arrangements',
      'Coordination with internal teams',
      'Enquiry routing',
    ],
    inDelivery: 'Keep clients and the relevant departments in step with each other.',
    services: [{ label: 'Contact', href: '/contact' }],
    caveat:
      'This is not described as a call centre, an international calling division or a round-the-clock support service. Not everyone who makes calls is a sales employee.',
  },
  {
    id: 'extended-collaboration',
    group: 'extended',
    name: 'Extended Collaboration Network',
    headline: 'Additional Expertise, When a Project Needs It.',
    description:
      'ODOOVATIONS also works with freelance resources when a project calls for them. They are external collaborators, distinct from the core team above.',
    roles: [{ id: 'freelance-network', title: 'Freelance collaborators', count: null, note: 'Number and specialties not yet confirmed. Not counted as permanent employees.' }],
    capabilities: ['Specialist support on suitable projects'],
    inDelivery: 'Add capacity or a specialism alongside the core team.',
    services: [{ label: 'Discuss a project', href: '/contact#form' }],
    caveat: 'No worldwide employee network or additional offices are implied.',
  },
];

/* ---------------------------------------------------------------------- *
 * Counts
 * ---------------------------------------------------------------------- */

/**
 * Set this ONLY to a number the owner has confirmed as unique people, after
 * checking: every position is a separate person; no one holds two roles;
 * interns are included as intended; which roles are employees, contractors or
 * freelancers. While it is null no page shows an overall headcount.
 */
export const verifiedUniqueEmployees: number | null = null;

export function departmentRolePositions(d: Department): number {
  return d.roles.reduce((n, r) => n + (r.count ?? 0), 0);
}

/** Sum of REPORTED ROLE POSITIONS. Internal check; not a public headcount. */
export function reportedRolePositions(): number {
  return departments.reduce((n, d) => n + departmentRolePositions(d), 0);
}

export function internPositions(): number {
  return departments.flatMap((d) => d.roles).filter((r) => r.intern).reduce((n, r) => n + (r.count ?? 0), 0);
}

/** Reported role positions across every department in a group. */
export function groupRolePositions(id: DepartmentGroupId): number {
  return departmentsInGroup(id).reduce((n, d) => n + departmentRolePositions(d), 0);
}

/**
 * Group count for a card. A group containing a department whose headcount is
 * unconfirmed says so instead of presenting a partial sum as the whole.
 */
export function groupCountLabel(id: DepartmentGroupId): string {
  const ds = departmentsInGroup(id);
  const unconfirmed = ds.some((d) => d.roles.some((r) => r.count === null));
  const n = groupRolePositions(id);
  if (n === 0) return 'Headcount not confirmed';
  const base = `${n} reported ${n === 1 ? 'role' : 'roles'}`;
  return unconfirmed ? `${base}, plus staff not yet counted` : base;
}

export function getDepartment(id: string): Department {
  const d = departments.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown department: ${id}`);
  return d;
}

export function getRole(departmentId: string, roleId: string): TeamRole {
  const r = getDepartment(departmentId).roles.find((x) => x.id === roleId);
  if (!r) throw new Error(`Unknown role: ${departmentId}/${roleId}`);
  return r;
}

export function departmentsInGroup(id: DepartmentGroupId): Department[] {
  return departments.filter((d) => d.group === id);
}

/** The count line shown in a department header; says "not confirmed" rather than 0. */
export function countLabel(d: Department): string {
  const known = d.roles.filter((r) => r.count !== null);
  if (known.length === 0) return 'Headcount not confirmed';
  const n = departmentRolePositions(d);
  return `${n} reported ${n === 1 ? 'role' : 'roles'}`;
}

/* ---------------------------------------------------------------------- *
 * Individual profiles
 * ---------------------------------------------------------------------- */

/**
 * Empty on purpose. A person appears on the site only when ALL of these hold:
 * the name, title and photograph are real, the person has agreed to be shown,
 * and `approved` is true. Never add a profile with a generated or stock face.
 * A profile attaches to a role; it does not add to any count.
 */
export interface TeamProfile {
  name: string;
  departmentId: string;
  roleId: string;
  /** Path under /public/team/. Omit to show a typographic card instead. */
  photo?: string;
  photoAlt?: string;
  approved: boolean;
}

export const profiles: TeamProfile[] = [];

export function approvedProfiles(): TeamProfile[] {
  return profiles.filter((p) => p.approved);
}

/* ---------------------------------------------------------------------- *
 * Senior supervisor — reported experience
 * ---------------------------------------------------------------------- */

/**
 * Owner-reported experience of ONE individual. It is not the age of the
 * company or the experience of the team. No name, history or achievements are
 * published because none were supplied.
 */
export const seniorSupervisorExperience = {
  reportedYears: '50+',
  roleId: 'senior-supervisor',
  departmentId: 'business-operations',
  /**
   * The experience figure describes one identifiable person, so showing it is
   * a decision rather than a default. Set to false and every page that shows
   * it removes it. It is true because the owner reported the figure and asked
   * for it to be featured; confirm the supervisor has agreed before launch.
   */
  approvedForPublication: true,
};

/* ---------------------------------------------------------------------- *
 * Context lines for service pages
 * ---------------------------------------------------------------------- */

/** One sentence tying a service division to the people who deliver it. */
export function teamFactForDivision(divisionId: string): { text: string; href: string } | null {
  const href = '/company/team';
  switch (divisionId) {
    case 'odoo-erp': {
      const d = getDepartment('odoo-engineering');
      const s = getRole(d.id, 'senior-odoo-dev').count;
      const o = getRole(d.id, 'odoo-dev').count;
      return { text: `Delivered by our Odoo engineering department: ${s} senior Odoo developer roles and ${o} Odoo developer roles, reviewed by accounting and inventory specialists.`, href };
    }
    case 'ai-automation':
      return { text: 'Built by our AI automation and LLM specialists, with a dedicated data science role, and a person reviewing anything sensitive.', href };
    case 'creative':
      return { text: 'Produced by our video editors, motion graphics and animation specialists and graphic designers.', href };
    case 'custom-software':
      return { text: 'Engineered by our software development teams and checked by QA testers before delivery.', href };
    default:
      return null;
  }
}
