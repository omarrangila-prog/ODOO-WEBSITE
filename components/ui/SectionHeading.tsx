import type { ReactNode } from 'react';
import { cn } from '@/lib/utilities';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
  as = 'h2',
}: Props) {
  const Tag = as;
  return (
    <div className={cn('flex flex-col', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
      <Tag className={as === 'h1' ? 'display-1' : 'display-2'}>{title}</Tag>
      {intro && (
        <>
          {' '}
          <p className={cn('lede mt-6 max-w-[42rem]', align === 'center' && 'mx-auto')}>{intro}</p>
        </>
      )}
    </div>
  );
}
