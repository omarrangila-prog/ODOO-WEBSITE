import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const OUT = process.argv[3];
const WAV = process.argv[4];
const only = process.argv[5] || 'all';
async function page(b, viewport) {
  const ctx = await b.newContext({ viewport, locale: 'en-GB', permissions: ['microphone'] });
  const p = await ctx.newPage();
  p.logs = [];
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) p.logs.push(m.text().slice(0, 160)); });
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.waitForTimeout(3200);
  return { ctx, p };
}
async function rejectCookies(p) {
  const r = p.getByRole('button', { name: /reject all/i }).first();
  if (await r.isVisible().catch(() => false)) await r.click();
  await p.waitForTimeout(400);
}
const log = (p) => p.locator('[role=log]').innerText();

if (only === 'all' || only === 'shots') {
  const b = await chromium.launch();
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const { ctx, p } = await page(b, vp);
    await p.screenshot({ path: `${OUT}/${name}-0-with-banner.png` });
    await rejectCookies(p);
    await p.screenshot({ path: `${OUT}/${name}-1-launcher.png` });
    await p.getByRole('button', { name: /Meet your AI guide: /i }).click();
    await p.waitForTimeout(1200);
    await p.screenshot({ path: `${OUT}/${name}-2-panel.png` });
    console.log(name, 'console:', p.logs.slice(0, 5));
    await ctx.close();
  }
  await b.close();
}

if (only === 'all' || only === 'text') {
  const b = await chromium.launch();
  const { ctx, p } = await page(b, { width: 1440, height: 900 });
  await rejectCookies(p);
  await p.getByRole('button', { name: /Meet your AI guide: /i }).click();
  await p.locator('#cg-input').fill('How much does an Odoo implementation cost? Keep it short.');
  await p.locator('#cg-input').press('Enter');
  await p.waitForFunction(() => document.querySelectorAll('[role=log] .rounded-bl-md').length >= 2, null, { timeout: 60000 }).catch(() => console.log('TIMEOUT text reply'));
  await p.waitForTimeout(3000);
  await p.screenshot({ path: `${OUT}/text-1-reply.png` });
  console.log('TEXT TRANSCRIPT:\n' + (await log(p)));
  await p.locator('#cg-input').fill('Yes please, open your pricing page.');
  await p.locator('#cg-input').press('Enter');
  await p.waitForURL('**/pricing', { timeout: 45000 }).then(() => console.log('NAVIGATED:', p.url())).catch(() => console.log('NO NAVIGATION', p.url()));
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${OUT}/text-2-nav.png` });
  console.log('AFTER NAV:\n' + (await log(p)).slice(-700));
  console.log('console:', p.logs.slice(0, 6));
  await ctx.close();
  await b.close();
}

if ((only === 'all' || only === 'voice') && WAV) {
  const b = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${WAV}`, '--autoplay-policy=no-user-gesture-required'] });
  const { ctx, p } = await page(b, { width: 1440, height: 900 });
  await rejectCookies(p);
  await p.getByRole('button', { name: /Meet your AI guide: /i }).click();
  await p.getByRole('button', { name: /Talk to me/i }).click();
  let sawSpeaking = false;
  for (let i = 0; i < 40; i++) {
    await p.waitForTimeout(1000);
    const st = await p.locator('[aria-live=polite]').first().innerText().catch(() => '');
    if (/Speaking/.test(st)) {
      if (!sawSpeaking) await p.screenshot({ path: `${OUT}/voice-1-speaking.png` });
      sawSpeaking = true;
      const box = await p.locator('[role=dialog][aria-label*="Concierge"] canvas').first().boundingBox();
      if (box) for (let k = 0; k < 4; k++) { await p.screenshot({ path: `${OUT}/voice-mouth-${i}-${k}.png`, clip: { x: box.x + box.width * 0.42, y: box.y + box.height * 0.18, width: box.width * 0.24, height: box.height * 0.16 } }); await p.waitForTimeout(90); }
    }
  }
  console.log('VOICE: saw speaking state =', sawSpeaking);
  console.log('VOICE TRANSCRIPT:\n' + (await log(p)));
  await p.screenshot({ path: `${OUT}/voice-2-after.png` });
  await p.getByRole('button', { name: /End voice chat/i }).click().catch(() => console.log('no end button'));
  await p.waitForTimeout(1500);
  const micLive = await p.evaluate(() => 'unknown');
  console.log('ended; status text:', await p.locator('[aria-live=polite]').first().innerText().catch(() => ''), micLive);
  console.log('console:', p.logs.slice(0, 6));
  await ctx.close();
  await b.close();
}
