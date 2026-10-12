'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utilities';

export interface TabItem {
  id: string;
  label: string;
}

interface Props {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children: (activeId: string) => ReactNode;
  panelClassName?: string;
}

export function Tabs({
  tabs,
  active,
  onChange,
  className,
  orientation = 'horizontal',
  children,
  panelClassName,
}: Props) {
  const baseId = useId();
  const [focusIndex, setFocusIndex] = useState(Math.max(0, tabs.findIndex((t) => t.id === active)));
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent) {
    const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    let next = focusIndex;
    if (e.key === nextKey) next = (focusIndex + 1) % tabs.length;
    else if (e.key === prevKey) next = (focusIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setFocusIndex(next);
    const tab = tabs[next];
    if (tab) {
      onChange(tab.id);
      refs.current[next]?.focus();
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={onKeyDown}
        className={cn(orientation === 'vertical' ? 'flex flex-col gap-1' : 'flex gap-2 overflow-x-auto no-scrollbar')}
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                onChange(tab.id);
                setFocusIndex(i);
              }}
              className={cn(
                'whitespace-nowrap rounded-control px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-200 min-h-[44px]',
                orientation === 'vertical' && 'w-full',
                selected
                  ? 'bg-white/[0.06] text-text-dark [.theme-light_&]:bg-black/[0.05] [.theme-light_&]:text-ink'
                  : 'text-text-dark-muted hover:text-text-dark [.theme-light_&]:text-ink-muted [.theme-light_&]:hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className={panelClassName}
      >
        {children(active)}
      </div>
    </div>
  );
}
