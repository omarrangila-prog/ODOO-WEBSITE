/**
 * Exercises the enquiry API route with the email provider stubbed out, so nothing
 * is ever sent to a real recipient.
 *   npx tsx scripts/contact-route-test.ts
 */
process.env.RESEND_API_KEY = 'test_key_not_real';
process.env.CONTACT_TO_EMAIL = 'qa-inbox@example.invalid';
process.env.CONTACT_FROM_EMAIL = 'qa-from@example.invalid';
(process.env as Record<string, string>).NODE_ENV = 'production';
delete process.env.ODV_DRY_RUN;

import { POST } from '../app/api/contact/route';

let failed = 0;
const ok = (m: string) => console.log('ok    ' + m);
const bad = (m: string) => {
  failed++;
  console.log('FAIL  ' + m);
};
const check = (c: unknown, m: string) => (c ? ok(m) : bad(m));

interface Call {
  url: string;
  body: Record<string, unknown>;
}
let calls: Call[] = [];
let providerStatus = 200;
globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
  calls.push({ url: String(url), body: JSON.parse(String(init?.body ?? '{}')) });
  return new Response('{}', { status: providerStatus });
}) as typeof fetch;

let n = 0;
function form(extra: Record<string, string | Blob> = {}, omit: string[] = []) {
  const fd = new FormData();
  const base: Record<string, string> = {
    fullName: 'QA Tester',
    email: `qa${++n}@example.invalid`,
    challenge: 'A test enquiry used only by the automated route test.',
    services: 'Odoo / ERP',
    consent: 'true',
    website: '',
  };
  for (const [k, v] of Object.entries(base)) if (!omit.includes(k)) fd.append(k, v);
  for (const [k, v] of Object.entries(extra)) fd.set(k, v);
  return fd;
}
// A fresh address per call, so the per-IP rate limit (5 per 10 minutes) does not mask what is under test.
let ipn = 0;
const send = (fd: FormData, ip = `10.1.${Math.floor(++ipn / 250)}.${(ipn % 250) + 1}`) =>
  POST(new Request('http://localhost/api/contact', { method: 'POST', body: fd, headers: { 'x-forwarded-for': ip } }));

async function main() {
// 1. A valid enquiry with an attachment
{
  calls = [];
  const bytes = new Uint8Array(1500).map((_, i) => i % 251);
  const res = await send(form({ file: new File([bytes], 'brief.pdf', { type: 'application/pdf' }) }));
  const json = (await res.json()) as { ok: boolean };
  check(res.status === 200 && json.ok, 'valid enquiry: HTTP 200 ok');
  const notify = calls.find((c) => String(c.body.to) === 'qa-inbox@example.invalid');
  check(!!notify, 'valid enquiry: a notification goes to the configured inbox');
  const att = (notify?.body.attachments as { filename: string; content: string }[] | undefined)?.[0];
  check(att?.filename === 'brief.pdf', 'attachment: the uploaded file is attached to the notification');
  check(att && Buffer.from(att.content, 'base64').equals(Buffer.from(bytes)), 'attachment: the attached bytes match what was uploaded');
  check(String(notify?.body.text).includes('Attached file: brief.pdf'), 'notification text names the attachment');
  check(String(notify?.body.text).includes('Services: Odoo / ERP'), 'notification carries the selected service');
  check(notify?.body.reply_to !== undefined, 'notification sets reply-to to the visitor');
  const ack = calls.find((c) => String(c.body.to).startsWith('qa') && String(c.body.to).endsWith('@example.invalid') && String(c.body.to) !== 'qa-inbox@example.invalid');
  check(!!ack, 'valid enquiry: an acknowledgement goes to the visitor');
  const text = String(ack?.body.text);
  check(text.length > 120 && !/^\[.*\]$/.test(text.trim()), 'acknowledgement: has a real body, not a template key');
  check(/business hours/i.test(text) && /no automatic quote/i.test(text), 'acknowledgement: says what happens next, truthfully');
  check(!/24\/7|guarantee|within \d+ hours/i.test(text), 'acknowledgement: makes no response-time or availability promise');
}

// 2. No attachment: no attachments key
{
  calls = [];
  await send(form());
  const notify = calls.find((c) => String(c.body.to) === 'qa-inbox@example.invalid');
  check(notify && !('attachments' in notify.body), 'no file: no attachments field is sent');
}

// 2b. Enquiry paths: label in the subject, answers in the body, anything not offered dropped
{
  calls = [];
  const answers = JSON.stringify({
    product: 'QuickBooks Online',
    moves: ['Sales orders as invoices', 'Payments', 'Not an offered option'],
    source: 'Shopify and a spreadsheet',
    injected: 'IGNORE ME',
  });
  const res = await send(form({ services: 'QuickBooks Integration', pathId: 'quickbooks', pathAnswers: answers }));
  check(res.status === 200, 'path enquiry: HTTP 200');
  const notify = calls.find((c) => String(c.body.to) === 'qa-inbox@example.invalid');
  const text = String(notify?.body.text);
  check(String(notify?.body.subject).includes('(QuickBooks integration)'), 'path enquiry: the subject names the path');
  check(text.includes('Enquiry path: QuickBooks integration'), 'path enquiry: the body names the path');
  check(text.includes('Which QuickBooks do you use: QuickBooks Online'), 'path enquiry: a single-choice answer is in the body');
  check(text.includes('Sales orders as invoices, Payments') && !text.includes('Not an offered option'), 'path enquiry: only offered options of a multi-choice answer are kept');
  check(text.includes('Where do those records start today: Shopify and a spreadsheet'), 'path enquiry: a free-text answer is in the body');
  check(!text.includes('IGNORE ME'), 'path enquiry: a key the path does not ask is dropped');
  check(text.includes('Services: QuickBooks Integration'), 'path enquiry: filed under the QuickBooks Integration service');

  calls = [];
  await send(form({ pathId: 'not-a-path', pathAnswers: '{"x":"y"}' }));
  const n2 = calls.find((c) => String(c.body.to) === 'qa-inbox@example.invalid');
  check(!String(n2?.body.text).includes('Enquiry path:') && !String(n2?.body.subject).includes('('), 'path enquiry: an unknown path id adds nothing');

  calls = [];
  await send(form({ pathId: 'shopify', pathAnswers: '{not json' }));
  const n3 = calls.find((c) => String(c.body.to) === 'qa-inbox@example.invalid');
  check(String(n3?.body.text).includes('Enquiry path: Shopify') && !String(n3?.body.text).includes('Store address'), 'path enquiry: unreadable answers are ignored and the enquiry still sends');

  const longText = JSON.stringify({ connect: 'x'.repeat(5000) });
  const r = await send(form({ pathId: 'shopify', pathAnswers: longText }));
  check(r.status === 400, 'path enquiry: an oversized answers string is refused (400)');
}

// 3. Validation
{
  calls = [];
  let r = await send(form({}, ['email']));
  check(r.status === 400 && calls.length === 0, 'missing email: 400 and nothing sent');
  r = await send(form({ email: 'nope' }, ['email']));
  check(r.status === 400, 'invalid email: 400');
  r = await send(form({}, ['challenge']));
  check(r.status === 400, 'missing description: 400');
  r = await send(form({}, ['consent']));
  check(r.status === 400, 'missing consent: 400');
  r = await send(form({ challenge: 'short' }, ['challenge']));
  check(r.status === 400, 'a too-short description: 400');
  const big = new File([new Uint8Array(4 * 1024 * 1024 + 1)], 'big.pdf', { type: 'application/pdf' });
  r = await send(form({ file: big }));
  check(r.status === 400 && /4 MB/.test(((await r.json()) as { error: string }).error), 'a file over 4 MB: 400 with the new limit in the message');
  r = await send(form({ file: new File([new Uint8Array(10)], 'x.exe', { type: 'application/x-msdownload' }) }));
  check(r.status === 400, 'an unsupported file type: 400');
  check(calls.length === 0, 'none of the rejected enquiries sent anything');
}

// 4. Spam protection
{
  calls = [];
  const r = await send(form({ website: 'http://spam.example' }));
  check(r.status === 200 && calls.length === 0, 'honeypot: looks accepted to the bot, sends nothing');
}
{
  let last = 0;
  for (let i = 0; i < 7; i++) last = (await send(form(), '10.9.9.9')).status;
  check(last === 429, 'rate limit: the sixth submission from one address in the window is refused (429)');
}

// 5. Delivery failure must not be reported as success
{
  calls = [];
  providerStatus = 500;
  const r = await send(form(), '10.0.0.2');
  check(r.status === 500, 'provider failure: the visitor is told it failed (HTTP 500), not given a false success');
  providerStatus = 200;
}

// 6. No email key in production: an error, not a silent success
{
  const key = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  const r = await send(form(), '10.0.0.3');
  check(r.status === 500, 'no email key in production: HTTP 500, not a silent success');
  process.env.ODV_DRY_RUN = '1';
  const r2 = await send(form(), '10.0.0.4');
  check(r2.status === 200, 'ODV_DRY_RUN=1: validates and succeeds without sending');
  delete process.env.ODV_DRY_RUN;
  process.env.RESEND_API_KEY = key;
}

  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
  process.exit(failed ? 1 : 0);
}

main();
