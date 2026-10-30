import Link from 'next/link';
import { Check } from 'lucide-react';
import { briefs } from '@/data/catalogue/manifest';
import { merges } from '@/data/catalogue/routes';
import { getBlueprint } from '@/data/catalogue/blueprints';
import { mergedTierNames } from '@/data/catalogue/content/merged';
import { offersFor } from '@/lib/catalogue/leaf';
import { priceLabel, billingLabel, pkrLabel } from '@/lib/catalogue/resolve';
import { pkrNote } from '@/data/currency';

/**
 * Packages for catalogue briefs whose page is an established one (Odoo services, FBR invoicing, industries).
 * Renders nothing on pages without a merged brief, so it is safe to place on every page of a route.
 */
export function MergedPackages({ route }: { route: string }) {
  const here = briefs.filter((b) => merges[b.id]?.canonical === route && mergedTierNames[b.id]);
  if (!here.length) return null;
  return (
    <>
      {here.map((b) => {
        const bp = getBlueprint(b.blueprint)!;
        const offers = offersFor(b, mergedTierNames[b.id]!, route);
        const discovery = offers.every((o) => o.billing === 'discovery');
        return (
          <section key={b.id} id="packages" aria-labelledby={`packages-${b.id}`} className="theme-dark bay-sm scroll-mt-24">
            <div className="shell">
              <h2 id={`packages-${b.id}`} className="page-h2">
                {discovery ? 'Discovery packages' : 'Packages'}
              </h2>
              <p className="mt-4 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-text-dark-muted">
                {discovery
                  ? 'These packages are paid discovery: a written blueprint of your workflow and a phased implementation estimate, not a finished system. The build is quoted afterwards.'
                  : `Priced per ${bp.baseUnit}. A starting fee buys the bounded phase described; the written scope confirms the price.`}{' '}
                Launch prices in US dollars, before taxes. {bp.extras}
              </p>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {offers.map((o) => (
                  <li key={o.tier} className="flex flex-col rounded-[22px] border border-line bg-white/[0.02] p-6">
                    <h3 className="font-heading text-[19px] font-semibold text-white">{o.name}</h3>
                    <p className="mt-3 font-heading text-[26px] font-semibold leading-none text-white">{priceLabel(o)}</p>
                    {pkrLabel(o) && <p className="mt-2 text-[14px] text-text-dark">{pkrLabel(o)}</p>}
                    <p className="mt-1 text-[14px] text-text-dark-muted">{billingLabel(o.billing)}</p>
                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                      {o.scope.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-[15px] leading-snug text-text-dark">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" aria-hidden />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/contact?interest=${encodeURIComponent(o.interest)}#form`} className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/[0.2] px-5 text-[15px] font-semibold text-text-dark hover:border-violet-bright/70">
                      Choose this package
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[var(--reading-width)] text-[14.5px] text-text-dark-muted">Planning: {bp.planning}</p>
              <p className="mt-2 max-w-[var(--reading-width)] text-[14.5px] text-text-dark-muted">{pkrNote}</p>
              <p className="mt-2 text-[14.5px]">
                <span className="text-text-dark-muted">Acceptance: </span>
                <span className="text-text-dark">{b.acceptance}</span>
              </p>
            </div>
          </section>
        );
      })}
    </>
  );
}
