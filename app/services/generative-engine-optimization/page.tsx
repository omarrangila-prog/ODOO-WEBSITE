import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { aiServiceSchema, aiWebPage } from '@/lib/ai-search/schema';
import { getService } from '@/data/services';
import { geoIncludes, geoFaqs, crawlerNote, references } from '@/data/ai-search';
import { experienceNotice, searchExperiences } from '@/data/ai-search-pricing';
import { JsonLd } from '@/components/ui/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/ui/CtaBand';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { Hero, Band, Bullets } from '@/components/ai-search/Layout';

const PATH = '/services/generative-engine-optimization';
const service = getService('generative-engine-optimization')!;
export const metadata: Metadata = buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'What we do', path: '/services' },
  { name: 'AI Search (AEO & GEO)', path: '/services/ai-search-optimization' },
  { name: 'Generative Engine Optimization', path: PATH },
];

const crawlers = [
  ['OpenAI', 'OAI-SearchBot', 'Search', 'Surfaces sites in ChatGPT search. A site that opts out is not shown in ChatGPT search answers.'],
  ['OpenAI', 'GPTBot', 'Training', 'Content that may be used to train generative AI models. OpenAI says blocking it does not by itself remove a site from search.'],
  ['OpenAI', 'ChatGPT-User', 'User request', 'Actions a user asks ChatGPT to take. OpenAI says robots.txt rules may not apply.'],
  ['Anthropic', 'Claude-SearchBot', 'Search', 'Improves the quality of search results.'],
  ['Anthropic', 'Claude-User', 'User request', 'Fetches pages when a user asks something that needs the web.'],
  ['Anthropic', 'ClaudeBot', 'Training', 'Collects content that may be used for model training.'],
  ['Perplexity', 'PerplexityBot', 'Search', 'Surfaces and links sites in Perplexity. Perplexity says it is not used for training foundation models.'],
  ['Perplexity', 'Perplexity-User', 'User request', 'User-initiated fetches. Perplexity says it generally ignores robots.txt because a user asked for the fetch.'],
  ['Google', 'Googlebot', 'Search', 'Search, including AI Overviews and AI Mode. Limit what is shown with nosnippet, max-snippet or noindex.'],
  ['Google', 'Google-Extended', 'Training and grounding', 'Limits use of content for AI training and grounding in some other Google systems. It is not a search control.'],
];

export default function GeoPage() {
  return (
    <>
      <JsonLd
        data={[
          aiWebPage({ path: PATH, name: service.title, description: service.metaDescription, mainService: true }),
          aiServiceSchema({ path: PATH, name: 'Generative Engine Optimization (GEO)', serviceType: 'Generative engine optimization', description: service.answer! }),
          breadcrumbSchema(crumbs),
          faqSchema(geoFaqs),
        ]}
      />
      <Hero
        crumbs={crumbs}
        eyebrow="AI Search · GEO"
        title={
          <>
            Generative Engine Optimization <span className="signal-text">(GEO) Services</span>
          </>
        }
        lede="Help generative AI search describe your business accurately, and cite it."
        primary={{ label: 'Request an AI Search Review', href: '/services/ai-search-optimization#enquiry' }}
        secondary={{ label: 'View Packages', href: '/services/ai-search-pricing' }}
        art={3}
      />

      <Band tone="graphite" id="what-is-geo">
        <AnswerCard question="What is generative engine optimization?" className="max-w-4xl border-line text-text-dark-muted">
          <p>{service.answer}</p>
          <p className="mt-4 text-[15px]">
            GEO stands for generative engine optimization. The term was popularised by a 2023 research paper (
            <a href={references.gerPaper.url} rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">Aggarwal et al.</a>
            ). It sits beside <Link href="/services/answer-engine-optimization" className="text-violet-bright underline underline-offset-4">answer engine optimization (AEO)</Link> inside{' '}
            <Link href="/services/ai-search-optimization" className="text-violet-bright underline underline-offset-4">ODOOVATIONS AI Search</Link>.
          </p>
        </AnswerCard>
      </Band>

      <Band tone="dark" id="includes" title="What GEO work includes">
        <div className="max-w-3xl">
          <Bullets items={geoIncludes} />
        </div>
      </Band>

      <Band tone="graphite" id="measured" title="Where we look, and how we count" intro="Mentions and citations are counted from recorded answers, on the same terms each time.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">Search experiences</h3>
            <ul className="mt-3 space-y-2 text-[16px] text-text-dark">
              {searchExperiences.map((e) => (
                <li key={e.id}>{e.label}</li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-relaxed text-text-dark-muted">{experienceNotice}</p>
          </div>
          <div className="rounded-[22px] border border-line p-6">
            <h3 className="font-heading text-[19px] font-semibold text-white">What we record</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-dark-muted">
              The exact question, the platform and model where shown, the date and locale, the search mode, the URLs cited and the saved answer. Mention rate is answers naming the brand divided by valid recorded answers; citation rate is answers citing the domain divided by valid recorded answers. Failed runs are kept separately.
            </p>
            <p className="mt-3 text-[15.5px]">
              <Link href="/resources/how-to-measure-ai-search-visibility" className="text-violet-bright underline underline-offset-4">How we measure AI search visibility</Link>
            </p>
          </div>
        </div>
      </Band>

      <Band tone="dark" id="crawlers" title="Crawlers: search and training are separate decisions" intro={crawlerNote}>
        <div className="overflow-x-auto rounded-[22px] border border-line">
          <table className="w-full min-w-[780px] border-collapse text-left text-[14.5px]">
            <caption className="sr-only">Crawlers published by OpenAI, Anthropic, Perplexity and Google, and what each provider says they are for</caption>
            <thead>
              <tr className="bg-white/[0.03] text-[13px] uppercase tracking-[0.1em] text-text-dark-muted">
                <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
                <th scope="col" className="px-4 py-3 font-semibold">Crawler</th>
                <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                <th scope="col" className="px-4 py-3 font-semibold">What the provider says</th>
              </tr>
            </thead>
            <tbody>
              {crawlers.map(([prov, bot, purpose, says]) => (
                <tr key={bot} className="border-t border-line align-top">
                  <td className="px-4 py-3 text-text-dark-muted">{prov}</td>
                  <th scope="row" className="px-4 py-3 font-medium text-text-dark">{bot}</th>
                  <td className="px-4 py-3 text-text-dark">{purpose}</td>
                  <td className="px-4 py-3 leading-snug text-text-dark-muted">{says}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-text-dark-muted">
          Summarised from each provider’s documentation as read on 30 October 2026. They change, so we recheck before advising. Sources:{' '}
          {[references.openai, references.anthropic, references.perplexity, references.googleAi].map((r, i, a) => (
            <span key={r.url}>
              <a href={r.url} rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">{r.label}</a>
              {i < a.length - 1 ? '; ' : '.'}
            </span>
          ))}
        </p>
        <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-text-dark-muted">
          We keep the access choices you have already made. Allowing or blocking training is your decision, and we explain what each setting does before anything is changed.
        </p>
      </Band>

      <Band tone="graphite" id="faq" title="Questions about GEO">
        <div className="max-w-4xl">
          <Accordion items={geoFaqs} allowMultiple />
        </div>
      </Band>

      <CtaBand
        title="Find out how AI search describes you"
        body="Ask for a free suitability review, or start with a paid audit. Asking is free and commits you to nothing."
        primaryLabel="Request an AI Search Review"
        primaryHref="/services/ai-search-optimization#enquiry"
        secondaryLabel="See the audit"
        secondaryHref="/services/ai-search-audit"
      />
    </>
  );
}
