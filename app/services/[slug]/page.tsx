import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CircleAlert } from 'lucide-react';
import { services, getService } from '@/data/services';
import { faqs } from '@/data/faq';
import { buildMetadata, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: service.href });
}

const serviceFaq = faqs.filter((f) =>
  [
    'How much does an Odoo implementation cost?',
    'How long does an implementation usually take?',
    'How do you prevent unnecessary customisation?',
    'Can you support us after launch?',
  ].includes(f.question),
);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.navLabel, path: service.href },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(service.title, service.metaDescription, service.href), faqSchema(serviceFaq)]} />

      <article>
        {/* Hero */}
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
          <div className="pointer-events-none absolute right-0 top-16 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">Services</p>
            <h1 className="display-1 max-w-5xl">{service.title}</h1>
            <p className="mt-7 max-w-[var(--reading-width)] font-heading text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-text-dark">
              {service.tagline}
            </p>
            <p className="lede mt-5 max-w-[var(--reading-width)]">{service.intro}</p>
            <div className="mt-9 flex flex-wrap gap-2">
              {service.modules.map((m) => (
                <span key={m} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13.5px] text-text-dark-muted">{m}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Problems + What we do */}
        <section className="theme-light bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="display-2">Problems this solves</h2>
              <ul className="mt-9 divide-y divide-line-light border-t border-line-light">
                {service.problems.map((p) => (
                  <li key={p} className="flex items-start gap-4 py-5">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-magenta" aria-hidden />
                    <span className="text-[17px] leading-relaxed text-ink-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display-2">What we do</h2>
              <div className="mt-9 space-y-8">
                {service.whatWeDo.map((w, i) => (
                  <div key={w.title} className="flex gap-5 border-t border-line-light pt-6 first:border-t-0 first:pt-0">
                    <span className="font-heading text-[22px] font-semibold leading-none text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="display-3 text-[clamp(20px,2vw,26px)] font-semibold">{w.title}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-ink-muted">{w.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process + Outcomes */}
        <section className="theme-graphite bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h2 className="display-2">How we work</h2>
              <ol className="mt-9 border-t border-line">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-center gap-5 border-b border-line py-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-[15px] font-bold text-white">{i + 1}</span>
                    <span className="text-[17px] font-medium text-text-dark">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[15px] text-text-dark-muted">
                See the full{' '}
                <Link href="/#journey" className="text-violet-bright underline-offset-4 hover:underline">implementation journey</Link>.
              </p>
            </div>
            <div>
              <h2 className="display-2">Outcomes</h2>
              <ul className="mt-9 space-y-4">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[17px] leading-relaxed text-text-dark-muted">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="display-2">Common questions</h2>
            <Accordion items={serviceFaq} allowMultiple />
          </div>
        </section>

        {/* Internal links */}
        <section className="theme-dark pb-4">
          <div className="shell">
            <p className="text-[15px] text-text-dark-muted">
              Explore other services:{' '}
              {services.filter((s) => s.slug !== service.slug).map((s, i, arr) => (
                <span key={s.slug}>
                  <Link href={s.href} className="text-violet-bright underline-offset-4 hover:underline">{s.navLabel}</Link>
                  {i < arr.length - 1 && ' · '}
                </span>
              ))}
            </p>
          </div>
        </section>

        <CtaBand title={`Ready to start with ${service.navLabel}?`} />
      </article>
    </>
  );
}
