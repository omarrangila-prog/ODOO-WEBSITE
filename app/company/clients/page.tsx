import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { clientSectors, clientSource, clientCount } from '@/data/clients';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/company/clients';
const DESCRIPTION =
  'Selected clients of the Kausar Innovations group, of which ODOOVATIONS is part — education, FMCG and food, commodities and importers, publishing, wholesale and retail, textiles, associations and real estate.';

export const metadata: Metadata = buildMetadata({
  title: 'Selected Clients | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function ClientsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'Selected Clients', path: PATH },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema('Selected Clients', PATH, DESCRIPTION)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Selected clients</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">Businesses We Have</span>,
              <span key="2">Worked <span className="signal-text">With.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            A selection from across the {clientSource.parentCompany} group. The breadth of these
            sectors is why every engagement begins with process mapping rather than a standard
            template.
          </p>

          <AnswerCard
            question="Whose clients are these?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            ODOOVATIONS is part of the {clientSource.parentCompany} group. The {clientCount}{' '}
            organisations named on this page are clients of the group across its ERP, software
            and digital work. Names are shown typographically; logos are published only where an
            official high-resolution file and written permission are held. Per the group profile,{' '}
            {clientSource.verificationStatement.charAt(0).toLowerCase() +
              clientSource.verificationStatement.slice(1)}
          </AnswerCard>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell">
          <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
            {clientSectors.map((sector) => (
              <section key={sector.id} aria-labelledby={`sector-${sector.id}`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-light pb-4">
                  <h2
                    id={`sector-${sector.id}`}
                    className="font-heading text-[clamp(20px,2.2vw,26px)] font-semibold tracking-[-0.02em] text-ink"
                  >
                    {sector.name}
                  </h2>
                  {sector.industryHref && (
                    <Link
                      href={sector.industryHref}
                      className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-[13.5px] font-medium text-violet sm:min-h-0"
                    >
                      Sector page
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  )}
                </div>
                <ul className="mt-5 columns-1 gap-x-8 text-[16px] leading-[2] text-ink-muted sm:columns-2">
                  {sector.clients.map((c) => (
                    <li key={c} className="break-inside-avoid">
                      {c}
                    </li>
                  ))}
                </ul>
                {sector.note && (
                  <p className="mt-3 text-[14.5px] italic text-ink-muted/80">{sector.note}</p>
                )}
              </section>
            ))}
          </div>

          <p className="mt-14 max-w-[var(--reading-width)] rounded-panel border border-line-light bg-white/60 p-6 text-[15px] leading-relaxed text-ink-muted">
            Additional clients exist across each sector. The legal spelling of every organisation
            is confirmed against source documents prior to publication. Client names on this page
            do not by themselves describe the scope of work delivered &mdash; for that, see{' '}
            <Link href="/case-studies" className="text-violet underline-offset-4 hover:underline">
              our work
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Working in one of these sectors?"
        body="Tell us how the business runs today. We have almost certainly mapped a process like yours before."
        primaryLabel="Tell Us What You Need"
      />
    </>
  );
}
