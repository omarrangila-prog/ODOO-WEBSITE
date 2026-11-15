/** Tests for the free AI tools' logic.  npx tsx scripts/tools-check.ts */
import { parseRobots, isAllowed } from '../lib/tools/robots';
import { checkLlmsTxt } from '../lib/tools/llmstxt';

let failed = 0;
const check = (c: unknown, m: string) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };

const robots = `
User-agent: *
Disallow: /admin
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
User-agent: PerplexityBot
Disallow: /private
Allow: /private/press$

User-agent: ClaudeBot
Disallow:
`;
const g = parseRobots(robots);
check(isAllowed(g, 'GPTBot').allowed === false, 'a crawler with its own Disallow: / is blocked');
check(isAllowed(g, 'gptbot').allowed === false, 'user-agent matching is case-insensitive');
check(isAllowed(g, 'OAI-SearchBot').allowed === true, 'a grouped crawler is allowed on /');
check(isAllowed(g, 'PerplexityBot', '/private/x').allowed === false, 'a group shared by two agents applies to both');
check(isAllowed(g, 'PerplexityBot', '/private/press').allowed === true, 'the longer Allow with $ wins');
check(isAllowed(g, 'Claude-SearchBot', '/admin/x').allowed === false && isAllowed(g, 'Claude-SearchBot').matchedGroup === '*', 'an unnamed crawler falls back to *');
check(isAllowed(g, 'ClaudeBot', '/admin').allowed === true, 'an empty Disallow allows everything and overrides *');
check(isAllowed(parseRobots(''), 'GPTBot').allowed === true, 'no robots.txt means allowed');

const good = `# ODOOVATIONS\n\n> Software and AI search agency in Karachi.\n\n## Services\n\n- [AI Search](https://odoovations.com/services/ai-search-optimization): AEO and GEO\n\n## Optional\n\n- [Guides](https://odoovations.com/resources): reading\n`;
const r1 = checkLlmsTxt(good);
check(r1.links === 2 && r1.findings.every((x) => x.level !== 'error'), 'a valid llms.txt passes with its links counted');
const r2 = checkLlmsTxt('Company\n## A\n- not a link\n- [x](/relative)');
check(r2.findings.some((x) => x.level === 'error') && r2.findings.some((x) => x.text.includes('2 list items')), 'a missing H1 and bad links are reported');

console.log(failed ? `\n${failed} failed` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
