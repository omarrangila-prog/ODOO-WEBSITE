/**
 * Violet ribbon — the signature artwork.
 *
 * The artwork is a few "sheets". A sheet is the area between two guide curves,
 * filled with fine parallel strands whose spacing is warped so they crowd
 * toward one edge. Crowded strands, drawn with additive blending, brighten into
 * the luminous ridge seen in the approved reference; where the two guides
 * nearly meet, the strands converge into a dense glow. A slow ripple runs along
 * each strand and the guides drift on small orbits.
 *
 * Pure maths and Canvas 2D calls with no dependencies, so the same function
 * paints the live animation in the browser and the static fallback image
 * rendered by scripts/render-ribbon.mjs. Time is a phase in [0,1); every moving
 * term completes a whole number of cycles per loop, so the animation repeats
 * with no seam.
 *
 * Design space is 1672 x 941, the proportions of the approved reference.
 */

export const DESIGN_W = 1672;
export const DESIGN_H = 941;
/** Length of one seamless loop, in seconds. */
export const LOOP_SECONDS = 22;

type P2 = [number, number];

interface SheetSpec {
  /** The two guide curves (design space). */
  g1: P2[];
  g2: P2[];
  /** Which guide the strands crowd toward. */
  crowd: 'g1' | 'g2';
  /** Strand-spacing exponent: 1 = even, larger = tighter near the crowd edge. */
  p: number;
  /** How much that exponent breathes along the sheet. */
  pAmp: number;
  /** Relative strand count. */
  density: number;
  /** Brightness multiplier. */
  gain: number;
  /** Guide drift radius (design units). */
  wobble: number;
  /** Strand ripple amplitude as a fraction of local sheet width. */
  ripple: number;
  /** How far strands bow toward the crowd edge mid-sheet, giving contour curvature. */
  bulge: number;
  /** Fade the free ends: [start, end] as fractions of the length. */
  fade: [number, number];
}

export const SHEETS: SheetSpec[] = [
  // A — the large sculpture: a narrow left wing that opens into a hill and
  //     sweeps down the right edge, converging at the bottom-right
  {
    g1: [[740, 318], [890, 304], [1010, 282], [1100, 232], [1190, 198], [1300, 214], [1420, 290], [1520, 420], [1600, 600], [1650, 780], [1672, 930]],
    g2: [[740, 342], [890, 346], [1020, 326], [1140, 378], [1250, 452], [1340, 540], [1430, 650], [1520, 770], [1600, 870], [1665, 945]],
    crowd: 'g2',
    p: 1.75,
    pAmp: 0.4,
    density: 1,
    gain: 1,
    wobble: 12,
    ripple: 0.07,
    bulge: 0.16,
    fade: [0.3, 0.02],
  },
  // B — the long arcs beneath the ridge
  {
    g1: [[800, 742], [950, 632], [1100, 552], [1230, 506], [1340, 534], [1450, 640], [1540, 770], [1630, 900]],
    g2: [[812, 790], [1000, 764], [1160, 706], [1330, 722], [1470, 802], [1580, 892], [1665, 945]],
    crowd: 'g1',
    p: 1.35,
    pAmp: 0.3,
    density: 0.62,
    gain: 0.85,
    wobble: 10,
    ripple: 0.05,
    bulge: 0.12,
    fade: [0.34, 0.02],
  },
  // C — the small low arc
  {
    g1: [[870, 770], [990, 696], [1110, 676], [1230, 706], [1320, 790]],
    g2: [[880, 786], [1000, 756], [1120, 746], [1250, 784], [1330, 812]],
    crowd: 'g1',
    p: 2.0,
    pAmp: 0.3,
    density: 0.4,
    gain: 0.95,
    wobble: 7,
    ripple: 0.04,
    bulge: 0.1,
    fade: [0.4, 0.4],
  },
  // D — the arc in the top-right corner
  {
    g1: [[1330, 262], [1450, 232], [1550, 152], [1624, 42], [1652, -34]],
    g2: [[1410, 274], [1510, 264], [1596, 196], [1664, 104], [1696, 12]],
    crowd: 'g1',
    p: 2.2,
    pAmp: 0.3,
    density: 0.5,
    gain: 1.05,
    wobble: 7,
    ripple: 0.04,
    bulge: 0.08,
    fade: [0.22, 0.02],
  },
];

export interface RibbonQuality {
  /** Strands in a full-density sheet. */
  strands: number;
  /** Samples along each strand. */
  samples: number;
  /** Which sheets to draw (indices into SHEETS). */
  sheets: number[];
  /** Brightness levels strokes are batched into. */
  levels: number;
  /** Soft fill bands per sheet; the luminous body between the strands. */
  bands: number;
}

export const QUALITY: Record<'high' | 'medium' | 'low', RibbonQuality> = {
  high: { strands: 120, samples: 130, sheets: [0, 1, 2, 3], levels: 26, bands: 6 },
  medium: { strands: 80, samples: 90, sheets: [0, 1, 2, 3], levels: 18, bands: 5 },
  low: { strands: 46, samples: 60, sheets: [0, 1, 3], levels: 12, bands: 4 },
};

/** Wide screens show the whole composition; narrow ones crop to the sculpture. */
export function viewFor(canvasW: number, canvasH: number) {
  const narrow = canvasW < 768 || canvasW / canvasH < 1.05;
  const x0 = narrow ? 700 : 0;
  const y0 = narrow ? 150 : 0;
  const vw = DESIGN_W - x0;
  const vh = DESIGN_H - y0;
  // Cover, anchored to the right and vertical centre.
  const scale = Math.max(canvasW / vw, canvasH / vh);
  const ox = canvasW - DESIGN_W * scale;
  const oy = (canvasH - vh * scale) / 2 - y0 * scale;
  return { scale, ox, oy };
}

/* ------------------------------------------------------------------ */
/* maths                                                               */
/* ------------------------------------------------------------------ */

const TAU = Math.PI * 2;
const hash = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

function catmull(p0: P2, p1: P2, p2: P2, p3: P2, t: number): P2 {
  const t2 = t * t;
  const t3 = t2 * t;
  const f = (i: 0 | 1) =>
    0.5 *
    (2 * p1[i] + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3);
  return [f(0), f(1)];
}

function along(pts: P2[], s: number): P2 {
  const n = pts.length - 1;
  const x = Math.min(Math.max(s, 0), 0.99999) * n;
  const i = Math.floor(x);
  const g = (k: number) => pts[Math.min(Math.max(k, 0), n)] as P2;
  return catmull(g(i - 1), g(i), g(i + 1), g(i + 2), x - i);
}

/** Colour ramp: deep ultraviolet, through saturated violet, to lavender-white. */
function ramp(b: number): [number, number, number] {
  const t = Math.min(Math.max(b, 0), 1);
  const lerp = (x: number, y: number, k: number) => Math.round(x + (y - x) * k);
  if (t < 0.55) {
    const k = t / 0.55;
    return [lerp(58, 100, k), lerp(42, 82, k), lerp(214, 252, k)];
  }
  const k = Math.pow((t - 0.55) / 0.45, 1.5);
  return [lerp(100, 196, k), lerp(82, 202, k), lerp(252, 255, k)];
}

/* ------------------------------------------------------------------ */
/* drawing                                                             */
/* ------------------------------------------------------------------ */

export interface DrawOptions {
  /** Loop phase in [0, 1). */
  phase: number;
  quality: RibbonQuality;
  /** Pointer offset in [-1, 1] per axis: nudges the guides for a little parallax. */
  pointer?: [number, number];
  /** Device pixel ratio the canvas was sized with. */
  dpr: number;
}

export function drawRibbons(ctx: CanvasRenderingContext2D, cw: number, ch: number, opts: DrawOptions) {
  const { phase: t, quality, pointer = [0, 0], dpr } = opts;
  const { scale, ox, oy } = viewFor(cw / dpr, ch / dpr);

  ctx.save();
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
  // Butt caps: each segment is stroked on its own, and under additive blending
  // round caps overlap at every joint and double their brightness there, which
  // beads each strand and lines the beads up across the sheet into a lattice.
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.scale(dpr, dpr);

  const L = quality.levels;
  const M = quality.samples;

  quality.sheets.forEach((si) => {
    const S = SHEETS[si] as SheetSpec;
    const strands = Math.max(10, Math.round(quality.strands * S.density));

    // Guides drift on whole-cycle orbits; the tip of each stays anchored.
    const drift = (pts: P2[], seed: number): P2[] =>
      pts.map((p, k): P2 => {
        const anchor = smooth(0, 0.35, k / (pts.length - 1));
        const a = TAU * (t + k * 0.11 + seed);
        return [
          p[0] + (Math.sin(a) * S.wobble + pointer[0] * 11) * anchor,
          p[1] + (Math.cos(a) * S.wobble * 0.8 + pointer[1] * 8) * anchor,
        ];
      });
    const g1 = drift(S.g1, 0);
    const g2 = drift(S.g2, 0.27);

    // Per-sample guide positions, local width and brightness envelope.
    const a1: P2[] = new Array(M);
    const a2: P2[] = new Array(M);
    const wid: number[] = new Array(M);
    const pS: number[] = new Array(M);
    const env: number[] = new Array(M);
    let wSum = 0;
    for (let k = 0; k < M; k++) {
      const s = k / (M - 1);
      a1[k] = along(g1, s);
      a2[k] = along(g2, s);
      wid[k] = Math.hypot((a2[k] as P2)[0] - (a1[k] as P2)[0], (a2[k] as P2)[1] - (a1[k] as P2)[1]);
      wSum += wid[k] as number;
      pS[k] = S.p + S.pAmp * Math.sin(TAU * (0.9 * s + si * 0.17) + TAU * t);
      env[k] = smooth(0, S.fade[0], s) * smooth(0, S.fade[1], 1 - s);
    }
    const wMean = wSum / M;

    // ---- luminous body: nested, tapered bands hugging the crowded edge ----
    // Each band is one polygon, narrowing to nothing at the free ends. Stacked
    // with additive blending they read as a soft violet bloom that deepens
    // toward the ridge, without spending a single extra stroke on it.
    for (let bnd = 0; bnd < quality.bands; bnd++) {
      const k0 = bnd / quality.bands;
      // width of this band as a fraction of the sheet, tightening toward the edge
      const span = 1 - Math.pow(k0, 0.8) * 0.93;
      const from = S.crowd === 'g2' ? 1 - span : 0;
      const to = S.crowd === 'g2' ? 1 : span;
      const mid = (from + to) / 2;
      const half = (to - from) / 2;
      const poly = new Path2D();
      for (let k = 0; k < M; k++) {
        const h = half * Math.sqrt(env[k] as number);
        const f = mid - h;
        const A = a1[k] as P2;
        const B = a2[k] as P2;
        const X = (A[0] + (B[0] - A[0]) * f) * scale + ox;
        const Y = (A[1] + (B[1] - A[1]) * f) * scale + oy;
        if (k === 0) poly.moveTo(X, Y);
        else poly.lineTo(X, Y);
      }
      for (let k = M - 1; k >= 0; k--) {
        const h = half * Math.sqrt(env[k] as number);
        const f = mid + h;
        const A = a1[k] as P2;
        const B = a2[k] as P2;
        poly.lineTo((A[0] + (B[0] - A[0]) * f) * scale + ox, (A[1] + (B[1] - A[1]) * f) * scale + oy);
      }
      poly.closePath();
      const tone = ramp(0.28 + 0.5 * k0);
      ctx.fillStyle = `rgba(${tone[0]},${tone[1]},${tone[2]},${(0.034 + 0.026 * k0) * S.gain})`;
      ctx.fill(poly);
    }

    const paths: Path2D[] = [];
    const glow: Path2D[] = [];
    for (let i = 0; i < L; i++) {
      paths.push(new Path2D());
      glow.push(new Path2D());
    }

    for (let j = 0; j < strands; j++) {
      const u = j / (strands - 1);
      const jit = 0.7 + 0.6 * hash(j * 7.31 + si * 13.7);
      let px = 0;
      let py = 0;
      for (let k = 0; k < M; k++) {
        const s = k / (M - 1);
        const p = pS[k] as number;
        // Warp: crowd toward the chosen guide.
        const e = S.crowd === 'g2' ? 1 - Math.pow(1 - u, p) : Math.pow(u, p);
        // Ripple across the strand direction.
        const rip = S.ripple * Math.sin(TAU * (4 * s + 1.7 * u) + TAU * t * 2) * (0.5 + 0.5 * Math.sin(TAU * (1.3 * s + si)));
        const ee = e + rip + S.bulge * Math.sin(Math.PI * Math.min(1, s * 1.0)) * Math.sin(Math.PI * u) * (S.crowd === 'g2' ? 1 : -1);
        const A = a1[k] as P2;
        const B = a2[k] as P2;
        const X = (A[0] + (B[0] - A[0]) * ee) * scale + ox;
        const Y = (A[1] + (B[1] - A[1]) * ee) * scale + oy;

        if (k > 0) {
          // Brightness: a base glow, a strong lift toward the crowded edge, and
          // extra where the sheet pinches narrow and strands stack up.
          const w = wid[k] as number;
          const edgeNear = S.crowd === 'g2' ? e : 1 - e;
          const pinch = Math.min(2.2, wMean / Math.max(w, 24));
          // Each strand shimmers on its own phase along its length, so dim and
          // bright stretches do not line up across strands into a lattice.
          const shimmer = 0.78 + 0.22 * Math.sin(TAU * (1.6 * s + hash(j * 3.1 + si)) + TAU * t);
          const farGlow = Math.pow(1 - edgeNear, 6) * 0.42;
          const b =
            (0.34 + 0.36 * Math.pow(edgeNear, 3.0) * (0.6 + 0.4 * pinch) + 0.08 * pinch * edgeNear + farGlow) *
            (env[k] as number) *
            S.gain *
            jit *
            shimmer;
          const lv = Math.min(L - 1, Math.max(0, Math.floor(b * L)));
          if (b > 0.02) {
            (paths[lv] as Path2D).moveTo(px, py);
            (paths[lv] as Path2D).lineTo(X, Y);
            if (lv >= Math.floor(L * 0.4)) {
              (glow[lv] as Path2D).moveTo(px, py);
              (glow[lv] as Path2D).lineTo(X, Y);
            }
          }
        }
        px = X;
        py = Y;
      }
    }

    for (let lv = 0; lv < L; lv++) {
      const b = (lv + 0.5) / L;
      const [r, g, bl] = ramp(b);
      ctx.strokeStyle = `rgba(${r},${g},${bl},${0.03 + 0.07 * b})`;
      ctx.lineWidth = 3.4 * Math.max(scale, 0.55);
      ctx.stroke(glow[lv] as Path2D);
      ctx.strokeStyle = `rgba(${r},${g},${bl},${0.2 + 0.5 * b})`;
      ctx.lineWidth = Math.max(0.65, 0.85 * scale);
      ctx.stroke(paths[lv] as Path2D);
    }
  });
  ctx.restore();
}
