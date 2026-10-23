'use client';

import { useCallback, useRef } from 'react';
import { SectionHead, Accent } from './SectionHead';
import { prefersReducedMotion, useScrollProgress } from './useScrollProgress';

/**
 * Section 07. The delivery process as six stages down a line that fills as the
 * visitor reads. It states the process we aim for on every engagement, not an
 * audited record that each past project followed it, and the section says so.
 * Server-rendered with every stage lit, so it reads correctly without scripts
 * or with reduced motion; scrolling only dims stages that have not been
 * reached yet.
 */
const stages = [
  ['Discover', 'We start with how the business really runs: the workflow, its exceptions and the people who do the work.', 'Client communication and domain review'],
  ['Architect', 'Technical direction, standards and the shape of the system are decided before anything is built.', 'Leadership and senior engineers'],
  ['Build', 'Software, Odoo or automation is developed against the reviewed workflow, not a generic template.', 'Software, Odoo and AI engineering'],
  ['Validate', 'QA tests the behaviour. Accounting, inventory and workflow reviewers check that the logic matches how the business actually operates.', 'Quality assurance and domain specialists'],
  ['Launch', 'Environments are prepared, data is migrated where needed, the release is deployed and the client’s team is trained on real workflows.', 'Infrastructure and delivery teams'],
  ['Support', 'Maintenance, updates and small changes as the business shifts, agreed in writing rather than assumed.', 'Support and maintenance'],
] as const;

export function HowWeWork() {
  const root = useRef<HTMLElement>(null);

  const apply = useCallback((p: number) => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    el.style.setProperty('--fill', String(reduced ? 1 : p));
    el.querySelectorAll<HTMLElement>('[data-stage]').forEach((li, i) => {
      const reached = reduced || p >= (i + 0.35) / stages.length;
      // Unreached stages dim only their large heading (see .stage-row in globals.css): dimming
      // the whole row with opacity cannot keep body text at 4.5:1 at any useful level.
      li.dataset.reached = reached ? 'true' : 'false';
    });
  }, []);
  useScrollProgress(root, apply, 'through');

  return (
    <section ref={root} aria-labelledby="how-h" className="stage-section" style={{ ['--fill' as string]: 1 }}>
      <div className="stage-inner">
        <SectionHead
          index="07"
          label="How we work"
          id="how-h"
          title={
            <>
              Engineered <br className="hidden md:block" />
              with <Accent>purpose.</Accent>
            </>
          }
          lede="Developers are one part of delivering a system that fits. Engineers work alongside people who understand accounting, inventory and process, and testers who check the result."
        />

        <div className="relative mt-[clamp(48px,7vw,104px)] pl-8 md:pl-14">
          {/* The line: a dim track and a violet fill that follows the reader. */}
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.14] md:left-[15px]" />
          <span
            aria-hidden
            className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-ultraviolet via-violet-bright to-violet-bright md:left-[15px]"
            style={{ bottom: '0.5rem', transform: 'scaleY(var(--fill))' }}
          />
          <ol className="grid gap-[clamp(28px,4vw,56px)]">
            {stages.map(([name, body, who], i) => (
              <li key={name} data-stage className="stage-row relative grid gap-x-10 gap-y-2 md:grid-cols-[1fr_1.3fr]">
                <span
                  aria-hidden
                  className="absolute -left-8 top-[0.9rem] h-[15px] w-[15px] rounded-full border border-violet-bright/70 bg-midnight md:-left-14 md:h-[31px] md:w-[31px]"
                />
                <span
                  aria-hidden
                  className="absolute -left-8 top-[0.9rem] h-[15px] w-[15px] rounded-full bg-violet-bright shadow-[0_0_14px_rgba(196,168,255,0.8)] transition-opacity duration-500 md:-left-14 md:h-[31px] md:w-[31px] md:scale-[0.4]"
                  style={{ opacity: 'var(--fill)' as unknown as number }}
                />
                <h3 className="font-heading text-[clamp(30px,4vw,64px)] font-semibold leading-none tracking-[-0.04em] text-white">
                  <span aria-hidden className="mr-4 align-middle text-[13px] font-normal tracking-[0.18em] text-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {name}
                </h3>
                <div className="md:pt-2">
                  <p className="text-[16px] leading-relaxed text-text-dark-muted">{body}</p>
                  <p className="mt-2 text-[13px] tracking-[0.04em] text-violet-bright">{who}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-[clamp(36px,4vw,60px)] max-w-[62ch] text-[14px] leading-relaxed text-text-dark-muted">
          This is the process we aim for on every engagement. Individual projects adapt it, and it is not an audited record
          that each past project followed this exact sequence.
        </p>
      </div>
    </section>
  );
}
