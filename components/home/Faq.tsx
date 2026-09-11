import { faqs } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqSchema } from '@/lib/seo';

interface Props {
  items?: { question: string; answer: string }[];
  heading?: string;
}

export function Faq({ items = faqs, heading = 'Questions Businesses Ask Before Starting Odoo' }: Props) {
  return (
    <section id="faq" className="theme-dark bay">
      <JsonLd data={faqSchema(items)} />
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-6">FAQ</p>
          <h2 className="display-2">{heading}</h2>
          <p className="lede mt-6 max-w-sm">
            Clear, direct answers to the questions we hear most often before a project begins.
          </p>
        </div>
        <Accordion items={items} allowMultiple />
      </div>
    </section>
  );
}
