'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { flows, actorLabel, type Actor } from '@/data/playground';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

/** Flows shown on the homepage, in order. The fourth stays available on the Odoo pages. */
const SHOWN = ['ai-whatsapp', 'sales-inventory', 'import-export'];
const demoFlows = SHOWN.map((id) => flows.find((f) => f.id === id)).filter((f): f is NonNullable<typeof f> => Boolean(f));

const STEP_MS = 2200;

const actorStyle: Record<Actor, { dot: string; chip: string; text: string }> = {
  system: { dot: 'bg-cyan', chip: 'border-cyan/40 text-cyan', text: 'text-cyan' },
  ai: { dot: 'bg-violet-bright', chip: 'border-violet-bright/40 text-violet-bright', text: 'text-violet-bright' },
  human: { dot: 'bg-green', chip: 'border-green/40 text-green', text: 'text-green' },
};

/**
 * Homepage section 6: one workflow at a time, stepped through.
 *
 * It is a demonstration of a pattern, and says so next to the heading rather
 * than in a footnote. The point it makes is where a machine acts and where a
 * person still decides, not that software runs the business unattended.
 *
 * Behaviour that matters:
 *  - Nothing moves until the visitor presses Play. Pause, Back, Next and Reset
 *    are always there, so the sequence can be driven one step at a time with no
 *    timer at all. With reduced motion the timer is disabled and the same
 *    controls still work.
 *  - The whole sequence is also available as plain text below the demo, and is
 *    in the server-rendered HTML.
 *  - The travelling marker uses transform only, and only moves on a step change.
 */
export function WorkflowDemo() {
  const [flowId, setFlowId] = useState(demoFlows[0]!.id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const flow = demoFlows.find((f) => f.id === flowId) ?? demoFlows[0]!;
  const total = flow.steps.length;
  const current = flow.steps[step]!;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= total) {
          if (timer.current) clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [playing, total, reduced]);

  function selectFlow(i: number, focus = false) {
    const f = demoFlows[i];
    if (!f) return;
    stop();
    setFlowId(f.id);
    setStep(0);
    if (focus) tabRefs.current[i]?.focus();
    track('playground_flow_selected', { flow: f.id });
  }

  function onTabKey(e: KeyboardEvent, i: number) {
    const n = demoFlows.length;
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    selectFlow(next, true);
  }

  function togglePlay() {
    if (playing) {
      stop();
      track('playground_paused', { flow: flow.id });
      return;
    }
    if (step >= total - 1) setStep(0);
    setPlaying(true);
    track('playground_played', { flow: flow.id });
  }

  function reset() {
    stop();
    setStep(0);
    track('playground_reset', { flow: flow.id });
  }

  function go(delta: number) {
    stop();
    setStep((s) => Math.min(total - 1, Math.max(0, s + delta)));
  }

  const ctl =
    'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 text-[15px] font-medium text-text-dark transition-colors hover:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-40';

  return (
    <div>
      <div role="tablist" aria-label="Workflow examples" className="flex flex-wrap gap-2">
        {demoFlows.map((f, i) => {
          const selected = f.id === flowId;
          return (
            <button
              key={f.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`flow-tab-${f.id}`}
              aria-selected={selected}
              aria-controls="flow-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => selectFlow(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                'min-h-[44px] rounded-full border px-4 text-[15px] font-medium transition-colors duration-200',
                selected ? 'border-violet-bright/60 bg-violet/[0.14] text-white' : 'border-line text-text-dark-muted hover:border-line-strong hover:text-white',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${flowId}`} className="mt-8 rounded-[24px] border border-line bg-white/[0.02] p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
          <h3 className="max-w-[40ch] font-heading text-[clamp(20px,2vw,28px)] font-semibold leading-snug tracking-[-0.025em] text-white">{flow.title}</h3>
          <span className="shrink-0 rounded-full border border-amber/40 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-amber">
            Illustrative
          </span>
        </div>
        <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-text-dark-muted">{flow.summary}</p>

        {/* Track: a line, the progress along it, and the marker that travels with the current step. */}
        <div className="relative mt-8 hidden md:block" aria-hidden>
          <div className="relative mx-[calc(50%/var(--n))] h-px bg-line-strong" style={{ ['--n' as string]: total } as React.CSSProperties}>
            <div
              className="absolute left-0 top-0 h-px w-full origin-left bg-violet-bright transition-transform duration-700 ease-premium motion-reduce:transition-none"
              style={{ transform: `scaleX(${total > 1 ? step / (total - 1) : 0})` }}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 -top-[7px]" style={{ ['--n' as string]: total } as React.CSSProperties}>
            <div
              className="flex justify-center transition-transform duration-700 ease-premium motion-reduce:transition-none"
              style={{ width: `${100 / total}%`, transform: `translateX(${step * 100}%)` }}
            >
              <span className={cn('h-[15px] w-[15px] rounded-full ring-4 ring-midnight', actorStyle[current.actor].dot)} />
            </div>
          </div>
        </div>

        <ol className="mt-4 grid gap-2 md:grid-flow-col md:auto-cols-fr md:gap-0">
          {flow.steps.map((s, i) => {
            const isActive = i === step;
            const isPast = i < step;
            return (
              <li key={s.id} className="md:px-1.5">
                <button
                  type="button"
                  onClick={() => {
                    stop();
                    setStep(i);
                  }}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'flex min-h-[48px] w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors duration-200 md:flex-col md:items-start md:gap-2',
                    isActive ? 'border-violet-bright/60 bg-violet/[0.12]' : isPast ? 'border-line-strong bg-white/[0.04]' : 'border-line hover:border-line-strong',
                  )}
                >
                  <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors', isActive || isPast ? actorStyle[s.actor].dot : 'bg-white/10')} aria-hidden>
                    <s.icon className={cn('h-4 w-4', isActive || isPast ? 'text-midnight' : 'text-text-dark-muted')} />
                  </span>
                  <span className={cn('text-[14px] font-medium leading-snug', isActive ? 'text-white' : 'text-text-dark')}>
                    {s.label}
                  </span>
                  <span className="sr-only"> ({actorLabel[s.actor]})</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {!reduced && (
            <button type="button" onClick={togglePlay} className={ctl} aria-pressed={playing}>
              {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
              {playing ? 'Pause' : step >= total - 1 && step > 0 ? 'Replay' : 'Play'}
            </button>
          )}
          <button type="button" onClick={() => go(-1)} disabled={step === 0} className={ctl}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <button type="button" onClick={() => go(1)} disabled={step >= total - 1} className={ctl}>
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          <button type="button" onClick={reset} className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-[15px] font-medium text-text-dark-muted transition-colors hover:text-white">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </button>
          <span className="ml-auto text-[14px] text-text-dark-muted">
            Step {step + 1} of {total}
          </span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-midnight/60 p-5" aria-live="polite" aria-atomic="true">
            <p className="flex flex-wrap items-center gap-3">
              <span className={cn('rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]', actorStyle[current.actor].chip)}>
                {actorLabel[current.actor]}
              </span>
              <span className="font-heading text-[18px] font-semibold tracking-[-0.015em] text-white">{current.label}</span>
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-text-dark">{current.detail}</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <p className="band-eyebrow !text-[11px]">Why it matters</p>
            <p className="mt-3 text-[16px] leading-relaxed text-text-dark">{flow.value}</p>
            <Link href={flow.href} className="link-editorial mt-4 inline-block text-[15px]">
              {flow.ctaLabel} <span aria-hidden className="arrow">↗</span>
            </Link>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Who performs each step">
          {(['system', 'ai', 'human'] as Actor[]).map((a) => (
            <li key={a} className="flex items-center gap-2 text-[14px] text-text-dark-muted">
              <span className={cn('h-2.5 w-2.5 rounded-full', actorStyle[a].dot)} aria-hidden />
              {actorLabel[a]}
            </li>
          ))}
        </ul>

        {/* The same sequence as plain text. */}
        <details className="mt-5 rounded-2xl border border-line">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 text-[15px] font-medium text-text-dark [&::-webkit-details-marker]:hidden">
            Read the whole sequence as text
            <span aria-hidden className="text-text-dark-muted">+</span>
          </summary>
          <ol className="space-y-3 border-t border-line px-4 py-4">
            {flow.steps.map((s, i) => (
              <li key={s.id} className="text-[15px] leading-relaxed text-text-dark-muted">
                <span className="font-semibold text-text-dark">
                  {i + 1}. {s.label}
                </span>{' '}
                <span className={cn('text-[13px]', actorStyle[s.actor].text)}>({actorLabel[s.actor]})</span>{' '}
                {s.detail}
              </li>
            ))}
          </ol>
        </details>

        <p className="mt-4 text-[13px] leading-relaxed text-text-dark-muted">
          An illustrative workflow pattern, not a recording of one client&rsquo;s system. The steps reflect how we build
          these integrations; the modules, rules and approvals are agreed per project.
        </p>
      </div>
    </div>
  );
}
