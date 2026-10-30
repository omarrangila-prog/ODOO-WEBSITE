/**
 * The AI Search enquiry form in a real browser: plan context, validation, loading, double-submit,
 * success only after acceptance, failure with a working alternative, analytics without personal data.
 *   node scripts/ai-search-form-check.mjs http://localhost:3720     (server started with ODV_DRY_RUN=1)
 * Requests to /api/ai-search are intercepted, so nothing reaches any mail provider.
 */
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:3720';
const consent = JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString(), decided: true });
let failed = 0;
const check = (c, m) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const b = await chromium.launch();

async function open(path, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
  await ctx.addInitScript((c) => {
    localStorage.setItem('odv_consent', c);
    window.__ev = [];
    window.plausible = (e, o) => window.__ev.push([e, o && o.props]);
  }, consent);
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  return { ctx, p, form: p.locator('#enquiry form') };
}
const fill = async (form, over = {}) => {
  await form.getByLabel('Your name').fill(over.name ?? 'QA Tester');
  await form.getByLabel('Work email').fill(over.email ?? 'qa@example.invalid');
  await form.getByLabel('Website', { exact: false }).first().fill(over.site ?? 'example.com');
  await form.getByLabel(/I agree that ODOOVATIONS/).check();
};

// Context from the URL and from the buttons
{
  const { ctx, p, form } = await open('/services/ai-search-pricing?plan=growth#enquiry');
  check(await form.getByRole('radio', { name: 'A monthly plan' }).isChecked(), '?plan=growth: the request type is "A monthly plan"');
  check(await form.getByRole('radio', { name: 'Growth' }).isChecked(), '?plan=growth: Growth is the selected plan');
  await p.getByRole('link', { name: 'Discuss Authority' }).click();
  await p.waitForTimeout(4000);
  check(await form.getByRole('radio', { name: 'Authority' }).isChecked(), 'a plan button selects that plan in the form');
  check(p.url().includes('plan=authority') && p.url().includes('#enquiry'), 'and updates the address without leaving the page');
  const inView = await form.evaluate((f) => { const r = f.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
  check(inView, 'and moves the form into view');
  await p.getByRole('link', { name: 'Ask about the audit' }).first().click();
  await p.waitForTimeout(300);
  check(await form.getByRole('radio', { name: /AI Search Audit/ }).isChecked(), 'the audit button selects the audit request type');
  const ev = await p.evaluate(() => window.__ev);
  check(ev.some(([e, pr]) => e === 'ai_plan_selected' && pr.plan === 'authority'), 'plan selection is tracked as an event with only the plan id');
  await ctx.close();
}
for (const [path, label] of [['/services/ai-search-audit', /AI Search Audit/], ['/services/ai-search-optimization', 'Free suitability review']]) {
  const { ctx, form } = await open(path);
  check(await form.getByRole('radio', { name: label }).isChecked(), `${path}: opens on ${typeof label === 'string' ? label : 'the audit request'}`);
  await ctx.close();
}

// Honest wording about charges, and nothing sensitive asked for
{
  const { ctx, p, form } = await open('/services/ai-search-optimization');
  const t = (await form.textContent()) ?? '';
  check(/Free suitability review/.test(t) && /USD 390/.test(t) && /Asking is free|No report, no charge/.test(t), 'the form separates the free review from the USD 390 audit');
  check(/free and commits you to nothing/i.test(t), 'the form says sending it is free and commits you to nothing');
  check((await p.locator('#enquiry input[type=password], #enquiry input[name*=card i], #enquiry input[autocomplete*=cc-]').count()) === 0, 'there is no password or card field');
  await ctx.close();
}

// Validation, loading, double submit, success
{
  const { ctx, p, form } = await open('/services/ai-search-optimization');
  let posts = 0;
  let release;
  const gate = new Promise((r) => (release = r));
  await p.route('**/api/ai-search', async (route) => {
    posts++;
    await gate;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await form.getByRole('button', { name: 'Send request' }).click();
  await p.waitForTimeout(300);
  const alert = (await form.getByRole('alert').first().textContent()) ?? '';
  check(/name/i.test(alert) && /email/i.test(alert) && /website/i.test(alert) && /privacy/i.test(alert), 'an empty send lists name, email, website and consent');
  check(posts === 0, 'and sends nothing');
  check(await form.getByRole('alert').first().evaluate((e) => document.activeElement === e), 'focus moves to the error summary');

  await fill(form, { site: 'http://localhost' });
  await form.getByRole('button', { name: 'Send request' }).click();
  check(/public website address/i.test((await form.getByRole('alert').first().textContent()) ?? ''), 'an internal website address is refused with a clear message');

  await form.getByLabel('Website', { exact: false }).first().fill('example.com');
  const btn = form.getByRole('button', { name: /Send request|Sending/ });
  // Three clicks in the same tick, before the page can disable the button: the form itself must not send three times.
  await form.evaluate((f) => { const b = f.querySelector('button[type=submit]'); b.click(); b.click(); b.click(); });
  await p.waitForTimeout(400);
  check(await form.getByRole('button', { name: /Sending/ }).isDisabled(), 'while sending, the button says so and is disabled');
  check((await p.getByRole('status').filter({ hasText: /Your request has been sent/ }).count()) === 0, 'success is not shown while the request is still in flight');
  release();
  await p.getByRole('status').filter({ hasText: /Your request has been sent/ }).waitFor({ timeout: 6000 });
  check(posts === 1, `three clicks produced one request (${posts})`);
  check(/Nothing has been charged/.test((await p.getByRole('status').textContent()) ?? ''), 'the success message says nothing has been charged');
  const ev = await p.evaluate(() => window.__ev);
  const done = ev.find(([e]) => e === 'ai_review_requested');
  check(done && !JSON.stringify(done).match(/qa@example|QA Tester|example\.com/), 'the success event carries no name, email or website');
  await ctx.close();
}

// A failure keeps the form and offers a way out
{
  const { ctx, p, form } = await open('/services/ai-search-pricing');
  let mode = 'fail';
  await p.route('**/api/ai-search', (route) =>
    mode === 'fail'
      ? route.fulfill({ status: 500, contentType: 'application/json', body: '{"ok":false,"error":"We could not send your request. Please try again, or email hello@odoovations.com or message us on WhatsApp."}' })
      : route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  );
  await fill(form, { name: 'Retry Person' });
  await form.getByRole('button', { name: 'Send request' }).click();
  await p.waitForTimeout(500);
  const err = form.getByRole('alert').filter({ hasText: /could not send/i });
  check((await err.count()) === 1, 'a server failure shows an error, not success');
  check((await p.getByRole('status').filter({ hasText: /has been sent/ }).count()) === 0, 'and no success message');
  check((await err.locator('a[href^="mailto:"]').count()) === 1, 'the error offers a working email link');
  check((await form.getByLabel('Your name').inputValue()) === 'Retry Person', 'what was typed is kept');
  check(await form.getByRole('button', { name: 'Send request' }).isEnabled(), 'the button is usable again');
  mode = 'ok';
  await form.getByRole('button', { name: 'Send request' }).click();
  await p.getByRole('status').filter({ hasText: /has been sent/ }).waitFor({ timeout: 5000 });
  check(true, 'a retry after the failure succeeds');
  await ctx.close();
}

// The form on the live (dry-run) endpoint, end to end
{
  const { ctx, p, form } = await open('/services/ai-search-pricing?plan=foundation#enquiry');
  await fill(form);
  const [res] = await Promise.all([p.waitForResponse((r) => r.url().includes('/api/ai-search')), form.getByRole('button', { name: 'Send request' }).click()]);
  check(res.status() === 200, `the real endpoint accepts a valid request in dry-run (HTTP ${res.status()})`);
  await ctx.close();
}

// Phone
{
  const { ctx, p } = await open('/services/ai-search-pricing', { viewport: { width: 390, height: 844 } });
  check((await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0, 'phone: no horizontal overflow on the pricing page');
  const small = await p.evaluate(() => [...document.querySelectorAll('#enquiry input:not([type=hidden]):not([type=checkbox]):not([type=radio]), #enquiry textarea, #enquiry button')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 44 && !e.closest('[aria-hidden]'); }).length);
  check(small === 0, `phone: every field and button in the form is at least 44px tall (${small} smaller)`);
  await ctx.close();
}

await b.close();
console.log(failed ? `\n${failed} failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
