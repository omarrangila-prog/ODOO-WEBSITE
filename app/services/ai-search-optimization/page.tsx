import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { aiServiceSchema, aiWebPage } from '@/lib/ai-search/schema';
import { getService } from '@/data/services';
import { plans, monthlyPlans, formatPrice, outcomeNotice, experienceNotice } from '@/data/ai-search-pricing';
import {
  comparison,
  problems,
  workstreams,
  processSteps,
  hubFaqs,
  experiencesLine,
  crawlerNote,
  technicalIncludes,
} from '@/data/ai-search';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band, Bullets, EnquirySection } from '@/components/ai-search/Layout';
import { AnswerPathDiagram } from '@/components/ai-search/AnswerPathDiagram';
import { SampleReport } from '@/components/ai-search/SampleReport';
import { SelectedWork } from '@/components/ai-search/SelectedWork';

const PATH = '/services/ai-search-optimization';
const service = getService('ai-search-optimization')!;

export const metadata: Metadata = buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'What we do', path: '/services' },
  { name: 'AI Search (AEO & GEO)', path: PATH },
];

const buying = [
  { title: 'Research', body: 'The questions your buyers ask, the competitors that appear, and a dated record of what each search experience says today.' },
  { title: 'Implementation', body: 'Technical fixes on your site: indexing, redirects, rendering, performance and structured data that matches the page.' },
  { title: 'Content', body: 'Service pages that answer plainly, comparisons and guides for real questions, with evidence and named authorship.' },
  { title: 'Authority', body: 'Consistent profiles and listings, original evidence worth citing, editorial outreach and genuine reviews, never purchased links.' },
  { title: 'Reporting', body: 'A monthly report that keeps mentions, citations, referral traffic and enquiries separate, with the limits stated.' },
];

const wontDo = [
  'Guarantee that an assistant will mention, cite or recommend you.',
  'Sell a special file or markup as a requirement. Google says none is needed for its AI features.',
  'Hide text or instructions for machines, or write content only for crawlers.',
  'Buy links, write reviews or publish near-identical pages in bulk.',
];

export default function AiSearchHub() {
  return (
    <>
      <JsonLd
        data={[
          aiWebPage({ path: PATH, name: service.title, description: service.metaDescription, mainService: true }),
          aiServiceSchema({ path: PATH, name: 'ODOOVATIONS AI Search: AEO and GEO', serviceType: 'AI search optimization (AEO and GEO)', description: service.answer!, offers: true }),
          breadcrumbSchema(crumbs),
          faqSchema(hubFaqs),
        ]}
      />

      <Hero
        crumbs={crumbs}
        eyebrow="ODOOVATIONS AI Search"
        title={
          <>
            AEO &amp; GEO Services for <span className="signal-text">AI Search Visibility</span>
          </>
        }
        lede="Help your business become easier to discover, understand and cite in AI answers."
        primary={{ label: 'Request an AI Search Review', href: '#enquiry' }}
        secondary={{ label: 'View Packages', href: '/services/ai-search-pricing' }}
        aside={<AnswerPathDiagram />}
      />

      <Band tone="graphite" id="what-it-is">
        <AnswerCard question="What is ODOOVATIONS AI Search?" className="max-w-4xl border-line text-text-dark-muted">
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="font-heading text-[16px] font-semibold text-white">Who provides it</dt>
              <dd className="mt-1 text-[15.5px] leading-relaxed">ODOOVATIONS, a technology company at Office 604, Landmark Plaza, Karachi, Pakistan, serving clients in Pakistan and abroad remotely.</dd>
            </div>
            <div>
              <dt className="font-heading text-[16px] font-semibold text-white">What you receive</dt>
              <dd className="mt-1 text-[15.5px] leading-relaxed">A dated baseline of what AI search says about you, technical and content improvements, consistent facts across your site and profiles, legitimate outreach and a monthly report.</dd>
            </div>
            <div>
              <dt className="font-heading text-[16px] font-semibold text-white">What it covers</dt>
              <dd className="mt-1 text-[15.5px] leading-relaxed">{experiencesLine}, agreed in your scope.</dd>
            </div>
            <div>
              <dt className="font-heading text-[16px] font-semibold text-white">How progress is measured</dt>
              <dd className="mt-1 text-[15.5px] leading-relaxed">Brand mentions, valid domain citations, mention rate, citation rate, referral traffic and qualified enquiries, each reported separately.</dd>
            </div>
          </dl>
          <p className="mt-6 text-[14px] leading-relaxed text-text-dark-muted">{experienceNotice}</p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="buying" title="What you are buying" intro="Five kinds of work, done by people, with a record of each. This is not a tool subscription and it is not a set of tricks.">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {buying.map((b, i) => (
            <li key={b.title} className="rounded-[20px] border border-line bg-white/[0.02] p-5">
              <p aria-hidden className="text-[12px] tracking-[0.16em] text-violet">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-heading text-[19px] font-semibold tracking-[-0.02em] text-white">{b.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{b.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="graphite" id="compare" title="SEO, AEO and GEO: the same body of work" intro={comparison.note}>
        <div className="overflow-x-auto rounded-[22px] border border-line">
          <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Comparison of SEO, AEO and GEO</caption>
            <thead>
              <tr className="bg-white/[0.03]">
                {comparison.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3.5 font-heading text-[15px] font-semibold text-white">
                    {h || <span className="sr-only">Aspect</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-3 font-medium text-text-dark">{row[0]}</th>
                  {row.slice(1).map((c, i) => (
                    <td key={i} className="px-4 py-3 leading-snug text-text-dark-muted">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[15px]">
          Read the full explanation in{' '}
          <Link href="/resources/aeo-vs-geo-vs-seo" className="text-violet-bright underline underline-offset-4">AEO vs GEO vs SEO</Link>, or go straight to the{' '}
          <Link href="/services/answer-engine-optimization" className="text-violet-bright underline underline-offset-4">AEO service</Link> or the{' '}
          <Link href="/services/generative-engine-optimization" className="text-violet-bright underline underline-offset-4">GEO service</Link>.
        </p>
      </Band>

      <Band tone="dark" id="problems" title="Problems this addresses">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <li key={p.title} className="rounded-[20px] border border-line p-5">
              <h3 className="font-heading text-[18px] font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="graphite" id="workstreams" title="Six workstreams" intro="Every plan draws on the same six. What changes between plans is how much of each is done, and how often it is measured.">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workstreams.map((w, i) => (
            <li key={w.id} className="flex flex-col rounded-[22px] border border-line bg-white/[0.02] p-6">
              <p aria-hidden className="text-[12px] tracking-[0.16em] text-violet">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-heading text-[21px] font-semibold tracking-[-0.02em] text-white">{w.title}</h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-text-dark-muted">{w.body}</p>
              <p className="mt-4 border-t border-line pt-3 text-[14.5px] text-text-dark">
                <span className="text-violet-bright">You receive: </span>
                {w.gets}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-[15.5px] leading-relaxed text-text-dark-muted">{crawlerNote}</p>
        <details className="mt-4 max-w-3xl rounded-panel border border-line/70 bg-white/[0.02]">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center px-4 py-3 text-[15px] font-semibold text-text-dark [&::-webkit-details-marker]:hidden">The technical foundations, in full</summary>
          <div className="border-t border-line/70 px-4 py-4">
            <Bullets items={technicalIncludes} />
          </div>
        </details>
      </Band>

      <Band tone="dark" id="process" title="How the work runs" intro="Review, prioritise, implement, publish, measure, refine. Then again, with what the last round taught us.">
        <ol className="grid gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-6">
          {processSteps.map((s, i) => (
            <li key={s.title}>
              <p aria-hidden className="flex items-center gap-3 text-[12px] tracking-[0.18em] text-violet">
                {String(i + 1).padStart(2, '0')}
                <span className="h-px flex-1 bg-line-strong" />
              </p>
              <h3 className="mt-2.5 font-heading text-[19px] font-semibold text-white">{s.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-dark-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="graphite" id="pricing" title="Packages and pricing" intro="Launch pricing in US dollars, before taxes. Every plan begins with a written scope, and sending an enquiry is free.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[plans[0]!, ...monthlyPlans].map((p) => (
            <li key={p.id} className="rounded-[20px] border border-line bg-white/[0.02] p-5">
              <h3 className="font-heading text-[18px] font-semibold text-white">{p.name}</h3>
              <p className="mt-2 font-heading text-[26px] font-semibold tracking-[-0.03em] text-white">{formatPrice(p)}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dark-muted">{p.forWho}</p>
              <p className="mt-3">
                <Link href={`/services/ai-search-pricing#plan-${p.id}`} className="inline-flex min-h-[44px] items-center text-[15px] text-violet-bright underline underline-offset-4">
                  See what {p.name} includes
                </Link>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-text-dark-muted">
          There is also an Enterprise option, quoted individually.{' '}
          <Link href="/services/ai-search-pricing" className="text-violet-bright underline underline-offset-4">Compare every package and read the terms</Link>. {outcomeNotice}
        </p>
      </Band>

      <Band tone="dark" id="evidence" title="What we can show today" intro="No client result is published here, because none has been agreed for publication. What exists is below, labelled for what it is.">
        <div className="mb-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">Our own baseline</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">
              On 29 October 2026, before our site was indexed, web searches for “ODOOVATIONS Karachi” and “odoovations.com” returned no page from our domain and suggested similarly named firms instead. That is the problem this service exists to fix, and it is our own starting point.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">
              Since then we have applied the same fundamentals to odoovations.com: a published fact sheet, answer-first service pages, linked structured data, a sitemap with honest dates and verified Search Console and Bing access. We have not yet observed whether that changes what AI search says, and we will publish the follow-up when we have.{' '}
              <Link href="/company/brand" className="text-violet-bright underline underline-offset-4">See the fact sheet</Link>.
            </p>
          </div>
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">What we will not show you</h3>
            <div className="mt-3">
              <Bullets items={wontDo} />
            </div>
          </div>
        </div>
        <SampleReport />
        <div className="mt-8"><SelectedWork /></div>
      </Band>

      <Band tone="graphite" id="faq" title="Questions buyers ask">
        <div className="max-w-4xl">
          <Accordion items={hubFaqs} allowMultiple />
        </div>
      </Band>

      <EnquirySection defaultType="free-review" title="Request an AI Search Review" />
    </>
  );
}
