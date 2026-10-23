import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs } from '@/data/faq';
import { buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { PageArt } from '@/components/cinema/PageArt';

const PATH = '/faq';
const DESCRIPTION =
  'Straight answers on pricing, timelines, Odoo partner status, custom software, urgent delivery, international work and what ODOOVATIONS does and does not do.';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

/**
 * Standalone FAQ. The same questions appear on the homepage and service
 * pages; this page gives them one canonical URL and one FAQPage schema so
 * long-tail questions resolve to a single, citable answer.
 */
export default function FaqPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: PATH },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema('Frequently Asked Questions', PATH, DESCRIPTION), faqSchema(faqs)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <PageArt variant={4} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">FAQ</p>{' '}
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">The Questions We</span>,
              <span key="2">Hear <span className="signal-text">Most.</span></span>,
            ]}
          />{' '}
          <AnswerCard
            question="What is ODOOVATIONS?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            ODOOVATIONS is a Karachi-based technology company, part of the Kausar Innovations
            group, building custom software, AI automation, Odoo ERP, websites, apps, marketing
            and creative work for businesses in Pakistan and international clients served
            remotely. For Odoo work it is an independent implementation team, not an official partner.
          </AnswerCard>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell max-w-4xl">
          <Accordion items={faqs} allowMultiple />{' '}
          <p className="mt-10 text-[16px] text-ink-muted">
            Question not here? See{' '}
            <Link href="/company/pricing" className="text-violet underline-offset-4 hover:underline">
              how we price
            </Link>
            ,{' '}
            <Link href="/company/methodology" className="text-violet underline-offset-4 hover:underline">
              how we run projects
            </Link>{' '}
            or{' '}
            <Link href="/rapid-delivery" className="text-violet underline-offset-4 hover:underline">
              rapid delivery
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Ask us directly." body="A voice note, a spreadsheet or a plain description of the problem is enough." />
    </>
  );
}
