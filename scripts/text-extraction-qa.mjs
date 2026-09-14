/**
 * Text-extraction QA.
 *
 * A browser lays out block elements on separate lines, so "Support" and
 * "A real person" read correctly on screen even with no whitespace between
 * their <span>s. But textContent — what many scrapers, some AI retrieval
 * pipelines and some SEO tools read — concatenates them: "SupportA real
 * person". This crawls every sitemap URL and reports any element whose
 * textContent fuses two words that innerText keeps apart.
 *
 * Usage: node scripts/text-extraction-qa.mjs http://localhost:3000
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3000';
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || '/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const findings = [];

for (const path of paths) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  const hits = await page.evaluate(() => {
    const out = [];
    // Candidates: any element with ≥2 element children that carry text.
    /*
     * Adjacent <li> or <a>/<button> siblings fusing is ordinary HTML — every
     * nav on the web does it and crawlers understand lists. What matters is
     * a title and its description fusing INSIDE one card, heading or link,
     * because a quoted snippet of that reads as a typo. So: main content
     * only, and skip elements whose children are all list items or links.
     */
    for (const el of document.querySelectorAll('main *')) {
      if (el.children.length < 2) continue;
      if (el.closest('nav, [role="navigation"]')) continue;
      const kids = [...el.children];
      if (kids.every((k) => ['LI', 'A', 'BUTTON'].includes(k.tagName))) continue;
      if (el.tagName === 'UL' || el.tagName === 'OL') continue;
      // Serialized React data lives in <script> tags; it is not page text.
      if (el.tagName === 'SCRIPT' || el.querySelector('script')) continue;
      const tc = el.textContent.replace(/\s+/g, ' ').trim();
      const it = el.innerText?.replace(/\s+/g, ' ').trim();
      if (!it || tc === it) continue;
      // A fusion is where innerText has "word word" but textContent has "wordword".
      const fused = [];
      const re = /([A-Za-z0-9.!?%)])([A-Z0-9])/g; // lowercase/punct immediately followed by capital/digit
      let m;
      while ((m = re.exec(tc))) {
        const idx = m.index + 1;
        const pair = tc.slice(Math.max(0, idx - 12), idx + 12);
        // Only count it if innerText has whitespace at that boundary.
        const left = tc.slice(Math.max(0, idx - 12), idx), right = tc.slice(idx, idx + 12);
        if (it.includes(left + ' ' + right) || it.includes(left.trimEnd() + ' ' + right.trimStart())) fused.push(pair);
      }
      if (fused.length) {
        const tag = el.tagName.toLowerCase();
        const cls = (el.className && typeof el.className === 'string') ? '.' + el.className.split(/\s+/).slice(0, 2).join('.') : '';
        let n = el, chain = []; while (n && n !== document.body) { chain.unshift(n.tagName.toLowerCase() + (n.id ? "#" + n.id : "")); n = n.parentElement; }
        out.push({ sel: `${tag}${cls}`.slice(0, 60), chain: chain.join(">").slice(0, 160), fused: [...new Set(fused)].slice(0, 3) });
      }
    }
    // Deduplicate: keep only innermost — drop entries whose fusions are all
    // contained in a child's report (parents repeat every child's fusion).
    const seen = new Set(); const uniq = [];
    for (const o of out.reverse()) { const k = o.fused.join('|'); if (seen.has(k)) continue; seen.add(k); uniq.push(o); }
    return uniq.reverse();
  });
  for (const h of hits) findings.push({ path, ...h });
}
await browser.close();

console.log(`Text-extraction QA — ${paths.length} pages`);
console.log(`Elements whose textContent fuses words: ${findings.length}`);
const byFusion = {};
for (const f of findings) for (const x of f.fused) byFusion[x] = (byFusion[x] || 0) + 1;
for (const [k, n] of Object.entries(byFusion).sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(`  ${String(n).padStart(3)}×  "${k}"`);
