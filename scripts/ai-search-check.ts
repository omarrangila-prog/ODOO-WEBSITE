/**
 * Consistency and honesty checks for the ODOOVATIONS AI Search pages, against a running server.
 *   npx tsx scripts/ai-search-check.ts http://localhost:3720
 *
 * What it guards: the one pricing configuration is the only source of any price on the site; the
 * JSON-LD offers equal what is visible; every page has its own title, description and single H1; no
 * page promises a result or shows the internal commercial target; every link resolves; the two
 * consolidated URLs redirect permanently; the pages are in the sitemap and in llms.txt.
 */
import { plans, getPlan } from '../data/ai-search-pricing';

const BASE = (process.argv[2] || 'http://localhost:3720').replace(/\/$/, '');
let failed = 0;
const check = (c: unknown, m: string) => {
  if (!c) failed++;
  console.log((c ? 'ok    ' : 'FAIL  ') + m);
};
const get = async (p: string, init?: RequestInit) => {
  const r = await fetch(BASE + p, { redirect: 'manual', ...init });
  return { r, t: await r.text() };
};
const text = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');

const pages = [
  '/services/ai-search-optimization',
  '/services/answer-engine-optimization',
  '/services/generative-engine-optimization',
  '/services/ai-search-audit',
  '/services/ai-search-pricing',
  '/locations/aeo-geo-services-pakistan',
  '/resources/aeo-vs-geo-vs-seo',
  '/resources/how-to-measure-ai-search-visibility',
  '/resources/ai-search-optimization-checklist',
];

async function main() {
  // 1. The configuration says what the brief says.
  const p = (id: string) => getPlan(id)!;
  check(p('audit').price === 390 && p('audit').cadence === 'one-time', 'config: audit is USD 390 one time');
  check(p('foundation').price === 1250 && p('growth').price === 2000 && p('authority').price === 3500, 'config: Foundation 1,250, Growth 2,000, Authority 3,500 per month');
  check(p('enterprise').price === null && p('enterprise').cadence === 'quote', 'config: Enterprise is a custom quote with no price');
  check(
    p('audit').facts.questions === 'Up to 20' && p('foundation').facts.questions === '20' && p('growth').facts.questions === '40' && p('authority').facts.questions === '80',
    'config: 20 / 20 / 40 / 80 questions',
  );
  check(['audit', 'foundation', 'growth'].every((i) => p(i).facts.experiences === '3') && p('authority').facts.experiences === '4', 'config: three search experiences, four on Authority');
  check(p('foundation').facts.content === '2' && p('growth').facts.content === '4' && p('authority').facts.content === '6', 'config: 2 / 4 / 6 content units');
  check(p('growth').facts.competitors === 'Up to 3' && p('authority').facts.competitors === 'Up to 5' && p('audit').facts.competitors === 'Up to 3', 'config: competitor limits');
  check(plans.every((x) => Object.keys(x.facts).length === 12), 'config: every plan fills every comparison row');

  const allowed = new Set(plans.filter((x) => x.price !== null).map((x) => `USD ${x.price!.toLocaleString('en-US')}`));

  // 2-3. Each page: status, title, description, one H1, canonical, prices only from the config.
  const titles = new Set<string>();
  const descs = new Set<string>();
  const h1s = new Set<string>();
  const pageText: Record<string, string> = {};
  const links = new Set<string>();
  for (const path of pages) {
    const { r, t } = await get(path);
    check(r.status === 200, `${path}: HTTP 200`);
    const title = t.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    const desc = t.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
    const h1 = [...t.matchAll(/<h1[\s\S]*?<\/h1>/g)].map((m) => text(m[0]).trim());
    const canon = t.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
    check(title.length > 20 && title.length <= 72, `${path}: title is ${title.length} characters`);
    check(desc.length >= 70 && desc.length <= 168, `${path}: description is ${desc.length} characters`);
    check(h1.length === 1, `${path}: exactly one H1`);
    check(canon === `https://odoovations.com${path}`, `${path}: canonical is itself`);
    titles.add(title);
    descs.add(desc);
    h1s.add(h1[0] ?? '');
    const body = text(t);
    pageText[path] = body;
    const prices = [...body.matchAll(/USD\s?[\d,]+/g)].map((m) => m[0].replace(/\s+/, ' '));
    const bad = prices.filter((x) => !allowed.has(x));
    check(bad.length === 0, `${path}: every USD figure comes from the pricing config${bad.length ? ' (found ' + bad.join(', ') + ')' : ''}`);
    for (const m of t.matchAll(/<a [^>]*href="(\/[^"#?][^"]*)"/g)) links.add(m[1]!.split('#')[0]!.split('?')[0]!);
  }
  check(titles.size === pages.length && descs.size === pages.length && h1s.size === pages.length, 'every page has its own title, description and H1');

  // 4. JSON-LD offers match the visible prices.
  const ld = (html: string) =>
    [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((m) => {
      const j = JSON.parse(m[1]!);
      return Array.isArray(j) ? j : [j];
    });
  for (const path of ['/services/ai-search-optimization', '/services/ai-search-pricing']) {
    const nodes = ld((await get(path)).t);
    const svc = nodes.find((n) => n['@type'] === 'Service');
    const offers: { price?: string; priceCurrency?: string; name: string }[] = svc?.hasOfferCatalog?.itemListElement ?? [];
    check(offers.length === plans.length, `${path}: Service carries ${offers.length} offers`);
    for (const x of plans) {
      const o = offers.find((e) => e.name.endsWith(x.name));
      if (x.price === null) check(o && o.price === undefined, `${path}: ${x.name} offer states no price`);
      else check(o && o.price === String(x.price) && o.priceCurrency === 'USD', `${path}: ${x.name} offer is ${x.price} USD`);
      if (x.price !== null) check(pageText[path]!.includes(`USD ${x.price.toLocaleString('en-US')}`), `${path}: ${x.name} price is visible on the page`);
    }
    check(svc?.provider?.['@id'] === 'https://odoovations.com/#organization', `${path}: provider is the one Organization @id`);
  }
  const art = ld((await get('/resources/aeo-vs-geo-vs-seo')).t).find((n) => n['@type'] === 'Article');
  check(art && art.author?.name === 'ODOOVATIONS' && art.citation?.length >= 3 && art.dateModified === '2026-10-30', 'guide: Article markup, organisation authorship, citations and an honest date');

  // 5. Honesty: no promises, no internal target, no invented results, anywhere in the new pages.
  const everything = Object.values(pageText).join(' ') + ' ' + text((await get('/llms.txt')).t) + ' ' + text((await get('/llms-full.txt')).t);
  const banned: [RegExp, string][] = [
    [/\bwe guarantee\b/i, '"we guarantee"'],
    [/guaranteed (rank|placement|citation|mention|result|lead)/i, 'a guaranteed outcome'],
    [/\b(top|first|#1|number one) (rank|ranking|position|place)\b/i, 'a ranking claim'],
    [/five retained|5 retained|retained clients|\$\s?10,000|USD\s?10,000/i, 'the internal commercial target'],
    [/official (partner|reseller) of (openai|google|anthropic|perplexity|microsoft)/i, 'a platform partnership'],
    [/certified (by|partner)/i, 'a certification'],
    [/\b(award[- ]winning|best agency)\b/i, 'an unverifiable superlative'],
    [/\b\d{1,3}% (increase|growth|more) (in )?(traffic|leads|citations|mentions)/i, 'an invented result'],
  ];
  const negated = /\b(not|no|never|without|nor|don't|do not|cannot|can't)\b/i;
  for (const [re, label] of banned) {
    const hits = [...everything.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))].filter((m) => !negated.test(everything.slice(Math.max(0, (m.index ?? 0) - 100), m.index)));
    check(hits.length === 0, `no page, llms.txt or llms-full.txt affirms ${label}${hits.length ? ' (found: ' + hits[0]![0] + ')' : ''}`);
  }
  const body = pageText['/services/ai-search-optimization']!;
  check(/Demonstration report — sample data/.test(body), 'the sample report is labelled "Demonstration report — sample data"');
  check(/not (a )?(partner|endorsed)|no partnership|is not a partner/i.test(body), 'platform names carry a no-partnership notice');
  check(/Request an AI Search Review/.test(body) && /View Packages/.test(body), 'hub: the two required calls to action are present');
  check(/Nobody can guarantee|nobody honestly can|No one can guarantee|does not guarantee|do not guarantee/i.test(everything), 'the pages say outright that no placement is guaranteed');

  // 6. Links resolve.
  const broken: string[] = [];
  for (const l of links) {
    const r = await fetch(BASE + l, { redirect: 'manual' });
    if (r.status >= 400) broken.push(`${l} ${r.status}`);
  }
  check(broken.length === 0, `every internal link on the nine pages resolves (${links.size} distinct${broken.length ? '; broken: ' + broken.join(', ') : ''})`);

  // 7. Redirects, sitemap, llms.txt.
  for (const [from, to] of [
    ['/services/aeo-geo-ai-search-optimisation', '/services/ai-search-optimization'],
    ['/resources/what-are-aeo-and-geo', '/resources/aeo-vs-geo-vs-seo'],
  ] as const) {
    const { r } = await get(from);
    check(r.status === 308 && (r.headers.get('location') ?? '').endsWith(to), `${from} redirects permanently to ${to}`);
  }
  const sm = (await get('/sitemap.xml')).t;
  for (const path of pages) check(sm.includes(`<loc>https://odoovations.com${path}</loc>`), `sitemap lists ${path}`);
  check(!sm.includes('aeo-geo-ai-search-optimisation') && !sm.includes('what-are-aeo-and-geo'), 'sitemap no longer lists the consolidated URLs');
  const llms = (await get('/llms.txt')).t;
  for (const path of pages) check(llms.includes(`https://odoovations.com${path}`), `llms.txt lists ${path}`);

  // 8. The existing offerings are still there.
  for (const path of ['/services/odoo-implementation-pakistan', '/services/custom-software-development', '/services/ai-automation', '/services/whatsapp-automation', '/platforms/quickbooks']) {
    check((await get(path)).r.status === 200, `existing page still serves: ${path}`);
  }
  const svcIndex = text((await get('/services')).t);
  check(/AI Search \(AEO & GEO\)/.test(svcIndex), 'the services directory lists AI Search');
  const nav = (await get('/')).t;
  check(nav.includes('/services/ai-search-optimization') && nav.includes('/services/ai-search-pricing'), 'navigation and footer link to AI Search and its packages');

  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
  process.exit(failed ? 1 : 0);
}
main();
