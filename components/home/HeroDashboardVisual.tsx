'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Zap, PackageCheck } from 'lucide-react';
import { OdooDashboard } from './OdooDashboard';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Premium floating dashboard with perspective, controlled glow, three floating
 * panels, subtle idle float and 1–2° cursor tilt. Static under reduced motion.
 */
export function HeroDashboardVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 4, y: ((e.clientY - r.top) / r.height - 0.5) * 3 });
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className="relative">
      {/* glow behind */}
      <div className="pointer-events-none absolute -inset-10 -z-10" aria-hidden>
        <div className="absolute right-[10%] top-[20%] h-[380px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.28),transparent_72%)]" />
        <div className="absolute bottom-[8%] right-[6%] h-[220px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(210,58,217,0.18),transparent_70%)]" />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 60, rotateY: -12, scale: 0.94 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transform: `perspective(1400px) rotateY(${-4 + tilt.x}deg) rotateX(${1 - tilt.y}deg) rotateZ(-1.5deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-[26px] border border-[rgba(163,99,255,0.2)] bg-[#0b0d18] p-2 shadow-[0_55px_120px_rgba(0,0,0,0.55),0_18px_55px_rgba(93,43,200,0.24),0_0_0_1px_rgba(163,99,255,0.18)]"
        >
          {/* glass reflection */}
          <span className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%)]" aria-hidden />
          {/* Every figure in this dashboard is illustrative. The badge is
              real, visible text so nobody reads sample numbers as revenue. */}
          {/*
            The dashboard shows fabricated PKR figures at 17px. A 10px label
            was easy to miss, so a visitor could read sample numbers as real
            client results. Sized to compete with the figures it qualifies.
          */}
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber/60 bg-amber/[0.14] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-amber backdrop-blur-sm">
            <span aria-hidden>&#9888;</span>
            Sample data &mdash; not client results
          </span>
          <OdooDashboard />

          {/* Floating panel — Total Profit (upper right) */}
          <FloatPanel className="-right-4 -top-5 sm:-right-8" delay={0.85} reduce={reduce} float={-4}>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-green/15 text-green">
                <TrendingUp className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] text-white/55">Total Profit</p>
                <TextGap />
                <p className="font-heading text-[15px] font-bold text-white">PKR 2.45M</p>
              </div>
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-green">▲ 20.1% this quarter</p>
          </FloatPanel>

          {/* Floating panel — Automation (lower left) */}
          <FloatPanel className="-bottom-6 -left-4 sm:-left-10" delay={1} reduce={reduce} float={5}>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet/15 text-violet-bright">
                <Zap className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] text-white/55">Automation</p>
                <TextGap />
                <p className="font-heading text-[15px] font-bold text-white">46 workflows</p>
              </div>
            </div>
            <p className="mt-1.5 text-[11px] font-medium text-white/60">Running smoothly</p>
          </FloatPanel>

          {/* Floating panel — Live Inventory (mid right, small) */}
          <FloatPanel className="-right-3 top-1/2 hidden -translate-y-1/2 sm:block" delay={1.15} reduce={reduce} float={-3} small>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan/15 text-cyan">
                <PackageCheck className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-[9.5px] text-white/55">Live Inventory</p>
                <TextGap />
                <p className="text-[11.5px] font-semibold text-white">Accurate stock</p>
              </div>
            </div>
          </FloatPanel>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatPanel({
  children,
  className,
  delay,
  reduce,
  float,
  small,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  reduce: boolean | null;
  float: number;
  small?: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.95 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, float, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 5 + Math.abs(float), repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={`absolute z-20 ${small ? 'w-[150px]' : 'w-[190px]'} rounded-[18px] border border-[rgba(173,107,255,0.25)] bg-[rgba(15,18,31,0.86)] p-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.4)] backdrop-blur-xl ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}
