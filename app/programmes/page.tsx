import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { programmes } from '@/data/catalogue/programmes';
import { programmeLines, programmeTotals } from '@/lib/catalogue/programme';
import { priceLabel, billingLabel, pkrLabel } from '@/lib/catalogue/resolve';
import { pkr, pkrNote } from '@/data/currency';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { CtaBand } from '@/components/ui/CtaBand';
import { Hero, Band } from '@/components/ai-search/Layout';

const PATH = '/programmes';
const DESCRIPTION = 'Eight combined programmes built from our published packages: AI visibility, lead-to-CRM, commerce, operations, ERP, product, brand and remote teams. USD and PKR.';
export const metadata: Metadata = buildMetadata({ title: 'Combined Programmes | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Packages and pricing', path: '/pricing' },
  { name: 'Programmes', path: PATH },
];
const usd = (n: number) => `USD ${n.toLocaleString('en-US')}`;

export default function ProgrammesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema('Combined programmes', PATH, DESCRIPTION), breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow="Programmes" title="Combined programmes" lede="Common combinations of our packages for one goal, priced line by line. They are coordinated scopes, not an all-services subscription." primary={{ label: 'See the programmes', href: '#list' }} secondary={{ label: 'All packages', href: '/pricing' }} art={4} />

      <Band tone="graphite" id="how">
        <AnswerCard question="How are ODOOVATIONS programmes priced?" className="max-w-4xl border-line text-text-dark-muted">
          <p>
            Each programme adds up the published packages it uses: one-time project fees and monthly fees are shown separately, optional parts are not counted, and third-party costs such as licences, ad spend and hosting stay outside. There is no invented bundle discount. Where two parts would repeat the same setup or discovery, the written proposal removes the repetition. {pkrNote}
          </p>
        </AnswerCard>
      </Band>

      <div id="list">
        {programmes.map((p, i) => {
          const lines = programmeLines(p);
          const t = programmeTotals(p);
          return (
            <Band key={p.slug} tone={i % 2 ? 'graphite' : 'dark'} id={p.slug} title={p.name} intro={<>{p.forWho} <span className="text-text-dark">{p.outcome}</span></>}>
              <div className="overflow-x-auto rounded-[18px] border border-line" tabIndex={0} role="region" aria-label={`${p.name} line items (scrollable table)`}>
                <table className="w-full min-w-[640px] text-left text-[14.5px]">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="px-4 py-3 font-semibold text-text-dark">Part</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-text-dark">Package</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-text-dark">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((l) => (
                      <tr key={l.brief.id} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 align-top text-text-dark-muted">
                          {l.part.role}
                          {l.part.optional && <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[12px]">Optional</span>}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <Link href={l.route} className="text-text-dark underline underline-offset-4 hover:text-white">{l.brief.title}</Link>
                          <span className="block text-[13px] text-text-dark-muted">{l.offer.name}</span>
                        </td>
                        <td className="px-4 py-3 align-top text-text-dark">
                          {priceLabel(l.offer)}
                          <span className="block text-[13px] text-text-dark-muted">{pkrLabel(l.offer)} · {billingLabel(l.offer.billing)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-[16px] border border-line p-4">
                  <dt className="text-[13px] text-text-dark-muted">Project fees{t.startingFees ? ' (from)' : ''}</dt>
                  <dd className="font-heading text-[20px] font-semibold text-white">{t.project ? usd(t.project) : 'None'}</dd>
                  {t.project > 0 && <dd className="text-[13px] text-text-dark">≈ {pkr(t.project)}</dd>}
                </div>
                <div className="rounded-[16px] border border-line p-4">
                  <dt className="text-[13px] text-text-dark-muted">Monthly fees</dt>
                  <dd className="font-heading text-[20px] font-semibold text-white">{t.monthly ? `${usd(t.monthly)}/month` : 'None'}</dd>
                  {t.monthly > 0 && <dd className="text-[13px] text-text-dark">≈ {pkr(t.monthly)}/month</dd>}
                </div>
                <div className="rounded-[16px] border border-line p-4 lg:col-span-2">
                  <dt className="text-[13px] text-text-dark-muted">Not included (paid to third parties)</dt>
                  <dd className="text-[14.5px] text-text-dark">{p.thirdParty}</dd>
                  <dd className="mt-1 text-[13px] text-text-dark-muted">{p.noDoubleCharge}</dd>
                </div>
              </dl>
              <p className="mt-6">
                <Link href={`/contact?interest=${encodeURIComponent(`${p.name}: scoped proposal`)}#form`} className="inline-flex min-h-[44px] items-center rounded-full border border-white/[0.2] px-5 text-[15px] font-semibold text-text-dark hover:border-violet-bright/70">
                  Request a scoped proposal
                </Link>
              </p>
            </Band>
          );
        })}
      </div>

      <CtaBand title="Need a combination that is not listed?" body="Tell us the goal. We will build the proposal from the published packages and remove anything that would be done twice." primaryLabel="Discuss your project" primaryHref="/contact#form" />
    </>
  );
}
