import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utilities';

interface Props {
  label: string;
  steps: string[];
  note?: string;
  className?: string;
}

/**
 * A linear process flow rendered as real text, not an image.
 *
 * Used to show honestly how something works — including the human approval
 * step in an automation. Because it is text, it stays readable for screen
 * readers, search engines and anyone who cannot load the page's styling.
 */
export function FlowDiagram({ label, steps, note, className }: Props) {
  return (
    <figure className={cn('m-0', className)}>
      <figcaption className="eyebrow mb-6">{label}</figcaption>{' '}
      <ol className="flex flex-wrap items-stretch gap-x-2 gap-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="rounded-control border border-line bg-white/[0.04] px-4 py-2.5 text-[15px] font-medium leading-tight">
              {step}
            </span>
            {i < steps.length - 1 && (
              <>
                {' '}
                <ArrowRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden />
                {' '}
              </>
            )}
          </li>
        ))}
      </ol>
      {note && (
        <>
          {' '}
          <p className="mt-6 max-w-[var(--reading-width)] text-[16px] leading-relaxed opacity-70">{note}</p>
        </>
      )}
    </figure>
  );
}
