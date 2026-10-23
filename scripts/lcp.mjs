/** Real-browser LCP under CPU throttling (not Lighthouse's simulation). node scripts/lcp.mjs <url> [slowdown] [runs] */
import { chromium } from 'playwright';
const [url = 'http://localhost:3710/', slow = '4', runs = '3'] = process.argv.slice(2);
const b = await chromium.launch();
for (let i = 0; i < +runs; i++) {
  const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  await ctx.addInitScript(() => {
    localStorage.setItem('odv_consent', JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true }));
    window.__lcp = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lcp.push({ t: Math.round(e.startTime), el: (e.element && (e.element.tagName + '.' + (e.element.className || '').toString().split(' ')[0])) || '?', size: e.size }))).observe({ type: 'largest-contentful-paint', buffered: true });
    window.__fcp = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === 'first-contentful-paint') window.__fcp = Math.round(e.startTime); })).observe({ type: 'paint', buffered: true });
  });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: +slow });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => ({ fcp: window.__fcp, lcp: window.__lcp }));
  console.log(`run ${i + 1}: FCP ${r.fcp}ms, LCP ${r.lcp.map((x) => `${x.t}ms ${x.el}`).join(' -> ')}`);
  await ctx.close();
}
await b.close();
