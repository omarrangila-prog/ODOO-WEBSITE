'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { readConsent, allows } from '@/lib/leadintel/consent';

/**
 * Loads analytics ONLY when (a) configured via env vars AND (b) the visitor has
 * granted analytics consent. Reacts to consent changes without a page reload.
 * IP anonymisation is on; no PII is ever passed to events (see lib/analytics).
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [analyticsOk, setAnalyticsOk] = useState(false);

  useEffect(() => {
    const update = () => setAnalyticsOk(allows(readConsent(), 'analytics'));
    update();
    window.addEventListener('odv:consent', update);
    return () => window.removeEventListener('odv:consent', update);
  }, []);

  if (!analyticsOk) return null;

  return (
    <>
      {plausibleDomain && (
        <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
