'use client';

import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utilities';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface Props {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const baseId = useId();
  const reduce = useReducedMotion();

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={cn('divide-y divide-line [.theme-light_&]:divide-line-light', className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
              >
                <span
                  className={cn(
                    'font-heading text-[19px] font-medium leading-snug transition-colors sm:text-[21px]',
                    isOpen ? 'signal-text' : '',
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors',
                    isOpen ? 'border-violet-bright/50 text-violet-bright' : 'border-line text-text-dark-muted [.theme-light_&]:border-line-light [.theme-light_&]:text-ink-muted',
                  )}
                >
                  {isOpen ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[44rem] pb-7 text-[16px] leading-[1.7] text-text-dark-muted [.theme-light_&]:text-ink-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
