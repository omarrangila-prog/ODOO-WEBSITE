import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

/**
 * The "no product name for what I need" case. Kept deliberately short: one
 * claim, one instruction, one action.
 */
export function AnythingCustom() {
  return (
    <section className="theme-light bay-sm">
      <div className="shell">
        <div className="rounded-editorial border border-line-light bg-white/60 p-8 sm:p-12 lg:p-16">
          <p className="eyebrow mb-5">Can&rsquo;t find the software you need?</p>
          <h2 className="display-2 max-w-4xl">
            That is exactly when <span className="signal-text">custom software</span> makes sense.
          </h2>{' '}
          <p className="lede mt-6 max-w-[52ch]">
            If your process is too specific for off-the-shelf tools, show us how the work happens
            today. We can map the workflow and determine what should be built &mdash; and what
            should not.
          </p>{' '}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#form">
              Show Us Your Workflow
              <ArrowNudge />
            </ButtonLink>{' '}
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}
