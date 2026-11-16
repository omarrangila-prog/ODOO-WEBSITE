'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { ConciergeAvatar } from './ConciergeAvatar';
import { enabledLanguages, getLanguage, languageFromBrowser, type ConciergeLanguage } from '@/lib/concierge/languages';
import { track } from '@/lib/analytics';

// The conversation UI and the ElevenLabs SDK load only when a visitor opens the concierge.
const ConciergePanel = dynamic(() => import('./ConciergePanel').then((m) => m.ConciergePanel), { ssr: false });

const SS_DISMISSED = 'odv_cg_dismissed';
const SS_GREETED = 'odv_cg_greeted';
const LS_LANG = 'odv_cg_lang';

function store(kind: 'session' | 'local') {
  try {
    return kind === 'session' ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Bottom-right AI concierge: a small portrait that opens the conversation panel. Mounted once in the root
 * layout, so an open conversation survives client-side navigation. Sound never starts on its own: the
 * greeting bubble is silent, and voice starts only when the visitor presses "Talk to me".
 */
export function Concierge() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [mounted, setMounted] = useState(false); // panel has been opened at least once
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<ConciergeLanguage | null>(null);
  const [consentLift, setConsentLift] = useState(0); // px the cookie banner occupies at the bottom
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const offered = enabledLanguages();
    const saved = getLanguage(store('local')?.getItem(LS_LANG));
    setLang(saved && offered.includes(saved) ? saved : languageFromBrowser(navigator.languages ?? [navigator.language], offered));
    setDismissed(store('session')?.getItem(SS_DISMISSED) === '1');
    setReady(true);
  }, []);

  // The cookie banner sits at the bottom of the screen; lift the launcher clear of it while it is showing.
  useEffect(() => {
    let ro: ResizeObserver | null = null;
    const check = () => {
      const el = document.querySelector<HTMLElement>('[aria-label="Cookie and privacy preferences"]');
      ro?.disconnect();
      if (!el) return setConsentLift(0);
      const measure = () => setConsentLift(Math.ceil(el.getBoundingClientRect().height));
      measure();
      ro = new ResizeObserver(measure);
      ro.observe(el);
    };
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.body, { childList: true });
    return () => {
      mo.disconnect();
      ro?.disconnect();
    };
  }, []);

  // One silent greeting per browser session.
  useEffect(() => {
    if (!ready || dismissed || open) return;
    if (store('session')?.getItem(SS_GREETED) === '1') return;
    const show = window.setTimeout(() => {
      setBubble(true);
      store('session')?.setItem(SS_GREETED, '1');
    }, 2200);
    const hide = window.setTimeout(() => setBubble(false), 16000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [ready, dismissed, open]);

  const openPanel = useCallback(() => {
    setBubble(false);
    setMounted(true);
    setOpen(true);
    track('concierge_opened', { page: pathname ?? '/' });
  }, [pathname]);

  const minimise = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  const chooseLang = useCallback((l: ConciergeLanguage) => {
    setLang(l);
    store('local')?.setItem(LS_LANG, l.id);
    track('concierge_language_selected', { language: l.id });
  }, []);

  if (!ready || !lang) return null;
  if (dismissed && !mounted) return null;

  // Clear of the mobile call bar (lg and below) and, while it shows, the cookie banner.
  const bottom = 'bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-6';

  return (
    <>
      {!open && !dismissed && (
        <div
          className={`fixed right-3 z-[var(--z-header)] flex items-end gap-2 sm:right-5 ${consentLift ? '' : bottom}`}
          style={consentLift ? { bottom: consentLift + 12 } : undefined}
          dir="ltr"
        >
          {bubble && (
            <div className="cg-bubble-in glass relative mb-2 max-w-[220px] rounded-2xl rounded-br-md border border-line-strong px-3.5 py-2.5 shadow-float !bg-[rgb(14_12_24/0.96)]" lang={lang.htmlLang} dir={lang.dir}>
              <p className="pr-5 text-[14px] font-semibold leading-snug text-text-dark">{lang.t.bubble}</p>
              <button type="button" onClick={openPanel} className="mt-1 text-[13px] font-medium text-violet-bright underline-offset-4 hover:underline">
                {lang.t.meet}
              </button>
              <button
                type="button"
                onClick={() => setBubble(false)}
                aria-label="Hide message"
                className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full text-text-dark-muted hover:bg-white/10 hover:text-text-dark"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          )}
          <div className="relative">
            <button
              ref={launcherRef}
              type="button"
              onClick={openPanel}
              aria-label={`${lang.t.meet}: ${lang.t.heading}`}
              className="cg-ring group relative block h-[132px] w-[118px] overflow-hidden rounded-[20px] bg-[radial-gradient(110%_80%_at_50%_100%,#3a2479,#120d22_70%)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-bright sm:h-[170px] sm:w-[152px]"
            >
              <ConciergeAvatar state={bubble ? 'greeting' : 'idle'} variant="card" className="absolute inset-x-0 bottom-0 top-1.5" priority />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-[linear-gradient(to_top,rgb(12_10_20/0.95),rgb(12_10_20/0.6)_70%,transparent)] px-2 pb-2 pt-5 text-[12px] font-semibold text-text-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
                AI guide
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDismissed(true);
                store('session')?.setItem(SS_DISMISSED, '1');
              }}
              aria-label="Hide the AI concierge for this visit"
              className="absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-line-strong bg-[rgb(14_12_24/0.96)] text-text-dark-muted hover:text-text-dark"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}
      {mounted && (
        <ConciergePanel
          open={open}
          lang={lang}
          onLang={chooseLang}
          onMinimise={minimise}
          onClose={() => {
            setOpen(false);
            setMounted(false);
            window.setTimeout(() => launcherRef.current?.focus(), 0);
          }}
        />
      )}
    </>
  );
}
