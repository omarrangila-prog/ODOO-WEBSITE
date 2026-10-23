'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Search } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';
import { publishableProjects, statusLabel, type ProjectCategory } from '@/data/projects';
import { caseStudyHref } from '@/data/case-study-model';
import { flagEmoji, countries } from '@/data/countries';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

/** One row in the library, whichever data file it came from. */
interface WorkItem {
  key: string;
  name: string;
  summary: string;
  categories: string[];
  industry?: string;
  countryCode?: string;
  /** Visible status badge. */
  badge: string;
  badgeTone: 'demo' | 'client' | 'product';
  href?: string;
  /** Extra line on demo cards. */
  metric?: { value: string; label: string };
}

/** Filter set from the brief (§39). Order is the display order. */
const FILTERS: ('All' | ProjectCategory)[] = [
  'All',
  'Custom Software',
  'AI',
  'Automation',
  'WhatsApp',
  'Odoo',
  'Accounting',
  'POS',
  'Export / Import',
  'Healthcare',
  'Election',
  'Events',
  'Web',
  'Marketing',
  'Creative',
];

/** Map the case-study category to the wider filter vocabulary. */
const demoCategoryMap: Record<string, ProjectCategory[]> = {
  'AI Automation': ['AI', 'Automation', 'WhatsApp'],
  'Custom Software': ['Custom Software', 'POS'],
  Odoo: ['Odoo'],
  Web: ['Web'],
  Marketing: ['Marketing', 'Automation'],
  Integrations: ['Automation'],
};

function buildItems(): WorkItem[] {
  const clientItems: WorkItem[] = publishableProjects()
    .filter((p) => p.status !== 'DEMO') // demos come from caseStudies with full narratives
    .map((p) => ({
      key: p.id,
      name: p.name,
      summary: p.summary ?? '',
      categories: p.categories,
      industry: p.industry,
      countryCode: p.evidence.countryPublic ? p.countryCode : undefined,
      badge: statusLabel[p.status],
      badgeTone: p.status === 'INTERNAL_PRODUCT' ? 'product' : 'client',
      // Present only once a case study has passed every publication check.
      href: caseStudyHref(p.id),
    }));

  const demoItems: WorkItem[] = caseStudies.map((c) => ({
    key: c.slug,
    name: c.label,
    summary: c.challenge,
    categories: demoCategoryMap[c.category] ?? [c.category],
    industry: c.industry,
    badge: c.isDemonstration ? 'Demonstration' : 'Client Project',
    badgeTone: c.isDemonstration ? 'demo' : 'client',
    href: `/case-studies/${c.slug}`,
    metric: c.highlightMetric,
  }));

  // Client work first — it is the stronger proof — then the worked scenarios.
  return [...clientItems, ...demoItems];
}

const badgeClass: Record<WorkItem['badgeTone'], string> = {
  client: 'border-green/40 bg-green/10 text-ink',
  product: 'border-violet/40 bg-violet/10 text-ink',
  demo: 'border-amber/40 bg-amber/10 text-ink',
};

/**
 * Searchable, filterable project library.
 *
 * Client projects and internal products are listed on management's
 * confirmation with a visible status badge; demonstration scenarios keep
 * their "Demonstration" label. Filter and search state live in the URL so a
 * filtered view can be shared or bookmarked.
 */
export function WorkGrid() {
  const router = useRouter();
  const items = useMemo(buildItems, []);

  const [active, setActive] = useState<'All' | ProjectCategory>('All');
  const [query, setQuery] = useState('');
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  /**
   * Initial state is read from the URL AFTER mount rather than through
   * useSearchParams. In Next 14 useSearchParams forces the subtree to render
   * on the client only, which would strip every project link out of the
   * static HTML — the four case-study pages became crawler orphans when that
   * was tried. This way the full list is server-rendered and the URL still
   * drives the filter once JavaScript is running.
   */
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const cat = sp.get('category') as ProjectCategory | null;
    if (cat && FILTERS.includes(cat)) setActive(cat);
    const q = sp.get('q');
    if (q) setQuery(q);
    setHydratedFromUrl(true);
  }, []);

  // Reflect state back into the URL without adding history entries.
  useEffect(() => {
    if (!hydratedFromUrl) return;
    const next = new URLSearchParams();
    if (active !== 'All') next.set('category', active);
    if (query.trim()) next.set('q', query.trim());
    const qs = next.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  }, [active, query, router, hydratedFromUrl]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const catOk = active === 'All' || it.categories.includes(active);
      if (!catOk) return false;
      if (!q) return true;
      const hay = [it.name, it.summary, it.industry ?? '', ...it.categories].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [items, active, query]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: items.length };
    for (const f of FILTERS) if (f !== 'All') m[f] = items.filter((i) => i.categories.includes(f)).length;
    return m;
  }, [items]);

  return (
    <section className="theme-light bay-sm">
      <div className="shell">
        {/* Search */}
        <label className="relative block max-w-xl">
          <span className="sr-only">Search projects, systems or industries</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, systems or industries…"
            className="w-full rounded-control border border-line-light bg-white/[0.035] py-3.5 pl-11 pr-4 text-[16px] text-ink placeholder:text-ink/40 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
          />
        </label>

        {/* Filters — only categories that have at least one item are shown */}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Filter work by capability">
          {FILTERS.filter((f) => (counts[f] ?? 0) > 0).map((f) => (
            <li key={f}>
              <button
                type="button"
                aria-pressed={active === f}
                onClick={() => {
                  setActive(f);
                  track('work_filter_used', { category: f });
                }}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors',
                  active === f
                    ? 'border-violet bg-violet/10 text-violet'
                    : 'border-line-light text-ink-muted hover:border-violet/40 hover:text-ink',
                )}
              >
                {f}
                <span className={cn('text-[12px]', active === f ? 'text-violet/70' : 'text-ink/40')}>
                  {counts[f]}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[15px] text-ink-muted" aria-live="polite">
          Showing {shown.length} of {items.length}
          {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
        </p>

        {shown.length === 0 ? (
          <p className="mt-8 rounded-panel border border-line-light bg-white/[0.035] p-6 text-[16px] text-ink-muted">
            Nothing matches that yet. Try a broader term, or{' '}
            <Link href="/contact#form" className="text-violet underline-offset-4 hover:underline">
              tell us what you are looking for
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {shown.map((it) => {
              const country = it.countryCode ? countries.find((c) => c.code === it.countryCode) : undefined;
              const Card = it.href ? Link : 'div';
              const cardProps = it.href ? { href: it.href } : {};
              return (
                <li key={it.key}>
                  <Card
                    {...(cardProps as { href: string })}
                    className={cn(
                      'group flex h-full flex-col rounded-editorial border border-line-light bg-white/[0.035] p-7 transition-all duration-300 ease-premium sm:p-8',
                      it.href && 'hover:-translate-y-1 hover:border-violet/30 hover:shadow-panel-light',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn('rounded-full border px-3 py-1 text-[12px] font-semibold', badgeClass[it.badgeTone])}>
                        {it.badge}
                      </span>
                      {it.categories.slice(0, 2).map((c) => (
                        <span key={c} className="rounded-full border border-line-light px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-ink-muted">
                          {c}
                        </span>
                      ))}
                      {it.industry && (
                        <span className="rounded-full border border-line-light px-3 py-1 text-[12px] text-ink-muted">
                          {it.industry}
                        </span>
                      )}
                      {country && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line-light px-3 py-1 text-[12px] text-ink-muted">
                          <span aria-hidden>{flagEmoji(country.code)}</span>
                          {country.name}
                        </span>
                      )}
                    </div>

                    <h3 className={cn('mt-5 font-heading text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink', it.href && 'transition-colors group-hover:text-violet')}>
                      {it.name}
                    </h3>{' '}
                    <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">{it.summary}</p>

                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-line-light pt-5">
                      {it.metric ? (
                        <span className="text-[15px] font-medium text-ink/70">
                          <span className="font-semibold text-violet">{it.metric.value}</span> {it.metric.label}
                        </span>
                      ) : (
                        <span className="text-[14px] text-ink/60">
                          {it.href ? 'Read the case study' : 'Detailed case study available on request'}
                        </span>
                      )}
                      {it.href && (
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet" aria-hidden />
                      )}
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
