'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

/**
 * The behaviour around the "one system" drawing; the drawing itself is server-rendered
 * (OneSystemDiagram) and arrives here as children.
 *
 *  - Arrives once: the first time at least a quarter of it is on screen it sets
 *    data-in, and the CSS gathers the scattered nodes into the ring and draws the
 *    spokes. The HTML ships in its finished state, so without scripts, or with
 *    reduced motion, nothing is ever hidden or moved.
 *  - Runs only while it is on screen and not paused: data-live drives the CSS
 *    animations (the site's .mv rules) and pauseAnimations() stops the SVG packets,
 *    which CSS cannot reach.
 *  - Obeys the same switch as the hero (html[data-motion=paused], the odv:motion
 *    event) and has its own visible Pause button, because anything that moves for
 *    more than five seconds needs one.
 */
export function OneSystemStage({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [canMove, setCanMove] = useState(false);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const svg = el.querySelector('svg');
    let visible = false;

    const sync = () => {
      const globalPause = document.documentElement.dataset.motion === 'paused';
      const run = visible && !pausedRef.current && !globalPause && !reduce.matches;
      el.dataset.live = run ? 'true' : 'false';
      if (run) svg?.unpauseAnimations?.();
      else svg?.pauseAnimations?.();
    };
    syncRef.current = sync;

    setCanMove(!reduce.matches);
    if (!reduce.matches) el.classList.add('os-armed');
    svg?.pauseAnimations?.();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible && !reduce.matches && el.dataset.in !== 'true') {
          // One frame after arming, so the hidden state is painted before it animates away.
          requestAnimationFrame(() => requestAnimationFrame(() => (el.dataset.in = 'true')));
        }
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    window.addEventListener('odv:motion', sync);
    reduce.addEventListener('change', sync);
    return () => {
      io.disconnect();
      window.removeEventListener('odv:motion', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div className={className}>
      <div ref={ref} data-live="false" className="mv os relative mx-auto aspect-square w-full max-w-[560px]">
        {children}
      </div>
      {canMove && (
        <p className="mt-3 flex justify-center">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => {
              pausedRef.current = !pausedRef.current;
              setPaused(pausedRef.current);
              syncRef.current();
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-[13.5px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        </p>
      )}
    </div>
  );
}
