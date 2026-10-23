'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Footer link groups: open columns on a desktop, folded rows on a phone.
 *
 * The HTML always carries every group open, so without scripts every link is
 * visible. Once running, a narrow viewport folds the groups (a phone footer was
 * three screens of link lists) and a wide one keeps them open and stops the
 * heading from toggling. The wrapper uses `display: contents`, so the groups
 * stay direct children of the footer grid.
 */
export function FooterColumns({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const all = () => Array.from(root.querySelectorAll('details'));

    const apply = () => {
      for (const d of all()) {
        const summary = d.querySelector('summary');
        if (mq.matches) {
          d.open = true;
          if (summary) summary.tabIndex = -1;
        } else {
          d.open = false;
          if (summary) summary.tabIndex = 0;
        }
      }
    };
    // A desktop heading is a label, not a control: put the group back if it is toggled.
    const keepOpen = (e: Event) => {
      const d = e.target;
      if (mq.matches && d instanceof HTMLDetailsElement && !d.open) d.open = true;
    };

    apply();
    mq.addEventListener('change', apply);
    root.addEventListener('toggle', keepOpen, true);
    return () => {
      mq.removeEventListener('change', apply);
      root.removeEventListener('toggle', keepOpen, true);
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
