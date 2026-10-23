import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, CircleAlert } from 'lucide-react';
import { industries, getIndustry } from '@/data/industries';
import { faqs } from '@/data/faq';
import { buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextGap } from '@/components/ui/TextGap';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return buildMetadata({ title: ind.metaTitle, description: ind.metaDescription, path: ind.href });
}

/*
 * Fallback only. Every industry now carries its own questions; this generic
 * set remains for any industry added later that has not been written up yet,
 * so the page still renders rather than shipping an empty FAQ section.
 */
const sharedIndustryFaq = faqs.filter((f) =>
  [
    'Is Odoo suitable for a small or medium-sized business?',
    'Can Odoo follow our existing business process?',
    'Can you migrate data from Excel or another ERP?',
    'Can you build completely custom Odoo modules?',
  ].includes(f.question),
);

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();

  const industryFaq = ind.faqs ?? sharedIndustryFaq;

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: ind.name, path: ind.href },
  ];

  return (
    <>
      <JsonLd data={[webPageSchema(ind.metaTitle, ind.href, ind.metaDescription), breadcrumbSchema(crumbs), faqSchema(industryFaq)]} />

      <article>
        {/* Full-bleed photographic hero with overlaid content */}
        <section className="theme-dark relative min-h-[78vh] overflow-hidden">
          <div className="absolute inset-0" aria-hidden>
            {ind.image ? (
              <Image src={ind.image} alt="" fill priority sizes="100vw" className="object-cover" />
            ) : (
              /* No commissioned photography for this industry yet — a built
                 hero rather than a request for a file that does not exist. */
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(120% 90% at 70% 30%, var(--graphite) 0%, var(--midnight) 62%)' }}
                />
                <div className="absolute inset-0 arch-grid opacity-40" />
                <div className="absolute right-[10%] top-[24%] h-[520px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.20),transparent_68%)]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/20 to-transparent" />
          </div>
          <div className="relative flex min-h-[78vh] flex-col">
            <div className="shell pt-28 sm:pt-32">
              <Breadcrumbs items={crumbs} />
            </div>
            <div className="mt-auto">
              <div className="shell pb-14">
                <p className="eyebrow mb-5">Industries</p>
                <TextGap />
                <h1 className="display-1 max-w-4xl">{ind.h1 ?? `Odoo for ${ind.name}`}</h1>
                <TextGap />
                <p className="lede mt-6 max-w-[var(--reading-width)] text-white/85">{ind.description}</p>
                <TextGap />
                <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {ind.workflow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2 text-[14px] font-medium text-white">
                      <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">{step}</span>
                      {i < ind.workflow.length - 1 && <span className="text-violet-bright" aria-hidden>→</span>}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="theme-light bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="display-2">Common problems</h2>
              <TextGap />
              <ul className="mt-9 divide-y divide-line-light border-t border-line-light">
                {ind.problems.map((p) => (
                  <li key={p} className="flex items-start gap-4 py-5">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-magenta" aria-hidden />
                    <span className="text-[17px] leading-relaxed text-ink-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display-2">Expected outcomes</h2>
              <TextGap />
              <ul className="mt-9 space-y-4">
                {ind.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[17px] leading-relaxed text-ink">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {ind.modules.map((m) => (
                  <span key={m} className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] text-ink-muted">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {ind.approach && (
          <section className="theme-graphite bay-sm">
            <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <h2 className="display-2">How we implement Odoo for {ind.name.toLowerCase()}</h2>
                <TextGap />
                <p className="mt-6 max-w-[var(--reading-width)] text-[17px] leading-[1.7] text-text-dark-muted">
                  {ind.approach}
                </p>
              </div>
              {ind.departments && (
                <div className="lg:pt-2">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">
                    Departments we connect
                  </p>
                  <TextGap />
                  <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {ind.departments.map((d) => (
                      <li
                        key={d}
                        className="rounded-control border border-line bg-white/[0.02] px-4 py-3 text-[15px] font-medium text-text-dark"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {ind.beyond && ind.beyond.length > 0 && (
          <section className="theme-light bay-sm">
            <div className="shell">
              <p className="eyebrow mb-5">Beyond the ERP</p>
              <TextGap />
              <h2 className="display-2 max-w-3xl">
                What else this sector usually needs
              </h2>
              <TextGap />
              <p className="lede mt-5 max-w-[var(--reading-width)]">
                An ERP is rarely the only thing a business in this position is missing. These are
                the capabilities that most often matter alongside it.
              </p>
              <TextGap />
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {ind.beyond.map((b) => (
                  <li key={b.href}>
                    <Link
                      href={b.href}
                      className="group flex h-full flex-col rounded-editorial border border-line-light bg-white/[0.035] p-6 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-violet/30 hover:shadow-panel-light"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-heading text-[19px] font-semibold tracking-[-0.02em] text-ink">
                          {b.label}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-ink/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-2 text-[16px] leading-relaxed text-ink-muted">{b.body}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="display-2">Questions for {ind.name.toLowerCase()} businesses</h2>
            <TextGap />
            <Accordion items={industryFaq} allowMultiple />
          </div>
        </section>

        <section className="theme-dark pb-4">
          <div className="shell">
            <p className="text-[15px] text-text-dark-muted">
              Other industries:{' '}
              {industries.filter((i) => i.slug !== ind.slug).map((i, idx, arr) => (
                <span key={i.slug}>
                  <Link href={i.href} className="text-violet-bright underline-offset-4 hover:underline">{i.name}</Link>
                  {idx < arr.length - 1 && ' · '}
                </span>
              ))}
            </p>
          </div>
        </section>

        <CtaBand
          title={
            ind.h1
              ? `Working in ${ind.name.toLowerCase()}?`
              : `See how Odoo fits ${ind.name.toLowerCase()}`
          }
        />
      </article>
    </>
  );
}
