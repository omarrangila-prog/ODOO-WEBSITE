/**
 * SEO audit crawler. Reads the live sitemap, crawls every URL, extracts
 * status / title / description / H1 count / canonical / OG / schema types,
 * checks uniqueness, and writes evidence files. Run against the local prod
 * server: `node scripts/seo-audit.mjs http://localhost:3000`
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = 'reports';
mkdirSync(OUT, { recursive: true });

const text = (html, re) => (html.match(re)?.[1] ?? '').trim();

async function get(url) {
  const res = await fetch(url, { redirect: 'manual' });
  const status = res.status;
  const html = status < 400 ? await res.text() : '';
  return { status, html };
}

function extract(url, html) {
  const title = text(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = text(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = text(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogTitle = text(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
  const ogImage = text(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  const robots = text(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);

  // JSON-LD blocks
  const ld = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes = [];
  let schemaValid = true;
  for (const m of ld) {
    try {
      const parsed = JSON.parse(m[1]);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const o of arr) if (o && o['@type']) schemaTypes.push(o['@type']);
    } catch {
      schemaValid = false;
    }
  }
  return { url, title, titleLen: title.length, desc, descLen: desc.length, canonical, ogTitle, ogImage, h1s, robots, schemaTypes: [...new Set(schemaTypes)], schemaValid };
}

async function main() {
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASE));
  console.log(`Crawling ${urls.length} sitemap URLs against ${BASE}…`);

  const rows = [];
  const issues = [];
  for (const u of urls) {
    const { status, html } = await get(u);
    if (status !== 200) {
      issues.push({ url: u, severity: 'Critical', issue: `sitemap URL returned ${status}` });
      rows.push({ url: u, status, title: '', titleLen: 0, desc: '', descLen: 0, canonical: '', h1s: 0, schemaTypes: [], schemaValid: true });
      continue;
    }
    const e = extract(u, html);
    rows.push({ status, ...e });
    if (e.h1s !== 1) issues.push({ url: u, severity: 'High', issue: `H1 count = ${e.h1s}` });
    if (!e.canonical) issues.push({ url: u, severity: 'High', issue: 'missing canonical' });
    if (!e.canonical.startsWith('http')) issues.push({ url: u, severity: 'Medium', issue: 'canonical not absolute' });
    if (!e.title) issues.push({ url: u, severity: 'High', issue: 'missing title' });
    if (!e.desc) issues.push({ url: u, severity: 'Medium', issue: 'missing description' });
    if (e.titleLen > 65) issues.push({ url: u, severity: 'Low', issue: `title ${e.titleLen} chars` });
    if (!e.schemaValid) issues.push({ url: u, severity: 'High', issue: 'invalid JSON-LD' });
    if (/ahm[- ](international|odoo)|ahm-international/i.test(html)) issues.push({ url: u, severity: 'Critical', issue: 'legacy AHM brand reference in HTML' });
    if (/Lahore/i.test(html)) issues.push({ url: u, severity: 'High', issue: 'stale Lahore reference' });
  }

  // Uniqueness
  const dup = (key) => {
    const seen = {};
    rows.forEach((r) => { const v = (r[key] || '').toLowerCase(); if (v) (seen[v] ||= []).push(r.url); });
    return Object.entries(seen).filter(([, us]) => us.length > 1);
  };
  for (const [val, us] of dup('title')) issues.push({ url: us.join(' | '), severity: 'High', issue: `duplicate title: "${val}"` });
  for (const [val, us] of dup('desc')) issues.push({ url: us.join(' | '), severity: 'Medium', issue: `duplicate description` });

  // CSV
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const csv = ['url,status,title,titleLen,descLen,h1s,canonical,schemaTypes,schemaValid',
    ...rows.map((r) => [r.url, r.status, esc(r.title), r.titleLen, r.descLen, r.h1s, esc(r.canonical), esc((r.schemaTypes || []).join('|')), r.schemaValid].join(','))].join('\n');
  writeFileSync(`${OUT}/metadata-audit.csv`, csv);
  writeFileSync(`${OUT}/schema-audit.json`, JSON.stringify(rows.map((r) => ({ url: r.url, schemaTypes: r.schemaTypes, valid: r.schemaValid })), null, 2));
  writeFileSync(`${OUT}/seo-audit.json`, JSON.stringify({ base: BASE, crawled: urls.length, ok200: rows.filter((r) => r.status === 200).length, issues }, null, 2));

  const crit = issues.filter((i) => i.severity === 'Critical').length;
  const high = issues.filter((i) => i.severity === 'High').length;
  console.log(`\nCrawled: ${urls.length}`);
  console.log(`200 OK:  ${rows.filter((r) => r.status === 200).length}`);
  console.log(`One H1:  ${rows.filter((r) => r.h1s === 1).length}/${rows.length}`);
  console.log(`Canonical present: ${rows.filter((r) => r.canonical).length}/${rows.length}`);
  console.log(`Valid JSON-LD: ${rows.filter((r) => r.schemaValid).length}/${rows.length}`);
  console.log(`Issues: ${issues.length} (Critical ${crit}, High ${high})`);
  console.log(`Reports → ${OUT}/metadata-audit.csv, schema-audit.json, seo-audit.json`);
  if (issues.length) console.log('\nTop issues:\n' + issues.slice(0, 20).map((i) => `  [${i.severity}] ${i.issue} — ${i.url}`).join('\n'));
}

main().catch((e) => { console.error(e); process.exit(1); });
