/**
 * Anonymous visitor session — privacy-first, NO fingerprinting.
 *
 * A returning visitor is recognised ONLY by a random ID we generated and stored
 * in first-party localStorage. We never hash user-agent/canvas/fonts/IP or build
 * a device fingerprint. If storage is cleared, the visitor is simply "new" again.
 *
 * Data captured (all first-party, no PII until the user voluntarily identifies):
 *  - anonId              : random UUID (crypto)
 *  - firstTouch          : first UTM set + first landing page + first seen
 *  - lastTouch           : most recent UTM + referrer + last seen
 *  - pageViews           : count + recent paths
 *  - interestCategories  : derived from section/topic interactions (e.g. 'fbr')
 *  - visits              : count (returning-visitor recognition)
 *  - expiresAt           : anonymous data auto-expires (see EXPIRY_DAYS)
 *
 * On voluntary identification (form submit), this anonymous history is attached
 * to the lead so first-touch attribution and interests travel with them.
 */

export interface UtmSet {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface SessionData {
  anonId: string;
  visits: number;
  firstSeen: string;
  lastSeen: string;
  firstTouch: { utm: UtmSet; landingPage: string; referrer: string };
  lastTouch: { utm: UtmSet; page: string; referrer: string };
  pageViews: number;
  recentPaths: string[];
  interestCategories: string[];
  expiresAt: string;
}

export const SESSION_KEY = 'odv_session';
export const EXPIRY_DAYS = 180; // anonymous data retention window
const MAX_RECENT_PATHS = 20;

/** Cryptographically-random ID. Not derived from any device attribute. */
export function newAnonId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  // Fallback for environments without randomUUID.
  const b = new Uint8Array(16);
  (typeof crypto !== 'undefined' ? crypto : ({ getRandomValues: (a: Uint8Array) => a.map(() => Math.floor(Math.random() * 256)) } as Crypto)).getRandomValues(b);
  return [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function parseUtm(search: string): UtmSet {
  const p = new URLSearchParams(search);
  const val = (k: string) => p.get(k) || undefined;
  const utm: UtmSet = {
    source: val('utm_source'),
    medium: val('utm_medium'),
    campaign: val('utm_campaign'),
    term: val('utm_term'),
    content: val('utm_content'),
  };
  // Drop undefined keys for clean storage.
  return Object.fromEntries(Object.entries(utm).filter(([, v]) => v)) as UtmSet;
}

function expiryFrom(now: Date): string {
  return new Date(now.getTime() + EXPIRY_DAYS * 86_400_000).toISOString();
}

export function createSession(opts: {
  path: string;
  search: string;
  referrer: string;
  now?: Date;
}): SessionData {
  const now = opts.now ?? new Date();
  const utm = parseUtm(opts.search);
  const iso = now.toISOString();
  return {
    anonId: newAnonId(),
    visits: 1,
    firstSeen: iso,
    lastSeen: iso,
    firstTouch: { utm, landingPage: opts.path, referrer: opts.referrer },
    lastTouch: { utm, page: opts.path, referrer: opts.referrer },
    pageViews: 1,
    recentPaths: [opts.path],
    interestCategories: [],
    expiresAt: expiryFrom(now),
  };
}

/** Record a page view. first-touch is NEVER overwritten; last-touch always is. */
export function recordPageView(
  session: SessionData,
  opts: { path: string; search: string; referrer: string; newVisit?: boolean; now?: Date },
): SessionData {
  const now = opts.now ?? new Date();
  const utm = parseUtm(opts.search);
  const recent = [opts.path, ...session.recentPaths.filter((p) => p !== opts.path)].slice(0, MAX_RECENT_PATHS);
  return {
    ...session,
    visits: session.visits + (opts.newVisit ? 1 : 0),
    lastSeen: now.toISOString(),
    // last-touch UTM only updates when a NEW utm arrives (don't clobber with empty)
    lastTouch: {
      utm: Object.keys(utm).length ? utm : session.lastTouch.utm,
      page: opts.path,
      referrer: opts.referrer || session.lastTouch.referrer,
    },
    pageViews: session.pageViews + 1,
    recentPaths: recent,
    expiresAt: expiryFrom(now),
  };
}

/** Map a path to an interest category (coarse, no PII). */
export function interestForPath(path: string): string | null {
  if (path.includes('fbr')) return 'fbr-compliance';
  if (path.includes('whatsapp') || path.includes('crm')) return 'crm-communication';
  if (path.includes('ai')) return 'ai-automation';
  if (path.includes('migration')) return 'migration';
  if (path.includes('custom')) return 'custom-development';
  if (path.includes('integration')) return 'integration';
  if (path.startsWith('/industries')) return 'industry';
  if (path.startsWith('/services') || path.includes('implementation')) return 'implementation';
  return null;
}

export function addInterest(session: SessionData, category: string): SessionData {
  if (session.interestCategories.includes(category)) return session;
  return { ...session, interestCategories: [...session.interestCategories, category] };
}

export function isExpired(session: SessionData, now: Date = new Date()): boolean {
  return new Date(session.expiresAt).getTime() <= now.getTime();
}

/* ---- Browser persistence (guarded for SSR) ---- */
export function readSession(): SessionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as SessionData;
    if (isExpired(s)) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function writeSession(session: SessionData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable */
  }
}

/** Deletion job for anonymous data (right-to-erasure + expiry). */
export function deleteSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* noop */
  }
}
