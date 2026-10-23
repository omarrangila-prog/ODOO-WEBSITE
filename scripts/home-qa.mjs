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

/* ------------------------------------------------ featured work + demonstrations */
{
  const { ctx, page } = await open(1440, 900);
  const tabs = page.getByRole('tablist', { name: 'Featured projects' }).getByRole('tab');
  check((await tabs.count()) === 3, 'work: three featured projects');
  check((await page.locator('[id^="work-panel-"]').count()) === 3, 'work: every project panel is in the document');
  const names = await tabs.allTextContents();
  check(['KCCI Election System', 'WhatsApp Digital Connection', 'Scrabble Tournament Timer'].every((n) => names.includes(n)), 'work: the three projects are named');
  check((await page.locator('#work-panel-kcci-election a[href="/projects/kcci-election"]').count()) === 1, 'work: the project links to its project page');

  // Election demonstration
  const el = page.locator('[data-demo=election]').first();
  await el.scrollIntoViewIfNeeded();
  await el.getByRole('tablist', { name: 'Election steps' }).waitFor({ timeout: 8000 });
  check((await el.getByText(/Demonstration · sample data/).count()) === 1, 'election: labelled as a demonstration with sample data');
  check((await el.getByText(/not a screenshot of the client/i).count()) === 1, 'election: says it is not a screenshot of the client system');
  await el.getByRole('button', { name: 'A-106' }).click();
  check(/not eligible/i.test((await el.locator('[aria-live=polite]').first().textContent()) ?? ''), 'election: an ineligible member is refused');
  await el.getByRole('button', { name: 'Z-999' }).click();
  check(/not on the register/i.test((await el.locator('[aria-live=polite]').first().textContent()) ?? ''), 'election: an unknown member is refused');
  await el.getByRole('tab', { name: 'Polling day' }).click();
  await el.locator('#el-poll-member').fill('A-101');
  await el.getByRole('button', { name: 'Issue ballot' }).click();
  await el.getByText('Candidate 2').click();
  await el.getByRole('button', { name: 'Cast vote' }).click();
  await el.locator('#el-poll-member').fill('A-101');
  await el.getByRole('button', { name: 'Issue ballot' }).click();
  check(/already voted/i.test((await el.locator('[aria-live=polite]').first().textContent()) ?? ''), 'election: the same member cannot vote twice');
  const log = (await el.locator('ol').first().textContent()) ?? '';
  check(/marked as voted/.test(log) && !/Candidate 2/.test(log), 'election: the audit log records that a member voted, never who for');
  await el.getByRole('tab', { name: 'Results' }).click();
  check(/1\s*of 7 eligible/.test((await el.textContent()) ?? ''), 'election: results show the turnout');
  await el.locator('#el-role').selectOption('observer');
  check(await el.getByRole('tab', { name: /Polling day/ }).isDisabled(), 'election: an observer cannot open polling day');
  await el.getByRole('button', { name: 'Reset' }).click();
  await el.getByRole('tab', { name: 'Results' }).click();
  check(/0\s*of 7 eligible/.test((await el.textContent()) ?? ''), 'election: reset clears the votes');

  // Delivery demonstration
  await tabs.nth(1).click();
  const dl = page.locator('[data-demo=delivery]').first();
  await dl.scrollIntoViewIfNeeded();
  await dl.getByRole('button', { name: /Send to customer/ }).waitFor({ timeout: 8000 });
  await dl.getByRole('button', { name: /Send to customer/ }).click();
  await page.waitForTimeout(3300);
  check((await dl.getByText('Delivered', { exact: true }).count()) >= 1, 'delivery: a job moves through the stages to Delivered');
  check((await dl.getByText('Invoice SAMPLE-0001.pdf').count()) === 1, 'delivery: the document appears on the sample phone');
  check((await dl.getByText(/Nothing is sent/).count()) === 1, 'delivery: says nothing is actually sent');

  // Timer demonstration
  await tabs.nth(2).click();
  const tm = page.locator('[data-demo=timer]').first();
  await tm.scrollIntoViewIfNeeded();
  await tm.getByRole('button', { name: 'Start', exact: true }).waitFor({ timeout: 8000 });
  await tm.getByRole('button', { name: 'Start', exact: true }).click();
  await page.waitForTimeout(2300);
  const clock = async () => (await tm.locator('[aria-hidden=true].tabular-nums').first().textContent())?.trim();
  const t1 = await clock();
  check(t1 !== '25:00', `timer: the clock counts down (${t1})`);
  await tm.getByRole('button', { name: 'Pause', exact: true }).click();
  const frozen = await clock();
  await page.waitForTimeout(1800);
  check((await clock()) === frozen, 'timer: pause holds the clock');
  await tm.getByRole('button', { name: /Player 1 won/ }).first().click();
  const first = (await tm.locator('tbody tr').first().textContent()) ?? '';
  check(/Player 1/.test(first) && /1$/.test(first.trim()), 'timer: entering a result puts the winner top of the leaderboard');
  await ctx.close();
}

/* ------------------------------------------------- mobile: demo opens on request */
{
  const { ctx, page } = await open(390, 844);
  const election = page.locator('[data-demo=election]').first();
  check(!(await election.isVisible()), 'mobile work: the demonstration is closed until asked for');
  await page.getByRole('button', { name: 'Open the working demonstration' }).first().scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Open the working demonstration' }).first().click();
  await election.getByRole('tablist', { name: 'Election steps' }).waitFor({ timeout: 8000 });
  check(await election.isVisible(), 'mobile work: the demonstration opens on request');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflow <= 0, `mobile work: no horizontal overflow with the demonstration open (${overflow}px)`);
  await ctx.close();
}

/* ------------------------------------------------------------- reduced motion */
{
  const { ctx, page } = await open(1440, 900, { reducedMotion: 'reduce' });
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

  const paths = await form.getByRole('group', { name: 'What is this about?' }).getByRole('radio').count();
  check(paths === 8, `form: the enquiry opens with ${paths} service paths`);
  await form.getByRole('radio', { name: 'QuickBooks integration' }).check({ force: true });
  const qb = form.locator('[data-path-panel=quickbooks]');
  check((await qb.getByText('Which QuickBooks do you use?').count()) === 1, 'form: QuickBooks asks which QuickBooks product');
  check(/bookkeeping/i.test((await qb.textContent()) ?? '') && /tax/i.test((await qb.textContent()) ?? ''), 'form: the QuickBooks path says it is not bookkeeping or tax');
  check(/do not imply partnership/i.test((await qb.textContent()) ?? ''), 'form: platform paths carry the no-partnership notice');
  await form.getByRole('radio', { name: 'Shopify' }).check({ force: true });
  check((await form.locator('[data-path-panel=shopify]').getByText('What should it connect to?').count()) === 1, 'form: Shopify asks what it should connect to');

  await form.locator('#fullName').fill('QA Tester');
  await form.locator('#email').fill('not-an-email');
  await form.locator('#challenge').fill('This is a test message for the form only.');
  await form.locator('#consent').check();
  await form.getByRole('button', { name: /Send Enquiry/ }).click();
  await page.waitForTimeout(400);
  check(/valid email/i.test((await form.getByRole('alert').first().textContent()) ?? ''), 'form: an invalid email is rejected');

  await form.locator('#email').fill('qa@example.invalid');
  await form.getByRole('radio', { name: 'QuickBooks integration' }).check({ force: true });
  await form.locator('[data-path-panel=quickbooks]').getByText('QuickBooks Online').click();
  const responses = [];
  let posted = '';
  page.on('response', (r) => r.url().includes('/api/contact') && responses.push(r.status()));
  page.on('request', (r) => r.url().includes('/api/contact') && (posted = r.postData() ?? ''));
  await form.getByRole('button', { name: /Send Enquiry/ }).click();
  await page.getByRole('status').filter({ hasText: /message received/i }).waitFor({ timeout: 8000 }).catch(() => {});
  const done = await page.getByRole('status').filter({ hasText: /message received/i }).count();
  check(done === 1 && responses[0] === 200, `form: a valid submission succeeds (HTTP ${responses[0]})`);
  const msg = (await page.getByRole('status').filter({ hasText: /message received/i }).textContent()) ?? '';
  check(/by email/i.test(msg) && /business hours/i.test(msg) && /no automatic quote/i.test(msg), 'form: the confirmation says what happens next');
  check(/name="pathId"\r\n\r\nquickbooks/.test(posted) && /QuickBooks Online/.test(posted), 'form: the chosen path and its answers are sent with the enquiry');
  check(/name="services"\r\n\r\nQuickBooks Integration/.test(posted), 'form: the enquiry is filed under QuickBooks Integration');
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
  check(labels.some((t) => /arrange a call/i.test(t) && /asked on whatsapp/i.test(t)), 'channels: the call row says it is arranged on WhatsApp');
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
