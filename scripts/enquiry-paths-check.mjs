/**
 * Every link that opens the enquiry form lands on the right path, with the right
 * answers already chosen, and the path survives a submission.
 *   node scripts/enquiry-paths-check.mjs http://localhost:3720
 * Needs ODV_DRY_RUN=1 on the server. Nothing is sent.
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
let failed = 0;
const check = (c, m) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);

async function landed(url) {
  const p = await ctx.newPage();
  await p.goto(BASE + url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  const chosen = await p.locator('form input[type=radio][name$="-path"]:checked').evaluate((e) => e.parentElement.textContent.trim()).catch(() => null);
  const ticked = await p.locator('form [data-path-panel] input:checked').evaluateAll((els) => els.map((e) => e.parentElement.textContent.trim()));
  return { p, chosen, ticked };
}

for (const [url, path, ticks] of [
  ['/contact?path=shopify#form', 'Shopify', []],
  ['/contact?path=woocommerce#form', 'WooCommerce', []],
  ['/contact?path=quickbooks#form', 'QuickBooks integration', []],
  ['/contact?service=Shopify+Integration#form', 'Shopify', []],
  ['/contact?service=QuickBooks+Integration#form', 'QuickBooks integration', []],
  ['/contact?service=Odoo+%2F+ERP#form', 'Odoo & ERP', []],
  ['/contact?service=WhatsApp+Automation#form', 'AI & automation', ['Replies on WhatsApp']],
  ['/contact?service=Marketing#form', 'Something else', ['Digital marketing']],
  ['/contact?service=Mobile+App#form', 'Website or app', ['Mobile app']],
  ['/contact?path=nonsense#form', null, []],
  ['/contact#form', null, []],
]) {
  const r = await landed(url);
  check(r.chosen === path && ticks.every((t) => r.ticked.includes(t)), `${url} -> ${path ?? 'no path chosen'}${ticks.length ? ' with ' + ticks.join(', ') : ''}`);
  await r.p.close();
}

// The platform pages' calls to action open their own path.
for (const [page, expectPath] of [['/platforms/shopify', 'Shopify'], ['/platforms/woocommerce', 'WooCommerce'], ['/platforms/quickbooks', 'QuickBooks integration']]) {
  const p = await ctx.newPage();
  await p.goto(BASE + page, { waitUntil: 'networkidle' });
  const hrefs = await p.locator('a[href^="/contact"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  const own = hrefs.filter((h) => h.includes(`from=platform-`));
  check(own.length >= 2, `${page}: the page's own enquiry links are present (${own.length} of ${hrefs.length} links to /contact)`);
  await p.goto(BASE + own[0], { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  const chosen = await p.locator('form input[type=radio][name$="-path"]:checked').evaluate((e) => e.parentElement.textContent.trim()).catch(() => null);
  check(chosen === expectPath, `${page}: its own enquiry link opens the ${expectPath} path (${chosen})`);
  await p.close();
}

// A project page's call to action opens the path that fits it.
for (const [page, expectPath] of [['/projects/kcci-election', 'Custom software'], ['/projects/whatsapp-digital-connection', 'AI & automation'], ['/projects/scrabble-timer', 'Custom software']]) {
  const p = await ctx.newPage();
  await p.goto(BASE + page, { waitUntil: 'networkidle' });
  const href = await p.getByRole('link', { name: 'Discuss a project like this' }).getAttribute('href');
  await p.goto(BASE + href, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  const chosen = await p.locator('form input[type=radio][name$="-path"]:checked').evaluate((e) => e.parentElement.textContent.trim()).catch(() => null);
  check(chosen === expectPath, `${page}: "Discuss a project like this" opens ${expectPath} (${chosen})`);
  await p.close();
}

await b.close();
console.log(failed ? `\n${failed} failed.` : '\nAll enquiry links land on the right path.');
process.exit(failed ? 1 : 0);
