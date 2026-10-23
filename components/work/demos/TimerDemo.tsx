'use client';

import { useEffect, useMemo, useReducer, useState } from 'react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { DemoFrame, demo } from './DemoFrame';

/**
 * A working tournament desk: a two-player game clock, the round's pairings,
 * result entry and a live leaderboard. Players, tables and scores are invented.
 */

const START = 25 * 60; // seconds per player
const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
const tables = [
  { id: 1, a: 'Player 1', b: 'Player 2' },
  { id: 2, a: 'Player 3', b: 'Player 4' },
  { id: 3, a: 'Player 5', b: 'Player 6' },
];

type Outcome = 'a' | 'b' | 'draw';
interface State {
  left: [number, number];
  turn: 0 | 1 | null; // whose clock is running; null = stopped
  results: Record<number, Outcome>;
  here: Record<string, boolean>;
}
type Action =
  | { type: 'tick' }
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'switch' }
  | { type: 'result'; table: number; outcome: Outcome | null }
  | { type: 'here'; player: string }
  | { type: 'reset' };

const initial: State = { left: [START, START], turn: null, results: {}, here: Object.fromEntries(players.map((p) => [p, true])) };

function reduce(s: State, a: Action): State {
  switch (a.type) {
    case 'tick': {
      if (s.turn === null) return s;
      const left: [number, number] = [...s.left];
      left[s.turn] = Math.max(0, left[s.turn] - 1);
      return { ...s, left, turn: left[s.turn] === 0 ? null : s.turn };
    }
    case 'start':
      return { ...s, turn: s.turn ?? 0 };
    case 'pause':
      return { ...s, turn: null };
    case 'switch':
      return s.turn === null ? { ...s, turn: 0 } : { ...s, turn: s.turn === 0 ? 1 : 0 };
    case 'result': {
      const results = { ...s.results };
      if (a.outcome) results[a.table] = a.outcome;
      else delete results[a.table];
      return { ...s, results };
    }
    case 'here':
      return { ...s, here: { ...s.here, [a.player]: !s.here[a.player] } };
    case 'reset':
      return initial;
  }
}

const fmt = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

export function TimerDemo() {
  const [s, dispatch] = useReducer(reduce, initial);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (s.turn === null) return;
    const id = window.setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => window.clearInterval(id);
  }, [s.turn]);

  const board = useMemo(() => {
    const rows = players.map((p) => ({ name: p, played: 0, points: 0 }));
    const row = (n: string) => rows.find((r) => r.name === n)!;
    for (const t of tables) {
      const o = s.results[t.id];
      if (!o) continue;
      row(t.a).played++;
      row(t.b).played++;
      if (o === 'a') row(t.a).points += 1;
      else if (o === 'b') row(t.b).points += 1;
      else {
        row(t.a).points += 0.5;
        row(t.b).points += 0.5;
      }
    }
    return rows
      .filter((r) => s.here[r.name])
      .sort((x, y) => y.points - x.points || x.name.localeCompare(y.name, undefined, { numeric: true }));
  }, [s.results, s.here]);

  const running = s.turn !== null;
  const out = s.left[0] === 0 ? 'Player 1' : s.left[1] === 0 ? 'Player 2' : null;

  function act(a: Action, note?: string) {
    dispatch(a);
    if (note) setAnnounce(note);
    track('demo_interacted', { demo: 'timer', action: a.type });
  }

  return (
    <DemoFrame
      title="Tournament desk"
      onReset={() => {
        dispatch({ type: 'reset' });
        setAnnounce('Demonstration reset.');
        track('demo_reset', { demo: 'timer' });
      }}
    >
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="grid gap-4">
          <div className={demo.card}>
            <p className={demo.label}>Table 1 game clock</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => (s.turn === i ? act({ type: 'switch' }, `Clock passed to Player ${i === 0 ? 2 : 1}.`) : act({ type: 'start' }))}
                  aria-label={`Player ${i + 1}, ${fmt(s.left[i]!)} left${s.turn === i ? ', clock running. Press to pass the clock.' : ''}`}
                  className={cn(
                    'rounded-[14px] border p-4 text-left transition-colors',
                    s.turn === i ? 'border-violet-bright/70 bg-violet/[0.14]' : 'border-line bg-white/[0.02] hover:border-line-strong',
                  )}
                >
                  <span className="block text-[13px] text-text-dark-muted">Player {i + 1}</span>
                  <span aria-hidden className={cn('mt-1 block font-heading text-[clamp(30px,4vw,44px)] font-semibold leading-none tabular-nums', s.left[i] === 0 ? 'text-amber' : 'text-white')}>
                    {fmt(s.left[i]!)}
                  </span>
                  <span aria-hidden className="mt-2 block text-[12.5px] text-text-dark-muted">{s.turn === i ? 'Running. Tap to pass.' : 'Tap to start this clock'}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className={demo.btn} onClick={() => act(running ? { type: 'pause' } : { type: 'start' }, running ? 'Clock paused.' : 'Clock started.')} disabled={Boolean(out)}>
                {running ? 'Pause' : 'Start'}
              </button>
              <button type="button" className={demo.btnGhost} onClick={() => act({ type: 'switch' }, 'Clock passed.')} disabled={Boolean(out)}>
                Pass the clock
              </button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-[20px] text-[13px] text-text-dark-muted">
              {out ? `${out} is out of time. A director would record the result.` : announce}
            </p>
          </div>

          <div className={demo.card}>
            <p className={demo.label}>Round 1 pairings</p>
            <ul className="mt-3 divide-y divide-line">
              {tables.map((t) => {
                const o = s.results[t.id];
                const off = !s.here[t.a] || !s.here[t.b];
                return (
                  <li key={t.id} className="py-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[14.5px] text-text-dark">
                        <span className="mr-2 text-text-dark-muted">Table {t.id}</span>
                        {t.a} <span className="text-text-dark-muted">v</span> {t.b}
                      </span>
                      {off ? (
                        <span className="text-[12.5px] text-amber">A player is not checked in</span>
                      ) : (
                        <span role="group" aria-label={`Result for table ${t.id}`} className="flex gap-1.5">
                          {([['a', `${t.a} won`], ['draw', 'Draw'], ['b', `${t.b} won`]] as [Outcome, string][]).map(([k, label]) => (
                            <button
                              key={k}
                              type="button"
                              aria-pressed={o === k}
                              onClick={() => act({ type: 'result', table: t.id, outcome: o === k ? null : k }, o === k ? `Result cleared for table ${t.id}.` : `Table ${t.id}: ${label}.`)}
                              className={cn('min-h-[36px] rounded-full border px-2.5 text-[12.5px] transition-colors', o === k ? 'border-violet-bright/70 bg-violet/[0.18] text-white' : 'border-line text-text-dark-muted hover:border-line-strong hover:text-white')}
                            >
                              {k === 'a' ? t.a.replace('Player ', 'P') : k === 'b' ? t.b.replace('Player ', 'P') : 'Draw'}
                              <span className="sr-only"> ({label})</span>
                            </button>
                          ))}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className={demo.card}>
            <p className={demo.label}>Live leaderboard</p>
            <table className="mt-3 w-full text-left text-[14px]">
              <caption className="sr-only">Leaderboard, sorted by points</caption>
              <thead>
                <tr className="text-[12px] text-text-dark-muted">
                  <th scope="col" className="w-8 pb-1.5 font-medium">#</th>
                  <th scope="col" className="pb-1.5 font-medium">Player</th>
                  <th scope="col" className="pb-1.5 text-right font-medium">Played</th>
                  <th scope="col" className="pb-1.5 text-right font-medium">Points</th>
                </tr>
              </thead>
              <tbody>
                {board.map((r, i) => (
                  <tr key={r.name} className="border-t border-line">
                    <td className="py-1.5 text-text-dark-muted">{i + 1}</td>
                    <td className="py-1.5 text-text-dark">{r.name}</td>
                    <td className="py-1.5 text-right text-text-dark-muted">{r.played}</td>
                    <td className="py-1.5 text-right font-semibold text-white">{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[12.5px] text-text-dark-muted">A win is 1 point and a draw 0.5. Enter a result and the order updates.</p>
          </div>

          <div className={demo.card}>
            <p className={demo.label}>Check-in</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {players.map((p) => (
                <li key={p}>
                  <label className="flex min-h-[40px] cursor-pointer items-center gap-2.5 rounded-control border border-line px-3 text-[14px] text-text-dark has-[:checked]:border-violet-bright/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-violet-bright">
                    <input type="checkbox" checked={s.here[p]} onChange={() => act({ type: 'here', player: p })} className="h-4 w-4 accent-violet-bright" />
                    {p}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
