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
      <div role="tablist" aria-label="Service groups" onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
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
                'min-h-[44px] rounded-full border px-4 text-[15px] font-medium transition-colors duration-200',
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

      <div ref={panelRef} data-live="false" className="mt-8">
        {explorerGroups.map((g) => (
          <div
            key={g.id}
            role="tabpanel"
            id={`svc-panel-${g.id}`}
            aria-labelledby={`svc-tab-${g.id}`}
            hidden={g.id !== active}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="max-w-[60ch] text-[17px] leading-relaxed text-text-dark">{g.line}</p>
              <Link href={g.href} className="link-editorial text-[15px]" onClick={() => track('service_card_click', { kind: 'group_link', group: g.id })}>
                Explore this area <span aria-hidden className="arrow">↗</span>
              </Link>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.cards.map((c) => (
                <li key={c.title}>
                  <Link
                    href={c.href}
                    onClick={() => track('service_card_click', { kind: 'card', group: g.id, card: c.title })}
                    className="mv-host no-underline group relative grid h-full grid-cols-[64px_1fr] items-start gap-x-4 overflow-hidden rounded-[20px] border border-line bg-white/[0.02] p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet-bright/45 hover:bg-white/[0.04] focus-visible:border-violet-bright/60 motion-reduce:transform-none sm:flex sm:flex-col sm:p-5"
                  >
                    <span className="block h-[44px] w-[64px] text-violet-bright/90 sm:h-[72px] sm:w-full sm:max-w-[150px]" aria-hidden>
                      <MicroVisual kind={c.visual} />
                    </span>
                    <span className="block sm:contents">
                      <span className="flex items-start justify-between gap-3 sm:mt-4">
                        <span className="font-heading text-[19px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[20px]">{c.title}</span>
                        <span
                          aria-hidden
                          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-[15px] text-text-dark-muted transition-all duration-300 group-hover:border-violet-bright/60 group-hover:bg-violet/[0.16] group-hover:text-white group-focus-visible:border-violet-bright/60"
                        >
                          ↗
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[14px] italic leading-snug text-text-dark-muted sm:mt-2">{c.problem}</span>
                      <span className="mt-2 block text-[15px] leading-relaxed text-text-dark">{c.does}</span>
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
