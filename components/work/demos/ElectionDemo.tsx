'use client';

import { useReducer, useState } from 'react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { DemoFrame, demo } from './DemoFrame';

/**
 * A working walk-through of an association election: register check, candidates,
 * polling day and results, with what each role may open. Every name, number and
 * rule here is invented for the demonstration.
 */

type Step = 'eligibility' | 'candidates' | 'polling' | 'results';
type Role = 'admin' | 'officer' | 'observer';

const steps: { id: Step; label: string }[] = [
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'polling', label: 'Polling day' },
  { id: 'results', label: 'Results' },
];

const roles: { id: Role; label: string; sees: Step[]; blurb: string }[] = [
  { id: 'admin', label: 'Administrator', sees: ['eligibility', 'candidates', 'polling', 'results'], blurb: 'Sees every step.' },
  { id: 'officer', label: 'Polling officer', sees: ['eligibility', 'polling'], blurb: 'Checks members and issues ballots. Cannot see results.' },
  { id: 'observer', label: 'Observer', sees: ['candidates', 'results'], blurb: 'Reads the candidate list and the results. Cannot change anything.' },
];

const register = [
  { id: 'A-101', ok: true },
  { id: 'A-102', ok: true },
  { id: 'A-103', ok: true },
  { id: 'A-104', ok: true },
  { id: 'A-105', ok: true },
  { id: 'A-106', ok: false },
  { id: 'A-107', ok: true },
  { id: 'A-108', ok: true },
];
const eligibleCount = register.filter((m) => m.ok).length;
const candidates = [
  { id: 'c1', name: 'Candidate 1' },
  { id: 'c2', name: 'Candidate 2' },
  { id: 'c3', name: 'Candidate 3' },
];

type Verdict = { kind: 'ok' | 'no'; text: string };

function check(id: string, votes: Record<string, string>): Verdict {
  const m = register.find((x) => x.id === id.trim().toUpperCase());
  if (!m) return { kind: 'no', text: 'Not on the register. No ballot can be issued.' };
  if (!m.ok) return { kind: 'no', text: 'On the register but not eligible to vote in this election.' };
  if (votes[m.id]) return { kind: 'no', text: 'Already voted. A second ballot cannot be issued.' };
  return { kind: 'ok', text: 'Eligible and has not voted.' };
}

interface State {
  votes: Record<string, string>;
  audit: string[];
}
type Action = { type: 'vote'; member: string; candidate: string } | { type: 'log'; text: string } | { type: 'reset' };
const initial: State = { votes: {}, audit: [] };

function reduce(s: State, a: Action): State {
  switch (a.type) {
    case 'vote':
      return {
        votes: { ...s.votes, [a.member]: a.candidate },
        // A secret ballot: the log records that a member voted, never who they voted for.
        audit: [`Ballot cast. ${a.member} marked as voted.`, ...s.audit],
      };
    case 'log':
      return { ...s, audit: [a.text, ...s.audit] };
    case 'reset':
      return initial;
  }
}

export function ElectionDemo() {
  const [state, dispatch] = useReducer(reduce, initial);
  const [role, setRole] = useState<Role>('admin');
  const [step, setStep] = useState<Step>('eligibility');
  const [memberId, setMemberId] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [issued, setIssued] = useState<string | null>(null);
  const [choice, setChoice] = useState('');

  const allowed = roles.find((r) => r.id === role)!.sees;
  const current = allowed.includes(step) ? step : allowed[0]!;
  const cast = Object.keys(state.votes).length;
  const tally = candidates.map((c) => ({ ...c, n: Object.values(state.votes).filter((v) => v === c.id).length }));
  const top = Math.max(1, ...tally.map((t) => t.n));

  function reset() {
    dispatch({ type: 'reset' });
    setMemberId('');
    setVerdict(null);
    setIssued(null);
    setChoice('');
    setRole('admin');
    setStep('eligibility');
    track('demo_reset', { demo: 'election' });
  }

  function runCheck(id: string) {
    setMemberId(id);
    setVerdict(check(id, state.votes));
    setIssued(null);
    track('demo_interacted', { demo: 'election', action: 'check' });
  }

  function issue() {
    const v = check(memberId, state.votes);
    setVerdict(v);
    if (v.kind === 'ok') {
      const id = memberId.trim().toUpperCase();
      setIssued(id);
      dispatch({ type: 'log', text: `Ballot issued to ${id}.` });
    } else {
      setIssued(null);
    }
    track('demo_interacted', { demo: 'election', action: 'issue' });
  }

  function castVote() {
    if (!issued || !choice) return;
    dispatch({ type: 'vote', member: issued, candidate: choice });
    setIssued(null);
    setChoice('');
    setMemberId('');
    setVerdict({ kind: 'ok', text: 'Vote recorded. The ballot is closed.' });
    track('demo_interacted', { demo: 'election', action: 'vote' });
  }

  return (
    <DemoFrame title="Election console" onReset={reset}>
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <label htmlFor="el-role" className={demo.label}>
            Signed in as
          </label>
          <select
            id="el-role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="min-h-[40px] rounded-control border border-line bg-white/[0.04] px-3 text-[14px] text-text-dark"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <span className="text-[13px] text-text-dark-muted">{roles.find((r) => r.id === role)!.blurb}</span>
        </div>

        <div role="tablist" aria-label="Election steps" className="flex flex-wrap gap-2">
          {steps.map((s) => {
            const can = allowed.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={current === s.id}
                aria-controls="el-panel"
                disabled={!can}
                onClick={() => {
                  setStep(s.id);
                  setVerdict(null);
                }}
                className={cn(demo.tab, current === s.id ? demo.tabOn : demo.tabOff, !can && 'cursor-not-allowed opacity-40 hover:border-line hover:text-text-dark-muted')}
              >
                {s.label}
                {!can && <span className="sr-only"> (not available to this role)</span>}
              </button>
            );
          })}
        </div>

        <div id="el-panel" role="tabpanel" className="min-h-[250px]">
          {current === 'eligibility' && (
            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <div className={demo.card}>
                <p className={demo.label}>Check a member</p>
                <form
                  className="mt-3 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    runCheck(memberId);
                  }}
                >
                  <label htmlFor="el-member" className="sr-only">
                    Member number
                  </label>
                  <input
                    id="el-member"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="e.g. A-101"
                    className="min-h-[44px] w-full min-w-0 rounded-control border border-line bg-white/[0.04] px-3 text-[15px] text-text-dark placeholder:text-text-dark-muted/80"
                  />
                  <button type="submit" className={demo.btn}>
                    Check
                  </button>
                </form>
                <p className="mt-3 text-[13px] text-text-dark-muted">Try one:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['A-101', 'A-106', 'Z-999'].map((id) => (
                    <button key={id} type="button" className={demo.chip} onClick={() => runCheck(id)}>
                      {id}
                    </button>
                  ))}
                </div>
                <div aria-live="polite" className="mt-3 min-h-[44px]">
                  {verdict && (
                    <p className={cn('rounded-control border px-3 py-2 text-[14px]', verdict.kind === 'ok' ? 'border-green/40 bg-green/10 text-green' : 'border-amber/40 bg-amber/10 text-amber')}>
                      {verdict.text}
                    </p>
                  )}
                </div>
              </div>
              <div className={demo.card}>
                <p className={demo.label}>Register (sample)</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[14px]">
                  {register.map((m) => (
                    <li key={m.id} className="flex items-center justify-between gap-2 border-b border-line py-1">
                      <span className="text-text-dark">{m.id}</span>
                      <span className={cn('text-[12.5px]', state.votes[m.id] ? 'text-violet-bright' : m.ok ? 'text-text-dark-muted' : 'text-amber')}>
                        {state.votes[m.id] ? 'Voted' : m.ok ? 'Eligible' : 'Not eligible'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {current === 'candidates' && (
            <div className={demo.card}>
              <p className={demo.label}>Candidates standing (sample)</p>
              <ul className="mt-3 divide-y divide-line">
                {candidates.map((c, i) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-3 text-[15px]">
                    <span className="text-text-dark">
                      <span aria-hidden className="mr-3 text-[12px] tracking-[0.12em] text-violet/80">0{i + 1}</span>
                      {c.name}
                    </span>
                    <span className="rounded-full border border-green/40 px-2.5 py-0.5 text-[12.5px] text-green">Approved to stand</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-text-dark-muted">An administrator manages this list. Observers can read it but not edit it.</p>
            </div>
          )}

          {current === 'polling' && (
            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <div className={demo.card}>
                <p className={demo.label}>1 · Identify the member</p>
                <div className="mt-3 flex gap-2">
                  <label htmlFor="el-poll-member" className="sr-only">
                    Member number
                  </label>
                  <input
                    id="el-poll-member"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="e.g. A-102"
                    className="min-h-[44px] w-full min-w-0 rounded-control border border-line bg-white/[0.04] px-3 text-[15px] text-text-dark placeholder:text-text-dark-muted/80"
                  />
                  <button type="button" className={demo.btn} onClick={issue} disabled={!memberId.trim()}>
                    Issue ballot
                  </button>
                </div>
                <div aria-live="polite" className="mt-3 min-h-[44px]">
                  {verdict && (
                    <p className={cn('rounded-control border px-3 py-2 text-[14px]', verdict.kind === 'ok' ? 'border-green/40 bg-green/10 text-green' : 'border-amber/40 bg-amber/10 text-amber')}>
                      {verdict.text}
                    </p>
                  )}
                </div>
                <p className={cn(demo.label, 'mt-4')}>2 · Mark the ballot</p>
                <fieldset className="mt-2" disabled={!issued}>
                  <legend className="sr-only">Choose a candidate</legend>
                  <div className="flex flex-wrap gap-2">
                    {candidates.map((c) => (
                      <label key={c.id} className={cn(demo.chip, 'cursor-pointer', choice === c.id && 'border-violet-bright/60 bg-violet/[0.12] text-white', !issued && 'opacity-40')}>
                        <input type="radio" name="el-choice" value={c.id} checked={choice === c.id} onChange={() => setChoice(c.id)} className="sr-only" />
                        {c.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button type="button" className={cn(demo.btn, 'mt-3')} onClick={castVote} disabled={!issued || !choice}>
                  Cast vote
                </button>
              </div>
              <div className={demo.card}>
                <p className={demo.label}>Audit log</p>
                {state.audit.length === 0 ? (
                  <p className="mt-3 text-[14px] text-text-dark-muted">Nothing yet. Issue a ballot and the log starts.</p>
                ) : (
                  <ol className="mt-3 max-h-[210px] space-y-1.5 overflow-auto text-[13.5px] text-text-dark">
                    {state.audit.map((l, i) => (
                      <li key={`${state.audit.length - i}-${l}`} className="border-b border-line pb-1.5">
                        <span className="mr-2 text-text-dark-muted">#{state.audit.length - i}</span>
                        {l}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          )}

          {current === 'results' && (
            <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
              <div className={demo.card}>
                <p className={demo.label}>Votes counted</p>
                <ul className="mt-3 space-y-3">
                  {tally.map((t) => (
                    <li key={t.id}>
                      <div className="flex items-baseline justify-between text-[15px] text-text-dark">
                        <span>{t.name}</span>
                        <span className="font-heading text-[18px] font-semibold">{t.n}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]" role="img" aria-label={`${t.name}: ${t.n} of ${cast} votes`}>
                        <div className="h-full rounded-full bg-violet-bright/80 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${(t.n / top) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
                {cast === 0 && <p className="mt-4 text-[13px] text-text-dark-muted">No votes yet. Open the Polling day step as an administrator and cast a few.</p>}
              </div>
              <div className={demo.card}>
                <p className={demo.label}>Turnout</p>
                <p className="mt-3 font-heading text-[40px] font-semibold leading-none text-white">
                  {cast}
                  <span className="ml-2 text-[16px] font-medium text-text-dark-muted">of {eligibleCount} eligible</span>
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-text-dark-muted">
                  The register, the votes and the log are separate records, so a count can be checked against the people who voted.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
