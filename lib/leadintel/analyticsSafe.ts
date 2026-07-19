/**
 * PII-safe analytics guard. GA4/Plausible events must never carry personal data.
 * `sanitizeEventProps` strips/blocks any prop that looks like PII (email, phone,
 * name, message) and returns a cleaned object. `assertNoPii` throws in tests.
 */

const PII_KEYS = ['email', 'phone', 'name', 'fullname', 'full_name', 'message', 'challenge', 'address'];
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_RE = /(?:\+?\d[\d\s()-]{7,}\d)/;

export function looksLikePii(key: string, value: unknown): boolean {
  if (PII_KEYS.includes(key.toLowerCase())) return true;
  if (typeof value === 'string') {
    if (EMAIL_RE.test(value)) return true;
    if (PHONE_RE.test(value)) return true;
  }
  return false;
}

export function sanitizeEventProps(props: Record<string, unknown>): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) {
    if (looksLikePii(k, v)) continue; // drop PII
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') clean[k] = v;
  }
  return clean;
}

/** Test/dev helper — throws if any PII is present. */
export function assertNoPii(props: Record<string, unknown>): void {
  for (const [k, v] of Object.entries(props)) {
    if (looksLikePii(k, v)) throw new Error(`PII detected in analytics prop "${k}"`);
  }
}
