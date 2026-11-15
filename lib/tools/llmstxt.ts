/**
 * Checks a file against the llms.txt proposal (llmstxt.org): one H1 title first, an optional blockquote
 * summary, optional prose, then H2 sections whose entries are Markdown links "- [name](url): notes".
 * A section named "Optional" may hold secondary links. This checks structure only, not usefulness.
 */
export interface LlmsFinding { level: 'ok' | 'warn' | 'error'; text: string }

export function checkLlmsTxt(text: string): { findings: LlmsFinding[]; links: number; sections: string[] } {
  const lines = text.split(/\r?\n/);
  const f: LlmsFinding[] = [];
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  if (!nonEmpty.length) return { findings: [{ level: 'error', text: 'The file is empty.' }], links: 0, sections: [] };
  if (!/^# \S/.test(nonEmpty[0]!)) f.push({ level: 'error', text: 'The first line must be a single H1 title, e.g. "# Company name".' });
  else f.push({ level: 'ok', text: `Title: ${nonEmpty[0]!.slice(2)}` });
  const h1s = nonEmpty.filter((l) => /^# \S/.test(l)).length;
  if (h1s > 1) f.push({ level: 'error', text: `There are ${h1s} H1 titles; the proposal expects exactly one.` });
  if (nonEmpty[1]?.startsWith('>')) f.push({ level: 'ok', text: 'A blockquote summary follows the title.' });
  else f.push({ level: 'warn', text: 'No blockquote summary after the title. The proposal recommends a short "> summary" line.' });
  const sections = nonEmpty.filter((l) => /^## \S/.test(l)).map((l) => l.slice(3));
  if (!sections.length) f.push({ level: 'warn', text: 'No H2 sections. Links are expected under "## Section" headings.' });
  let links = 0;
  let bad = 0;
  let inSection = false;
  for (const l of nonEmpty) {
    if (/^## /.test(l)) { inSection = true; continue; }
    if (!inSection) continue;
    if (/^[-*] /.test(l)) {
      const m = /^[-*] \[([^\]]+)\]\((\S+?)\)(:\s.*)?$/.exec(l);
      if (m) {
        links++;
        if (!/^https?:\/\//.test(m[2]!)) bad++;
      } else bad++;
    }
  }
  if (links) f.push({ level: 'ok', text: `${links} links in ${sections.length} sections${sections.includes('Optional') ? ', including an Optional section' : ''}.` });
  if (bad) f.push({ level: 'warn', text: `${bad} list items are not "- [name](https://…): notes" links with absolute URLs.` });
  f.push({ level: 'warn', text: 'Reminder: Google says Search ignores llms.txt, and no major AI company has confirmed using it for answers. It is documentation, not a ranking factor.' });
  return { findings: f, links, sections };
}
