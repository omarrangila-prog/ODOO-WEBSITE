/** Screenshot key pages at desktop + mobile for visual QA. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = 'reports/shots';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['home', '/'],
  ['services', '/services'],
  ['industries', '/industries'],
  ['solution-fbr', '/solutions/fbr-digital-invoicing-pakistan'],
  ['resource', '/resources/odoo-implementation-cost-pakistan'],
  ['contact', '/contact'],
  ['location-karachi', '/locations/odoo-services-karachi'],
];

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

const browser = await chromium.launch();
for (const [vname, w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(600);
    const file = `${OUT}/${name}-${vname}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${file}`);
  }
  await ctx.close();
}
await browser.close();
console.log('done');
