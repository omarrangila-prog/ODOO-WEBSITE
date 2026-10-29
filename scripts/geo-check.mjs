/**
 * Search, answer-engine and generative-engine readiness, checked against a running server.
 *   node scripts/geo-check.mjs http://localhost:3720
 */
const BASE = (process.argv[2] || 'http://localhost:3720').replace(/\/$/, '');
let failed = 0;
const check = (c, m) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const get = async (p) => { const r = await fetch(BASE + p); return { r, t: await r.text() }; };

// robots.txt
{
  const { t } = await get('/robots.txt');
  for (const a of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'PerplexityBot', 'Bingbot', 'GPTBot', 'Google-Extended']) check(t.includes(`User-Agent: ${a}`), `robots.txt names ${a}`);
  check(/Disallow: \/api\//.test(t) && /Sitemap: .*sitemap\.xml/.test(t), 'robots.txt keeps /api/ closed and points at the sitemap');
}

// llms.txt and llms-full.txt
let llmsLinks = [];
{
  const { r, t } = await get('/llms.txt');
  check(r.ok && /text\/plain/.test(r.headers.get('content-type') || ''), 'llms.txt is served as text/plain');
  check(t.startsWith('# ODOOVATIONS') && /\n> /.test(t), 'llms.txt opens with the name and a one-line summary (llmstxt.org format)');
  for (const h of ['## Services', '## Platforms', '## Solutions', '## Projects', '## Guides', '## Company']) check(t.includes(h), `llms.txt has ${h}`);
  llmsLinks = [...t.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => new URL(m[1]).pathname);
  const bad = [];
  for (const p of new Set(llmsLinks)) { const rr = await fetch(BASE + p); if (!rr.ok) bad.push(`${p} ${rr.status}`); }
  check(bad.length === 0, `every link in llms.txt resolves (${llmsLinks.length} links${bad.length ? '; broken: ' + bad.join(', ') : ''})`);
  const full = await get('/llms-full.txt');
  check(full.r.ok && full.t.length > 20000, `llms-full.txt is served (${Math.round(full.t.length / 1024)} KB)`);
  check(/does not do or claim/.test(full.t) && /Outcomes: none published yet/.test(full.t), 'llms-full.txt states what is not claimed and that no outcomes are published yet');
}

// Share images
{
  const { t } = await get('/services/odoo-implementation-pakistan');
  const og = t.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '';
  check(/\/og\?title=/.test(og), 'og:image is the per-page PNG share image');
  const r = await fetch(og.replace(/^https?:\/\/[^/]+/, BASE).replace(/&amp;/g, '&'));
  const buf = Buffer.from(await r.arrayBuffer());
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  check(r.ok && r.headers.get('content-type') === 'image/png' && w === 1200 && h === 630, `share image renders as a 1200x630 PNG (${r.headers.get('content-type')} ${w}x${h})`);
}

// Structured data
{
  const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((m) => { const j = JSON.parse(m[1]); return Array.isArray(j) ? j : [j]; });
  const home = ld((await get('/')).t);
  const org = home.find((x) => x['@type'] === 'Organization');
  check(org && org.knowsAbout?.length > 10 && org.hasOfferCatalog?.itemListElement?.length >= 16, 'Organization carries knowsAbout and an offer catalogue of every service');
  const svc = ld((await get('/services/odoo-integration')).t).find((x) => x['@type'] === 'Service');
  check(svc && svc.provider?.['@id']?.endsWith('/#organization') && svc['@id']?.endsWith('#service'), 'Service nodes link to the Organization by @id');
  const brand = ld((await get('/company/brand')).t).find((x) => x['@type'] === 'AboutPage');
  check(brand && brand.mainEntity?.['@id']?.endsWith('/#organization'), 'the brand page is an AboutPage about the Organization');
}

// Answer-first text on every service page
{
  const xml = (await get('/sitemap.xml')).t;
  const svc = [...xml.matchAll(/<loc>[^<]*?(\/services\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  const missing = [];
  for (const p of svc) { const { t } = await get(p); if (!/What is .* at ODOOVATIONS\?/.test(t)) missing.push(p); }
  check(svc.length >= 16 && missing.length === 0, `every service page opens with an answer-first summary (${svc.length} pages${missing.length ? '; missing: ' + missing.join(', ') : ''})`);
  const mods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].slice(0, 10));
  check(new Set(mods).size >= 2, `sitemap lastmod carries real dates, not the build time (${[...new Set(mods)].join(', ')})`);
}

// IndexNow key file
{
  const key = (await import('node:fs')).readFileSync(new URL('../lib/seo.ts', import.meta.url), 'utf8').match(/INDEXNOW_KEY = '([0-9a-f]+)'/)?.[1];
  const { r, t } = await get(`/${key}.txt`);
  check(r.ok && t.trim() === key, 'the IndexNow key file is served');
}

console.log(failed ? `\n${failed} failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
