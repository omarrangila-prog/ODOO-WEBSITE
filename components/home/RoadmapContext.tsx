'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface RoadmapState {
  problems: Set<string>;
  toggle: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<RoadmapState | null>(null);

/**
 * Shares the visitor's selected workflow problems across the page so the
 * diagnostic and the final "personalised roadmap" assembler stay in sync.
 */
export function RoadmapProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setProblems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function clear() {
    setProblems(new Set());
  }

  return <Ctx.Provider value={{ problems, toggle, clear }}>{children}</Ctx.Provider>;
}

export function useRoadmap(): RoadmapState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRoadmap must be used within RoadmapProvider');
  return ctx;
}
