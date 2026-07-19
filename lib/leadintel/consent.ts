/**
 * Consent model — GDPR/ePrivacy-style. Three independent categories plus a
 * SEPARATE "contact permission" that is NOT the same as marketing consent:
 *
 *  - necessary        : always true (cannot be rejected; strictly functional)
 *  - analytics        : GA4 / Plausible may load
 *  - marketing        : marketing email sequences / retargeting events allowed
 *  - contactPermission : the person asked us to contact them about THIS enquiry
 *                        (transactional). Stored on the lead, never used to send
 *                        marketing. A user can request contact WITHOUT opting
 *                        into marketing, and vice versa.
 *
 * Nothing here fingerprints the device. Consent is stored in localStorage under
 * an explicit key with a version + timestamp so withdrawal and re-prompting work.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string; // ISO
  decided: boolean; // false = banner not yet actioned
}

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = 'odv_consent';
/** Re-ask for consent after this many days. */
export const CONSENT_TTL_DAYS = 180;

export function defaultConsent(): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
    decided: false,
  };
}

export function acceptAll(): ConsentState {
  return { version: CONSENT_VERSION, necessary: true, analytics: true, marketing: true, updatedAt: new Date().toISOString(), decided: true };
}

export function rejectAll(): ConsentState {
  return { version: CONSENT_VERSION, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true };
}

export function savePreferences(analytics: boolean, marketing: boolean): ConsentState {
  return { version: CONSENT_VERSION, necessary: true, analytics, marketing, updatedAt: new Date().toISOString(), decided: true };
}

/** True if a stored consent is still valid (same version, within TTL, decided). */
export function isConsentValid(state: ConsentState | null, now: Date = new Date()): boolean {
  if (!state || !state.decided) return false;
  if (state.version !== CONSENT_VERSION) return false;
  const ageDays = (now.getTime() - new Date(state.updatedAt).getTime()) / 86_400_000;
  return ageDays <= CONSENT_TTL_DAYS;
}

export function allows(state: ConsentState | null, category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  if (!state) return false;
  return Boolean(state[category]);
}

/* ---- Browser persistence (guarded for SSR) ---- */
export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('odv:consent', { detail: state }));
  } catch {
    /* storage may be unavailable */
  }
}

/** Withdrawal = revoke analytics + marketing, keep necessary, mark decided. */
export function withdrawConsent(): ConsentState {
  const state = rejectAll();
  writeConsent(state);
  return state;
}
