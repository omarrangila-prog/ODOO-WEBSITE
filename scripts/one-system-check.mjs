/**
 * The "one system" diagram: geometry, arrival, idle motion, pausing, reduced motion, no scripts.
 *   node scripts/one-system-check.mjs http://localhost:3720
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const PAGE = '/services/odoo-implementation-pakistan';
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
let failed = 0;
const check = (c, m) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const b = await chromium.launch();

async function open(opts = {}, js = true) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: js, ...opts });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const p = await ctx.newPage();
  await p.goto(BASE + PAGE, { waitUntil: 'networkidle' });
  return { ctx, p };
}

// Geometry: every spoke starts outside the hub and ends before the node, and nothing crosses the centre.
{
  const { ctx, p } = await open();
  const g = await p.evaluate(() => {
    const out = [];
    for (const l of document.querySelectorAll('.os .os-spoke-draw')) {
      const d = (x, y) => Math.hypot(+x - 300, +y - 300);
      out.push([d(l.getAttribute('x1'), l.getAttribute('y1')), d(l.getAttribute('x2'), l.getAttribute('y2'))]);
    }
    return out;
  });
  check(g.length === 8, `eight spokes (${g.length})`);
  check(g.every(([outer, inner]) => inner > 90 && outer < 200 - 38 && outer > inner), 'every spoke runs from the hub edge to the node edge, through neither');
  const labels = await p.locator('.os-label').allTextContents();
  check(labels.join() === 'Sales,Team,Inventory,Accounting,Customers,Website,WhatsApp,Reports', `eight labels in order (${labels.join(', ')})`);
  // A label never sits across a spoke: compare each label's box with every spoke's box on screen.
  const clash = await p.evaluate(() => {
    const spokes = [...document.querySelectorAll('.os .os-spoke-draw')].map((l) => l.getBoundingClientRect());
    return [...document.querySelectorAll('.os-label')].filter((el) => {
      const r = el.getBoundingClientRect();
      return spokes.some((s) => r.left < s.right && r.right > s.left && r.top < s.bottom && r.bottom > s.top && s.width + s.height > 1);
    }).map((e) => e.textContent);
  });
  check(clash.length === 0, `no label overlaps a spoke (${clash.join(', ') || 'none'})`);
  await ctx.close();
}

// Arrival, idle motion, pause.
{
  const { ctx, p } = await open();
  const os = p.locator('.os').first();
  await p.waitForTimeout(600);
  check((await os.getAttribute('data-in')) === 'true', 'arrives once it is on screen (data-in set)');
  check((await os.getAttribute('data-live')) === 'true', 'idle motion runs while it is on screen');
  const animating = await p.evaluate(() => ['.os-float', '.os-rot-sweep', '.os-flow'].map((s) => getComputedStyle(document.querySelector(s)).animationPlayState));
  check(animating.every((x) => x === 'running'), `CSS animations are running (${animating.join(', ')})`);
  check(await p.evaluate(() => !document.querySelector('.os svg').animationsPaused()), 'the SVG packets are running');

  await p.getByRole('button', { name: 'Pause motion' }).click();
  check((await os.getAttribute('data-live')) === 'false', 'the Pause button stops the motion');
  const frozen = await p.evaluate(() => ['.os-float', '.os-rot-sweep', '.os-flow'].map((s) => getComputedStyle(document.querySelector(s)).animationPlayState));
  check(frozen.every((x) => x === 'paused') && (await p.evaluate(() => document.querySelector('.os svg').animationsPaused())), 'CSS animations and SVG packets are both held');
  check((await p.getByRole('button', { name: 'Play motion' }).getAttribute('aria-pressed')) === 'true', 'the button reports its state (aria-pressed)');
  await p.getByRole('button', { name: 'Play motion' }).click();
  check((await os.getAttribute('data-live')) === 'true', 'Play starts it again');

  // The site-wide switch.
  await p.evaluate(() => { document.documentElement.dataset.motion = 'paused'; window.dispatchEvent(new Event('odv:motion')); });
  check((await os.getAttribute('data-live')) === 'false', 'the site-wide pause switch stops it too');
  await p.evaluate(() => { delete document.documentElement.dataset.motion; window.dispatchEvent(new Event('odv:motion')); });

  // Off screen.
  await p.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await p.waitForTimeout(500);
  check((await os.getAttribute('data-live')) === 'false', 'it stops while scrolled out of view');
  await ctx.close();
}

// Reduced motion: finished drawing, nothing hidden, nothing moving, no button needed.
{
  const { ctx, p } = await open({ reducedMotion: 'reduce' });
  const r = await p.evaluate(() => ({
    armed: document.querySelector('.os').classList.contains('os-armed'),
    hidden: [...document.querySelectorAll('.os-node-in, .os-hub-in, .os-label, .os-hub-label')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 1).length,
    moving: [...document.querySelectorAll('.os *')].filter((e) => getComputedStyle(e).animationName !== 'none').length,
    packets: getComputedStyle(document.querySelector('.os-packets')).display,
  }));
  check(!r.armed && r.hidden === 0, `reduced motion: nothing is hidden or armed (hidden ${r.hidden})`);
  check(r.moving === 0 && r.packets === 'none', `reduced motion: nothing animates, packets removed (moving ${r.moving})`);
  check((await p.getByRole('button', { name: /motion/ }).count()) === 0, 'reduced motion: no pause button is needed');
  await ctx.close();
}

// No scripts: the HTML is the finished drawing.
{
  const { ctx, p } = await open({}, false);
  const r = await p.evaluate(() => ({
    hidden: [...document.querySelectorAll('.os-node-in, .os-hub-in, .os-label, .os-hub-label, .os-flow')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 1).length,
    offset: [...document.querySelectorAll('.os-spoke-draw')].filter((e) => getComputedStyle(e).strokeDashoffset !== '0px' && getComputedStyle(e).strokeDashoffset !== '0').length,
    nodes: document.querySelectorAll('.os-node-in').length,
  }));
  check(r.nodes === 8 && r.hidden === 0 && r.offset === 0, `without scripts: all eight nodes and spokes are drawn (${r.nodes} nodes, ${r.hidden} hidden, ${r.offset} undrawn)`);
  await ctx.close();
}

// Phone.
{
  const { ctx, p } = await open({ viewport: { width: 360, height: 740 } });
  const r = await p.evaluate(() => ({ overflow: document.documentElement.scrollWidth - innerWidth, w: document.querySelector('.os').getBoundingClientRect().width }));
  check(r.overflow <= 0, `360px: no horizontal overflow (${r.overflow}px), diagram ${Math.round(r.w)}px wide`);
  const small = await p.evaluate(() => [...document.querySelectorAll('.os-label')].filter((e) => parseFloat(getComputedStyle(e).fontSize) < 12).length);
  check(small === 0, 'labels stay at least 12px on a phone');
  await ctx.close();
}

await b.close();
console.log(failed ? `\n${failed} failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
