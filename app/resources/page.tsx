import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { resources } from '@/data/resources';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

export const metadata: Metadata = buildMetadata({
  title: 'Odoo Resources & Implementation Guides | ODOOVATIONS',
  description:
    'Practical, evergreen guides on Odoo implementation cost, Community vs Enterprise, data migration, timelines and choosing a partner — for decision-makers in Pakistan and beyond.',
  path: '/resources',
});

export default function ResourcesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[8%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Resources</p>
          <MaskedReveal
            as="h1"
            className="display-1 max-w-4xl"
            lines={[
              <span key="1">Odoo Guides for</span>,
              <span key="2">People Who <span className="signal-text">Make the Decision.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            No filler. Just practical, evergreen answers to the questions businesses ask before and
            during an Odoo project&mdash;cost factors, edition choice, migration, timelines and how
            to pick a partner.
          </p>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell">
          <ol className="grid gap-px overflow-hidden rounded-editorial border border-line-light bg-line-light sm:grid-cols-2">
            {resources.map((r) => (
              <li key={r.slug}>
                <Link href={r.href} className="group flex h-full flex-col bg-ivory-soft p-7 transition-colors hover:bg-white sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-violet">{r.eyebrow}</span>
                    <ArrowUpRight className="h-5 w-5 text-ink-muted transition-all group-hover:text-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </div>
                  <h2 className="mt-3 font-heading text-[clamp(20px,2vw,26px)] font-semibold leading-tight tracking-[-0.025em]">
                    {r.h1}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[15.5px] leading-relaxed text-ink-muted">{r.summary.split('. ')[0]}.</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-ink-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {r.readMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Have a question these guides don’t answer?" primaryLabel="Ask Our Team" />
    </>
  );
}
