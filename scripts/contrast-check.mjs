/**
 * Contrast audit for the text axe cannot resolve.
 *
 * axe-core reports a colour-contrast node as "incomplete" when it cannot work
 * out the background behind it (translucent layers, gradients, overlays), and
 * scripts/a11y.mjs only counts violations. On the homepage that left about
 * 236 nodes unchecked — including a hero label at 2.31:1 that axe never
 * flagged. This script composites translucent backgrounds itself, so most of
 * that set gets a real ratio. Text sitting over a gradient or image cannot be
 * resolved this way and is counted as "unverifiable", not as a pass.
 *
 * Run: node scripts/contrast-check.mjs http://localhost:3000
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3000';
const paths = [
  '/', '/services', '/services/odoo-migration', '/services/ai-automation', '/solutions',
  '/solutions/accounting-software', '/industries', '/industries/manufacturing', '/case-studies',
  '/company/about', '/company/team', '/company/clients', '/company/methodology',
  '/contact', '/faq', '/rapid-delivery',
];
const viewports = [['mobile', 390, 844], ['desktop', 1440, 900]];
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });

/** Runs in the page. Returns { checked, unverifiable, failures[] }. */
function measure() {
  // Browsers report color-mix() and wide-gamut colours as `color(srgb 0.95 0.94 0.92 / 0.92)`,
  // with channels in 0-1. Reading those as 0-255 made a light header measure as black.
  const parse = (s) => {
    const n = (s.match(/[\d.]+(?:e-?\d+)?/g) || []).map(Number);
    return /^color\(srgb/.test(s) ? [n[0] * 255, n[1] * 255, n[2] * 255, ...(n.length > 3 ? [n[3]] : [])] : n;
  };
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const over = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };

  let checked = 0, unverifiable = 0;
  const failures = [];
  const seen = new Set();

  for (const el of document.querySelectorAll('body *')) {
    // Cheapest tests first: only text that is on screen right now needs the
    // expensive style work, which is what made the first version take half an hour.
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!direct) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (rect.bottom < 0 || rect.top > innerHeight || rect.right < 0 || rect.left > innerWidth) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (el.closest('[aria-hidden="true"], [hidden], script, style, noscript')) continue;
    if (el.closest('[disabled]')) continue;

    // Resolve the background from the PAINT STACK at the text's centre rather
    // than from its ancestors: a photo or an overlay that is a sibling, not an
    // ancestor, sits behind the text just the same. Translucent layers are
    // collected until the first opaque colour; any image, video, canvas, SVG
    // or CSS background-image underneath makes the result unverifiable.
    const cx = Math.min(Math.max(rect.left + rect.width / 2, 1), innerWidth - 1);
    const cy = Math.min(Math.max(rect.top + rect.height / 2, 1), innerHeight - 1);
    let blocked = false;
    const stack = document.elementsFromPoint(cx, cy);
    let start = -1;
    stack.forEach((x, i) => { if (el.contains(x)) start = i; });
    if (start === -1) { unverifiable++; continue; }          // covered by something else
    for (let i = 0; i < start; i++) {                          // anything above the text that is not part of it
      const t = stack[i];
      const ts = getComputedStyle(t);
      const c = parse(ts.backgroundColor);
      if ((c.length > 3 ? c[3] : 1) > 0.02 || ts.backgroundImage !== 'none' || /^(IMG|VIDEO|CANVAS|SVG)$/i.test(t.tagName)) { blocked = true; break; }
    }
    const layers = []; let opacity = 1;
    for (let o = el; o; o = o.parentElement) opacity *= parseFloat(getComputedStyle(o).opacity);
    if (opacity < 0.05) continue;                              // not yet visible
    for (let i = start; i < stack.length && !blocked; i++) {
      const t = stack[i], ts = getComputedStyle(t);
      if (ts.backgroundImage !== 'none' || /^(IMG|VIDEO|CANVAS|SVG|PICTURE)$/i.test(t.tagName)) { blocked = true; break; }
      const c = parse(ts.backgroundColor); const a = c.length > 3 ? c[3] : 1;
      if (a > 0) layers.push([c[0], c[1], c[2], a]);
      if (a === 1) break;
    }
    if (blocked || layers.length === 0 || layers[layers.length - 1][3] < 1) { unverifiable++; continue; }

    let bg = layers.pop();
    while (layers.length) bg = over(layers.pop(), bg);
    const fgc = parse(cs.color); const fa = (fgc.length > 3 ? fgc[3] : 1) * opacity;
    const fg = over([fgc[0], fgc[1], fgc[2], fa], bg);
    const l1 = lum(fg), l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    checked++;
    if (ratio < need) {
      const text = el.textContent.trim().replace(/\s+/g, ' ').slice(0, 40);
      const key = `${text}|${cs.color}`;
      if (seen.has(key)) continue; seen.add(key);
      failures.push({ text, ratio: +ratio.toFixed(2), need, size: Math.round(size), color: cs.color, bg: `rgb(${bg.slice(0, 3).map(Math.round).join(',')})`, cls: String(el.className).slice(0, 50) });
    }
  }
  return { checked, unverifiable, failures };
}

const browser = await chromium.launch();
let checked = 0, unverifiable = 0;
const all = [];
for (const scheme of ['light', 'dark']) {
  for (const [vp, w, h] of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
    const page = await ctx.newPage();
    for (const path of paths) {
      await page.goto(BASE + path, { waitUntil: 'networkidle' }).catch(() => {});
      // Measure one viewport-height slice at a time: elementsFromPoint only sees
      // what is on screen, and scroll-in reveals only play once scrolled to.
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += h - 100) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(900);
        const r = await page.evaluate(measure);
        checked += r.checked; unverifiable += r.unverifiable;
        for (const f of r.failures) all.push({ ...f, where: `${path} (${scheme}, ${vp})` });
      }
    }
    await ctx.close();
  }
}
await browser.close();

console.log(`Resolved and measured: ${checked} text nodes. Unverifiable (over a gradient/image): ${unverifiable}.`);
const grouped = new Map();
for (const f of all) { const k = `${f.text}|${f.color}|${f.bg}`; (grouped.get(k) ?? grouped.set(k, { ...f, n: 0, pages: new Set() }).get(k)).n++; grouped.get(k).pages.add(f.where.split(' ')[0]); }
console.log(`Below WCAG AA: ${grouped.size} distinct`);
for (const g of [...grouped.values()].sort((a, b) => a.ratio - b.ratio).slice(0, 80))
  console.log(`  ${String(g.ratio).padStart(5)}:1 (need ${g.need})  ${g.size}px  ${g.color} on ${g.bg}  "${g.text}"  [${[...g.pages].slice(0, 3).join(' ')}${g.pages.size > 3 ? ' +' + (g.pages.size - 3) : ''}]`);
process.exit(grouped.size ? 1 : 0);
