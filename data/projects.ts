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
     NEEDS VERIFICATION — names supplied in the brief. No evidence exists in
     this repository. None of these render anywhere until the matrix in
     audit/project-verification-matrix.md is completed and the status and
     evidence fields are updated by a person with the facts.
     --------------------------------------------------------------------- */
  { id: 'kccia-election', name: 'KCCIA Election System', status: 'NEEDS_VERIFICATION', categories: ['Election', 'Custom Software'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Organisation name, permission to name, scope, launch date, technology and screenshots all required before any publication.' } },
  { id: 'al-jadeed-election', name: 'Al Jadeed Election System', status: 'NEEDS_VERIFICATION', categories: ['Election', 'Custom Software'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Same verification as KCCIA. Client name must not appear publicly on the strength of the brief alone.' } },
  { id: 'kccs-software', name: 'KCCS Software', status: 'NEEDS_VERIFICATION', categories: ['Custom Software'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Acronym meaning unknown. Do not guess. No description until confirmed.' } },
  { id: 'scrabble-timer', name: 'Scrabble Tournament Timer', status: 'NEEDS_VERIFICATION', categories: ['Events', 'Custom Software'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Feature list (timer, pairing, scores, rankings, check-in, leaderboard) must be confirmed against the actual build before display.' } },
  { id: 'whatsapp-karobar-os', name: 'WhatsApp Karobar OS', status: 'NEEDS_VERIFICATION', categories: ['WhatsApp', 'AI', 'Custom Software'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Confirm exact official name and whether this is a client project, internal product, prototype or concept before describing capabilities.' } },
  { id: 'whatsapp-digital-connection', name: 'WhatsApp Digital Connection', status: 'NEEDS_VERIFICATION', categories: ['WhatsApp', 'Automation'], evidence: { found: false, screenshots: false, clientApproval: false, countryPublic: false, notes: 'Document-delivery integration (software -> queue -> document API -> WhatsApp). Confirm it exists as a delivered build.' } },
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
