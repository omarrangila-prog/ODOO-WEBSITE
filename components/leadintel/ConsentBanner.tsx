'use client';

import { useEffect, useState } from 'react';
import { Shield, Settings2, X } from 'lucide-react';
import {
  readConsent,
  writeConsent,
  isConsentValid,
  acceptAll,
  rejectAll,
  savePreferences,
  type ConsentState,
} from '@/lib/leadintel/consent';
import { deleteSession } from '@/lib/leadintel/session';

/**
 * Consent banner + preference centre.
 * - Accept All / Reject All / granular Settings.
 * - Marketing and Analytics are independent toggles.
 * - Re-openable any time via the "Cookie preferences" footer link
 *   (dispatches window event 'odv:open-preferences').
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = readConsent();
    if (!isConsentValid(current)) {
      setVisible(true);
    } else if (current) {
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }
    const openPrefs = () => {
      const c = readConsent();
      if (c) { setAnalytics(c.analytics); setMarketing(c.marketing); }
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener('odv:open-preferences', openPrefs);
    return () => window.removeEventListener('odv:open-preferences', openPrefs);
  }, []);

  function apply(state: ConsentState) {
    writeConsent(state);
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-overlay)] p-3 sm:p-4 safe-b" role="dialog" aria-modal="false" aria-label="Cookie and privacy preferences">
      <div className="consent-surface mx-auto max-w-2xl rounded-[18px] border border-line-strong p-4 shadow-float sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-white/[0.04] text-violet-bright">
            <Shield className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[16px] font-semibold text-text-dark">Your privacy choices</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-dark-muted">
              We use strictly-necessary storage to run the site. With your consent we also enable
              analytics and marketing. You can change this any time.{' '}
              <a href="/privacy" className="text-violet-bright underline-offset-4 hover:underline">Privacy Policy</a>.
            </p>

            {showSettings && (
              <div className="mt-4 space-y-2.5">
                <ToggleRow label="Strictly necessary" desc="Required for the site to function. Always on." checked disabled />
                <ToggleRow label="Analytics" desc="Anonymous usage measurement (GA4 / Plausible)." checked={analytics} onChange={setAnalytics} />
                <ToggleRow label="Marketing" desc="Marketing emails and campaign measurement — only if you opt in." checked={marketing} onChange={setMarketing} />
                <button
                  type="button"
                  onClick={() => { deleteSession(); alert('Your anonymous session data on this device has been deleted.'); }}
                  className="text-[13px] font-medium text-[#ff8a8f] underline-offset-4 hover:underline"
                >
                  Delete my anonymous data on this device
                </button>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button type="button" onClick={() => apply(acceptAll())} className="rounded-control bg-[linear-gradient(100deg,#7C4DFF,#E947C6)] px-4 py-2.5 text-[14px] font-semibold text-white min-h-[44px]">
                Accept all
              </button>
              <button type="button" onClick={() => apply(rejectAll())} className="rounded-control border border-line-strong px-4 py-2.5 text-[14px] font-semibold text-text-dark min-h-[44px] hover:bg-white/5">
                Reject all
              </button>
              {showSettings ? (
                <button type="button" onClick={() => apply(savePreferences(analytics, marketing))} className="rounded-control border border-violet-bright/40 bg-violet/10 px-4 py-2.5 text-[14px] font-semibold text-text-dark min-h-[44px]">
                  Save preferences
                </button>
              ) : (
                <button type="button" onClick={() => setShowSettings(true)} className="inline-flex items-center gap-1.5 rounded-control px-4 py-2.5 text-[14px] font-semibold text-text-dark-muted min-h-[44px] hover:text-text-dark">
                  <Settings2 className="h-4 w-4" aria-hidden />
                  Settings
                </button>
              )}
            </div>
          </div>
          <button type="button" onClick={() => apply(rejectAll())} aria-label="Reject all and close" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-text-dark-muted hover:bg-white/5">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange, disabled }: { label: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-control border border-line bg-white/[0.02] px-4 py-3">
      <span className="min-w-0">
        <span className="block text-[14px] font-medium text-text-dark">{label}</span>{' '}
        <span className="block text-[12px] text-text-dark-muted">{desc}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${checked ? 'border-violet-bright/60 bg-[linear-gradient(100deg,#7C4DFF,#E947C6)]' : 'border-line-strong bg-white/5'} ${disabled ? 'opacity-60' : ''}`}
      >
        <span className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} style={{ height: 18, width: 18 }} />
      </button>
    </div>
  );
}
