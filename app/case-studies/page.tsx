import type { Metadata } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { publishableProjects } from '@/data/projects';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { WorkGrid } from '@/components/work/WorkGrid';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/case-studies';
const DESCRIPTION =
  'Client projects, products and worked scenarios across custom software, AI, WhatsApp automation, election systems, event software, Odoo, web and marketing — searchable and filterable by capability.';

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
            itemListElement: [
              ...publishableProjects()
                .filter((p) => p.status !== 'DEMO')
                .map((p) => ({ '@type': 'ListItem', name: p.name })),
              ...caseStudies.map((c) => ({
                '@type': 'ListItem',
                name: c.label,
                url: `https://odoovations.com/case-studies/${c.slug}`,
              })),
            ].map((it, i) => ({ ...it, position: i + 1 })),
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
              <span key="1">Systems We Have</span>,
              <span key="2">Actually <span className="signal-text">Built.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Election systems, tournament software, WhatsApp integrations, business systems and
            more &mdash; search or filter by capability.
          </p>

          <AnswerCard
            question="Which of these are real client projects?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            Every card carries a status badge. <strong>Client Project</strong> and{' '}
            <strong>Internal Product</strong> entries are delivered work, published on the
            confirmation of ODOOVATIONS management; their descriptions state what the system does
            and nothing more, because we do not publish outcomes or figures we have not
            evidenced. <strong>Demonstration</strong> entries are worked scenarios showing how we
            approach a class of problem. Detailed case studies and client references are
            available on request.
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
