import { catalogueServices } from '@/data/catalogue/services';
import { blueprints } from '@/data/catalogue/blueprints';
import { resolveOffers } from './resolve';
import { plans } from '@/data/ai-search-pricing';
import type { ServiceRecord } from '@/data/catalogue/types';
import { leafContent } from '@/data/catalogue/content';
import { getBrief } from '@/data/catalogue/manifest';
import { merges } from '@/data/catalogue/routes';
import { getLeafBySlug, buildableLeaves } from './leaf';

/** Phrases the brief forbids unless negated within a short window before them. */
const FORBIDDEN: [RegExp, string][] = [
  [/#\s?1\b|number one|\bbest in pakistan\b|\bbest agency\b/i, 'ranking superlative'],
  [/\bguaranteed? (first|top|#1|rank|citation|results?|roi|placement)/i, 'guaranteed outcome'],
  [/zero hallucination/i, '"zero hallucinations"'],
  [/\b(award[- ]winning|certified (odoo )?partner|official (odoo )?partner|gold partner)\b/i, 'award or partner status'],
  [/\b24\/7 (human )?support\b/i, 'round-the-clock support'],
];
const NEGATION = /\b(no|not|never|cannot|can't|nor|without|neither|isn't|aren't|nothing)\b/i;

function publicText(s: ServiceRecord): string[] {
  return [
    s.title, s.buyerIntent, s.focus, s.definition, s.buyerFit, s.wrongFirstPurchase, s.planningRange, s.acceptance,
    s.metaTitle, s.metaDescription, ...s.deliverables, ...s.scopeLimits, ...s.prerequisites, ...s.extraCosts, ...s.measures,
    ...s.process.flatMap((p) => [p.step, p.detail]), ...s.faqs.flatMap((f) => [f.q, f.a]), ...s.evidence.map((e) => e.note),
    ...s.tierNames,
  ];
}

export function validateCatalogue(): string[] {
  const errs: string[] = [];
  const ids = new Set<string>();
  const routes = new Set<string>();
  const catIds = new Set<string>();
  const codes = new Set(blueprints.map((b) => b.code));

  for (const b of blueprints) {
    if (b.tiers.length !== 3) errs.push(`blueprint ${b.code}: needs exactly three tiers`);
    b.tiers.forEach((t, i) => {
      if (t.tier !== i + 1) errs.push(`blueprint ${b.code}: tier order wrong at ${i}`);
      if (t.price !== null && t.price <= 0) errs.push(`blueprint ${b.code} tier ${t.tier}: price must be positive or null`);
      if (!t.scope.length) errs.push(`blueprint ${b.code} tier ${t.tier}: empty scope`);
    });
    if (b.tiers[0].price !== null && b.tiers[1].price !== null && b.tiers[2].price !== null &&
        !(b.tiers[0].price < b.tiers[1].price && b.tiers[1].price < b.tiers[2].price)) {
      errs.push(`blueprint ${b.code}: prices must rise by tier`);
    }
  }

  for (const s of catalogueServices) {
    const at = `service ${s.id}`;
    if (ids.has(s.id)) errs.push(`${at}: duplicate id`);
    ids.add(s.id);
    for (const r of [s.route, ...s.legacyRoutes]) {
      if (!r.startsWith('/') || r.includes('?') || r.endsWith('/') && r !== '/') errs.push(`${at}: bad route "${r}"`);
    }
    if (routes.has(s.route)) errs.push(`${at}: duplicate route ${s.route}`);
    routes.add(s.route);
    if (s.sourceCatalogueId) {
      if (catIds.has(s.sourceCatalogueId)) errs.push(`${at}: duplicate catalogue id ${s.sourceCatalogueId}`);
      catIds.add(s.sourceCatalogueId);
    }
    if (!codes.has(s.blueprint)) errs.push(`${at}: unknown blueprint "${s.blueprint}"`);
    if (!s.publishedTiers.includes(1)) errs.push(`${at}: tier 1 must be published`);
    if (new Set(s.tierNames).size !== 3) errs.push(`${at}: the three public tier names must differ`);
    for (const [k, v] of Object.entries(s.overrides)) {
      if (!['1', '2', '3'].includes(k)) errs.push(`${at}: override on unknown tier ${k}`);
      if (v && v.price !== undefined && v.price !== null && v.price <= 0) errs.push(`${at}: override price must be positive`);
    }
    for (const f of ['definition', 'buyerFit', 'wrongFirstPurchase', 'focus', 'acceptance', 'metaTitle', 'metaDescription'] as const) {
      if (!s[f].trim()) errs.push(`${at}: ${f} is empty`);
    }
    for (const f of ['deliverables', 'scopeLimits', 'prerequisites', 'process', 'faqs', 'evidence', 'measures', 'claimEvidence'] as const) {
      if (!s[f].length) errs.push(`${at}: ${f} is empty`);
    }
    if (s.metaTitle.length > 65) errs.push(`${at}: meta title ${s.metaTitle.length} characters`);
    if (s.metaDescription.length < 70 || s.metaDescription.length > 175) errs.push(`${at}: meta description ${s.metaDescription.length} characters`);
    for (const r of s.relatedIds) {
      if (!catalogueServices.some((x) => x.id === r)) errs.push(`${at}: related id "${r}" does not exist`);
      if (r === s.id) errs.push(`${at}: relates to itself`);
    }
    for (const e of s.evidence) {
      if (e.kind === 'client-project' && !e.projectId) errs.push(`${at}: client-project evidence needs a projectId`);
    }
    // Only underscore codes (ai_search, erp_support) are distinctive; plain-word codes such as "data" are ordinary English.
    for (const code of [...codes].filter((x) => x.includes('_'))) {
      if (publicText(s).some((t) => t.toLowerCase().includes(code.toLowerCase()))) errs.push(`${at}: internal blueprint code "${code}" appears in public text`);
    }
    // A question ("Do you guarantee…?") asks about a claim; it does not make one.
    for (const t of publicText(s).filter((x) => !x.trim().endsWith("?"))) {
      for (const [re, label] of FORBIDDEN) {
        const m = re.exec(t);
        if (m && !NEGATION.test(t.slice(Math.max(0, m.index - 60), m.index))) errs.push(`${at}: ${label}: "${t.slice(0, 70)}"`);
      }
    }
    if (s.availability === 'scoping-only' && s.publishedTiers.length && resolveOffers(s).some((o) => o.billing === 'monthly') && !s.acceptance) {
      errs.push(`${at}: monthly offer needs an acceptance statement`);
    }
  }

  // Drift guard: the AI Search records must agree with the live pricing config.
  const live = (id: string) => plans.find((p) => p.id === id)?.price;
  const ai = catalogueServices.find((s) => s.id === 'odv-ai-search');
  if (ai) {
    const got = resolveOffers(ai).map((o) => o.price);
    const want = [live('foundation'), live('growth'), live('authority')];
    if (JSON.stringify(got) !== JSON.stringify(want)) errs.push(`odv-ai-search prices ${got} disagree with data/ai-search-pricing.ts ${want}`);
  }
  const audit = catalogueServices.find((s) => s.id === 'odv-ai-search-audit');
  if (audit) {
    const got = resolveOffers(audit).map((o) => o.price);
    if (JSON.stringify(got) !== JSON.stringify([live('audit')])) errs.push(`odv-ai-search-audit published price ${got} disagrees with data/ai-search-pricing.ts ${live('audit')}`);
  }
  errs.push(...validateLeafContent());
  return errs;
}

/** Written leaf content: every entry maps to a brief, says something distinct and makes no forbidden claim. */
export function validateLeafContent(): string[] {
  const errs: string[] = [];
  const seenMeta = new Set<string>();
  const seenDef = new Set<string>();
  for (const c of leafContent) {
    const at = `leaf ${c.id}`;
    const b = getBrief(c.id);
    if (!b) { errs.push(`${at}: no brief with this id`); continue; }
    if (merges[c.id]) errs.push(`${at}: brief is merged into ${merges[c.id]!.canonical}; put its content on that page instead`);
    if (c.metaDescription.length < 70 || c.metaDescription.length > 160) errs.push(`${at}: meta description ${c.metaDescription.length} characters`);
    if (`${b.title} | ODOOVATIONS`.length > 65) errs.push(`${at}: title too long`);
    if (seenMeta.has(c.metaDescription)) errs.push(`${at}: duplicate meta description`);
    if (seenDef.has(c.definition)) errs.push(`${at}: duplicate definition`);
    seenMeta.add(c.metaDescription); seenDef.add(c.definition);
    if (new Set(c.tierNames).size !== 3) errs.push(`${at}: tier names must differ`);
    if (c.faqs.length < 3) errs.push(`${at}: needs at least 3 FAQs`);
    if (c.deliverables.length < 3 || c.process.length < 3 || c.measures.length < 2) errs.push(`${at}: deliverables, process or measures too thin`);
    if (!/sample|synthetic/i.test(c.sample.caption)) errs.push(`${at}: sample caption must say it is sample or synthetic data`);
    if (c.sample.rows.some((r) => r.length !== c.sample.columns.length)) errs.push(`${at}: sample row width differs from columns`);
    for (const r of c.related) if (!r.startsWith('/') && !getBrief(r)) errs.push(`${at}: related "${r}" is not a brief`);
    const text = [c.metaDescription, c.definition, c.problem, c.whoFor, c.wrongFirst, c.completion, ...c.deliverables, ...c.clientDoes, ...c.prerequisites, ...c.measures, ...c.process.flatMap((p) => [p.step, p.detail]), ...c.faqs.map((f) => f.a)];
    for (const t of text) {
      for (const [re, label] of FORBIDDEN) {
        const m = re.exec(t);
        if (m && !NEGATION.test(t.slice(Math.max(0, m.index - 60), m.index))) errs.push(`${at}: ${label}: "${t.slice(0, 70)}"`);
      }
      for (const code of blueprints.map((x) => x.code).filter((x) => x.includes('_'))) if (new RegExp(`\\b${code}\\b`).test(t)) errs.push(`${at}: internal code "${code}" in public text`);
    }
  }
  const slugs = [...buildableLeaves().map((l) => l.route), ...buildableLeaves('/industries/').map((l) => l.route)];
  if (new Set(slugs).size !== slugs.length) errs.push('leaf slugs collide');
  for (const c of leafContent) { const b = getBrief(c.id); if (b && !merges[c.id] && !buildableLeaves().concat(buildableLeaves('/industries/')).some((l) => l.brief.id === c.id)) errs.push(`leaf ${c.id}: content written but no route serves it`); }
  void getLeafBySlug;
  return errs;
}
