import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { aiServiceSchema, aiWebPage } from '@/lib/ai-search/schema';
import { getService } from '@/data/services';
import { aeoIncludes, aeoFaqs, references } from '@/data/ai-search';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/ui/CtaBand';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band, Bullets } from '@/components/ai-search/Layout';

const PATH = '/services/answer-engine-optimization';
const service = getService('answer-engine-optimization')!;
export const metadata: Metadata = buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'What we do', path: '/services' },
  { name: 'AI Search (AEO & GEO)', path: '/services/ai-search-optimization' },
  { name: 'Answer Engine Optimization', path: PATH },
];

const questionSources = [
  'Sales calls and enquiry emails: what people ask before they buy.',
  'Support and WhatsApp messages: what they ask after.',
  'Search Console queries: the words people already use to reach you.',
  'The questions your competitors’ pages answer, and the ones they leave out.',
  'Your own team: the things they are tired of explaining.',
];

export default function AeoPage() {
  return (
    <>
      <JsonLd
        data={[
          aiWebPage({ path: PATH, name: service.title, description: service.metaDescription, mainService: true }),
          aiServiceSchema({ path: PATH, name: 'Answer Engine Optimization (AEO)', serviceType: 'Answer engine optimization', description: service.answer! }),
          breadcrumbSchema(crumbs),
          faqSchema(aeoFaqs),
        ]}
      />
      <Hero
        crumbs={crumbs}
        eyebrow="AI Search · AEO"
        title={
          <>
            Answer Engine Optimization <span className="signal-text">(AEO) Services</span>
          </>
        }
        lede="Make the answer on your page easy to find, trust and quote."
        primary={{ label: 'Request an AI Search Review', href: '/services/ai-search-optimization#enquiry' }}
        secondary={{ label: 'View Packages', href: '/services/ai-search-pricing' }}
      />

      <Band tone="graphite" id="what-is-aeo">
        <AnswerCard question="What is answer engine optimization?" className="max-w-4xl border-line text-text-dark-muted">
          <p>{service.answer}</p>
          <p className="mt-4 text-[15px]">
            AEO is one part of <Link href="/services/ai-search-optimization" className="text-violet-bright underline underline-offset-4">ODOOVATIONS AI Search</Link>. Its companion is{' '}
            <Link href="/services/generative-engine-optimization" className="text-violet-bright underline underline-offset-4">generative engine optimization (GEO)</Link>, and{' '}
            <Link href="/resources/aeo-vs-geo-vs-seo" className="text-violet-bright underline underline-offset-4">AEO vs GEO vs SEO</Link> explains how the three relate.
          </p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="includes" title="What AEO work includes" intro="Five kinds of work, each with something you can read afterwards.">
        <div className="max-w-3xl">
          <Bullets items={aeoIncludes} />
        </div>
      </Band>

      <Band tone="graphite" id="rewrite" title="What an answer-first page looks like" intro="A fictional example, to show the difference. The business and the wording are invented.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[22px] border border-line p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted">Before</p>
            <p className="mt-3 text-[17px] leading-relaxed text-text-dark-muted">“Welcome to Example Traders, where excellence meets innovation in packaging solutions for the modern enterprise.”</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-text-dark-muted">A reader, or a system quoting the page, cannot tell what the business sells, to whom, or where.</p>
          </div>
          <div className="rounded-[22px] border border-violet-bright/40 bg-violet/[0.05] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-violet-bright">After</p>
            <p className="mt-3 text-[17px] leading-relaxed text-text-dark">“Example Traders supplies bulk corrugated packaging to food manufacturers in Sindh. Minimum order is 500 units; lead times are confirmed in each quote.”</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-text-dark-muted">The same page can then go on to explain the range, the process and the evidence. It begins with the answer.</p>
          </div>
        </div>
      </Band>

      <Band tone="dark" id="questions" title="Where the questions come from" intro="We start from what buyers actually ask, not from a keyword list.">
        <div className="max-w-3xl">
          <Bullets items={questionSources} />
          <p className="mt-6 text-[15.5px] leading-relaxed text-text-dark-muted">
            Search volumes, where we use them, are recorded with their source, date, country and language, and are treated as a guide to interest, never as a count of customers.
          </p>
        </div>
      </Band>

      <Band tone="graphite" id="not" title="What AEO is not">
        <div className="max-w-3xl space-y-4 text-[16.5px] leading-relaxed text-text-dark-muted">
          <p>AEO does not need a special file or secret markup. Google states that no machine-readable files, AI text files or markup are needed to appear in its AI features, and that structured data should match the visible text. We add structured data where it is accurate and useful, and we do not present it, or any file, as a requirement.</p>
          <p>It is not hidden text, keyword stuffing or content written for crawlers. Google’s spam policies cover those, and so does our contract: we do not do them.</p>
          <p>And it is not a promise. Nobody controls what an assistant says. We improve what it can find and trust, and we measure the result honestly.</p>
        </div>
        <p className="mt-8 text-[14px] text-text-dark-muted">
          Sources: <a href={references.googleAi.url} rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">{references.googleAi.label}</a>;{' '}
          <a href={references.googleSpam.url} rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">{references.googleSpam.label}</a>.
        </p>
      </Band>

      <Band tone="dark" id="faq" title="Questions about AEO">
        <div className="max-w-4xl">
          <Accordion items={aeoFaqs} allowMultiple />
        </div>
      </Band>

      <CtaBand
        title="See where your answers stand"
        body="Ask for a free suitability review, or start with a paid audit. Asking is free and commits you to nothing."
        primaryLabel="Request an AI Search Review"
        primaryHref="/services/ai-search-optimization#enquiry"
        secondaryLabel="See the audit"
        secondaryHref="/services/ai-search-audit"
      />
    </>
  );
}
