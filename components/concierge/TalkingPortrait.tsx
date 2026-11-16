'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * Real-time talking portrait: draws the host on a canvas and opens her mouth in step with the live voice.
 * The level comes from the agent's audio output (updated every frame by the panel), so the mouth moves with
 * each syllable as she speaks, closes when she pauses and stays closed while she listens.
 *
 * Technique: the lower lip and chin are redrawn one pixel column at a time, pushed down below the line where
 * the lips meet, and the gap is filled with a shaded mouth interior. It is audio-driven animation of a still
 * photo, not a generated video; a streaming avatar service can replace this component without changing the
 * conversation code (see ConciergeAvatar).
 *
 * Coordinates are in the 760 × 799 portrait (public/concierge/host-bust.webp).
 */
const W = 760;
const H = 799;
// Where the lips meet: left corner, centre, right corner (the smile lifts to her left).
const SEAM: readonly [readonly [number, number], readonly [number, number], readonly [number, number]] = [
  [372, 222],
  [410, 218.7],
  [444, 207],
] as const;
const LOWER = 46; // px of lower lip and chin that move with the jaw
const MAX_OPEN = 8; // px at full voice level

function seamY(x: number): number {
  const [a, b, c] = SEAM;
  if (x <= b[0]) return a[1] + ((x - a[0]) / (b[0] - a[0])) * (b[1] - a[1]);
  return b[1] + ((x - b[0]) / (c[0] - b[0])) * (c[1] - b[1]);
}

export function TalkingPortrait({ levelRef, speaking, className = '' }: { levelRef: MutableRefObject<number>; speaking: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = '/concierge/host-bust.webp';
    imgRef.current = img;

    const x0 = SEAM[0][0];
    const x1 = SEAM[2][0];
    let open = 0;
    let raf = 0;
    let lastDrawn = -1;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!img.complete || !img.naturalWidth) return;
      // Fast attack, slower release, a little flutter so long vowels do not freeze the mouth open.
      const target = speakingRef.current ? Math.min(1, levelRef.current) : 0;
      open += (target - open) * (target > open ? 0.55 : 0.22);
      if (open < 0.02) open = 0;
      const rounded = Math.round(open * 100);
      if (rounded === lastDrawn) return; // nothing changed; skip the redraw
      lastDrawn = rounded;

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);
      if (open === 0) return;

      for (let x = x0; x <= x1; x++) {
        const t = (x - x0) / (x1 - x0);
        const weight = Math.pow(Math.sin(Math.PI * t), 0.75);
        const d = open * MAX_OPEN * weight;
        if (d < 0.35) continue;
        const sy = seamY(x);
        // Mouth interior, darker at the back, with a hint of upper teeth when wide open.
        const g = ctx.createLinearGradient(0, sy, 0, sy + d);
        g.addColorStop(0, open > 0.6 ? 'rgba(232,224,218,0.6)' : '#3b1519');
        g.addColorStop(open > 0.6 ? 0.22 : 0.15, '#3b1519');
        g.addColorStop(1, '#1d080b');
        ctx.fillStyle = g;
        ctx.fillRect(x, sy - 0.5, 1, d + 1);
        // Lower lip and chin, pushed down and compressed so the bottom edge stays put.
        ctx.drawImage(img, x, sy, 1, LOWER, x, sy + d, 1, LOWER - d);
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  return <canvas ref={canvasRef} width={W} height={H} className={className} aria-hidden />;
}
