import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { resources, getResource, type Block } from '@/data/resources';
import { company } from '@/data/company';
import { buildMetadata, breadcrumbSchema, faqSchema, SITE_URL } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextGap } from '@/components/ui/TextGap';

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return {};
  return buildMetadata({ title: r.metaTitle, description: r.metaDescription, path: r.href });
}

function articleSchema(r: NonNullable<ReturnType<typeof getResource>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: r.h1,
    description: r.metaDescription,
    datePublished: r.updated,
    dateModified: r.updated,
    author: { '@type': 'Organization', name: company.name, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/odoovations-logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}${r.href}`,
  };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug);
  if (!r) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: r.eyebrow, path: r.href },
  ];

  const related = r.relatedResources
    .map((slug) => resources.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd data={[articleSchema(r), breadcrumbSchema(crumbs), faqSchema(r.faqs)]} />

      <article>
        {/* Header */}
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">{r.eyebrow}</p>
            <TextGap />
            <h1 className="display-1 max-w-4xl">{r.h1}</h1>
            <TextGap />
            <div className="mt-6 flex items-center gap-4 text-[13px] text-text-dark-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {r.readMinutes} min read
              </span>
              <span>·</span>
              <span>Published by {company.name}, {new Date(r.updated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Answer-first summary + body */}
        <section className="theme-light bay-sm">
          <div className="shell">
            <div className="max-w-[820px]">
              {/* Answer-first callout */}
              <p className="rounded-editorial border-l-2 border-violet bg-ivory-soft p-6 text-[18px] leading-relaxed text-ink shadow-panel-light">
                {r.summary}
              </p>

              <div className="mt-12 space-y-6">
                {r.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>

              {/* Related services */}
              <div className="mt-14 border-t border-line-light pt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">Related services</p>
                <TextGap />
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {r.relatedServices.map((s) => (
                    <Link key={s.href} href={s.href} className="inline-flex items-center gap-1.5 rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">
                      {s.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-violet" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="display-2">Questions</h2>
            <TextGap />
            <Accordion items={r.faqs} allowMultiple />
          </div>
        </section>

        {/* Related resources */}
        {related.length > 0 && (
          <section className="theme-dark pb-8">
            <div className="shell">
              <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">Keep reading</p>
              <TextGap />
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((rr) => (
                  <Link key={rr.slug} href={rr.href} className="group flex items-center justify-between gap-4 rounded-editorial border border-line bg-graphite/60 p-6 transition-colors hover:border-violet-bright/40">
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-wide text-violet-bright">{rr.eyebrow}</span>
                      <span className="mt-1 block font-heading text-[17px] font-semibold text-text-dark">{rr.h1}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-text-dark-muted transition-colors group-hover:text-violet-bright" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBand title="Ready to talk through your Odoo project?" />
      </article>
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="display-3 pt-4 text-[clamp(24px,2.6vw,34px)] font-semibold">{block.text}</h2>;
    case 'p':
      return <p className="text-[17px] leading-[1.75] text-ink-muted">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-ink-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-line-light">
                {block.head.map((h) => (
                  <th key={h} className="py-3 pr-4 font-heading text-[14px] font-semibold text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line-light/60">
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? 'py-3 pr-4 font-medium text-ink' : 'py-3 pr-4 text-ink-muted'}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'note':
      return (
        <p className="rounded-panel border border-violet/25 bg-violet/[0.06] p-5 text-[15.5px] leading-relaxed text-ink">
          {block.text}
        </p>
      );
    default:
      return null;
  }
}
