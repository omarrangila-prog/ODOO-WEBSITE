'use client';

import { useState } from 'react';
import { AI_AGENTS, parseRobots, isAllowed } from '@/lib/tools/robots';

const SAMPLE = `User-agent: *\nDisallow: /admin\n\nUser-agent: GPTBot\nDisallow: /\n`;

/** Paste a robots.txt; see which AI agents may fetch a path. Runs in the browser; nothing is fetched or sent. */
export function AiCrawlerChecker() {
  const [text, setText] = useState('');
  const [path, setPath] = useState('/');
  const [ran, setRan] = useState<null | ReturnType<typeof run>>(null);
  function run() {
    const groups = parseRobots(text);
    const p = path.startsWith('/') ? path : `/${path}`;
    return AI_AGENTS.map((a) => ({ a, ...isAllowed(groups, a.token, p) }));
  }
  return (
    <div className="space-y-5">
      <label className="block text-[14.5px] font-semibold text-text-dark">
        Paste your robots.txt (open yoursite.com/robots.txt and copy it)
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} spellCheck={false} className="mt-2 block w-full rounded-control border border-line-strong bg-transparent p-3 font-mono text-[14px] font-normal text-text-dark" />
      </label>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-[14.5px] font-semibold text-text-dark">
          Path to test
          <input value={path} onChange={(e) => setPath(e.target.value)} className="mt-2 block min-h-[44px] w-56 rounded-control border border-line-strong bg-transparent px-3 font-mono text-[14px] font-normal" />
        </label>
        <button type="button" onClick={() => setRan(run())} className="inline-flex min-h-[44px] items-center rounded-full border border-white/[0.25] px-5 text-[15px] font-semibold text-text-dark hover:border-violet-bright/70">Check AI crawlers</button>
        <button type="button" onClick={() => setText(SAMPLE)} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-5 text-[15px] text-text-dark-muted hover:text-white">Use an example</button>
      </div>
      {ran && (
        <div className="overflow-x-auto rounded-[18px] border border-line" tabIndex={0} role="region" aria-label="Crawler results (scrollable table)">
          <table className="w-full min-w-[640px] text-left text-[14.5px]" aria-live="polite">
            <thead><tr className="border-b border-line">{['Agent', 'Company', 'Purpose', 'Result', 'Why'].map((h) => <th key={h} scope="col" className="px-4 py-2.5 font-semibold text-text-dark">{h}</th>)}</tr></thead>
            <tbody>
              {ran.map((r) => (
                <tr key={r.a.token} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[13.5px] text-text-dark">{r.a.token}</td>
                  <td className="px-4 py-2.5 text-text-dark-muted">{r.a.owner}</td>
                  <td className="px-4 py-2.5 text-text-dark-muted">{r.a.kind}</td>
                  <td className={`px-4 py-2.5 font-semibold ${r.allowed ? 'text-[#8ee6b5]' : 'text-[#ff9b9b]'}`}>{r.allowed ? 'Allowed' : 'Blocked'}</td>
                  <td className="px-4 py-2.5 text-[13.5px] text-text-dark-muted">Group {r.matchedGroup}; {r.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
