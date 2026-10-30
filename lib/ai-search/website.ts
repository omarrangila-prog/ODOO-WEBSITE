/**
 * Validation of the website address on the AI Search enquiry form.
 *
 * The site never fetches the address a visitor types: nothing server-side requests it, so there is
 * no request to forge. It is still checked, because the address is shown to the team and clicked,
 * and a form that accepts `javascript:` or an internal address is a poor form. A person at
 * ODOOVATIONS opens the site themselves. If a scanner that fetches pages is ever added, it must
 * resolve the hostname itself, refuse private, loopback and link-local addresses, refuse redirects
 * to them, cap size, time and rate, and must not reuse this check as its only protection.
 */

const MAX = 200;
const BLOCKED_SUFFIXES = ['.local', '.localhost', '.internal', '.lan', '.home', '.corp', '.intranet', '.test', '.invalid', '.example'];

export type WebsiteResult = { ok: true; url: string; host: string } | { ok: false; error: string };

export function normalizeWebsite(input: string): WebsiteResult {
  const raw = input.trim();
  if (!raw) return { ok: false, error: 'Please enter your website address.' };
  if (raw.length > MAX) return { ok: false, error: 'That address is too long.' };
  if (/\s/.test(raw)) return { ok: false, error: 'A website address cannot contain spaces.' };

  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw);
  // "example.com:8080" has no scheme in practice; a real scheme is followed by //.
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : hasScheme && !/^[a-z0-9.-]+:\d+/i.test(raw) ? raw : `https://${raw}`;

  let u: URL;
  try {
    u = new URL(withScheme);
  } catch {
    return { ok: false, error: 'Please enter a valid website address, such as example.com.' };
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return { ok: false, error: 'Only http and https addresses are accepted.' };
  if (u.username || u.password) return { ok: false, error: 'Please remove any username or password from the address.' };

  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (host === 'localhost' || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) return { ok: false, error: 'Please enter a public website address.' };
  if (!host.includes('.')) return { ok: false, error: 'Please enter a full website address, such as example.com.' };
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(':') || host.startsWith('[')) return { ok: false, error: 'Please use the website’s name, not a numeric address.' };
  if (!/^[a-z0-9.-]+$/.test(host) && !host.startsWith('xn--') && !/[^\x00-\x7f]/.test(u.hostname)) return { ok: false, error: 'That website address looks wrong.' };

  return { ok: true, url: `${u.protocol}//${u.host}${u.pathname === '/' ? '' : u.pathname}`, host };
}
