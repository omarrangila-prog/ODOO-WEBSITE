/** Operates every catalogue demonstration in a real browser.  node scripts/demo-check.mjs [base] */
import { chromium } from 'playwright';
const B = process.argv[2] ?? 'http://localhost:3720';
const b = await chromium.launch(); const p = await b.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
let fail = 0; const ok = (c, m) => { if (!c) fail++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const go = async (path) => { await p.goto(B + path, { waitUntil: 'networkidle' }); };
const click = (name) => p.getByRole('button', { name, exact: true }).first().click();
const log = () => p.locator('#try').innerText();

await go('/demonstrations/flow-workshop');
await click('Order #1001'); await click('Webhook for #1001 resent'); await click('Order #1002 with no address');
let t = await log();
ok(t.includes('Duplicate of an earlier web order') && t.includes('Held for review: missing address'), 'F06 workflow: duplicate skipped, missing data held');
await p.getByLabel('Make the next delivery fail once').check(); await click('Order #1003');
ok((await log()).includes('Retry 2 of 3 succeeded'), 'F06 workflow: failure retried');

await go('/demonstrations/erp-sandbox');
await p.getByLabel('Quantity').fill('20'); await click('Create and deliver');
ok((await log()).includes('Rejected: only 10'), 'F07 ERP: overselling refused');
await p.getByLabel('Quantity').fill('3'); await click('Create and deliver'); await click('Record payment');
t = await log();
ok(t.includes('On hand') && t.includes('receivable + cash = net sales'), 'F07 ERP: stock moved and books reconcile');

await go('/demonstrations/commerce-studio');
await click('Create and deliver'); await click('Return and refund');
ok((await log()).includes('returned and refunded') && (await log()).includes('= net sales'), 'F12 store: refund restocks and still reconciles');

await go('/demonstrations/agent-desk');
await click('Run all 5 cases'); ok((await log()).includes('4 of 5 passed'), 'F05 agent: unsafe refund case fails first');
await click('Apply fix: route money actions to approval'); await click('Run all 5 cases');
ok((await log()).includes('5 of 5 passed'), 'F05 agent: passes after fix');

await go('/demonstrations/release-lab');
await click('Run all 4 cases'); ok((await log()).includes('3 of 4 passed'), 'F11 QA: defect reproduced');
await click('Apply fix: a coupon can only be applied once'); await click('Run all 4 cases'); ok((await log()).includes('4 of 4 passed'), 'F11 QA: retest passes');

await go('/demonstrations/brand-studio');
await click('Send for review');
await p.getByLabel('Acting as').selectOption('Client approver');
await click('Request a revision'); await p.getByLabel('Acting as').selectOption('Designer'); await click('Send for review');
await p.getByLabel('Acting as').selectOption('Client approver'); await click('Request a revision');
await p.getByLabel('Acting as').selectOption('Designer'); await click('Send for review');
await p.getByLabel('Acting as').selectOption('Client approver'); await click('Request a revision');
ok((await log()).includes('both revision rounds are used'), 'F03 social: third revision refused');
await p.getByLabel('Acting as').selectOption('Designer'); 
await go('/demonstrations/revenue-desk');
await click('Web form: ERP enquiry'); await click('WhatsApp: same buyer'); await click('Lead in an area with no owner');
t = await log(); ok(t.includes('Duplicate of an earlier lead') && t.includes('raised to the sales lead'), 'F09 CRM: duplicate merged, unowned lead escalated');

await go('/demonstrations/data-room');
await p.getByRole('button', { name: /Hyderabad/ }).click();
ok((await log()).includes('missing'), 'F17 data: missing value shown as missing');

await go('/demonstrations/operations-desk');
await click('Printer jam'); ok((await log()).includes('not in the covered asset list'), 'F20 IT: uncovered asset quoted, not absorbed');

await go('/demonstrations/interactive-lab');
await p.getByRole('button', { name: 'Tap to start' }).click(); await p.getByRole('button', { name: 'TAP NOW' }).waitFor({ timeout: 5000 }); await p.getByRole('button', { name: 'TAP NOW' }).click();
ok(/\d+ ms/.test(await log()), 'F22 game: playable, reaction time recorded');

await go('/demonstrations/industry-systems-lab');
await click('Next step'); await click('Next step');
ok((await log()).includes('Exception at'), 'F23 industry: exception blocks the workflow');
await click('Resolve exception'); await click('Next step'); ok(!(await log()).includes('Exception at'), 'F23 industry: continues after resolution');

for (const s of ['answer-atlas','campaign-bench','lifecycle-lab','enterprise-blueprint','product-workshop','seller-operations-lab','mobile-studio','design-system-lab','motion-studio','cloud-workshop','security-review-lab','customer-operations-lab']) {
  await go('/demonstrations/' + s);
  const n = await p.locator('#try button').count();
  ok(n > 0, `${s}: demo renders with controls (${n})`);
}
ok(errs.length === 0, 'no page or console errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
await b.close();
console.log(fail ? `${fail} failed` : 'All demo checks passed.');
process.exit(fail ? 1 : 0);
