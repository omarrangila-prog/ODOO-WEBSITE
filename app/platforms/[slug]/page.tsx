import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { platformPages, getPlatformPage, platformNotice, platformGroups } from '@/data/platforms';
import { contactHref } from '@/data/ctas';
import { buildMetadata, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CtaBand } from '@/components/ui/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { PageArt } from '@/components/cinema/PageArt';

export const dynamicParams = false;

export function generateStaticParams() {
  return platformPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getPlatformPage(params.slug);
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.href });
}

export default function PlatformPageRoute({ params }: { params: { slug: string } }) {
  const page = getPlatformPage(params.slug);
  if (!page) notFound();

  const group = platformGroups.find((g) => g.id === page.group);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Platforms', path: '/platforms' },
    { name: page.name, path: page.href },
  ];
  const others = platformPages.filter((p) => p.slug !== page.slug);
  const cta = contactHref(page.formService, `platform-${page.slug}`);
  const variant = 2 + platformPages.findIndex((p) => p.slug === page.slug);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(page.title, page.metaDescription, page.href), faqSchema(page.faqs)]} />

      <article>
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <PageArt variant={variant} />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">Platforms{group ? ` · ${group.label}` : ''}</p>
            <h1 className="display-1 max-w-5xl">{page.title}</h1>{' '}
            <p className="mt-7 max-w-[var(--reading-width)] font-heading text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-text-dark">
              {page.hook}
            </p>{' '}
            <p className="lede mt-5 max-w-[var(--reading-width)]">{page.intro}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={cta}>
                {page.ctaLabel}
                <ArrowNudge />
              </ButtonLink>{' '}
              <WhatsAppButton label="Ask on WhatsApp" />
            </div>

            {page.boundary && (
              <p className="mt-8 max-w-[var(--reading-width)] rounded-panel border border-amber/40 bg-amber/[0.06] p-5 text-[15px] leading-relaxed text-text-dark">
                {page.boundary}
              </p>
            )}

            <AnswerCard question={`What does ODOOVATIONS do with ${page.name}?`} className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted">
              {page.answer}
            </AnswerCard>
          </div>
        </section>

        <section className="theme-graphite bay-sm">
          <div className="shell">
            <FlowDiagram label={page.flow.label} steps={page.flow.steps} note={page.flow.note} className="text-text-dark" />
          </div>
        </section>

        <section className="theme-dark bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="page-h2">Who this is for</h2>
              <ul className="mt-8 space-y-4">
                {page.audience.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[17px] leading-relaxed text-text-dark-muted">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden /> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="page-h2">Problems this solves</h2>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {page.problems.map((p) => (
                  <li key={p} className="py-4 text-[17px] leading-relaxed text-text-dark-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="theme-graphite bay-sm">
          <div className="shell">
            <h2 className="page-h2">What is included</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {page.included.map((w, i) => (
                <li key={w.title} className="rounded-[20px] border border-line bg-white/[0.02] p-6">
                  <p aria-hidden className="text-[12px] tracking-[0.18em] text-violet/80">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-heading text-[20px] font-semibold leading-tight tracking-[-0.02em] text-white">{w.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-text-dark-muted">{w.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="theme-dark bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="page-h2">What it connects to</h2>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {page.integrations.map((i) => (
                  <div key={i.name} className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                    <dt className="font-heading text-[17px] font-semibold text-white">{i.name}</dt>
                    <dd className="text-[16px] leading-relaxed text-text-dark-muted">{i.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="page-h2">Technical considerations</h2>
              <ul className="mt-8 space-y-4">
                {page.considerations.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[16px] leading-relaxed text-text-dark-muted">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="theme-graphite bay-sm">
          <div className="shell">
            <h2 className="page-h2">How we work</h2>
            <ol className="mt-10 grid gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
              {page.process.map((s, i) => (
                <li key={s.title}>
                  <p aria-hidden className="text-[12px] tracking-[0.18em] text-violet/80">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-heading text-[19px] font-semibold tracking-[-0.02em] text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="theme-dark bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="page-h2">What affects the price</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-text-dark-muted">
                We quote against a written scope after a short conversation. These are the things that move the number.
              </p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {page.priceFactors.map((f) => (
                  <li key={f} className="py-3 text-[16px] leading-relaxed text-text-dark">{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="page-h2">What affects the timeline</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-text-dark-muted">
                We give a date only after reviewing the scope. These are what usually decide it.
              </p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {page.timelineFactors.map((f) => (
                  <li key={f} className="py-3 text-[16px] leading-relaxed text-text-dark">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="theme-graphite bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="page-h2">When {page.name} is not the right choice</h2>
              <ul className="mt-8 space-y-4">
                {page.notAFit.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-[16px] leading-relaxed text-text-dark-muted">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" /> {n}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="page-h2">What we can show today</h2>
              <p className="mt-8 text-[16px] leading-relaxed text-text-dark-muted">{page.evidence}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-text-dark-muted">
                See the <Link href="/case-studies">work we do publish</Link>, with each project labelled for what it is.
              </p>
            </div>
          </div>
        </section>

        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="page-h2">Common questions</h2>
            <Accordion items={page.faqs} allowMultiple />
          </div>
        </section>

        <section className="theme-dark pb-4">
          <div className="shell">
            <p className="text-[15px] text-text-dark-muted">
              Related:{' '}
              {page.related.map((r, i, arr) => (
                <span key={r.href}>
                  <Link href={r.href}>{r.label}</Link>
                  {i < arr.length - 1 && ' · '}
                </span>
              ))}
            </p>
            <p className="mt-3 text-[15px] text-text-dark-muted">
              Other platforms:{' '}
              {others.map((o, i, arr) => (
                <span key={o.slug}>
                  <Link href={o.href}>{o.name}</Link>
                  {i < arr.length - 1 && ' · '}
                </span>
              ))}{' '}
              · <Link href="/platforms">All platforms</Link>
            </p>
            <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-text-dark-muted">{platformNotice}</p>
          </div>
        </section>

        <CtaBand title={`Ready to talk about ${page.name}?`} primaryLabel={page.ctaLabel} primaryHref={cta} />
      </article>
    </>
  );
}
