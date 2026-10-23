'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  departmentGroups,
  departments,
  countLabel,
  type DepartmentGroupId,
} from '@/data/team';
import { cn } from '@/lib/utilities';

type Filter = 'all' | DepartmentGroupId;

/**
 * Department explorer. Each department is a native <details> row: name,
 * headline and role count are always visible, and the roles, areas of work
 * and caveats open on demand. All of it is in the server HTML either way, so
 * nothing depends on JavaScript, hover or a mounted panel. Fully expanded the
 * twelve departments made this one section about 8,300px of an 18,000px page.
 *
 * A link such as /company/team#odoo-engineering opens its own row. The group
 * buttons narrow the list; they are toggle buttons (aria-pressed) rather than
 * ARIA tabs, because the groups are filters, not mutually exclusive panels.
 */
export function DepartmentExplorer() {
  const [filter, setFilter] = useState<Filter>('all');
  const [allOpen, setAllOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const setEvery = useCallback((open: boolean) => {
    listRef.current?.querySelectorAll('details').forEach((d) => {
      d.open = open;
    });
    setAllOpen(open);
  }, []);

  // Open the row a hash link points at, on load and when the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement && listRef.current?.contains(el)) {
        setFilter('all');
        el.open = true;
        el.scrollIntoView({ block: 'start' });
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const shown = departments.filter((d) => filter === 'all' || d.group === filter);
  const groupSummary = departmentGroups.find((g) => g.id === filter)?.summary;

  return (
    <div>
      <div role="group" aria-label="Filter departments" className="flex flex-wrap gap-2">
        {[{ id: 'all' as const, label: 'All departments' }, ...departmentGroups].map((g) => {
          const active = filter === g.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(g.id)}
              className={cn(
                'min-h-[44px] rounded-full border px-4 py-2 text-[14px] font-medium transition-colors',
                active
                  ? 'border-ultraviolet bg-ultraviolet text-white'
                  : 'border-line-light bg-ivory-soft text-ink hover:border-violet',
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 min-h-[1.5rem] text-[15px] text-ink-muted" aria-live="polite">
        {groupSummary ?? `${departments.length} departments. Choose a group to narrow the list.`}
      </p>

      <p className="mt-3">
        <button
          type="button"
          onClick={() => setEvery(!allOpen)}
          className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-violet underline-offset-4 hover:underline"
        >
          {allOpen ? 'Collapse all departments' : 'Expand all departments'}
        </button>
      </p>

      <div ref={listRef} className="mt-4 grid gap-4">
        {departments.map((d) => {
          const visible = shown.includes(d);
          return (
            <details
              key={d.id}
              id={d.id}
              hidden={!visible}
              className="group scroll-mt-28 rounded-editorial border border-line-light bg-ivory-soft"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none flex-col gap-1 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-heading text-[clamp(20px,2.2vw,26px)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                    {d.name}
                  </h3>{' '}
                  <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {countLabel(d)}
                    <span className="transition-transform group-open:rotate-180" aria-hidden>&#9662;</span>
                  </span>
                </span>{' '}
                <span className="font-heading text-[16px] font-medium text-violet">{d.headline}</span>
              </summary>

              <div className="border-t border-line-light p-5 pt-5 sm:p-6">
              <p className="max-w-[var(--reading-width)] text-[16px] leading-relaxed text-ink-muted">{d.description}</p>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">Roles</h4>
                  <ul className="mt-3 divide-y divide-line-light">
                    {d.roles.map((r) => (
                      <li key={r.id} className="py-3">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[16px] font-medium text-ink">
                            {r.title}
                            {r.intern && (
                              <span className="ml-2 rounded-full border border-line-light px-2 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted">
                                Intern
                              </span>
                            )}
                          </span>{' '}
                          <span className="shrink-0 font-heading text-[18px] font-semibold text-ink">
                            {r.count === null ? 'Not confirmed' : r.count}
                          </span>
                        </div>
                        {r.note && <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">{r.note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">Areas of work</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {d.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-[15px] text-ink-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-ink">
                <span className="font-semibold">In a project: </span>
                {d.inDelivery}
              </p>
              {d.caveat && <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{d.caveat}</p>}

              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                {d.services.map((s) => (
                  <Link key={s.href + s.label} href={s.href} className="inline-flex min-h-[44px] items-center font-medium text-violet underline-offset-4 hover:underline">
                    {s.label}
                  </Link>
                ))}
              </p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
