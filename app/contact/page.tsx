import type { Metadata } from 'next';
import { MessageCircle, Mail, Phone, MapPin, CalendarClock } from 'lucide-react';
import { buildMetadata, breadcrumbSchema, webPageSchema, localBusinessSchema } from '@/lib/seo';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageArt } from '@/components/cinema/PageArt';

export const metadata: Metadata = buildMetadata({
  title: 'Contact ODOOVATIONS | Software, AI & ERP Projects',
  description:
    'Tell us how your business works and we will help you find the right next step. Send a workflow document, book a discovery call or message us on WhatsApp.',
  path: '/contact',
});

export default function ContactPage() {
  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '#form';

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            'Contact ODOOVATIONS',
            '/contact',
            'Tell us what you need built, automated or improved. Software, AI automation, Odoo ERP, websites, marketing and creative projects.',
          ),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <PageArt variant={1} />
        <div className="shell relative">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />

          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
              <p className="eyebrow mb-6">Start the Conversation</p>{' '}
              <h1 className="display-1">
                Bring Us the Mess. We&rsquo;ll Help You Build the{' '}
                <span className="signal-text">System.</span>
              </h1>{' '}
              <p className="lede mt-7 max-w-[var(--reading-width)]">
                Send us a voice note, Excel sheet, process document, screenshot, or simply explain
                where your team is struggling. We&rsquo;ll help you identify the right next
                step&mdash;no sales pressure.
              </p>

              <ul className="mt-10 space-y-2">
                <ContactRow icon={MessageCircle} label="WhatsApp" value={waConfigured ? 'Message us directly' : 'Use the form to reach us'} href={waHref} external={waConfigured} color="text-green" />
                <ContactRow icon={Mail} label="Email" value={company.email} href={`mailto:${company.email}`} color="text-cyan" />
                <ContactRow icon={Phone} label="Phone" value={company.phoneDisplay} href={company.phoneHref} color="text-violet-bright" />
                <ContactRow icon={MapPin} label="Location" value={`${company.address.full} · serving worldwide`} color="text-magenta" />
                {company.schedulingUrl && (
                  <ContactRow icon={CalendarClock} label="Schedule" value="Book a discovery call" href={company.schedulingUrl} external color="text-amber" />
                )}
              </ul>
            </div>

            <div id="form" className="scroll-mt-28 rounded-editorial border border-line bg-midnight/[0.94] p-6 shadow-float backdrop-blur-md sm:p-8">
              {/* Near-opaque on purpose: a form needs a calm surface, so the hero artwork does not run behind the inputs. */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  color,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  color: string;
}) {
  const inner = (
    <>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-white/[0.02] ${color}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-[13px] font-semibold uppercase tracking-wide text-text-dark-muted">{label}</span>{' '}
        <span className="block text-[15px] text-text-dark">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="flex items-center gap-3.5 rounded-control p-2 transition-colors hover:bg-white/[0.03]">
          {inner}
        </a>
      ) : (
        <span className="flex items-center gap-3.5 p-2">{inner}</span>
      )}
    </li>
  );
}
