import { getBrief } from '@/data/catalogue/manifest';
import { canonicalRoute } from '@/data/catalogue/routes';
import { leafContent } from '@/data/catalogue/content';
import { mergedTierNames } from '@/data/catalogue/content/merged';
import { plans } from '@/data/ai-search-pricing';
import type { Programme } from '@/data/catalogue/programmes';
import { offersFor } from './leaf';

/** Public tier names for any brief: written content, merged-page names, or the live AI Search plan names. */
export function tierNamesFor(id: string): [string, string, string] {
  const c = leafContent.find((x) => x.id === id);
  if (c) return c.tierNames;
  if (mergedTierNames[id]) return mergedTierNames[id]!;
  if (id === 'S001' || id === 'S002') return ['Foundation', 'Growth', 'Authority'];
  if (id === 'S003') return ['Audit', 'Extended audit', 'Full audit'];
  void plans;
  return ['Option 1', 'Option 2', 'Option 3'];
}

export function programmeLines(p: Programme) {
  return p.parts.map((part) => {
    const b = getBrief(part.briefId)!;
    const route = canonicalRoute(b);
    const offer = offersFor(b, tierNamesFor(b.id), route)[part.tier]!;
    const monthly = offer.billing === 'monthly' || offer.billing === 'monthly-from';
    return { part, brief: b, route, offer, monthly };
  });
}

export function programmeTotals(p: Programme) {
  const lines = programmeLines(p).filter((l) => !l.part.optional && l.offer.price !== null);
  const project = lines.filter((l) => !l.monthly).reduce((s, l) => s + l.offer.price!, 0);
  const monthly = lines.filter((l) => l.monthly).reduce((s, l) => s + l.offer.price!, 0);
  const startingFees = lines.some((l) => l.offer.billing === 'starting' || l.offer.billing === 'monthly-from');
  return { project, monthly, startingFees };
}
