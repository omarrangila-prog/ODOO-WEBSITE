/**
 * The ribbon animation loop, run off the main thread.
 *
 * The page hands this worker an OffscreenCanvas and then only sends small
 * messages: a resize, the pointer position, whether the canvas is on screen,
 * and whether the visitor has paused hero motion. All the path-building and
 * stroking in drawRibbons() happens here, so the page's own thread stays free
 * for taps, scrolling and layout. Measured on the main thread the same drawing
 * blocked it for seconds during load.
 *
 * The worker also protects itself: if frames are slow it drops a quality tier
 * straight away, and if even the lowest tier is slow it stops and tells the page
 * to show the still image again.
 *
 * Typed without the "webworker" lib on purpose: the project compiles one program
 * with the DOM lib, and the two declare conflicting globals.
 */
import { QUALITY, LOOP_SECONDS, drawRibbons, type RibbonQuality } from '@/lib/cinema/ribbon';

type Tier = 'high' | 'medium' | 'low';

export type ToWorker =
  | { type: 'init'; canvas: OffscreenCanvas; width: number; height: number; dpr: number; tier: Tier; forced: boolean; minGap: number; paused: boolean }
  | { type: 'resize'; width: number; height: number; dpr: number }
  | { type: 'pointer'; x: number; y: number }
  | { type: 'visible'; value: boolean }
  | { type: 'paused'; value: boolean }
  | { type: 'stop' };

export type FromWorker = { type: 'live' } | { type: 'stopped' };

const scope = self as unknown as {
  postMessage: (m: FromWorker) => void;
  onmessage: ((e: MessageEvent<ToWorker>) => void) | null;
  requestAnimationFrame?: (cb: (t: number) => void) => number;
  cancelAnimationFrame?: (id: number) => void;
};

let canvas: OffscreenCanvas | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let cw = 1;
let ch = 1;
let dpr = 1;
let tier: Tier = 'high';
let forced = false;
let minGap = 0;
let visible = true;
let paused = false;
let stopped = false;
let raf = 0;
let t0 = 0;
let last = 0;
let frames = 0;
let slow = 0;
const pointer: [number, number] = [0, 0];
const target: [number, number] = [0, 0];

const schedule = (cb: (t: number) => void): number =>
  typeof scope.requestAnimationFrame === 'function' ? scope.requestAnimationFrame(cb) : (setTimeout(() => cb(performance.now()), 16) as unknown as number);
const unschedule = (id: number) => {
  if (typeof scope.cancelAnimationFrame === 'function') scope.cancelAnimationFrame(id);
  else clearTimeout(id);
};

function setSize(w: number, h: number, ratio: number) {
  dpr = ratio;
  cw = Math.max(1, Math.round(w * ratio));
  ch = Math.max(1, Math.round(h * ratio));
  if (canvas) {
    canvas.width = cw;
    canvas.height = ch;
  }
}

function frame(now: number) {
  raf = schedule(frame);
  if (!ctx || stopped || !visible) return;
  if (paused) {
    // Keep the clock moving so resuming does not jump the artwork.
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
  const phase = ((now - t0) / 1000 / LOOP_SECONDS) % 1;
  drawRibbons(ctx, cw, ch, { phase, quality: QUALITY[tier] as RibbonQuality, pointer, dpr });
  const cost = performance.now() - started;

  if (frames === 2) scope.postMessage({ type: 'live' });
  frames++;

  // React within a handful of frames: a stuttering hero is worse than a still one.
  if (frames > 4 && !forced) {
    if (cost > 22 || dt > 45) slow++;
    else slow = Math.max(0, slow - 1);
    if (slow >= 4) {
      slow = 0;
      if (tier === 'high') tier = 'medium';
      else if (tier === 'medium') tier = 'low';
      else {
        stopped = true;
        unschedule(raf);
        scope.postMessage({ type: 'stopped' });
      }
    }
  }
}

scope.onmessage = (e) => {
  const m = e.data;
  switch (m.type) {
    case 'init': {
      canvas = m.canvas;
      ctx = canvas.getContext('2d') as unknown as CanvasRenderingContext2D | null;
      tier = m.tier;
      forced = m.forced;
      minGap = m.minGap;
      paused = m.paused;
      setSize(m.width, m.height, m.dpr);
      if (!ctx) {
        scope.postMessage({ type: 'stopped' });
        return;
      }
      raf = schedule(frame);
      break;
    }
    case 'resize':
      setSize(m.width, m.height, m.dpr);
      break;
    case 'pointer':
      target[0] = m.x;
      target[1] = m.y;
      break;
    case 'visible':
      visible = m.value;
      break;
    case 'paused':
      paused = m.value;
      break;
    case 'stop':
      stopped = true;
      unschedule(raf);
      break;
  }
};
