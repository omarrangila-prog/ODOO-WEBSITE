'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, ArrowUpRight } from 'lucide-react';
import { flows, actorLabel, type Actor } from '@/data/playground';
import { Tabs } from '@/components/ui/Tabs';
import { SectionHead, Accent } from '@/components/cinema/SectionHead';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

/** Visual language per actor. The legend below the diagram explains it. */
const actorStyle: Record<Actor, { dot: string; ring: string; chip: string }> = {
  system: { dot: 'bg-cyan', ring: 'ring-cyan/40', chip: 'border-cyan/40 text-cyan' },
  ai: { dot: 'bg-violet-bright', ring: 'ring-violet-bright/40', chip: 'border-violet-bright/40 text-violet-bright' },
  human: { dot: 'bg-green', ring: 'ring-green/40', chip: 'border-green/40 text-green' },
};

const STEP_MS = 1900;

/**
 * Signature experience: the connected-workflow playground.
 *
 * Four real workflows, stepped through one node at a time. Each node names
 * its actor — System, AI or Person — because the honest claim is not "AI runs
 * your business" but "automation does the moving, a person still decides".
 *
 * Deliberate behaviour:
 *  - Nothing plays until the visitor presses play. No autoplay, so it never
 *    competes with reading and costs nothing on load.
 *  - Clicking any node selects it and stops playback: exploring beats watching.
 *  - Every node is a real <button> in a tablist-independent list, so keyboard
 *    and screen-reader users get the same content.
 *  - The active step's explanation is rendered in an aria-live region.
 *  - Reduced motion disables the timer entirely; the content stays navigable.
 */
export function SystemsPlayground() {
  const [activeFlow, setActiveFlow] = useState(flows[0]!.id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const flow = flows.find((f) => f.id === activeFlow) ?? flows[0]!;
  const total = flow.steps.length;

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  // Advance while playing; stop at the end rather than looping forever.
  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPlaying(false);
      return;
    }
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
  }, [playing, total]);

  // Switching workflow resets the walkthrough.
  function selectFlow(id: string) {
    stop();
    setActiveFlow(id);
    setStep(0);
    track('playground_flow_selected', { flow: id });
  }

  function selectStep(i: number) {
    stop();
    setStep(i);
  }

  const current = flow.steps[step]!;

  return (
    <section id="playground" className="theme-dark grain relative overflow-hidden bay-sm scroll-mt-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 radial-core opacity-60"
        aria-hidden
      />

      <div className="shell relative">
        <SectionHead
          index="08"
          label="Interactive systems"
          title={
            <>
              See what happens when your <Accent>systems talk.</Accent>
            </>
          }
          lede="Four workflows we build, step by step. Notice which steps a machine performs and which still belong to a person: that line is the whole design."
          titleClassName="!text-[clamp(34px,4.8vw,78px)]"
        />

        <div className="mt-12">
          <Tabs
            tabs={flows.map((f) => ({ id: f.id, label: f.label }))}
            active={activeFlow}
            onChange={selectFlow}
          >
            {() => (
              <div className="mt-10">
                <h3 className="font-heading text-[clamp(20px,2.3vw,28px)] font-semibold leading-snug tracking-[-0.02em] text-text-dark">
                  {flow.title}
                </h3>{' '}
                <p className="mt-4 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-text-dark-muted">
                  {flow.summary}
                </p>

                {/* Node rail */}
                <ol className="mt-10 flex flex-wrap items-stretch gap-2.5">
                  {flow.steps.map((s, i) => {
                    const isActive = i === step;
                    const isPast = i < step;
                    const st = actorStyle[s.actor];
                    return (
                      <li key={s.id} className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => selectStep(i)}
                          aria-current={isActive ? 'step' : undefined}
                          className={cn(
                            'group flex min-h-[44px] items-center gap-2.5 rounded-control border px-3.5 py-2.5 text-left transition-all duration-200 ease-premium',
                            isActive
                              ? cn('border-transparent bg-white/[0.07] ring-2', st.ring)
                              : isPast
                                ? 'border-line-strong bg-white/[0.04]'
                                : 'border-line bg-white/[0.02] hover:border-line-strong hover:bg-white/[0.04]',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors',
                              isActive || isPast ? st.dot : 'bg-white/10',
                            )}
                            aria-hidden
                          >
                            <s.icon
                              className={cn('h-[15px] w-[15px]', isActive || isPast ? 'text-midnight' : 'text-text-dark-muted')}
                            />
                          </span>
                          <span className="whitespace-nowrap text-[14px] font-medium text-text-dark">
                            {s.label}
                          </span>
                          <span className="sr-only"> &mdash; performed by {actorLabel[s.actor]}</span>
                        </button>
                        {i < total - 1 && (
                          <span
                            className={cn('h-px w-5 transition-colors', isPast ? 'bg-violet-bright/60' : 'bg-line')}
                            aria-hidden
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>

                {/* Controls */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (playing) {
                        stop();
                      } else {
                        if (step >= total - 1) setStep(0);
                        setPlaying(true);
                        track('playground_played', { flow: flow.id });
                      }
                    }}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-line-strong bg-white/[0.04] px-4 text-[15px] font-medium text-text-dark transition-colors hover:bg-white/[0.07]"
                  >
                    {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                    {playing ? 'Pause' : step >= total - 1 ? 'Replay walkthrough' : 'Play walkthrough'}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStep(0)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-control px-3 text-[15px] font-medium text-text-dark-muted transition-colors hover:text-text-dark"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Reset
                  </button>
                  <span className="ml-auto text-[14px] text-text-dark-muted">
                    Step {step + 1} of {total}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#6a3df0,#8247f5)] transition-[width] duration-500 ease-premium motion-reduce:transition-none"
                    style={{ width: `${((step + 1) / total) * 100}%` }}
                    aria-hidden
                  />
                </div>

                {/* Active step explanation */}
                <div
                  className="mt-8 rounded-editorial border border-line bg-white/[0.03] p-6 sm:p-8"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn('rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]', actorStyle[current.actor].chip)}>
                      {actorLabel[current.actor]}
                    </span>
                    <h4 className="font-heading text-[19px] font-semibold tracking-[-0.015em] text-text-dark">
                      {current.label}
                    </h4>
                  </div>{' '}
                  <p className="mt-3 max-w-[var(--reading-width)] text-[16px] leading-relaxed text-text-dark-muted">
                    {current.detail}
                  </p>
                </div>

                {/* Legend + honesty note + route onward */}
                <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {(['system', 'ai', 'human'] as Actor[]).map((a) => (
                      <li key={a} className="flex items-center gap-2 text-[14px] text-text-dark-muted">
                        <span className={cn('h-2.5 w-2.5 rounded-full', actorStyle[a].dot)} aria-hidden />
                        {actorLabel[a]}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={flow.href}
                    className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-violet-bright"
                  >
                    {flow.ctaLabel}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>

                <p className="mt-5 text-[14px] leading-relaxed text-text-dark-muted/80">
                  Illustrative workflow patterns, not a recording of one client&rsquo;s system. The
                  steps reflect how we build these integrations; the specific modules and
                  approvals are agreed per project.
                </p>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
