import type { Resource } from './resources';

/**
 * One guide per AI assistant on how it finds and cites websites, researched 16 November 2026. Each guide keeps
 * three things apart: what the company documents, what independent testing suggests, and what nobody outside
 * the company knows. No guide promises a citation.
 */
const U = '2026-11-16';
const r = (slug: string) => `/resources/${slug}`;
const SVCS = [
  { label: 'AI Search (AEO & GEO)', href: '/services/ai-search-optimization' },
  { label: 'AI Search Audit', href: '/services/ai-search-audit' },
  { label: 'Technical SEO', href: '/services/technical-seo' },
];
const CHECKED = 'Checked against the company’s own documentation on 16 November 2026. Ranking methods are not published by any of these companies; anything beyond the documented controls is informed estimation, not fact.';

export const llmPlatformGuides: Resource[] = [
  {
    slug: 'how-ai-assistants-choose-sources', href: r('how-ai-assistants-choose-sources'),
    metaTitle: 'How ChatGPT, Claude and Gemini Cite Websites | ODOOVATIONS',
    metaDescription: 'Side by side: how ChatGPT, Claude, Perplexity, Microsoft Copilot and Google Gemini find web pages, which crawler each uses, and what you can control.',
    h1: 'How AI assistants find and cite websites: the five compared', eyebrow: 'AI search guide', updated: U, readMinutes: 8,
    primaryKeyword: 'how AI assistants choose sources',
    summary: 'Each AI assistant searches the web through its own route: ChatGPT through its search crawler and partner search providers, Claude through its own search crawler, Perplexity through PerplexityBot, Copilot through the Bing index, and Gemini through Google Search. None publishes how it ranks sources. What you control is the same everywhere: let the right crawler in, be indexed where that assistant searches, and publish clear, consistent, verifiable pages.',
    blocks: [
      { type: 'h2', text: 'The five at a glance' },
      { type: 'table', head: ['Assistant', 'Where its web results come from', 'Crawler to allow', 'Documented control'], rows: [
        ['ChatGPT', 'OpenAI’s search index plus partner search providers', 'OAI-SearchBot (search); ChatGPT-User (user requests)', 'robots.txt per bot; blocking GPTBot (training) is separate'],
        ['Claude', 'Anthropic’s web search, with citations in every answer', 'Claude-SearchBot (search); Claude-User (user requests)', 'robots.txt per bot; ClaudeBot (training) is separate'],
        ['Perplexity', 'Perplexity’s own index', 'PerplexityBot; Perplexity-User for live fetches', 'robots.txt for PerplexityBot'],
        ['Microsoft Copilot', 'The Bing index', 'Bingbot (no separate Copilot crawler)', 'Bing Webmaster Tools; robots.txt for Bingbot'],
        ['Google Gemini app', 'Google Search, used to ground answers', 'Googlebot to be indexed', 'Google-Extended governs grounding in the Gemini app and training'],
      ] },
      { type: 'note', text: CHECKED },
      { type: 'h2', text: 'What works on all five' },
      { type: 'list', items: ['Allow the search crawlers in robots.txt and make sure your firewall or CDN does not block them.', 'Be indexed in both Google and Bing; submit sitemaps to both.', 'Answer each buyer question directly near the top of a page, then give detail and evidence.', 'Keep your name, services, prices and contact details identical everywhere you control.', 'Earn mentions on sites these assistants already trust in your field; do not buy them.', 'Measure with a fixed question set, on each assistant, on dated runs.'] },
      { type: 'h2', text: 'What nobody can tell you' },
      { type: 'p', text: 'How each assistant weighs one eligible page against another is not public. Anyone selling a guaranteed citation, or a single “AI visibility score” without the questions and dates behind it, is selling something they cannot control.' },
    ],
    faqs: [
      { question: 'Do I need a different strategy for each assistant?', answer: 'The foundations are the same. The differences are which crawler to allow and which index matters: Bing for Copilot, Google for Gemini, each company’s own crawler for ChatGPT, Claude and Perplexity.' },
      { question: 'Can you get us cited in ChatGPT and Claude?', answer: 'We can make your site eligible, clear and consistent, and measure what happens. No one can guarantee a citation.' },
      { question: 'Which assistant matters most?', answer: 'The one your buyers use. A baseline across all five shows where you stand today.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['ai-crawlers-user-agents', 'google-ai-mode-ai-overviews-guide', 'how-to-measure-ai-search-visibility'],
    references: [
      { label: 'OpenAI: overview of crawlers', url: 'https://platform.openai.com/docs/bots' },
      { label: 'Anthropic: enabling and using web search', url: 'https://support.anthropic.com/en/articles/10684626-enabling-and-using-web-search' },
      { label: 'Anthropic: crawling and blocking', url: 'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
      { label: 'Perplexity: crawlers', url: 'https://docs.perplexity.ai/guides/bots' },
      { label: 'Bing Webmaster Guidelines', url: 'https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a' },
      { label: 'Google: common crawlers and Google-Extended', url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers' },
    ],
  },
  {
    slug: 'get-cited-in-chatgpt-search', href: r('get-cited-in-chatgpt-search'),
    metaTitle: 'How to Be Found and Cited in ChatGPT Search | ODOOVATIONS',
    metaDescription: 'What OpenAI documents about ChatGPT search: OAI-SearchBot, ChatGPT-User and GPTBot, how to stay eligible, and what to measure. No guaranteed citations.',
    h1: 'How to be found and cited in ChatGPT search', eyebrow: 'Platform guide', updated: U, readMinutes: 6,
    primaryKeyword: 'how to get cited in ChatGPT',
    summary: 'To appear in ChatGPT search, OpenAI’s search crawler, OAI-SearchBot, must be able to reach your pages. OpenAI documents it separately from GPTBot, its training crawler, and ChatGPT-User, which fetches pages when someone asks. Beyond eligibility, OpenAI has not published how it ranks sources, so the reliable work is crawl access, clear answers, consistent facts and honest measurement.',
    blocks: [
      { type: 'h2', text: 'OpenAI’s three bots' },
      { type: 'table', head: ['Bot', 'Purpose', 'If you block it'], rows: [
        ['OAI-SearchBot', 'Surfaces sites in ChatGPT’s search features', 'Your pages may not appear in ChatGPT search answers'],
        ['ChatGPT-User', 'Fetches a page because a user asked', 'Users cannot have ChatGPT read the page on request; check OpenAI’s current note on robots.txt for this agent'],
        ['GPTBot', 'Collects content that may be used to train models', 'Training use stops; it does not by itself remove you from ChatGPT search'],
      ] },
      { type: 'h2', text: 'Checklist' },
      { type: 'list', items: ['robots.txt allows OAI-SearchBot.', 'Your firewall or CDN is not blocking OpenAI’s published crawler IP ranges.', 'Key pages are indexed in Bing as well as Google; several independent analyses link ChatGPT’s results to Bing, though OpenAI does not state the weighting.', 'Each service page answers its main question in the first lines, with prices or ranges where you can give them.', 'Company facts match across your site, profiles and directories.'] },
      { type: 'note', text: CHECKED },
    ],
    faqs: [
      { question: 'Does ChatGPT use Bing?', answer: 'OpenAI says ChatGPT search can use partner search providers; independent analyses point to Bing. OpenAI does not publish how much weight each source carries.' },
      { question: 'Do I need a publisher partnership?', answer: 'No. Eligibility comes from being crawlable and useful; partnerships are separate commercial deals.' },
      { question: 'Will blocking GPTBot hurt my ChatGPT visibility?', answer: 'OpenAI documents GPTBot and OAI-SearchBot as separate controls, so blocking training alone does not remove you from search.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['how-ai-assistants-choose-sources', 'ai-crawlers-user-agents', 'get-cited-in-claude'],
    references: [{ label: 'OpenAI: overview of crawlers', url: 'https://platform.openai.com/docs/bots' }, { label: 'Bing Webmaster Guidelines', url: 'https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a' }],
  },
  {
    slug: 'get-cited-in-claude', href: r('get-cited-in-claude'),
    metaTitle: 'How Claude Finds and Cites Websites | ODOOVATIONS',
    metaDescription: 'How Claude’s web search works for site owners: cited answers, Claude-SearchBot, Claude-User and ClaudeBot, and what to check so Claude can find your pages.',
    h1: 'How Claude finds and cites websites', eyebrow: 'Platform guide', updated: U, readMinutes: 6,
    primaryKeyword: 'how to get cited by Claude',
    summary: 'Claude can search the web, and Anthropic says each answer that uses search includes citations so people can check the sources. Anthropic runs three agents: Claude-SearchBot for search quality, Claude-User for pages a user asks Claude to read, and ClaudeBot for training. Allowing Claude-SearchBot is the documented step for being found; how Claude ranks results is not published.',
    blocks: [
      { type: 'h2', text: 'Anthropic’s three agents' },
      { type: 'table', head: ['Agent', 'Purpose', 'Effect of blocking'], rows: [
        ['Claude-SearchBot', 'Indexes content to improve search results', 'Anthropic says it may reduce your visibility and accuracy in Claude’s search answers'],
        ['Claude-User', 'Fetches a page when a user asks Claude to', 'Claude cannot read the page on a user’s request'],
        ['ClaudeBot', 'Collects content for model training', 'Training use stops; separate from search'],
      ] },
      { type: 'h2', text: 'What independent testing suggests' },
      { type: 'p', text: 'Independent comparisons have found Claude’s cited results resemble Brave Search results, and Brave appears on Anthropic’s subprocessor list. Anthropic has not confirmed its search index, so treat this as a strong hint, not a fact. Being indexed by Brave, Bing and Google covers the likely routes.' },
      { type: 'h2', text: 'Checklist' },
      { type: 'list', items: ['robots.txt allows Claude-SearchBot and Claude-User.', 'Pages load without heavy scripts hiding the main text.', 'Facts on the page are specific and sourced, so a cited passage stands on its own.', 'Your business facts are consistent across the web.'] },
      { type: 'note', text: CHECKED },
    ],
    faqs: [
      { question: 'Does Claude always search the web?', answer: 'It searches when a question needs current information and web search is enabled; Anthropic’s help centre explains the setting.' },
      { question: 'Does Claude cite the sources it uses?', answer: 'Anthropic says answers that use web search include citations.' },
      { question: 'Should we block ClaudeBot?', answer: 'That is a decision about training use and is separate from appearing in Claude’s search answers.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['how-ai-assistants-choose-sources', 'get-cited-in-chatgpt-search', 'ai-crawlers-user-agents'],
    references: [
      { label: 'Anthropic: enabling and using web search', url: 'https://support.anthropic.com/en/articles/10684626-enabling-and-using-web-search' },
      { label: 'Anthropic: does Anthropic crawl the web, and how to block it', url: 'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
    ],
  },
  {
    slug: 'get-cited-in-perplexity', href: r('get-cited-in-perplexity'),
    metaTitle: 'How Perplexity Chooses and Cites Sources | ODOOVATIONS',
    metaDescription: 'What Perplexity documents for site owners: PerplexityBot, Perplexity-User and the Publishers Program, plus what is only guesswork about its rankings.',
    h1: 'How Perplexity chooses and cites sources', eyebrow: 'Platform guide', updated: U, readMinutes: 5,
    primaryKeyword: 'how to appear in Perplexity',
    summary: 'Perplexity shows numbered citations with every answer. Its documented crawler, PerplexityBot, indexes sites for Perplexity search and respects robots.txt; Perplexity-User fetches pages live when a user asks. Perplexity does not publish how it ranks sources, so precise figures you may read about its retrieval are estimates.',
    blocks: [
      { type: 'h2', text: 'Documented' },
      { type: 'list', items: ['PerplexityBot surfaces and links websites in Perplexity search and follows robots.txt.', 'Perplexity-User fetches pages for live questions; Perplexity’s documentation describes how it treats robots.txt.', 'The Publishers Program (announced July 2024) shares revenue with partner publishers; it is not required to be cited.'] },
      { type: 'h2', text: 'Not documented' },
      { type: 'list', items: ['How many pages it retrieves or cites per answer.', 'How sources are reranked.', 'Any weighting for freshness or domain.'] },
      { type: 'h2', text: 'Checklist' },
      { type: 'list', items: ['Allow PerplexityBot in robots.txt.', 'Keep important pages current and dated where dates matter.', 'Give direct answers with sources, so a short excerpt makes sense alone.'] },
      { type: 'note', text: CHECKED },
    ],
    faqs: [
      { question: 'Do we need to join the Publishers Program?', answer: 'No. It is a commercial programme for publishers; ordinary sites are cited without it.' },
      { question: 'Does Perplexity train on our content?', answer: 'Perplexity documents PerplexityBot as a search crawler; check its current documentation for training terms.' },
      { question: 'Why do our citations change day to day?', answer: 'Answers vary between runs. Measure over repeated, dated runs rather than one screenshot.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['how-ai-assistants-choose-sources', 'ai-crawlers-user-agents', 'how-to-measure-ai-search-visibility'],
    references: [{ label: 'Perplexity: crawlers', url: 'https://docs.perplexity.ai/guides/bots' }, { label: 'Perplexity: Publishers Program announcement', url: 'https://www.perplexity.ai/hub/blog/introducing-the-perplexity-publishers-program' }],
  },
  {
    slug: 'get-cited-in-microsoft-copilot', href: r('get-cited-in-microsoft-copilot'),
    metaTitle: 'How to Appear in Microsoft Copilot Answers | ODOOVATIONS',
    metaDescription: 'Copilot’s web answers rest on the Bing index. Bing Webmaster Tools, sitemaps, IndexNow and Bingbot access: what site owners should set up.',
    h1: 'How to appear in Microsoft Copilot answers', eyebrow: 'Platform guide', updated: U, readMinutes: 5,
    primaryKeyword: 'Microsoft Copilot SEO',
    summary: 'Microsoft’s webmaster guidelines describe Bing and Copilot as resting on the same crawling, indexing and ranking foundation, and there is no separate Copilot crawler. So the work is Bing work: verify the site in Bing Webmaster Tools, submit a sitemap, keep Bingbot unblocked, and notify Bing of changes with IndexNow.',
    blocks: [
      { type: 'h2', text: 'Set-up checklist' },
      { type: 'table', head: ['Step', 'Why'], rows: [
        ['Verify the site in Bing Webmaster Tools', 'See indexing, errors and search performance in Bing'],
        ['Submit your XML sitemap', 'Helps Bing find every important page'],
        ['Allow Bingbot in robots.txt and your firewall', 'Copilot cannot use pages Bing cannot crawl'],
        ['Use IndexNow', 'Tells Bing (and other participating engines) when pages change'],
        ['Check pages are indexed in Bing, not only Google', 'Many sites are indexed in one and not the other'],
      ] },
      { type: 'p', text: 'Bing also feeds other products, and several analyses link ChatGPT’s web results to Bing, so this work tends to help beyond Copilot.' },
      { type: 'note', text: CHECKED },
    ],
    faqs: [
      { question: 'Is there a Copilot crawler to allow?', answer: 'Not separately: Copilot’s web answers draw on Bing’s index, crawled by Bingbot.' },
      { question: 'What is IndexNow?', answer: 'An open protocol, started by Bing and Yandex, for notifying search engines when a URL is added, changed or deleted.' },
      { question: 'Does this site use IndexNow?', answer: 'Yes: odoovations.com publishes an IndexNow key and submits new and changed pages with it.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['how-ai-assistants-choose-sources', 'get-cited-in-chatgpt-search', 'ai-search-optimization-checklist'],
    references: [{ label: 'Bing Webmaster Guidelines', url: 'https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a' }, { label: 'IndexNow', url: 'https://www.indexnow.org/' }, { label: 'Bing Webmaster Tools', url: 'https://www.bing.com/webmasters/about' }],
  },
  {
    slug: 'get-cited-in-google-gemini', href: r('get-cited-in-google-gemini'),
    metaTitle: 'How Google Gemini Uses and Cites Websites | ODOOVATIONS',
    metaDescription: 'How the Gemini app grounds answers in Google Search, what the Google-Extended token controls, and how it differs from AI Overviews and AI Mode.',
    h1: 'How Google Gemini uses and cites websites', eyebrow: 'Platform guide', updated: U, readMinutes: 5,
    primaryKeyword: 'how to get cited by Gemini',
    summary: 'The Gemini app can ground its answers in Google Search and link the pages it relied on. Being indexed by Googlebot comes first. Google documents Google-Extended as a separate token that controls whether crawled content may be used for Gemini training and for grounding in the Gemini app; it is not a Search ranking signal and does not control AI Overviews or AI Mode.',
    blocks: [
      { type: 'h2', text: 'Gemini vs Google Search’s AI features' },
      { type: 'table', head: ['Product', 'Depends on', 'Control'], rows: [
        ['AI Overviews and AI Mode', 'Googlebot and the Search index', 'Search generative AI setting in Search Console; snippet controls'],
        ['Gemini app grounding', 'Google Search index', 'Google-Extended in robots.txt'],
        ['Gemini model training', 'Crawled content', 'Google-Extended in robots.txt'],
      ] },
      { type: 'note', text: 'Some 2026 blogs claim Google-Extended also controls AI Overviews. Google’s own crawler documentation does not say so, and Search Console has a separate setting for those features. Follow Google’s documentation.' },
      { type: 'h2', text: 'Checklist' },
      { type: 'list', items: ['Be crawlable and indexed by Googlebot.', 'Decide on Google-Extended knowing it covers both training and Gemini app grounding together.', 'Keep pages clear and factual so grounded answers quote them correctly.'] },
      { type: 'note', text: CHECKED },
    ],
    faqs: [
      { question: 'If we block Google-Extended, do we disappear from Google?', answer: 'No. Google says it does not affect inclusion or ranking in Google Search.' },
      { question: 'Can we allow Gemini citations but block training?', answer: 'Google-Extended covers both together; there is no separate switch for one without the other.' },
      { question: 'What does this site do?', answer: 'odoovations.com allows Google-Extended, so its pages remain eligible for Gemini app grounding.' },
    ],
    relatedServices: SVCS,
    relatedResources: ['google-ai-mode-ai-overviews-guide', 'how-ai-assistants-choose-sources', 'ai-crawlers-user-agents'],
    references: [{ label: 'Google: common crawlers and Google-Extended', url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers' }, { label: 'Gemini app FAQ', url: 'https://gemini.google/faq/' }, { label: 'Google: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' }],
  },
];
