'use client';

import { useMemo, useState } from 'react';

/**
 * Reusable demonstration engines. Each one performs its operation for real, in the browser, on invented
 * data: nothing is sent to a server, an AI model, a payment provider or anyone's account. The family
 * configurations that drive them are in ./configs.tsx.
 */

const btn = 'inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-[14.5px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';
const primary = `${btn} border-white/[0.25] text-text-dark hover:border-violet-bright/70`;
const quiet = `${btn} border-line text-text-dark-muted hover:border-line-strong hover:text-white`;

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-line p-4">
      <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Log({ lines }: { lines: { text: string; tone?: 'ok' | 'warn' | 'bad' }[] }) {
  return (
    <ol aria-live="polite" className="max-h-64 space-y-1.5 overflow-y-auto text-[14px]">
      {lines.length === 0 && <li className="text-text-dark-muted">Nothing yet. Use the buttons above.</li>}
      {lines.map((l, i) => (
        <li key={i} className={l.tone === 'bad' ? 'text-[#ff9b9b]' : l.tone === 'warn' ? 'text-amber' : l.tone === 'ok' ? 'text-[#8ee6b5]' : 'text-text-dark-muted'}>
          {l.text}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* A. Event queue: validation, de-duplication, retries and routing.   */
/* ------------------------------------------------------------------ */

export interface QueueCase {
  id: string;
  label: string;
  record: Record<string, string>;
}
export interface QueueConfig {
  entity: string;
  cases: QueueCase[];
  dedupeKey: string;
  steps: string[];
  /** Decide the outcome for a valid record: owner/segment/queue, or a hold with a reason. */
  decide: (r: Record<string, string>) => { result: 'done' | 'held'; owner?: string; note: string };
  required: string[];
}

export function QueueDemo({ cfg }: { cfg: QueueConfig }) {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [rows, setRows] = useState<{ key: string; label: string; status: string; owner: string }[]>([]);
  const [log, setLog] = useState<{ text: string; tone?: 'ok' | 'warn' | 'bad' }[]>([]);
  const [failNext, setFailNext] = useState(false);

  function send(c: QueueCase) {
    const out: typeof log = [];
    const key = c.record[cfg.dedupeKey] ?? c.id;
    out.push({ text: `Received ${cfg.entity} “${c.label}”.` });
    const missing = cfg.required.filter((f) => !c.record[f]);
    if (missing.length) {
      out.push({ text: `Held for review: missing ${missing.join(', ')}. Nothing was created.`, tone: 'warn' });
      setRows((r) => [...r, { key: `${key}-${r.length}`, label: c.label, status: 'Held: missing data', owner: 'Reviewer' }]);
      setLog((l) => [...out, ...l]);
      return;
    }
    if (seen.has(key)) {
      out.push({ text: `Duplicate of an earlier ${cfg.entity} (same ${cfg.dedupeKey}). Skipped; no second record.`, tone: 'ok' });
      setLog((l) => [...out, ...l]);
      return;
    }
    let attempts = 1;
    if (failNext) {
      out.push({ text: `Step “${cfg.steps[cfg.steps.length - 1]}” failed (simulated outage). Retry 1 of 3…`, tone: 'warn' });
      out.push({ text: 'Retry 2 of 3 succeeded.', tone: 'ok' });
      attempts = 2;
      setFailNext(false);
    }
    const d = cfg.decide(c.record);
    cfg.steps.forEach((s) => out.push({ text: `✓ ${s}` }));
    out.push({ text: `${d.result === 'done' ? 'Completed' : 'Held'}: ${d.note}${attempts > 1 ? ' (after a retry)' : ''}.`, tone: d.result === 'done' ? 'ok' : 'warn' });
    setSeen((s) => new Set(s).add(key));
    setRows((r) => [...r, { key, label: c.label, status: d.result === 'done' ? 'Done' : 'Held', owner: d.owner ?? '—' }]);
    setLog((l) => [...out, ...l]);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title={`Send a ${cfg.entity}`}>
        <div className="flex flex-wrap gap-2">
          {cfg.cases.map((c) => (
            <button key={c.id} type="button" className={primary} onClick={() => send(c)}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="mt-4 flex min-h-[44px] items-center gap-3 text-[14.5px] text-text-dark">
          <input type="checkbox" checked={failNext} onChange={(e) => setFailNext(e.target.checked)} className="h-5 w-5" />
          Make the next delivery fail once (to see the retry)
        </label>
        <button type="button" className={`${quiet} mt-2`} onClick={() => { setSeen(new Set()); setRows([]); setLog([]); }}>
          Reset
        </button>
      </Panel>
      <Panel title="Records">
        {rows.length === 0 ? (
          <p className="text-[14px] text-text-dark-muted">No records yet.</p>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead><tr className="border-b border-line"><th scope="col" className="py-1.5 pr-2 font-semibold text-text-dark">{cfg.entity}</th><th scope="col" className="py-1.5 pr-2 font-semibold text-text-dark">Status</th><th scope="col" className="py-1.5 font-semibold text-text-dark">Owner</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r.key} className="border-b border-line last:border-0"><td className="py-1.5 pr-2 text-text-dark-muted">{r.label}</td><td className="py-1.5 pr-2 text-text-dark">{r.status}</td><td className="py-1.5 text-text-dark-muted">{r.owner}</td></tr>)}</tbody>
          </table>
        )}
      </Panel>
      <div className="lg:col-span-2"><Panel title="Execution log (newest first)"><Log lines={log} /></Panel></div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* B. Ledger: orders that move stock and money, with reconciliation.  */
/* ------------------------------------------------------------------ */

export interface LedgerConfig {
  items: { sku: string; name: string; price: number; stock: number }[];
  customer: string;
  orderNoun: string;
  /** Show a "return and refund" action. */
  refunds: boolean;
}

interface Move { ref: string; sku: string; qty: number }
interface Entry { ref: string; account: 'Receivable' | 'Cash'; amount: number }

export function LedgerDemo({ cfg }: { cfg: LedgerConfig }) {
  const [moves, setMoves] = useState<Move[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [orders, setOrders] = useState<{ ref: string; sku: string; qty: number; state: 'Delivered' | 'Paid' | 'Refunded' }[]>([]);
  const [sku, setSku] = useState(cfg.items[0]!.sku);
  const [qty, setQty] = useState(2);
  const [log, setLog] = useState<{ text: string; tone?: 'ok' | 'warn' | 'bad' }[]>([]);

  const onHand = (s: string) => cfg.items.find((i) => i.sku === s)!.stock + moves.filter((m) => m.sku === s).reduce((a, m) => a + m.qty, 0);
  const receivable = entries.filter((e) => e.account === 'Receivable').reduce((a, e) => a + e.amount, 0);
  const cash = entries.filter((e) => e.account === 'Cash').reduce((a, e) => a + e.amount, 0);
  const sales = orders.filter((o) => o.state !== 'Refunded').reduce((a, o) => a + o.qty * cfg.items.find((i) => i.sku === o.sku)!.price, 0);

  function order() {
    const item = cfg.items.find((i) => i.sku === sku)!;
    if (!Number.isInteger(qty) || qty < 1) { setLog((l) => [{ text: 'Rejected: quantity must be a whole number of at least 1.', tone: 'bad' }, ...l]); return; }
    if (qty > onHand(sku)) { setLog((l) => [{ text: `Rejected: only ${onHand(sku)} of ${item.name} in stock. No ${cfg.orderNoun} created.`, tone: 'bad' }, ...l]); return; }
    const ref = `SO-${String(orders.length + 1).padStart(3, '0')}`;
    const amount = qty * item.price;
    setOrders((o) => [...o, { ref, sku, qty, state: 'Delivered' }]);
    setMoves((m) => [...m, { ref, sku, qty: -qty }]);
    setEntries((e) => [...e, { ref, account: 'Receivable', amount }]);
    setLog((l) => [{ text: `${ref}: ${qty} × ${item.name} delivered to ${cfg.customer}. Stock −${qty}; receivable +${amount.toLocaleString('en-US')}.`, tone: 'ok' }, ...l]);
  }
  function pay(ref: string) {
    const o = orders.find((x) => x.ref === ref)!;
    const amount = o.qty * cfg.items.find((i) => i.sku === o.sku)!.price;
    setOrders((os) => os.map((x) => (x.ref === ref ? { ...x, state: 'Paid' } : x)));
    setEntries((e) => [...e, { ref, account: 'Receivable', amount: -amount }, { ref, account: 'Cash', amount }]);
    setLog((l) => [{ text: `${ref}: payment received. Receivable −${amount.toLocaleString('en-US')}; cash +${amount.toLocaleString('en-US')}.`, tone: 'ok' }, ...l]);
  }
  function refund(ref: string) {
    const o = orders.find((x) => x.ref === ref)!;
    const amount = o.qty * cfg.items.find((i) => i.sku === o.sku)!.price;
    setOrders((os) => os.map((x) => (x.ref === ref ? { ...x, state: 'Refunded' } : x)));
    setMoves((m) => [...m, { ref: `${ref}-R`, sku: o.sku, qty: o.qty }]);
    setEntries((e) => [...e, { ref: `${ref}-R`, account: 'Cash', amount: -amount }]);
    setLog((l) => [{ text: `${ref}: returned and refunded. Stock +${o.qty}; cash −${amount.toLocaleString('en-US')}.`, tone: 'warn' }, ...l]);
  }

  const reconciled = Math.abs(receivable + cash - sales) < 0.001;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title={`New ${cfg.orderNoun}`}>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-[14px] font-semibold text-text-dark">Product
            <select value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 block min-h-[44px] rounded-control border border-line-strong bg-[#0d0b15] px-3 text-[15px] font-normal">
              {cfg.items.map((i) => <option key={i.sku} value={i.sku}>{i.name} ({i.price.toLocaleString('en-US')})</option>)}
            </select>
          </label>
          <label className="text-[14px] font-semibold text-text-dark">Quantity
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="mt-1 block min-h-[44px] w-24 rounded-control border border-line-strong bg-transparent px-3 text-[15px] font-normal" />
          </label>
          <button type="button" className={primary} onClick={order}>Create and deliver</button>
        </div>
        <ul className="mt-4 space-y-2 text-[14px]">
          {orders.map((o) => (
            <li key={o.ref} className="flex flex-wrap items-center gap-2">
              <span className="text-text-dark">{o.ref}</span><span className="text-text-dark-muted">{o.qty} × {o.sku} · {o.state}</span>
              {o.state === 'Delivered' && <button type="button" className={quiet} onClick={() => pay(o.ref)}>Record payment</button>}
              {cfg.refunds && o.state !== 'Refunded' && <button type="button" className={quiet} onClick={() => refund(o.ref)}>Return and refund</button>}
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Stock and money">
        <table className="w-full text-left text-[14px]">
          <thead><tr className="border-b border-line"><th scope="col" className="py-1.5 font-semibold text-text-dark">Product</th><th scope="col" className="py-1.5 font-semibold text-text-dark">Opening</th><th scope="col" className="py-1.5 font-semibold text-text-dark">On hand</th></tr></thead>
          <tbody>{cfg.items.map((i) => <tr key={i.sku} className="border-b border-line"><td className="py-1.5 text-text-dark-muted">{i.name}</td><td className="py-1.5 text-text-dark-muted">{i.stock}</td><td className="py-1.5 text-text-dark">{onHand(i.sku)}</td></tr>)}</tbody>
        </table>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-[14px]">
          <div><dt className="text-text-dark-muted">Net sales</dt><dd className="text-text-dark">{sales.toLocaleString('en-US')}</dd></div>
          <div><dt className="text-text-dark-muted">Receivable</dt><dd className="text-text-dark">{receivable.toLocaleString('en-US')}</dd></div>
          <div><dt className="text-text-dark-muted">Cash</dt><dd className="text-text-dark">{cash.toLocaleString('en-US')}</dd></div>
        </dl>
        <p className={`mt-3 text-[14px] ${reconciled ? 'text-[#8ee6b5]' : 'text-[#ff9b9b]'}`}>
          Reconciliation: receivable + cash {reconciled ? '=' : '≠'} net sales {reconciled ? '✓' : '(investigate)'}. Stock on hand = opening + movements.
        </p>
      </Panel>
      <div className="lg:col-span-2"><Panel title="Log (newest first)"><Log lines={log} /></Panel></div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* C. Evaluation: run cases against a system, fix a defect, re-run.   */
/* ------------------------------------------------------------------ */

export interface EvalCase { id: string; input: string; expected: string }
export interface EvalConfig {
  systemLabel: string;
  cases: EvalCase[];
  /** The system under test, with or without the fix applied. */
  run: (input: string, fixed: boolean) => string;
  fixLabel: string;
}

export function EvalDemo({ cfg }: { cfg: EvalConfig }) {
  const [fixed, setFixed] = useState(false);
  const [runs, setRuns] = useState<{ fixed: boolean; results: { c: EvalCase; actual: string; pass: boolean }[] }[]>([]);
  function run() {
    const results = cfg.cases.map((c) => { const actual = cfg.run(c.input, fixed); return { c, actual, pass: actual === c.expected }; });
    setRuns((r) => [{ fixed, results }, ...r]);
  }
  const last = runs[0];
  return (
    <div className="space-y-4">
      <Panel title={cfg.systemLabel}>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={primary} onClick={run}>Run all {cfg.cases.length} cases</button>
          <button type="button" className={quiet} disabled={fixed} onClick={() => setFixed(true)}>{fixed ? 'Fix applied' : cfg.fixLabel}</button>
          <button type="button" className={quiet} onClick={() => { setFixed(false); setRuns([]); }}>Reset</button>
        </div>
        {last && <p aria-live="polite" className="mt-3 text-[14.5px] text-text-dark">Run {runs.length}{last.fixed ? ' (with fix)' : ''}: {last.results.filter((r) => r.pass).length} of {last.results.length} passed.</p>}
      </Panel>
      {last && (
        <div className="overflow-x-auto rounded-[18px] border border-line" tabIndex={0} role="region" aria-label="Case results (scrollable table)">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead><tr className="border-b border-line"><th scope="col" className="px-4 py-2 font-semibold text-text-dark">Case</th><th scope="col" className="px-4 py-2 font-semibold text-text-dark">Expected</th><th scope="col" className="px-4 py-2 font-semibold text-text-dark">Actual</th><th scope="col" className="px-4 py-2 font-semibold text-text-dark">Result</th></tr></thead>
            <tbody>{last.results.map((r) => <tr key={r.c.id} className="border-b border-line last:border-0"><td className="px-4 py-2 align-top text-text-dark-muted">{r.c.input}</td><td className="px-4 py-2 align-top text-text-dark-muted">{r.c.expected}</td><td className="px-4 py-2 align-top text-text-dark">{r.actual}</td><td className={`px-4 py-2 align-top font-semibold ${r.pass ? 'text-[#8ee6b5]' : 'text-[#ff9b9b]'}`}>{r.pass ? 'Pass' : 'Fail'}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* D. Workflow: states, role-gated transitions, limits, exceptions.   */
/* ------------------------------------------------------------------ */

export interface FlowAction { label: string; from: string[]; to: string; role?: string; note?: string; limit?: { key: string; max: number; message: string } }
export interface FlowConfig { subject: string; start: string; done: string[]; roles: string[]; actions: FlowAction[] }

export function FlowDemo({ cfg }: { cfg: FlowConfig }) {
  const [state, setState] = useState(cfg.start);
  const [role, setRole] = useState(cfg.roles[0]!);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [log, setLog] = useState<{ text: string; tone?: 'ok' | 'warn' | 'bad' }[]>([]);
  const available = cfg.actions.filter((a) => a.from.includes(state));
  function act(a: FlowAction) {
    if (a.role && a.role !== role) { setLog((l) => [{ text: `Refused: “${a.label}” needs the ${a.role} role (you are ${role}). Nothing changed.`, tone: 'bad' }, ...l]); return; }
    if (a.limit && (counts[a.limit.key] ?? 0) >= a.limit.max) { setLog((l) => [{ text: a.limit!.message, tone: 'warn' }, ...l]); return; }
    if (a.limit) setCounts((c) => ({ ...c, [a.limit!.key]: (c[a.limit!.key] ?? 0) + 1 }));
    setState(a.to);
    setLog((l) => [{ text: `${role}: ${a.label} → ${a.to}.${a.note ? ` ${a.note}` : ''}`, tone: cfg.done.includes(a.to) ? 'ok' : undefined }, ...l]);
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title={cfg.subject}>
        <p className="text-[15px] text-text-dark">Current state: <span className="font-semibold text-white">{state}</span></p>
        <label className="mt-3 block text-[14px] font-semibold text-text-dark">Acting as
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block min-h-[44px] rounded-control border border-line-strong bg-[#0d0b15] px-3 text-[15px] font-normal">
            {cfg.roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {available.length ? available.map((a) => <button key={a.label} type="button" className={primary} onClick={() => act(a)}>{a.label}</button>) : <p className="text-[14px] text-text-dark-muted">No further actions from this state.</p>}
        </div>
        <button type="button" className={`${quiet} mt-3`} onClick={() => { setState(cfg.start); setCounts({}); setLog([]); }}>Reset</button>
      </Panel>
      <Panel title="History (newest first)"><Log lines={log} /></Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* E. Trace: a figure and the records behind it; missing ≠ zero.      */
/* ------------------------------------------------------------------ */

export interface TraceConfig {
  metric: string;
  groupBy: string;
  rows: { id: string; group: string; value: number | null; source: string; date: string }[];
}

export function TraceDemo({ cfg }: { cfg: TraceConfig }) {
  const groups = useMemo(() => [...new Set(cfg.rows.map((r) => r.group))], [cfg.rows]);
  const [sel, setSel] = useState<string | null>(null);
  const total = (g: string) => cfg.rows.filter((r) => r.group === g && r.value !== null).reduce((a, r) => a + (r.value ?? 0), 0);
  const missing = (g: string) => cfg.rows.filter((r) => r.group === g && r.value === null).length;
  const max = Math.max(1, ...groups.map(total));
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title={`${cfg.metric} by ${cfg.groupBy}`}>
        <ul className="space-y-2">
          {groups.map((g) => (
            <li key={g}>
              <button type="button" onClick={() => setSel(g)} aria-pressed={sel === g} className="w-full min-h-[44px] rounded-[10px] border border-line px-3 py-2 text-left hover:border-line-strong">
                <span className="flex justify-between text-[14px] text-text-dark"><span>{g}</span><span>{total(g).toLocaleString('en-US')}{missing(g) ? ` · ${missing(g)} missing` : ''}</span></span>
                <span aria-hidden className="mt-1.5 block h-2 rounded-full bg-violet-bright/70" style={{ width: `${(total(g) / max) * 100}%` }} />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13.5px] text-text-dark-muted">Select a bar to see the records behind it. Missing values are counted as missing, not as zero.</p>
      </Panel>
      <Panel title={sel ? `Records behind “${sel}”` : 'Records'}>
        {!sel ? <p className="text-[14px] text-text-dark-muted">Nothing selected.</p> : (
          <table className="w-full text-left text-[14px]" aria-live="polite">
            <thead><tr className="border-b border-line"><th scope="col" className="py-1.5 font-semibold text-text-dark">Record</th><th scope="col" className="py-1.5 font-semibold text-text-dark">Value</th><th scope="col" className="py-1.5 font-semibold text-text-dark">Source</th><th scope="col" className="py-1.5 font-semibold text-text-dark">Date</th></tr></thead>
            <tbody>{cfg.rows.filter((r) => r.group === sel).map((r) => <tr key={r.id} className="border-b border-line last:border-0"><td className="py-1.5 text-text-dark-muted">{r.id}</td><td className={`py-1.5 ${r.value === null ? 'text-amber' : 'text-text-dark'}`}>{r.value === null ? 'missing' : r.value.toLocaleString('en-US')}</td><td className="py-1.5 text-text-dark-muted">{r.source}</td><td className="py-1.5 text-text-dark-muted">{r.date}</td></tr>)}</tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}
