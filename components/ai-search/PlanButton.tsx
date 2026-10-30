'use client';

import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import type { PlanId } from '@/data/ai-search-pricing';

/**
 * A plan's call to action. It starts a conversation: it chooses the plan in the enquiry form and moves
 * the visitor there. There is no checkout, because there is no billing workflow.
 *
 * It is a real link first (`?plan=…#enquiry`), so it works without scripts and from a shared URL; with
 * scripts it picks the plan in place and scrolls, without a page load.
 */
export function PlanButton({ plan, children, className, enquiryPath }: { plan: PlanId; children: React.ReactNode; className?: string; enquiryPath: string }) {
  const href = `${enquiryPath}?plan=${plan}#enquiry`;
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-5 font-heading text-[15px] font-medium tracking-tight no-underline transition-colors',
        className,
      )}
      onClick={(e) => {
        track('ai_plan_selected', { plan });
        const form = document.getElementById('enquiry');
        if (!form || window.location.pathname !== enquiryPath) return; // follow the link
        e.preventDefault();
        window.history.replaceState(null, '', href);
        window.dispatchEvent(new CustomEvent('odv:ai-plan', { detail: { plan } }));
        form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }}
    >
      {children}
    </a>
  );
}
