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
import { SolutionFinder } from '@/components/solutions/SolutionFinder';
import { TextGap } from '@/components/ui/TextGap';

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

      {/* Searchable, filterable library. Replaces the static editorial list:
          15 solutions is past the point where a plain list helps someone
          find the one they need. */}
      <SolutionFinder />

      {/* Route back up to the capability divisions */}
      <section className="theme-graphite bay-sm">
        <div className="shell">
          <h2 className="display-2">Not sure which one you need?</h2>
          <TextGap />
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Start from the capability instead. Each division explains what it covers and links to
            the systems it delivers.
          </p>
          <TextGap />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d) => (
              <li key={d.id}>
                <Link
                  href={d.href}
                  className="group flex h-full items-start gap-4 rounded-panel border border-line bg-white/[0.02] p-5 transition-colors hover:border-violet-bright/40 hover:bg-white/[0.04]"
                >
                  <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" aria-hidden />
                  <span>
                    <span className="block text-[16px] font-semibold text-text-dark">{d.label}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-text-dark-muted">
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
