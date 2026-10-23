'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { statusLabel, type ProjectStatus } from '@/data/projects';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { LazyDemo, type DemoId } from '@/components/work/demos/LazyDemo';

/**
 * Homepage section 4: three projects, each with a working demonstration.
 *
 * No screenshot of any delivered system exists, so none is shown and nothing
 * stands in for one. What stands beside each project is a demonstration built
 * here with invented data, labelled as such inside its own frame. The text on
 * the left is limited to what management confirmed the system does; no problem,
 * result or timeline is asserted because none has been supplied.
 *
 * Projects are tabs and every panel is in the HTML. The demonstration mounts
 * when its panel is near the screen. On a phone it opens on request, so the
 * section stays short for people who only want the summary.
 */
export interface ShowcaseItem {
  /**
   * Only what the card prints. The whole project record is not passed down: it carries internal
   * evidence notes, and a client component's props are serialised into the page.
   */
  project: {
    id: string;
    name: string;
    status: ProjectStatus;
    industry?: string;
    inPakistan: boolean;
    purpose?: string;
    capabilities?: string[];
  };
  demo: DemoId;
  /** The project page, present only once it has passed the publication gate. */
  href?: string;
}

export function FeaturedWork({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(items[0]?.project.id ?? '');
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, focus = false) {
    const it = items[i];
    if (!it) return;
    setActive(it.project.id);
    if (focus) tabs.current[i]?.focus();
    track('featured_work_click', { project: it.project.id, kind: 'tab' });
  }

  function onKeyDown(e: KeyboardEvent) {
    const i = items.findIndex((x) => x.project.id === active);
    const n = items.length;
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
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
        aria-label="Featured projects"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => {
          const on = it.project.id === active;
          return (
            <button
              key={it.project.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`work-tab-${it.project.id}`}
              aria-selected={on}
              aria-controls={`work-panel-${it.project.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-4 text-[15px] font-medium transition-colors duration-200',
                on ? 'border-violet-bright/60 bg-violet/[0.14] text-white' : 'border-line text-text-dark-muted hover:border-line-strong hover:text-white',
              )}
            >
              {it.project.name}
            </button>
          );
        })}
      </div>

      {items.map((it) => {
        const p = it.project;
        const on = p.id === active;
        const open = Boolean(opened[p.id]);
        return (
          <div
            key={p.id}
            role="tabpanel"
            id={`work-panel-${p.id}`}
            aria-labelledby={`work-tab-${p.id}`}
            hidden={!on}
            className={cn('mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.55fr)] lg:gap-10', !on && 'hidden')}
          >
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-dark-muted">
                <span className="rounded-full border border-violet/40 px-3 py-1 text-violet-bright">{statusLabel[p.status]}</span>
                {p.industry && <span>{p.industry}</span>}
                {p.inPakistan && <span>Pakistan</span>}
              </p>
              <h3 className="mt-4 font-heading text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">{p.name}</h3>
              {p.purpose && <p className="mt-3 text-[16px] leading-relaxed text-text-dark">{p.purpose}</p>}
              {p.capabilities && (
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {p.capabilities.slice(0, 4).map((c, i) => (
                    <li key={c} className="flex gap-3 py-2 text-[14.5px] leading-snug text-text-dark">
                      <span aria-hidden className="w-5 shrink-0 pt-px text-[12px] tracking-[0.12em] text-violet/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-[15px]">
                {it.href && (
                  <Link href={it.href} className="link-editorial" onClick={() => track('featured_work_click', { project: p.id, kind: 'page' })}>
                    Read the project page <span aria-hidden className="arrow">↗</span>
                  </Link>
                )}
              </p>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`work-demo-${p.id}`}
                onClick={() => {
                  setOpened((o) => ({ ...o, [p.id]: !o[p.id] }));
                  track('featured_work_click', { project: p.id, kind: 'demo_toggle' });
                }}
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-line-strong px-5 text-[15px] font-medium text-white transition-colors hover:border-violet-bright/60 lg:hidden"
              >
                {open ? 'Hide the demonstration' : 'Open the working demonstration'}
              </button>
            </div>

            <div id={`work-demo-${p.id}`} className={cn('min-w-0', !open && 'hidden lg:block')}>
              <LazyDemo id={it.demo} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
