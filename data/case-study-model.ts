/**
 * CASE STUDY MODEL
 *
 * The structure a real case study must satisfy before it is published, and
 * the gate that enforces it. Every record below is generated from
 * data/projects.ts and starts as `awaiting-assets`; the words for the three that
 * are published live in data/case-study-content.ts. See docs/CASE-STUDIES.md for
 * the owner workflow.
 *
 * HOW THE PIECES FIT
 *  - data/projects.ts stays the registry of which projects exist and what may
 *    be said about them. It is not duplicated here.
 *  - `caseStudyContent` below is where owner-supplied material is added.
 *  - `isPublishable()` is the only way a record reaches the public site, and
 *    it refuses anything incomplete, unapproved or un-redacted. Setting
 *    `status: 'published'` on its own does nothing if a check fails.
 *
 * Nothing here is fabricated. A field that has not been supplied is
 * undefined, never a placeholder sentence.
 */
import { publishableProjects, type Project, type ProjectStatus } from './projects';
import { caseStudyContentRecords } from './case-study-content';

export type PublishStatus =
  | 'draft'
  | 'awaiting-assets'
  | 'under-review'
  | 'approved'
  | 'published'
  | 'archived';

export const publishStatusLabel: Record<PublishStatus, string> = {
  draft: 'Draft',
  'awaiting-assets': 'Awaiting assets',
  'under-review': 'Under review',
  approved: 'Approved',
  published: 'Published',
  archived: 'Archived',
};

export type MediaKind = 'cover' | 'desktop' | 'mobile' | 'dashboard' | 'gallery';

export interface CaseStudyImage {
  /** Path under /public/case-studies/<slug>/ */
  src: string;
  width: number;
  height: number;
  /** Describes what the screenshot shows. Required: an image without it never publishes. */
  alt: string;
  caption?: string;
  kind: MediaKind;
  /** The owner has approved this exact image for publication. */
  approved: boolean;
  /** Credentials, personal data and confidential figures have been removed from it. */
  redacted: boolean;
}

export interface CaseStudyVideo {
  src: string;
  poster: string;
  caption?: string;
  approved: boolean;
}

/** Every box must be true before any screenshot or text from the project is shown. */
export interface PrivacyChecklist {
  credentialsRemoved: boolean;
  personalDataRedacted: boolean;
  financialDataRedacted: boolean;
  phoneNumbersRemoved: boolean;
  confidentialInfoRemoved: boolean;
  /** The client has approved publication of this project. */
  clientApproved: boolean;
  /** The screenshots are of the real delivered system, not mock-ups. */
  screenshotsAuthentic: boolean;
}

export interface CaseStudyOutcome {
  statement: string;
  /** Where the figure comes from. An outcome without evidence never publishes. */
  evidence: string;
  measuredOver?: string;
}

/** The working demonstrations in components/work/demos. Each is built with invented data and labelled as such. */
export type DemoKind = 'election' | 'timer' | 'delivery';

export interface CaseStudyContent {
  status?: PublishStatus;
  serviceCategory?: string;
  /** Name the client may be shown under. Falls back to the project name only. */
  clientDisplayName?: string;
  overview?: string;
  problem?: string;
  requirements?: string[];
  solution?: string;
  modules?: string[];
  capabilities?: string[];
  stack?: string[];
  integrations?: string[];
  delivery?: string;
  deploymentStatus?: string;
  supportScope?: string;
  cover?: CaseStudyImage;
  screenshots?: CaseStudyImage[];
  video?: CaseStudyVideo;
  outcomes?: CaseStudyOutcome[];
  testimonial?: { quote: string; attribution: string; approved: boolean };
  privacy?: Partial<PrivacyChecklist>;
  seo?: { title?: string; description?: string };
  /**
   * A working demonstration standing in for screenshots that do not exist. It is a different
   * thing from a screenshot and is always labelled "Demonstration · sample data". It never
   * counts as evidence that the delivered system looks or behaves a particular way.
   */
  demonstration?: { kind: DemoKind; heading: string; intro: string };
  /** What the system covers, one line each, in plain words. Same source as `capabilities`. */
  scope?: { title: string; detail: string }[];
  /**
   * Questions a buyer of this kind of system should settle first. They are advice about the
   * class of system, not statements about the client's project.
   */
  briefing?: { heading: string; intro: string; questions: string[] };
  /** Enquiry path (data/enquiry-paths.ts) the closing call to action opens. */
  enquiryPath?: string;
  relatedServices?: { label: string; href: string }[];
  /** Where the facts on this page came from. */
  factsSource?: string;
}

export interface CaseStudyRecord extends Omit<CaseStudyContent, 'privacy' | 'status'> {
  id: string;
  /** Matches an id in data/projects.ts */
  projectId: string;
  slug: string;
  name: string;
  classification: ProjectStatus;
  industry?: string;
  /** From data/projects.ts: what the system is for, in management's words. */
  purpose?: string;
  countryCode?: string;
  /** The client has agreed to be named. */
  clientNamingPermission: boolean;
  status: PublishStatus;
  privacy: PrivacyChecklist;
}

const emptyPrivacy: PrivacyChecklist = {
  credentialsRemoved: false,
  personalDataRedacted: false,
  financialDataRedacted: false,
  phoneNumbersRemoved: false,
  confidentialInfoRemoved: false,
  clientApproved: false,
  screenshotsAuthentic: false,
};

/**
 * OWNER-SUPPLIED CONTENT, keyed by project id. Empty today.
 *
 * To add a case study: put the assets in public/case-studies/<project-id>/,
 * add an entry here, set `status: 'under-review'`, and run
 * `npm run case-study:check`. Only when that reports no blockers should the
 * status be moved to 'published'.
 */
export const caseStudyContent: Record<string, CaseStudyContent> = caseStudyContentRecords;

/** Real work only. Demonstrations, concepts and unverified names have no case study. */
const REAL_WORK: ProjectStatus[] = ['CLIENT_PROJECT', 'ANONYMISED_PROJECT', 'INTERNAL_PRODUCT', 'PROTOTYPE'];

function toRecord(p: Project): CaseStudyRecord {
  const c = caseStudyContent[p.id] ?? {};
  const { privacy, status, ...rest } = c;
  return {
    ...rest,
    id: p.id,
    projectId: p.id,
    slug: p.id,
    name: p.name,
    classification: p.status,
    industry: p.industry,
    purpose: p.purpose,
    countryCode: p.evidence.countryPublic ? p.countryCode : undefined,
    clientNamingPermission: p.evidence.clientApproval,
    status: status ?? 'awaiting-assets',
    privacy: { ...emptyPrivacy, ...privacy },
  };
}

export function caseStudyRecords(): CaseStudyRecord[] {
  return publishableProjects().filter((p) => REAL_WORK.includes(p.status)).map(toRecord);
}

/** Every reason a record cannot be published yet. Empty means it may be. */
export function blockers(r: CaseStudyRecord): string[] {
  const out: string[] = [];
  const need = (ok: unknown, why: string) => {
    if (!ok) out.push(why);
  };

  need(r.status === 'published', `status is "${r.status}", not "published"`);
  need(r.clientNamingPermission, 'client naming permission not recorded in data/projects.ts');

  need(r.overview, 'overview missing');
  need(r.problem || r.purpose, 'neither a problem statement nor a purpose');
  need(r.solution || (r.scope && r.scope.length > 0), 'neither a solution nor a scope');

  const images = [r.cover, ...(r.screenshots ?? [])].filter((i): i is CaseStudyImage => Boolean(i));
  const hasRealMedia = images.length > 0 || Boolean(r.video);
  /*
   * Screenshots and video show the real delivered system, so each of the seven checks guards a
   * way they could leak something. With no real media there is nothing to redact, and only the
   * client's approval still applies. A demonstration is not real media: it is built here, with
   * invented data, and says so on the page.
   */
  for (const [k, v] of Object.entries(r.privacy)) {
    if (!hasRealMedia && k !== 'clientApproved') continue;
    need(v, `privacy check not confirmed: ${k}`);
  }
  need(hasRealMedia || r.demonstration, 'no screenshots and no demonstration supplied');
  for (const img of images) {
    need(img.alt.trim(), `image ${img.src} has no alt text`);
    need(img.approved, `image ${img.src} not approved`);
    need(img.redacted, `image ${img.src} not confirmed redacted`);
  }
  if (r.video) need(r.video.approved, `video ${r.video.src} not approved`);
  if (r.testimonial) need(r.testimonial.approved, 'testimonial not approved');
  for (const o of r.outcomes ?? []) need(o.evidence.trim(), `outcome "${o.statement}" has no evidence`);
  return out;
}

export function isPublishable(r: CaseStudyRecord): boolean {
  return blockers(r).length === 0;
}

export function publishedCaseStudies(): CaseStudyRecord[] {
  return caseStudyRecords().filter(isPublishable);
}

export function getPublishedCaseStudy(slug: string): CaseStudyRecord | undefined {
  return publishedCaseStudies().find((r) => r.slug === slug);
}

/** Link target for a project card: its case study if published, otherwise undefined. */
export function caseStudyHref(projectId: string): string | undefined {
  return publishedCaseStudies().some((r) => r.projectId === projectId) ? `/projects/${projectId}` : undefined;
}
