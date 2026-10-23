/**
 * Before/after captures. Hero views at 1x, full pages at half scale so the files stay small.
 *   node scripts/v4-shots.mjs <baseUrl> <outDir>
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [base = 'http://localhost:3710', out = 'audit/v4/after'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const b = await chromium.launch();

async function shot(name, path, w, h, { full = false, scroll = true } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: full ? 0.5 : 1 });
  await ctx.addInitScript((c) => { localStorage.setItem('odv_consent', c); localStorage.setItem('odv_ribbon_tier', 'high'); }, consent);
  const p = await ctx.newPage();
  await p.goto(base + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);
  if (full && scroll) {
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 600) { await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await p.waitForTimeout(80); }
    await p.waitForTimeout(500); // let the settle sweep reveal everything passed
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await p.waitForTimeout(600);
    await p.addStyleTag({ content: '.cinema-frame,.cinema-flare{display:none !important}' });
  }
  const height = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.screenshot({ path: `${out}/${name}.jpg`, type: 'jpeg', quality: 72, fullPage: full });
  console.log(name.padEnd(28), full ? `${height}px tall` : 'viewport');
  await ctx.close();
}

await shot('home-hero-desktop', '/', 1440, 900);
await shot('home-hero-mobile', '/', 390, 844);
await shot('home-full-desktop', '/', 1440, 900, { full: true });
await shot('home-full-mobile', '/', 390, 844, { full: true });
if (process.env.INNER) {
  await shot('platform-shopify-desktop', '/platforms/shopify', 1440, 900, { full: true });
  await shot('platform-shopify-mobile', '/platforms/shopify', 390, 844, { full: true });
  await shot('platforms-hub-desktop', '/platforms', 1440, 900, { full: true });
  await shot('technologies-desktop', '/technologies', 1440, 900, { full: true });
  await shot('service-odoo-desktop', '/services/odoo-implementation-pakistan', 1440, 900, { full: true });
  await shot('operations-check-desktop', '/tools/operations-check', 1440, 900, { full: true });
}
await b.close();
