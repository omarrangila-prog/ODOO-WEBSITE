import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, MapPin, Phone, MessageCircle } from 'lucide-react';
import { locations, getLocation } from '@/data/locations';
import { company, PLACEHOLDER } from '@/data/company';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { whatsappLink } from '@/lib/utilities';
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  serviceSchema,
} from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { TextGap } from '@/components/ui/TextGap';
import { PageArt } from '@/components/cinema/PageArt';

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return buildMetadata({ title: loc.metaTitle, description: loc.metaDescription, path: loc.href });
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: loc.href },
    { name: loc.eyebrow, path: loc.href },
  ];

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  // Karachi page carries LocalBusiness schema (real office); Pakistan page uses Service.
  const schema =
    loc.kind === 'city'
      ? [localBusinessSchema(), breadcrumbSchema(crumbs), faqSchema(loc.faqs)]
      : [serviceSchema(loc.h1, loc.metaDescription, loc.href), breadcrumbSchema(crumbs), faqSchema(loc.faqs)];

  return (
    <>
      <JsonLd data={schema} />

      <article>
        {/* Hero */}
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <PageArt variant={4} />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">
              <MapPin className="h-4 w-4" aria-hidden />
              {loc.eyebrow}
            </p>
            <MaskedReveal as="h1" className="display-1 max-w-4xl" lines={[<span key="1">{loc.h1}</span>]} />
            <p className="lede mt-7 max-w-[var(--reading-width)]">{loc.intro}</p>

            {/* Real NAP block */}
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <span className="inline-flex items-center gap-2 text-text-dark-muted">
                <MapPin className="h-4 w-4 text-magenta" aria-hidden />
                {company.address.full}
              </span>
              <a href={company.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 sm:min-h-0 text-text-dark-muted hover:text-text-dark">
                <Phone className="h-4 w-4 text-violet-bright" aria-hidden />
                {company.phoneDisplay}
              </a>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={loc.ctaHref ?? '/contact#form'}>
                {loc.ctaLabel}
                <ArrowNudge />
              </ButtonLink>
              <ButtonLink href={waHref} external={waConfigured} variant="secondary">
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                Talk on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Narrative sections */}
        <section className="theme-light bay-sm">
          <div className="shell max-w-[900px] space-y-12">
            {loc.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="display-3 font-semibold">{s.heading}</h2>
                <TextGap />
                <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services offered here */}
        <section className="theme-graphite bay-sm">
          <div className="shell">
            <h2 className="display-2">
              What we deliver {loc.kind === 'city' ? 'in Karachi' : 'across Pakistan'}
            </h2>
            <TextGap />
            <ul className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {loc.services.map((s) => (
                <li key={s.label} className="flex items-start gap-3 border-t border-line pt-5">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden />
                  <div>
                    <h3 className="font-heading text-[18px] font-semibold text-text-dark">{s.label}</h3>
                    <TextGap />
                    <p className="mt-1 text-[15px] leading-relaxed text-text-dark-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Internal links to core commercial pages */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {services.slice(0, 4).map((s) => (
                <Link key={s.slug} href={s.href} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-text-dark-muted transition-colors hover:border-violet-bright/40 hover:text-text-dark">
                  {s.navLabel}
                </Link>
              ))}
              {industries.slice(0, 3).map((i) => (
                <Link key={i.slug} href={i.href} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-text-dark-muted transition-colors hover:border-violet-bright/40 hover:text-text-dark">
                  Odoo for {i.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="display-2">
              {loc.kind === 'city' ? 'Karachi Odoo questions' : 'Pakistan Odoo questions'}
            </h2>
            <TextGap />
            <Accordion items={loc.faqs} allowMultiple />
          </div>
        </section>

        {/* Cross-link to the other location page */}
        <section className="theme-dark pb-4">
          <div className="shell">
            <p className="text-[15px] text-text-dark-muted">
              {loc.kind === 'city' ? (
                <>
                  Serving a business elsewhere?{' '}
                  <Link href="/locations/odoo-services-pakistan" className="text-violet-bright underline-offset-4 hover:underline">
                    See our Pakistan-wide Odoo services
                  </Link>
                  .
                </>
              ) : (
                <>
                  Based in Karachi?{' '}
                  <Link href="/locations/odoo-services-karachi" className="text-violet-bright underline-offset-4 hover:underline">
                    See our Karachi Odoo services
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </section>

        <CtaBand title={loc.kind === 'city' ? 'Ready to start your Karachi Odoo project?' : 'Ready to bring your operations into one system?'} />
      </article>
    </>
  );
}
