'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Search } from 'lucide-react';
import { solutions, type SolutionCategory } from '@/data/solutions';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

const CATEGORIES: SolutionCategory[] = [
  'Finance & Accounting',
  'Sales & POS',
  'Inventory & Operations',
  'Import, Export & Trading',
  'Manufacturing',
  'Healthcare',
  'AI & Automation',
];

/**
 * Searchable, filterable solution library.
 *
 * The point is that a visitor should find the right system without knowing
 * our name for it: search covers the heading, the answer-first summary, the
 * "who it is for" line and the module tags, so "stock", "godown", "till"
 * and "landed cost" all land somewhere sensible.
 *
 * Every solution is rendered server-side; the filter only hides cards. State
 * is read from the URL after mount rather than with useSearchParams, which in
 * Next 14 forces the subtree client-only and would strip all 15 links out of
 * the static HTML (that regression orphaned pages once already).
 */
export function SolutionFinder() {
  const router = useRouter();
  const [active, setActive] = useState<'All' | SolutionCategory>('All');
  const [query, setQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get('category') as SolutionCategory | null;
    if (c && CATEGORIES.includes(c)) setActive(c);
    const q = sp.get('q');
    if (q) setQuery(q);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const sp = new URLSearchParams();
    if (active !== 'All') sp.set('category', active);
    if (query.trim()) sp.set('q', query.trim());
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  }, [active, query, hydrated, router]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: solutions.length };
    for (const c of CATEGORIES) m[c] = solutions.filter((s) => s.categories.includes(c)).length;
    return m;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return solutions.filter((s) => {
      if (active !== 'All' && !s.categories.includes(active)) return false;
      if (!q) return true;
      return [s.h1, s.answer, s.forWho, s.eyebrow, ...s.modules, ...s.categories]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [active, query]);

  return (
    <section className="theme-light bay-sm">
      <div className="shell">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search solutions by name, system or business need</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: stock, invoicing, POS, landed cost…"
            className="w-full rounded-control border border-line-light bg-white/[0.035] py-3.5 pl-11 pr-4 text-[16px] text-ink placeholder:text-ink/40 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
          />
        </label>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Filter solutions by area">
          {(['All', ...CATEGORIES] as const).map((c) => (
            <li key={c}>
              <button
                type="button"
                aria-pressed={active === c}
                onClick={() => {
                  setActive(c);
                  track('solution_filter_used', { category: c });
                }}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors',
                  active === c
                    ? 'border-violet bg-violet/10 text-violet'
                    : 'border-line-light text-ink-muted hover:border-violet/40 hover:text-ink',
                )}
              >
                {c}
                <span className={cn('text-[12px]', active === c ? 'text-violet/70' : 'text-ink/40')}>
                  {counts[c] ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[15px] text-ink-muted" aria-live="polite">
          Showing {shown.length} of {solutions.length}
          {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
        </p>

        {shown.length === 0 ? (
          <p className="mt-8 rounded-panel border border-line-light bg-white/[0.035] p-6 text-[16px] text-ink-muted">
            Nothing matches that term. Plenty of what we build has no product name &mdash;{' '}
            <Link href="/contact#form" className="text-violet underline-offset-4 hover:underline">
              describe the problem instead
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {shown.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-editorial border border-line-light bg-white/[0.035] p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-violet/30 hover:shadow-panel-light sm:p-8"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    {s.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-line-light px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                  <span className="mt-5 block font-heading text-[clamp(20px,2.2vw,25px)] font-semibold leading-[1.18] tracking-[-0.025em] text-ink transition-colors group-hover:text-violet">
                    {s.h1}
                  </span>{' '}
                  <span className="mt-3 block text-[16px] leading-relaxed text-ink-muted">
                    {s.forWho}
                  </span>
                  <span className="mt-5 flex flex-wrap gap-1.5">
                    {s.modules.slice(0, 4).map((m) => (
                      <span key={m} className="rounded-md bg-ink/[0.05] px-2 py-1 text-[12px] text-ink-muted">
                        {m}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-4 border-t border-line-light pt-5">
                    <span className="text-[15px] font-medium text-ink/70">{s.ctaLabel}</span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
