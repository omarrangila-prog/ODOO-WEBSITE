/**
 * ROUTE RECONCILIATION: brief proposals against the live site.
 *
 * The brief's routes are proposals (master prompt §1). Where an established page already serves the same
 * buyer intent, that page stays canonical and absorbs the brief's packages and proof requirements instead of
 * a near-duplicate being created. Every merge below names the reason. Briefs not listed here get their
 * proposed route.
 *
 * Existing URLs checked against data/services.ts, data/industries.ts and data/solutions.ts on 30 October 2026.
 */
import { briefs, type Brief } from './manifest';

export interface Merge {
  canonical: string;
  reason: string;
}

export const merges: Record<string, Merge> = {
  // AI search: the brief's routes and the bespoke pages built for them already coincide.
  S001: { canonical: '/services/answer-engine-optimization', reason: 'Same route; bespoke page already built.' },
  S002: { canonical: '/services/generative-engine-optimization', reason: 'Same route; bespoke page already built.' },
  S003: { canonical: '/services/ai-search-audit', reason: 'Same route; bespoke page already built.' },

  // Odoo: established service pages that already rank for these intents.
  S054: { canonical: '/services/odoo-implementation-pakistan', reason: 'Established Odoo implementation page serves the same intent; keep its URL.' },
  S055: { canonical: '/services/custom-odoo-development', reason: 'Established page for Odoo customisation and module development.' },
  S056: { canonical: '/services/odoo-migration', reason: 'Established Odoo migration and upgrade page.' },
  S057: { canonical: '/services/odoo-integration', reason: 'Same route; established page.' },
  S058: { canonical: '/services/odoo-support-maintenance', reason: 'Established Odoo support page; hosting coordination is added to it.' },
  'S059-1': { canonical: '/services/odoo-training', reason: 'Established Odoo training page.' },

  // Solutions that already answer the same buyer question.
  S061: { canonical: '/solutions/fbr-digital-invoicing-pakistan', reason: 'Established FBR digital invoicing page serves the Pakistan invoicing-integration intent.' },

  // Industries: the site's established industry slugs are kept.
  S163: { canonical: '/industries/education', reason: 'Same route; established industry page.' },
  S164: { canonical: '/industries/healthcare-clinics', reason: 'Established healthcare and clinics industry page.' },
  S165: { canonical: '/industries/wholesale-trading', reason: 'Established wholesale and trading page; /industries/distribution is linked as its sibling.' },
  S166: { canonical: '/industries/manufacturing', reason: 'Same route; established industry page.' },
  S167: { canonical: '/industries/logistics-transport', reason: 'Established logistics and transport page.' },
  S168: { canonical: '/industries/retail-ecommerce', reason: 'Established retail and e-commerce page; multi-branch retail is added to it.' },
  'EXT-I09': { canonical: '/industries/textile-apparel', reason: 'Established textile and apparel page; the exporter workflow is added to it.' },
  'EXT-I11': { canonical: '/industries/food-hospitality', reason: 'Established food and hospitality page covers restaurants and cafés.' },
  'EXT-I12': { canonical: '/industries/professional-services', reason: 'Same route; established industry page.' },
  'EXT-I17': { canonical: '/industries/construction', reason: 'Established construction page.' },
};

/** Proposed briefs that overlap an existing page but keep a separate URL, with why they are distinct. */
export const keptSeparate: Record<string, string> = {
  S034: 'WhatsApp marketing (campaigns, templates, consent) is a different buyer task from /services/whatsapp-automation (operational messaging); the two pages link to each other.',
  S091: 'Corporate website builds are one of several things /services/web-development covers; the specific package page links back to it as parent.',
  'S063-3': 'POS implementation as an ERP workstream differs from the /solutions/pos-software product page; they link to each other.',
  'S062-1': 'Inventory ERP implementation differs from the /solutions/inventory-management product page; they link to each other.',
  S170: 'No established travel and hospitality page; /industries/food-hospitality covers food service only.',
};

export const canonicalRoute = (b: Brief) => merges[b.id]?.canonical ?? b.proposedRoute;

/** Briefs that need a new URL (not merged into an existing page). */
export const newRoutes = () => briefs.filter((b) => !merges[b.id]);
