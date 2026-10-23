/** Screenshot the homepage hero for visual comparison: node scripts/hero-shot.mjs <out.png> [w] [h] [wait-ms] [url] */
import { chromium } from 'playwright';
const [out, w = '1672', h = '941', wait = '2600', url = 'http://localhost:3700/'] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => localStorage.setItem('odv_ribbon_tier', 'high'));
await ctx.addInitScript(() => localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true })));
const p = await ctx.newPage();
const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 140))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(+wait);
await p.screenshot({ path: out });
console.log('shot', out, errs.length ? 'ERRORS: ' + errs.slice(0, 3).join(' | ') : 'no console errors');
await b.close();
