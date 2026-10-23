/** axe target-size (WCAG 2.2 AA) on a page, without scrolling first, as Lighthouse runs it. node scripts/target-size.mjs <url> [w] [h] */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
const [url = 'http://localhost:3710/', w = '412', h = '823'] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true })));
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const r = await new AxeBuilder({ page: p }).withRules(['target-size']).analyze();
console.log('violations:', r.violations.length, 'nodes:', r.violations.flatMap((v) => v.nodes).length);
for (const n of r.violations.flatMap((v) => v.nodes).slice(0, 6)) console.log(' -', n.target.join(' '), '|', (n.failureSummary || '').split('\n').slice(1, 3).join(' / ').slice(0, 160));
await b.close();
