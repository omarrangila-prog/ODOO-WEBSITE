import { briefs, getBrief, getFamily, type Brief } from '@/data/catalogue/manifest';
import { getBlueprint } from '@/data/catalogue/blueprints';
import { canonicalRoute, merges } from '@/data/catalogue/routes';
import { leafContent } from '@/data/catalogue/content';
import type { LeafContent } from '@/data/catalogue/content/types';
import type { PublicOffer } from '@/data/catalogue/types';
import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';

/** A readable label for an existing site path. */
function pathLabel(path: string): string {
  return (
    services.find((s) => s.href === path)?.navLabel ??
    solutions.find((s) => s.href === path)?.metaTitle.split(" | ")[0] ??
    industries.find((i) => `/industries/${i.slug}` === path)?.name ??
    path
  );
}
import { interestLabel } from '@/lib/interest';
import { priceLabel } from './resolve';

/**
 * A buildable leaf page: a brief that has editorial content and needs a new URL (merged briefs live on their
 * existing page). Briefs without content have no page at all.
 */
export interface Leaf {
  brief: Brief;
  content: LeafContent;
  route: string;
  slug: string;
}

export function buildableLeaves(prefix = '/services/'): Leaf[] {
  return briefs
    .filter((b) => !merges[b.id] && canonicalRoute(b).startsWith(prefix))
    .map((b) => ({ b, c: leafContent.find((x) => x.id === b.id) }))
    .filter((x): x is { b: Brief; c: LeafContent } => Boolean(x.c))
    .map(({ b, c }) => ({ brief: b, content: c, route: canonicalRoute(b), slug: canonicalRoute(b).slice(prefix.length) }));
}

/** Every built leaf: service pages and industry pages. */
export const allLeaves = () => [...buildableLeaves('/services/'), ...buildableLeaves('/industries/')];

export const getLeafBySlug = (slug: string, prefix = '/services/') => buildableLeaves(prefix).find((l) => l.slug === slug);

/** The three public offers for a leaf: blueprint tiers + the brief's overrides + this page's tier names. */
export function leafOffers(leaf: Leaf): (PublicOffer & { interest: string; planning: string })[] {
  return offersFor(leaf.brief, leaf.content.tierNames, leaf.route);
}

/** Offers for any brief, given its public tier names and the page it is shown on. */
export function offersFor(brief: Brief, tierNames: [string, string, string], route: string): (PublicOffer & { interest: string; planning: string })[] {
  const bp = getBlueprint(brief.blueprint)!;
  return bp.tiers.map((t, i) => {
    const offer: PublicOffer = {
      serviceId: brief.id,
      route,
      family: getFamily(brief.family)!.name,
      serviceTitle: brief.title,
      name: tierNames[i]!,
      tier: t.tier,
      price: t.price,
      billing: t.billing,
      scope: brief.tiers ? brief.tiers[i]!.split('; ') : t.scope,
      baseUnit: bp.baseUnit,
      planning: bp.planning,
      extras: bp.extras,
    };
    return { ...offer, interest: interestLabel(brief.title, offer.name, priceLabel(offer)) };
  });
}

/**
 * A related item is linked only if it has a real page: a buildable leaf, a merged brief's existing page, or
 * a plain site path. Unbuilt briefs are skipped rather than linked to a 404.
 */
export function resolveRelated(ids: string[]): { label: string; href: string }[] {
  const leaves = allLeaves();
  const out: { label: string; href: string }[] = [];
  for (const id of ids) {
    if (id.startsWith('/')) {
      out.push({ label: pathLabel(id), href: id });
      continue;
    }
    const b = getBrief(id);
    if (!b) continue;
    if (merges[id] || leaves.some((l) => l.brief.id === id)) out.push({ label: b.title, href: canonicalRoute(b) });
  }
  return out;
}

/** The family hub if it exists as a page today, else the services index. */
export function hubFor(b: Brief): { label: string; href: string } {
  const f = getFamily(b.family)!;
  return { label: f.name, href: f.hub };
}

/** Siblings in the same family that have pages. */
export function siblingsOf(leaf: Leaf) {
  return resolveRelated(briefs.filter((b) => b.family === leaf.brief.family && b.id !== leaf.brief.id).map((b) => b.id));
}
