import { pkr } from '@/data/currency';
import { getBlueprint } from '@/data/catalogue/blueprints';
import { catalogueServices } from '@/data/catalogue/services';
import type { Billing, PublicOffer, ServiceRecord, TierNumber } from '@/data/catalogue/types';

/** Blueprint tier + the record's field overrides + its public names → what the public sees. */
export function resolveOffers(s: ServiceRecord, publishedOnly = true): PublicOffer[] {
  const bp = getBlueprint(s.blueprint);
  if (!bp) return [];
  return bp.tiers
    .filter((t) => !publishedOnly || s.publishedTiers.includes(t.tier))
    .map((t) => {
      const o = s.overrides[t.tier] ?? {};
      return {
        serviceId: s.id,
        route: s.route,
        family: s.family,
        serviceTitle: s.title,
        name: s.tierNames[t.tier - 1] as string,
        tier: t.tier as TierNumber,
        price: o.price !== undefined ? o.price : t.price,
        billing: o.billing ?? t.billing,
        scope: o.scope ?? t.scope,
        baseUnit: bp.baseUnit,
        planning: bp.planning,
        extras: bp.extras,
      };
    });
}

export const allPublicOffers = () => catalogueServices.flatMap((s) => resolveOffers(s));

const BILLING_LABEL: Record<Billing, string> = {
  'one-time': 'one time',
  monthly: 'per month',
  'monthly-from': 'per month, starting fee',
  starting: 'starting fee',
  discovery: 'discovery fee',
  hourly: 'per hour',
  quote: 'scoped quote',
};

export function priceLabel(o: Pick<PublicOffer, 'price' | 'billing'>): string {
  if (o.price === null) return 'Scoped quote';
  const n = `USD ${o.price.toLocaleString('en-US')}`;
  if (o.billing === 'monthly') return `${n}/month`;
  if (o.billing === 'monthly-from') return `From ${n}/month`;
  if (o.billing === 'hourly') return `${n}/hour`;
  if (o.billing === 'starting') return `From ${n}`;
  if (o.billing === 'discovery') return `${n} discovery`;
  return n;
}
export const billingLabel = (b: Billing) => BILLING_LABEL[b];

/** Families that have at least one published offer, in the order first seen. */
export function publishedFamilies(): string[] {
  return [...new Set(allPublicOffers().map((o) => o.family))];
}

/** Indicative rupee line for a priced offer, e.g. "≈ PKR 345,800/month". Empty for a scoped quote. */
export function pkrLabel(o: Pick<PublicOffer, 'price' | 'billing'>): string {
  if (o.price === null) return '';
  const n = `≈ ${pkr(o.price)}`;
  if (o.billing === 'monthly' || o.billing === 'monthly-from') return `${n}/month`;
  if (o.billing === 'hourly') return `${n}/hour`;
  return n;
}
