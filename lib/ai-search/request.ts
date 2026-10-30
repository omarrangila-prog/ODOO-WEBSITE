import { z } from 'zod';
import { normalizeWebsite } from './website';
import { getPlan, formatPrice } from '@/data/ai-search-pricing';

/** What the visitor is asking for. A free review is a conversation; only the audit and the plans are paid work, and none is charged by submitting this form. */
export const requestTypes = [
  { id: 'free-review', label: 'Free suitability review', note: 'A short conversation about whether AI search work makes sense for you. No report, no charge.' },
  { id: 'audit', label: `AI Search Audit (${formatPrice(getPlan('audit')!)})`, note: 'Asking is free. The audit is invoiced only after we agree the scope in writing.' },
  { id: 'plan', label: 'A monthly plan', note: 'Asking is free. A plan starts only after a written scope is agreed.' },
  { id: 'pricing', label: 'A question about pricing', note: 'We reply with an answer, not a sales sequence.' },
] as const;

export type RequestTypeId = (typeof requestTypes)[number]['id'];

export const planChoices = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'growth', label: 'Growth' },
  { id: 'authority', label: 'Authority' },
  { id: 'enterprise', label: 'Enterprise (custom quote)' },
  { id: 'not-sure', label: 'Not sure yet' },
] as const;

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const aiSearchSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name.').max(120, 'That name is too long.'),
  email: z.string().trim().min(1, 'Please enter your email.').email('Please enter a valid email address.'),
  website: z.string().trim().superRefine((v, ctx) => {
    const r = normalizeWebsite(v);
    if (!r.ok) ctx.addIssue({ code: 'custom', message: r.error });
  }),
  requestType: z.enum(['free-review', 'audit', 'plan', 'pricing'], { errorMap: () => ({ message: 'Please choose what you are asking for.' }) }),
  company: opt(160),
  market: opt(120),
  competitors: opt(400),
  plan: z.enum(['foundation', 'growth', 'authority', 'enterprise', 'not-sure']).optional().or(z.literal('')),
  problem: opt(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept the privacy terms to continue.' }) }),
  marketingConsent: z.union([z.boolean(), z.literal('true'), z.literal('false'), z.literal('')]).optional(),
  /** A random value made when the form loads; the same value never sends twice. */
  token: z.string().trim().min(8).max(64).regex(/^[A-Za-z0-9_-]+$/),
  /** Honeypot. Hidden from people; bots fill it. */
  nickname: z.string().max(0).optional().or(z.literal('')),
});

export type AiSearchValues = z.infer<typeof aiSearchSchema>;
