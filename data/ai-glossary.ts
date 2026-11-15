/**
 * AI SEARCH GLOSSARY
 *
 * Terms buyers meet in AI search, AEO and GEO, researched 16 November 2026. Each entry says how settled the
 * term is: "Platform" means a search or AI company documents it; "Industry" means it is widely used but not
 * owned by any one body; "Marketing" means it is mostly vendor language. Definitions are ours and plain; where
 * sources disagree, the entry says so rather than picking a side.
 */

export type TermStatus = 'Platform' | 'Industry' | 'Marketing';
export type TermGroup = 'Disciplines' | 'Google' | 'Measurement' | 'Crawlers and access' | 'How AI answers work' | 'Agents and commerce' | 'Content and entities';

export interface GlossaryTerm {
  slug: string;
  term: string;
  aka?: string;
  group: TermGroup;
  status: TermStatus;
  definition: string;
  why: string;
  source?: { label: string; url: string };
}

const G_AI = { label: 'Google: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' };
const G_GUIDE = { label: 'Google: optimizing for generative AI features', url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide' };
const G_REPORTS = { label: 'Google: Search Generative AI performance reports', url: 'https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports' };
const G_PREF = { label: 'Google: preferred sources', url: 'https://developers.google.com/search/docs/appearance/preferred-sources' };
const G_SPAM = { label: 'Google Search spam policies', url: 'https://developers.google.com/search/docs/essentials/spam-policies' };
const G_CRAWLERS = { label: 'Google: common crawlers', url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers' };
const OPENAI_BOTS = { label: 'OpenAI: overview of crawlers', url: 'https://platform.openai.com/docs/bots' };
const LLMSTXT = { label: 'llmstxt.org proposal', url: 'https://llmstxt.org/' };
const MCP = { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' };
const WIKI_GEO = { label: 'Wikipedia: Generative engine optimization', url: 'https://en.wikipedia.org/wiki/Generative_engine_optimization' };
const WIKI_AC = { label: 'Wikipedia: Agentic commerce', url: 'https://en.wikipedia.org/wiki/Agentic_commerce' };

export const glossary: GlossaryTerm[] = [
  // Disciplines
  { slug: 'aeo', term: 'Answer engine optimization', aka: 'AEO', group: 'Disciplines', status: 'Industry', definition: 'Making your pages the clearest, most quotable answer to the questions buyers ask, so search features and AI assistants can use them.', why: 'It turns vague marketing pages into direct answers. Sources disagree on whether AEO is part of GEO or the same thing; in practice the work overlaps heavily.', source: WIKI_GEO },
  { slug: 'geo', term: 'Generative engine optimization', aka: 'GEO', group: 'Disciplines', status: 'Industry', definition: 'Improving how generative AI systems describe, recommend and cite a business: the facts they repeat and the sources they use.', why: 'AI answers are assembled from many sources, so consistency and evidence across the web matter as much as your own pages.', source: WIKI_GEO },
  { slug: 'ai-seo', term: 'AI SEO', aka: 'LLMO, GSO, AI search optimization', group: 'Disciplines', status: 'Marketing', definition: 'Umbrella labels for optimizing for AI-driven search. They describe the same territory as AEO and GEO rather than separate disciplines.', why: 'Buy the work, not the acronym. Google’s own guide says optimizing for its generative AI features is still SEO.', source: G_GUIDE },
  { slug: 'seo', term: 'Search engine optimization', aka: 'SEO', group: 'Disciplines', status: 'Industry', definition: 'Helping search engines find, understand and rank your pages. It remains the foundation: Google says AI Overviews and AI Mode use its core ranking and quality systems.', why: 'A page that cannot be crawled, indexed and shown with a snippet cannot appear in Google’s AI features either.', source: G_AI },

  // Google
  { slug: 'ai-overviews', term: 'AI Overviews', group: 'Google', status: 'Platform', definition: 'Google’s AI-generated summaries shown above or among search results, with links to the sources used.', why: 'Being linked there is a new form of visibility; being summarised without a click is a new form of zero-click.', source: G_AI },
  { slug: 'ai-mode', term: 'AI Mode', group: 'Google', status: 'Platform', definition: 'Google Search’s conversational mode, where follow-up questions are answered with AI and linked sources.', why: 'It answers multi-step questions, so pages that cover a topic completely and clearly have more chances to be used.', source: G_AI },
  { slug: 'query-fan-out', term: 'Query fan-out', group: 'How AI answers work', status: 'Industry', definition: 'An AI system splitting one question into several related searches, then combining what it finds.', why: 'It explains why results vary between runs and why covering the related questions around a topic helps. Google warns against mass-producing near-duplicate pages to chase it.', source: G_SPAM },
  { slug: 'search-generative-ai-setting', term: 'Search generative AI setting', group: 'Google', status: 'Platform', definition: 'A Search Console setting that includes (by default) or excludes a site from AI Overviews, AI Mode and generative AI in Discover.', why: 'Excluding a site removes it from those features without changing normal rankings; reports suggest it can also affect preferred-source eligibility. It does not cover the Gemini app.', source: G_PREF },
  { slug: 'gen-ai-performance-reports', term: 'Search Generative AI performance reports', group: 'Google', status: 'Platform', definition: 'Search Console reports, announced in June 2026, showing how a site performs in Google’s generative AI features.', why: 'The first first-party measurement of AI visibility in Google. Use it alongside your own dated observations.', source: G_REPORTS },
  { slug: 'preferred-sources', term: 'Preferred sources', group: 'Google', status: 'Platform', definition: 'A Google feature that lets people choose publishers they want to see more of, including in AI Mode and AI Overviews for eligible sites.', why: 'Loyal readers can now raise a site’s presence in their own results.', source: G_PREF },
  { slug: 'snippet-controls', term: 'Snippet controls', aka: 'nosnippet, max-snippet, data-nosnippet', group: 'Google', status: 'Platform', definition: 'Page-level directives that limit what Google may show from a page, including in AI features.', why: 'Use them to keep specific text out of answers, knowing they also limit normal snippets.', source: G_AI },
  { slug: 'google-extended', term: 'Google-Extended', group: 'Crawlers and access', status: 'Platform', definition: 'A robots.txt token, not a separate crawler, that controls whether Google may use your content for Gemini training and grounding in some other Google systems.', why: 'Blocking it does not remove you from AI Overviews or AI Mode; those follow Googlebot and the Search generative AI setting.', source: G_CRAWLERS },
  { slug: 'scaled-content-abuse', term: 'Scaled content abuse', group: 'Google', status: 'Platform', definition: 'Google’s spam policy against producing many low-value pages, by AI or otherwise, mainly to manipulate rankings.', why: 'Thousands of near-identical city or keyword pages are a risk, not an AI search strategy.', source: G_SPAM },
  { slug: 'content-chunking', term: 'Content chunking', group: 'Content and entities', status: 'Marketing', definition: 'Rewriting pages into small self-contained blocks in the belief that AI systems prefer them.', why: 'Google’s May 2026 guide lists it among tactics you can skip. Write clearly for people; clear structure helps everyone.', source: G_GUIDE },

  // Measurement
  { slug: 'mention-rate', term: 'Mention rate', group: 'Measurement', status: 'Industry', definition: 'The share of recorded AI answers that name your business, out of the valid answers for an agreed question set.', why: 'Always ask for the denominator, the dates and the platforms. A single answer is not a rate.' },
  { slug: 'citation-rate', term: 'Citation rate', group: 'Measurement', status: 'Industry', definition: 'The share of recorded AI answers that link to your domain as a source.', why: 'A mention without a link sends no traffic; a link without a mention may still help. Report them separately.' },
  { slug: 'ai-share-of-voice', term: 'AI share of voice', group: 'Measurement', status: 'Marketing', definition: 'Your mentions compared with named competitors’ across the same questions and platforms.', why: 'Useful only when the question set, platforms and dates are fixed and published with it.' },
  { slug: 'answer-accuracy', term: 'Answer accuracy', group: 'Measurement', status: 'Industry', definition: 'Whether what an AI says about your business is correct: name, services, prices, location, contact.', why: 'Being mentioned wrongly can cost more than not being mentioned. Track errors and their likely source.' },
  { slug: 'visibility-baseline', term: 'Visibility baseline', group: 'Measurement', status: 'Industry', definition: 'A dated record of how AI answers treat you before any work starts: questions, platforms, locale, answers saved.', why: 'Without it, nobody can show whether anything changed.' },
  { slug: 'zero-click', term: 'Zero-click search', group: 'Measurement', status: 'Industry', definition: 'A search answered on the results page, so the person never visits a website.', why: 'Measure enquiries and brand demand, not only clicks.' },
  { slug: 'ai-visibility-score', term: 'AI visibility score', group: 'Measurement', status: 'Marketing', definition: 'A single number some tools give for AI presence.', why: 'Ask how it is calculated. A score without the questions, platforms, dates and denominator behind it cannot be checked.' },

  // Crawlers and access
  { slug: 'search-crawler', term: 'AI search crawler', aka: 'OAI-SearchBot, Claude-SearchBot, PerplexityBot', group: 'Crawlers and access', status: 'Platform', definition: 'A bot that indexes pages so an AI product can find and cite them in answers.', why: 'Blocking these can remove you from that product’s answers.', source: OPENAI_BOTS },
  { slug: 'user-fetcher', term: 'User-triggered fetcher', aka: 'ChatGPT-User, Claude-User, Perplexity-User', group: 'Crawlers and access', status: 'Platform', definition: 'A fetch made because a person asked an assistant to read or check a page.', why: 'Vendors document different robots.txt behaviour for these; check each vendor’s current documentation.', source: OPENAI_BOTS },
  { slug: 'training-crawler', term: 'Training crawler', aka: 'GPTBot, ClaudeBot, Meta-ExternalAgent, Applebot-Extended, CCBot', group: 'Crawlers and access', status: 'Platform', definition: 'A bot collecting content to train AI models, separate from search indexing.', why: 'Allowing or blocking training is a separate business decision from appearing in AI search.', source: OPENAI_BOTS },
  { slug: 'llms-txt', term: 'llms.txt', group: 'Crawlers and access', status: 'Industry', definition: 'A proposed Markdown file at /llms.txt that summarises a site for language models.', why: 'Google says Search ignores it, and no major AI company has confirmed using it for answers. It can still help developer tools and agents. It is not a ranking requirement.', source: LLMSTXT },
  { slug: 'indexnow', term: 'IndexNow', group: 'Crawlers and access', status: 'Platform', definition: 'An open protocol, started by Bing and Yandex in 2021, for telling participating search engines that a URL was added, changed or deleted.', why: 'Copilot’s answers rest on the Bing index, so getting changes into Bing quickly matters.', source: { label: 'IndexNow', url: 'https://www.indexnow.org/' } },
  { slug: 'publishers-program', term: 'Perplexity Publishers Program', group: 'Crawlers and access', status: 'Platform', definition: 'A revenue-sharing programme for publishers whose content Perplexity uses, announced in July 2024.', why: 'A commercial deal for publishers; ordinary sites are cited without it.', source: { label: 'Perplexity Publishers Program', url: 'https://www.perplexity.ai/hub/blog/introducing-the-perplexity-publishers-program' } },
  { slug: 'agents-md', term: 'AGENTS.md', group: 'Crawlers and access', status: 'Industry', definition: 'A Markdown file of instructions for AI coding and task agents working with a project or site.', why: 'Useful for developer-facing products; irrelevant to most buyers’ search visibility.' },

  // How AI answers work
  { slug: 'grounding', term: 'Grounding', group: 'How AI answers work', status: 'Industry', definition: 'Giving an AI model fresh sources, such as search results, to base its answer on, instead of memory alone.', why: 'Grounded answers can cite your pages, which is why being crawlable and clear still matters.' },
  { slug: 'rag', term: 'Retrieval-augmented generation', aka: 'RAG', group: 'How AI answers work', status: 'Industry', definition: 'A system that retrieves relevant documents first, then has a model write an answer from them.', why: 'The same method powers company knowledge assistants and many AI search products.' },
  { slug: 'embeddings', term: 'Embeddings and vector search', group: 'How AI answers work', status: 'Industry', definition: 'Turning text into numbers that capture meaning, so systems can find passages that mean the same thing even with different words.', why: 'Matching by meaning rewards pages that explain a topic clearly, not pages stuffed with keywords.' },
  { slug: 'reranking', term: 'Reranking', group: 'How AI answers work', status: 'Industry', definition: 'A second step that reorders retrieved passages by how well they answer the question.', why: 'Direct, specific answers tend to survive this step.' },
  { slug: 'hallucination', term: 'Hallucination', group: 'How AI answers work', status: 'Industry', definition: 'An AI stating something false with confidence.', why: 'Consistent, correct facts across your site and profiles reduce what models can get wrong; nobody can promise zero errors.' },
  { slug: 'context-window', term: 'Context window', group: 'How AI answers work', status: 'Industry', definition: 'How much text a model can consider at once.', why: 'Long, unfocused pages compete with themselves; a clear answer near the top is easier to use.' },
  { slug: 'llm', term: 'Large language model', aka: 'LLM', group: 'How AI answers work', status: 'Industry', definition: 'The kind of AI model behind ChatGPT, Claude, Gemini and similar assistants.', why: 'Each product combines a model with its own search and source choices, so results differ by product.' },

  // Agents and commerce
  { slug: 'ai-agent', term: 'AI agent', group: 'Agents and commerce', status: 'Industry', definition: 'An AI system that takes steps on someone’s behalf, such as searching, comparing, filling forms or buying.', why: 'Agents read sites to act, not just to answer, so clear prices, specs and policies matter.' },
  { slug: 'mcp', term: 'Model Context Protocol', aka: 'MCP', group: 'Agents and commerce', status: 'Industry', definition: 'An open protocol that lets AI assistants connect to tools and data sources in a standard way.', why: 'A business can expose search, booking or catalogue functions to assistants through an MCP server.', source: MCP },
  { slug: 'webmcp', term: 'WebMCP', group: 'Agents and commerce', status: 'Industry', definition: 'An emerging proposal for websites to expose MCP-style tools to browser-based agents.', why: 'Early and still changing in 2026; worth watching, not yet a requirement.' },
  { slug: 'nlweb', term: 'NLWeb', group: 'Agents and commerce', status: 'Industry', definition: 'A Microsoft open project that gives a website a natural-language question endpoint built on its structured data.', why: 'Adoption is low so far; good structured data is the part that helps everywhere.' },
  { slug: 'agentic-commerce', term: 'Agentic commerce', group: 'Agents and commerce', status: 'Industry', definition: 'Shopping where an AI agent discovers, compares and sometimes pays for products for a person.', why: 'Accurate product data, stock and policies become what an agent judges you on.', source: WIKI_AC },
  { slug: 'acp', term: 'Agentic Commerce Protocol', aka: 'ACP', group: 'Agents and commerce', status: 'Platform', definition: 'An open standard from OpenAI and Stripe for checkout flows between buyers, AI agents and merchants.', why: 'Reports disagree on how in-chat checkout is offered today; check current documentation before planning around it.', source: WIKI_AC },
  { slug: 'ucp', term: 'Universal Commerce Protocol', aka: 'UCP', group: 'Agents and commerce', status: 'Platform', definition: 'A commerce protocol announced by Google with retail partners in January 2026, covering discovery, cart, checkout and after-sale steps.', why: 'Availability to merchants was limited during 2026; watch the official programme.', source: WIKI_AC },
  { slug: 'ap2', term: 'Agent Payments Protocol', aka: 'AP2', group: 'Agents and commerce', status: 'Platform', definition: 'A protocol for proving that a person authorised an AI agent to make a payment.', why: 'It addresses trust in agent purchases; its governance was moving during 2026.', source: WIKI_AC },
  { slug: 'agent-readiness', term: 'Agent readiness', group: 'Agents and commerce', status: 'Marketing', definition: 'How easily AI agents can read and use a site: crawl access, clear content, structured data and, optionally, agent endpoints.', why: 'The foundations are the same as good SEO; extra protocols are optional and changing.' },

  // Content and entities
  { slug: 'entity', term: 'Entity', group: 'Content and entities', status: 'Industry', definition: 'A distinct thing a search system recognises, such as your company, a product or a person, with facts attached.', why: 'Consistent names, addresses and descriptions help systems treat you as one business, not several.' },
  { slug: 'knowledge-graph', term: 'Knowledge graph', group: 'Content and entities', status: 'Platform', definition: 'A search engine’s database of entities and the facts linking them.', why: 'Panels and AI answers draw on it; no one can promise you a panel.' },
  { slug: 'structured-data', term: 'Structured data', aka: 'schema.org markup', group: 'Content and entities', status: 'Platform', definition: 'Code that states facts about a page, such as organisation, service, product or breadcrumb, in a standard vocabulary.', why: 'Google says no special markup is needed for AI features; accurate standard markup still helps search understand pages.', source: G_AI },
  { slug: 'eeat', term: 'E-E-A-T', group: 'Content and entities', status: 'Platform', definition: 'Experience, expertise, authoritativeness and trust: the qualities Google’s quality raters look for in content.', why: 'Real authors, real evidence and real contact details are the honest way to show them.' },
  { slug: 'answer-ready-page', term: 'Answer-ready page', group: 'Content and entities', status: 'Marketing', definition: 'A page that answers its main question directly near the top, then gives the detail, evidence and next step.', why: 'Useful for people first; the same clarity helps AI systems quote it accurately.' },
  { slug: 'buyer-question-set', term: 'Buyer question set', group: 'Measurement', status: 'Industry', definition: 'The fixed list of questions, agreed with the business, that AI answers are tested against over time.', why: 'Changing the questions each month makes any trend meaningless.' },
];

export const glossaryGroups: TermGroup[] = ['Disciplines', 'Google', 'How AI answers work', 'Measurement', 'Crawlers and access', 'Agents and commerce', 'Content and entities'];
export const GLOSSARY_REVIEWED = '2026-11-16';
