import type { Resource } from './resources';

/**
 * Guides on three questions buyers ask once their site is crawlable: does schema help, how do other sites'
 * mentions affect AI answers, and how does a local business show up. Researched 16 November 2026. Platform
 * documentation is stated as fact; vendor studies are labelled as studies, with their limits.
 */
const U = '2026-11-16';
const r = (slug: string) => `/resources/${slug}`;

export const aiVisibilityGuides: Resource[] = [
  {
    slug: 'structured-data-for-ai-search', href: r('structured-data-for-ai-search'),
    metaTitle: 'Does Schema Markup Help AI Search? | ODOOVATIONS',
    metaDescription: 'What Google and Microsoft actually say about structured data and AI answers, what the studies show, and which schema is still worth adding.',
    h1: 'Does structured data help you appear in AI search?', eyebrow: 'AI search guide', updated: U, readMinutes: 6,
    primaryKeyword: 'schema markup for AI search',
    summary: 'Google says no special schema is needed to appear in AI Overviews or AI Mode, and that any structured data you add must match the visible page. Microsoft has said publicly that schema helps its models, including Copilot, understand content. Published studies disagree on whether schema raises citations. Our advice: add accurate, standard schema for the things you really are (organisation, services, products, articles, FAQs you show on the page), keep it in step with the text, and do not expect it to win citations on its own.',
    blocks: [
      { type: 'h2', text: 'What each company says' },
      { type: 'table', head: ['Source', 'What it says', 'Status'], rows: [
        ['Google, AI features documentation', 'No new machine-readable files, AI text files or special schema.org markup are needed to appear in AI features. Make sure structured data matches the visible text.', 'Official documentation'],
        ['Google, structured data guidelines', 'Structured data helps Google understand a page and makes it eligible for rich results; it must describe content users can see.', 'Official documentation'],
        ['Microsoft Bing', 'Fabrice Canel of Bing said on stage at SMX Munich (March 2025) that schema helps Microsoft’s models understand content.', 'Public statement, reported by press; no Microsoft document'],
        ['OpenAI, Anthropic, Perplexity', 'No public statement that their assistants read schema.', 'Unknown'],
      ] },
      { type: 'note', text: 'Checked 16 November 2026. Studies by SEO tool vendors reach opposite conclusions on whether schema increases citations, and the ones that find a link show correlation, not cause.' },
      { type: 'h2', text: 'Schema still worth adding' },
      { type: 'list', items: [
        'Organization: your legal and trading name, logo, website, and the profiles that are really yours (sameAs).',
        'LocalBusiness, if you serve customers at an address: hours, address and phone exactly as on your Google Business Profile.',
        'Service or Product with Offer: only prices you actually publish on the page.',
        'Article: author, date published and date updated, matching what the page shows.',
        'FAQPage and BreadcrumbList: only where the questions and the breadcrumb are visible.',
      ] },
      { type: 'h2', text: 'Mistakes that cost more than they gain' },
      { type: 'list', items: [
        'Marking up reviews, ratings or awards that are not on the page, or not real. This breaks Google’s policies and can earn a manual action.',
        'Schema that says one price and a page that says another.',
        'Generators that stamp the same Organization block with different names on different pages.',
        'Treating “AI schema” products as a shortcut. There is no schema type that requests a citation.',
      ] },
      { type: 'h2', text: 'How to check yours' },
      { type: 'p', text: 'Run key pages through Google’s Rich Results Test and the Schema.org validator, then compare the output against what a visitor sees. Every field should be something you would be comfortable defending to a customer.' },
    ],
    faqs: [
      { question: 'Will adding schema get us cited in ChatGPT?', answer: 'Nobody can promise that. OpenAI has not said ChatGPT reads schema. Clear text on a page its search crawler can reach matters more.' },
      { question: 'Does Google need schema for AI Overviews?', answer: 'No. Google says a page only needs to be indexed and eligible to show with a snippet. Schema is still useful for rich results.' },
      { question: 'Is FAQ schema still worth it?', answer: 'Where the questions are visible and genuinely useful, it costs little and describes the page accurately. Do not expect a rich result for it on most sites.' },
    ],
    relatedServices: [
      { label: 'Search structured data', href: '/services/search-structured-data' },
      { label: 'AI Search (AEO & GEO)', href: '/services/ai-search-optimization' },
      { label: 'Technical SEO', href: '/services/technical-seo' },
    ],
    relatedResources: ['google-ai-mode-ai-overviews-guide', 'ai-search-optimization-checklist', 'get-cited-in-microsoft-copilot'],
    references: [
      { label: 'Google: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
      { label: 'Google: introduction to structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data' },
      { label: 'Search Engine Roundtable: Microsoft says schema helps its LLMs', url: 'https://www.seroundtable.com/schema-llms-copilot-bing-microsoft-39093.html' },
      { label: 'Google: spam policies', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
    ],
  },
  {
    slug: 'brand-mentions-ai-search', href: r('brand-mentions-ai-search'),
    metaTitle: 'Brand Mentions and AI Search: What Moves Answers | ODOOVATIONS',
    metaDescription: 'Why AI assistants often cite Reddit, YouTube, Wikipedia and review sites over your own website, what the 2026 studies show, and how to earn mentions honestly.',
    h1: 'Brand mentions and AI search: why other sites matter more than yours', eyebrow: 'AI search guide', updated: U, readMinutes: 7,
    primaryKeyword: 'brand mentions AI search',
    summary: 'When an AI assistant recommends a business, it often leans on what other sites say: discussion forums, videos, encyclopaedias, review sites and trade press. Studies from 2026 consistently find community and review sources among the most cited, though they disagree on the order. The honest response is to be worth mentioning and easy to verify: real customer reviews, useful answers in communities under your own name, and coverage you earn. Planting posts, buying reviews or editing Wikipedia about yourself breaks those sites’ rules and can backfire.',
    blocks: [
      { type: 'h2', text: 'What the studies found' },
      { type: 'table', head: ['Study', 'Finding', 'Read with care because'], rows: [
        ['Peec AI, 30 million sources (March 2026)', 'Reddit was the most cited domain across ChatGPT, Google AI Mode, Gemini, Perplexity and AI Overviews in the US; YouTube and Wikipedia also ranked high.', 'US results only; a vendor study'],
        ['Writesonic, 2,000+ brands', 'A Reddit or YouTube mention was linked with about three times the chance of a brand appearing in an answer; a mention on the brand’s own site with about 1.3 times.', 'Correlation across categories; a vendor study'],
        ['Several 2026 analyses', 'The top source changes by assistant and by industry; no single site matters for everyone.', 'Methods differ widely between studies'],
      ] },
      { type: 'note', text: 'None of these companies publishes how it weighs sources. Treat the studies as a guide to where buyers and models look, not as a formula.' },
      { type: 'h2', text: 'What to do' },
      { type: 'list', items: [
        'Find where your buyers already talk: ask your fixed question set to each assistant and note which sites it cites for your category.',
        'Ask real customers for reviews on the platforms that show up, and answer every review, including the bad ones.',
        'Answer questions in communities under your real name and company, following each community’s rules on self-promotion.',
        'Publish evidence others can cite: original data, clear pricing, worked examples. Journalists and bloggers link to what they can check.',
        'Keep your name, services and contact details identical on every profile you control.',
      ] },
      { type: 'h2', text: 'What not to do' },
      { type: 'list', items: [
        'Do not buy or script reviews, or post as a “happy customer”. It breaks platform rules and consumer law in many countries.',
        'Do not write or edit a Wikipedia article about your own company. Wikipedia’s conflict-of-interest guideline asks you to propose changes on the talk page instead.',
        'Do not run fake accounts on Reddit or forums. Reddit’s content policy prohibits vote and content manipulation.',
        'Do not buy links or mentions labelled as editorial. Google treats it as link spam.',
      ] },
    ],
    faqs: [
      { question: 'Should we get a Wikipedia page?', answer: 'Only an independent editor can create one, and only if reliable independent sources already cover you. Work on earning that coverage first.' },
      { question: 'Can you get us mentioned on Reddit?', answer: 'We can help you take part properly under your own name and find the threads worth answering. We do not post as anyone else.' },
      { question: 'Does our own website still matter?', answer: 'Yes. It is where assistants and journalists check the facts. It just cannot carry your visibility on its own.' },
    ],
    relatedServices: [
      { label: 'Digital PR and link earning', href: '/services/digital-pr-and-link-earning' },
      { label: 'Online reputation management', href: '/services/online-reputation-management' },
      { label: 'Entity and brand consistency', href: '/services/entity-and-brand-consistency' },
    ],
    relatedResources: ['how-ai-assistants-choose-sources', 'how-to-measure-ai-search-visibility', 'aeo-vs-geo-vs-seo'],
    references: [
      { label: 'Peec AI: top domains cited by AI search', url: 'https://peec.ai/blog/top-domains-cited-by-ai-search-analysis-based-on-30m-sources' },
      { label: 'Writesonic: sources that influence AI answers', url: 'https://writesonic.com/blog/sources-ai-models-cite-brand-visibility' },
      { label: 'Wikipedia: conflict of interest guideline', url: 'https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest' },
      { label: 'Reddit: content policy', url: 'https://redditinc.com/policies/content-policy' },
      { label: 'Google: spam policies', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
    ],
  },
  {
    slug: 'local-business-ai-search', href: r('local-business-ai-search'),
    metaTitle: 'Local Businesses in AI Search and AI Overviews | ODOOVATIONS',
    metaDescription: 'How a local business shows up when people ask Google, ChatGPT or Copilot for a nearby provider: Business Profile, reviews, consistent details, and what is unknown.',
    h1: 'How a local business shows up in AI search', eyebrow: 'AI search guide', updated: U, readMinutes: 6,
    primaryKeyword: 'local business AI search',
    summary: 'For “near me” and city questions, AI answers lean on the same data that powers maps: your Google Business Profile on Google, Bing Places on Bing and Copilot, and the reviews and listings around them. Google says local results depend mainly on relevance, distance and popularity, and its AI features guidance asks businesses to keep Business Profile details up to date. The work is unglamorous: a complete, accurate profile, real reviews, matching details everywhere, and a website page for each service and area you truly cover.',
    blocks: [
      { type: 'h2', text: 'Where local AI answers get their facts' },
      { type: 'table', head: ['Assistant', 'Local data it can draw on', 'Your action'], rows: [
        ['Google AI Overviews and AI Mode', 'Google Business Profile, reviews and web pages in Google’s index', 'Claim, verify and complete your Business Profile'],
        ['Microsoft Copilot', 'Bing index and Bing Places', 'Claim Bing Places (it can import from Google)'],
        ['ChatGPT, Perplexity, Claude', 'Their own search indexes and partner providers; maps sources not fully published', 'Be consistent on the sites they cite for your city'],
      ] },
      { type: 'note', text: 'Checked 16 November 2026. Estimates of how often AI Overviews appear on local searches range from under 10% to over 60% depending on the study and the query; no figure is reliable for your market without testing.' },
      { type: 'h2', text: 'The checklist' },
      { type: 'list', items: [
        'Business Profile: correct primary category, every service, hours including holidays, attributes, photos of the real premises.',
        'Name, address and phone written identically on your site, profiles and directories.',
        'A steady flow of genuine reviews, with replies that mention the service delivered.',
        'One page per service, and per area only where you genuinely serve it, with something specific to say about that area.',
        'LocalBusiness structured data that matches the profile.',
        'A fixed set of local questions (“accountant in Karachi for small businesses”) asked to each assistant monthly, with dated results.',
      ] },
      { type: 'h2', text: 'Avoid' },
      { type: 'list', items: [
        'Keyword-stuffed business names. Google’s Business Profile guidelines forbid them and they can get the profile suspended.',
        'Virtual offices or addresses where you do not meet customers.',
        'Near-identical city pages with only the place name changed: Google treats these as doorway pages.',
        'Offering discounts in exchange for reviews, or filtering who is asked to review.',
      ] },
    ],
    faqs: [
      { question: 'Do we need a physical address?', answer: 'For a Business Profile you need either a place customers visit or a defined service area. You can hide the address if you serve customers at their location.' },
      { question: 'Does ChatGPT use Google Business Profile?', answer: 'OpenAI has not said so. ChatGPT cites pages from its own search sources, so consistent listings across the web matter.' },
      { question: 'How long before changes show in AI answers?', answer: 'There is no published timeline. Profile edits usually show in Google within days; AI answers change unpredictably, which is why we measure on dated runs.' },
    ],
    relatedServices: [
      { label: 'Local search optimisation', href: '/services/local-search-optimization' },
      { label: 'AI Search (AEO & GEO)', href: '/services/ai-search-optimization' },
      { label: 'Online reputation management', href: '/services/online-reputation-management' },
    ],
    relatedResources: ['how-ai-assistants-choose-sources', 'structured-data-for-ai-search', 'brand-mentions-ai-search'],
    references: [
      { label: 'Google: how local results are ranked', url: 'https://support.google.com/business/answer/7091' },
      { label: 'Google: guidelines for representing your business', url: 'https://support.google.com/business/answer/3038177' },
      { label: 'Google: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
      { label: 'Google: spam policies (doorway pages)', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
    ],
  },
];
