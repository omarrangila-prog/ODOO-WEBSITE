import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { solutions } from '@/data/solutions';
import { divisions } from '@/data/divisions';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/solutions';
const DESCRIPTION =
  'Accounting, POS, inventory, hospital management, factory automation, WhatsApp automation, AI agents and FBR-ready invoicing — what each system does, who it is for and what drives its cost.';

export const metadata: Metadata = buildMetadata({
  title: 'Business Software Solutions | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function SolutionsIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: PATH },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Business Software Solutions', PATH, DESCRIPTION),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'ODOOVATIONS solutions',
            itemListElement: solutions.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.h1,
              url: `https://odoovations.com${s.href}`,
            })),
          },
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Solutions</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">The System,</span>,
              <span key="2">Not the <span className="signal-text">Sales Pitch.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Our capability pages describe what we do. These pages describe what you actually
            receive &mdash; what the system covers, who it suits, what drives the cost and where
            projects like it usually go wrong.
          </p>

          <AnswerCard
            question="What does ODOOVATIONS build?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            ODOOVATIONS builds business systems including accounting software, POS and restaurant
            POS, inventory and warehouse management, hospital and clinic management, factory
            production automation, WhatsApp automation, AI agents and FBR-ready invoicing &mdash;
            delivered either as custom software or on an Odoo foundation, whichever genuinely fits
            the process and the budget.
          </AnswerCard>
        </div>
      </section>

      {/* Editorial rows — matches the /services hub pattern */}
      <section className="theme-light bay-sm">
        <div className="shell">
          <ol>
            {solutions.map((s, i) => (
              <li key={s.slug} className="border-t border-line-light last:border-b">
                <Link
                  href={s.href}
                  className="group flex flex-col gap-4 py-10 transition-colors sm:flex-row sm:items-start sm:gap-10 sm:py-12"
                >
                  <span className="font-heading text-[15px] font-semibold text-ink/25 sm:w-16 sm:shrink-0 sm:pt-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {s.eyebrow}
                    </span>
                    <span className="mt-2 block font-heading text-[clamp(24px,2.8vw,34px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink transition-colors group-hover:text-violet">
                      {s.h1}
                    </span>
                    <span className="mt-3 block max-w-[52ch] text-[16.5px] leading-relaxed text-ink-muted">
                      {s.metaDescription}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {s.modules.slice(0, 5).map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-line-light px-3 py-1 text-[12.5px] text-ink-muted"
                        >
                          {m}
                        </span>
                      ))}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet sm:mt-2"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Route back up to the capability divisions */}
      <section className="theme-graphite bay-sm">
        <div className="shell">
          <h2 className="display-2">Not sure which one you need?</h2>
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Start from the capability instead. Each division explains what it covers and links to
            the systems it delivers.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d) => (
              <li key={d.id}>
                <Link
                  href={d.href}
                  className="group flex h-full items-start gap-4 rounded-panel border border-line bg-white/[0.02] p-5 transition-colors hover:border-violet-bright/40 hover:bg-white/[0.04]"
                >
                  <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" aria-hidden />
                  <span>
                    <span className="block text-[15.5px] font-semibold text-text-dark">{d.label}</span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-text-dark-muted">
                      {d.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Tell us the problem, not the product name."
        primaryLabel="Describe My Requirement"
      />
    </>
  );
}
