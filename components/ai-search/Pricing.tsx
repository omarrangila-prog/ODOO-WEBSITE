import { Check } from 'lucide-react';
import { plans, monthlyPlans, factRows, formatPrice, formatPkr, getPlan, type Plan } from '@/data/ai-search-pricing';
import { PlanButton } from './PlanButton';
import { cn } from '@/lib/utilities';

/**
 * Package cards, the full comparison and the preview. Everything is read from
 * data/ai-search-pricing.ts: no number or limit is typed here.
 */

function PriceLine({ plan }: { plan: Plan }) {
  if (plan.price === null) return <p className="font-heading text-[28px] font-semibold tracking-[-0.03em] text-white">Custom quote</p>;
  return (
    <p className="font-heading text-[clamp(30px,3.2vw,40px)] font-semibold leading-none tracking-[-0.035em] text-white">
      <span className="text-[0.5em] font-medium tracking-normal text-text-dark-muted">USD </span>
      {plan.price.toLocaleString('en-US')}
      <span className="ml-1.5 text-[0.4em] font-medium tracking-normal text-text-dark-muted">{plan.cadence === 'month' ? 'per month' : 'one time'}</span>
      <span className="mt-2 block text-[0.38em] font-medium tracking-normal text-text-dark-muted">{formatPkr(plan)}</span>
    </p>
  );
}

export function PlanCard({ plan, enquiryPath, featured = false }: { plan: Plan; enquiryPath: string; featured?: boolean }) {
  return (
    <article
      id={`plan-${plan.id}`}
      className={cn('flex h-full flex-col rounded-[22px] border bg-white/[0.02] p-6', featured ? 'border-violet-bright/45' : 'border-line')}
    >
      <h3 className="font-heading text-[20px] font-semibold tracking-[-0.02em] text-white">{plan.name}</h3>
      <div className="mt-3">
        <PriceLine plan={plan} />
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">{plan.forWho}</p>
      <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
        {plan.includes.map((i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-text-dark">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" aria-hidden />
            {i}
          </li>
        ))}
      </ul>
      {plan.delivery && <p className="mt-4 text-[13.5px] leading-relaxed text-text-dark-muted">{plan.delivery}</p>}
      <div className="mt-6">
        <PlanButton plan={plan.id} enquiryPath={enquiryPath} className={plan.id === 'enterprise' || plan.id === 'audit' ? 'border border-white/[0.2] text-text-dark hover:border-violet-bright/70' : 'bg-white text-[#050509] hover:bg-violet-bright'}>
          {plan.cta}
        </PlanButton>
      </div>
    </article>
  );
}

export function MonthlyCards({ enquiryPath }: { enquiryPath: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {[...monthlyPlans, getPlan('enterprise')!].map((p) => (
        <PlanCard key={p.id} plan={p} enquiryPath={enquiryPath} />
      ))}
    </div>
  );
}

export function ComparisonTable() {
  const cols = plans;
  return (
    <div className="overflow-x-auto rounded-[22px] border border-line" tabIndex={0} role="region" aria-label="Package comparison (scrollable table)">
      <table className="w-full min-w-[920px] border-collapse text-left text-[14.5px]">
        <caption className="sr-only">Comparison of the AI Search Audit, Foundation, Growth, Authority and Enterprise packages</caption>
        <thead>
          <tr className="bg-white/[0.03]">
            <th scope="col" className="sticky left-0 z-10 w-[190px] bg-[#0b0914] px-4 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">
              Package
            </th>
            {cols.map((p) => (
              <th key={p.id} scope="col" className="px-4 py-4 align-bottom">
                <span className="block font-heading text-[16px] font-semibold text-white">{p.name}</span>
                <span className="mt-0.5 block text-[13.5px] font-normal text-violet-bright">{formatPrice(p)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {factRows.map((row) => (
            <tr key={row.key} className="border-t border-line">
              <th scope="row" className="sticky left-0 z-10 bg-[#0b0914] px-4 py-3 align-top font-medium text-text-dark">
                {row.label}
                {row.hint && <span className="mt-1 block text-[12px] font-normal leading-snug text-text-dark-muted">{row.hint}</span>}
              </th>
              {cols.map((p) => (
                <td key={p.id} className={cn('px-4 py-3 align-top leading-snug', p.facts[row.key] === 'Not included' ? 'text-text-dark-muted/70' : 'text-text-dark')}>
                  {p.facts[row.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
