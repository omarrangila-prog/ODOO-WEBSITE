/** Does scroll reveal leave anything hidden once the page has been scrolled through? node scripts/reveal-check.mjs <base> [path...] */
import { chromium } from 'playwright';
const [base = 'http://localhost:3710', ...paths] = process.argv.slice(2);
const list = paths.length ? paths : ['/', '/platforms', '/platforms/shopify', '/services/odoo-implementation-pakistan', '/technologies'];
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const b = await chromium.launch();
let bad = 0;
for (const path of list) {
  for (const [w, h, step, wait] of [[1440, 900, 600, 80], [390, 844, 500, 80]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);
    const before = await p.evaluate(() => ({ marked: document.querySelectorAll('.reveal').length, shown: document.querySelectorAll('.reveal.is-in').length }));
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += step) { await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await p.waitForTimeout(wait); }
    await p.waitForTimeout(500);
    const mid = await p.evaluate(() => ({ marked: document.querySelectorAll('.reveal').length, shown: document.querySelectorAll('.reveal.is-in').length }));
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await p.waitForTimeout(600);
    const after = await p.evaluate(() => ({ marked: document.querySelectorAll('.reveal').length, shown: document.querySelectorAll('.reveal.is-in').length }));
    const hidden = after.marked - after.shown;
    if (hidden > 0) bad++;
    console.log(`${path} @${w}: before ${before.shown}/${before.marked}, after pass ${mid.shown}/${mid.marked}, back at top ${after.shown}/${after.marked} ${hidden ? 'HIDDEN ' + hidden : 'ok'}`);
    await ctx.close();
  }
}
await b.close();
process.exit(bad ? 1 : 0);
