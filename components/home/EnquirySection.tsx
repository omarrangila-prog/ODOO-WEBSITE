import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { SectionLabel } from './SectionLabel';
import { EnquiryChannels } from './EnquiryChannels';

/**
 * Homepage section 6: the next step.
 *
 * The form is the same component and the same endpoint as /contact. It opens with
 * "What is this about?", so a Shopify, WooCommerce or QuickBooks enquiry is asked
 * the few questions that matter for it and arrives labelled with that path.
 * Beside it are the other ways to reach us, each labelled for what it is, and a
 * plain account of what happens next. The questions people ask before writing
 * live on /faq; they are not repeated here.
 */
export function EnquirySection() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-h" className="band band-tight scroll-mt-20">
      <div className="band-inner">
        <SectionLabel index="07">Project enquiry</SectionLabel>
        <h2 id="enquiry-h" className="band-title mt-4 max-w-[34ch]">
          Tell us what you need built or fixed.
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <EnquiryChannels />

            <h3 className="mt-7 font-heading text-[17px] font-semibold tracking-[-0.02em] text-white">What happens after you send it</h3>
            <ol className="mt-3 space-y-2.5 text-[14.5px] leading-relaxed text-text-dark-muted">
              {[
                'Your message reaches the ODOOVATIONS team by email.',
                'A person reads it and replies during Pakistan business hours, usually with questions or a suggested next step.',
                'If it makes sense, we propose a short call and then a written scope. No automatic quote, no obligation.',
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="w-5 shrink-0 text-[12px] tracking-[0.12em] text-violet/80">0{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[14px] text-text-dark-muted">
              Not sure where to start? <Link href="/tools/operations-check">Try the two-minute operations check</Link>, or read the{' '}
              <Link href="/faq">frequently asked questions</Link>.
            </p>
          </div>

          <div className="rounded-[24px] border border-line bg-graphite/80 p-5 shadow-float sm:p-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
