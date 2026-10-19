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
  // Named in the brief's screenshot list; the route is /company/about.
  ['about', '/company/about'],
  ['portfolio', '/case-studies'],
  ['clients', '/company/clients'],
  ['team', '/company/team'],
];

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

const browser = await chromium.launch();
for (const [vname, w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  /*
   * Record a consent decision before the first paint. Otherwise the cookie
   * banner sits over the lower half of every shot — on /contact it covered
   * the optional-details disclosure and the preferred-contact field, so the
   * screenshots documented the banner rather than the page.
   */
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('odv_consent', JSON.stringify({
        version: 1, necessary: true, analytics: false, marketing: false,
        updatedAt: new Date().toISOString(), decided: true,
      }));
    } catch {}
  });
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
