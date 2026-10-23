/**
 * The three working demonstrations at the widths the brief names: no horizontal
 * overflow, nothing wider than its frame, and the space reserved for the
 * demonstration is the space it takes (so mounting it does not move the page).
 *   node scripts/demo-layout.mjs http://localhost:3720
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const widths = [[360, 740], [390, 844], [768, 1024], [1024, 768], [1440, 900]];
const pages = [['/projects/kcci-election', 'election'], ['/projects/whatsapp-digital-connection', 'delivery'], ['/projects/scrabble-timer', 'timer']];
let failed = 0;
const b = await chromium.launch();
for (const [w, h] of widths) {
  for (const [path, id] of pages) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    await ctx.addInitScript((c) => {
      localStorage.setItem('odv_consent', c);
      window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    }, consent);
    const p = await ctx.newPage();
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    const box = p.locator(`[data-demo=${id}]`);
    await box.scrollIntoViewIfNeeded();
    await box.locator('figure').waitFor({ timeout: 8000 });
    await p.waitForTimeout(500);
    const clsBefore = await p.evaluate(() => window.__cls);
    // Exercise it, so the tallest states are on screen.
    if (id === 'election') {
      await box.getByRole('tab', { name: 'Polling day' }).click();
      await box.locator('#el-poll-member').fill('A-101');
      await box.getByRole('button', { name: 'Issue ballot' }).click();
      await box.getByText('Candidate 1').click();
      await box.getByRole('button', { name: 'Cast vote' }).click();
    } else if (id === 'delivery') {
      await box.getByRole('button', { name: /Send to customer/ }).click();
      await p.waitForTimeout(1000);
      await box.getByRole('button', { name: /Send to customer/ }).click();
      await p.waitForTimeout(3200);
    } else {
      await box.getByRole('button', { name: 'Start', exact: true }).click();
      await box.getByRole('button', { name: /Player 1 won/ }).first().click();
    }
    await p.waitForTimeout(400);
    const r = await p.evaluate((sel) => {
      const c = document.querySelector(sel);
      const fig = c.querySelector('figure');
      const fr = fig.getBoundingClientRect();
      const wide = [...fig.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > fr.right + 1 || r.left < fr.left - 1); }).length;
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        wide,
        reserved: Math.round(parseFloat(getComputedStyle(c).minHeight)),
        actual: Math.round(fr.height),
        cls: window.__cls,
      };
    }, `[data-demo=${id}]`);
    const grew = r.actual > r.reserved + 1;
    const line = `${String(w).padStart(4)}px ${id.padEnd(9)} overflow ${r.overflow}px, ${r.wide} child(ren) outside frame, reserved ${r.reserved}px, used ${r.actual}px, CLS ${clsBefore.toFixed(3)}`;
    if (r.overflow > 0 || r.wide > 0 || clsBefore > 0.02) { failed++; console.log('FAIL  ' + line); }
    else console.log('ok    ' + line + (grew ? '  (taller than reserved once exercised; user-initiated)' : ''));
    await ctx.close();
  }
}
await b.close();
console.log(failed ? `\n${failed} failed.` : '\nAll demonstrations lay out cleanly.');
process.exit(failed ? 1 : 0);
