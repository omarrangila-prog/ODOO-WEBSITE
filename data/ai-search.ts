import { pkrNote } from './currency';
/**
 * ODOOVATIONS AI SEARCH: the copy and structure shared by its pages.
 *
 * The pricing numbers live in data/ai-search-pricing.ts and nowhere else. This file holds
 * everything else that more than one page needs: the comparison, the workstreams, the
 * measurement definitions, the delivery phases, the FAQs and the primary references.
 *
 * Ground rules, applied to every line:
 *  - nothing claims a ranking, a citation, an index entry or a lead that has not been observed;
 *  - Google's own guidance is reported as Google states it: the SEO fundamentals apply, and no special
 *    files, markup or "AI optimisations" are required to appear in AI Overviews or AI Mode;
 *  - platform names say where visibility is measured, never that a platform endorses us;
 *  - there is no client result here because none has been published.
 */

export const AI_SEARCH_UPDATED = '2026-10-30';

export const brandLine = 'ODOOVATIONS AI Search';

export const experiencesLine = 'ChatGPT search, Google AI Overviews and AI Mode, Perplexity and Microsoft Copilot';

export const aiSearchPages = [
  { href: '/services/ai-search-optimization', label: 'AI Search (AEO & GEO)', summary: 'The service hub: what is done, how it is measured and what it costs.' },
  { href: '/services/answer-engine-optimization', label: 'Answer Engine Optimization (AEO)', summary: 'Making your answers easy to find, trust and quote.' },
  { href: '/services/generative-engine-optimization', label: 'Generative Engine Optimization (GEO)', summary: 'Making your business accurately describable by generative AI search.' },
  { href: '/services/ai-search-audit', label: 'AI Search Audit', summary: 'A dated baseline and a written action plan.' },
  { href: '/services/ai-search-pricing', label: 'AI Search packages and pricing', summary: 'Audit, Foundation, Growth, Authority and Enterprise compared.' },
  { href: '/locations/aeo-geo-services-pakistan', label: 'AEO and GEO services in Pakistan', summary: 'What is specific to Pakistan and to our Karachi office.' },
  { href: '/resources/aeo-vs-geo-vs-seo', label: 'AEO vs GEO vs SEO', summary: 'The differences and the overlap, explained.' },
  { href: '/resources/how-to-measure-ai-search-visibility', label: 'How to measure AI search visibility', summary: 'Definitions, method and limits.' },
  { href: '/resources/ai-search-optimization-checklist', label: 'AI search optimization checklist', summary: 'A practical technical and content checklist.' },
] as const;

/* ---------------------------------------------------------------- comparison */

export const comparison = {
  head: ['', 'SEO', 'AEO', 'GEO'],
  rows: [
    ['Stands for', 'Search engine optimization', 'Answer engine optimization', 'Generative engine optimization'],
    ['The question it asks', 'Can people find the right page on my site?', 'Is the answer on my page easy to find, trust and quote?', 'Do generative AI systems describe my business accurately and cite it?'],
    ['Where the result appears', 'Ranked links in search results', 'Featured answers, snippets, voice answers and AI answers', 'Written answers from AI assistants and AI search'],
    ['Mostly works through', 'Crawlable, fast, useful pages and links', 'Direct answers, clear structure and visible evidence', 'Consistent facts across the web, useful content and independent mentions'],
    ['How progress is seen', 'Rankings, impressions, clicks', 'Whether the answer is shown or quoted', 'Whether the brand is named and the domain cited, and whether the description is correct'],
  ],
  note: 'The three overlap heavily. A page that cannot be crawled cannot be quoted, and an answer that nobody trusts is not cited. We treat them as one body of work with different measurements, not as three separate products.',
};

/* ------------------------------------------------------------------ problems */

export const problems = [
  { title: 'Hard to discover', body: 'The pages that answer your buyers’ questions are not indexed, are buried, or sit behind scripts that a crawler may not run.' },
  { title: 'Described wrongly', body: 'An assistant states the wrong services, location or status because it is working from old, thin or conflicting sources.' },
  { title: 'Pages that do not answer', body: 'Service pages open with slogans, so there is no clear, quotable statement of what you do, for whom and on what terms.' },
  { title: 'Content that cannot be read', body: 'Key facts live in images, tabs that need scripts, or PDFs, so they are missed.' },
  { title: 'Better-known sources win', body: 'Directories, reviews and articles about your category are cited instead, and your own page is never the one an answer links to.' },
];

/* --------------------------------------------------------------- workstreams */

export const workstreams = [
  {
    id: 'baseline',
    title: 'Baseline measurement',
    body: 'We agree the buyer questions, record what each search experience says about you and your competitors today, with the date, locale and mode, and note which sources it cites. Every later change is judged against that record.',
    gets: 'A dated baseline and the question list.',
  },
  {
    id: 'technical',
    title: 'Technical foundations',
    body: 'Indexability, canonical URLs, redirects, internal links, sitemaps, rendered content, performance and structured data that matches what is on the page. We also review crawler and CDN controls against each provider’s current published documentation.',
    gets: 'Fixes made, or a prioritised list for your developers.',
  },
  {
    id: 'content',
    title: 'Content improvement',
    body: 'Service and product pages rewritten to state plainly what you do, for whom and on what terms; comparisons and guides for the questions buyers actually ask; named authorship and honest update dates.',
    gets: 'New and improved pages, counted as content units.',
  },
  {
    id: 'entity',
    title: 'Brand and entity consistency',
    body: 'One checked set of facts about the business, used the same way on your site, your verified profiles and your listings, so an assistant meets the same name, address, services and description everywhere.',
    gets: 'A fact sheet and corrected profiles and listings.',
  },
  {
    id: 'authority',
    title: 'Legitimate authority development',
    body: 'Original evidence worth citing, editorial pitches, relevant directory listings and genuine reviews from real customers. We do not buy links, write reviews or place content to borrow another site’s standing.',
    gets: 'Outreach carried out to an agreed scope.',
  },
  {
    id: 'reporting',
    title: 'Reporting and refinement',
    body: 'Mentions, citations, answer accuracy, referral traffic and enquiries reported separately, with the limits stated. What we learn changes the next month’s priorities.',
    gets: 'A monthly report and a call.',
  },
] as const;

/* ------------------------------------------------------------------- process */

export const processSteps = [
  { title: 'Review', body: 'Agree the questions, the competitors and the markets, check access, and record the baseline.' },
  { title: 'Prioritise', body: 'Rank the fixes by how much they matter and how much work they are, and agree what is in scope.' },
  { title: 'Implement', body: 'Make the technical and content changes, with your approval before anything is published.' },
  { title: 'Publish', body: 'Release pages, profile updates and outreach, and ask search engines to recrawl what changed.' },
  { title: 'Measure', body: 'Run the same questions again on the same terms and record what changed and what did not.' },
  { title: 'Refine', body: 'Keep what moved things, drop what did not, and set next month’s priorities.' },
] as const;

/* ------------------------------------------------------------- what is included */

export const aeoIncludes = [
  'Research the questions customers really ask, in their words and in each language you serve.',
  'Rewrite service and product pages so the first lines state the answer plainly.',
  'Create useful comparisons and short, accurate answers to common questions.',
  'Show the evidence behind claims, and put real authorship and update dates on guides.',
  'Keep every essential fact available as readable text, not only in images or scripts.',
];

export const geoIncludes = [
  'Review which of your useful public content can be found, and which cannot.',
  'Improve how the business and its services are described, accurately, wherever it is described.',
  'Make verified profiles and listings agree with your site.',
  'Develop useful content and original evidence that others have a reason to cite.',
  'Carry out legitimate editorial and directory outreach.',
  'Measure mentions, citations and the accuracy of what is said.',
];

export const technicalIncludes = [
  'Indexability and canonical URLs.',
  'Redirects and internal links.',
  'Sitemaps and content that is available when the page is rendered.',
  'Page performance and structured data that matches the visible page.',
  'A review of crawler and CDN controls against each provider’s current documentation.',
];

export const crawlerNote =
  'Search access and training access are different decisions. OpenAI, Anthropic and Perplexity each publish separate crawlers for search, for user-requested fetches and for model training. We review your settings against their current documentation, explain what each does, and keep the choices you have already made.';

/* ----------------------------------------------------------------- measurement */

export const measurementDefinitions = [
  { term: 'Brand mention', definition: 'A valid recorded answer that names the brand, in text, as the business itself and not as a different organisation with a similar name.' },
  { term: 'Valid domain citation', definition: 'A valid recorded answer that links to or cites a page on the client’s own domain as a source.' },
  { term: 'Mention rate', definition: 'Answers naming the brand divided by valid recorded answers.' },
  { term: 'Citation rate', definition: 'Answers citing the domain divided by valid recorded answers.' },
  { term: 'Referral traffic', definition: 'Visits to the site that arrive from an AI search experience, as recorded in the client’s analytics. It is reported on its own and is not the same as a mention.' },
  { term: 'Qualified enquiry', definition: 'An enquiry the client’s team judges to be a real prospect. We report these separately and never present a mention as a lead.' },
];

export const recordFields = [
  'The exact question, as asked',
  'The platform or product',
  'The model, where it is shown',
  'The date and the locale',
  'The search mode used',
  'The URLs cited',
  'The evidence: the answer text, saved',
  'Whether the run was valid or failed',
];

export const measurementLimits = [
  'The same question can produce different answers on different days and from one run to the next, so one run proves little. We repeat runs and report the sample size.',
  'Results from a developer API are not the same as what a person sees in the consumer product, and we do not treat them as the same.',
  'Failed or incomplete runs are recorded separately and left out of the rates.',
  'A small question list gives a rough picture. We say how many valid answers each percentage rests on.',
  'Search volumes are not customers. We do not turn either into a promise of enquiries.',
];

/* --------------------------------------------------------------- delivery phases */

export const deliveryPhases = [
  { days: 'Days 1 to 10', title: 'Questions, access and baseline', body: 'Agree the buyer questions and competitors, review access to the site and profiles, record the baseline and agree priorities.' },
  { days: 'Days 11 to 30', title: 'Foundations and first content', body: 'Make the foundational technical fixes and publish the first content improvements.' },
  { days: 'Days 31 to 60', title: 'Content, consistency and outreach', body: 'Publish further content, bring profiles and listings into line, begin agreed outreach and keep monitoring.' },
  { days: 'Days 61 to 90', title: 'Refine and plan', body: 'Refine what has been learnt, review enquiries with your team and plan the next stage.' },
];

export const phaseNote = 'These are delivery phases, not dates by which a ranking or a mention is expected.';

/* ------------------------------------------------------------------------- faqs */

export const hubFaqs = [
  { question: 'What is AEO and GEO?', answer: 'AEO is answer engine optimization: making the answer on your page easy to find, trust and quote. GEO is generative engine optimization: improving how generative AI systems retrieve, describe and cite your business. Both build on SEO, and we measure them separately.' },
  { question: 'Who provides this service?', answer: 'ODOOVATIONS, a technology company based at Office 604, Landmark Plaza, Karachi, Pakistan, serving clients in Pakistan and abroad remotely. The work is done by our own team, and the same company builds the software, websites and automation that many AI search recommendations depend on.' },
  { question: 'Which AI search experiences do you cover?', answer: 'The default set is ChatGPT search, Google AI Overviews and AI Mode, and Perplexity, with Microsoft Copilot added on larger plans. The set is agreed in your scope and can change as products change.' },
  { question: 'Does Google need special markup or files for AI Overviews?', answer: 'No. Google states that there are no additional requirements to appear in AI Overviews or AI Mode, and that no special machine-readable files, AI text files or markup are needed. A page must be indexed and eligible to be shown in Search with a snippet. The fundamentals of SEO apply, which is why that is where most of the work lies.' },
  { question: 'Can you guarantee that ChatGPT or Google will mention us?', answer: 'No, and nobody honestly can. We improve what these systems can find and trust, and we measure what they say. We do not guarantee rankings, citations, mentions or leads.' },
  { question: 'How do you measure progress?', answer: 'We record a dated baseline of the agreed questions, then repeat them on the same terms and report brand mentions, domain citations, mention rate, citation rate, referral traffic and qualified enquiries separately, with the sample size and the limits.' },
  { question: 'Do I own the work?', answer: 'Content written for your site, and changes made on your site, are yours. We agree who owns accounts and profiles in the scope, and they should be in your name.' },
  { question: 'How is this different from SEO?', answer: 'It builds on SEO rather than replacing it. The extra attention goes to direct answers, consistent facts across the web, independent sources and measuring what AI systems actually say.' },
];

export const aeoFaqs = [
  { question: 'What is answer engine optimization?', answer: 'It is the work of making the answer to a question easy for a search or AI system to find, understand and quote: a direct statement near the top of the page, clear structure, visible evidence and readable text.' },
  { question: 'Is structured data required for answer engines?', answer: 'Not to appear in Google’s AI features, where Google says no special markup is needed. Structured data helps systems understand a page when it matches what is visible, so we add it where it is accurate and useful, never as a trick.' },
  { question: 'Should every page start with a direct answer?', answer: 'Pages that exist to answer a question should. A short, plain answer first, then the detail, serves the reader as well as any system quoting the page. Pages that serve other purposes should not be forced into that shape.' },
  { question: 'Do FAQs help?', answer: 'Real questions that buyers ask, answered honestly and visible on the page, help people and systems alike. FAQ blocks added only to carry keywords do not, and Google’s spam policies cover keyword stuffing.' },
  { question: 'How long before an answer changes?', answer: 'After a page is updated, search engines need to recrawl it, which can take days to months, and AI systems then need to retrieve it. We record the baseline first so the change can be seen when it comes.' },
];

export const geoFaqs = [
  { question: 'What does GEO stand for?', answer: 'Generative engine optimization. The term was popularised by a 2023 research paper, “GEO: Generative Engine Optimization”, and is now used for work that improves how generative AI search systems retrieve, summarise and cite a business.' },
  { question: 'How do generative systems choose what to mention?', answer: 'Systems with web search retrieve pages and combine them into an answer, so being indexed, readable, consistent and supported by independent sources matters. The exact selection is not published and changes, so we measure it rather than claim to know it.' },
  { question: 'Can you pay to be cited?', answer: 'No. We do not buy links, pay for placement presented as editorial, write reviews or create content to borrow another site’s standing. Google’s spam policies treat those as spam, and assistants learn to distrust them.' },
  { question: 'Does blocking training crawlers hide us from AI search?', answer: 'Not necessarily. The providers publish separate crawlers for search and for training and say each setting is independent. For example, OpenAI documents that blocking GPTBot does not by itself remove a site from ChatGPT search, which uses OAI-SearchBot. We review the current documentation with you and keep your choice.' },
  { question: 'Do reviews and directory profiles matter?', answer: 'They are among the independent sources that answers often cite. We help you set up and correct profiles and ask real customers for reviews, and we never write or buy them.' },
];

export const auditFaqs = [
  { question: 'Is the audit a commitment?', answer: 'Asking about it is free and commits you to nothing. The audit is a one-time paid service, invoiced only after we have agreed the scope in writing.' },
  { question: 'What is the difference between the free review and the audit?', answer: 'The free suitability review is a short conversation about whether AI search work makes sense for you, with no report. The paid audit produces a dated baseline across the agreed questions, a technical and content review and a prioritised written plan.' },
  { question: 'How long does it take?', answer: 'We aim to deliver the report five business days after we have the information we need. That is a delivery commitment and not a promise about search results.' },
  { question: 'What do you need from us?', answer: 'The website address, the market and language, a list of the questions you would like tested or permission to draft them, up to three competitors, and read access to analytics or Search Console where you have it. We never need passwords or payment details.' },
  { question: 'What happens after the audit?', answer: 'You own the report and can act on it yourself, with your own developers or with us. If you choose a monthly plan, we start from the baseline already recorded.' },
];

export const pricingFaqs = [
  { question: 'Are these prices fixed?', answer: 'They are the launch prices for the packages as described. The scope in your written agreement is what counts, and anything outside it is quoted before it starts.' },
  { question: 'What is a content unit?', answer: 'One agreed new page, or one substantial improvement to an existing page. Complexity is agreed before production, so a unit is never open-ended.' },
  { question: 'Is anything unlimited?', answer: 'No. Technical work is delivered within a defined monthly capacity, and the number of questions, markets, competitors and content units for each plan is stated above.' },
  { question: 'Can I pay in rupees?', answer: pkrNote },
  { question: 'Why is there a 90-day start?', answer: 'Search and AI systems need time to recrawl and retrieve changed pages, and a single month rarely shows a trend. After 90 days a plan renews monthly and you can cancel with 30 days’ notice.' },
  { question: 'Is ad spend or any tool cost included?', answer: 'Monitoring within the agreed scope is included. Any third-party cost beyond that is shown to you and approved before it is incurred. Taxes are not included.' },
  { question: 'Can I start with the audit and move to a plan?', answer: 'Yes. The audit’s baseline is where a monthly plan starts, so nothing is repeated.' },
];

/* ------------------------------------------------------------------- references */

export const references = {
  googleAi: { label: 'Google Search Central: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
  googleSpam: { label: 'Google Search Central: spam policies', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
  googleOrg: { label: 'Google Search Central: Organization structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/organization' },
  googleBasics: { label: 'Google Search Central: SEO starter guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
  openai: { label: 'OpenAI: crawlers and user agents', url: 'https://developers.openai.com/api/docs/bots' },
  anthropic: { label: 'Anthropic: crawler and robots.txt guidance', url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
  perplexity: { label: 'Perplexity: crawlers', url: 'https://docs.perplexity.ai/guides/bots' },
  schemaOrg: { label: 'Schema.org', url: 'https://schema.org/' },
  gerPaper: { label: 'Aggarwal et al., “GEO: Generative Engine Optimization” (arXiv, 2023)', url: 'https://arxiv.org/abs/2311.09735' },
};
