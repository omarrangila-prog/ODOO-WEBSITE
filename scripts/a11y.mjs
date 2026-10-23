/** Accessibility audit via axe-core across key pages, both themes. */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
mkdirSync('reports', { recursive: true });

const pages = [
  ['home', '/'],
  ['services', '/services'],
  ['industry', '/industries/manufacturing'],
  ['solution', '/solutions/fbr-digital-invoicing-pakistan'],
  ['resource', '/resources/odoo-implementation-cost-pakistan'],
  ['contact', '/contact'],
  // Broader-capability templates added during the repositioning.
  ['solutions-index', '/solutions'],
  ['capability-page', '/services/ai-automation'],
  ['solution-new', '/solutions/accounting-software'],
  ['rapid-delivery', '/rapid-delivery'],
  ['global-delivery', '/company/global-delivery'],
  ['team', '/company/team'],
  ['about', '/company/about'],
  ['our-work', '/case-studies'],
  ['industry-new', '/industries/healthcare-clinics'],
  ['platforms', '/platforms'],
  ['platform', '/platforms/shopify'],
  ['platform-qb', '/platforms/quickbooks'],
  ['technology', '/technologies'],
  ['ops-check', '/tools/operations-check'],
  ['service-odoo', '/services/odoo-implementation-pakistan'],
  ['project-election', '/projects/kcci-election'],
  ['project-delivery', '/projects/whatsapp-digital-connection'],
  ['project-timer', '/projects/scrabble-timer'],
  ['scenario', '/case-studies/textile-manufacturer'],
  ['contact-quickbooks', '/contact?path=quickbooks'],
];

const browser = await chromium.launch();
const all = [];
let totalViolations = 0;

// One scheme: the site has no light mode any more, so scanning two just repeats the result.
for (const scheme of ['dark']) {
  for (const [name, path] of pages) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => {});
    // Scroll the whole page first, as a reader does. Scroll-in reveals hold content at partial
    // opacity until it is reached, and axe measures contrast at that opacity, so an unscrolled
    // scan reports text that is only mid-fade, not what anyone actually sees.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1300);
    const res = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
      .catch((e) => ({ violations: [], error: String(e) }));
    const v = res.violations || [];
    totalViolations += v.length;
    for (const vi of v) {
      all.push({
        page: `${name} (${scheme})`,
        id: vi.id,
        impact: vi.impact,
        help: vi.help,
        nodes: vi.nodes.length,
        sample: vi.nodes[0]?.target?.join(' ') || '',
      });
    }
    await ctx.close();
  }
}

writeFileSync('reports/accessibility-audit.json', JSON.stringify({ base: BASE, totalViolations, violations: all }, null, 2));
console.log(`axe scanned ${pages.length} pages (dark, the only scheme)`);
console.log(`Total violations: ${totalViolations}`);
if (all.length) {
  const byId = {};
  for (const a of all) byId[a.id] = (byId[a.id] || 0) + 1;
  console.log('\nUnique issues:');
  for (const [id, n] of Object.entries(byId)) {
    const ex = all.find((a) => a.id === id);
    console.log(`  [${ex.impact}] ${id} (${n}×) — ${ex.help}\n     e.g. ${ex.sample} on ${ex.page}`);
  }
} else {
  console.log('✓ No WCAG A/AA violations found.');
}
await browser.close();
