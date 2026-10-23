import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faq';
import { SectionLabel } from './SectionLabel';
import { EnquiryChannels } from './EnquiryChannels';

/**
 * Homepage section 8: the next step.
 *
 * The form is the same component and the same endpoint as /contact: three
 * required fields (name, email, what you need), an optional service dropdown,
 * and the rest behind an optional disclosure. Next to it are the other ways to
 * reach us, each labelled for what it actually is, and a plain account of what
 * happens after submitting. The questions are the ones that decide whether
 * someone writes at all, taken from the site's existing FAQ so the wording
 * cannot drift from /faq.
 */
const pick = [
  'Are you an official Odoo partner?',
  'Do you only build on Odoo?',
  'How is pricing structured?',
  'Where are you based, and do you work internationally?',
  'Can Odoo connect with Shopify, WhatsApp or other systems?',
  'Do you offer bookkeeping or accounting services?',
];
export const homeFaqs = pick.map((q) => faqs.find((f) => f.question === q)).filter((f): f is NonNullable<typeof f> => Boolean(f));

export function EnquirySection() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-h" className="band scroll-mt-20">
      <div className="band-inner">
        <SectionLabel index="08">Project enquiry</SectionLabel>
        <h2 id="enquiry-h" className="band-title mt-4 max-w-[18ch]">
          Tell us what you need built or fixed.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <EnquiryChannels />

            <div className="mt-8">
              <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">What happens after you send it</h3>
              <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-dark-muted">
                <li className="flex gap-3">
                  <span aria-hidden className="w-5 shrink-0 text-[12px] tracking-[0.12em] text-violet/80">01</span>
                  <span>Your message reaches the ODOOVATIONS team by email.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="w-5 shrink-0 text-[12px] tracking-[0.12em] text-violet/80">02</span>
                  <span>A person reads it and replies during Pakistan business hours, usually with questions or a suggested next step.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="w-5 shrink-0 text-[12px] tracking-[0.12em] text-violet/80">03</span>
                  <span>If it makes sense, we propose a short call and then a written scope. There is no automatic quote and no obligation.</span>
                </li>
              </ol>
              <p className="mt-5 text-[14px] text-text-dark-muted">
                Not sure where to start?{' '}
                <Link href="/tools/operations-check">Try the two-minute operations check</Link>.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-graphite/80 p-5 shadow-float sm:p-8">
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <h3 className="band-title !text-[clamp(24px,2.6vw,36px)]">Questions people ask before writing.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">
              More on the <Link href="/faq">full FAQ page</Link>, and on <Link href="/company/pricing">how we price</Link>.
            </p>
          </div>
          <Accordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
