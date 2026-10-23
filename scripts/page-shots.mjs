/** Full-page screenshots of inner pages: node scripts/page-shots.mjs <outDir> <w> <h> <path>... */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [outDir, w, h, ...paths] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { localStorage.setItem('odv_ribbon_tier', 'high'); localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true })); });
const p = await ctx.newPage();
const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120)));
for (const path of paths) {
  await p.goto('http://localhost:3700' + path, { waitUntil: 'networkidle' });
  // scroll through once so lazy and scroll-in content has played
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 600) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(90); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(700);
  // A full-page capture stretches the viewport-fixed frame's giant wall shadow over the whole page,
  // which a real browser never shows. Hide the frame layers so the content can be judged.
  await p.addStyleTag({ content: '.cinema-frame,.cinema-flare{display:none !important}' });
  const name = path === '/' ? 'home' : path.slice(1).replace(/\//g, '_');
  await p.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  console.log(name.padEnd(36), (await p.evaluate(() => document.documentElement.scrollHeight)) + 'px');
}
console.log(errs.length ? 'ERRORS: ' + errs.slice(0, 3).join(' | ') : 'no console errors');
await b.close();
