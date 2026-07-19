/**
 * Internal-link, image, redirect and route-inventory audit.
 * Crawls all sitemap URLs + known routes, extracts <a href> and <img src>,
 * checks status of each internal target, flags redirects/broken/orphans.
 * Run: node scripts/link-image-audit.mjs http://localhost:3000
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = 'reports';
mkdirSync(OUT, { recursive: true });

async function head(url) {
  try {
    const r = await fetch(url, { redirect: 'manual' });
    return { status: r.status, location: r.headers.get('location') || '' };
  } catch {
    return { status: 0, location: '' };
  }
}

async function getHtml(url) {
  const r = await fetch(url, { redirect: 'manual' });
  return r.status === 200 ? await r.text() : '';
}

const abs = (href) => {
  // External protocols / hosts are not internal links.
  if (/^(tel:|mailto:|wa\.me|https?:\/\/wa\.me)/i.test(href)) return null;
  if (href.startsWith('http')) {
    // Only treat as internal if it points at our own origin.
    if (href.startsWith(`${BASE}/`) || href.startsWith('https://www.odoovations.com/')) {
      return href.replace(/^https?:\/\/[^/]+/, BASE);
    }
    return null; // genuinely external
  }
  if (href.startsWith('/')) return `${BASE}${href}`;
  return null;
};

async function main() {
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const sitemapUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASE));

  const pages = new Set(sitemapUrls);
  const linksIn = {};
  const linkRows = [];
  const imgRows = [];
  const broken = [];
  const redirecting = [];
  const imgSeen = new Set();

  for (const url of sitemapUrls) {
    const html = await getHtml(url);
    // links
    const hrefs = [...html.matchAll(/<a[^>]+href="([^"#?]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
    for (const [, href, inner] of hrefs) {
      const target = abs(href);
      if (!target || target.includes('/api/')) continue;
      if (!target.startsWith(BASE)) continue; // internal only
      const anchor = inner.replace(/<[^>]*>/g, '').trim().slice(0, 60);
      linksIn[target] = (linksIn[target] || 0) + 1;
      linkRows.push({ from: url, to: target, anchor });
    }
    // images — match the whole <img ...> tag so attribute order doesn't matter
    const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    for (const tag of imgTags) {
      const srcM = tag.match(/\ssrc="([^"]+)"/i);
      if (!srcM) continue;
      let real = srcM[1];
      const m = real.match(/[?&]url=([^&]+)/);
      if (m) real = decodeURIComponent(m[1]);
      if (real.startsWith('data:')) continue;
      const key = `${url}|${real}`;
      if (imgSeen.has(key)) continue;
      imgSeen.add(key);
      const target = abs(real.startsWith('/') ? real : `/${real}`);
      const altM = tag.match(/\salt="([^"]*)"/i);
      const hasAlt = altM !== null; // empty alt="" is valid (decorative)
      const decorative = altM !== null && altM[1] === '';
      let status = 'n/a';
      if (target) status = (await head(target)).status;
      imgRows.push({ page: url, src: real, status, hasAlt, decorative, legacy: /ahm/i.test(real) });
    }
  }

  // Check unique internal link targets for status/redirects
  const targets = [...new Set(linkRows.map((r) => r.to))];
  const statusCache = {};
  for (const t of targets) {
    const { status, location } = await head(t);
    statusCache[t] = status;
    if (status >= 400) broken.push({ url: t, status });
    if (status === 301 || status === 302 || status === 308) redirecting.push({ url: t, status, location });
  }

  // Orphans: sitemap pages with 0 incoming internal links (excluding homepage)
  const orphans = [...pages].filter((p) => p !== `${BASE}/` && !(linksIn[p] > 0));

  // Redirect map (known)
  const redirectTests = ['/services/odoo-integration-services'];
  const redirectMap = [];
  for (const src of redirectTests) {
    const { status, location } = await head(`${BASE}${src}`);
    redirectMap.push({ source: src, destination: location, status, hops: 1 });
  }

  // Write reports
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  writeFileSync(`${OUT}/internal-links.csv`,
    ['from,to,anchor', ...linkRows.map((r) => [esc(r.from), esc(r.to), esc(r.anchor)].join(','))].join('\n'));
  writeFileSync(`${OUT}/broken-links.csv`,
    ['url,status', ...broken.map((r) => [esc(r.url), r.status].join(','))].join('\n') || 'url,status');
  writeFileSync(`${OUT}/orphan-pages.csv`,
    ['url', ...orphans.map(esc)].join('\n'));
  writeFileSync(`${OUT}/image-audit.csv`,
    ['page,src,status,hasAlt,decorative,legacyBrand', ...imgRows.map((r) => [esc(r.page), esc(r.src), r.status, r.hasAlt, r.decorative, r.legacy].join(','))].join('\n'));
  writeFileSync(`${OUT}/redirect-map.csv`,
    ['source,destination,status,hops', ...redirectMap.map((r) => [esc(r.source), esc(r.destination), r.status, r.hops].join(','))].join('\n'));
  writeFileSync(`${OUT}/route-inventory.csv`,
    ['url,incomingLinks,inSitemap', ...[...pages].map((p) => [esc(p), linksIn[p] || 0, 'yes'].join(','))].join('\n'));

  console.log('Internal-link & image audit');
  console.log(`Pages crawled:        ${pages.size}`);
  console.log(`Internal links found: ${linkRows.length}`);
  console.log(`Unique link targets:  ${targets.length}`);
  console.log(`Broken internal:      ${broken.length}`);
  console.log(`Redirecting internal: ${redirecting.length}`);
  console.log(`Images checked:       ${imgRows.length}`);
  console.log(`Images non-200:       ${imgRows.filter((r) => r.status !== 200 && r.status !== 'n/a').length}`);
  console.log(`Images missing alt:   ${imgRows.filter((r) => !r.hasAlt).length}`);
  console.log(`Images decorative:    ${imgRows.filter((r) => r.decorative).length} (intentional empty alt)`);
  console.log(`Legacy-brand images:  ${imgRows.filter((r) => r.legacy).length}`);
  console.log(`Orphan pages:         ${orphans.length}${orphans.length ? ' → ' + orphans.join(', ') : ''}`);
  console.log(`Redirect 308 OK:      ${redirectMap.filter((r) => r.status === 308).length}/${redirectMap.length}`);
  console.log(`Reports → internal-links.csv, broken-links.csv, orphan-pages.csv, image-audit.csv, redirect-map.csv, route-inventory.csv`);
  if (redirecting.length) console.log('Internal links pointing to redirects:', redirecting.map((r) => r.url).join(', '));
}

main().catch((e) => { console.error(e); process.exit(1); });
