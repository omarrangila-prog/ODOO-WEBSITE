import type { ReactNode } from 'react';
import { cn } from '@/lib/utilities';

interface Props {
  /** The question this block answers, e.g. "What is AI automation?" */
  question?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Answer-first summary block.
 *
 * Placed near the top of major pages so a reader — or a retrieval system
 * quoting the page — gets a complete, self-contained answer before any
 * marketing language. It is ordinary visible content: no hidden text, and
 * nothing here that the rest of the page does not also support.
 */
export function AnswerCard({ question, children, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-panel border border-line-light bg-white/[0.04] p-6 sm:p-8',
        'theme-dark:border-line',
        className,
      )}
    >
      {question && (
        <h2 className="font-heading text-[clamp(17px,1.7vw,20px)] font-semibold tracking-[-0.01em]">
          {question}
        </h2>
      )}
      <div className={cn('text-[17px] leading-[1.65]', question && 'mt-3')}>{children}</div>
    </div>
  );
}
