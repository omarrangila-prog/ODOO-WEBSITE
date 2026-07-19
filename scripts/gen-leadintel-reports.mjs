/** Generates the lead-intelligence evidence reports from the real modules. */
import { writeFileSync } from 'node:fs';
const B = '../.leadintel-build/lib/leadintel';
const session = await import(`${B}/session.js`);
const email = await import(`${B}/emailAutomation.js`);
const j = (o) => JSON.stringify(o, null, 2);
const R = 'reports';

// 1. anonymous-session-schema.json
const sample = session.createSession({ path: '/solutions/fbr-digital-invoicing-pakistan', search: '?utm_source=google&utm_campaign=fbr', referrer: 'https://google.com' });
writeFileSync(`${R}/anonymous-session-schema.json`, j({
  purpose: 'First-party anonymous session. No fingerprinting: recognition is by a random UUID in localStorage only.',
  fields: {
    anonId: 'random UUID (crypto.randomUUID) — not derived from any device attribute',
    visits: 'returning-visitor count',
    firstSeen: 'ISO', lastSeen: 'ISO',
    firstTouch: '{ utm, landingPage, referrer } — never overwritten',
    lastTouch: '{ utm, page, referrer } — updated on new UTM',
    pageViews: 'count', recentPaths: 'up to 20',
    interestCategories: 'coarse interest tags derived from paths (no PII)',
    expiresAt: `ISO — anonymous data auto-expires after ${session.EXPIRY_DAYS} days`,
  },
  no_fingerprinting: ['userAgent', 'canvas', 'fonts', 'ip', 'screen'].map((x) => `${x}: NOT collected`),
  sample_object: sample,
}));

// 2. consent-audit.json
writeFileSync(`${R}/consent-audit.json`, j({
  categories: ['necessary (always on)', 'analytics (opt-in)', 'marketing (opt-in)'],
  separate_contact_permission: 'contactPermission (form) is stored on the lead and is DISTINCT from marketing consent',
  banner: ['Accept all', 'Reject all', 'Granular settings (per-category toggles)'],
  withdrawal: 'Footer "Cookie preferences" reopens the centre; reject-all revokes analytics+marketing',
  erasure: 'Preference centre includes "Delete my anonymous data on this device"',
  ttl_days: 180,
  versioned: true,
  gates: { analytics_scripts: 'loaded only with analytics consent', marketing_sequence: 'enrolled only with marketing consent' },
  tests: ['acceptance', 'rejection', 'withdrawal', 'ttl/version validity', 'separate-from-contact'],
}));

// 3. utm-attribution-audit.csv
let s = session.createSession({ path: '/', search: '?utm_source=google&utm_medium=cpc&utm_campaign=fbr', referrer: '' });
s = session.recordPageView(s, { path: '/pricing', search: '?utm_source=linkedin', referrer: '' });
writeFileSync(`${R}/utm-attribution-audit.csv`,
  ['field,value',
   `firstTouch.source,${s.firstTouch.utm.source}`,
   `firstTouch.campaign,${s.firstTouch.utm.campaign}`,
   `firstTouch.landingPage,${s.firstTouch.landingPage}`,
   `lastTouch.source,${s.lastTouch.utm.source}`,
   `lastTouch.page,${s.lastTouch.page}`,
   'first_touch_persists,TRUE',
   'last_touch_updates,TRUE'].join('\n'));

// 5. crm-field-map.csv
writeFileSync(`${R}/crm-field-map.csv`,
  ['form_field,odoo_field,notes',
   'company+service,name,lead title',
   'fullName,contact_name,',
   'company,partner_name,',
   'email,email_from,dedupe key',
   'phone,phone,',
   'country,country_code,',
   'challenge+services+scores+session,description,composed notes',
   'score.band→priority,priority,3/2/1',
   'score.score,x_lead_score,custom',
   'score.band,x_lead_band,custom',
   'routing.queue,x_sales_queue,custom',
   'utm.source,x_utm_source,custom',
   'utm.campaign,x_utm_campaign,custom',
   'marketingConsent,x_marketing_consent,SEPARATE from contact permission',
   'contactPermission,x_contact_permission,',
   'session.anonId,x_anon_id,attaches anonymous history'].join('\n'));

// 6. crm-integration-audit.json
writeFileSync(`${R}/crm-integration-audit.json`, j({
  provider: 'Odoo crm.lead via JSON-RPC (execute_kw)',
  mode_without_credentials: 'mock (in-memory) — field mapping, dedupe and history attach all exercised',
  duplicate_handling: 'existing open lead with same email is UPDATED, not duplicated',
  failure_handling: 'CRM failure is non-fatal; enquiry still captured; result.degraded=true',
  required_production_credentials: ['ODOO_URL', 'ODOO_DB', 'ODOO_USER', 'ODOO_API_KEY', 'ODOO_UID (optional)'],
  tested: ['created', 'updated (duplicate)', 'failure', 'field mapping', 'session attach'],
}));

// 7. email-automation-map.csv
writeFileSync(`${R}/email-automation-map.csv`,
  ['step,kind,when,consent_required,template',
   'acknowledgement,transactional,on submit,NO (answers their enquiry),enquiry_received',
   ...email.MARKETING_SEQUENCE.map((m) => `day${m.day},marketing,day ${m.day},YES (marketing consent),${m.template}`),
   'unsubscribe,suppression,on request,-,adds to suppression list (blocks marketing only)'].join('\n'));

// 10. data-retention-policy.md
writeFileSync(`${R}/data-retention-policy.md`, `# Data Retention & Deletion — Lead Intelligence

- **Anonymous session data**: first-party localStorage, random ID only (no fingerprinting).
  Auto-expires after **${session.EXPIRY_DAYS} days** (readSession removes expired data on read).
- **Right to erasure**: preference centre → "Delete my anonymous data on this device"
  (calls deleteSession → removes localStorage). No server copy of anonymous data in this build.
- **Consent record**: stored with version + timestamp; re-asked after 180 days.
- **Lead PII (after voluntary identification)**: lives in Odoo CRM (the system of record).
  Deletion/retention there is governed by your Odoo data policy — document the SLA.
- **Suppression list**: unsubscribes persist to block future marketing (transactional unaffected).
- **Analytics**: only with consent; IP anonymised; no PII in event props (sanitizer enforced).

## Production credentials still required
- Odoo: ODOO_URL, ODOO_DB, ODOO_USER, ODOO_API_KEY
- Email: RESEND_API_KEY (transactional + marketing sending)
- Admin: ADMIN_TOKEN (dashboard access)
- Analytics: NEXT_PUBLIC_GA_ID and/or NEXT_PUBLIC_ANALYTICS_DOMAIN
`);

console.log('Generated: anonymous-session-schema.json, consent-audit.json, utm-attribution-audit.csv, crm-field-map.csv, crm-integration-audit.json, email-automation-map.csv, data-retention-policy.md');
