import Link from 'next/link';
import { divisions } from '@/data/divisions';
import { SectionHead, Accent } from './SectionHead';

/**
 * Section 03. The seven capabilities as an editorial index rather than seven
 * identical cards: oversized numbered rows divided by hairlines. Order and
 * names follow the brief; descriptions, links and capability lists come from
 * data/divisions.ts so they cannot drift from the Services pages.
 */
const order: { id: string; name: string }[] = [
  { id: 'custom-software', name: 'Custom Software Development' },
  { id: 'odoo-erp', name: 'Odoo ERP' },
  { id: 'ai-automation', name: 'AI & Automation' },
  { id: 'web-apps', name: 'Websites & Applications' },
  { id: 'marketing', name: 'Digital Marketing' },
  { id: 'creative', name: 'Creative Production' },
  { id: 'content-social', name: 'Content & Social Media' },
];

/** A small family of fine curves, different for each row, in the ribbon's language. */
function Glyph({ seed }: { seed: number }) {
  const lines = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const a = 14 + Math.sin(seed * 1.7 + 1) * 8;
    const b = 22 + Math.cos(seed * 2.3) * 10;
    const y0 = 46 - t * 30 + seed * 0.4;
    const d = `M2 ${y0.toFixed(1)} C 46 ${(y0 - a - t * 6).toFixed(1)}, 96 ${(y0 + b - t * 18).toFixed(1)}, 158 ${(y0 - 8 - t * 16 + (seed % 3) * 4).toFixed(1)}`;
    return <path key={i} d={d} strokeOpacity={0.25 + t * 0.6} />;
  });
  return (
    <svg viewBox="0 0 160 64" aria-hidden className="h-full w-full" fill="none" stroke="url(#glyph-grad)" strokeWidth="0.9">
      <defs>
        <linearGradient id="glyph-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#8247f5" />
          <stop offset="1" stopColor="#d8c8ff" />
        </linearGradient>
      </defs>
      {lines}
    </svg>
  );
}

export function CapabilityIndex() {
  return (
    <section aria-labelledby="capabilities-h" className="stage-section">
      <div className="stage-inner">
        <SectionHead
          index="03"
          label="What we engineer"
          id="capabilities-h"
          title={
            <>
              Complex challenges. <br className="hidden md:block" />
              <Accent>Considered</Accent> solutions.
            </>
          }
          lede="Seven capabilities in one company, so software, automation, ERP, the website and the campaign are planned together instead of handed between vendors."
        />

        <ol className="mt-[clamp(48px,7vw,104px)] border-t border-line">
          {order.map((o, i) => {
            const d = divisions.find((x) => x.id === o.id);
            if (!d) return null;
            const items = d.capabilities.flatMap((g) => g.items).slice(0, 6);
            return (
              <li key={o.id} className="border-b border-line">
                <Link
                  href={d.href}
                  className="no-underline group relative grid items-start gap-x-8 gap-y-3 py-[clamp(26px,3.6vw,52px)] md:grid-cols-[72px_1.2fr_1fr] lg:grid-cols-[88px_1.25fr_1fr]"
                >
                  <span aria-hidden className="pt-2 text-[13px] tracking-[0.18em] text-violet/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="relative z-10 block">
                    <span className="block font-heading text-[clamp(30px,4.4vw,70px)] font-semibold leading-[1.02] tracking-[-0.04em] text-white transition-transform duration-500 ease-premium group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transform-none">
                      {o.name}
                    </span>
                    <span
                      aria-hidden
                      className="absolute -bottom-3 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-ultraviolet via-violet-bright to-transparent transition-transform duration-700 ease-premium group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:scale-x-100 motion-reduce:opacity-30"
                    />
                  </span>

                  <span className="relative z-10 block md:pt-2">
                    <span className="block text-[16px] leading-relaxed text-text-dark-muted">{d.summary}</span>
                    <span className="mt-3 block text-[14px] leading-relaxed text-text-dark-muted/90">
                      {items.slice(0, 3).join(' · ')}
                      <span className="hidden lg:inline">
                        {items.length > 3 ? ' · ' + items.slice(3).join(' · ') : ''}
                      </span>
                    </span>
                  </span>

                  <span aria-hidden className="pointer-events-none absolute right-0 top-1/2 -z-0 hidden h-[84px] w-[260px] -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-70 group-focus-visible:opacity-70 xl:block">
                    <Glyph seed={i} />
                  </span>

                  <span aria-hidden className="absolute right-0 top-[clamp(26px,3.6vw,52px)] text-[22px] text-text-dark-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white lg:hidden">
                    ↗
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
