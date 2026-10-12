'use client';

import { useMemo } from 'react';
import { frictionItems, computeFriction, type FrictionStatus } from '@/data/calculator';
import { useRoadmap } from './RoadmapContext';
import { formatHourRange, cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

const statusMap: Record<FrictionStatus, { label: string; tone: string; bar: string }> = {
  Low: { label: 'Controlled', tone: 'text-green', bar: '#38D39F' },
  Moderate: { label: 'Under Pressure', tone: 'text-cyan', bar: '#56C7E8' },
  High: { label: 'Fragmented', tone: 'text-amber', bar: '#F1A44B' },
  Critical: { label: 'Critical', tone: 'text-magenta', bar: '#E947C6' },
};

const SEGMENTS = 12;

export function FrictionDiagnostic() {
  const { problems, toggle } = useRoadmap();
  const result = useMemo(() => computeFriction([...problems]), [problems]);

  const status = result ? statusMap[result.status] : null;
  const lit = result ? Math.round((result.percent / 100) * SEGMENTS) : 0;

  return (
    <section id="friction" className="theme-graphite grain relative overflow-hidden bay">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 radial-core opacity-70" aria-hidden />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-6">Operational Diagnostic</p>
          <TextGap />
          <h2 className="display-2">
            Where Is Your Business{' '}
            <span className="signal-text">Losing Control?</span>
          </h2>{' '}
          <p className="lede mt-6 max-w-md">
            Switch on the friction your team feels every week. We&rsquo;ll read the signal&mdash;and
            carry your selections down to a personalised roadmap request at the end of the page.
          </p>
          <TextGap />
          <p className="mt-8 text-[12px] leading-relaxed text-text-dark-muted">
            An indicative operational reading based on the selected workflow challenges &mdash; not a
            financial calculation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <fieldset>
            <legend className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">Friction points</legend>
            <ul className="flex flex-col gap-2">
              {frictionItems.map((item) => {
                const on = problems.has(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() => toggle(item.id)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-control border px-4 py-3 text-left text-[14px] transition-all duration-200 min-h-[52px]',
                        on ? 'border-violet-bright/40 bg-violet/[0.08] text-text-dark' : 'border-line bg-white/[0.02] text-text-dark-muted hover:border-line-strong hover:text-text-dark',
                      )}
                    >
                      <span className="leading-snug">{item.label}</span>
                      <span className={cn('relative h-5 w-9 shrink-0 rounded-full border transition-colors', on ? 'border-violet-bright/60 bg-[linear-gradient(100deg,#7C4DFF,#E947C6)]' : 'border-line-strong bg-white/5')} aria-hidden>
                        <span className={cn('absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-all', on ? 'left-[18px]' : 'left-0.5')} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div className="flex flex-col rounded-editorial border border-line bg-midnight/60 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">Control reading</p>
            <TextGap />
            <div className="mt-5 flex flex-1 items-end gap-4" aria-live="polite">
              <div className="flex flex-col-reverse gap-1.5">
                {Array.from({ length: SEGMENTS }).map((_, idx) => (
                  <span key={idx} className="h-2.5 w-8 rounded-[3px] transition-colors duration-300" style={{ backgroundColor: idx < lit && status ? status.bar : 'rgba(255,255,255,0.06)', boxShadow: idx < lit && status ? `0 0 12px -2px ${status.bar}` : 'none' }} aria-hidden />
                ))}
              </div>
              <div className="pb-1">
                {!result ? (
                  <p className="text-[14px] leading-relaxed text-text-dark-muted">Switch on the points to read your control level.</p>
                ) : (
                  <>
                    <p className={cn('font-heading text-2xl font-semibold', status?.tone)}>{status?.label}</p>
                    <TextGap />
                    <p className="mt-1 text-[13px] text-text-dark-muted">Est. {formatHourRange(result.hoursMin, result.hoursMax)} lost / week</p>
                  </>
                )}
              </div>
            </div>
            {result && (
              <p className="mt-6 border-t border-line pt-4 text-[13.5px] leading-relaxed text-text-dark-muted">
                {result.recommendation}
                <span className="mt-2 block text-text-dark">
                  Recommended start: <span className="text-violet-bright">Operations &amp; Workflow Discovery</span>
                </span>
              </p>
            )}
            <a href="#roadmap" className="mt-6 inline-flex items-center justify-center gap-2 rounded-control border border-violet-bright/40 bg-violet/[0.08] px-5 py-3 text-[14px] font-semibold text-text-dark transition-colors hover:bg-violet/[0.14]">
              Build these into my roadmap ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
