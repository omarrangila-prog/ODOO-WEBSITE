/**
 * PROJECT REGISTRY
 *
 * Every project ODOOVATIONS may want to show on the site, with an explicit
 * publication status. This is the gate between "a name was mentioned in a
 * brief" and "a claim appears on the public website".
 *
 * Rules:
 *  - Nothing renders publicly unless `status` is one of the PUBLISHABLE set
 *    AND `evidence.clientApproval` is true where a client is named.
 *  - A DEMO or CONCEPT is never presented as a CLIENT_PROJECT.
 *  - Timelines, outcomes and countries render only when `verified: true`.
 *  - `NEEDS_VERIFICATION` entries exist so the name is not lost, and so the
 *    verification matrix (audit/project-verification-matrix.md) has a row
 *    for it. They are invisible to the site and to the sitemap.
 *
 * The published portfolio (data/caseStudies.ts) currently contains only
 * DEMO scenarios, each labelled as such in the UI.
 */

export type ProjectStatus =
  | 'CLIENT_PROJECT'
  | 'ANONYMISED_PROJECT'
  | 'INTERNAL_PRODUCT'
  | 'PROTOTYPE'
  | 'DEMO'
  | 'CONCEPT'
  | 'NEEDS_VERIFICATION';

/** Statuses that may appear on the public site, subject to evidence checks. */
export const PUBLISHABLE: ProjectStatus[] = [
  'CLIENT_PROJECT',
  'ANONYMISED_PROJECT',
  'INTERNAL_PRODUCT',
  'PROTOTYPE',
  'DEMO',
];

export const statusLabel: Record<ProjectStatus, string> = {
  CLIENT_PROJECT: 'Client Project',
  ANONYMISED_PROJECT: 'Client Project (anonymised)',
  INTERNAL_PRODUCT: 'Internal Product',
  PROTOTYPE: 'Prototype',
  DEMO: 'Demonstration',
  CONCEPT: 'Concept',
  NEEDS_VERIFICATION: 'Unverified — not published',
};

export type ProjectCategory =
  | 'Custom Software'
  | 'AI'
  | 'Automation'
  | 'WhatsApp'
  | 'Odoo'
  | 'Accounting'
  | 'POS'
  | 'Export / Import'
  | 'Healthcare'
  | 'Election'
  | 'Events'
  | 'Web'
  | 'Marketing'
  | 'Creative';

export interface ProjectEvidence {
  /** Any artefact found: screenshots, repo, contract, deployed URL. */
  found: boolean;
  screenshots: boolean;
  /** Written permission from the client to be named publicly. */
  clientApproval: boolean;
  /** May the country of the client be stated? */
  countryPublic: boolean;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  industry?: string;
  /** ISO 3166-1 alpha-2. Rendered only when evidence.countryPublic. */
  countryCode?: string;
  evidence: ProjectEvidence;
  /** Short public description. Empty until verified for unverified entries. */
  summary?: string;
  /** Verified-only fields. */
  timeline?: { value: string; verified: boolean };
  outcome?: { value: string; verified: boolean };
  clientName?: { value: string; approved: boolean };
  caseStudySlug?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  /* ---------------------------------------------------------------------
     PUBLISHED — demonstration scenarios already live in data/caseStudies.ts
     --------------------------------------------------------------------- */
  { id: 'demo-textile-odoo', name: 'Odoo for a Textile Manufacturer', status: 'DEMO', categories: ['Odoo'], industry: 'Textile & Apparel', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'textile-manufacturer' },
  { id: 'demo-distribution-odoo', name: 'Odoo for a Distribution Business', status: 'DEMO', categories: ['Odoo'], industry: 'Distribution', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'distribution-company' },
  { id: 'demo-whatsapp-lead', name: 'WhatsApp Lead Qualification', status: 'DEMO', categories: ['WhatsApp', 'AI', 'Automation'], industry: 'Retail & E-commerce', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'whatsapp-lead-automation' },
  { id: 'demo-multibranch', name: 'Multi-Branch Inventory & Sales System', status: 'DEMO', categories: ['Custom Software', 'POS'], industry: 'Wholesale & Trading', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'multi-branch-inventory-sales' },
  { id: 'demo-b2b-site', name: 'B2B Lead-Generation Website', status: 'DEMO', categories: ['Web'], industry: 'Manufacturing', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'lead-generation-website' },
  { id: 'demo-campaign-crm', name: 'Campaign-to-CRM System', status: 'DEMO', categories: ['Marketing', 'Automation'], industry: 'Professional Services', evidence: { found: true, screenshots: false, clientApproval: false, countryPublic: false }, caseStudySlug: 'campaign-to-crm-system' },

  /* ---------------------------------------------------------------------
     CLIENT PROJECTS — confirmed by ODOOVATIONS management on 2026-09-12.
     Published on that confirmation. Each `summary` is limited to what
     management has stated about the system; no outcomes, dates or metrics
     are asserted because none have been supplied. Detailed case studies
     for these are available on request until written up with evidence.
     --------------------------------------------------------------------- */
  {
    id: 'kcci-election',
    name: 'KCCI Election System',
    status: 'CLIENT_PROJECT',
    categories: ['Election', 'Custom Software'],
    industry: 'Associations',
    countryCode: 'PK',
    evidence: { found: false, screenshots: false, clientApproval: true, countryPublic: true, notes: 'Client naming authorised by ODOOVATIONS management, 2026-09-12. Screenshots and scope document still to be supplied for a full case study.' },
    summary: 'Digital election management system built for an association election: member eligibility and registration, candidate management, polling-day workflow and results reporting with role-based access.',
  },
  {
    id: 'al-jadeed-election',
    name: 'Al Jadeed Election System',
    status: 'CLIENT_PROJECT',
    categories: ['Election', 'Custom Software'],
    industry: 'Real Estate',
    countryCode: 'PK',
    evidence: { found: true, screenshots: false, clientApproval: true, countryPublic: true, notes: 'Al Jadeed Properties appears in the Kausar Innovations client roster. Naming authorised by management, 2026-09-12.' },
    summary: 'Election management system for the Al Jadeed group: voter database, eligibility checks, candidate management, vote capture, results and audit reporting.',
  },
  {
    id: 'kcci-software',
    name: 'KCCI Software',
    status: 'CLIENT_PROJECT',
    categories: ['Custom Software'],
    countryCode: 'PK',
    evidence: { found: false, screenshots: false, clientApproval: true, countryPublic: true, notes: 'Naming authorised by management, 2026-09-12. Scope description not yet supplied.' },
    summary: 'Custom business software built for the Karachi Chamber of Commerce & Industry (KCCI). Scope details available on request.',
  },
  {
    id: 'scrabble-timer',
    name: 'Scrabble Tournament Timer',
    status: 'CLIENT_PROJECT',
    categories: ['Events', 'Custom Software'],
    industry: 'Events',
    countryCode: 'PK',
    evidence: { found: false, screenshots: false, clientApproval: true, countryPublic: true, notes: 'Confirmed by management, 2026-09-12.' },
    summary: 'Tournament timing and management software for competitive Scrabble events: game and round timers, player pairing, scoring, rankings, check-in and a live leaderboard. An example of the highly specific custom applications we build.',
  },
  {
    id: 'whatsapp-karobar-os',
    name: 'WhatsApp Karobar OS',
    status: 'INTERNAL_PRODUCT',
    categories: ['WhatsApp', 'AI', 'Custom Software'],
    evidence: { found: false, screenshots: false, clientApproval: true, countryPublic: false, notes: 'Confirmed by management, 2026-09-12, as an ODOOVATIONS product concept in delivery. Status to be corrected if it is a client build.' },
    summary: 'A business operating layer accessible from WhatsApp: customer messages, orders, invoices, stock, reminders, reports and AI assistance through conversational workflows connected to the business system behind them.',
  },
  {
    id: 'whatsapp-digital-connection',
    name: 'WhatsApp Digital Connection',
    status: 'CLIENT_PROJECT',
    categories: ['WhatsApp', 'Automation'],
    countryCode: 'PK',
    evidence: { found: false, screenshots: false, clientApproval: true, countryPublic: true, notes: 'Confirmed by management, 2026-09-12.' },
    summary: 'Document-delivery integration from business software to WhatsApp: a software command enters a job queue, the document API renders it, and the customer receives it on WhatsApp — invoices, statements, receipts, purchase orders, reports, reminders and order confirmations.',
  },
];

/** Projects the public site is permitted to render. */
export function publishableProjects(): Project[] {
  return projects.filter(
    (p) => PUBLISHABLE.includes(p.status) && (p.status !== 'CLIENT_PROJECT' || p.evidence.clientApproval),
  );
}

/** Rows awaiting a human decision — used to build the verification matrix. */
export function unverifiedProjects(): Project[] {
  return projects.filter((p) => p.status === 'NEEDS_VERIFICATION');
}
