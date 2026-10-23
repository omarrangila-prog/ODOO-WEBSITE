'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QUALITY, LOOP_SECONDS, drawRibbons, type RibbonQuality } from '@/lib/cinema/ribbon';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!animated || !wrap || !canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    let dpr = 1;
    let cw = 0;
    let ch = 0;
    function resize() {
      if (!wrap || !canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2);
      cw = Math.max(1, Math.round(wrap.clientWidth * dpr));
      ch = Math.max(1, Math.round(wrap.clientHeight * dpr));
      canvas.width = cw;
      canvas.height = ch;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Pointer parallax, on devices with a real pointer only.
    const pointer: [number, number] = [0, 0];
    const target: [number, number] = [0, 0];
    const fine = window.matchMedia('(pointer: fine)').matches;
    const host = wrap.closest('section') ?? wrap;
    function onMove(e: PointerEvent) {
      const r = (host as HTMLElement).getBoundingClientRect();
      target[0] = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target[1] = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    function onLeave() {
      target[0] = 0;
      target[1] = 0;
    }
    if (fine) {
      host.addEventListener('pointermove', onMove as EventListener, { passive: true });
      host.addEventListener('pointerleave', onLeave);
    }

    let visible = true;
    const io = new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting);
    });
    io.observe(wrap);

    let raf = 0;
    let t0 = 0;
    let last = 0;
    let frames = 0;
    let slow = 0;
    let stopped = false;
    const minGap = small() ? 1000 / 30 : 0;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden || !visible || !ctx) return;
      if (minGap && now - last < minGap) return;
      const dt = now - last;
      last = now;
      if (!t0) t0 = now;

      pointer[0] += (target[0] - pointer[0]) * 0.06;
      pointer[1] += (target[1] - pointer[1]) * 0.06;

      const started = performance.now();
      const phase = (((now - t0) / 1000) / LOOP_SECONDS) % 1;
      drawRibbons(ctx, cw, ch, { phase, quality: QUALITY[tier] as RibbonQuality, pointer, dpr });
      const cost = performance.now() - started;

      if (frames === 2) setLive(true);
      frames++;

      // Self-protection: sustained slow frames step the quality down, then stop.
      if (frames > 20 && !forced) {
        if (cost > 14 || dt > 40) slow++;
        else slow = Math.max(0, slow - 1);
        if (slow > 25) {
          slow = 0;
          if (tier === 'high') tier = 'medium';
          else if (tier === 'medium') tier = 'low';
          else {
            stopped = true;
            cancelAnimationFrame(raf);
            setLive(false);
          }
        }
      }
    }
    raf = requestAnimationFrame(frame);

    return () => {
      if (!stopped) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove as EventListener);
      host.removeEventListener('pointerleave', onLeave);
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
      {animated && (
      <canvas
        ref={canvasRef}
        className={cn('absolute inset-0 h-full w-full transition-opacity duration-700', live ? 'opacity-100' : 'opacity-0')}
      />
      )}
    </div>
  );
}
