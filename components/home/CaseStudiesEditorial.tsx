import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies as allCaseStudies } from '@/data/caseStudies';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { ClipReveal } from '@/components/ui/motion/ClipReveal';
import { ParallaxLayer } from '@/components/ui/motion/ParallaxLayer';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

/** Photographic editorial rail — only scenarios with commissioned imagery. */
const caseStudies = allCaseStudies.filter((c) => c.image);

export function CaseStudiesEditorial({ as = 'h2' }: { as?: 'h1' | 'h2' }) {
  return (
    <section id="case-studies" className="theme-light bay">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Selected Work</p>
          <MaskedReveal
            immediate={false}
            as={as}
            className={as === 'h1' ? 'display-1' : 'display-2'}
            lines={[
              <span key="1">How Odoo Maps to</span>,
              <span key="2">Your <span className="signal-text">Operations.</span></span>,
            ]}
          />{' '}
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            These are demonstration scenarios that show how we connect a real industry
            workflow in Odoo. They are clearly labelled as demonstrations&mdash;we publish named
            client stories and metrics only once a client has verified them.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          {caseStudies.map((cs, i) => {
            const reversed = i % 2 === 1;
            return (
              <article key={cs.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
                {/* Image — large, editorial */}
                <div className={cn('lg:col-span-7', reversed ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1')}>
                  <ClipReveal className="relative overflow-hidden rounded-editorial border border-line-light shadow-panel-light" from={reversed ? 'left' : 'bottom'}>
                    <div className="relative aspect-[16/10]">
                      <Image src={cs.image as string} alt={`${cs.label} — ${cs.industry}`} fill loading="lazy" sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                    </div>
                  </ClipReveal>
                </div>

                {/* Story */}
                <div className={cn('lg:col-span-5 lg:row-span-1', reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')}>
                  <ParallaxLayer offset={26}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-ink/10" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>{' '}
                      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{cs.industry}</span>
                    </div>
                    {cs.isDemonstration && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide amber-label">
                        Demonstration
                      </span>
                    )}
                    <h3 className="mt-3 font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-[-0.035em]">
                      {cs.label}
                    </h3>{' '}

                    <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-4">
                      <div className="flex flex-col items-center pt-1.5">
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink-muted" aria-hidden />
                        <span className="my-1 w-px flex-1 bg-line-light" aria-hidden />
                        <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(120deg,#7C4DFF,#E947C6)]" aria-hidden />
                      </div>
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">Before &mdash; Disconnected</p>
                          <TextGap />
                          <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{cs.before}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-violet">After &mdash; Controlled</p>
                          <TextGap />
                          <p className="mt-1 text-[15px] leading-relaxed text-ink">{cs.after}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex items-center gap-5">
                      <div>
                        <span className="font-heading text-3xl font-semibold signal-text">{cs.highlightMetric.value}</span>
                        {' '}
                        <span className="ml-2 text-[13px] text-ink-muted">{cs.highlightMetric.label}</span>
                      </div>
                    </div>

                    <Link href={`/case-studies/${cs.slug}`} className="mt-7 inline-flex min-h-[44px] items-center gap-1.5 font-heading text-[15px] font-medium text-violet underline-offset-4 hover:underline">
                      View the Complete Transformation
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </ParallaxLayer>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
