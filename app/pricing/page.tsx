import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band } from '@/components/ai-search/Layout';
import { DirectoryFilter } from '@/components/catalogue/DirectoryFilter';
import { catalogueServices } from '@/data/catalogue/services';
import { resolveOffers, priceLabel, billingLabel, pkrLabel } from '@/lib/catalogue/resolve';
import { pkrNote } from '@/data/currency';
import { allLeaves, leafOffers } from '@/lib/catalogue/leaf';
import { families as briefFamilies } from '@/data/catalogue/manifest';
import type { Billing, PublicOffer } from '@/data/catalogue/types';

const PATH = '/pricing';
const DESCRIPTION =
  'Every published ODOOVATIONS package in one place, in USD before taxes: price, billing basis and the three options per service. Search by service or platform.';
export const metadata: Metadata = buildMetadata({ title: 'Packages and Pricing | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Packages and pricing', path: PATH },
];

interface Entry {
  key: string;
  family: string;
  title: string;
  route: string;
  definition: string;
  offers: PublicOffer[];
}

/** Every published offer, from the service records and the written catalogue pages. */
function entries(): Entry[] {
  const fromRecords = catalogueServices
    .filter((s) => resolveOffers(s).length)
    .map((s) => ({ key: s.id, family: s.family, title: s.title, route: s.route, definition: s.definition, offers: resolveOffers(s) }));
  const fromLeaves = allLeaves().map((l) => {
    const offers = leafOffers(l);
    return { key: l.brief.id, family: offers[0]!.family, title: l.brief.title, route: l.route, definition: l.content.definition, offers };
  });
  return [...fromRecords, ...fromLeaves];
}

/** Billing groups a buyer recognises, in place of the internal billing codes. */
const GROUPS: { id: string; label: string; match: Billing[] }[] = [
  { id: 'project', label: 'Fixed-price project', match: ['one-time'] },
  { id: 'starting', label: 'Starting fee', match: ['starting'] },
  { id: 'monthly', label: 'Monthly', match: ['monthly', 'monthly-from'] },
  { id: 'discovery', label: 'Discovery first', match: ['discovery'] },
  { id: 'quote', label: 'Scoped quote', match: ['quote'] },
];
const groupsOf = (offers: PublicOffer[]) => GROUPS.filter((g) => offers.some((o) => g.match.includes(o.billing))).map((g) => g.id);

export default function PricingDirectory() {
  const all = entries();
  const order = briefFamilies.map((f) => f.name);
  const families = [...new Set(all.map((e) => e.family))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const anchor = (f: string) => f.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <>
      <JsonLd data={[webPageSchema('Packages and pricing', PATH, DESCRIPTION), breadcrumbSchema(crumbs)]} />
      <Hero
        crumbs={crumbs}
        eyebrow="Pricing"
        title={
          <>
            Packages <span className="signal-text">and pricing</span>
          </>
        }
        lede={`${all.length} services, each with three stated options. Find yours, compare the options on its page, and ask for a written scope.`}
        primary={{ label: 'Combined programmes', href: '/programmes' }}
        secondary={{ label: 'How we price', href: '/company/pricing' }}
        art={4}
      />

      <Band tone="graphite" id="how">
        <AnswerCard question="How does ODOOVATIONS price its services?" className="max-w-4xl border-line text-text-dark-muted">
          <p>
            Bounded work has a fixed price or a starting fee; ongoing work is monthly; large or uncertain work starts with paid discovery or a scoped quote. Every price here is a launch offer in US dollars, before taxes, for new enquiries, and nothing is unlimited. Licences, ad spend, hosting, API usage and other third-party costs are always separate. There is no online checkout: choosing a package starts a conversation and a written scope. {pkrNote}
          </p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="directory" title="Find a service">
        <DirectoryFilter billingOptions={GROUPS.map(({ id, label }) => ({ id, label }))} />
        <nav aria-label="Service families" className="mt-6 flex flex-wrap gap-2">
          {families.map((f) => (
            <a key={f} href={`#${anchor(f)}`} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14px] text-text-dark-muted hover:border-line-strong hover:text-white">
              {f}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {families.map((family) => (
            <section key={family} id={anchor(family)} data-family-section aria-labelledby={`${anchor(family)}-h`} className="scroll-mt-24">
              <h2 id={`${anchor(family)}-h`} className="font-heading text-[22px] font-semibold text-white">
                {family}
              </h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {all
                  .filter((s) => s.family === family)
                  .map((s) => (
                    <li
                      key={s.key}
                      data-search={`${s.title} ${s.definition} ${family}`.toLowerCase()}
                      data-billing={groupsOf(s.offers).join(' ')}
                      className="grid gap-3 py-5 md:grid-cols-[1.1fr_1.4fr] md:gap-8"
                    >
                      <div>
                        <Link href={s.route} className="font-heading text-[17px] font-semibold text-white underline-offset-4 hover:underline">
                          {s.title}
                        </Link>
                        <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-text-dark-muted">{s.definition}</p>
                      </div>
                      <ul className="grid gap-2 sm:grid-cols-3">
                        {s.offers.map((o) => (
                          <li key={o.tier} className="rounded-[14px] border border-line px-3 py-2.5">
                            <p className="text-[13px] text-text-dark-muted">{o.name}</p>
                            <p className="font-heading text-[16px] font-semibold text-white">{priceLabel(o)}</p>
                            {pkrLabel(o) && <p className="text-[13px] text-text-dark">{pkrLabel(o)}</p>}
                            <p className="text-[12.5px] text-text-dark-muted">{billingLabel(o.billing)}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </Band>
    </>
  );
}
