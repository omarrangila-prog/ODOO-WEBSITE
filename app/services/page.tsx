import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

export const metadata: Metadata = buildMetadata({
  title: 'Odoo Services in Pakistan | ODOOVATIONS',
  description:
    'Odoo implementation, custom development, integration, consulting, support and training for businesses in Pakistan and worldwide.',
  path: '/services',
});

export default function ServicesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Editorial header */}
      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Services</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">Everything You Need to Run</span>,
              <span key="2">on <span className="signal-text">One Odoo System.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            From first implementation to custom development, integration and long-term
            support&mdash;scoped carefully, built to last, and shaped around how your business
            actually works.
          </p>
        </div>
      </section>

      {/* Large editorial numbered rows — not a card grid */}
      <section className="theme-light bay-sm">
        <div className="shell">
          <ol>
            {services.map((s, i) => (
              <li key={s.slug} className="border-t border-line-light last:border-b">
                <Link
                  href={s.href}
                  className="group flex flex-col gap-4 py-10 transition-colors sm:flex-row sm:items-center sm:gap-10 sm:py-12"
                >
                  <span className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-none tracking-[-0.045em] text-ink/15 transition-colors group-hover:text-violet/40 sm:w-[100px] sm:shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="display-3 font-semibold transition-colors group-hover:text-violet">
                      {s.navLabel}
                    </h2>
                    <p className="mt-2.5 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-ink-muted">
                      {s.tagline}
                    </p>
                  </div>

                  <span className="flex items-center gap-2 text-[15px] font-medium text-ink-muted transition-colors group-hover:text-violet sm:shrink-0">
                    Explore
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Not sure which service you need?" primaryLabel="Talk to Us" />
    </>
  );
}
