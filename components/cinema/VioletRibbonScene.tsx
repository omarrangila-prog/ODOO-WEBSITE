'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QUALITY, LOOP_SECONDS, drawRibbons, type RibbonQuality } from '@/lib/cinema/ribbon';
import type { ToWorker, FromWorker } from './ribbon.worker';
import { cn } from '@/lib/utilities';

type Tier = 'high' | 'medium' | 'low';

/**
 * The signature violet ribbon.
 *
 * Layers, back to front:
 *  1. a pre-rendered static image of the artwork (rendered from the same
 *     generator), shown immediately and permanently for visitors who prefer
 *     reduced motion or have scripts off;
 *  2. a canvas that paints the live, slowly moving version and fades in over
 *     the image once its first frame is ready.
 *
 * Everything here is decorative and hidden from assistive technology.
 * The animation is deliberately cheap: strokes are batched into a few dozen
 * paths per frame, it pauses off-screen and in hidden tabs, it caps its frame
 * rate on phones, and if frames run slow it steps down a quality tier and
 * finally stops, falling back to the static image.
 */
export function VioletRibbonScene({
  className,
  animated = true,
  mirrored = false,
}: {
  className?: string;
  /** false: the static image only, with a slow CSS drift. For secondary placements that should cost almost nothing. */
  animated?: boolean;
  /** Flip horizontally so a second placement is a variation, not a copy. */
  mirrored?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!animated || !wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const small = () => wrap.clientWidth < 768;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    let tier: Tier = small() ? 'low' : mem <= 4 || cores <= 4 ? 'medium' : 'high';
    // A tier can be forced for testing: localStorage.odv_ribbon_tier = 'high' | 'medium' | 'low'.
    // Forcing also switches off the slow-frame step-down, which is what lets a
    // GPU-less headless browser render the full-quality artwork for screenshots.
    let forced = false;
    try {
      const f = localStorage.getItem('odv_ribbon_tier');
      if (f === 'high' || f === 'medium' || f === 'low') {
        tier = f;
        forced = true;
      }
    } catch {}
    /*
     * Phones get the still artwork, drifting slowly under CSS, and no canvas at
     * all. The live version redraws a few hundred strokes every frame, and on a
     * mid-range phone that was measured at about four seconds of blocked main
     * thread during load (Lighthouse total blocking time), which delays every
     * tap. The still image is the same artwork, rendered by the same generator.
     */
    if (small() && !forced) return;

    // Fresh canvas per effect run: a canvas whose control has moved to a worker
    // cannot be handed over a second time (React's dev double-run would try).
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 h-full w-full transition-opacity duration-700 opacity-0';
    wrap.appendChild(canvas);
    const show = (on: boolean) => {
      canvas.style.opacity = on ? '1' : '0';
      setLive(on);
    };

    const ratio = () => Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2);
    const minGap = small() ? 1000 / 30 : 0;
    const isPaused = () => document.documentElement.dataset.motion === 'paused';

    const cleanups: Array<() => void> = [];
    let visible = true;

    // Pointer parallax, on devices with a real pointer only. Reported as -1..1 across the hero.
    const fine = window.matchMedia('(pointer: fine)').matches;
    const host = (wrap.closest('section') ?? wrap) as HTMLElement;
    let sendPointer: (x: number, y: number) => void = () => {};
    if (fine) {
      let lastSent = 0;
      const onMove = (e: PointerEvent) => {
        const now = performance.now();
        if (now - lastSent < 32) return;
        lastSent = now;
        const r = host.getBoundingClientRect();
        sendPointer(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
      };
      const onLeave = () => sendPointer(0, 0);
      host.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
      });
    }

    const canOffscreen = typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined' && 'transferControlToOffscreen' in canvas;

    if (canOffscreen) {
      /* ---- Off the main thread: the page only forwards small messages. ---- */
      const worker = new Worker(new URL('./ribbon.worker.ts', import.meta.url));
      const post = (m: ToWorker, transfer?: Transferable[]) => worker.postMessage(m, transfer ?? []);
      worker.onmessage = (e: MessageEvent<FromWorker>) => {
        if (e.data.type === 'live') show(true);
        else if (e.data.type === 'stopped') show(false);
      };
      // If the worker cannot start (blocked, or the bundle failed), the still image simply stays.
      worker.onerror = () => show(false);

      const offscreen = (canvas as HTMLCanvasElement & { transferControlToOffscreen: () => OffscreenCanvas }).transferControlToOffscreen();
      post(
        { type: 'init', canvas: offscreen, width: wrap.clientWidth, height: wrap.clientHeight, dpr: ratio(), tier, forced, minGap, paused: isPaused() },
        [offscreen],
      );
      sendPointer = (x, y) => post({ type: 'pointer', x, y });

      const ro = new ResizeObserver(() => post({ type: 'resize', width: wrap.clientWidth, height: wrap.clientHeight, dpr: ratio() }));
      ro.observe(wrap);
      const io = new IntersectionObserver((es) => {
        visible = es.some((e) => e.isIntersecting);
        post({ type: 'visible', value: visible && !document.hidden });
      });
      io.observe(wrap);
      const onVis = () => post({ type: 'visible', value: visible && !document.hidden });
      const onMotion = () => post({ type: 'paused', value: isPaused() });
      document.addEventListener('visibilitychange', onVis);
      window.addEventListener('odv:motion', onMotion);
      cleanups.push(() => {
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('odv:motion', onMotion);
        worker.terminate();
      });
    } else {
      /* ---- Fallback for browsers without OffscreenCanvas: the same loop on the main thread. ---- */
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        canvas.remove();
        return;
      }
      let dpr = 1;
      let cw = 0;
      let ch = 0;
      const resize = () => {
        dpr = ratio();
        cw = Math.max(1, Math.round(wrap.clientWidth * dpr));
        ch = Math.max(1, Math.round(wrap.clientHeight * dpr));
        canvas.width = cw;
        canvas.height = ch;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      const io = new IntersectionObserver((es) => {
        visible = es.some((e) => e.isIntersecting);
      });
      io.observe(wrap);

      const pointer: [number, number] = [0, 0];
      const target: [number, number] = [0, 0];
      sendPointer = (x, y) => {
        target[0] = x;
        target[1] = y;
      };

      let raf = 0;
      let t0 = 0;
      let last = 0;
      let frames = 0;
      let slow = 0;
      let stopped = false;
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (document.hidden || !visible) return;
        if (isPaused()) {
          last = now;
          return;
        }
        if (minGap && now - last < minGap) return;
        const dt = now - last;
        last = now;
        if (!t0) t0 = now;
        pointer[0] += (target[0] - pointer[0]) * 0.06;
        pointer[1] += (target[1] - pointer[1]) * 0.06;
        const started = performance.now();
        drawRibbons(ctx, cw, ch, { phase: (((now - t0) / 1000) / LOOP_SECONDS) % 1, quality: QUALITY[tier] as RibbonQuality, pointer, dpr });
        const cost = performance.now() - started;
        if (frames === 2) show(true);
        frames++;
        if (frames > 4 && !forced) {
          if (cost > 22 || dt > 45) slow++;
          else slow = Math.max(0, slow - 1);
          if (slow >= 4) {
            slow = 0;
            if (tier === 'high') tier = 'medium';
            else if (tier === 'medium') tier = 'low';
            else {
              stopped = true;
              cancelAnimationFrame(raf);
              show(false);
            }
          }
        }
      };
      raf = requestAnimationFrame(frame);
      cleanups.push(() => {
        if (!stopped) cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
      });
    }

    return () => {
      for (const c of cleanups) c();
      canvas.remove();
      setLive(false);
    };
  }, [animated]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', mirrored && '[&>*]:-scale-x-100', className)}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet="/art/ribbon-mobile.webp" />
        <Image
          src="/art/ribbon-wide.webp"
          alt=""
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
          className={cn(
            'ribbon-still object-cover object-right mix-blend-screen transition-opacity duration-700',
            !animated && 'ribbon-drift',
            live ? 'opacity-0' : 'opacity-100',
          )}
        />
      </picture>
    </div>
  );
}
