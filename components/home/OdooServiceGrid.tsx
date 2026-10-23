import { Check } from 'lucide-react';
import { ecoServices } from '@/data/ecosystem';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { TextGap } from '@/components/ui/TextGap';

/**
 * The eight Odoo services as an ordinary grid.
 *
 * This used to be a horizontal rail that pinned the page and consumed about
 * 640vh of scrolling to move sideways through eight cards. Scroll-hijacking
 * slows people who are reading, hides content on narrow screens and tall
 * windows, and makes every other section on the page wait behind it. The same
 * eight panels now sit in a grid, all visible, all reachable by keyboard, with
 * no JavaScript involved.
 */
export function OdooServiceGrid() {
  return (
    <section id="services" className="theme-dark bay-sm">
      <div className="shell">
        <p className="eyebrow mb-6">Inside the Odoo &amp; ERP division</p>
        <TextGap />
        <h2 className="page-h2 max-w-[24ch]">
          Eight ways we build your <span className="signal-text">Odoo system.</span>
        </h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ecoServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.id} className="min-w-0">
                <article className="flex h-full flex-col rounded-[22px] border border-line bg-graphite/70 p-6">
                  <p className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.12em] text-violet-bright">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" aria-hidden />
                      {s.name}
                    </span>
                    <span aria-hidden className="tracking-[0.18em] text-violet/80">{String(i + 1).padStart(2, '0')}</span>
                  </p>
                  <h3 className="mt-4 font-heading text-[clamp(1.2rem,1.7vw,1.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                    {s.statement}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">{s.body}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[14px] text-text-dark-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <ButtonLink href={s.href} size="md" variant="secondary" className="!whitespace-normal py-2 text-center">
                      {s.ctaLabel}
                      <ArrowNudge />
                    </ButtonLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
