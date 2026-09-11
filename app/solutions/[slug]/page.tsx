import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CircleAlert, ArrowUpRight, ExternalLink, Clock, Wallet, MessageCircle, Phone } from 'lucide-react';
import { solutions, getSolution, type SolBlock } from '@/data/solutions';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sol = getSolution(params.slug);
  if (!sol) return {};
  return buildMetadata({ title: sol.metaTitle, description: sol.metaDescription, path: sol.href });
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const sol = getSolution(params.slug);
  if (!sol) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: sol.eyebrow, path: sol.href },
  ];

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact#form';

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(sol.h1, sol.metaDescription, sol.href),
          webPageSchema(sol.metaTitle, sol.href, sol.metaDescription),
          breadcrumbSchema(crumbs),
          faqSchema(sol.faqs),
        ]}
      />

      <article>
        {/* Hero */}
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
          <div className="pointer-events-none absolute right-0 top-16 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">{sol.eyebrow}</p>
            <MaskedReveal as="h1" className="display-1 max-w-4xl" lines={[<span key="1">{sol.h1}</span>]} />

            {/* Answer-first glass panel */}
            <div className="glass mt-8 max-w-3xl rounded-editorial p-6 sm:p-7">
              <p className="text-[17px] leading-relaxed text-text-dark">{sol.answer}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#form">
                {sol.ctaLabel}
                <ArrowNudge />
              </ButtonLink>
              <ButtonLink href={waHref} external={waConfigured} variant="secondary">
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                Talk on WhatsApp
              </ButtonLink>
              <a href={company.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 px-2 text-[15px] font-medium text-text-dark-muted transition-colors hover:text-text-dark">
                <Phone className="h-4 w-4 text-violet-bright" aria-hidden />
                {company.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for + modules */}
        <section className="theme-light bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div className="max-w-[820px] space-y-6">
              <div>
                <h2 className="display-3 font-semibold">Who this is for</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-muted">{sol.forWho}</p>
              </div>
              {sol.blocks.map((b, i) => (
                <SolBlockView key={i} block={b} />
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
              <div className="rounded-editorial border border-line-light bg-ivory-soft p-6 shadow-panel-light">
                <h3 className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">Relevant Odoo modules</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sol.modules.map((m) => (
                    <span key={m} className="rounded-full border border-line-light bg-white px-3 py-1 text-[13px] text-ink">{m}</span>
                  ))}
                </div>

                <h3 className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink-muted"><Wallet className="h-3.5 w-3.5" aria-hidden />What affects cost</h3>
                <ul className="mt-2 space-y-1.5">
                  {sol.costFactors.map((c) => <li key={c} className="text-[14px] text-ink-muted">• {c}</li>)}
                </ul>

                <h3 className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink-muted"><Clock className="h-3.5 w-3.5" aria-hidden />What affects timeline</h3>
                <ul className="mt-2 space-y-1.5">
                  {sol.timelineFactors.map((c) => <li key={c} className="text-[14px] text-ink-muted">• {c}</li>)}
                </ul>

                <h3 className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink-muted"><CircleAlert className="h-3.5 w-3.5 text-magenta" aria-hidden />Risks to plan for</h3>
                <ul className="mt-2 space-y-1.5">
                  {sol.risks.map((c) => <li key={c} className="text-[14px] text-ink-muted">• {c}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Official sources (e.g. FBR) */}
        {sol.officialSources && sol.officialSources.length > 0 && (
          <section className="theme-graphite bay-sm">
            <div className="shell">
              <h2 className="display-3 font-semibold">Official sources</h2>
              <p className="mt-3 max-w-[var(--reading-width)] text-[16px] leading-relaxed text-text-dark-muted">
                Always confirm current requirements with the official source. ODOOVATIONS is an Odoo
                implementation company, not a tax authority or advisor.
              </p>
              <ul className="mt-5 space-y-2">
                {sol.officialSources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-violet-bright underline-offset-4 hover:underline">
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="display-2">Questions</h2>
            <Accordion items={sol.faqs} allowMultiple />
          </div>
        </section>

        {/* Related */}
        <section className="theme-dark pb-6">
          <div className="shell flex flex-wrap gap-2.5">
            {[...sol.relatedServices, ...sol.relatedResources].map((r) => (
              <Link key={r.href} href={r.href} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-text-dark-muted transition-colors hover:border-violet-bright/40 hover:text-text-dark">
                {r.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </section>

        <CtaBand title={sol.ctaLabel} />
      </article>
    </>
  );
}

function SolBlockView({ block }: { block: SolBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="display-3 pt-3 text-[clamp(24px,2.6vw,34px)] font-semibold">{block.text}</h2>;
    case 'p':
      return <p className="text-[17px] leading-[1.75] text-ink-muted">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-ink-muted">
              <Check className="mt-1 h-4 w-4 shrink-0 text-violet" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
      );
    case 'workflow':
      return (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {block.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <span className="rounded-lg border border-line-light bg-ivory-soft px-3 py-1.5">{s}</span>
              {i < block.steps.length - 1 && <span className="text-violet" aria-hidden>→</span>}
            </li>
          ))}
        </ol>
      );
    case 'table':
      // Tables may legitimately be wider than a phone; they scroll inside
      // their own container so the page itself never scrolls sideways.
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
        <p className="rounded-panel border border-amber/30 bg-amber/[0.07] p-5 text-[15px] leading-relaxed text-ink">
          {block.text}
        </p>
      );
    default:
      return null;
  }
}
