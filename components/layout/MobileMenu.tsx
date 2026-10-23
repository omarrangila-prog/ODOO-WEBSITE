'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, MessageCircle } from 'lucide-react';
import { primaryNav, groupChildren } from '@/data/navigation';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink, cn } from '@/lib/utilities';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * `inert` is a standard HTML attribute React 18's typings do not yet know
 * about. Spreading it from a loosely-typed object keeps the JSX clean and
 * avoids a ts-comment. It removes the closed panel from focus order and
 * hit-testing without cutting the slide-out transition short.
 */
function inertWhenClosed(open: boolean): Record<string, string> {
  return open ? {} : { inert: '' };
}

export function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;

    /*
     * Scroll lock via position:fixed rather than overflow:hidden.
     *
     * overflow:hidden does not reliably hold on iOS Safari, and it can lose
     * the scroll position entirely. Pinning the body at a negative offset
     * freezes the page exactly where it was and lets us restore to the same
     * pixel on close. The scrollbar width is compensated so the page does not
     * shift sideways when the bar disappears.
     */
    const scrollY = window.scrollY;
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;
      // Restore to the exact pixel, without smooth-scrolling back.
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
      previousActive?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  return (
    <div
      className={cn('fixed inset-0 z-[var(--z-modal)] lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!open}
      {...inertWhenClosed(open)}
    >
      <div
        className={cn('absolute inset-0 bg-black/80 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          'absolute inset-0 overflow-y-auto bg-midnight transition-transform duration-500 ease-premium safe-b',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div aria-hidden className="pointer-events-none absolute -right-28 top-24 h-[420px] w-[420px] radial-core" />
        <div
          className="relative flex items-center justify-between"
          style={{ padding: 'calc(var(--frame-inset) + 14px) calc(var(--frame-inset) + 18px) 8px' }}
        >
          <span className="hero-eyebrow">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.16] text-text-dark hover:bg-white/5">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="relative px-[calc(var(--frame-inset)+14px)] pb-10 pt-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.label} className="border-b border-white/[0.1]">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((p) => (p === item.label ? null : item.label))}
                      className="flex min-h-[64px] w-full items-center justify-between px-1 py-3 text-left"
                    >
                      <span className="font-heading text-[clamp(30px,9.4vw,46px)] font-semibold leading-tight tracking-tight">{item.label}</span>
                      <ChevronDown className={cn('h-6 w-6 text-violet-bright transition-transform', expanded === item.label && 'rotate-180')} aria-hidden />
                    </button>
                    {expanded === item.label && (
                      <div className="pb-4 pl-1">
                        {groupChildren(item.children).map((g) => (
                          <div key={g.heading ?? 'all'}>
                            {g.heading && (
                              <p className="px-1 pb-1 pt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-text-dark-muted">{g.heading}</p>
                            )}
                            <ul>
                              {g.items.map((child) => (
                                <li key={child.href}>
                                  <Link href={child.href} onClick={onClose} className="flex min-h-[44px] items-center rounded-lg px-1 py-2 text-[16px] text-text-dark-muted hover:text-white">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} onClick={onClose} className="flex min-h-[64px] items-center px-1 py-3 font-heading text-[clamp(30px,9.4vw,46px)] font-semibold leading-tight tracking-tight hover:text-violet-bright">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-1 px-1">
            <Link href="/contact" onClick={onClose} className="link-editorial">
              Start a conversation <span aria-hidden className="arrow">↗</span>
            </Link>
            <a href={waHref} {...(waConfigured ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="link-editorial">
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
              Talk on WhatsApp <span aria-hidden className="arrow">↗</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
