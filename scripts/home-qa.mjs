/**
 * Behaviour checks for the homepage and its enquiry path, in a real browser.
 *   node scripts/home-qa.mjs http://localhost:3710
 *
 * Needs the server started with ODV_DRY_RUN=1 so a submission validates and
 * returns success without emailing anyone. Nothing is ever sent to a real
 * recipient by this script.
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3710';
let failed = 0;
const ok = (m) => console.log('ok    ' + m);
const bad = (m) => {
  failed++;
  console.log('FAIL  ' + m);
};
const check = (cond, m) => (cond ? ok(m) : bad(m));

const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
const browser = await chromium.launch();

async function open(width, height, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, ...opts });
  await ctx.addInitScript((c) => localStorage.setItem('odv_consent', c), consent);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  return { ctx, page, errors };
}

/* ---------------------------------------------------------------- hero */
{
  const { ctx, page, errors } = await open(1440, 900);
  const primary = page.getByRole('link', { name: /Discuss Your Project/ }).first();
  check(await primary.isVisible(), 'hero: primary action is visible on first screen');
  const box = await primary.boundingBox();
  check(box && box.y + box.height < 900, 'hero: primary action sits above the fold at 1440x900');
  check(await page.getByRole('link', { name: 'Explore Our Work' }).isVisible(), 'hero: secondary action visible');
  await primary.click();
  await page.waitForTimeout(3200); // smooth scroll over about nine screens
  const y = await page.evaluate(() => document.getElementById('enquiry')?.getBoundingClientRect().top ?? 9999);
  check(y >= 0 && y < 200, `hero: primary action scrolls the enquiry section into view (top=${Math.round(y)})`);
  check(errors.length === 0, 'home: no console errors' + (errors.length ? ' ' + errors[0] : ''));
  await ctx.close();
}

/* ------------------------------------------------------ service explorer */
{
  const { ctx, page } = await open(1440, 900);
  const tabs = page.getByRole('tablist', { name: 'Service groups' }).getByRole('tab');
  check((await tabs.count()) === 5, 'explorer: five groups');
  const panels = await page.locator('[id^="svc-panel-"]').count();
  check(panels === 5, 'explorer: all five panels are in the document');
  const hiddenLinks = await page.locator('[id^="svc-panel-"][hidden] a[href]').count();
  check(hiddenLinks > 0, `explorer: links in inactive panels exist in the HTML (${hiddenLinks})`);
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  check((await tabs.nth(1).getAttribute('aria-selected')) === 'true', 'explorer: ArrowRight moves to the next group');
  check(await page.locator('#svc-panel-odoo').isVisible(), 'explorer: the selected panel is shown');
  const odooLinks = await page.locator('#svc-panel-odoo a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  check(odooLinks.includes('/services/odoo-implementation-pakistan'), 'explorer: Odoo card links to the Odoo implementation page, not the services hub');
  await page.keyboard.press('End');
  check((await tabs.nth(4).getAttribute('aria-selected')) === 'true', 'explorer: End moves to the last group');
  await ctx.close();
}

/* -------------------------------------------------------------- the demo */
{
  const { ctx, page } = await open(1440, 900);
  const demo = page.locator('#flow-panel');
  await demo.scrollIntoViewIfNeeded();
  const stepText = () => demo.locator('text=/Step \\d of \\d/').first().textContent();
  check((await stepText()).includes('Step 1 of 5'), 'demo: starts on step 1 and does not autoplay');
  await page.waitForTimeout(2600);
  check((await stepText()).includes('Step 1 of 5'), 'demo: still on step 1 after 2.6s without pressing play');
  await demo.getByRole('button', { name: 'Next' }).click();
  check((await stepText()).includes('Step 2 of 5'), 'demo: Next advances');
  await demo.getByRole('button', { name: 'Back' }).click();
  check((await stepText()).includes('Step 1 of 5'), 'demo: Back returns');
  await demo.getByRole('button', { name: 'Play' }).click();
  await page.waitForTimeout(2600);
  const afterPlay = await stepText();
  check(!afterPlay.includes('Step 1 of'), 'demo: Play advances on its own (' + afterPlay.trim() + ')');
  await demo.getByRole('button', { name: 'Pause' }).click();
  const paused = await stepText();
  await page.waitForTimeout(2600);
  check((await stepText()) === paused, 'demo: Pause holds the step');
  await demo.getByRole('button', { name: 'Reset' }).click();
  check((await stepText()).includes('Step 1 of 5'), 'demo: Reset returns to step 1');
  const tabs = page.getByRole('tablist', { name: 'Workflow examples' }).getByRole('tab');
  check((await tabs.count()) === 3, 'demo: three selectable workflows');
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  check((await tabs.nth(1).getAttribute('aria-selected')) === 'true', 'demo: keyboard selects the next workflow');
  check((await demo.getByText('Illustrative', { exact: true }).count()) > 0, 'demo: labelled illustrative next to the title');
  const textAlt = await page.locator('details:has-text("Read the whole sequence as text") li').count();
  check(textAlt >= 5, `demo: the full sequence is also available as plain text (${textAlt} steps)`);
  await ctx.close();
}

/* --------------------------------------------------- reduced motion + demo */
{
  const { ctx, page } = await open(1440, 900, { reducedMotion: 'reduce' });
  const demo = page.locator('#flow-panel');
  check((await demo.getByRole('button', { name: /^Play/ }).count()) === 0, 'reduced motion: the demo offers no timed playback');
  check((await demo.getByRole('button', { name: 'Next' }).count()) === 1, 'reduced motion: step controls remain');
  const running = await page.evaluate(() =>
    [...document.querySelectorAll('.mv *')].filter((el) => getComputedStyle(el).animationName !== 'none' && getComputedStyle(el).animationDuration !== '0.001ms').length,
  );
  check(running === 0, `reduced motion: no illustration is animating (${running})`);
  await ctx.close();
}

/* -------------------------------------------- off-screen animation is paused */
{
  const { ctx, page } = await open(1440, 900);
  const state = await page.evaluate(() => {
    const el = document.querySelector('#svc-panel-software .mv *');
    return el ? getComputedStyle(el).animationPlayState : 'none';
  });
  check(state === 'paused', `illustrations are paused while off screen (${state})`);
  await page.locator('#svc-panel-software').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const live = await page.evaluate(() => {
    const el = document.querySelector('#svc-panel-software .mv *');
    return el ? getComputedStyle(el).animationPlayState : 'none';
  });
  check(live === 'running', `illustrations run once the panel is on screen (${live})`);
  await ctx.close();
}

/* ------------------------------------------------------------- the form */
{
  const { ctx, page } = await open(1440, 900);
  const form = page.locator('#enquiry form');
  await form.scrollIntoViewIfNeeded();
  const required = await form.locator('input[required], [aria-required="true"]').count();
  const labels = await form.locator('label').count();
  check(labels >= 4, `form: fields are labelled (${labels} labels)`);
  await form.getByRole('button', { name: /Send Enquiry/ }).click();
  await page.waitForTimeout(400);
  const alert = await form.getByRole('alert').first().textContent();
  check(/correct the following/i.test(alert ?? ''), 'form: an empty submit shows an error summary');
  check(/name/i.test(alert ?? '') && /email/i.test(alert ?? ''), 'form: the summary names the missing fields');

  const options = await form.locator('#service option').count();
  check(options >= 10, `form: the service choice is one dropdown with ${options} options, not a wall of chips`);
  check((await form.locator('button[aria-pressed]').count()) === 0, 'form: no row of toggle chips');

  await form.locator('#fullName').fill('QA Tester');
  await form.locator('#email').fill('not-an-email');
  await form.locator('#challenge').fill('This is a test message for the form only.');
  await form.locator('#consent').check();
  await form.getByRole('button', { name: /Send Enquiry/ }).click();
  await page.waitForTimeout(400);
  check(/valid email/i.test((await form.getByRole('alert').first().textContent()) ?? ''), 'form: an invalid email is rejected');

  await form.locator('#email').fill('qa@example.invalid');
  await form.locator('#service').selectOption('Odoo / ERP');
  const responses = [];
  page.on('response', (r) => r.url().includes('/api/contact') && responses.push(r.status()));
  await form.getByRole('button', { name: /Send Enquiry/ }).click();
  await page.getByRole('status').filter({ hasText: /message received/i }).waitFor({ timeout: 8000 }).catch(() => {});
  const done = await page.getByRole('status').filter({ hasText: /message received/i }).count();
  check(done === 1 && responses[0] === 200, `form: a valid submission succeeds (HTTP ${responses[0]})`);
  const msg = (await page.getByRole('status').filter({ hasText: /message received/i }).textContent()) ?? '';
  check(/by email/i.test(msg) && /business hours/i.test(msg) && /no automatic quote/i.test(msg), 'form: the confirmation says what happens next');
  await ctx.close();
}

/* ------------------------------------------------------------ the channels */
{
  const { ctx, page } = await open(1440, 900);
  const sect = page.locator('#enquiry');
  const wa = await sect.locator('a[href^="https://wa.me/"]').evaluateAll((as) => as.map((a) => decodeURIComponent(a.getAttribute('href') ?? '')));
  check(wa.length >= 2, `channels: WhatsApp links present (${wa.length})`);
  check(wa.every((h) => h.includes('wa.me/923347037531')), 'channels: WhatsApp links use the real number');
  check(wa.some((h) => /arrange a call/i.test(h)), 'channels: the call link carries a message asking for a call');
  const labels = await sect.locator('a').allTextContents();
  check(!labels.some((t) => /schedule|book a/i.test(t)), 'channels: nothing is labelled Schedule or Book while no booking system exists');
  check(labels.some((t) => /arrange a call on whatsapp/i.test(t)), 'channels: the call row says it is arranged on WhatsApp');
  check((await sect.locator('a[href^="mailto:"]').count()) >= 1 && (await sect.locator('a[href^="tel:"]').count()) >= 1, 'channels: email and phone links present');
  await ctx.close();
}

/* --------------------------------------------------------------- navigation */
{
  const { ctx, page } = await open(1440, 900);
  const nav = page.getByRole('navigation', { name: 'Primary' });
  for (const [label, cols, expect] of [
    ['Expertise', 4, ['Services', 'Solutions', 'Platforms', 'Industries']],
    ['Studio', 2, ['Company', 'Insights & tools']],
  ]) {
    await nav.getByRole('button', { name: label }).click();
    await page.waitForTimeout(250);
    const menu = page.locator(`[data-nav="${label}"] ~ div`).first();
    const headings = await menu.locator('p').allTextContents();
    check(expect.every((h) => headings.map((x) => x.trim()).includes(h)), `nav: ${label} menu groups ${expect.join(' / ')}`);
    const rect = await menu.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, vw: window.innerWidth };
    });
    check(rect.left >= 0 && rect.right <= rect.vw, `nav: ${label} menu stays inside the viewport (${Math.round(rect.left)}–${Math.round(rect.right)} of ${rect.vw})`);
    await page.keyboard.press('Escape');
    await page.mouse.move(10, 600);
    await page.waitForTimeout(400);
  }
  await ctx.close();
}
for (const w of [1024, 1280]) {
  const { ctx, page } = await open(w, 800);
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await nav.getByRole('button', { name: 'Expertise' }).click();
  await page.waitForTimeout(250);
  const rect = await page.locator('[data-nav="Expertise"] ~ div').first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, vw: window.innerWidth };
  });
  check(rect.left >= 0 && rect.right <= rect.vw, `nav: Expertise menu fits at ${w}px (${Math.round(rect.left)}–${Math.round(rect.right)})`);
  await ctx.close();
}

/* ---------------------------------------------------------------- mobile */
{
  const { ctx, page } = await open(390, 844);
  const primary = page.getByRole('link', { name: /Discuss Your Project/ }).first();
  const box = await primary.boundingBox();
  check(box && box.y + box.height <= 844, `mobile: primary action is on the first screen (bottom ${box && Math.round(box.y + box.height)}px of 844)`);
  check(box && box.height >= 44, `mobile: primary action is at least 44px tall (${box && Math.round(box.height)}px)`);
  const h1 = await page.locator('h1').boundingBox();
  check(h1 && h1.y + h1.height < 844, 'mobile: the headline is on the first screen');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflow <= 0, `mobile: no horizontal overflow (${overflow}px)`);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Expertise' }).last().click();
  await page.waitForTimeout(300);
  const links = await page.getByRole('dialog', { name: 'Main menu' }).locator('a[href^="/platforms"]').count();
  check(links >= 4, `mobile menu: Platforms links are reachable (${links})`);
  await ctx.close();
}

await browser.close();
console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
