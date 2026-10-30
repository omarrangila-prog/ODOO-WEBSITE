import { plans, formatPrice, CURRENCY, type Plan } from '@/data/ai-search-pricing';
import { SITE_URL } from '@/lib/seo';
import { AI_SEARCH_UPDATED } from '@/data/ai-search';

/**
 * JSON-LD for the AI Search pages. Every node is tied to the one Organization node that the root layout
 * emits (`/#organization`) by @id, so ODOOVATIONS stays a single entity and AI Search is a service it
 * provides. Prices, currency and scope come from the same configuration that draws the visible
 * packages, so the markup cannot say something the page does not.
 *
 * Semantics here are schema.org's. Google makes no promise that any of it produces a rich result, and
 * none is claimed.
 */

const ORG = { '@id': `${SITE_URL}/#organization` };
const serviceId = (path: string) => `${SITE_URL}${path}#service`;

export function planOffer(p: Plan) {
  const url = `${SITE_URL}/services/ai-search-pricing#plan-${p.id}`;
  const base = {
    '@type': 'Offer',
    '@id': `${SITE_URL}/services/ai-search-pricing#offer-${p.id}`,
    name: `ODOOVATIONS AI Search: ${p.name}`,
    url,
    description: `${p.forWho} Includes: ${p.includes.join('; ')}.`,
    seller: ORG,
  };
  if (p.price === null) return base; // a custom quote has no price to state
  return {
    ...base,
    price: String(p.price),
    priceCurrency: CURRENCY,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(p.price),
      priceCurrency: CURRENCY,
      ...(p.cadence === 'month' ? { unitText: 'month', unitCode: 'MON' } : {}),
      valueAddedTaxIncluded: false,
    },
  };
}

export function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/services/ai-search-pricing#catalog`,
    name: 'ODOOVATIONS AI Search packages',
    itemListElement: plans.map((p) => ({ ...planOffer(p), itemOffered: { '@id': serviceId('/services/ai-search-optimization') } })),
  };
}

export function aiServiceSchema(args: { path: string; name: string; description: string; serviceType: string; offers?: boolean; offerPlanIds?: string[] }) {
  const chosen = args.offerPlanIds ? plans.filter((p) => args.offerPlanIds!.includes(p.id)) : plans;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceId(args.path),
    name: args.name,
    serviceType: args.serviceType,
    description: args.description,
    url: `${SITE_URL}${args.path}`,
    provider: ORG,
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Place', name: 'Worldwide (remote delivery)' },
    ],
    availableLanguage: ['English', 'Urdu'],
    ...(args.offers ? { hasOfferCatalog: { ...offerCatalog(), itemListElement: chosen.map((p) => planOffer(p)) } } : {}),
  };
}

export function aiWebPage(args: { path: string; name: string; description: string; type?: 'WebPage' | 'CollectionPage' | 'ContactPage' | 'AboutPage'; mainService?: boolean }) {
  return {
    '@context': 'https://schema.org',
    '@type': args.type ?? 'WebPage',
    '@id': `${SITE_URL}${args.path}#webpage`,
    name: args.name,
    description: args.description,
    url: `${SITE_URL}${args.path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: args.mainService ? { '@id': serviceId(args.path) } : ORG,
    ...(args.mainService ? { mainEntity: { '@id': serviceId(args.path) } } : {}),
    dateModified: AI_SEARCH_UPDATED,
    inLanguage: 'en-PK',
  };
}

export { formatPrice };
