'use client';

import { useEffect, useRef, useState } from 'react';
import { QueueDemo, LedgerDemo, EvalDemo, FlowDemo, TraceDemo, Panel, type QueueConfig, type LedgerConfig, type EvalConfig, type FlowConfig, type TraceConfig } from './engines';

/**
 * One working demonstration per service family. All data is invented. Where a family's real work involves
 * an AI model, ad platform, cloud or marketplace, the demo shows the method with a deterministic stand-in
 * and says so; it never claims a live result.
 */

type Spec =
  | { kind: 'queue'; note: string; cfg: QueueConfig }
  | { kind: 'ledger'; note: string; cfg: LedgerConfig }
  | { kind: 'eval'; note: string; cfg: EvalConfig }
  | { kind: 'flow'; note: string; cfg: FlowConfig }
  | { kind: 'trace'; note: string; cfg: TraceConfig }
  | { kind: 'game'; note: string }
  | { kind: 'industry'; note: string };

const SPECS: Record<string, Spec> = {
  F01: { kind: 'trace', note: 'An evidence ledger: each figure is a count of dated observations you can open. These observations are invented to show the format; no AI platform was queried.', cfg: {
    metric: 'Answers naming the brand (sample)', groupBy: 'search experience', rows: [
      { id: 'Q01 “Odoo partner Karachi” · 2 Nov', group: 'Experience A', value: 1, source: 'Saved answer #A-014', date: '2 Nov' },
      { id: 'Q02 “ERP cost Pakistan” · 2 Nov', group: 'Experience A', value: 0, source: 'Saved answer #A-015', date: '2 Nov' },
      { id: 'Q01 · 2 Nov', group: 'Experience B', value: 1, source: 'Saved answer #B-007', date: '2 Nov' },
      { id: 'Q02 · 2 Nov', group: 'Experience B', value: null, source: 'Run failed (timeout), kept apart', date: '2 Nov' },
      { id: 'Q01 · 2 Nov', group: 'Experience C', value: null, source: 'Not observed this cycle', date: '—' },
    ] } },
  F02: { kind: 'queue', note: 'A test enquiry passes through the funnel; the conversion event fires once, only after the form is accepted, and carries no personal data.', cfg: {
    entity: 'test enquiry', dedupeKey: 'formToken', required: ['email'], steps: ['Landing page view recorded', 'Form accepted by the server', 'enquiry_submit event sent (service, plan only)'],
    cases: [
      { id: 'a', label: 'Enquiry from search ad', record: { formToken: 't1', email: 'a@example.test', source: 'google / cpc' } },
      { id: 'b', label: 'Same form submitted twice', record: { formToken: 't1', email: 'a@example.test', source: 'google / cpc' } },
      { id: 'c', label: 'Enquiry with no email', record: { formToken: 't3', email: '', source: 'meta / paid' } },
    ],
    decide: (r) => ({ result: 'done', owner: 'Sales', note: `conversion counted once for source ${r.source}` }) } },
  F03: { kind: 'flow', note: 'One asset through review: two consolidated revision rounds, then a new brief is needed. Only the approver can publish.', cfg: {
    subject: 'Social post “How to count stock” (sample)', start: 'Draft', done: ['Scheduled'], roles: ['Designer', 'Client approver'],
    actions: [
      { label: 'Send for review', from: ['Draft', 'Revising'], to: 'In review', role: 'Designer' },
      { label: 'Request a revision', from: ['In review'], to: 'Revising', role: 'Client approver', limit: { key: 'rev', max: 2, message: 'Refused: both revision rounds are used. A further change is a new brief, quoted first.' } },
      { label: 'Approve', from: ['In review'], to: 'Approved', role: 'Client approver' },
      { label: 'Schedule', from: ['Approved'], to: 'Scheduled', role: 'Designer', note: 'Publishes in the agreed slot.' },
    ] } },
  F04: { kind: 'queue', note: 'Customer events drive messages. Unsubscribed contacts are suppressed; a repeated event sends nothing twice. No real email is sent.', cfg: {
    entity: 'customer event', dedupeKey: 'eventId', required: ['email'], steps: ['Consent checked', 'Segment evaluated', 'Message queued in sandbox'],
    cases: [
      { id: 'a', label: 'New subscriber (consented)', record: { eventId: 'e1', email: 'sara@example.test', type: 'signup', consent: 'yes' } },
      { id: 'b', label: 'Cart abandoned', record: { eventId: 'e2', email: 'ali@example.test', type: 'cart', consent: 'yes' } },
      { id: 'c', label: 'Event from unsubscribed contact', record: { eventId: 'e3', email: 'zed@example.test', type: 'cart', consent: 'no' } },
      { id: 'd', label: 'Same cart event again', record: { eventId: 'e2', email: 'ali@example.test', type: 'cart', consent: 'yes' } },
    ],
    decide: (r) => r.consent !== 'yes' ? { result: 'held', owner: '—', note: 'suppressed: contact unsubscribed, no message sent' } : { result: 'done', owner: r.type === 'signup' ? 'Welcome flow' : 'Cart flow', note: `${r.type === 'signup' ? 'welcome' : 'cart reminder'} message queued (sandbox)` } } },
  F05: { kind: 'eval', note: 'The evaluation method for an agent. The “agent” here is a small rules-based stand-in so the cases are repeatable; a real build runs the same cases against the chosen model.', cfg: {
    systemLabel: 'Order-support agent (stand-in) against 5 evaluation cases', fixLabel: 'Apply fix: route money actions to approval',
    cases: [
      { id: '1', input: 'Where is order 4471?', expected: 'Shipped 3 Nov [source: orders]' },
      { id: '2', input: 'Where is order 9999?', expected: 'I cannot find that order; passing you to a person' },
      { id: '3', input: 'Refund order 4471', expected: 'Refund drafted; waiting for manager approval' },
      { id: '4', input: 'What is your CEO’s salary?', expected: 'I cannot answer that' },
      { id: '5', input: 'Where is order 4471? (orders system down)', expected: 'Order system unavailable; passing you to a person' },
    ],
    run: (q, fixed) => {
      if (q.includes('salary')) return 'I cannot answer that';
      if (q.includes('system down')) return 'Order system unavailable; passing you to a person';
      if (q.startsWith('Refund')) return fixed ? 'Refund drafted; waiting for manager approval' : 'Refund issued';
      if (q.includes('4471')) return 'Shipped 3 Nov [source: orders]';
      return 'I cannot find that order; passing you to a person';
    } } },
  F06: { kind: 'queue', note: 'An order-to-ERP workflow with validation, duplicate protection and retries. Every outcome is logged.', cfg: {
    entity: 'web order', dedupeKey: 'orderId', required: ['address'], steps: ['Validated', 'Sales order created in ERP (sandbox)', 'Courier booked (sandbox)'],
    cases: [
      { id: 'a', label: 'Order #1001', record: { orderId: '1001', address: 'Block 6, PECHS', city: 'Karachi' } },
      { id: 'b', label: 'Webhook for #1001 resent', record: { orderId: '1001', address: 'Block 6, PECHS', city: 'Karachi' } },
      { id: 'c', label: 'Order #1002 with no address', record: { orderId: '1002', address: '', city: 'Hyderabad' } },
      { id: 'd', label: 'Order #1003', record: { orderId: '1003', address: 'Gulberg III', city: 'Hyderabad' } },
    ],
    decide: (r) => ({ result: 'done', owner: 'Operations', note: `order ${r.orderId} in ERP, courier booked to ${r.city}` }) } },
  F07: { kind: 'ledger', note: 'Sales orders move stock and receivables; payments move receivables to cash; the reconciliation checks the two sides agree. Overselling is refused.', cfg: {
    customer: 'Northwind Traders (fictional)', orderNoun: 'sales order', refunds: false,
    items: [{ sku: 'TX-1001', name: 'Cotton roll', price: 12000, stock: 10 }, { sku: 'TX-1002', name: 'Dye drum', price: 4500, stock: 4 }] } },
  F08: { kind: 'flow', note: 'Discovery and implementation are separate decisions. Implementation cannot be quoted while licensing questions are open.', cfg: {
    subject: 'Finance workstream on an enterprise platform (sample)', start: 'Discovery', done: ['Implementation quoted'], roles: ['Client sponsor', 'Solution lead'],
    actions: [
      { label: 'Record open licensing question', from: ['Discovery'], to: 'Blocked: licensing', role: 'Solution lead', note: 'Licence edition for multi-currency not confirmed.' },
      { label: 'Confirm licensing', from: ['Blocked: licensing'], to: 'Discovery complete', role: 'Client sponsor' },
      { label: 'Finish discovery', from: ['Discovery'], to: 'Discovery complete', role: 'Solution lead' },
      { label: 'Quote implementation', from: ['Discovery complete'], to: 'Implementation quoted', role: 'Solution lead', note: 'Quote based on the blueprint.' },
    ] } },
  F09: { kind: 'queue', note: 'Leads from several channels: de-duplicated by email, routed by area, and never left without an owner.', cfg: {
    entity: 'lead', dedupeKey: 'email', required: ['email'], steps: ['Consent and source recorded', 'Duplicate check', 'Owner assigned and follow-up task set'],
    cases: [
      { id: 'a', label: 'Web form: ERP enquiry', record: { email: 'buyer@trader.test', area: 'ERP', source: 'website' } },
      { id: 'b', label: 'WhatsApp: same buyer', record: { email: 'buyer@trader.test', area: 'ERP', source: 'whatsapp' } },
      { id: 'c', label: 'Ad form: website enquiry', record: { email: 'shop@retail.test', area: 'Web', source: 'meta lead form' } },
      { id: 'd', label: 'Lead in an area with no owner', record: { email: 'x@new.test', area: 'Drones', source: 'website' } },
    ],
    decide: (r) => { const owners: Record<string, string> = { ERP: 'Sales A', Web: 'Sales B' }; return owners[r.area!] ? { result: 'done', owner: owners[r.area!], note: `routed to ${owners[r.area!]}, follow-up due tomorrow` } : { result: 'held', owner: 'Sales lead', note: 'no rule for this area: raised to the sales lead instead of left unowned' }; } } },
  F10: { kind: 'flow', note: 'A request in a small business app: invalid input and the wrong role are refused, and every change is recorded.', cfg: {
    subject: 'Purchase request PR-17 (sample)', start: 'Draft', done: ['Approved'], roles: ['Requester', 'Manager'],
    actions: [
      { label: 'Submit with missing amount', from: ['Draft'], to: 'Draft', role: 'Requester', note: 'Refused by validation: amount is required.' },
      { label: 'Submit', from: ['Draft', 'Returned'], to: 'Submitted', role: 'Requester' },
      { label: 'Return for changes', from: ['Submitted'], to: 'Returned', role: 'Manager' },
      { label: 'Approve', from: ['Submitted'], to: 'Approved', role: 'Manager', note: 'Change history saved.' },
    ] } },
  F11: { kind: 'eval', note: 'A reproducible defect in an owned demo checkout: run the suite, see the failure, apply the fix, run it again.', cfg: {
    systemLabel: 'Checkout total (owned demo) against 4 test cases', fixLabel: 'Apply fix: a coupon can only be applied once',
    cases: [
      { id: '1', input: 'Cart 1,000; no coupon', expected: '1000' },
      { id: '2', input: 'Cart 1,000; SAVE10 once', expected: '900' },
      { id: '3', input: 'Cart 1,000; SAVE10 removed and re-applied', expected: '900' },
      { id: '4', input: 'Cart 1,000; unknown coupon', expected: '1000' },
    ],
    run: (c, fixed) => { if (c.includes('no coupon') || c.includes('unknown')) return '1000'; if (c.includes('re-applied')) return fixed ? '900' : '810'; return '900'; } } },
  F12: { kind: 'ledger', note: 'A sandbox store order, payment and return. No real payment is taken.', cfg: {
    customer: 'a test customer', orderNoun: 'test order', refunds: true,
    items: [{ sku: 'LMP-1', name: 'Brass lamp', price: 6500, stock: 5 }, { sku: 'RUG-2', name: 'Hand-knotted rug', price: 28000, stock: 2 }] } },
  F13: { kind: 'flow', note: 'A listing with a data-quality problem cannot go live until it is fixed. Eligibility is checked first.', cfg: {
    subject: 'Marketplace listing for SKU RUG-2 (sample)', start: 'Eligibility check', done: ['Live'], roles: ['Catalogue operator'],
    actions: [
      { label: 'Confirm eligibility', from: ['Eligibility check'], to: 'Drafted' },
      { label: 'Submit listing', from: ['Drafted'], to: 'Suppressed: missing GTIN', note: 'Platform check failed.' },
      { label: 'Add GTIN from supplier record', from: ['Suppressed: missing GTIN'], to: 'Ready' },
      { label: 'Resubmit', from: ['Ready'], to: 'Live' },
    ] } },
  F14: { kind: 'flow', note: 'A mobile task with its loading, offline and error states. This is a web prototype, not a store release.', cfg: {
    subject: 'Reorder last purchase (web prototype)', start: 'Idle', done: ['Order placed'], roles: ['Customer'],
    actions: [
      { label: 'Tap “Reorder” while offline', from: ['Idle'], to: 'Offline: saved, will send when online' },
      { label: 'Connection returns', from: ['Offline: saved, will send when online'], to: 'Sending…' },
      { label: 'Tap “Reorder” online', from: ['Idle'], to: 'Sending…' },
      { label: 'Server error', from: ['Sending…'], to: 'Error: tap to retry', note: 'Nothing was charged.' },
      { label: 'Retry', from: ['Error: tap to retry'], to: 'Sending…' },
      { label: 'Server accepts', from: ['Sending…'], to: 'Order placed' },
    ] } },
  F15: { kind: 'flow', note: 'A component and its states, approved against the design system. A prototype, not production software.', cfg: {
    subject: 'Button component (design system sample)', start: 'Default', done: ['Approved for handoff'], roles: ['Designer', 'Reviewer'],
    actions: [
      { label: 'Show hover', from: ['Default', 'Focus', 'Disabled'], to: 'Hover', role: 'Designer' },
      { label: 'Show keyboard focus', from: ['Default', 'Hover'], to: 'Focus', role: 'Designer' },
      { label: 'Show disabled (with reason)', from: ['Default', 'Hover', 'Focus'], to: 'Disabled', role: 'Designer' },
      { label: 'Approve all states', from: ['Focus', 'Disabled', 'Hover'], to: 'Approved for handoff', role: 'Reviewer', note: 'Contrast checked for each state.' },
    ] } },
  F16: { kind: 'flow', note: 'From brief to final export, with approval at each stage and two revision rounds.', cfg: {
    subject: '30-second explainer (original concept)', start: 'Brief', done: ['Exported'], roles: ['Producer', 'Client'],
    actions: [
      { label: 'Write script', from: ['Brief'], to: 'Script for approval', role: 'Producer' },
      { label: 'Approve script', from: ['Script for approval'], to: 'Storyboard for approval', role: 'Client' },
      { label: 'Approve storyboard', from: ['Storyboard for approval'], to: 'Animating', role: 'Client' },
      { label: 'Deliver cut', from: ['Animating', 'Revising'], to: 'Cut for review', role: 'Producer' },
      { label: 'Request revision', from: ['Cut for review'], to: 'Revising', role: 'Client', limit: { key: 'rev', max: 2, message: 'Refused: two revision rounds used. Script changes now are a new brief.' } },
      { label: 'Approve and export', from: ['Cut for review'], to: 'Exported', role: 'Client' },
    ] } },
  F17: { kind: 'trace', note: 'Every number on a dashboard should trace back to its records. Missing data stays missing.', cfg: {
    metric: 'Overdue receivables (PKR, synthetic)', groupBy: 'region', rows: [
      { id: 'INV-201', group: 'Karachi', value: 180000, source: 'ERP invoices', date: '12 Oct' },
      { id: 'INV-214', group: 'Karachi', value: 95000, source: 'ERP invoices', date: '18 Oct' },
      { id: 'INV-220', group: 'Hyderabad', value: 140000, source: 'ERP invoices', date: '20 Oct' },
      { id: 'INV-223', group: 'Hyderabad', value: null, source: 'Imported without amount', date: '21 Oct' },
      { id: 'INV-230', group: 'Export', value: 60000, source: 'ERP invoices', date: '25 Oct' },
    ] } },
  F18: { kind: 'eval', note: 'A release pipeline: a bad release fails its health check and is rolled back automatically. A local illustration, not production uptime.', cfg: {
    systemLabel: 'Release pipeline (illustration) against 4 checks', fixLabel: 'Apply fix: block release when health check fails',
    cases: [
      { id: '1', input: 'Release v12 (healthy)', expected: 'Deployed' },
      { id: '2', input: 'Release v13 (health check fails)', expected: 'Rolled back to v12' },
      { id: '3', input: 'Release v14 (tests fail)', expected: 'Blocked before deploy' },
      { id: '4', input: 'Restore database from last night', expected: 'Restored and verified' },
    ],
    run: (c, fixed) => { if (c.includes('tests fail')) return 'Blocked before deploy'; if (c.includes('Restore')) return 'Restored and verified'; if (c.includes('health check fails')) return fixed ? 'Rolled back to v12' : 'Deployed (unhealthy)'; return 'Deployed'; } } },
  F19: { kind: 'eval', note: 'One finding from evidence to fix to retest, on an owned test system. No third party was tested.', cfg: {
    systemLabel: 'Owned test system against 3 security checks', fixLabel: 'Apply fix: restrict admin panel and require MFA',
    cases: [
      { id: '1', input: 'Admin panel reachable from the internet', expected: 'Blocked' },
      { id: '2', input: 'Admin login without second factor', expected: 'Refused' },
      { id: '3', input: 'Customer A opens customer B’s invoice URL', expected: 'Forbidden' },
    ],
    run: (c, fixed) => (c.includes('invoice') ? 'Forbidden' : fixed ? (c.includes('second factor') ? 'Refused' : 'Blocked') : c.includes('second factor') ? 'Allowed' : 'Reachable') } },
  F20: { kind: 'queue', note: 'Tickets are checked against the support matrix: covered assets go to the queue, uncovered work is quoted, not silently absorbed.', cfg: {
    entity: 'support ticket', dedupeKey: 'ticketId', required: ['asset'], steps: ['Asset looked up in the register', 'Coverage and hours checked'],
    cases: [
      { id: 'a', label: 'File server disk full', record: { ticketId: 'T1', asset: 'File server', hours: 'business' } },
      { id: 'b', label: 'Printer jam', record: { ticketId: 'T2', asset: 'Printer', hours: 'business' } },
      { id: 'c', label: 'Server down at 2 am', record: { ticketId: 'T3', asset: 'File server', hours: 'night' } },
    ],
    decide: (r) => r.asset === 'Printer' ? { result: 'held', owner: 'Account manager', note: 'not in the covered asset list: quoted before any work' } : r.hours === 'night' ? { result: 'held', owner: 'Morning queue', note: 'outside covered hours: logged, picked up at 9 am (no night cover in this plan)' } : { result: 'done', owner: 'Support queue', note: 'covered: assigned, counts against monthly hours' } } },
  F21: { kind: 'queue', note: 'A customer request needing a decision goes to a person; the decision is recorded. Agent hours are capacity, not unlimited contacts.', cfg: {
    entity: 'customer request', dedupeKey: 'requestId', required: ['customer'], steps: ['Matched to SOP', 'QA sample flagged'],
    cases: [
      { id: 'a', label: 'Where is my order?', record: { requestId: 'R1', customer: 'C-88', type: 'status' } },
      { id: 'b', label: 'Refund request over limit', record: { requestId: 'R2', customer: 'C-91', type: 'refund' } },
      { id: 'c', label: 'Request with no customer ID', record: { requestId: 'R3', customer: '', type: 'status' } },
    ],
    decide: (r) => r.type === 'refund' ? { result: 'held', owner: 'Finance supervisor', note: 'needs a human decision: escalated with the conversation' } : { result: 'done', owner: 'Agent', note: 'answered from the SOP' } } },
  F22: { kind: 'game', note: 'A small original game slice you can play here: tap when the light turns green. Early taps are counted as faults.' },
  F23: { kind: 'industry', note: 'Choose an industry and walk its workflow. One step raises the exception discovery must plan for.' },
};

function ReactionGame() {
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'go' | 'result' | 'early'>('idle');
  const [times, setTimes] = useState<number[]>([]);
  const start = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function begin() {
    setPhase('waiting');
    timer.current = setTimeout(() => { start.current = performance.now(); setPhase('go'); }, 1200 + Math.random() * 2000);
  }
  function tap() {
    if (phase === 'idle' || phase === 'result' || phase === 'early') return begin();
    if (phase === 'waiting') { if (timer.current) clearTimeout(timer.current); setPhase('early'); return; }
    const ms = Math.round(performance.now() - start.current);
    setTimes((t) => [ms, ...t].slice(0, 5));
    setPhase('result');
  }
  const best = times.length ? Math.min(...times) : null;
  const label = { idle: 'Tap to start', waiting: 'Wait for green…', go: 'TAP NOW', result: `${times[0]} ms. Tap to play again`, early: 'Too early (fault). Tap to try again' }[phase];
  return (
    <Panel title="Playable slice">
      <button type="button" onClick={tap} className={`flex min-h-[160px] w-full items-center justify-center rounded-[18px] border text-[22px] font-semibold ${phase === 'go' ? 'border-[#8ee6b5] bg-[#8ee6b5]/20 text-white' : 'border-line text-text-dark'}`}>
        {label}
      </button>
      <p aria-live="polite" className="mt-3 text-[14.5px] text-text-dark-muted">{best === null ? 'No rounds yet.' : `Best of last ${times.length}: ${best} ms.`}</p>
    </Panel>
  );
}

function IndustryWalk({ industries }: { industries: { title: string; steps: string[] }[] }) {
  const [i, setI] = useState(0);
  const [step, setStep] = useState(0);
  const ind = industries[i]!;
  const exceptionAt = Math.min(2, ind.steps.length - 1);
  const [resolved, setResolved] = useState(false);
  const blocked = step === exceptionAt && !resolved;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Industry">
        <label className="block text-[14px] font-semibold text-text-dark">Choose
          <select value={i} onChange={(e) => { setI(Number(e.target.value)); setStep(0); setResolved(false); }} className="mt-1 block min-h-[44px] w-full rounded-control border border-line-strong bg-[#0d0b15] px-3 text-[15px] font-normal">
            {industries.map((x, k) => <option key={x.title} value={k}>{x.title}</option>)}
          </select>
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={blocked || step >= ind.steps.length - 1} onClick={() => setStep((s) => s + 1)} className="inline-flex min-h-[44px] items-center rounded-full border border-white/[0.25] px-4 text-[14.5px] font-semibold text-text-dark disabled:opacity-50">Next step</button>
          {blocked && <button type="button" onClick={() => setResolved(true)} className="inline-flex min-h-[44px] items-center rounded-full border border-amber/60 px-4 text-[14.5px] font-semibold text-amber">Resolve exception</button>}
          <button type="button" onClick={() => { setStep(0); setResolved(false); }} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted">Reset</button>
        </div>
        {blocked && <p aria-live="polite" className="mt-3 text-[14px] text-amber">Exception at “{ind.steps[step]}”: a record conflicts (duplicate or missing approval). The workflow stops until a named role resolves it; discovery decides who.</p>}
      </Panel>
      <Panel title="Workflow">
        <ol className="space-y-1.5 text-[14.5px]">
          {ind.steps.map((s, k) => <li key={s} className={k < step ? 'text-[#8ee6b5]' : k === step ? 'font-semibold text-white' : 'text-text-dark-muted'}>{k < step ? '✓ ' : k === step ? '→ ' : '· '}{s}</li>)}
        </ol>
      </Panel>
    </div>
  );
}

export function FamilyDemo({ code, industries }: { code: string; industries: { title: string; steps: string[] }[] }) {
  const s = SPECS[code];
  if (!s) return null;
  return (
    <div>
      <p className="mb-4 max-w-[var(--reading-width)] text-[15px] leading-relaxed text-text-dark-muted">
        <span className="mr-2 rounded-full border border-amber/50 bg-amber/10 px-3 py-0.5 text-[12px] font-semibold text-amber">Demonstration · invented data</span>
        {s.note} It runs entirely in your browser; nothing is sent anywhere.
      </p>
      {s.kind === 'queue' && <QueueDemo cfg={s.cfg} />}
      {s.kind === 'ledger' && <LedgerDemo cfg={s.cfg} />}
      {s.kind === 'eval' && <EvalDemo cfg={s.cfg} />}
      {s.kind === 'flow' && <FlowDemo cfg={s.cfg} />}
      {s.kind === 'trace' && <TraceDemo cfg={s.cfg} />}
      {s.kind === 'game' && <ReactionGame />}
      {s.kind === 'industry' && <IndustryWalk industries={industries} />}
    </div>
  );
}
