'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { explorerGroups } from '@/data/service-explorer';
import { MicroVisual } from './MicroVisual';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

/**
 * Homepage section 3. Five groups of services, one visible at a time.
 *
 * Compact on purpose: a card is a title and the one sentence that says what is
 * built. The customer's-problem line each card carries in data/service-explorer.ts
 * is not shown here (it restated the sentence beside it); the linked page has it.
 * On a phone the tabs scroll sideways in one row instead of wrapping to three.
 *
 * Every panel is server-rendered (inactive ones carry `hidden`), so the links
 * are in the HTML whether or not scripts run. Cards are ordinary links: they
 * work by tap, keyboard and pointer, and nothing is revealed on hover alone.
 * The small illustrations animate only while the open panel is on screen, or
 * while a card is hovered or focused.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(explorerGroups[0]!.id);
  const [focusIndex, setFocusIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mark the visible panel "live" only while it is on screen.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.live = entry?.isIntersecting ? 'true' : 'false';
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function select(i: number, focus = false) {
    const g = explorerGroups[i];
    if (!g) return;
    setActive(g.id);
    setFocusIndex(i);
    if (focus) tabRefs.current[i]?.focus();
    track('service_card_click', { kind: 'group', group: g.id });
  }

  function onKeyDown(e: KeyboardEvent) {
    const n = explorerGroups.length;
    let next = focusIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (focusIndex + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (focusIndex - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    select(next, true);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service groups"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {explorerGroups.map((g, i) => {
          const selected = g.id === active;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`svc-tab-${g.id}`}
              aria-selected={selected}
              aria-controls={`svc-panel-${g.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-4 text-[15px] font-medium transition-colors duration-200',
                selected
                  ? 'border-violet-bright/60 bg-violet/[0.14] text-white'
                  : 'border-line text-text-dark-muted hover:border-line-strong hover:text-white',
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <div ref={panelRef} data-live="false" className="mt-6">
        {explorerGroups.map((g) => (
          <div
            key={g.id}
            role="tabpanel"
            id={`svc-panel-${g.id}`}
            aria-labelledby={`svc-tab-${g.id}`}
            hidden={g.id !== active}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="max-w-[60ch] text-[16.5px] leading-relaxed text-text-dark">{g.line}</p>
              <Link href={g.href} className="link-editorial text-[15px]" onClick={() => track('service_card_click', { kind: 'group_link', group: g.id })}>
                Explore this area <span aria-hidden className="arrow">↗</span>
              </Link>
            </div>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {g.cards.map((c) => (
                <li key={c.title}>
                  <Link
                    href={c.href}
                    onClick={() => track('service_card_click', { kind: 'card', group: g.id, card: c.title })}
                    className="mv-host no-underline group relative grid h-full grid-cols-[52px_1fr_auto] items-center gap-x-4 overflow-hidden rounded-[18px] border border-line bg-white/[0.02] px-4 py-3.5 transition-[border-color,background-color] duration-300 hover:border-violet-bright/45 hover:bg-white/[0.04] focus-visible:border-violet-bright/60"
                  >
                    <span className="block h-[38px] w-[52px] text-violet-bright/90" aria-hidden>
                      <MicroVisual kind={c.visual} />
                    </span>
                    <span className="block">
                      <span className="block font-heading text-[18px] font-semibold leading-tight tracking-[-0.02em] text-white">{c.title}</span>
                      <span className="mt-1 line-clamp-2 block text-[14.5px] leading-snug text-text-dark-muted sm:line-clamp-none">{c.does}</span>
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-[15px] text-text-dark-muted transition-all duration-300 group-hover:border-violet-bright/60 group-hover:bg-violet/[0.16] group-hover:text-white group-focus-visible:border-violet-bright/60"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
