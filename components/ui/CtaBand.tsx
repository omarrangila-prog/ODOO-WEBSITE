import { ButtonLink, ArrowNudge } from './Button';
import { WhatsAppButton } from './WhatsAppButton';

interface Props {
  title: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CtaBand({
  title,
  body = 'Send a voice note, spreadsheet or a plain description of where your business is struggling. We’ll help you find the right next step.',
  primaryLabel = 'Tell Us What You Need',
  primaryHref = '/contact#form',
}: Props) {
  return (
    <section className="theme-dark grain relative overflow-hidden bay-sm">
      <div className="pointer-events-none absolute inset-0 arch-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[640px] -translate-x-1/2 radial-core" aria-hidden />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-2">{title}</h2>
          <p className="lede mx-auto mt-6 max-w-xl">{body}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryHref}>
              {primaryLabel}
              <ArrowNudge />
            </ButtonLink>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}
