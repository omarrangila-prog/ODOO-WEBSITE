/**
 * Screenshots every top-level section of a page the way a visitor sees it:
 * scrolled into view, with tall sticky stages captured at several points.
 *   node scripts/section-shots.mjs <outDir> [url] [w] [h]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [outDir, url = 'http://localhost:3700/', w = '1440', h = '900'] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => { localStorage.setItem('odv_ribbon_tier', 'high'); localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true })); });
const p = await ctx.newPage();
const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 140))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const secs = await p.evaluate(() => [...document.querySelectorAll('main > section, main > div > section, main > *')].filter(e => e.tagName === 'SECTION').map((s, i) => { const r = s.getBoundingClientRect(); return { i, top: r.top + scrollY, height: r.height, label: (s.querySelector('h1,h2')?.textContent || s.getAttribute('aria-labelledby') || '').trim().slice(0, 40) }; }));
console.log('sections:', secs.length);
for (const s of secs) {
  const vh = +h;
  const stops = s.height > vh * 1.6 ? [0.0, 0.34, 0.68, 1.0] : [0];
  for (const f of stops) {
    const y = s.top + (s.height > vh ? (s.height - vh) * f : 0) - (s.height <= vh ? Math.max(0, (vh - s.height) / 2) : 0);
    await p.evaluate((v) => window.scrollTo(0, v), Math.max(0, y));
    await p.waitForTimeout(1100);
    const name = `${outDir}/s${String(s.i).padStart(2, '0')}${stops.length > 1 ? '-' + Math.round(f * 100) : ''}.png`;
    await p.screenshot({ path: name });
  }
  console.log(String(s.i).padStart(2, '0'), Math.round(s.height) + 'px', s.label);
}
console.log(errs.length ? 'ERRORS: ' + errs.slice(0, 3).join(' | ') : 'no console errors');
await b.close();
