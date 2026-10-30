import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { aiServiceSchema, aiWebPage } from '@/lib/ai-search/schema';
import { plans, getPlan, formatPrice, contentUnit, capacityNote, terms, outcomeNotice, experienceNotice, searchExperiences } from '@/data/ai-search-pricing';
import { pricingFaqs } from '@/data/ai-search';
import { pkrNote } from '@/data/currency';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band, EnquirySection } from '@/components/ai-search/Layout';
import { PlanCard, MonthlyCards, ComparisonTable } from '@/components/ai-search/Pricing';

const PATH = '/services/ai-search-pricing';
const TITLE = 'AI Search Pricing: AEO & GEO Packages | ODOOVATIONS';
const price = (id: string) => formatPrice(getPlan(id)!);
const DESCRIPTION = `ODOOVATIONS AI Search packages in USD: Audit ${price('audit')}; Foundation ${price('foundation')}, Growth ${price('growth')}, Authority ${price('authority')}; Enterprise by quote.`;
export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'What we do', path: '/services' },
  { name: 'AI Search (AEO & GEO)', path: '/services/ai-search-optimization' },
  { name: 'Packages and pricing', path: PATH },
];

export default function PricingPage() {
  const audit = getPlan('audit')!;
  return (
    <>
      <JsonLd
        data={[
          aiWebPage({ path: PATH, name: 'AI Search packages and pricing', description: DESCRIPTION, type: 'CollectionPage' }),
          aiServiceSchema({ path: '/services/ai-search-optimization', name: 'ODOOVATIONS AI Search: AEO and GEO', serviceType: 'AI search optimization (AEO and GEO)', description: DESCRIPTION, offers: true }),
          breadcrumbSchema(crumbs),
          faqSchema(pricingFaqs),
        ]}
      />
      <Hero
        crumbs={crumbs}
        eyebrow="AI Search · Packages"
        title={
          <>
            AI Search packages <span className="signal-text">and pricing</span>
          </>
        }
        lede="Start with a one-time audit, or choose a monthly plan. Scope, limits and terms are stated, and nothing is unlimited."
        primary={{ label: 'Ask about a package', href: '#enquiry' }}
        secondary={{ label: 'What AI Search is', href: '/services/ai-search-optimization' }}
        art={4}
      />

      <Band tone="graphite" id="how">
        <AnswerCard question="How much do AEO and GEO services cost at ODOOVATIONS?" className="max-w-4xl border-line text-text-dark-muted">
          <p>
            Our launch packages are priced in US dollars, before taxes. The AI Search Audit is {price('audit')}. Monthly plans are Foundation at {price('foundation')}, Growth at {price('growth')} and Authority at {price('authority')}, each beginning with a 90-day programme and then renewing monthly with 30 days’ notice. Enterprise is quoted individually. {pkrNote} {outcomeNotice}
          </p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="audit" title="Start here: the audit" intro="One website, a dated baseline and a written plan, with no ongoing commitment.">
        <div className="max-w-4xl">
          <PlanCard plan={audit} enquiryPath={PATH} />
          <p className="mt-4 text-[15px]">
            <Link href="/services/ai-search-audit" className="text-violet-bright underline underline-offset-4">Read how the audit works</Link>
          </p>
        </div>
      </Band>

      <Band tone="graphite" id="plans" title="Monthly plans" intro="Choose the plan that fits the number of questions, the amount of content and the markets you need. Each begins with a written scope.">
        <MonthlyCards enquiryPath={PATH} />
      </Band>

      <Band tone="dark" id="compare" title="Every package compared" intro="The same rows for every package. A dash or “Not included” means it is not part of that package.">
        <ComparisonTable />
        <p className="mt-4 text-[13.5px] text-text-dark-muted md:hidden">Scroll sideways to see every package.</p>
      </Band>

      <Band tone="graphite" id="definitions" title="Definitions and limits">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[18px] font-semibold text-white">Content unit</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">{contentUnit}</p>
          </div>
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[18px] font-semibold text-white">Technical capacity</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">{capacityNote}</p>
          </div>
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[18px] font-semibold text-white">Search experiences</h3>
            <ul className="mt-3 space-y-1 text-[15.5px] text-text-dark">
              {searchExperiences.map((e) => (
                <li key={e.id}>{e.label}</li>
              ))}
            </ul>
            <p className="mt-3 text-[13.5px] leading-relaxed text-text-dark-muted">Three are measured on the audit, Foundation and Growth; Authority measures four. {experienceNotice}</p>
          </div>
        </div>
      </Band>

      <Band tone="dark" id="terms" title="Commercial terms">
        <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {terms.map((t) => (
            <div key={t.title} className="border-t border-line pt-4">
              <dt className="font-heading text-[17px] font-semibold text-white">{t.title}</dt>
              <dd className="mt-1.5 text-[15.5px] leading-relaxed text-text-dark-muted">{t.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-text-dark-muted">
          Not sure which fits? A free suitability review is a conversation about whether this work makes sense for you. There is no checkout on this page and no charge for asking.
        </p>
      </Band>

      <Band tone="graphite" id="faq" title="Pricing questions">
        <div className="max-w-4xl">
          <Accordion items={pricingFaqs} allowMultiple />
        </div>
      </Band>

      <EnquirySection defaultType="plan" title="Ask about a package" intro={<p>Choose a plan or ask a question. A person replies during Pakistan business hours. Sending this is free, and a plan starts only after a written scope is agreed.</p>} />
    </>
  );
}
