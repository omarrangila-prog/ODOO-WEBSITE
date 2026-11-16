/**
 * Client-side checks on what the agent asks the browser to do. The agent can suggest a page; it cannot open an
 * outside URL, run code or submit anything.
 */
const PATH = /^\/[a-z0-9\-/]*$/;

/** Returns a safe internal path, or null. Accepts full odoovations.com URLs and strips query and hash. */
export function safeInternalPath(input: unknown, allowed: ReadonlySet<string>): string | null {
  let s = String(input ?? '').trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s);
      if (!/(^|\.)odoovations\.com$/i.test(u.hostname)) return null;
      s = u.pathname;
    } catch {
      return null;
    }
  }
  s = s.split(/[?#]/)[0]!.replace(/\/$/, '') || '/';
  if (!PATH.test(s)) return null;
  return allowed.has(s) ? s : null;
}

/** A short topic label for the contact form's "interest" field: letters, numbers and simple punctuation only. */
export function safeTopic(input: unknown): string {
  const s = String(input ?? '').replace(/\s+/g, ' ').trim().slice(0, 120);
  return /^[\p{L}\p{N} ,.()\-–—/&:+'’]{3,120}$/u.test(s) ? s : '';
}
