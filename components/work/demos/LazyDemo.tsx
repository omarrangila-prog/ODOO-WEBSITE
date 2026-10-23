'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

export type DemoId = 'election' | 'timer' | 'delivery';

/** Reserved height so the page does not move when the demonstration mounts. Measured at 320 to 1440px; the bands are the three layouts the demonstrations switch between (stacked, two columns inside a narrow frame, two columns wide). */
const reserve: Record<DemoId, string> = {
  election: 'min-h-[850px] sm:min-h-[520px] lg:min-h-[500px]',
  timer: 'min-h-[1400px] sm:min-h-[1235px] lg:min-h-[690px]',
  delivery: 'min-h-[945px] sm:min-h-[821px] lg:min-h-[470px]',
};

const loading = () => (
  <div className="grid min-h-[300px] place-items-center rounded-[20px] border border-line text-[14px] text-text-dark-muted">Loading the demonstration…</div>
);
const Election = dynamic(() => import('./ElectionDemo').then((m) => m.ElectionDemo), { ssr: false, loading });
const Timer = dynamic(() => import('./TimerDemo').then((m) => m.TimerDemo), { ssr: false, loading });
const Delivery = dynamic(() => import('./DocDeliveryDemo').then((m) => m.DocDeliveryDemo), { ssr: false, loading });

/**
 * Mounts a demonstration only when it is near the screen, so the code and the
 * work behind it never compete with the first paint. Without scripts the
 * surrounding text still says what the demonstration shows.
 */
export function LazyDemo({ id, eager = false }: { id: DemoId; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(eager);

  useEffect(() => {
    if (on) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [on]);

  return (
    <div ref={ref} data-demo={id} className={reserve[id]}>
      {on && id === 'election' && <Election />}
      {on && id === 'timer' && <Timer />}
      {on && id === 'delivery' && <Delivery />}
    </div>
  );
}
