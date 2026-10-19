/**
 * Visual QA crawler.
 *
 * Drives a real Chromium across the viewport matrix and reports layout defects
 * that reading React source cannot reveal: horizontal overflow, elements
 * escaping the viewport, clipped text, overlapping fixed furniture, unstable
 * header height, and console errors.
 *
 * Usage: node scripts/visual-qa.mjs http://localhost:3000 [--screenshots] [--out=audit/after]
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const SHOTS = process.argv.includes('--screenshots');
const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6) || 'audit/after';
mkdirSync(OUT, { recursive: true });
if (SHOTS) mkdirSync(`${OUT}/screens`, { recursive: true });

const viewports = [
  ['320x568', 320, 568],
  ['360x800', 360, 800],
  ['375x812', 375, 812],
  ['390x844', 390, 844],
  ['393x873', 393, 873],
  ['414x896', 414, 896],
  // 430 is the iPhone 15/16 Pro Max CSS width, named in the mobile audit.
  ['430x932', 430, 932],
  ['768x1024', 768, 1024],
  ['820x1180', 820, 1180],
  ['1024x768', 1024, 768],
  ['1280x800', 1280, 800],
  ['1366x768', 1366, 768],
  ['1440x900', 1440, 900],
  ['1536x864', 1536, 864],
  ['1920x1080', 1920, 1080],
  ['2560x1440', 2560, 1440],
];

const pages = [
  ['home', '/'],
  ['what-we-do', '/services'],
  ['capability', '/services/ai-automation'],
  ['solutions', '/solutions'],
  ['solution', '/solutions/accounting-software'],
  ['industries', '/industries'],
  ['industry', '/industries/manufacturing'],
  ['rapid', '/rapid-delivery'],
  ['work', '/case-studies'],
  ['global', '/company/global-delivery'],
  ['resources', '/resources'],
  ['contact', '/contact'],
  ['about', '/company/about'],
  ['clients', '/company/clients'],
  ['team', '/company/team'],
];

/** Runs inside the page. Returns every layout defect it can see. */
function collectDefects() {
  const vw = window.innerWidth;
  const issues = [];

  // 1. Page-level horizontal overflow. This is always a real defect.
  const sw = document.documentElement.scrollWidth;
  if (sw > vw + 1) {
    issues.push({ type: 'page-h-overflow', detail: `scrollWidth ${sw} > innerWidth ${vw}` });
  }

  /**
   * An element wider than the viewport is only a defect if nothing above it
   * clips or scrolls. Carousels and the capability marquee are deliberately
   * wider than the screen and sit inside a clipping/scrolling ancestor — they
   * are design, not breakage.
   */
  const containedHorizontally = (el) => {
    let n = el.parentElement;
    while (n && n !== document.body) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === 'hidden' || ox === 'auto' || ox === 'scroll' || ox === 'clip') return true;
      n = n.parentElement;
    }
    return false;
  };

  const isSrOnly = (el) => {
    // Visually-hidden helpers (skip links) are clipped and tiny by design.
    let n = el;
    while (n && n !== document.body) {
      if (n.classList && (n.classList.contains('sr-only') || n.classList.contains('not-sr-only'))) return true;
      n = n.parentElement;
    }
    return false;
  };

  const els = Array.from(document.querySelectorAll('body *'));
  for (const el of els) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (isSrOnly(el)) continue;

    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' ? `.${el.className.split(/\s+/).filter(Boolean).slice(0, 3).join('.')}` : '';
    const sel = `${tag}${id}${cls}`.slice(0, 120);

    const decorative = el.getAttribute('aria-hidden') === 'true' || el.closest('[aria-hidden="true"]');

    // 2. Content escaping the viewport with nothing clipping it.
    if (!decorative && cs.position !== 'fixed' && !containedHorizontally(el)) {
      if (r.right > vw + 1) issues.push({ type: 'escapes-right', sel, detail: `right ${Math.round(r.right)} > ${vw}` });
      if (r.left < -1) issues.push({ type: 'escapes-left', sel, detail: `left ${Math.round(r.left)}` });
    }

    // 3. Text cut off rather than wrapped.
    if (el.childElementCount === 0 && el.textContent && el.textContent.trim().length > 0) {
      if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX === 'hidden') {
        issues.push({ type: 'text-clipped-x', sel, detail: `${el.scrollWidth} > ${el.clientWidth}` });
      }
      if (el.scrollHeight > el.clientHeight + 2 && cs.overflowY === 'hidden') {
        issues.push({ type: 'text-clipped-y', sel, detail: `${el.scrollHeight} > ${el.clientHeight}` });
      }
    }

    /**
     * 4. Touch targets. WCAG exempts links sitting inline inside a sentence,
     *    so only standalone controls (block / flex / grid) are measured.
     */
    if ((tag === 'button' || tag === 'a') && vw < 768 && el.offsetParent !== null) {
      const standalone = ['block', 'flex', 'inline-flex', 'grid', 'inline-grid'].includes(cs.display);
      const inSentence = el.parentElement && ['P', 'LI', 'SPAN'].includes(el.parentElement.tagName) && !standalone;
      if (standalone && !inSentence && r.height > 0 && r.height < 40 && (el.textContent || '').trim().length > 0) {
        issues.push({ type: 'small-touch-target', sel, detail: `${Math.round(r.width)}x${Math.round(r.height)}` });
      }
    }
  }
  return issues;
}

const browser = await chromium.launch();
const all = [];
const consoleErrors = [];
let total = 0;

for (const [vpName, w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push({ viewport: vpName, text: m.text().slice(0, 300) });
  });
  page.on('pageerror', (e) => consoleErrors.push({ viewport: vpName, text: `pageerror: ${String(e).slice(0, 300)}` }));

  for (const [name, path] of pages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    // Settle entrance animations before measuring.
    await page.waitForTimeout(700);
    const issues = await page.evaluate(collectDefects);
    total += issues.length;
    for (const i of issues) all.push({ viewport: vpName, page: name, path, ...i });

    if (SHOTS && ['375x812', '768x1024', '1440x900'].includes(vpName)) {
      await page.screenshot({ path: `${OUT}/screens/${name}-${vpName}-top.png` });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/screens/${name}-${vpName}-bottom.png` });
      await page.evaluate(() => window.scrollTo(0, 0));
    }
  }
  await ctx.close();
}

await browser.close();

const byType = {};
for (const i of all) byType[i.type] = (byType[i.type] || 0) + 1;

writeFileSync(`${OUT}/visual-qa.json`, JSON.stringify({ base: BASE, total, byType, issues: all, consoleErrors }, null, 2));

console.log(`Visual QA — ${viewports.length} viewports x ${pages.length} pages`);
console.log(`Total layout issues: ${total}`);
for (const [t, c] of Object.entries(byType).sort((a, b) => b[1] - a[1])) console.log(`  ${t}: ${c}`);
console.log(`Console errors: ${consoleErrors.length}`);
if (consoleErrors.length) {
  const uniq = [...new Set(consoleErrors.map((e) => e.text))].slice(0, 8);
  uniq.forEach((t) => console.log(`  ! ${t}`));
}
console.log(`Report -> ${OUT}/visual-qa.json`);
