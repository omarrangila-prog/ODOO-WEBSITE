import { randomBytes } from 'node:crypto';

/**
 * A short reference for one enquiry, e.g. "ODV-20261030-7K3QF". It goes in the notification email and the
 * CRM description so the person, the inbox and the CRM record can be matched. Not a secret, not PII.
 */
export function leadRef(now: Date = new Date()): string {
  const d = now.toISOString().slice(0, 10).replace(/-/g, '');
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const tail = [...randomBytes(5)].map((b) => alphabet[b % alphabet.length]).join('');
  return `ODV-${d}-${tail}`;
}

/** The submitting page's path only: no query string, no host, bounded length. */
export function cleanLandingPath(v: unknown): string {
  const s = String(v ?? '').trim();
  return /^\/[A-Za-z0-9/_-]{0,200}$/.test(s) ? s : '';
}
