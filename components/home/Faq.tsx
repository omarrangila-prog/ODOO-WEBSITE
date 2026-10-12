import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { faqs } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';

interface Props {
  items?: { question: string; answer: string }[];
  heading?: string;
}

/**
 * The company-level questions, for the homepage.
 *
 * The homepage previously rendered all 18 FAQs (1,022 words, ~2,000px) and
 * emitted a second FAQPage schema competing with /faq. It now shows the six
 * broadest questions and routes to /faq, which stays the canonical source
 * for the schema and the full set.
 */
const HOMEPAGE_QUESTIONS = [
  'Are you an official Odoo partner?',
  'Do you only build on Odoo?',
  'How is pricing structured?',
  'Can you deliver a project urgently?',
  'Where are you based, and do you work internationally?',
  'Do you offer bookkeeping or accounting services?',
];

const homepageFaqs = HOMEPAGE_QUESTIONS.map((q) => faqs.find((f) => f.question === q)).filter(
  (f): f is { question: string; answer: string } => Boolean(f),
);

export function Faq({ items = homepageFaqs, heading = 'The Questions We Hear Most' }: Props) {
  return (
    <section id="faq" className="theme-dark bay">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-6">FAQ</p>
          <h2 className="display-2">{heading}</h2>{' '}
          <p className="lede mt-6 max-w-sm">
            Clear, direct answers to the questions we hear most often before a project begins.
          </p>
        </div>
        <div>
          <Accordion items={items} allowMultiple />{' '}
          <p className="mt-8 text-[16px] text-text-dark-muted">
            <Link
              href="/faq"
              className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-violet-bright"
            >
              All {faqs.length} questions
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
