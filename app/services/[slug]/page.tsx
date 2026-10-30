import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CircleAlert } from 'lucide-react';
import { services, getService } from '@/data/services';
import { divisions, getDivision } from '@/data/divisions';
import { ctaForDivision, ctaForService, ctas } from '@/data/ctas';
import { teamFactForDivision } from '@/data/team';
import { serviceExtras } from '@/data/service-extras';
import { faqs } from '@/data/faq';
import { buildMetadata, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { TextGap } from '@/components/ui/TextGap';
import { PageArt } from '@/components/cinema/PageArt';
import { OneSystemDiagram } from '@/components/ui/OneSystemDiagram';
import { LeafPage } from '@/components/catalogue/LeafPage';
import { MergedPackages } from '@/components/catalogue/MergedPackages';
import { buildableLeaves, getLeafBySlug } from '@/lib/catalogue/leaf';
import { FamilyHubPage, familyByHub } from '@/components/catalogue/HubPage';
import { families as catalogueFamilies } from '@/data/catalogue/manifest';
import { familyIntro } from '@/data/catalogue/hubs';

/** Family hubs served from this route; a hub that coincides with an existing page (AI Search) is that page. */
const familyHubSlugs = () =>
  catalogueFamilies
    .filter((f) => f.hub.startsWith('/services/') && !services.some((s) => s.href === f.hub))
    .map((f) => ({ slug: f.hub.replace('/services/', '') }));

export function generateStaticParams() {
  // Catalogue leaf pages share this route; only leaves with written content are built (lib/catalogue/leaf.ts).
  return [...services.filter((s) => !s.bespoke).map((s) => ({ slug: s.slug })), ...buildableLeaves().map((l) => ({ slug: l.slug })), ...familyHubSlugs()];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) {
    const leaf = getLeafBySlug(params.slug);
    if (leaf) return buildMetadata({ title: `${leaf.brief.title} | ODOOVATIONS`, description: leaf.content.metaDescription, path: leaf.route });
    const fam = familyByHub(`/services/${params.slug}`);
    return fam ? buildMetadata({ title: `${fam.name} services | ODOOVATIONS`, description: `${familyIntro[fam.code]!.lede} Services and starting prices in USD. ${familyIntro[fam.code]!.boundary}`, path: fam.hub }) : {};
  }
  return buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: service.href });
}

/** Shared fallback set — used by the Odoo service pages, which have no own FAQs. */
const sharedFaq = faqs.filter((f) =>
  [
    'How much does an Odoo implementation cost?',
    'How long does an implementation usually take?',
    'How do you prevent unnecessary customisation?',
    'Can you support us after launch?',
  ].includes(f.question),
);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) {
    const leaf = getLeafBySlug(params.slug);
    if (leaf) return <LeafPage leaf={leaf} />;
    const fam = familyByHub(`/services/${params.slug}`);
    if (!fam) notFound();
    return <FamilyHubPage family={fam} />;
  }

  const serviceFaq = service.faqs ?? sharedFaq;
  const extra = serviceExtras[service.slug];
  /*
   * Most specific CTA wins: a per-slug override, else the service's division,
   * else the neutral CTA. The nine Odoo services carry no ctaLabel of their
   * own, so before they were given a division they fell through to "Discuss
   * Your Project" while the newer AI pages got specific wording — backwards.
   */
  const serviceCta =
    ctaForService[service.slug] ??
    (service.division ? ctaForDivision[service.division] : undefined) ??
    ctas.general;
  const division = service.division ? getDivision(service.division) : undefined;
  const teamFact = service.division ? teamFactForDivision(service.division) : null;

  // Link to siblings in the same division rather than dumping every service
  // on every page — that reads as spam to a person and to a crawler.
  const siblings = services.filter(
    (s) => s.slug !== service.slug && s.division && s.division === service.division,
  );
  /*
   * Five divisions hold a single service, so siblings is empty for them. The
   * old fallback drew from services with no division, which is now nobody —
   * every service is classified. An empty list rendered "More in X:" with no
   * links after it, so fall back to other services and say so in the label.
   */
  const usingSiblings = siblings.length > 0;
  const related = usingSiblings
    ? siblings
    : services.filter((s) => s.slug !== service.slug).slice(0, 6);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'What We Do', path: '/services' },
    { name: service.navLabel, path: service.href },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(service.title, service.metaDescription, service.href), faqSchema(serviceFaq)]} />

      <article>
        {/* Hero */}
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <PageArt variant={2} />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <div className={extra?.visual ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10' : ''}>
            <div>
            <p className="eyebrow mb-6">{division ? division.title : 'Odoo & ERP'}</p>
            <h1 className="display-1 max-w-5xl">{service.title}</h1>{' '}
            <p className="mt-7 max-w-[var(--reading-width)] font-heading text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-text-dark">
              {extra?.hook ?? service.tagline}
            </p>{' '}
            <p className="lede mt-5 max-w-[var(--reading-width)]">{service.intro}</p>
            <TextGap />
            <div className="mt-9 flex flex-wrap gap-2">
              {service.modules.map((m) => (
                <span key={m} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-text-dark-muted">{m}</span>
              ))}
            </div>

            {service.answer && (
              <AnswerCard
                question={`What is ${service.navLabel.replace(/ &.*/, '')} at ODOOVATIONS?`}
                className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
              >
                {service.answer}
              </AnswerCard>
            )}
            </div>
            {extra?.visual === 'one-system' && <OneSystemDiagram />}
            </div>
          </div>
        </section>

        {service.flow && (
          <section className="theme-graphite bay-sm">
            <div className="shell">
              <FlowDiagram
                label={service.flow.label}
                steps={service.flow.steps}
                note={service.flow.note}
                className="text-text-dark"
              />
            </div>
          </section>
        )}

        {/* Problems + What we do */}
        <section className="theme-light bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="page-h2">Problems this solves</h2>{' '}
              <ul className="mt-9 divide-y divide-line-light border-t border-line-light">
                {service.problems.map((p) => (
                  <li key={p} className="flex items-start gap-4 py-5">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-magenta" aria-hidden />{' '}
                    <span className="text-[17px] leading-relaxed text-ink-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="page-h2">What we do</h2>{' '}
              <div className="mt-9 space-y-8">
                {service.whatWeDo.map((w, i) => (
                  <div key={w.title} className="flex gap-5 border-t border-line-light pt-6 first:border-t-0 first:pt-0">
                    {i > 0 && ' '}
                    <span className="font-heading text-[22px] font-semibold leading-none text-ink/55" aria-hidden>{String(i + 1).padStart(2, '0')}</span>{' '}
                    <div>
                      <h3 className="display-3 text-[clamp(20px,2vw,26px)] font-semibold">{w.title}</h3>{' '}
                      <p className="mt-2 text-[16px] leading-relaxed text-ink-muted">{w.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {extra && (
          <section className="theme-dark bay-sm">
            <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="page-h2">Who this is for</h2>
                <ul className="mt-8 space-y-4">
                  {extra.audience.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[17px] leading-relaxed text-text-dark-muted">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden /> {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="page-h2">What it connects to</h2>
                <ul className="mt-8 space-y-4">
                  {extra.connects.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[16px] leading-relaxed text-text-dark-muted">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Process + Outcomes */}
        <section className="theme-graphite bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h2 className="page-h2">How we work</h2>{' '}
              <ol className="mt-9 border-t border-line">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-center gap-5 border-b border-line py-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(120deg,#6a3df0,#8247f5)] text-[15px] font-bold text-white" aria-hidden>{i + 1}</span>{' '}
                    <span className="text-[17px] font-medium text-text-dark">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[15px] text-text-dark-muted">
                See the full{' '}
                <Link href="/company/methodology" className="text-violet-bright underline underline-offset-4">full method</Link>.
              </p>
            </div>
            <div>
              <h2 className="page-h2">Outcomes</h2>{' '}
              <ul className="mt-9 space-y-4">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[17px] leading-relaxed text-text-dark-muted">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden />{' '}
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {extra && (
          <section className="theme-graphite bay-sm">
            <div className="shell grid gap-14 lg:grid-cols-3 lg:gap-12">
              <div>
                <h2 className="page-h2 !text-[clamp(24px,2.4vw,32px)]">What affects the price</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">We quote against a written scope after a short conversation.</p>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {extra.priceFactors.map((f) => (
                    <li key={f} className="py-3 text-[16px] leading-relaxed text-text-dark">{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="page-h2 !text-[clamp(24px,2.4vw,32px)]">What affects the timeline</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">We give a date only after reviewing the scope.</p>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {extra.timelineFactors.map((f) => (
                    <li key={f} className="py-3 text-[16px] leading-relaxed text-text-dark">{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="page-h2 !text-[clamp(24px,2.4vw,32px)]">What we can show today</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">Each item is labelled for what it is.</p>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {extra.evidence.map((e) => (
                    <li key={e.label} className="py-3 text-[16px] leading-relaxed text-text-dark">
                      {e.href ? <Link href={e.href}>{e.label}</Link> : e.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="theme-dark bay-sm">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="page-h2">Common questions</h2>{' '}
            <Accordion items={serviceFaq} allowMultiple />
          </div>
        </section>

        {/* Internal links */}
        <section className="theme-dark pb-4">
          <div className="shell">
            {/* Who does the work. Text comes from data/team.ts so these counts
                cannot disagree with the Team page. */}
            {teamFact && (
              <p className="mb-4 text-[15px] leading-relaxed text-text-dark-muted">
                <span className="font-semibold text-text-dark">Who delivers this: </span>
                {teamFact.text}{' '}
                <Link href={teamFact.href} className="text-violet-bright underline underline-offset-4">Meet the team</Link>
              </p>
            )}
            <p className="text-[15px] text-text-dark-muted">
              {usingSiblings && division ? `More in ${division.title}: ` : 'Explore other services: '}
              {related.map((s, i, arr) => (
                <span key={s.slug}>
                  <Link href={s.href} className="text-violet-bright underline underline-offset-4">{s.navLabel}</Link>
                  {i < arr.length - 1 && ' · '}
                </span>
              ))}
            </p>{' '}
            <p className="mt-4 text-[15px] text-text-dark-muted">
              Other capabilities:{' '}
              {divisions
                .filter((d) => d.id !== service.division)
                .map((d, i, arr) => (
                  <span key={d.id}>
                    <Link href={d.href} className="text-violet-bright underline underline-offset-4">{d.label}</Link>
                    {i < arr.length - 1 && ' · '}
                  </span>
                ))}
            </p>
          </div>
        </section>

        <MergedPackages route={service.href} />

        {/* CTA follows the division, so an AI page asks about automation and
            an Odoo page asks about an Odoo roadmap — and the enquiry form
            arrives with that service already selected. */}
        <CtaBand
          title={`Ready to start with ${service.navLabel}?`}
          primaryLabel={service.ctaLabel ?? serviceCta.label}
          primaryHref={serviceCta.href}
        />
      </article>
    </>
  );
}
