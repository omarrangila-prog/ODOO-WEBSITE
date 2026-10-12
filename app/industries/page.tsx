import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { ClipReveal } from '@/components/ui/motion/ClipReveal';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

export const metadata: Metadata = buildMetadata({
  title: 'Odoo Solutions by Industry',
  description:
    'Odoo solutions tailored to manufacturing, textile, distribution, retail, pharmaceuticals, construction, professional services and food & hospitality.',
  path: '/industries',
});

export default function IndustriesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute left-[55%] top-1/3 h-[460px] w-[520px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Industries</p>
          <MaskedReveal
            as="h1"
            className="display-1 max-w-5xl"
            lines={[
              <span key="1">Built Around the Way</span>,
              <span key="2">Your Industry <span className="signal-text">Actually Works.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Every industry has a different operational rhythm&mdash;different bottlenecks, different
            paperwork, different definitions of &ldquo;done&rdquo;. Your Odoo system should reflect it.
          </p>
        </div>
      </section>

      {/* Large alternating editorial rows */}
      <section className="theme-light bay-sm">
        <div className="shell flex flex-col gap-20 sm:gap-28">
          {industries.map((ind, i) => {
            const reversed = i % 2 === 1;
            return (
              <article key={ind.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={cn(reversed && 'lg:order-2')}>
                  <ClipReveal
                    className="overflow-hidden rounded-editorial border border-line-light shadow-panel-light"
                    from={reversed ? 'left' : 'bottom'}
                  >
                    <div className="relative w-full aspect-[16/10] sm:min-h-[380px]">
                      {ind.image ? (
                        <Image
                          src={ind.image}
                          alt={`${ind.name} — operational context`}
                          fill
                          loading={i < 2 ? 'eager' : 'lazy'}
                          priority={i === 0}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#161823,#241a3d_55%,#3a1d46)]">
                          <span className="px-8 text-center font-heading text-[clamp(22px,3vw,34px)] font-semibold leading-tight tracking-[-0.03em] text-white/90">
                            {ind.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </ClipReveal>
                </div>

                <div className={cn(reversed && 'lg:order-1')}>
                  <span className="font-heading text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] text-ink/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="display-3 mt-3 font-semibold">{ind.name}</h2>
                  <TextGap />
                  <p className="mt-4 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-ink-muted">
                    {ind.description}
                  </p>

                  <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
                    {ind.workflow.map((step, idx) => (
                      <li key={step} className="flex items-center gap-2 text-[14px] font-medium text-ink">
                        <span className="rounded-lg border border-line-light bg-ivory-soft px-3 py-1.5">{step}</span>
                        {idx < ind.workflow.length - 1 && <span className="text-violet" aria-hidden>→</span>}
                      </li>
                    ))}
                  </ol>

                  <Link
                    href={ind.href}
                    className="group mt-7 inline-flex min-h-[44px] items-center gap-2 font-heading text-[16px] font-medium text-violet underline-offset-4 hover:underline"
                  >
                    Explore Odoo for {ind.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand title="Let’s map Odoo to your industry" />
    </>
  );
}
