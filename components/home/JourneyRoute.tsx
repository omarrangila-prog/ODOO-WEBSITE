'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { journeyStages } from '@/data/journey';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Moving route: a vertical path draws itself as you scroll, and each checkpoint
 * activates as the moving marker reaches it. Detail updates alongside.
 * Also fully operable by clicking checkpoints (keyboard-accessible).
 */
export function JourneyRoute() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // When the user clicks a checkpoint, pause scroll-driven selection briefly so
  // their choice isn't immediately overridden by scrolling.
  const lockUntil = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    if (Date.now() < lockUntil.current) return; // respect a recent manual click
    const idx = Math.min(journeyStages.length - 1, Math.max(0, Math.floor(v * journeyStages.length)));
    setActive((prev) => (prev !== idx ? idx : prev));
  });

  function pick(idx: number) {
    lockUntil.current = Date.now() + 1200;
    setActive(idx);
  }

  const stage = journeyStages[active]!;

  return (
    <section id="journey" className="theme-dark grain relative overflow-hidden bay">
      <div className="pointer-events-none absolute inset-0 arch-grid opacity-25" aria-hidden />
      <div className="shell relative">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">The Route</p>
          <TextGap />
          <h2 className="display-2">
            Your Route to a{' '}
            <span className="signal-text">Working Odoo System.</span>
          </h2>{' '}
          <p className="lede mt-6">
            A calm, controlled path from first conversation to a live, supported system&mdash;with a
            clear deliverable at every checkpoint.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* The route */}
          <div className="relative">
            {/* base line — aligned to the circle centre (8px pl + 27px radius) */}
            <span className="absolute left-[35px] top-6 bottom-6 w-px bg-line" aria-hidden />
            {/* progress line */}
            <motion.span
              className="absolute left-[35px] top-6 w-px origin-top bg-[linear-gradient(180deg,#7C4DFF,#E947C6)]"
              style={{ bottom: 24, scaleY: reduce ? 1 : lineScale }}
              aria-hidden
            />
            <ol>
            {journeyStages.map((s, idx) => {
              const on = idx === active;
              const done = idx < active;
              return (
                <li key={s.n} className="relative">
                  <button
                    type="button"
                    onClick={() => pick(idx)}
                    aria-pressed={on}
                    aria-label={`Stage ${s.n}: ${s.title}`}
                    className={cn(
                      'group flex w-full items-center gap-5 rounded-2xl border py-3 pl-2 pr-4 text-left transition-all duration-300',
                      on ? 'border-violet-bright/30 bg-white/[0.04]' : 'border-transparent hover:bg-white/[0.02]',
                    )}
                  >
                    <span
                      className={cn(
                        'relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border font-heading text-[15px] font-semibold transition-all duration-300',
                        on
                          ? 'border-violet-bright bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white shadow-cta scale-105'
                          : done
                            ? 'border-green/40 bg-green/10 text-green'
                            : 'border-line bg-graphite text-text-dark-muted group-hover:border-line-strong group-hover:text-text-dark',
                      )}
                      aria-hidden
                    >
                      {done ? <Check className="h-5 w-5" /> : s.n}
                    </span>{' '}
                    <span className="min-w-0 flex-1">
                      <span className={cn('block font-heading text-[17px] font-medium transition-colors', on ? 'text-text-dark' : 'text-text-dark-muted group-hover:text-text-dark')}>
                        {s.title}
                      </span>{' '}
                      <span className="mt-0.5 flex items-center gap-1.5 text-[13px] text-text-dark-muted">
                        <span className={cn('h-1 w-1 rounded-full', on ? 'bg-violet-bright' : 'bg-text-dark-muted/40')} aria-hidden />
                        {s.deliverable}
                      </span>
                    </span>
                    <ArrowRight className={cn('h-4 w-4 shrink-0 transition-all', on ? 'text-violet-bright opacity-100' : 'opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0')} aria-hidden />
                  </button>
                </li>
              );
            })}
            </ol>
          </div>

          {/* Active detail (sticky) */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <div className="glass relative overflow-hidden rounded-editorial p-8 shadow-float sm:p-10">
              <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 radial-core opacity-70" aria-hidden />
              <div className="relative flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted">
                  Stage {stage.n} of {journeyStages.length}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-bright/30 bg-violet/[0.08] px-3 py-1 text-[11px] font-semibold text-violet-bright">
                  <span className="text-text-dark-muted">Output</span>{' '}
                  {stage.deliverable}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.n}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="mt-4 block font-heading text-[clamp(4rem,9vw,7rem)] font-semibold leading-none tracking-[-0.05em] text-text-dark/10">
                    {String(stage.n).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.035em]">
                    {stage.title}
                  </h3>{' '}
                  <p className="lede mt-4">{stage.purpose}</p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">What happens</p>
                      <TextGap />
                      <ul className="mt-3 space-y-2">
                        {stage.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-[14px] text-text-dark-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-bright" aria-hidden />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">Your part</p>
                      <TextGap />
                      <ul className="mt-3 space-y-2">
                        {stage.clientRole.map((c) => (
                          <li key={c} className="flex items-start gap-2.5 text-[14px] text-text-dark-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" aria-hidden />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
