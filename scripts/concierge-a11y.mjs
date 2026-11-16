import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
const b = await chromium.launch();
for (const vp of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
  const ctx = await b.newContext({ viewport: vp }); const p = await ctx.newPage();
  await p.goto('http://localhost:3720/', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  const r = p.getByRole('button', { name: /reject all/i }).first(); if (await r.isVisible().catch(() => false)) await r.click();
  const launcher = await new AxeBuilder({ page: p }).include('[aria-label^="Meet your AI guide"]').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  await p.getByRole('button', { name: /Meet your AI guide: /i }).click(); await p.waitForTimeout(1000);
  const panel = await new AxeBuilder({ page: p }).include('[aria-label="ODOOVATIONS AI Concierge"]').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  console.log(vp.width, 'launcher', launcher.violations.map(v=>v.id+':'+v.nodes.length), 'panel', panel.violations.map(v=>v.id+':'+v.nodes.length+' '+v.nodes[0]?.target));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  console.log('after Escape focus on:', await p.evaluate(() => document.activeElement?.getAttribute('aria-label')));
  await ctx.close();
}
await b.close();
