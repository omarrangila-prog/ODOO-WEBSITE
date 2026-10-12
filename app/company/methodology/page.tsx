import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { journeyStages } from '@/data/journey';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { TextGap } from '@/components/ui/TextGap';

const DESCRIPTION =
  'How ODOOVATIONS delivers Odoo projects — a structured, stage-by-stage methodology from discovery and blueprint through build, migration, training, go-live and support.';

export const metadata: Metadata = buildMetadata({
  title: 'Our Odoo Implementation Methodology | ODOOVATIONS',
  description: DESCRIPTION,
  path: '/company/methodology',
});

export default function MethodologyPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'Methodology', path: '/company/methodology' },
  ];

  return (
    <>
      <JsonLd data={[webPageSchema('Our Odoo Implementation Methodology', '/company/methodology', DESCRIPTION), breadcrumbSchema(crumbs)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Our Methodology</p>
          <MaskedReveal
            as="h1"
            className="display-1 max-w-4xl"
            lines={[<span key="1">A Structured Route From</span>, <span key="2">Chaos to <span className="signal-text">Control.</span></span>]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Every ODOOVATIONS project follows the same disciplined stages, each with a clear
            deliverable. It is how we keep implementations predictable, avoid unnecessary
            customisation, and make sure your team is ready when the system goes live.
          </p>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell">
          <ol className="space-y-0">
            {journeyStages.map((s) => (
              <li key={s.n} className="grid gap-6 border-t border-line-light py-10 first:border-t-0 sm:grid-cols-[120px_1fr] sm:gap-10">
                <span className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.045em] text-ink/15">
                  {String(s.n).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="display-3 font-semibold">{s.title}</h2>
                    <span className="rounded-full border border-violet/25 bg-violet/[0.06] px-3 py-1 text-[12px] font-semibold text-violet">
                      Output: {s.deliverable}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-ink-muted">{s.purpose}</p>
                  <TextGap />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">What happens</p>
                      <TextGap />
                      <ul className="mt-2 space-y-1.5">
                        {s.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-[15px] text-ink-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" aria-hidden />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">Your part</p>
                      <TextGap />
                      <ul className="mt-2 space-y-1.5">
                        {s.clientRole.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-[15px] text-ink-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green" aria-hidden />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-[15px] text-ink-muted">
            See this applied in practice on our{' '}
            <Link href="/services/odoo-implementation-pakistan" className="text-violet underline-offset-4 hover:underline">
              Odoo implementation service
            </Link>{' '}
            or read the{' '}
            <Link href="/resources/odoo-implementation-timeline" className="text-violet underline-offset-4 hover:underline">
              implementation timeline guide
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Ready to start with a clear plan?" />
    </>
  );
}
