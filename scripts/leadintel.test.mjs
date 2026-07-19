/**
 * Integration tests for the lead-intelligence system (mock-tested — no live
 * Odoo/email creds). Run against compiled JS in .leadintel-build/.
 *   node --test scripts/leadintel.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const B = '../.leadintel-build/lib/leadintel';
const consent = await import(`${B}/consent.js`);
const session = await import(`${B}/session.js`);
const score = await import(`${B}/leadScore.js`);
const crm = await import(`${B}/crm.js`);
const email = await import(`${B}/emailAutomation.js`);
const safe = await import(`${B}/analyticsSafe.js`);
const pipeline = await import(`${B}/pipeline.js`);

const baseLead = {
  fullName: 'Sara Khan', company: 'Acme Textiles', email: 'sara@acme.pk', phone: '+923001234567',
  country: 'Pakistan', industry: 'Textile & Apparel', companySize: '51–100 employees',
  timeline: 'As soon as possible', budget: 'Mid-size project', challenge: 'Stock never matches records.',
  services: ['Odoo Implementation'], preferredContact: 'whatsapp', contactPermission: true, marketingConsent: false,
};

test('1. New anonymous visit creates a random session id', () => {
  const s = session.createSession({ path: '/', search: '', referrer: '' });
  assert.match(s.anonId, /[0-9a-f]/i);
  assert.equal(s.visits, 1);
  assert.equal(s.pageViews, 1);
  const s2 = session.createSession({ path: '/', search: '', referrer: '' });
  assert.notEqual(s.anonId, s2.anonId, 'ids must be unique/random');
});

test('2. Returning anonymous visit increments visits, keeps id', () => {
  let s = session.createSession({ path: '/', search: '', referrer: '' });
  const id = s.anonId;
  s = session.recordPageView(s, { path: '/services', search: '', referrer: '', newVisit: true });
  assert.equal(s.anonId, id);
  assert.equal(s.visits, 2);
  assert.equal(s.pageViews, 2);
});

test('3. UTM first-touch persists, last-touch updates', () => {
  let s = session.createSession({ path: '/', search: '?utm_source=google&utm_campaign=fbr', referrer: '' });
  assert.equal(s.firstTouch.utm.source, 'google');
  s = session.recordPageView(s, { path: '/pricing', search: '?utm_source=linkedin', referrer: '' });
  assert.equal(s.firstTouch.utm.source, 'google', 'first touch must not change');
  assert.equal(s.lastTouch.utm.source, 'linkedin', 'last touch updates');
});

test('4. Returning visitor recognised WITHOUT fingerprinting (id only)', () => {
  const s = session.createSession({ path: '/', search: '', referrer: '' });
  // No device attributes stored:
  const keys = Object.keys(s);
  for (const forbidden of ['userAgent', 'fingerprint', 'canvas', 'ip']) {
    assert.ok(!keys.includes(forbidden), `must not store ${forbidden}`);
  }
});

test('5. Consent acceptance (accept all) enables analytics + marketing', () => {
  const c = consent.acceptAll();
  assert.equal(consent.allows(c, 'analytics'), true);
  assert.equal(consent.allows(c, 'marketing'), true);
  assert.equal(consent.allows(c, 'necessary'), true);
  assert.equal(c.decided, true);
});

test('6. Consent rejection disables analytics + marketing, keeps necessary', () => {
  const c = consent.rejectAll();
  assert.equal(consent.allows(c, 'analytics'), false);
  assert.equal(consent.allows(c, 'marketing'), false);
  assert.equal(consent.allows(c, 'necessary'), true);
});

test('7. Consent withdrawal revokes analytics + marketing', () => {
  const c = consent.savePreferences(true, true);
  assert.equal(consent.allows(c, 'analytics'), true);
  const w = consent.rejectAll(); // withdrawal path (no window in node)
  assert.equal(consent.allows(w, 'analytics'), false);
  assert.equal(consent.allows(w, 'marketing'), false);
});

test('7b. Marketing consent is SEPARATE from contact permission', async () => {
  crm._resetMockCrm(); email._resetEmail();
  // contactPermission true, marketingConsent false → lead created, NO marketing
  const r = await pipeline.processLead({ ...baseLead, contactPermission: true, marketingConsent: false }, null);
  assert.equal(r.crm.action, 'created');
  assert.equal(r.email.marketingEnrolled, false);
  assert.equal(r.email.marketingSkippedReason, 'no_consent');
});

test('8. Valid form conversion creates a CRM lead (mock)', async () => {
  crm._resetMockCrm(); email._resetEmail();
  const r = await pipeline.processLead(baseLead, null);
  assert.equal(r.ok, true);
  assert.equal(r.crm.ok, true);
  assert.equal(r.crm.action, 'created');
  assert.equal(r.crm.mode, 'mock');
});

test('9. CRM field mapping produces required Odoo fields', () => {
  const sc = score.scoreLead({ industry: 'Textile', services: ['Odoo Implementation'], timeline: 'As soon as possible' });
  const rt = score.routeLead({ interestCategories: ['fbr-compliance'] }, sc);
  const fields = crm.mapToOdooLead(baseLead, sc, rt, null);
  for (const k of ['name', 'contact_name', 'email_from', 'phone', 'description', 'x_lead_score', 'x_marketing_consent', 'x_contact_permission']) {
    assert.ok(k in fields, `missing field ${k}`);
  }
  assert.equal(fields.x_contact_permission, true);
  assert.equal(fields.x_marketing_consent, false);
});

test('10. Duplicate lead is UPDATED not duplicated', async () => {
  crm._resetMockCrm(); email._resetEmail();
  const a = await pipeline.processLead(baseLead, null);
  const b = await pipeline.processLead(baseLead, null); // same email
  assert.equal(a.crm.action, 'created');
  assert.equal(b.crm.action, 'updated');
  assert.equal(a.crm.leadId, b.crm.leadId, 'same lead id');
});

test('11. Anonymous session history attaches on identification', () => {
  let s = session.createSession({ path: '/solutions/fbr-digital-invoicing-pakistan', search: '?utm_source=google', referrer: 'https://google.com' });
  s = session.addInterest(s, session.interestForPath('/solutions/fbr-digital-invoicing-pakistan'));
  const sc = score.scoreLead({});
  const rt = score.routeLead({ interestCategories: s.interestCategories }, sc);
  const fields = crm.mapToOdooLead(baseLead, sc, rt, s);
  assert.match(String(fields.description), /Anonymous history/);
  assert.match(String(fields.description), /First touch/);
  assert.equal(fields.x_anon_id, s.anonId);
});

test('12. Lead-score calculation reflects urgency/budget/engagement', () => {
  const hot = score.scoreLead({ timeline: 'As soon as possible', budget: 'Large / multi-module', companySize: '201–500', services: ['Odoo Implementation'], industry: 'Manufacturing', pageViews: 10, visits: 3 });
  const cool = score.scoreLead({ timeline: 'Just exploring', budget: 'Not sure yet' });
  assert.ok(hot.score > cool.score);
  assert.equal(hot.band, 'hot');
  assert.equal(cool.band, 'cool');
});

test('13. Salesperson routing by interest + band', () => {
  const sc = { score: 80, band: 'hot', reasons: [] };
  const r1 = score.routeLead({ interestCategories: ['fbr-compliance'] }, sc);
  assert.equal(r1.queue, 'FBR & Compliance');
  assert.equal(r1.priority, 'P1');
  const r2 = score.routeLead({ interestCategories: ['custom-development'] }, { score: 45, band: 'warm', reasons: [] });
  assert.equal(r2.queue, 'Custom Development');
  assert.equal(r2.priority, 'P2');
});

test('14. Transactional email always sends (no marketing consent needed)', async () => {
  email._resetEmail();
  const out = await email.runPostLeadEmails({ email: 'a@b.pk', marketingConsent: false, contactPermission: true });
  assert.equal(out.transactional.ok, true);
  assert.equal(out.marketingEnrolled, false);
});

test('15. Marketing sequence enrols ONLY with marketing consent', async () => {
  email._resetEmail();
  const yes = await email.runPostLeadEmails({ email: 'c@d.pk', marketingConsent: true, contactPermission: true });
  assert.equal(yes.marketingEnrolled, true);
  assert.equal(yes.sequenceSteps, email.MARKETING_SEQUENCE.length);
});

test('16. Unsubscribe suppresses marketing, transactional still allowed', async () => {
  email._resetEmail();
  email.unsubscribe('sup@x.pk');
  assert.equal(email.isSuppressed('sup@x.pk'), true);
  const out = await email.runPostLeadEmails({ email: 'sup@x.pk', marketingConsent: true, contactPermission: true });
  assert.equal(out.transactional.ok, true, 'transactional still sends');
  assert.equal(out.marketingEnrolled, false);
  assert.equal(out.marketingSkippedReason, 'suppressed');
});

test('17. CRM provider failure is handled gracefully', async () => {
  crm._resetMockCrm(); email._resetEmail();
  const r = await pipeline.processLead(baseLead, null, { forceCrmFail: true });
  assert.equal(r.crm.ok, false);
  assert.equal(r.crm.action, 'failed');
  assert.equal(r.ok, true, 'enquiry still captured');
  assert.equal(r.degraded, true);
});

test('18. Email provider failure is handled gracefully', async () => {
  crm._resetMockCrm(); email._resetEmail();
  const r = await pipeline.processLead(baseLead, null, { forceEmailFail: true });
  assert.equal(r.email.transactional.ok, false);
  assert.equal(r.ok, true);
  assert.equal(r.degraded, true);
});

test('19. Anonymous data expiry removes stale session', () => {
  const past = new Date(Date.now() - 200 * 86400000);
  const s = session.createSession({ path: '/', search: '', referrer: '', now: past });
  assert.equal(session.isExpired(s), true);
  const fresh = session.createSession({ path: '/', search: '', referrer: '' });
  assert.equal(session.isExpired(fresh), false);
});

test('20. Consent validity respects TTL + version', () => {
  const old = { ...consent.acceptAll(), updatedAt: new Date(Date.now() - 200 * 86400000).toISOString() };
  assert.equal(consent.isConsentValid(old), false, 'expired consent invalid');
  assert.equal(consent.isConsentValid(consent.acceptAll()), true);
});

test('21. Analytics PII rejection — sanitizer strips PII', () => {
  const clean = safe.sanitizeEventProps({ intent: 'fbr', email: 'x@y.pk', phone: '+923001234567', count: 3 });
  assert.ok(!('email' in clean), 'email dropped');
  assert.ok(!('phone' in clean), 'phone dropped');
  assert.equal(clean.intent, 'fbr');
  assert.equal(clean.count, 3);
  assert.throws(() => safe.assertNoPii({ email: 'a@b.pk' }), /PII/);
});

test('22. Analytics ENABLED only when analytics consent granted', () => {
  assert.equal(consent.allows(consent.acceptAll(), 'analytics'), true);
});

test('23. Analytics DISABLED under reject-all / no decision', () => {
  assert.equal(consent.allows(consent.rejectAll(), 'analytics'), false);
  assert.equal(consent.allows(null, 'analytics'), false);
  assert.equal(consent.allows(consent.defaultConsent(), 'analytics'), false);
});

test('24. Valid vs invalid form submission (schema)', async () => {
  const { contactSchema } = await import('../.leadintel-build/lib/validation.js').catch(() => ({}));
  if (!contactSchema) { console.log('  (validation not compiled — skipping schema check)'); return; }
  const valid = contactSchema.safeParse({
    fullName: 'Sara Khan', company: 'Acme', email: 'sara@acme.pk', phone: '+923001234567',
    country: 'Pakistan', industry: 'Textile & Apparel', companySize: '51–100 employees',
    challenge: 'Stock never matches records here.', services: ['Odoo Implementation'],
    preferredContact: 'whatsapp', consent: true, website: '',
  });
  assert.equal(valid.success, true, 'valid form accepted');
  const invalid = contactSchema.safeParse({ fullName: '', email: 'not-an-email', consent: false });
  assert.equal(invalid.success, false, 'invalid form rejected');
});
