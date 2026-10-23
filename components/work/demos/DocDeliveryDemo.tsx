'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { DemoFrame, demo } from './DemoFrame';

/**
 * A working walk-through of document delivery to WhatsApp: a command in the
 * business software enters a job queue, a document API renders the file, and the
 * customer receives it. Nothing is sent anywhere; the stages are simulated with
 * short timers and the document, company and customer are invented.
 */

const docs = [
  { id: 'invoice', label: 'Invoice', file: 'Invoice SAMPLE-0001.pdf', text: 'Your invoice is attached. Total 12,500.00.' },
  { id: 'statement', label: 'Statement', file: 'Statement SAMPLE-0001.pdf', text: 'Your account statement is attached.' },
  { id: 'receipt', label: 'Receipt', file: 'Receipt SAMPLE-0001.pdf', text: 'Payment received. Your receipt is attached.' },
  { id: 'po', label: 'Purchase order', file: 'PO SAMPLE-0001.pdf', text: 'Purchase order attached for your confirmation.' },
  { id: 'confirmation', label: 'Order confirmation', file: 'Order SAMPLE-0001.pdf', text: 'Your order is confirmed. Details attached.' },
  { id: 'reminder', label: 'Payment reminder', file: 'Reminder SAMPLE-0001.pdf', text: 'A gentle reminder: one invoice is due. Copy attached.' },
] as const;

const stages = [
  { id: 'queued', label: 'Queued', detail: 'The software writes a job to the queue.' },
  { id: 'rendering', label: 'Rendering', detail: 'The document API builds the PDF.' },
  { id: 'sending', label: 'Sending', detail: 'The file is handed to WhatsApp.' },
  { id: 'delivered', label: 'Delivered', detail: 'The customer has it.' },
] as const;
type StageId = (typeof stages)[number]['id'];

interface Job {
  n: number;
  doc: (typeof docs)[number];
  stage: StageId;
}

export function DocDeliveryDemo() {
  const [picked, setPicked] = useState<(typeof docs)[number]['id']>('invoice');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [announce, setAnnounce] = useState('');
  const timers = useRef<number[]>([]);
  const counter = useRef(0);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function send() {
    const doc = docs.find((d) => d.id === picked)!;
    const n = ++counter.current;
    setJobs((j) => [{ n, doc, stage: 'queued' as StageId }, ...j].slice(0, 4));
    setAnnounce(`${doc.label} queued.`);
    track('demo_interacted', { demo: 'delivery', action: 'send' });
    stages.slice(1).forEach((st, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setJobs((j) => j.map((x) => (x.n === n ? { ...x, stage: st.id } : x)));
          setAnnounce(`${doc.label}: ${st.label.toLowerCase()}.`);
        }, (i + 1) * 800),
      );
    });
  }

  function reset() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    counter.current = 0;
    setJobs([]);
    setAnnounce('Demonstration reset.');
    setPicked('invoice');
    track('demo_reset', { demo: 'delivery' });
  }

  const latest = jobs[0];
  const delivered = jobs.filter((j) => j.stage === 'delivered');

  return (
    <DemoFrame title="Document delivery" onReset={reset}>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid content-start gap-4">
          <div className={demo.card}>
            <p className={demo.label}>1 · In the business software</p>
            <fieldset className="mt-3">
              <legend className="sr-only">Document to send</legend>
              <div className="flex flex-wrap gap-2">
                {docs.map((d) => (
                  <label key={d.id} className={cn(demo.chip, 'cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-violet-bright', picked === d.id && 'border-violet-bright/60 bg-violet/[0.12] text-white')}>
                    <input type="radio" name="doc-kind" value={d.id} checked={picked === d.id} onChange={() => setPicked(d.id)} className="sr-only" />
                    {d.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="button" className={cn(demo.btn, 'mt-3')} onClick={send}>
              Send to customer on WhatsApp
            </button>
            <p className="mt-2 text-[12.5px] text-text-dark-muted">Nothing is sent. This runs in your browser with sample data.</p>
          </div>

          <div className={demo.card}>
            <p className={demo.label}>2 · The job queue</p>
            {jobs.length === 0 ? (
              <p className="mt-3 text-[14px] text-text-dark-muted">No jobs yet. Send a document and watch it move through the stages.</p>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {jobs.map((j) => {
                  const at = stages.findIndex((s) => s.id === j.stage);
                  return (
                    <li key={j.n} className="py-2.5">
                      <div className="flex items-baseline justify-between gap-3 text-[14px]">
                        <span className="text-text-dark">
                          <span className="mr-2 text-text-dark-muted">Job {j.n}</span>
                          {j.doc.label}
                        </span>
                        <span className={cn('text-[12.5px]', j.stage === 'delivered' ? 'text-green' : 'text-violet-bright')}>{stages[at]!.label}</span>
                      </div>
                      <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden>
                        {stages.map((s, i) => (
                          <span key={s.id} className={cn('h-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none', i <= at ? (j.stage === 'delivered' ? 'bg-green' : 'bg-violet-bright') : 'bg-white/[0.08]')} />
                        ))}
                      </div>
                      <p className="mt-1.5 text-[12.5px] text-text-dark-muted">{stages[at]!.detail}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className={cn(demo.card, 'flex flex-col')}>
          <p className={demo.label}>3 · On the customer&rsquo;s phone</p>
          <div className="mx-auto mt-3 flex w-full max-w-[300px] flex-1 flex-col rounded-[22px] border border-line-strong bg-[#0a0a10] p-3">
            <div className="flex items-center gap-2 border-b border-line pb-2.5">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-green/20 text-[12px] font-semibold text-green">ST</span>
              <span>
                <span className="block text-[13.5px] font-medium text-text-dark">Sample Traders</span>
                <span className="block text-[11.5px] text-text-dark-muted">Business account</span>
              </span>
            </div>
            <div className="mt-3 flex min-h-[170px] flex-1 flex-col justify-end gap-2" aria-live="off">
              {delivered.length === 0 && (
                <p className="self-center text-center text-[13px] text-text-dark-muted">
                  {latest ? 'The message arrives once the file is delivered.' : 'No messages yet.'}
                </p>
              )}
              {[...delivered].reverse().slice(-2).map((j) => (
                <div key={j.n} className="max-w-[92%] self-start rounded-[14px] rounded-tl-sm border border-line bg-white/[0.05] p-2.5">
                  <div className="flex items-center gap-2.5 rounded-[10px] bg-black/30 p-2.5">
                    <FileText className="h-6 w-6 shrink-0 text-green" aria-hidden />
                    <span className="min-w-0 text-[12.5px] leading-tight text-text-dark">{j.doc.file}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-text-dark">{j.doc.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p aria-live="polite" className="sr-only">{announce}</p>
        </div>
      </div>
    </DemoFrame>
  );
}
