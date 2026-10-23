/**
 * Captures for the v5 pass: full pages at half scale, and section crops at full scale.
 *   node scripts/v5-shots.mjs <baseUrl> <outDir>
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [base = 'http://localhost:3720', out = 'audit/v5'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const b = await chromium.launch();

async function open(path, w, h, scale = 1) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await ctx.addInitScript((c) => { localStorage.setItem('odv_consent', c); localStorage.setItem('odv_ribbon_tier', 'high'); }, consent);
  const p = await ctx.newPage();
  await p.goto(base + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await p.waitForTimeout(70); }
  await p.waitForTimeout(500);
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await p.waitForTimeout(500);
  await p.addStyleTag({ content: '.cinema-frame,.cinema-flare{display:none !important}' });
  return { ctx, p };
}
async function crop(p, selector, name) {
  const el = p.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  await el.screenshot({ path: `${out}/${name}.png` });
  console.log(name);
}

for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const { ctx, p } = await open('/', w, h, 0.5);
  await p.screenshot({ path: `${out}/home-full-${tag}.jpg`, type: 'jpeg', quality: 72, fullPage: true });
  console.log(`home-full-${tag}`, await p.evaluate(() => document.documentElement.scrollHeight));
  await ctx.close();
}

{
  const { ctx, p } = await open('/', 1440, 900, 1);
  await crop(p, '#proof-h >> xpath=ancestor::section', 'd-proof');
  await crop(p, '#services-h >> xpath=ancestor::section', 'd-services');
  await crop(p, '#work-h >> xpath=ancestor::section', 'd-work-election');
  await p.getByRole('tab', { name: 'WhatsApp Digital Connection' }).click();
  await p.locator('[data-demo=delivery] button', { hasText: 'Send to customer' }).click();
  await p.waitForTimeout(3000);
  await crop(p, '#work-h >> xpath=ancestor::section', 'd-work-delivery');
  await p.getByRole('tab', { name: 'Scrabble Tournament Timer' }).click();
  await p.waitForTimeout(500);
  await crop(p, '#work-h >> xpath=ancestor::section', 'd-work-timer');
  await crop(p, '#delivery-h >> xpath=ancestor::section', 'd-delivery');
  await p.getByRole('radio', { name: 'QuickBooks integration' }).check({ force: true });
  await crop(p, '#enquiry', 'd-enquiry-quickbooks');
  await ctx.close();
}
{
  const { ctx, p } = await open('/', 390, 844, 1);
  await crop(p, '#proof-h >> xpath=ancestor::section', 'm-proof');
  await crop(p, '#services-h >> xpath=ancestor::section', 'm-services');
  await crop(p, '#work-h >> xpath=ancestor::section', 'm-work-closed');
  await p.getByRole('button', { name: 'Open the working demonstration' }).first().click();
  await p.waitForTimeout(1200);
  await crop(p, '#work-h >> xpath=ancestor::section', 'm-work-open');
  await crop(p, '#delivery-h >> xpath=ancestor::section', 'm-delivery');
  await p.getByRole('radio', { name: 'Shopify' }).check({ force: true });
  await crop(p, '#enquiry', 'm-enquiry-shopify');
  await p.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/m-footer.png` });
  await ctx.close();
}
await b.close();
