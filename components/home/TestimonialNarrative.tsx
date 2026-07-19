'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utilities';

/**
 * Full-width human narrative. One testimonial fills the section as a large
 * quote broken into Problem → Change → Result. Selectable identities switch it.
 */
export function TestimonialNarrative() {
  // Only show verified testimonials publicly. If none are verified, render
  // nothing (the section is hidden until real content is supplied).
  const verified = testimonials.filter((t) => t.verified);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  if (verified.length === 0) return null;
  const t = verified[Math.min(i, verified.length - 1)]!;

  return (
    <section className="theme-dark grain relative overflow-hidden bay">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 radial-core opacity-60" aria-hidden />
      <div className="shell relative">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">In Their Words</p>
            <h2 className="display-2 max-w-xl">What Changed After Working With Us.</h2>
          </div>
          {/* Selectable identities */}
          <div className={cn('flex flex-wrap gap-2', verified.length < 2 && 'hidden')}>
            {verified.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-pressed={idx === i}
                className={cn(
                  'rounded-full border px-4 py-2 text-[13px] font-medium transition-colors',
                  idx === i ? 'border-violet-bright/50 bg-violet/[0.12] text-text-dark' : 'border-line text-text-dark-muted hover:text-text-dark',
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="grid gap-8 lg:grid-cols-3">
              <NarrativePart label="The problem" text={t.problem} tone="amber" />
              <NarrativePart label="What ODOOVATIONS changed" text={t.changed} tone="violet" />
              <NarrativePart label="The result" text={t.result} tone="green" />
            </blockquote>

            <figcaption className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6">
              <span className="font-heading text-lg font-semibold text-text-dark">{t.name}</span>
              <span className="text-[14px] text-text-dark-muted">{t.role} · {t.companyLabel}</span>
              <span className="ml-auto flex gap-2">
                <span className="rounded-full border border-line bg-white/[0.03] px-3 py-0.5 text-[11px] text-text-dark-muted">{t.industry}</span>
                <span className="rounded-full border border-line bg-white/[0.03] px-3 py-0.5 text-[11px] text-text-dark-muted">{t.implementationType}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

function NarrativePart({ label, text, tone }: { label: string; text: string; tone: 'amber' | 'violet' | 'green' }) {
  const color = { amber: 'text-amber', violet: 'text-violet-bright', green: 'text-green' }[tone];
  return (
    <div>
      <p className={cn('text-[11px] font-bold uppercase tracking-[0.14em]', color)}>{label}</p>
      <p className="mt-3 font-heading text-[clamp(1.15rem,1.9vw,1.6rem)] font-medium leading-[1.3] tracking-[-0.02em] text-text-dark">
        {text}
      </p>
    </div>
  );
}
