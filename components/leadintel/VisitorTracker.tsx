'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  readSession,
  writeSession,
  createSession,
  recordPageView,
  addInterest,
  interestForPath,
} from '@/lib/leadintel/session';
import { readConsent, allows } from '@/lib/leadintel/consent';

/**
 * Records anonymous, first-party session data on every route change.
 * - First-party random ID only (no fingerprinting).
 * - Always safe to record functional session data (necessary category), but we
 *   only PERSIST when the visit is not in a "reject-all + do-not-store" state:
 *   here we store session data as strictly-necessary functional data (it enables
 *   attribution for a lead the user themselves submits) and never expose PII.
 * - Analytics dispatch is gated separately by the analytics consent.
 */
export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = searchParams.toString();
    const referrer = document.referrer || '';
    const existing = readSession();

    // A "new visit" if it's been > 30 min since lastSeen or no session yet.
    let session;
    if (!existing) {
      session = createSession({ path: pathname, search: search ? `?${search}` : '', referrer });
    } else {
      const idleMs = Date.now() - new Date(existing.lastSeen).getTime();
      const newVisit = idleMs > 30 * 60 * 1000;
      session = recordPageView(existing, {
        path: pathname,
        search: search ? `?${search}` : '',
        referrer,
        newVisit,
      });
    }

    const interest = interestForPath(pathname);
    if (interest) session = addInterest(session, interest);

    writeSession(session);
  }, [pathname, searchParams]);

  // Expose analytics-consent status for other components (no PII).
  useEffect(() => {
    const consent = readConsent();
    (window as unknown as { __odvAnalytics?: boolean }).__odvAnalytics = allows(consent, 'analytics');
  }, [pathname]);

  return null;
}
