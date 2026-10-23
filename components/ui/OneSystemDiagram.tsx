import type { CSSProperties } from 'react';
import { ShoppingCart, Users, Boxes, Calculator, UserRound, Globe, MessageCircle, BarChart3, type LucideIcon } from 'lucide-react';
import { OneSystemStage } from './OneSystemStage';

/**
 * Eight parts of a business joined to one system.
 *
 * Geometry is computed, not eyeballed: the nodes sit at 45 degree steps on one
 * ring, every spoke runs from the edge of the hub to the edge of its node (never
 * through either), and each label sits on the outer side of its node, so a label
 * cannot lie across a spoke. All of it lives in one 600 x 600 space; the SVG scales
 * as a unit and the labels are HTML placed in that space by percentage, so their
 * type keeps a readable size on a phone.
 *
 * Motion (OneSystemStage and the .os rules in globals.css):
 *  - on arrival the scattered nodes glide into the ring, the spokes draw in, and the
 *    hub lights; "from complexity to clarity" as a single gesture;
 *  - then it idles: dashes and small packets travel along the spokes, in both
 *    directions, a bright arc circles the hub rim, a ring of dots creeps round the
 *    outside and the nodes drift a couple of pixels;
 *  - hovering a node lights its spoke.
 * Everything pauses off screen and under reduced motion, there is a visible Pause
 * button, and the finished drawing is what the HTML contains.
 *
 * It is a picture of an idea with a text alternative. It makes no claim about any
 * client or result.
 */
const SIZE = 600;
const C = SIZE / 2;
const RING = 200; // distance from the centre to each node's centre
const NODE_R = 38;
const HUB_R = 90;

const nodes: { label: string; Icon: LucideIcon }[] = [
  { label: 'Sales', Icon: ShoppingCart }, // top, then clockwise
  { label: 'Team', Icon: Users },
  { label: 'Inventory', Icon: Boxes },
  { label: 'Accounting', Icon: Calculator },
  { label: 'Customers', Icon: UserRound },
  { label: 'Website', Icon: Globe },
  { label: 'WhatsApp', Icon: MessageCircle },
  { label: 'Reports', Icon: BarChart3 },
];

const f = (n: number) => n.toFixed(2);

const placed = nodes.map((n, i) => {
  const a = (-90 + i * 45) * (Math.PI / 180);
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const swirl = i % 2 ? 1 : -1;
  return {
    ...n,
    i,
    x: C + RING * ux,
    y: C + RING * uy,
    // Spoke: node edge to hub edge, so it never crosses either shape.
    x1: C + (RING - NODE_R - 3) * ux,
    y1: C + (RING - NODE_R - 3) * uy,
    x2: C + (HUB_R + 3) * ux,
    y2: C + (HUB_R + 3) * uy,
    // Where the node starts from before it arrives: out and to the side.
    dx: ux * 72 + -uy * 30 * swirl,
    dy: uy * 72 + ux * 30 * swirl,
    // Labels go above a node in the upper half and below it in the lower half; every spoke
    // runs inward, so the outer side is always clear.
    above: uy < -0.1,
  };
});

export function OneSystemDiagram({ className = '' }: { className?: string }) {
  const list = nodes.map((n) => n.label.toLowerCase()).join(', ');

  return (
    <figure className={`m-0 ${className}`}>
      <OneSystemStage>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`${list} connected to one system`} className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            {/* A calm dark disc, so whatever art sits behind the figure does not run through it. */}
            <radialGradient id="os-stage" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#05040a" stopOpacity="0.9" />
              <stop offset="0.72" stopColor="#05040a" stopOpacity="0.82" />
              <stop offset="1" stopColor="#05040a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="os-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#8247f5" stopOpacity="0.36" />
              <stop offset="0.55" stopColor="#8247f5" stopOpacity="0.09" />
              <stop offset="1" stopColor="#8247f5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="os-hub" cx="50%" cy="40%" r="64%">
              <stop offset="0" stopColor="#d9c9ff" stopOpacity="0.55" />
              <stop offset="0.55" stopColor="#8247f5" stopOpacity="0.32" />
              <stop offset="1" stopColor="#150d28" stopOpacity="0.95" />
            </radialGradient>
            <radialGradient id="os-node" cx="50%" cy="36%" r="72%">
              <stop offset="0" stopColor="#33235c" />
              <stop offset="1" stopColor="#0c0917" />
            </radialGradient>
            <linearGradient id="os-chip-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#efe7ff" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#a77bff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#8247f5" stopOpacity="0.35" />
            </linearGradient>
            {/* Radial, not linear: a linear gradient paints nothing on a perfectly vertical or horizontal line. */}
            <radialGradient id="os-spoke" gradientUnits="userSpaceOnUse" cx={C} cy={C} r={RING}>
              <stop offset={HUB_R / RING} stopColor="#d9c9ff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#a77bff" stopOpacity="0.32" />
            </radialGradient>
          </defs>

          {/* Atmosphere and structure */}
          <circle cx={C} cy={C} r={RING + 96} fill="url(#os-stage)" />
          <circle cx={C} cy={C} r={RING + 78} fill="url(#os-glow)" />
          <circle cx={C} cy={C} r={(RING + HUB_R) / 2 + 6} fill="none" stroke="#beafe6" strokeOpacity="0.08" strokeWidth="1" />
          <g className="os-rot os-rot-slow">
            <circle cx={C} cy={C} r={RING} fill="none" stroke="#beafe6" strokeOpacity="0.28" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 7.5" />
            {/* Three small lights riding the ring; the nodes are drawn after, so they pass behind them. */}
            {[0, 120, 240].map((deg) => (
              <circle key={deg} cx={C + RING * Math.cos((deg * Math.PI) / 180)} cy={C + RING * Math.sin((deg * Math.PI) / 180)} r="2.6" fill="#efe7ff" fillOpacity="0.9" />
            ))}
          </g>

          {/* Spokes */}
          {placed.map((p) => (
            <g key={`s-${p.label}`} style={{ '--i': p.i } as CSSProperties}>
              <line className="os-spoke-draw" pathLength={1} x1={f(p.x1)} y1={f(p.y1)} x2={f(p.x2)} y2={f(p.y2)} stroke="url(#os-spoke)" strokeWidth="1.6" strokeLinecap="round" />
              <line className="os-flow mv-flow" x1={f(p.x1)} y1={f(p.y1)} x2={f(p.x2)} y2={f(p.y2)} stroke="#f1eaff" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 14" />
            </g>
          ))}

          {/* Packets: one light on every spoke, half inbound and half outbound, never in step */}
          <g className="os-packets">
            {placed.map((p) => {
              const inbound = p.i % 2 === 0;
              const d = inbound ? `M${f(p.x1)} ${f(p.y1)} L${f(p.x2)} ${f(p.y2)}` : `M${f(p.x2)} ${f(p.y2)} L${f(p.x1)} ${f(p.y1)}`;
              const dur = `${(2.3 + (p.i % 3) * 0.45).toFixed(2)}s`;
              const begin = `${(p.i * 0.37).toFixed(2)}s`;
              return (
                <g key={`p-${p.label}`} opacity="0">
                  <circle r="7" fill="#a77bff" fillOpacity="0.32" />
                  <circle r="2.7" fill="#ffffff" />
                  <animateMotion path={d} dur={dur} begin={begin} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
                </g>
              );
            })}
          </g>

          {/* Hub */}
          <g className="os-hub-in">
            <circle className="mv-ring" cx={C} cy={C} r={HUB_R + 16} fill="none" stroke="#c4a8ff" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={C} cy={C} r={HUB_R} fill="url(#os-hub)" stroke="#c4a8ff" strokeOpacity="0.5" strokeWidth="1.5" />
            <circle cx={C} cy={C} r={HUB_R - 10} fill="none" stroke="#efe7ff" strokeOpacity="0.14" strokeWidth="1" />
            {/* A bright arc circling the rim */}
            <circle className="os-rot os-rot-sweep" cx={C} cy={C} r={HUB_R} fill="none" stroke="#f4eeff" strokeOpacity="0.95" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="64 502" />
          </g>

          {/* Nodes */}
          {placed.map((p) => (
            <g key={`n-${p.label}`} className="os-n" style={{ '--i': p.i } as CSSProperties}>
              <line className="os-spoke-hi" x1={f(p.x1)} y1={f(p.y1)} x2={f(p.x2)} y2={f(p.y2)} stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
              <g className="os-node-in" style={{ '--dx': `${p.dx.toFixed(0)}px`, '--dy': `${p.dy.toFixed(0)}px` } as CSSProperties}>
                <g className="os-float">
                  <g className="os-hover">
                    <circle cx={f(p.x)} cy={f(p.y)} r={NODE_R + 7} fill="#8247f5" fillOpacity="0.09" />
                    <circle className="os-chip" cx={f(p.x)} cy={f(p.y)} r={NODE_R} fill="url(#os-node)" stroke="url(#os-chip-rim)" strokeWidth="1.6" />
                    <p.Icon x={p.x - 15} y={p.y - 15} width={30} height={30} color="#e6dcff" strokeWidth={1.6} aria-hidden />
                    {/* A larger, invisible target so the hover does not flicker at the edge of the chip */}
                    <circle cx={f(p.x)} cy={f(p.y)} r={NODE_R + 10} fill="transparent" />
                  </g>
                </g>
              </g>
            </g>
          ))}
        </svg>

        {/* Hub label, in HTML so it stays crisp and keeps a readable size */}
        <div
          aria-hidden
          className="os-hub-label pointer-events-none absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center text-center"
          style={{ left: '50%', top: '50%', width: `${((HUB_R * 2 - 24) / SIZE) * 100}%`, '--i': 0 } as CSSProperties}
        >
          <span className="font-heading text-[clamp(15px,2.9vw,24px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            One
            <br />
            system
          </span>
        </div>

        {/* Node labels */}
        {placed.map((p) => (
          <span
            key={p.label}
            aria-hidden
            className="os-label pointer-events-none absolute whitespace-nowrap text-[12.5px] font-medium tracking-[0.01em] text-text-dark sm:text-[14px]"
            style={
              {
                left: `${(p.x / SIZE) * 100}%`,
                top: `${((p.above ? p.y - NODE_R - 10 : p.y + NODE_R + 10) / SIZE) * 100}%`,
                transform: `translate(-50%, ${p.above ? '-100%' : '0'})`,
                '--i': p.i,
              } as CSSProperties
            }
          >
            {p.label}
          </span>
        ))}
      </OneSystemStage>
      <figcaption className="sr-only">Connected to one system: {list}.</figcaption>
    </figure>
  );
}
