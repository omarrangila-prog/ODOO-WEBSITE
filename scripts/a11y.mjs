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
];

const browser = await chromium.launch();
const all = [];
let totalViolations = 0;

for (const scheme of ['dark', 'light']) {
  for (const [name, path] of pages) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(500);
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
console.log(`axe scanned ${pages.length} pages × 2 themes`);
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
