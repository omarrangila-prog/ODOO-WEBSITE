'use client';

import Image from 'next/image';
import type { CSSProperties, RefObject } from 'react';

export type AvatarState = 'idle' | 'greeting' | 'listening' | 'speaking' | 'thinking' | 'goodbye';

const SRC = {
  face: { src: '/concierge/host-face.webp', w: 192, h: 192 },
  card: { src: '/concierge/host-card.webp', w: 320, h: 336 },
  bust: { src: '/concierge/host-bust.webp', w: 760, h: 799 },
} as const;

/**
 * The concierge's visual presentation, kept apart from the voice engine so a real-time avatar provider (with
 * true audio-driven lip sync) can replace it later without touching the conversation code. Today it animates
 * a still portrait by state; while speaking it moves with the loudness of her voice. That is not lip sync.
 */
export function ConciergeAvatar({
  state,
  variant,
  ampRef,
  className = '',
  priority = false,
}: {
  state: AvatarState;
  variant: keyof typeof SRC;
  /** Element whose --cg-amp custom property the panel updates from the audio level. */
  ampRef?: RefObject<HTMLDivElement>;
  className?: string;
  priority?: boolean;
}) {
  const s = SRC[variant];
  const face = variant === 'face';
  return (
    <div ref={ampRef} className={`cg-state-${state} ${className}`} style={{ '--cg-amp': 0 } as CSSProperties}>
      <div className={`cg-portrait relative h-full w-full overflow-hidden ${face ? 'rounded-full' : ''}`}>
        <Image
          src={s.src}
          alt=""
          width={s.w}
          height={s.h}
          className={face ? 'h-full w-full object-cover' : 'h-full w-full object-contain object-bottom'}
          priority={priority}
          unoptimized
          draggable={false}
        />
      </div>
    </div>
  );
}
