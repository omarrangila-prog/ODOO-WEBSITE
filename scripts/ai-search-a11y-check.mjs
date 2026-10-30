/**
 * AI Search pages: reduced motion, keyboard path, and the labels that must be there.
 *   node scripts/ai-search-a11y-check.mjs http://localhost:3720
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
let failed = 0;
const check = (c, m) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const b = await chromium.launch();

// Reduced motion: nothing moves on any AI Search page.
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const p = await ctx.newPage();
  for (const path of ['/services/ai-search-optimization', '/services/ai-search-pricing', '/services/ai-search-audit', '/services/generative-engine-optimization']) {
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    const moving = await p.evaluate(() =>
      [...document.querySelectorAll('main *')].filter((e) => {
        const cs = getComputedStyle(e);
        return cs.animationName !== 'none' && cs.animationDuration !== '0s' && cs.animationDuration !== '0.001ms' && cs.animationPlayState === 'running';
      }).length,
    );
    check(moving === 0, `${path}: no element animates under reduced motion (${moving})`);
  }
  await ctx.close();
}

// Motion that exists is paused until it is on screen.
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const p = await ctx.newPage();
  await p.goto(BASE + '/services/ai-search-pricing', { waitUntil: 'networkidle' });
  const state = await p.evaluate(() => [...document.querySelectorAll('.mv-flow')].map((e) => getComputedStyle(e).animationPlayState));
  check(state.length === 0, 'the pricing page carries no continuous animation at all');
  await p.goto(BASE + '/services/ai-search-optimization', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }));
  await p.waitForTimeout(500);
  const off = await p.evaluate(() => getComputedStyle(document.querySelector('.mv-flow')).animationPlayState);
  check(off === 'paused', `the hub diagram's drifting dashes are paused while off screen (${off})`);
  await ctx.close();
}

// Keyboard: the path to the enquiry and through it.
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const p = await ctx.newPage();
  await p.goto(BASE + '/services/ai-search-pricing', { waitUntil: 'networkidle' });
  // Every interactive element on the page can take focus, and focus is visible.
  const names = [];
  for (let i = 0; i < 400; i++) {
    await p.keyboard.press('Tab');
    const info = await p.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const cs = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      return { tag: e.tagName, name: (e.getAttribute('aria-label') || e.textContent || e.getAttribute('name') || '').trim().slice(0, 40), outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0, shadow: cs.boxShadow !== 'none', ring: e.closest('label')?.matches(':has(:focus-visible)') ?? false, visible: r.width > 0 && r.height > 0 };
    });
    if (!info) continue;
    names.push(info);
    if (/Send request/.test(info.name)) break;
  }
  check(names.some((n) => /Send request/.test(n.name)), 'Tab reaches the Send request button');
  check(names.some((n) => /Discuss Growth/.test(n.name)) && names.some((n) => /Ask about the audit/.test(n.name)), 'Tab reaches the plan buttons on the way');
  const unseen = names.filter((n) => n.visible && !n.outline && !n.shadow && !n.ring && !['INPUT'].includes(n.tag));
  check(unseen.length === 0, `every focused control shows a focus indicator (${unseen.map((u) => u.name).join(', ') || 'none missing'})`);
  // The comparison table is reachable and labelled.
  const t = await p.evaluate(() => {
    const tb = document.querySelector('table');
    return { caption: !!tb?.querySelector('caption'), colHeads: tb?.querySelectorAll('thead th[scope=col]').length, rowHeads: tb?.querySelectorAll('tbody th[scope=row]').length };
  });
  check(t.caption && t.colHeads === 6 && t.rowHeads === 12, `the comparison table has a caption, ${t.colHeads} column headers and ${t.rowHeads} row headers`);
  // Form labels
  const unlabeled = await p.evaluate(() =>
    [...document.querySelectorAll('#enquiry input:not([type=hidden]):not([tabindex="-1"]), #enquiry textarea, #enquiry select')].filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label')).length,
  );
  check(unlabeled === 0, `every form control has a label (${unlabeled} without)`);
  await ctx.close();
}

await b.close();
console.log(failed ? `\n${failed} failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
