'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { industries as allIndustries } from '@/data/industries';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Full-screen photographic industries with clip-path image transitions.
 * A large image fills the section; the active industry changes with a wipe.
 * Numbered index list (desktop) + prev/next (mobile), fully keyboard-operable.
 */
/** This section is a full-bleed photographic showcase, so it only features
    industries that have commissioned photography. */
const industries = allIndustries.filter((i) => i.image);

export function IndustriesCinema() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const active = industries[i]!;

  function go(n: number) {
    const idx = (n + industries.length) % industries.length;
    setI(idx);
    track('industry_selected', { industry: industries[idx]!.slug });
  }

  return (
    <section id="industries" className="theme-dark relative">
      <div className="relative min-h-[92vh] w-full overflow-hidden">
        {/* Full-bleed image with clip-path wipe */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.slug}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={active.image as string}
              alt={`${active.name} — operational context`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/30" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-transparent to-transparent" aria-hidden />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative z-10 flex min-h-[92vh] flex-col">
          <div className="shell pt-24">
            <p className="eyebrow mb-4">Industries</p>
            <TextGap />
            <h2 className="display-2 max-w-2xl">
              Built Around the Way Your Industry{' '}
              <span className="signal-text">Actually Works.</span>
            </h2>
          </div>

          <div className="mt-auto">
            <div className="shell grid items-end gap-10 pb-14 lg:grid-cols-[1fr_auto]">
              {/* Active detail */}
              <div className="max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-bright">
                      {String(i + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase tracking-tight text-white">
                      {active.name}
                    </h3>{' '}
                    <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-white/85">
                      {active.description}
                    </p>
                    <TextGap />
                    <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                      {active.workflow.map((step, idx) => (
                        <li key={step} className="flex items-center gap-2 text-[13px] font-medium text-white/90">
                          <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 backdrop-blur-sm">{step}</span>
                          {idx < active.workflow.length - 1 && <span className="text-violet-bright" aria-hidden>→</span>}
                        </li>
                      ))}
                    </ol>
                    <Link href={active.href} className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-heading text-[15px] font-medium text-white underline-offset-4 hover:underline">
                      Explore Odoo for {active.name}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Mobile controls */}
                <div className="mt-8 flex items-center gap-3 lg:hidden">
                  <button type="button" onClick={() => go(i - 1)} aria-label="Previous industry" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur">
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button type="button" onClick={() => go(i + 1)} aria-label="Next industry" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur">
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              {/* Index list (desktop) — aria-pressed buttons, not incomplete tabs */}
              <div role="group" aria-label="Industries" className="hidden w-[240px] lg:block">
                {industries.map((ind, idx) => {
                  const on = idx === i;
                  return (
                    <button
                      key={ind.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => go(idx)}
                      className={cn(
                        'group flex w-full items-center gap-3 border-t border-white/12 py-3 text-left transition-colors last:border-b',
                        on ? 'text-white' : 'text-white/70 hover:text-white',
                      )}
                    >
                      <span className="text-[11px] tabular-nums" aria-hidden>{String(idx + 1).padStart(2, '0')}</span>{' '}
                      <span className="font-heading text-[15px] font-medium">{ind.name}</span>
                      <span className={cn('ml-auto h-px flex-1 max-w-[40px] transition-all', on ? 'bg-violet-bright' : 'bg-transparent')} aria-hidden />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
