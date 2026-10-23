/** Where does style and layout time go on first load? node scripts/trace-layout.mjs <url> [cpuSlowdown] */
import { chromium } from 'playwright';
import { writeFileSync, readFileSync } from 'node:fs';
const [url = 'http://localhost:3710/', slow = '4'] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
await ctx.addInitScript(() => localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true })));
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: +slow });
await b.startTracing(p, { path: '/tmp/odv-trace.json', categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink', 'v8'] });
await p.goto(url, { waitUntil: 'load' });
await p.waitForTimeout(4000);
await b.stopTracing();
const t = JSON.parse(readFileSync('/tmp/odv-trace.json', 'utf8'));
const ev = (t.traceEvents || t).filter((e) => e.ph === 'X' && e.dur);
const sum = {};
for (const e of ev) {
  if (!['UpdateLayoutTree', 'Layout', 'Paint', 'PrePaint', 'Layerize', 'ParseHTML', 'EvaluateScript', 'FunctionCall', 'FireAnimationFrame', 'RunTask', 'UpdateLayer', 'CompositeLayers', 'Decode Image', 'ImageDecodeTask', 'ResourceFinish', 'HitTest'].includes(e.name)) continue;
  sum[e.name] = (sum[e.name] || 0) + e.dur / 1000;
}
console.log(Object.entries(sum).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v.toFixed(0)}ms`).join('\n'));
const big = ev.filter((e) => ['UpdateLayoutTree', 'Layout'].includes(e.name)).sort((a, b) => b.dur - a.dur).slice(0, 8);
console.log('\nlargest style/layout events:');
for (const e of big) console.log(`${e.name} ${(e.dur / 1000).toFixed(0)}ms at ${((e.ts - ev[0].ts) / 1000).toFixed(0)}ms`, JSON.stringify(e.args?.beginData || e.args?.elementCount || e.args?.data || {}).slice(0, 160));
await b.close();
