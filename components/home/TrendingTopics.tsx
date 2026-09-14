import Link from 'next/link';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { homepageTopics, type FreshnessLabel } from '@/data/topics';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const labelTone: Record<FreshnessLabel, string> = {
  'New guide': 'border-violet-bright/40 bg-violet/12 text-violet-bright',
  Updated: 'border-cyan/40 bg-cyan/12 text-cyan',
  'Compliance update': 'border-amber/40 bg-amber/12 text-amber',
  'Popular question': 'border-green/40 bg-green/12 text-green',
  'Rising topic': 'border-magenta/40 bg-magenta/12 text-magenta',
};

/**
 * Trending Odoo & business topics — file-driven, editor-approved. Renders only
 * published, non-expired, homepage-flagged topics. No fake popularity numbers.
 */
export function TrendingTopics() {
  const items = homepageTopics();
  if (items.length === 0) return null;

  return (
    <section id="trending" className="theme-dark grain relative overflow-hidden bay-sm">
      <div className="pointer-events-none absolute right-[6%] top-0 h-[420px] w-[460px] radial-core opacity-60" aria-hidden />
      <div className="shell relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">
              <Sparkles className="h-4 w-4" aria-hidden />
              Timely &amp; Relevant
            </p>
            <MaskedReveal
            immediate={false}
              as="h2"
              className="display-2"
              lines={[
                <span key="1">Trending Odoo &amp; Business</span>,
                <span key="2">Topics in <span className="signal-text">Pakistan.</span></span>,
              ]}
            />
          </div>
          <p className="max-w-xs text-[14px] leading-relaxed text-text-dark-muted">
            Guides on the decisions businesses actually face &mdash; cost, timelines, compliance
            and what to automate first.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.id}>
              <Link
                href={t.targetHref}
                className="glass glass-hover group flex h-full flex-col rounded-editorial p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${labelTone[t.freshnessLabel]}`}>
                    {t.freshnessLabel}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-text-dark-muted">{t.cluster}</span>
                </div>

                <h3 className="mt-4 font-heading text-[19px] font-semibold leading-snug text-text-dark">
                  {t.title}
                </h3>{' '}
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-text-dark-muted">
                  {t.shortAnswer}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-text-dark-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {t.readMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-violet-bright">
                    {t.ctaLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
