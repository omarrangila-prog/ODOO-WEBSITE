/**
 * The AI Search enquiry endpoint with the email provider stubbed, so nothing is ever sent.
 *   npx tsx scripts/ai-search-route-test.ts
 */
process.env.RESEND_API_KEY = 'test_key_not_real';
process.env.CONTACT_TO_EMAIL = 'qa-inbox@example.invalid';
process.env.CONTACT_FROM_EMAIL = 'qa-from@example.invalid';
(process.env as Record<string, string>).NODE_ENV = 'production';
delete process.env.ODV_DRY_RUN;

import { POST } from '../app/api/ai-search/route';
import { normalizeWebsite } from '../lib/ai-search/website';

let failed = 0;
const check = (c: unknown, m: string) => {
  if (!c) failed++;
  console.log((c ? 'ok    ' : 'FAIL  ') + m);
};

interface Call { url: string; body: Record<string, unknown> }
let calls: Call[] = [];
let providerStatus = 200;
globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
  calls.push({ url: String(url), body: JSON.parse(String(init?.body ?? '{}')) });
  return new Response('{}', { status: providerStatus });
}) as typeof fetch;
const sent = () => calls.filter((c) => String(c.body.to) === 'qa-inbox@example.invalid');

let n = 0;
const form = (extra: Record<string, string> = {}, omit: string[] = []) => {
  const fd = new FormData();
  const base: Record<string, string> = {
    fullName: 'QA Tester',
    email: `qa${++n}@example.invalid`,
    website: 'example.com',
    requestType: 'free-review',
    consent: 'true',
    token: `tok${String(n).padStart(8, '0')}abcdef`,
    nickname: '',
  };
  for (const [k, v] of Object.entries(base)) if (!omit.includes(k)) fd.set(k, v);
  for (const [k, v] of Object.entries(extra)) fd.set(k, v);
  return fd;
};
let ipn = 0;
const send = (fd: FormData, ip = `10.2.${Math.floor(++ipn / 250)}.${(ipn % 250) + 1}`) =>
  POST(new Request('http://localhost/api/ai-search', { method: 'POST', body: fd, headers: { 'x-forwarded-for': ip } }));

async function main() {
  // Website validation, on its own.
  const okSites: [string, string][] = [
    ['example.com', 'https://example.com'],
    ['  EXAMPLE.com  ', 'https://example.com'],
    ['https://sub.example.co.uk/about', 'https://sub.example.co.uk/about'],
    ['http://example.com/', 'http://example.com'],
    ['example.com:8080/x', 'https://example.com:8080/x'],
  ];
  for (const [i, o] of okSites) {
    const r = normalizeWebsite(i);
    check(r.ok && r.url === o, `website accepted: "${i.trim()}" becomes ${o}`);
  }
  const badSites = ['', 'javascript:alert(1)', 'data:text/html,hi', 'file:///etc/passwd', 'ftp://example.com', 'http://localhost', 'http://localhost:3000', 'http://127.0.0.1', 'http://192.168.1.10', 'http://[::1]', 'http://intranet', 'http://printer.local', 'http://user:pass@example.com', 'not a site', 'x'.repeat(250) + '.com', 'http://metadata.internal'];
  for (const b of badSites) check(!normalizeWebsite(b).ok, `website refused: "${b.slice(0, 40)}"`);

  // A valid free review.
  {
    calls = [];
    const r = await send(form({ company: 'Example Co', market: 'Pakistan, English and Urdu', problem: 'ChatGPT does not mention us.' }));
    const j = (await r.json()) as { ok: boolean };
    check(r.status === 200 && j.ok, 'valid free review: HTTP 200 ok');
    const m = sent()[0];
    check(!!m, 'valid free review: a notification goes to the configured inbox');
    const body = String(m?.body.text);
    check(String(m?.body.subject).includes('Free suitability review'), 'the subject names the request type');
    check(body.includes('Website: https://example.com'), 'the website is stored in its normalised form');
    check(body.includes('Nothing has been charged'), 'the email says nothing has been charged');
    check(!body.includes('Plan of interest'), 'a free review carries no plan line');
    check(m?.body.reply_to !== undefined, 'reply-to is the visitor');
  }

  // A plan enquiry carries its plan and type.
  {
    calls = [];
    const r = await send(form({ requestType: 'plan', plan: 'growth', competitors: 'a.com, b.com' }));
    check(r.status === 200, 'plan enquiry: HTTP 200');
    const body = String(sent()[0]?.body.text);
    check(body.includes('Plan of interest: Growth') && body.includes('A monthly plan') && body.includes('Competitors named: a.com, b.com'), 'the selected plan, request type and competitors reach the team');
    check(String(sent()[0]?.body.subject).includes('Growth'), 'the subject carries the plan');
  }
  // Every accepted enquiry carries a reference and, when it is a clean path, the page it was sent from.
  {
    calls = [];
    await send(form({ requestType: 'plan', plan: 'growth', landingPage: '/services/ai-search-pricing' }));
    const m = sent()[0];
    check(/^\[ODV-\d{8}-[A-Z0-9]{5}\] /.test(String(m?.body.subject)), 'the subject starts with an enquiry reference');
    check(String(m?.body.text).includes('Sent from: /services/ai-search-pricing'), 'the sending page reaches the team');
    calls = [];
    await send(form({ requestType: 'plan', plan: 'growth', landingPage: 'https://evil.example/x?y=1' }));
    check(!String(sent()[0]?.body.text).includes('evil.example') && !String(sent()[0]?.body.text).includes('Sent from'), 'a landing page that is not a clean site path is dropped');
  }
  {
    calls = [];
    await send(form({ requestType: 'audit' }));
    check(String(sent()[0]?.body.subject).includes('USD 390') && String(sent()[0]?.body.text).includes('invoiced') === false, 'an audit enquiry names the audit price but says nothing was invoiced');
  }

  // Validation.
  {
    calls = [];
    for (const [omit, label] of [[['fullName'], 'name'], [['email'], 'email'], [['website'], 'website'], [['requestType'], 'request type'], [['consent'], 'consent'], [['token'], 'token']] as [string[], string][]) {
      const r = await send(form({}, omit));
      check(r.status === 400, `missing ${label}: 400`);
    }
    check((await send(form({ email: 'nope' }))).status === 400, 'invalid email: 400');
    check((await send(form({ requestType: 'free' }))).status === 400, 'unknown request type: 400');
    check((await send(form({ website: 'http://localhost' }))).status === 400, 'an internal website address: 400');
    check((await send(form({ plan: 'platinum' }))).status === 400, 'an unknown plan: 400');
    check((await send(form({ problem: 'x'.repeat(2001) }))).status === 400, 'an over-long description: 400');
    check(sent().length === 0, 'none of the rejected requests sent anything');
  }

  // Nothing is read that was not asked for.
  {
    calls = [];
    await send(form({ password: 'hunter2', cardNumber: '4242424242424242', cvv: '123' }));
    const body = String(sent()[0]?.body.text);
    check(!/hunter2|4242|cvv/i.test(body), 'password and card fields, if sent, are ignored and never forwarded');
  }

  // Spam and repeats.
  {
    calls = [];
    const r = await send(form({ nickname: 'http://spam.example' }));
    check(r.status === 200 && calls.length === 0, 'honeypot: looks accepted, sends nothing');
  }
  {
    calls = [];
    const fd = form();
    const a = await send(fd);
    const b = await send(fd, '10.77.0.2');
    const jb = (await b.json()) as { ok: boolean; duplicate?: boolean };
    check(a.status === 200 && b.status === 200 && jb.duplicate === true, 'the same token sent twice is acknowledged the second time');
    check(sent().length === 1, 'the same token sent twice produces one email');
  }
  {
    let last = 0;
    for (let i = 0; i < 7; i++) last = (await send(form(), '10.9.9.9')).status;
    check(last === 429, 'rate limit: the sixth request from one address is refused (429)');
  }

  // Failure is reported as failure, and the same form can be retried.
  {
    calls = [];
    providerStatus = 500;
    const fd = form();
    const r = await send(fd, '10.0.0.2');
    const j = (await r.json()) as { ok: boolean; error?: string };
    check(r.status === 500 && j.ok === false && /email/i.test(j.error ?? ''), 'provider failure: HTTP 500 with a message that offers email, never a false success');
    providerStatus = 200;
    calls = [];
    const again = await send(fd, '10.0.0.3');
    check(again.status === 200 && sent().length === 1, 'after a failure the same form can be sent again, and sends once');
  }
  {
    const key = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    check((await send(form(), '10.0.0.4')).status === 500, 'no email key in production: HTTP 500, not a silent success');
    process.env.ODV_DRY_RUN = '1';
    check((await send(form(), '10.0.0.5')).status === 200, 'ODV_DRY_RUN=1: validates and succeeds without sending');
    delete process.env.ODV_DRY_RUN;
    process.env.RESEND_API_KEY = key;
  }

  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
  process.exit(failed ? 1 : 0);
}
main();
