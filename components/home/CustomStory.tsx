'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

interface Stage {
  n: string;
  title: string;
  body: string;
  steps: { label: string; state: 'yours' | 'standard' | 'custom' }[];
}

const stages: Stage[] = [
  {
    n: '01',
    title: 'Your Current Workflow',
    body: 'We start from the real steps your team follows today — including the exceptions and workarounds nobody documents.',
    steps: [
      { label: 'Order received', state: 'yours' },
      { label: 'Manual credit check', state: 'yours' },
      { label: 'Special pricing', state: 'yours' },
      { label: 'Two-stage approval', state: 'yours' },
      { label: 'Dispatch & invoice', state: 'yours' },
    ],
  },
  {
    n: '02',
    title: 'What Standard Odoo Already Handles',
    body: 'Most of your process is covered by standard, well-configured Odoo. We use it wherever it fits — no reinventing the wheel.',
    steps: [
      { label: 'Order received', state: 'standard' },
      { label: 'Manual credit check', state: 'yours' },
      { label: 'Special pricing', state: 'yours' },
      { label: 'Two-stage approval', state: 'yours' },
      { label: 'Dispatch & invoice', state: 'standard' },
    ],
  },
  {
    n: '03',
    title: 'What We Customise',
    body: 'Only the missing layer gets built — the credit check, the pricing logic, the approval flow. Precise custom work where it creates value.',
    steps: [
      { label: 'Order received', state: 'standard' },
      { label: 'Manual credit check', state: 'custom' },
      { label: 'Special pricing', state: 'custom' },
      { label: 'Two-stage approval', state: 'custom' },
      { label: 'Dispatch & invoice', state: 'standard' },
    ],
  },
];

// This section is always on the ivory (theme-light) ground, so rows use
// ink-based text/backgrounds that stay AA-legible in both OS themes.
const stateStyle = {
  yours: 'border-line-light bg-white/[0.05] text-ink',
  standard: 'border-cyan/40 bg-cyan/[0.1] text-ink',
  custom: 'border-violet/50 bg-violet/[0.12] text-ink',
};

const stateTag = {
  yours: { label: 'Your step', color: 'text-ink-muted' },
  standard: { label: 'Standard Odoo', color: 'text-[#0e7490]' },
  custom: { label: 'We build this', color: 'text-violet' },
};

export function CustomStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    stageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = stages[activeIndex]!;

  return (
    <section className="theme-light bay">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Sticky left */}
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-6">Custom Where It Counts</p>
          <TextGap />
          <h2 className="display-2">
            Your Business Should Not Be Forced Into{' '}
            <span className="signal-text">Generic Software.</span>
          </h2>{' '}

          {/* Live visual comparison of the current stage */}
          <div className="mt-10 rounded-editorial border border-line-light bg-ivory-soft p-6 shadow-panel-light">
            <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
              <span className="text-ink" aria-hidden>{active.n}</span>{' '}
              {active.title}
            </div>
            <ol className="space-y-2">
              {active.steps.map((step, i) => {
                const tag = stateTag[step.state];
                return (
                  <m.li
                    key={step.label}
                    initial={false}
                    animate={reduce ? undefined : { scale: step.state === 'custom' && activeIndex === 2 ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn('flex items-center justify-between gap-3 rounded-control border px-4 py-3 text-[14px] transition-colors duration-500', stateStyle[step.state], '')}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-ink" aria-hidden>{i + 1}</span>{' '}
                      {step.label}
                    </span>
                    <span className={cn('text-[11px] font-semibold', tag.color)}>{tag.label}</span>
                  </m.li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Scrolling stages */}
        <div className="flex flex-col">
          {stages.map((stage, i) => (
            <div
              key={stage.n}
              data-idx={i}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center border-t border-line-light py-10 first:border-t-0 lg:min-h-[80vh]"
            >
              <span className="font-heading text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-[-0.04em] text-ink/55" aria-hidden>
                {stage.n}
              </span>{' '}
              <h3 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.035em]">
                {stage.title}
              </h3>{' '}
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-muted">{stage.body}</p>
            </div>
          ))}

          <div className="border-t border-line-light py-16">
            <p className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
              Standard Where Possible.
              <br />
              <span className="signal-text">Custom Where Valuable.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
