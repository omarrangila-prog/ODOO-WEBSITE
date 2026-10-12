'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ecoServices } from '@/data/ecosystem';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Horizontal cinematic storytelling: the section pins while services scroll
 * sideways. On reduced motion / small screens it degrades to a normal
 * horizontal scroll-snap rail (all content reachable, no pinning).
 */
export function ServicesRail() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Move the track from 0 to -(N-1) panels width. Panels are ~86vw each.
  const panels = ecoServices.length;
  const x = useTransform(scrollYProgress, [0, 1], ['2vw', `-${(panels - 1) * 82 + 2}vw`]);

  // Static fallback: normal snap rail.
  if (reduce) {
    return (
      <section id="services" className="theme-dark bay">
        <div className="shell">
          <Header />
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto no-scrollbar pb-4">
            {ecoServices.map((s, i) => (
              <div key={s.id} className="w-[86vw] shrink-0 snap-start sm:w-[420px]">
                <ServicePanel index={i} service={s} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="theme-dark" aria-label="Services">
      {/* Tall scroll track pins the sticky viewport */}
      <div ref={ref} className="relative" style={{ height: `${panels * 80}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="shell">
            <Header />
          </div>
          <motion.div style={{ x }} className="mt-10 flex gap-6 pl-[var(--pad)] will-change-transform">
            {ecoServices.map((s, i) => (
              <div key={s.id} className="w-[80vw] shrink-0 sm:w-[560px]">
                <ServicePanel index={i} service={s} />
              </div>
            ))}
            <div className="w-[20vw] shrink-0" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-xl">
        <p className="eyebrow mb-6">Inside the Odoo &amp; ERP division</p>
        <TextGap />
        <h2 className="display-2">
          Eight Ways We Build Your{' '}
          <span className="signal-text">Odoo System.</span>
        </h2>
      </div>
      <p className="hidden text-[13px] uppercase tracking-[0.14em] text-text-dark-muted sm:block">
        Scroll to explore →
      </p>
    </div>
  );
}

function ServicePanel({ index, service }: { index: number; service: (typeof ecoServices)[number] }) {
  const Icon = service.icon;
  return (
    <article className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-editorial border border-line bg-graphite/70 p-8 shadow-float sm:p-10">
      <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 radial-core opacity-70" aria-hidden />
      <span className="font-heading text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-text-dark/10" aria-hidden>
        {String(index + 1).padStart(2, '0')}
      </span>{' '}
      <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-violet-bright">
        <Icon className="h-4 w-4" aria-hidden />
        {service.name}
      </div>{' '}
      <h3 className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
        {service.statement}
      </h3>{' '}
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-dark-muted">{service.body}</p>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2 text-[13.5px] text-text-dark-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <ButtonLink href={service.href} size="md" variant="secondary">
          {service.ctaLabel}
          <ArrowNudge className={cn('h-4 w-4')} />
        </ButtonLink>
      </div>
    </article>
  );
}
