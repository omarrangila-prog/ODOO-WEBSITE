'use client';

import { useId } from 'react';
import Link from 'next/link';
import { enquiryPaths, type EnquiryPath, type PathAnswers } from '@/data/enquiry-paths';
import { platformNotice } from '@/data/platforms';
import { inputClass } from './Field';
import { cn } from '@/lib/utilities';

const pill =
  'flex min-h-[44px] cursor-pointer items-center rounded-full border border-line px-4 py-2 text-[14.5px] text-text-dark-muted transition-colors hover:border-line-strong has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-violet-bright has-[:checked]:border-violet-bright/60 has-[:checked]:bg-violet/[0.12] has-[:checked]:text-white';

/**
 * "What is this about?" at the top of the enquiry form.
 *
 * Native radio inputs, so the group works by keyboard and screen reader with no
 * script: arrow keys move between paths, Tab leaves the group. The questions for
 * the chosen path are real form controls too. They are all optional.
 */
export function PathChooser({
  pathId,
  answers,
  onPath,
  onAnswers,
}: {
  pathId: string;
  answers: PathAnswers;
  onPath: (id: string) => void;
  onAnswers: (next: PathAnswers) => void;
}) {
  const uid = useId();
  const path = enquiryPaths.find((p) => p.id === pathId);

  return (
    <div>
      <fieldset>
        <legend className="mb-3 block text-[15px] font-semibold text-text-dark">What is this about?</legend>
        <div className="flex flex-wrap gap-2">
          {enquiryPaths.map((p) => (
            <label key={p.id} className={pill}>
              <input
                type="radio"
                name={`${uid}-path`}
                value={p.id}
                checked={p.id === pathId}
                onChange={() => onPath(p.id)}
                className="sr-only"
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      {path && <PathQuestions key={path.id} path={path} answers={answers} onAnswers={onAnswers} uid={uid} />}
    </div>
  );
}

function PathQuestions({
  path,
  answers,
  onAnswers,
  uid,
}: {
  path: EnquiryPath;
  answers: PathAnswers;
  onAnswers: (next: PathAnswers) => void;
  uid: string;
}) {
  const set = (id: string, v: string | string[]) => onAnswers({ ...answers, [id]: v });

  return (
    <div className="mt-4 rounded-panel border border-line bg-white/[0.02] p-4 sm:p-5" data-path-panel={path.id}>
      <p className="text-[14px] leading-relaxed text-text-dark-muted">
        {path.blurb} All of these are optional.
        {path.learnMore && (
          <>
            {' '}
            <Link href={path.learnMore.href} className="text-violet-bright underline underline-offset-2">
              {path.learnMore.label}
            </Link>
            .
          </>
        )}
      </p>
      {path.scopeNote && <p className="mt-3 text-[14px] leading-relaxed text-text-dark">{path.scopeNote}</p>}
      {['shopify', 'woocommerce', 'quickbooks'].includes(path.id) && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-text-dark-muted">{platformNotice}</p>
      )}

      {path.questions.length > 0 && (
        <div className="mt-4 space-y-4">
          {path.questions.map((q) => {
            const qid = `${uid}-${path.id}-${q.id}`;
            if (q.kind === 'text') {
              return (
                <div key={q.id}>
                  <label htmlFor={qid} className="mb-1.5 block text-[14px] font-semibold text-text-dark">
                    {q.label}
                  </label>
                  <input
                    id={qid}
                    className={inputClass}
                    maxLength={160}
                    placeholder={q.placeholder}
                    value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
                    onChange={(e) => set(q.id, e.target.value)}
                  />
                </div>
              );
            }
            if (q.kind === 'choice') {
              return (
                <fieldset key={q.id}>
                  <legend className="mb-2 block text-[14px] font-semibold text-text-dark">{q.label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {q.options?.map((o) => (
                      <label key={o} className={cn(pill, '!min-h-[40px] text-[14px]')}>
                        <input
                          type="radio"
                          name={qid}
                          value={o}
                          checked={answers[q.id] === o}
                          onChange={() => set(q.id, o)}
                          className="sr-only"
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            }
            const picked = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
            return (
              <fieldset key={q.id}>
                <legend className="mb-2 block text-[14px] font-semibold text-text-dark">{q.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {q.options?.map((o) => (
                    <label key={o} className={cn(pill, '!min-h-[40px] text-[14px]')}>
                      <input
                        type="checkbox"
                        value={o}
                        checked={picked.includes(o)}
                        onChange={(e) => set(q.id, e.target.checked ? [...picked, o] : picked.filter((x) => x !== o))}
                        className="sr-only"
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>
      )}
    </div>
  );
}
