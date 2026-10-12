import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { caseStudies, getCaseStudy } from '@/data/caseStudies';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { DevPlaceholder } from '@/components/ui/DevPlaceholder';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextGap } from '@/components/ui/TextGap';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.label,
    description: cs.metaDescription ?? `${cs.industry}: ${cs.challenge}`,
    path: `/case-studies/${cs.slug}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/case-studies' },
    { name: cs.label, path: `/case-studies/${cs.slug}` },
  ];

  return (
    <>
      <JsonLd data={[webPageSchema(`${cs.label} — Odoo Case Study`, `/case-studies/${cs.slug}`, cs.challenge), breadcrumbSchema(crumbs)]} />
      <article className="theme-dark grain relative overflow-hidden bay-sm pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-25" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">{cs.industry}</p>
          {cs.isDemonstration && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide amber-label">
              Demonstration scenario
            </span>
          )}
          <h1 className="display-1 max-w-3xl">{cs.label}</h1>
          {cs.isDemonstration && (
            <p className="mt-4 max-w-[var(--reading-width)] text-[15px] leading-relaxed text-text-dark-muted">
              This is an illustrative demonstration of how we implement Odoo for this kind of
              business&mdash;not a specific named client project. We publish verified client stories
              only with the client&rsquo;s agreement.
            </p>
          )}

          {cs.image && (
            <div className="mt-10 overflow-hidden rounded-editorial border border-line shadow-float">
              <div className="relative aspect-[3/2] sm:aspect-[2/1]">
                <Image src={cs.image} alt={`${cs.label} — ${cs.industry}`} fill priority sizes="(max-width: 1320px) 100vw, 1320px" className="object-cover" />
              </div>
            </div>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-panel border border-line bg-white/[0.02] p-5">
              <p className="text-[13px] font-bold uppercase tracking-wide text-text-dark-muted">Before &mdash; Disconnected</p>
              <TextGap />
              <p className="mt-1.5 text-[15px] text-text-dark-muted">{cs.before}</p>
            </div>
            <div className="rounded-panel border border-violet-bright/25 bg-violet/[0.08] p-5">
              <p className="text-[13px] font-bold uppercase tracking-wide text-violet-bright">After &mdash; Controlled</p>
              <TextGap />
              <p className="mt-1.5 text-[15px] text-text-dark">{cs.after}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-8">
              <Block title="The challenge" body={cs.challenge} />
              <Block title="Existing workflow" body={cs.existingWorkflow} />
              <Block title="Solution implemented" body={cs.solution} />
              <Block title="Operational outcome" body={cs.outcome} />
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-editorial border border-line bg-graphite/60 p-6">
                <h2 className="text-[13px] font-semibold uppercase tracking-wide text-text-dark-muted">Odoo modules used</h2>
                <TextGap />
                <ul className="mt-3 space-y-2">
                  {cs.modules.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-[15px] text-text-dark">
                      <Check className="h-4 w-4 text-green" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <h2 className="text-[13px] font-semibold uppercase tracking-wide text-text-dark-muted">Measurable results</h2>
                  <TextGap />
                  <div className="mt-3 space-y-2">
                    {cs.metrics.map((m) =>
                      m.verified ? (
                        <p key={m.label} className="flex items-baseline gap-2">
                          <span className="font-heading text-2xl font-semibold signal-text">{m.value}</span>
                          <span className="text-[15px] text-text-dark-muted">{m.label}</span>
                        </p>
                      ) : (
                        <DevPlaceholder key={m.label} label="Add verified metric before launch" />
                      ),
                    )}
                    <p className="text-[15px] leading-relaxed text-text-dark-muted">{cs.resultLine}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      {/* Carries the project slug so the enquiry arrives with the reference
          the visitor was reading about. Slug only — no private detail. */}
      <CtaBand
        title="Ready for the same clarity in your business?"
        primaryLabel="Build Something Similar"
        primaryHref={`/contact?from=project-${cs.slug}#form`}
      />
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <TextGap />
      <p className="mt-2 text-[15.5px] leading-relaxed text-text-dark-muted">{body}</p>
    </div>
  );
}
