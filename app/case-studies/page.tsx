import type { Metadata } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { WorkGrid } from '@/components/work/WorkGrid';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/case-studies';
const DESCRIPTION =
  'Worked scenarios across AI automation, custom software, Odoo, web and marketing — showing how we approach each problem, clearly labelled as demonstrations rather than client claims.';

export const metadata: Metadata = buildMetadata({
  title: 'Our Work | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function CaseStudiesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: PATH },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Our Work', PATH, DESCRIPTION),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'ODOOVATIONS work',
            itemListElement: caseStudies.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.label,
              url: `https://odoovations.com/case-studies/${c.slug}`,
            })),
          },
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Our work</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">How We Approach</span>,
              <span key="2">Real <span className="signal-text">Problems.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Filter by capability to see how we would tackle each kind of problem &mdash; the
            existing workflow, what gets built, and what actually changes.
          </p>

          <AnswerCard
            question="Are these real client projects?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            No, and every card says so. These are worked demonstration scenarios showing our
            approach to a class of problem. We do not publish client names, logos or results
            without written permission, and we do not publish performance figures we cannot
            verify &mdash; so rather than invent them, we show the reasoning instead. We are happy
            to walk through actual delivered work, and arrange client references, during a
            conversation.
          </AnswerCard>
        </div>
      </section>

      <WorkGrid />

      <CtaBand
        title="Have a problem that looks like one of these?"
        body="Describe how it works today — a voice note, a spreadsheet or a screenshot is enough. We will tell you what we would build and what we would leave alone."
        primaryLabel="Describe My Requirement"
      />
    </>
  );
}
