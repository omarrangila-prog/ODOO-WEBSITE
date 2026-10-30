import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { aiServiceSchema, aiWebPage } from '@/lib/ai-search/schema';
import { getService } from '@/data/services';
import { getPlan, formatPrice, experienceNotice, searchExperiences } from '@/data/ai-search-pricing';
import { auditFaqs, recordFields } from '@/data/ai-search';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band, Bullets, EnquirySection } from '@/components/ai-search/Layout';
import { PlanButton } from '@/components/ai-search/PlanButton';
import { SampleReport } from '@/components/ai-search/SampleReport';
import { SelectedWork } from '@/components/ai-search/SelectedWork';

const PATH = '/services/ai-search-audit';
const service = getService('ai-search-audit')!;
const audit = getPlan('audit')!;
export const metadata: Metadata = buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'What we do', path: '/services' },
  { name: 'AI Search (AEO & GEO)', path: '/services/ai-search-optimization' },
  { name: 'AI Search Audit', path: PATH },
];

const timeline = [
  { day: 'Before day 1', title: 'Agree the scope', body: 'We confirm the website, the market and language, the questions, the competitors and what we need from you. You approve it in writing before the audit is invoiced.' },
  { day: 'Day 1', title: 'Clock starts', body: 'The five business days begin when the information we need has been received, not when you first ask.' },
  { day: 'Days 1 to 4', title: 'Test and review', body: 'We run the questions in the three agreed search experiences, save every answer, and review the technical and content foundations.' },
  { day: 'Day 5', title: 'Report', body: 'You receive the dated baseline and a prioritised written action plan.' },
  { day: 'After', title: 'Review call', body: 'A 30-minute call to walk through the plan and answer questions.' },
];

const needs = [
  'The website address, and the market and language to look at.',
  'The questions you would like tested, or permission for us to draft them for your approval.',
  'Up to three competitors.',
  'Read access to analytics or Search Console, if you have them.',
];

const notIncluded = [
  'Making the changes. The audit is the diagnosis and the plan; doing the work is a separate decision.',
  'More than one website, one market and language, 20 questions, three search experiences or three competitors.',
  'Any guarantee about how AI search will describe or cite you afterwards.',
];

export default function AuditPage() {
  return (
    <>
      <JsonLd
        data={[
          aiWebPage({ path: PATH, name: service.title, description: service.metaDescription, mainService: true }),
          aiServiceSchema({ path: PATH, name: 'ODOOVATIONS AI Search Audit', serviceType: 'AI search visibility audit', description: service.answer!, offers: true, offerPlanIds: ['audit'] }),
          breadcrumbSchema(crumbs),
          faqSchema(auditFaqs),
        ]}
      />
      <Hero
        crumbs={crumbs}
        eyebrow="AI Search · Audit"
        title={
          <>
            AI Search Audit: a dated baseline and <span className="signal-text">a written plan</span>
          </>
        }
        lede="See what AI search says about your business today, and what to fix first."
        primary={{ label: 'Ask about the audit', href: '#enquiry' }}
        secondary={{ label: 'View all packages', href: '/services/ai-search-pricing' }}
      />

      <Band tone="graphite" id="what">
        <AnswerCard question="What is the ODOOVATIONS AI Search Audit?" className="max-w-4xl border-line text-text-dark-muted">
          <p>{service.answer}</p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="scope" title="What the audit covers">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:gap-10">
          <div className="rounded-[24px] border border-line bg-white/[0.02] p-6 sm:p-8">
            <p className="font-heading text-[clamp(32px,4vw,48px)] font-semibold leading-none tracking-[-0.04em] text-white">
              {formatPrice(audit)}
            </p>
            <p className="mt-2 text-[14.5px] text-text-dark-muted">Prices are in US dollars, before taxes. A fixed PKR quotation is available on request.</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {audit.includes.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] leading-snug text-text-dark">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14.5px] leading-relaxed text-text-dark-muted">{audit.delivery}</p>
            <div className="mt-6 max-w-sm">
              <PlanButton plan="audit" enquiryPath={PATH} className="bg-white text-[#050509] hover:bg-violet-bright">
                Ask about the audit
              </PlanButton>
            </div>
            <p className="mt-3 text-[13px] text-text-dark-muted">Asking is free. You are invoiced only after we agree the scope in writing.</p>
          </div>
          <div className="space-y-5">
            <div className="rounded-[22px] border border-line p-6">
              <h3 className="font-heading text-[18px] font-semibold text-white">The three search experiences</h3>
              <ul className="mt-3 space-y-1.5 text-[15.5px] text-text-dark">
                {searchExperiences.slice(0, 3).map((e) => (
                  <li key={e.id}>{e.label}</li>
                ))}
              </ul>
              <p className="mt-3 text-[13.5px] leading-relaxed text-text-dark-muted">{experienceNotice}</p>
            </div>
            <div className="rounded-[22px] border border-line p-6">
              <h3 className="font-heading text-[18px] font-semibold text-white">Every answer is recorded</h3>
              <ul className="mt-3 space-y-1 text-[14.5px] text-text-dark-muted">
                {recordFields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Band>

      <Band tone="graphite" id="process" title="How the five days run">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {timeline.map((t) => (
            <li key={t.title} className="rounded-[20px] border border-line bg-white/[0.02] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-violet-bright">{t.day}</p>
              <h3 className="mt-2 font-heading text-[18px] font-semibold text-white">{t.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dark-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="dark" id="needs" title="What we need, and what is not included">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-heading text-[19px] font-semibold text-white">From you</h3>
            <Bullets items={needs} />
            <p className="mt-5 text-[15px] leading-relaxed text-text-dark-muted">We never need passwords or payment details.</p>
          </div>
          <div>
            <h3 className="mb-4 font-heading text-[19px] font-semibold text-white">Not included</h3>
            <Bullets items={notIncluded} />
          </div>
        </div>
      </Band>

      <Band tone="graphite" id="report" title="What the report is shaped like" intro="A layout, not a result. No client report is shown here.">
        <SampleReport />
        <div className="mt-8"><SelectedWork /></div>
      </Band>

      <Band tone="dark" id="free-vs-paid" title="Free review or paid audit?">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">Free suitability review</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">A short conversation about whether AI search work makes sense for your business. No report, no charge, no obligation.</p>
          </div>
          <div className="rounded-[22px] border border-violet-bright/40 bg-violet/[0.05] p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">Paid AI Search Audit</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">The dated baseline, the technical and content review and the written plan, for {formatPrice(audit)}. Invoiced only after we agree the scope in writing.</p>
          </div>
        </div>
        <p className="mt-6 text-[15.5px]">
          Already know you want ongoing work? See the <Link href="/services/ai-search-pricing" className="text-violet-bright underline underline-offset-4">monthly plans</Link>; the audit’s baseline is where they start.
        </p>
      </Band>

      <Band tone="graphite" id="faq" title="Questions about the audit">
        <div className="max-w-4xl">
          <Accordion items={auditFaqs} allowMultiple />
        </div>
      </Band>

      <EnquirySection defaultType="audit" title="Ask about the audit" />
    </>
  );
}
