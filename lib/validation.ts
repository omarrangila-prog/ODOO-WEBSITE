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

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const phoneRegex = /^[+]?[\d\s()\-]{7,20}$/;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Name is too long.'),
  company: z
    .string()
    .trim()
    .min(2, 'Please enter your company name.')
    .max(160, 'Company name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Work email is required.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone or WhatsApp number is required.')
    .regex(phoneRegex, 'Please enter a valid phone number.'),
  country: z.string().trim().min(1, 'Please select your country.'),
  industry: z.string().trim().min(1, 'Please select an industry.'),
  companySize: z.string().trim().min(1, 'Please select company size.'),
  currentSystems: z.string().trim().max(400).optional().or(z.literal('')),
  timeline: z.string().trim().max(60).optional().or(z.literal('')),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  challenge: z
    .string()
    .trim()
    .min(10, 'Please describe your main challenge (at least 10 characters).')
    .max(2000, 'Please keep this under 2000 characters.'),
  services: z.array(z.string()).min(1, 'Please select at least one service.'),
  preferredContact: z.enum(['whatsapp', 'email', 'call'], {
    errorMap: () => ({ message: 'Please choose a preferred contact method.' }),
  }),
  // "consent" here is the privacy/contact permission required to submit the form
  // (transactional). It is NOT marketing consent.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy terms to continue.' }),
  }),
  // Separate, optional marketing opt-in.
  marketingConsent: z.union([z.boolean(), z.literal('true'), z.literal('false'), z.literal('')]).optional(),
  // Anonymous session snapshot (JSON string) attached on voluntary identification.
  sessionData: z.string().max(4000).optional().or(z.literal('')),
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
  if (size > MAX_FILE_SIZE) return 'File exceeds the 10 MB limit.';
  if (!ACCEPTED_FILE_TYPES.includes(type as (typeof ACCEPTED_FILE_TYPES)[number])) {
    return 'This file type is not supported.';
  }
  if (name.length > 200) return 'File name is too long.';
  return null;
}
