'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useScrollProgress } from './useScrollProgress';
import { VioletRibbonScene } from './VioletRibbonScene';
import { cn } from '@/lib/utilities';

/**
 * Section 05. The company's philosophy as three words that hand over to one
 * another as the visitor scrolls: BUILD, then AUTOMATE, then GROW.
 *
 * It is a scroll-staged section only where that helps. The server-rendered
 * default, which is also what no-JavaScript and reduced-motion visitors get, is
 * all three words stacked in normal flow with their descriptions. Scripts that
 * run and allow motion upgrade it to the sticky stage.
 */
const words = [
  {
    word: 'Build',
    line: 'Engineering practical software and digital systems.',
    detail: 'Custom software, Odoo ERP, websites and applications: the system a business is missing.',
  },
  {
    word: 'Automate',
    line: 'Connecting workflows through intelligent automation.',
    detail: 'AI agents, WhatsApp workflows and document processing, with a person approving anything that carries risk.',
  },
  {
    word: 'Grow',
    line: 'Creating better digital experiences and growth opportunities.',
    detail: 'Campaigns, creative, video and content that bring the right customers to a business equipped to serve them.',
  },
] as const;

export function BuildAutomateGrow() {
  const [staged, setStaged] = useState(false);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => setStaged(!prefersReducedMotion()), []);

  const onProgress = useCallback((p: number) => {
    const i = Math.min(words.length - 1, Math.floor(p * words.length * 0.999));
    setActive((prev) => (prev === i ? prev : i));
    track.current?.style.setProperty('--p', String(p));
  }, []);
  useScrollProgress(track, staged ? onProgress : noop);

  if (!staged) {
    return (
      <section aria-labelledby="bag-h" className="stage-section">
        <div className="stage-inner">
          <p className="hero-eyebrow flex items-center gap-3">
            <span aria-hidden className="text-violet/80">05</span>
            <span aria-hidden className="h-px w-7 bg-violet/50" />
            Our philosophy
          </p>
          <h2 id="bag-h" className="sr-only">Build, Automate, Grow</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {words.map((w) => (
              <li key={w.word} className="grid gap-4 py-[clamp(28px,5vw,64px)] md:grid-cols-[1.4fr_1fr] md:items-end">
                <span className="bag-word block">{w.word}</span>
                <span>
                  <span className="block font-heading text-[clamp(18px,1.7vw,24px)] font-medium text-white">{w.line}</span>
                  <span className="mt-2 block text-[16px] leading-relaxed text-text-dark-muted">{w.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="bag-h" className="relative border-t border-line bg-midnight">
      <h2 id="bag-h" className="sr-only">Build, Automate, Grow</h2>
      <div ref={track} className="relative h-[320vh]">
        <div
          className="sticky top-0 isolate flex h-[100svh] flex-col justify-center overflow-hidden"
          style={{ paddingInline: 'calc(var(--frame-inset) + clamp(20px, 4.6vw, 88px))' }}
        >
          {/* The signature artwork, faint and still, so the stage's open space belongs to the composition. */}
          <VioletRibbonScene animated={false} className="-z-10 opacity-[0.38]" />
          <div className="stage-inner">
            <p className="hero-eyebrow flex items-center gap-3">
              <span aria-hidden className="text-violet/80">05</span>
              <span aria-hidden className="h-px w-7 bg-violet/50" />
              Our philosophy
            </p>

            <div className="relative mt-6 h-[clamp(120px,24vw,360px)]">
              {words.map((w, i) => (
                <span
                  key={w.word}
                  aria-hidden={i !== active}
                  className={cn(
                    'bag-word absolute inset-0 flex items-center transition-all duration-700 ease-premium motion-reduce:transition-none',
                    i === active ? 'translate-y-0 opacity-100 blur-0' : i < active ? '-translate-y-10 opacity-0 blur-sm' : 'translate-y-10 opacity-0 blur-sm',
                  )}
                >
                  {w.word}
                </span>
              ))}
            </div>

            <div className="relative mt-4 grid min-h-[150px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="relative min-h-[120px] max-w-[60ch]">
                {words.map((w, i) => (
                  <div
                    key={w.word}
                    aria-hidden={i !== active}
                    className={cn(
                      'absolute inset-x-0 top-0 transition-all duration-700 ease-premium',
                      i === active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    )}
                  >
                    <p className="font-heading text-[clamp(20px,2vw,30px)] font-medium leading-snug text-white">{w.line}</p>
                    <p className="mt-3 text-[16px] leading-relaxed text-text-dark-muted">{w.detail}</p>
                  </div>
                ))}
              </div>

              <ol className="flex items-center gap-3 text-[13px] tracking-[0.16em]" aria-hidden>
                {words.map((w, i) => (
                  <li key={w.word} className="flex items-center gap-3">
                    <span className={cn('transition-colors duration-500', i === active ? 'text-white' : 'text-text-dark-muted/60')}>
                      0{i + 1}
                    </span>
                    {i < words.length - 1 && <span className="h-px w-8 bg-white/20" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function noop() {}
