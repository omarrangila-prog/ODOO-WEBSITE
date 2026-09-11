'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies, type WorkCategory } from '@/data/caseStudies';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

const categories: (WorkCategory | 'All')[] = [
  'All',
  ...Array.from(new Set(caseStudies.map((c) => c.category))),
];

/**
 * Filterable portfolio.
 *
 * Every card keeps its "Demonstration" label visible. These are worked
 * scenarios showing how we approach a problem — not client projects — and the
 * label stays on the card rather than being buried in a footnote, because the
 * honesty is the point. Real client work replaces these only once a client has
 * agreed to be named and the numbers are verified.
 */
export function WorkGrid() {
  const [active, setActive] = useState<WorkCategory | 'All'>('All');
  const shown = active === 'All' ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <section className="theme-light bay-sm">
      <div className="shell">
        <ul className="flex flex-wrap gap-2" aria-label="Filter work by capability">
          {categories.map((c) => (
            <li key={c}>
              <button
                type="button"
                aria-pressed={active === c}
                onClick={() => {
                  setActive(c);
                  track('work_filter_used', { category: c });
                }}
                className={cn(
                  'min-h-[44px] rounded-full border px-4 py-2 text-[14px] font-medium transition-colors',
                  active === c
                    ? 'border-violet bg-violet/10 text-violet'
                    : 'border-line-light text-ink-muted hover:border-violet/40 hover:text-ink',
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[15px] text-ink-muted" aria-live="polite">
          Showing {shown.length} of {caseStudies.length}
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {shown.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex h-full flex-col rounded-editorial border border-line-light bg-white/60 p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-violet/30 hover:shadow-panel-light sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line-light px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {cs.category}
                  </span>
                  <span className="rounded-full border border-line-light px-3 py-1 text-[12px] text-ink-muted">
                    {cs.industry}
                  </span>
                  {cs.isDemonstration && (
                    <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[12px] font-semibold text-ink">
                      Demonstration
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-heading text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink transition-colors group-hover:text-violet">
                  {cs.label}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-muted">{cs.challenge}</p>

                <div className="mt-auto flex items-end justify-between gap-4 border-t border-line-light pt-5">
                  <span className="text-[14.5px] font-medium text-ink/70">
                    <span className="font-semibold text-violet">{cs.highlightMetric.value}</span>{' '}
                    {cs.highlightMetric.label}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
