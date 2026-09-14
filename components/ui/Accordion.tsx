'use client';

import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
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

/** `inert` is not yet in React 18's attribute typings; spread it from a plain object. */
function inertWhenClosed(open: boolean): Record<string, string> {
  return open ? {} : { inert: '' };
}

/**
 * Accordion whose answers are ALWAYS in the DOM.
 *
 * The previous version rendered a panel only while open, so a page with 18
 * FAQs shipped one answer in its HTML — the rest existed only in JSON-LD.
 * Search engines read the schema, but text-based crawlers and retrieval
 * systems saw questions with no answers. Every panel is now server-rendered;
 * open/close is a CSS grid-row transition (0fr → 1fr) with no JavaScript
 * animation library involved. Closed panels are `inert` and aria-hidden —
 * out of the accessibility tree and tab order — while their text stays in
 * the document for extraction. (`hidden` was not used: its UA display:none
 * is overridden by the grid class, and display:none would kill the
 * transition anyway.) Reduced-motion users get an instant toggle.
 *
 * A single space text node sits between question and panel so textContent
 * reads "…business? Yes. Odoo scales…" rather than fusing the two.
 */
export function Accordion({ items, allowMultiple = false, className }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const baseId = useId();

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
            {i > 0 && ' '}
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
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
                  aria-hidden
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>{' '}
            {/* Always rendered; the grid-rows trick animates height without
                measuring it. Closed panels are inert + aria-hidden. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              {...inertWhenClosed(isOpen)}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-premium motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[44rem] pb-7 text-[16px] leading-[1.7] text-text-dark-muted [.theme-light_&]:text-ink-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
