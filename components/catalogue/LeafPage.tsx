import Link from 'next/link';
import { Check } from 'lucide-react';
import { breadcrumbSchema, faqSchema, SITE_URL } from '@/lib/seo';
import { getBlueprint } from '@/data/catalogue/blueprints';
import { getFamily, moduleLink } from '@/data/catalogue/manifest';
import { leafOffers, resolveRelated, hubFor, siblingsOf, type Leaf } from '@/lib/catalogue/leaf';
import { priceLabel, billingLabel, pkrLabel } from '@/lib/catalogue/resolve';
import { pkrNote } from '@/data/currency';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { CtaBand } from '@/components/ui/CtaBand';
import { Hero, Band, Bullets } from '@/components/ai-search/Layout';

/**
 * One catalogue service page, built from the brief (data/catalogue/manifest.ts), its pricing blueprint and the
 * page's written content (data/catalogue/content). Prices on the page and in the markup come from the same
 * resolved offers, so they cannot disagree.
 */

const ORG = { '@id': `${SITE_URL}/#organization` };

function schema(leaf: Leaf, offers: ReturnType<typeof leafOffers>) {
  const url = `${SITE_URL}${leaf.route}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: leaf.brief.title,
    serviceType: leaf.brief.title,
    description: leaf.content.definition,
    url,
    provider: ORG,
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Place', name: 'Worldwide (remote delivery)' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${leaf.brief.title} packages`,
      itemListElement: offers.map((o) => ({
        '@type': 'Offer',
        name: `${leaf.brief.title}: ${o.name}`,
        url: `${url}#package-${o.tier}`,
        description: o.scope.join('; '),
        seller: ORG,
        ...(o.price === null
          ? {}
          : {
              price: String(o.price),
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: String(o.price),
                priceCurrency: 'USD',
                valueAddedTaxIncluded: false,
                ...(o.billing === 'monthly' || o.billing === 'monthly-from' ? { unitText: 'month', unitCode: 'MON' } : {}),
              },
            }),
      })),
    },
  };
}

const contactHref = (interest: string) => `/contact?interest=${encodeURIComponent(interest)}#form`;

export function LeafPage({ leaf }: { leaf: Leaf }) {
  const { brief, content: c } = leaf;
  const bp = getBlueprint(brief.blueprint)!;
  const offers = leafOffers(leaf);
  const hub = hubFor(brief);
  const related = resolveRelated(c.related);
  const siblings = siblingsOf(leaf).filter((s) => !related.some((r) => r.href === s.href));
  const isIndustry = leaf.route.startsWith('/industries/');
  const crumbs = isIndustry
    ? [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: brief.title, path: leaf.route }]
    : [
        { name: 'Home', path: '/' },
        { name: 'What we do', path: '/services' },
        ...(hub.href !== '/services' ? [{ name: hub.label, path: hub.href }] : []),
        { name: brief.title, path: leaf.route },
      ];
  const firstPriced = offers.find((o) => o.price !== null);

  return (
    <>
      <JsonLd data={[schema(leaf, offers), breadcrumbSchema(crumbs), faqSchema(c.faqs.map((f) => ({ question: f.q, answer: f.a })))]} />
      <Hero
        crumbs={crumbs}
        eyebrow={isIndustry ? 'Industry systems' : hub.label}
        title={brief.title}
        lede={c.definition}
        primary={{ label: 'See the packages', href: '#packages' }}
        secondary={{ label: 'Discuss this work', href: contactHref(`${brief.title}: not sure which package`) }}
        art={2}
      />

      <Band tone="graphite" id="answer">
        <AnswerCard question={`What does ${brief.title.toLowerCase()} from ODOOVATIONS include, and what does it cost?`} className="max-w-4xl border-line text-text-dark-muted">
          <p>
            {bp.standard} There are three packages, from {firstPriced ? `${priceLabel(firstPriced)} (${pkrLabel(firstPriced)})` : 'a scoped quote'}, {billingLabel(offers[0]!.billing)}, each with a stated scope. Prices are launch offers in US dollars before taxes; a written scope confirms the final price before any work starts.
          </p>
        </AnswerCard>
      </Band>

      {brief.industry && (
        <Band tone="dark" id="workflow" title="The operational workflow" intro="The starting point for discovery: the usual flow, the people involved and the records it must keep. Discovery confirms how your business actually does it.">
          <ol className="flex flex-wrap items-center gap-2 text-[15px] text-text-dark">
            {brief.industry.workflow.split(' → ').map((step, i, all) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line px-3 py-1.5">{step.replace(/\.$/, '')}</span>
                {i < all.length - 1 && <span aria-hidden className="text-text-dark-muted">→</span>}
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-[18px] font-semibold text-white">Who uses it</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{brief.industry.roles}</p>
            </div>
            <div>
              <h3 className="font-heading text-[18px] font-semibold text-white">Records it must keep</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{brief.industry.records}</p>
            </div>
          </div>
        </Band>
      )}

      <Band tone="dark" id="fit" title="Is this the right purchase?">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="font-heading text-[18px] font-semibold text-white">The problem it solves</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{c.problem}</p>
          </div>
          <div>
            <h3 className="font-heading text-[18px] font-semibold text-white">Who it is for</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{c.whoFor}</p>
          </div>
          <div>
            <h3 className="font-heading text-[18px] font-semibold text-white">When it is the wrong first step</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{c.wrongFirst}</p>
          </div>
        </div>
      </Band>

      <Band tone="graphite" id="scope" title="What is included, and what is not">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 font-heading text-[18px] font-semibold text-white">We deliver</h3>
            <Bullets items={c.deliverables} />
          </div>
          <div>
            <h3 className="mb-4 font-heading text-[18px] font-semibold text-white">You provide</h3>
            <Bullets items={[...c.prerequisites, ...c.clientDoes]} />
          </div>
          <div>
            <h3 className="mb-4 font-heading text-[18px] font-semibold text-white">Priced separately</h3>
            <p className="text-[16px] leading-relaxed text-text-dark-muted">{bp.extras}</p>
          </div>
        </div>
      </Band>

      <Band tone="dark" id="packages" title="Packages" intro={<>Priced per {bp.baseUnit}. Launch prices in US dollars, before taxes. There is no online checkout: choosing a package starts a conversation and a written scope.</>}>
        <ul className="grid gap-5 md:grid-cols-3">
          {offers.map((o) => (
            <li key={o.tier} id={`package-${o.tier}`} className="flex scroll-mt-24 flex-col rounded-[22px] border border-line bg-white/[0.02] p-6">
              <h3 className="font-heading text-[20px] font-semibold tracking-[-0.02em] text-white">{o.name}</h3>
              <p className="mt-3 font-heading text-[28px] font-semibold leading-none tracking-[-0.03em] text-white">{priceLabel(o)}</p>
              {pkrLabel(o) && <p className="mt-2 text-[14px] text-text-dark">{pkrLabel(o)}</p>}
              <p className="mt-1 text-[14px] text-text-dark-muted">{billingLabel(o.billing)}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                {o.scope.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] leading-snug text-text-dark">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={contactHref(o.interest)}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/[0.2] px-5 text-[15px] font-semibold text-text-dark transition-colors hover:border-violet-bright/70"
              >
                {o.price === null ? 'Request a scoped quote' : 'Choose this package'}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[var(--reading-width)] text-[14.5px] leading-relaxed text-text-dark-muted">Planning: {bp.planning}</p>
        <p className="mt-2 max-w-[var(--reading-width)] text-[14.5px] leading-relaxed text-text-dark-muted">{pkrNote}</p>
      </Band>

      <Band tone="graphite" id="process" title="How the work runs">
        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {c.process.map((p, i) => (
            <li key={p.step} className="rounded-[18px] border border-line p-5">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-violet">Step {i + 1}</span>
              <h3 className="mt-2 font-heading text-[18px] font-semibold text-white">{p.step}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-[var(--reading-width)] text-[16px] leading-relaxed text-text-dark">
          <span className="font-semibold text-white">When it is done: </span>
          {c.completion}
        </p>
      </Band>

      <Band tone="dark" id="example" title="What the work looks like">
        <figure className="m-0 overflow-hidden rounded-[22px] border border-line-strong">
          <figcaption className="flex flex-wrap items-center gap-3 border-b border-line bg-white/[0.03] px-5 py-3">
            <span className="font-heading text-[15px] font-semibold text-white">{c.sample.title}</span>
            <span className="rounded-full border border-amber/50 bg-amber/10 px-3 py-0.5 text-[12px] font-semibold text-amber">Sample data</span>
          </figcaption>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${c.sample.title} (scrollable table)`}>
            <table className="w-full min-w-[560px] text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-line">
                  {c.sample.columns.map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 font-semibold text-text-dark">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.sample.rows.map((r, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    {r.map((v, j) => (
                      <td key={j} className="px-5 py-3 align-top text-text-dark-muted">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-5 py-3 text-[13.5px] text-text-dark-muted">
            {c.sample.caption} More samples in the <Link href={moduleLink(brief)} className="underline underline-offset-4 hover:text-white">ODOOVATIONS {getFamily(brief.family)!.demo.name}</Link>.
          </p>
        </figure>
        <div className="mt-10 max-w-[var(--reading-width)]">
          <h3 className="mb-4 font-heading text-[18px] font-semibold text-white">What we measure</h3>
          <Bullets items={c.measures} />
        </div>
      </Band>

      <Band tone="graphite" id="faq" title="Questions buyers ask">
        <div className="max-w-4xl">
          <Accordion items={c.faqs.map((f) => ({ question: f.q, answer: f.a }))} allowMultiple />
        </div>
      </Band>

      <Band tone="dark" id="related" title="Related services">
        <ul className="flex flex-wrap gap-3">
          {[...related, ...siblings].slice(0, 10).map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white">
                {r.label}
              </Link>
            </li>
          ))}
          {c.industry && (
            <li>
              <Link href={c.industry.href} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white">
                Industry: {c.industry.label}
              </Link>
            </li>
          )}
          <li>
            <Link href="/pricing" className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white">
              All packages and pricing
            </Link>
          </li>
        </ul>
      </Band>

      <CtaBand
        title={`Talk to us about ${brief.title.toLowerCase()}`}
        body="Tell us what you need in a few lines. We reply with questions or a written scope; nothing is charged by asking."
        primaryLabel="Request a scoped proposal"
        primaryHref={contactHref(`${brief.title}: scoped proposal`)}
      />
    </>
  );
}
