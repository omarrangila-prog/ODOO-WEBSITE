import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { company } from '@/data/company';
import { buildMetadata, breadcrumbSchema, webPageSchema, organizationSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const DESCRIPTION =
  'ODOOVATIONS is a Karachi-based Odoo implementation and development team helping businesses in Pakistan and abroad replace disconnected systems with one connected Odoo platform.';

export const metadata: Metadata = buildMetadata({
  title: 'About ODOOVATIONS — Karachi Odoo Implementation Team',
  description: DESCRIPTION,
  path: '/company/about',
});

const values = [
  { t: 'Business before software', b: 'We understand your operations first. The technology follows the business logic, never the other way around.' },
  { t: 'Standard where possible', b: 'We use well-configured standard Odoo wherever it fits, and customise only where it creates real value.' },
  { t: 'Transparent scope', b: 'You always know what is standard configuration and what is custom development, agreed before work begins.' },
  { t: 'Local + international standard', b: 'Karachi-based understanding of how Pakistani businesses run, delivered with structured, international-standard process.' },
];

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'About', path: '/company/about' },
  ];

  return (
    <>
      <JsonLd data={[organizationSchema(), webPageSchema('About ODOOVATIONS', '/company/about', DESCRIPTION), breadcrumbSchema(crumbs)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[8%] top-1/4 h-[440px] w-[440px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">About {company.name}</p>
          <MaskedReveal
            as="h1"
            className="display-1 max-w-4xl"
            lines={[<span key="1">An Odoo Team That Starts</span>, <span key="2">With Your <span className="signal-text">Business.</span></span>]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            {company.name} is a Karachi-based Odoo implementation and custom-development team. We help
            businesses in Pakistan and internationally replace disconnected spreadsheets, WhatsApp
            coordination and manual approvals with one connected Odoo system&mdash;built around how
            they actually operate.
          </p>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display-2">What we do</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
              We deliver Odoo implementation, custom module development, integration, migration,
              automation, reporting, training and ongoing support. We work on-site with Karachi
              businesses and remotely with clients across Pakistan and abroad, using a structured
              process with clear deliverables at every stage.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
              We are an Odoo implementation and development company&mdash;we do not claim official
              partner or certification status. We prefer to be judged on process, communication and
              real work.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link href="/company/methodology" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Our methodology</Link>
              <Link href="/services" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Our services</Link>
              <Link href="/locations/odoo-services-karachi" className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-violet/40">Odoo in Karachi</Link>
            </div>
          </div>
          <div>
            <h2 className="display-2">How we work</h2>
            <ul className="mt-8 space-y-6">
              {values.map((v) => (
                <li key={v.t} className="flex items-start gap-3 border-t border-line-light pt-6 first:border-t-0 first:pt-0">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-violet" aria-hidden />
                  <div>
                    <h3 className="font-heading text-[19px] font-semibold">{v.t}</h3>
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
