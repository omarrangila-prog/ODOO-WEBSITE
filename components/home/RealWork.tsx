import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { publishableProjects, statusLabel } from '@/data/projects';
import { ctas } from '@/data/ctas';
import { cn } from '@/lib/utilities';

/**
 * Real delivered work, placed before the Odoo demonstrations.
 *
 * The homepage previously led its work section with demonstration scenarios,
 * so a first-time visitor saw illustrative material before anything actually
 * built. This shows the management-confirmed projects first, each with its
 * status badge, and routes to the full portfolio.
 *
 * Descriptions come straight from data/projects.ts — only what management has
 * stated the system does. No outcomes or metrics, because none are evidenced.
 */
const badgeTone: Record<string, string> = {
  CLIENT_PROJECT: 'border-green/40 bg-green/10',
  INTERNAL_PRODUCT: 'border-violet/40 bg-violet/10',
};

export function RealWork() {
  // Confirmed client work and internal products only — demonstrations have
  // their own clearly labelled section further down the page.
  const projects = publishableProjects()
    .filter((p) => p.status === 'CLIENT_PROJECT' || p.status === 'INTERNAL_PRODUCT')
    .slice(0, 4);

  if (projects.length === 0) return null;

  return (
    <section id="real-work" className="theme-light bay-sm scroll-mt-24">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Delivered work</p>
          <h2 className="display-2">
            Software we&rsquo;ve built. <span className="signal-text">Problems we&rsquo;ve solved.</span>
          </h2>{' '}
          <p className="lede mt-5">
            Selected projects and internal products, with transparent descriptions of what each
            system was built to do.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id}>
              <article className="flex h-full flex-col rounded-editorial border border-line-light bg-white/60 p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full border px-3 py-1 text-[12px] font-semibold text-ink',
                      badgeTone[p.status] ?? 'border-line-light',
                    )}
                  >
                    {statusLabel[p.status]}
                  </span>
                  {p.categories.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line-light px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-ink-muted"
                    >
                      {c}
                    </span>
                  ))}
                  {p.industry && (
                    <span className="rounded-full border border-line-light px-3 py-1 text-[12px] text-ink-muted">
                      {p.industry}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-heading text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                  {p.name}
                </h3>{' '}
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-muted">{p.summary}</p>{' '}

                <p className="mt-auto border-t border-line-light pt-5 text-[14px] text-ink/60">
                  Detailed case study available on request
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href="/case-studies"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15.5px] font-semibold text-violet"
          >
            All work, searchable by capability
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href={ctas.portfolio.href}
            className="inline-flex min-h-[44px] items-center text-[15.5px] font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {ctas.portfolio.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
