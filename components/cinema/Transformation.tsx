'use client';

import { useCallback, useRef } from 'react';
import { SectionHead, Accent } from './SectionHead';
import { prefersReducedMotion, smoothstep, useScrollProgress } from './useScrollProgress';

/**
 * Section 02. Eight pieces of a business start scattered and unconnected, and
 * as the visitor scrolls they draw in around one core. Positions are in
 * percent of the diagram box.
 *
 * The markup is server-rendered in its CONNECTED state, so the page reads
 * correctly with no JavaScript and with reduced motion. Scroll only moves the
 * nodes toward the scattered state and back; it writes to the DOM directly and
 * never triggers a React render.
 */
const nodes = [
  { id: 'sales', label: 'Sales', a: [14, 16], b: [50, 14] },
  { id: 'stock', label: 'Inventory', a: [78, 12], b: [80, 34] },
  { id: 'accounts', label: 'Accounting', a: [88, 52], b: [80, 66] },
  { id: 'crm', label: 'Customers', a: [64, 84], b: [50, 86] },
  { id: 'web', label: 'Website', a: [26, 90], b: [20, 66] },
  { id: 'chat', label: 'WhatsApp', a: [6, 62], b: [20, 34] },
  { id: 'reports', label: 'Reports', a: [30, 44], b: [34, 22] },
  { id: 'people', label: 'Team', a: [70, 58], b: [66, 22] },
] as const;
const CORE: [number, number] = [50, 50];

const problems = [
  ['Disconnected software', 'Each team runs its own tool, and none of them agree.'],
  ['Manual workflows', 'The same figure is typed into three places by three people.'],
  ['Slow, unreliable reporting', 'Answers arrive at month end, assembled by hand.'],
  ['Sales and stock apart', 'Someone sells what the warehouse does not have.'],
  ['Repetitive operations', 'Skilled people spend their day on copy and chase.'],
  ['Missed enquiries', 'A message arrives after hours and waits until morning.'],
] as const;

export function Transformation() {
  const stage = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);

  const apply = useCallback((raw: number) => {
    const root = box.current;
    if (!root) return;
    // 0 = scattered, 1 = connected. Held connected for reduced motion.
    const p = prefersReducedMotion() ? 1 : smoothstep(0.1, 0.78, raw);
    for (const n of nodes) {
      const el = root.querySelector<HTMLElement>(`[data-node="${n.id}"]`);
      const line = root.querySelector<SVGLineElement>(`[data-line="${n.id}"]`);
      const x = n.a[0] + (n.b[0] - n.a[0]) * p;
      const y = n.a[1] + (n.b[1] - n.a[1]) * p;
      if (el) {
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      }
      if (line) {
        line.setAttribute('x1', String(x));
        line.setAttribute('y1', String(y));
        line.style.opacity = String(0.12 + 0.78 * p);
        line.style.strokeDasharray = p < 0.98 ? '1.2 1.6' : 'none';
      }
    }
    root.style.setProperty('--core', String(0.25 + 0.75 * p));
    root.querySelectorAll<HTMLElement>('[data-problem]').forEach((li, i) => {
      // Problems recede as the system comes together, staggered.
      const t = smoothstep(0.2 + i * 0.06, 0.55 + i * 0.06, raw);
      li.style.opacity = String(prefersReducedMotion() ? 0.9 : 1 - 0.55 * t);
    });
  }, []);

  // The pinned stage only fits on large screens. Below lg the section flows
  // normally, and progress follows the diagram itself as it scrolls through.
  const desktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
  useScrollProgress(stage, useCallback((p: number) => desktop() && apply(p), [apply]));
  useScrollProgress(box, useCallback((p: number) => !desktop() && apply(0.1 + p * 0.78), [apply]), 'through');

  return (
    <section aria-labelledby="transform-h" className="stage-section !p-0">
      {/* Tall track so the stage stays put while the diagram resolves (lg and up). */}
      <div ref={stage} className="relative lg:h-[230vh]">
        <div
          className="flex py-[clamp(88px,14vw,140px)] lg:sticky lg:top-0 lg:h-[100svh] lg:items-center lg:py-0"
          style={{ paddingInline: 'calc(var(--frame-inset) + clamp(20px, 4.6vw, 88px))' }}
        >
          <div className="stage-inner grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-16">
            <div>
              <SectionHead
                index="02"
                label="The transformation"
                id="transform-h"
                title={
                  <>
                    From complexity <br className="hidden sm:block" />
                    to <Accent>clarity.</Accent>
                  </>
                }
                titleClassName="!text-[clamp(34px,5.2vw,84px)]"
              />
              <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {problems.map(([t, d]) => (
                  <li key={t} data-problem className="border-t border-line pt-3 transition-opacity">
                    <h3 className="font-heading text-[16px] font-medium text-white">{t}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-text-dark-muted">{d}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* The diagram: decorative; the list beside it carries the meaning. */}
            <div
              ref={box}
              aria-hidden="true"
              className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none"
              style={{ ['--core' as string]: 1 }}
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                {nodes.map((n) => (
                  <line
                    key={n.id}
                    data-line={n.id}
                    x1={n.b[0]}
                    y1={n.b[1]}
                    x2={CORE[0]}
                    y2={CORE[1]}
                    stroke="url(#strand)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    style={{ opacity: 0.9 }}
                  />
                ))}
                <defs>
                  {/* userSpaceOnUse: a gradient in bounding-box units paints nothing on a perfectly
                      vertical or horizontal line, whose box has zero width or height. */}
                  <linearGradient id="strand" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0" stopColor="#8247f5" />
                    <stop offset="1" stopColor="#c4a8ff" />
                  </linearGradient>
                </defs>
              </svg>

              <div
                className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-violet-bright/40 text-center"
                style={{
                  background: 'radial-gradient(circle, rgba(130,71,245,0.34), rgba(130,71,245,0.06) 70%, transparent)',
                  boxShadow: '0 0 60px rgba(130,71,245,0.35)',
                  opacity: 'var(--core)' as unknown as number,
                }}
              >
                <span className="font-heading text-[clamp(11px,1.5vw,16px)] font-medium leading-tight text-white">
                  One
                  <br />
                  system
                </span>
              </div>

              {nodes.map((n) => (
                <div
                  key={n.id}
                  data-node={n.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/[0.2] bg-midnight/80 px-3 py-1.5 text-[clamp(11px,1.2vw,14px)] text-text-dark backdrop-blur-sm"
                  style={{ left: `${n.b[0]}%`, top: `${n.b[1]}%` }}
                >
                  {n.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
