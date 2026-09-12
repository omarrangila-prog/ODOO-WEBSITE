import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Layers, LifeBuoy, Zap, CircleAlert } from 'lucide-react';
import { buildMetadata, breadcrumbSchema, webPageSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/company/pricing';
const DESCRIPTION =
  'How ODOOVATIONS prices work: fixed-price against a written scope, phased builds, support retainers and rapid-delivery tracks. What drives cost, and what we will tell you before you commit.';

export const metadata: Metadata = buildMetadata({
  title: 'How We Price | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

/**
 * Engagement models, without invented figures. The brief allows public
 * starting prices only where management has approved them and will honour
 * them; none have been supplied, so this page explains the models and the
 * cost drivers and stops there.
 */
const models = [
  {
    icon: FileText,
    name: 'Fixed price, defined scope',
    fits: 'Websites, landing pages, a single automation, a focused software module, a dashboard, creative deliverables.',
    how: 'A written scope after a short discovery, a fixed price against it, and a change process if the scope moves. You know the number before work starts.',
  },
  {
    icon: Layers,
    name: 'Phased project',
    fits: 'Business systems, ERP implementations, multi-module software, hospital and factory systems, anything with integrations and data migration.',
    how: 'Discovery first, then the build in phases with a price per phase. The first phase goes live early so assumptions are tested while they are cheap to correct, and each phase leaves you with something usable.',
  },
  {
    icon: LifeBuoy,
    name: 'Support retainer',
    fits: 'Any system after go-live.',
    how: 'A monthly allocation for issues, changes and the improvements that only become obvious once people use the system daily. Sized to the system; adjustable as it settles.',
  },
  {
    icon: Zap,
    name: 'Rapid delivery track',
    fits: 'Selected well-defined scopes with a hard deadline.',
    how: 'Priority engineering capacity, priced accordingly because it reorders other committed work. Eligibility confirmed after scope review — never before.',
  },
];

const drivers = [
  'Number of distinct workflows the system must handle',
  'User roles and permission complexity',
  'Integrations, and whether the other system has a usable API',
  'Condition and volume of existing data to migrate',
  'Mobile access — responsive web versus native apps',
  'Reporting depth beyond standard lists',
  'Approval rounds and how quickly decisions are made on your side',
];

const faqs = [
  {
    question: 'Why is there no price list?',
    answer:
      'Because "an inventory system" or "a website" covers an order-of-magnitude range of work. A number attached to a category name is either padded or will be raised through change requests later. We quote against a written scope so the figure means something.',
  },
  {
    question: 'How do I compare your quote with another firm’s?',
    answer:
      'Ask both to quote against the same written scope listing workflows, roles, integrations and reports by name. If two quotes differ by a large multiple, they are almost always describing different projects. Ask each firm what happens to the price when something is discovered mid-build.',
  },
  {
    question: 'Are you the cheapest option?',
    answer:
      'No. The cheapest quote usually reflects a smaller scope, a template, or a plan to recover margin later. We price for the work described, phase it so value arrives early, and will tell you when an off-the-shelf product would serve you better than anything we could build.',
  },
  {
    question: 'What do we pay for after go-live?',
    answer:
      'Hosting and any third-party service the system depends on, billed as incurred, and a support retainer if you want one. Both are set out before the project starts so there are no surprises.',
  },
  {
    question: 'Do we own what you build?',
    answer:
      'Yes. Source code and ownership terms are in the agreement before work starts.',
  },
];

export default function PricingPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'How We Price', path: PATH },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema('How We Price', PATH, DESCRIPTION), faqSchema(faqs)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Pricing &amp; engagement</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">Scope-Based Pricing.</span>,
              <span key="2">No <span className="signal-text">Surprises.</span></span>,
            ]}
          />
          <AnswerCard
            question="How does ODOOVATIONS price a project?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            Against a written scope, after discovery. Defined scopes are fixed-price; larger
            builds are phased with a price per phase; support after go-live is a monthly
            retainer; urgent work runs on a priced rapid-delivery track. We do not publish a
            category price list, because two projects with the same name can differ by an order
            of magnitude, and we are not the cheapest option.
          </AnswerCard>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell">
          <h2 className="display-2">Four ways we work</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {models.map((m) => (
              <article key={m.name} className="rounded-editorial border border-line-light bg-white/60 p-7 sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-control bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white">
                  <m.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-[22px] font-semibold tracking-[-0.02em] text-ink">{m.name}</h3>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Fits</p>
                <p className="mt-1 text-[15.5px] leading-relaxed text-ink-muted">{m.fits}</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">How it works</p>
                <p className="mt-1 text-[15.5px] leading-relaxed text-ink-muted">{m.how}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-graphite bay-sm">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="display-2">What moves the number</h2>
            <ul className="mt-8 space-y-3">
              {drivers.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-text-dark-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display-2">From first call to a number</h2>
            <FlowDiagram
              label="How a quote is produced"
              steps={['Enquiry', 'Discovery', 'Written scope', 'Estimate', 'Your decision', 'Build']}
              note="Discovery is short for small scopes and a paid, standalone piece of work for large systems — because a quote for a hospital or ERP build without discovery is a guess."
              className="mt-8 text-text-dark"
            />
            <p className="mt-8 flex items-start gap-2.5 text-[15px] leading-relaxed text-text-dark-muted">
              <CircleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber" aria-hidden />
              <span>
                Cost guides for specific systems:{' '}
                <Link href="/resources/custom-software-cost-pakistan" className="text-violet-bright underline-offset-4 hover:underline">custom software</Link>,{' '}
                <Link href="/resources/odoo-implementation-cost-pakistan" className="text-violet-bright underline-offset-4 hover:underline">Odoo implementation</Link>,{' '}
                <Link href="/resources/business-website-cost-pakistan" className="text-violet-bright underline-offset-4 hover:underline">websites</Link>.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="theme-dark bay-sm">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display-2">Pricing questions</h2>
          <Accordion items={faqs} allowMultiple />
        </div>
      </section>

      <CtaBand title="Get a scope and estimate." body="Describe the requirement. We will tell you which model fits, what discovery is needed, and what we would leave out." primaryLabel="Get a Scope & Estimate" />
    </>
  );
}
