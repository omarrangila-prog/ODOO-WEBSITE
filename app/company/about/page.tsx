import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { company } from '@/data/company';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { TextGap } from '@/components/ui/TextGap';

const DESCRIPTION =
  'ODOOVATIONS is a Karachi-based technology company building custom software, AI automation, Odoo ERP, websites, apps, marketing and creative work for businesses in Pakistan and abroad.';

export const metadata: Metadata = buildMetadata({
  title: 'About ODOOVATIONS — Software, AI & Digital in Karachi',
  description: DESCRIPTION,
  path: '/company/about',
});

const values = [
  { t: 'Business before software', b: 'We understand your operations first. The technology follows the business logic, never the other way around.' },
  { t: 'Proven foundations where possible', b: 'We use standard, well-configured platforms wherever they fit, and build custom only for the steps those foundations genuinely miss.' },
  { t: 'Transparent scope', b: 'You always know what is configuration and what is custom development, agreed in writing before work begins.' },
  { t: 'Honest about what we are not', b: 'We hold no Odoo partner badge and do not display credentials we have not earned. We would rather be judged on process, communication and delivered work.' },
  { t: 'Local + international standard', b: 'Karachi-based understanding of how Pakistani businesses actually run, delivered with structured, international-standard process.' },
];

/** The three things the company does, in the order a project tends to need them. */
const pillars = [
  { t: 'Build', b: 'The software, system, site or app the business is missing — accounting, POS, inventory, hospital, election, trading and custom applications, plus websites and mobile apps.' },
  { t: 'Automate', b: 'AI agents, WhatsApp automation, document processing and approval routing that remove repetitive work, with a person still approving anything that carries risk.' },
  { t: 'Grow', b: 'Campaigns, creative, video and content that bring the right customers to a business now equipped to serve them.' },
];

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'About', path: '/company/about' },
  ];

  return (
    <>
      {/* Organization is emitted once globally in the root layout and referenced
          by @id from the WebPage entity — no second copy here. */}
      <JsonLd data={[webPageSchema('About ODOOVATIONS', '/company/about', DESCRIPTION), breadcrumbSchema(crumbs)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[8%] top-1/4 h-[440px] w-[440px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">About {company.name}</p>{' '}
          <MaskedReveal
            as="h1"
            className="display-1 max-w-4xl"
            lines={[<span key="1">Technology Built Around the Way</span>, <span key="2">Business <span className="signal-text">Really Works.</span></span>]}
          />{' '}
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            {company.name} brings software engineering, AI automation, Odoo ERP, digital products
            and growth-focused creative work together under one team. We begin with the business
            challenge, then design the technology required to solve it.
          </p>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display-2">What we do</h2>{' '}
            <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
              Seven divisions: AI &amp; automation, custom software and product development, Odoo
              &amp; ERP, websites and apps, marketing and advertising, creative and media, and
              content and social. One team, so the campaign, the landing page and the system
              behind them agree with one another.
            </p>{' '}
            <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
              {company.name} is part of the Kausar Innovations group. We work on-site with Karachi
              businesses and remotely with clients across Pakistan and abroad, on a structured
              process with clear deliverables at every stage.
            </p>
            <TextGap />
            <ul className="mt-8 space-y-5">
              {pillars.map((pl) => (
                <li key={pl.t} className="border-l-2 border-violet/40 pl-5">
                  <h3 className="font-heading text-[19px] font-semibold tracking-[-0.015em] text-ink">
                    {pl.t}
                  </h3>{' '}
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-muted">{pl.b}</p>
                </li>
              ))}
            </ul>
            <TextGap />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link href="/company/methodology" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Our methodology</Link>{' '}
              <Link href="/services" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Our services</Link>{' '}
              <Link href="/company/clients" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Selected clients</Link>{' '}
              <Link href="/company/global-delivery" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Global delivery</Link>{' '}
              <Link href="/case-studies" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Our work</Link>{' '}
              <Link href="/company/brand" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Brand information</Link>
            </div>
          </div>
          <div>
            <h2 className="display-2">How we work</h2>{' '}
            <ul className="mt-8 space-y-6">
              {values.map((v) => (
                <li key={v.t} className="flex items-start gap-3 border-t border-line-light pt-6 first:border-t-0 first:pt-0">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-violet" aria-hidden />{' '}
                  <div>
                    <h3 className="font-heading text-[19px] font-semibold">{v.t}</h3>{' '}
                    <p className="mt-1 text-[16px] leading-relaxed text-ink-muted">{v.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title="Want to see if we’re the right fit?" />
    </>
  );
}
