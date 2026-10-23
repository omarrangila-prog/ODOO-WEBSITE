'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utilities';

const marks = [
  { n: '01', label: 'Strategy', line: 'From complexity to clarity.' },
  { n: '02', label: 'Engineering', line: 'From workflows to systems.' },
  { n: '03', label: 'Intelligence', line: 'From data to decisions.' },
] as const;

const INTERVAL = 7000;

/**
 * The three numbered markers along the foot of the hero, and the quiet caption
 * at the right edge that follows them. They advance slowly on their own and
 * can be chosen directly. Because moving text must be stoppable (WCAG 2.2.2),
 * choosing a marker, or hovering or focusing the strip, stops the advance, and
 * it never advances at all for visitors who prefer reduced motion.
 */
export function HeroMarkers() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!auto || held || paused) return;
    const id = window.setTimeout(() => setI((p) => (p + 1) % marks.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [auto, held, paused, i]);

  const current = marks[i] as (typeof marks)[number];

  return (
    <>
      {/* Right-edge caption: decorative, so not announced as it changes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(var(--frame-inset)+clamp(20px,4.2vw,76px))] top-[37%] hidden w-[min(152px,12.4vw)] lg:block"
      >
        <p className="text-[12px] tracking-[0.12em] text-violet/80">
          {current.n} <span className="ml-1 inline-block h-px w-5 translate-y-[-3px] bg-violet/60 align-middle" />
        </p>
        <p key={current.n} className="cin-fade mt-2 font-serif text-[clamp(16px,1.45vw,23px)] italic leading-[1.18] text-text-dark/80">
          {current.line}
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        <div className="relative h-px w-full bg-white/[0.16]">
          {/* Progress segment under the active marker. */}
          <span
            key={`${i}-${auto && !held && !paused}`}
            className="absolute left-0 top-0 h-px bg-violet-bright/90"
            style={{
              width: `${100 / marks.length}%`,
              marginLeft: `${(100 / marks.length) * i}%`,
              transformOrigin: 'left',
              animation: auto && !held && !paused ? `cinema-grow ${INTERVAL}ms linear both` : undefined,
            }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
        <ul className="grid flex-1 grid-cols-3 gap-1 sm:flex sm:flex-none sm:gap-[clamp(36px,6.6vw,120px)]">
          {marks.map((m, k) => (
            <li key={m.n}>
              <button
                type="button"
                aria-current={k === i ? 'true' : undefined}
                onClick={() => {
                  setI(k);
                  setPaused(true);
                }}
                className={cn(
                  'inline-flex min-h-[44px] items-center whitespace-nowrap text-[clamp(11px,1vw,15px)] transition-colors',
                  k === i ? 'text-white' : 'text-text-dark-muted hover:text-white',
                )}
              >
                {/* One span so it flows as text: whitespace between flex items is discarded. */}
                <span>
                  {m.n} <span aria-hidden className="hidden sm:inline">/ </span>
                  {m.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {auto && (
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => {
              const next = !paused;
              setPaused(next);
              // One switch for everything in the hero that moves: these captions and the ribbon.
              document.documentElement.dataset.motion = next ? 'paused' : 'running';
              window.dispatchEvent(new Event('odv:motion'));
            }}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap px-2 text-[clamp(11px,1vw,14px)] text-text-dark-muted transition-colors hover:text-white"
          >
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-line text-[9px] sm:h-auto sm:w-auto sm:border-0 sm:text-[10px]">{paused ? '▶' : '❚❚'}</span>
            <span className="sr-only sm:not-sr-only">{paused ? 'Play motion' : 'Pause motion'}</span>
          </button>
        )}
        </div>
      </div>
    </>
  );
}
