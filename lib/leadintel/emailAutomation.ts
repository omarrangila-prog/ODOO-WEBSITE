/**
 * Email automation.
 *
 *  - Transactional emails always send (they answer the person's own enquiry) —
 *    they do NOT require marketing consent, only that the person contacted us.
 *  - Marketing sequences ONLY enrol when marketingConsent === true.
 *  - A suppression list (unsubscribes + hard bounces) blocks ALL marketing and
 *    is checked before every marketing send. Transactional still allowed.
 *  - When RESEND_API_KEY is missing, runs a MOCK sender (records intent) so the
 *    flow is testable without credentials.
 */

export type EmailKind = 'transactional' | 'marketing';

export interface EmailJob {
  to: string;
  kind: EmailKind;
  template: string;
  subject: string;
}

/* ---- Suppression list (mock persistence; replace with DB/provider list) ---- */
const suppression = new Set<string>();
export function _resetEmail() { suppression.clear(); sent.length = 0; }
export function unsubscribe(email: string): void { suppression.add(email.toLowerCase()); }
export function isSuppressed(email: string): boolean { return suppression.has(email.toLowerCase()); }

export interface SendResult {
  ok: boolean;
  mode: 'live' | 'mock';
  skipped?: 'suppressed' | 'no_consent';
  error?: string;
}

const sent: EmailJob[] = [];
export function _sentLog(): EmailJob[] { return sent; }

function hasEmailCreds(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const SITE = 'https://odoovations.com';

/**
 * Plain-text bodies for the templates that have been written. Until now the live
 * sender put the template key in the body, so a customer's acknowledgement read
 * "[enquiry_received]". Only these are sent; anything else is refused above.
 *
 * The acknowledgement says only what is true: a person reads the enquiry and
 * replies in Pakistan business hours; there is no automatic quote.
 */
export function renderBody(job: EmailJob): string | null {
  const sign = ['ODOOVATIONS', 'Karachi, Pakistan', 'hello@odoovations.com'].join('\n');
  if (job.template === 'enquiry_received') {
    return [
      'Hello,',
      '',
      'Thank you for contacting ODOOVATIONS. We have received your enquiry.',
      '',
      'What happens next:',
      '1. A member of the team reads it and replies during Pakistan business hours, usually with a few questions or a suggested next step.',
      '2. If it makes sense, we propose a short call and then a written scope.',
      '',
      'There is no automatic quote and no obligation. If it is urgent, message us on WhatsApp: https://wa.me/923347037531',
      '',
      sign,
    ].join('\n');
  }
  if (job.template === 'welcome_guide') {
    return [
      'Hello,',
      '',
      'You asked to receive occasional guides and updates from ODOOVATIONS. Two places to start:',
      '',
      `- Odoo Community vs Enterprise: ${SITE}/resources/odoo-community-vs-enterprise`,
      `- What an Odoo implementation costs in Pakistan: ${SITE}/resources/odoo-implementation-cost-pakistan`,
      '',
      `To stop these emails, open ${SITE}/api/unsubscribe?email=${encodeURIComponent(job.to)} or reply to this message and we will remove you.`,
      '',
      sign,
    ].join('\n');
  }
  return null;
}

export async function sendEmail(job: EmailJob, opts: { forceFail?: boolean } = {}): Promise<SendResult> {
  const mode: SendResult['mode'] = hasEmailCreds() ? 'live' : 'mock';

  // Marketing must respect the suppression list.
  if (job.kind === 'marketing' && isSuppressed(job.to)) {
    return { ok: false, mode, skipped: 'suppressed' };
  }
  if (opts.forceFail) {
    return { ok: false, mode, error: 'Email provider unavailable (simulated)' };
  }

  if (mode === 'mock') {
    sent.push(job);
    return { ok: true, mode };
  }

  // LIVE (Resend)
  const text = renderBody(job);
  if (text === null) {
    // Never send a message whose body is a template key. A template with no written
    // content is not sent at all.
    return { ok: false, mode, error: `No written content for template "${job.template}"` };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL ?? 'hello@odoovations.com', to: job.to, subject: job.subject, text }),
    });
    if (!res.ok) throw new Error(`Resend HTTP ${res.status}`);
    sent.push(job);
    return { ok: true, mode };
  } catch (e) {
    return { ok: false, mode, error: e instanceof Error ? e.message : 'email error' };
  }
}

/** The consent-gated marketing sequence (enrolled only with marketing consent). */
export const MARKETING_SEQUENCE: { day: number; template: string; subject: string }[] = [
  { day: 0, template: 'welcome_guide', subject: 'Your Odoo starting point' },
  { day: 3, template: 'community_vs_enterprise', subject: 'Odoo Community vs Enterprise — which fits you' },
  { day: 7, template: 'implementation_timeline', subject: 'What a realistic Odoo timeline looks like' },
  { day: 14, template: 'book_review', subject: 'Ready for a free workflow review?' },
];

export interface AutomationOutcome {
  transactional: SendResult;
  marketingEnrolled: boolean;
  marketingSkippedReason?: 'no_consent' | 'suppressed';
  sequenceSteps: number;
}

/**
 * Runs after a successful lead. Sends the transactional acknowledgement always;
 * enrols the marketing sequence ONLY with marketing consent and if not suppressed.
 */
export async function runPostLeadEmails(input: {
  email: string;
  marketingConsent: boolean;
  contactPermission: boolean;
  opts?: { forceFailTransactional?: boolean };
}): Promise<AutomationOutcome> {
  // Transactional acknowledgement — always (it answers their own request).
  const transactional = await sendEmail(
    { to: input.email, kind: 'transactional', template: 'enquiry_received', subject: 'We received your enquiry — ODOOVATIONS' },
    { forceFail: input.opts?.forceFailTransactional },
  );

  if (!input.marketingConsent) {
    return { transactional, marketingEnrolled: false, marketingSkippedReason: 'no_consent', sequenceSteps: 0 };
  }
  if (isSuppressed(input.email)) {
    return { transactional, marketingEnrolled: false, marketingSkippedReason: 'suppressed', sequenceSteps: 0 };
  }

  // Enrol: send day-0 now; the rest are scheduled by the provider/cron in prod.
  await sendEmail({ to: input.email, kind: 'marketing', template: MARKETING_SEQUENCE[0]!.template, subject: MARKETING_SEQUENCE[0]!.subject });
  return { transactional, marketingEnrolled: true, sequenceSteps: MARKETING_SEQUENCE.length };
}
