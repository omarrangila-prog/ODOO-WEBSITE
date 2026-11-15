'use client';

import { useState } from 'react';
import { checkLlmsTxt, type LlmsFinding } from '@/lib/tools/llmstxt';

/** Paste an llms.txt; see whether it follows the llmstxt.org structure. Runs in the browser only. */
export function LlmsTxtChecker() {
  const [text, setText] = useState('');
  const [res, setRes] = useState<LlmsFinding[] | null>(null);
  const tone = { ok: 'text-[#8ee6b5]', warn: 'text-amber', error: 'text-[#ff9b9b]' } as const;
  return (
    <div className="space-y-5">
      <label className="block text-[14.5px] font-semibold text-text-dark">
        Paste your llms.txt
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} spellCheck={false} className="mt-2 block w-full rounded-control border border-line-strong bg-transparent p-3 font-mono text-[14px] font-normal text-text-dark" />
      </label>
      <button type="button" onClick={() => setRes(checkLlmsTxt(text).findings)} className="inline-flex min-h-[44px] items-center rounded-full border border-white/[0.25] px-5 text-[15px] font-semibold text-text-dark hover:border-violet-bright/70">Check structure</button>
      {res && (
        <ul aria-live="polite" className="space-y-2 rounded-[18px] border border-line p-5 text-[15px]">
          {res.map((f, i) => <li key={i} className={tone[f.level]}>{f.level === 'ok' ? '✓' : f.level === 'warn' ? '!' : '✗'} {f.text}</li>)}
        </ul>
      )}
    </div>
  );
}
