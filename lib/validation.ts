import { z } from 'zod';

/** Accepted upload types and size, shared by client and server. */
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
] as const;

export const ACCEPTED_FILE_EXTENSIONS =
  '.pdf,.xls,.xlsx,.csv,.doc,.docx,.png,.jpg,.jpeg';

const ACCEPTED_EXTENSION_SET = new Set(
  ACCEPTED_FILE_EXTENSIONS.split(',').map((e) => e.trim().toLowerCase()),
);

/*
 * 4 MB, not 10. The file travels inside the form POST, and a Vercel function
 * rejects any request body over 4.5 MB before our code runs, so a larger limit
 * promised uploads that could never arrive. The file is attached to the
 * notification email; it is not stored anywhere else.
 */
export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

/** True when MIME is accepted, or when MIME is empty and the extension is known (CSV often has type ""). */
export function isAcceptedUpload(name: string, type: string): boolean {
  if (type && ACCEPTED_FILE_TYPES.includes(type as (typeof ACCEPTED_FILE_TYPES)[number])) {
    return true;
  }
  const dot = name.lastIndexOf('.');
  if (dot < 0) return false;
  const ext = name.slice(dot).toLowerCase();
  return ACCEPTED_EXTENSION_SET.has(ext);
}

const phoneRegex = /^[+]?[\d\s()\-]{7,20}$/;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Name is too long.'),
  /*
   * Stage 2 of the enquiry form is optional, so everything it collects must
   * be optional here too. Asking twelve questions before a stranger will
   * talk to us cost enquiries we never saw; name, email and a description
   * are enough to reply usefully. Lead scoring already treats these as
   * optional, and the notification email omits whatever is blank.
   */
  company: z.string().trim().max(160, 'Company name is too long.').optional().or(z.literal('')),
  email: z
    .string()
    .trim()
    .min(1, 'Work email is required.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone number.')
    .optional()
    .or(z.literal('')),
  country: z.string().trim().max(120).optional().or(z.literal('')),
  industry: z.string().trim().max(120).optional().or(z.literal('')),
  companySize: z.string().trim().max(120).optional().or(z.literal('')),
  currentSystems: z.string().trim().max(400).optional().or(z.literal('')),
  timeline: z.string().trim().max(60).optional().or(z.literal('')),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  challenge: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters.')
    .max(2000, 'Please keep this under 2000 characters.'),
  // Optional: a CTA often preselects this, and a visitor who is unsure of
  // the category should not be blocked from describing their problem.
  services: z.array(z.string()).default([]),
  preferredContact: z
    .enum(['whatsapp', 'email', 'call'])
    .optional()
    .or(z.literal('')),
  // "consent" here is the privacy/contact permission required to submit the form
  // (transactional). It is NOT marketing consent.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy terms to continue.' }),
  }),
  // Separate, optional marketing opt-in.
  marketingConsent: z.union([z.boolean(), z.literal('true'), z.literal('false'), z.literal('')]).optional(),
  // Anonymous session snapshot (JSON string) attached on voluntary identification.
  sessionData: z.string().max(4000).optional().or(z.literal('')),
  // The enquiry path chosen at the top of the form (data/enquiry-paths.ts) and its answers as a
  // small JSON string. The server re-reads both against the path's own definition.
  pathId: z.string().max(40).optional().or(z.literal('')),
  pathAnswers: z.string().max(1200).optional().or(z.literal('')),
  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Server-side file validation (metadata only). */
export function validateFileMeta(
  name: string,
  size: number,
  type: string,
): string | null {
  if (size > MAX_FILE_SIZE) return 'File exceeds the 4 MB limit. Send larger files by WhatsApp or email.';
  if (!isAcceptedUpload(name, type)) {
    return 'This file type is not supported.';
  }
  if (name.length > 200) return 'File name is too long.';
  return null;
}
