/**
 * A small robots.txt evaluator following RFC 9309: rules are grouped by user-agent lines, a crawler uses the
 * group whose product token matches it (case-insensitive), falling back to "*"; within a group the longest
 * matching path rule wins, and "allow" wins a tie. "*" and "$" wildcards are supported in paths.
 */
export interface AiAgent {
  token: string;
  owner: string;
  kind: 'Search index' | 'User-triggered fetch' | 'Training' | 'Search engine (feeds AI answers)' | 'Training control token';
}

export const AI_AGENTS: AiAgent[] = [
  { token: 'Googlebot', owner: 'Google', kind: 'Search engine (feeds AI answers)' },
  { token: 'Bingbot', owner: 'Microsoft', kind: 'Search engine (feeds AI answers)' },
  { token: 'OAI-SearchBot', owner: 'OpenAI', kind: 'Search index' },
  { token: 'ChatGPT-User', owner: 'OpenAI', kind: 'User-triggered fetch' },
  { token: 'GPTBot', owner: 'OpenAI', kind: 'Training' },
  { token: 'Claude-SearchBot', owner: 'Anthropic', kind: 'Search index' },
  { token: 'Claude-User', owner: 'Anthropic', kind: 'User-triggered fetch' },
  { token: 'ClaudeBot', owner: 'Anthropic', kind: 'Training' },
  { token: 'PerplexityBot', owner: 'Perplexity', kind: 'Search index' },
  { token: 'Perplexity-User', owner: 'Perplexity', kind: 'User-triggered fetch' },
  { token: 'Applebot', owner: 'Apple', kind: 'Search engine (feeds AI answers)' },
  { token: 'Applebot-Extended', owner: 'Apple', kind: 'Training control token' },
  { token: 'Google-Extended', owner: 'Google', kind: 'Training control token' },
  { token: 'Meta-ExternalAgent', owner: 'Meta', kind: 'Training' },
  { token: 'CCBot', owner: 'Common Crawl', kind: 'Training' },
  { token: 'DuckAssistBot', owner: 'DuckDuckGo', kind: 'User-triggered fetch' },
];

interface Group { agents: string[]; rules: { allow: boolean; path: string }[] }

export function parseRobots(text: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1]!.toLowerCase();
    const value = m[2]!.trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if ((key === 'allow' || key === 'disallow') && current) {
      lastWasAgent = false;
      if (key === 'disallow' && value === '') continue; // empty disallow allows everything
      current.rules.push({ allow: key === 'allow', path: value });
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function pathMatches(pattern: string, path: string): number {
  // Returns the pattern length if it matches, else -1.
  const anchored = pattern.endsWith('$');
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const re = new RegExp('^' + body.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + (anchored ? '$' : ''));
  return re.test(path) ? pattern.length : -1;
}

export function groupFor(groups: Group[], token: string): Group | null {
  const t = token.toLowerCase();
  return groups.find((g) => g.agents.includes(t)) ?? groups.find((g) => g.agents.includes('*')) ?? null;
}

export function isAllowed(groups: Group[], token: string, path = '/'): { allowed: boolean; matchedGroup: string; rule: string } {
  const g = groupFor(groups, token);
  if (!g) return { allowed: true, matchedGroup: 'none (no rules apply)', rule: '—' };
  let best: { len: number; allow: boolean; rule: string } = { len: -1, allow: true, rule: 'no matching rule' };
  for (const r of g.rules) {
    const len = pathMatches(r.path, path);
    if (len > best.len || (len === best.len && len >= 0 && r.allow)) best = { len, allow: r.allow, rule: `${r.allow ? 'Allow' : 'Disallow'}: ${r.path}` };
  }
  return { allowed: best.len < 0 ? true : best.allow, matchedGroup: g.agents.includes(token.toLowerCase()) ? token : '*', rule: best.rule };
}
