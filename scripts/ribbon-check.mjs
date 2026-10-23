/**
 * Checks that the hero ribbon runs off the main thread and degrades correctly.
 *   node scripts/ribbon-check.mjs http://localhost:3710
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3710';
let failed = 0;
const ok = (m) => console.log('ok    ' + m);
const bad = (m) => { failed++; console.log('FAIL  ' + m); };
const check = (c, m) => (c ? ok(m) : bad(m));
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const b = await chromium.launch();

async function run(label, width, height, init = () => {}) {
  const ctx = await b.newContext({ viewport: { width, height } });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  await ctx.addInitScript(init);
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  const workers = [];
  p.on('worker', (w) => workers.push(w.url()));
  await p.addInitScript(() => {
    window.__lt = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true });
  });
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500); // hydration and first frames
  const loadTasks = await p.evaluate(() => window.__lt.slice());
  await p.evaluate(() => (window.__lt = []));
  await p.waitForTimeout(3500); // steady state: the ribbon is running, nothing else is
  const state = await p.evaluate(() => {
    const c = document.querySelector('section canvas');
    return { canvas: !!c, opacity: c?.style.opacity, lt: window.__lt, loadTasks: null };
  });
  state.loadTasks = loadTasks;
  return { ctx, p, errs, workers, state };
}

// Desktop, forced to the high tier (so the GPU-less headless browser does not step down).
{
  const { ctx, p, errs, workers, state } = await run('desktop', 1440, 900, () => localStorage.setItem('odv_ribbon_tier', 'high'));
  check(state.canvas, 'desktop: a canvas is created');
  check(workers.length === 1, `desktop: one worker started (${workers.map((w) => w.split('/').pop()).join(', ') || 'none'})`);
  check(state.opacity === '1', `desktop: the live canvas is shown (opacity ${state.opacity})`);
  const over50 = state.lt.filter((d) => d > 50);
  check(over50.length === 0, `desktop: no main-thread task over 50 ms while the ribbon runs (steady-state long tasks: ${state.lt.join(',') || 'none'}; during load: ${state.loadTasks.join(',') || 'none'})`);
  check(errs.length === 0, 'desktop: no console errors' + (errs[0] ? ': ' + errs[0] : ''));

  // Pause control: the canvas must stop changing.
  const grab = () => p.evaluate(() => {
    const c = document.querySelector('section canvas');
    // The canvas is controlled by the worker; read it through the compositor with a screenshot of its box instead.
    return c ? c.getBoundingClientRect().width : 0;
  });
  await grab();
  await p.getByRole('button', { name: /Pause motion/ }).click();
  await p.waitForTimeout(600); // let a frame already in flight finish
  check((await p.evaluate(() => document.documentElement.dataset.motion)) === 'paused', 'desktop: pause sets html[data-motion=paused]');
  const a = await p.screenshot({ clip: { x: 700, y: 120, width: 600, height: 600 } });
  await p.waitForTimeout(1500);
  const bshot = await p.screenshot({ clip: { x: 700, y: 120, width: 600, height: 600 } });
  check(Buffer.compare(a, bshot) === 0, 'desktop: the artwork is frozen while paused');
  await p.getByRole('button', { name: /Play motion/ }).click();
  const c1 = await p.screenshot({ clip: { x: 700, y: 120, width: 600, height: 600 } });
  await p.waitForTimeout(1500);
  const c2 = await p.screenshot({ clip: { x: 700, y: 120, width: 600, height: 600 } });
  check(Buffer.compare(c1, c2) !== 0, 'desktop: the artwork moves again after Play');
  await ctx.close();
}

// Phone: no canvas, no worker.
{
  const { ctx, errs, workers, state } = await run('phone', 390, 844);
  check(!state.canvas && workers.length === 0, `phone: still image only, no canvas and no worker (canvas=${state.canvas}, workers=${workers.length})`);
  check(state.lt.filter((d) => d > 50).length === 0, `phone: no long tasks once loaded (steady-state: ${state.lt.join(',') || 'none'}; during load: ${state.loadTasks.join(',') || 'none'})`);
  check(errs.length === 0, 'phone: no console errors');
  await ctx.close();
}

// Reduced motion: still image only.
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const p = await ctx.newPage();
  const workers = [];
  p.on('worker', (w) => workers.push(w.url()));
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  check((await p.locator('section canvas').count()) === 0 && workers.length === 0, 'reduced motion: no canvas and no worker');
  check((await p.getByRole('button', { name: /Pause motion/ }).count()) === 0, 'reduced motion: no pause control needed');
  await ctx.close();
}
await b.close();
console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
