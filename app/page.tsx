import Link from 'next/link';
import { CinematicHero } from '@/components/cinema/CinematicHero';
import { ProofSection } from '@/components/home/ProofSection';
import { SectionLabel } from '@/components/home/SectionLabel';
import { ServiceExplorer } from '@/components/home/ServiceExplorer';
import { FeaturedWork, type ShowcaseItem } from '@/components/home/FeaturedWork';
import { DeliveryPeople } from '@/components/home/DeliveryPeople';
import { EnquirySection } from '@/components/home/EnquirySection';
import { BuyerGoals } from '@/components/home/BuyerGoals';
import { JsonLd } from '@/components/ui/JsonLd';
import { publishableProjects } from '@/data/projects';
import { caseStudyHref } from '@/data/case-study-model';
import { webPageSchema, localBusinessSchema } from '@/lib/seo';

/**
 * Homepage, six sections and about five screens:
 *
 *  01 hero · 02 the team in numbers · 03 service explorer ·
 *  04 featured work, each with a working demonstration ·
 *  05 how a project runs · 06 project enquiry (with its service paths)
 *
 * It was eight sections and ten screens. What was cut, and where it went:
 *  - The platforms section: Shopify, WooCommerce, WordPress and QuickBooks are
 *    cards in the service explorer and paths in the enquiry form, and each has
 *    its own page under /platforms. Saying it a third time added height only.
 *  - The standalone workflow demonstration: the three projects now carry their
 *    own working demonstrations, which replaced both it and the project artwork.
 *  - The home FAQ and its FAQ schema: /faq holds the questions. FAQ markup is
 *    only valid for questions visible on the page.
 *  - The project list and client roster in the evidence band: the featured work
 *    shows the projects, /company/clients shows the roster.
 */
const featured: { id: string; demo: ShowcaseItem['demo'] }[] = [
  { id: 'kcci-election', demo: 'election' },
  { id: 'whatsapp-digital-connection', demo: 'delivery' },
  { id: 'scrabble-timer', demo: 'timer' },
];

function showcaseItems(): ShowcaseItem[] {
  const all = publishableProjects();
  return featured.flatMap(({ id, demo }) => {
    const p = all.find((x) => x.id === id);
    if (!p) return [];
    return [
      {
        demo,
        href: caseStudyHref(p.id),
        project: {
          id: p.id,
          name: p.name,
          status: p.status,
          industry: p.industry,
          inPakistan: Boolean(p.evidence.countryPublic && p.countryCode === 'PK'),
          purpose: p.purpose,
          capabilities: p.capabilities,
        },
      },
    ];
  });
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            'Software, AI Automation, Odoo & Digital Services',
            '/',
            'ODOOVATIONS builds custom software, AI automation, Odoo ERP systems, websites, mobile apps, marketing campaigns, video and creative content for businesses in Pakistan and international clients served remotely.',
          ),
          localBusinessSchema(),
        ]}
      />

      <CinematicHero />
      <ProofSection />
      <BuyerGoals />

      <section aria-labelledby="services-h" className="band band-alt band-tight">
        <div className="band-inner">
          <SectionLabel index="04">What we build</SectionLabel>
          <h2 id="services-h" className="band-title mt-4 max-w-[34ch]">
            Find the right kind of help.
          </h2>
          <div className="mt-6">
            <ServiceExplorer />
          </div>
        </div>
      </section>

      <section aria-labelledby="work-h" className="band band-tight">
        <div className="band-inner">
          <SectionLabel index="05">Featured work</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <h2 id="work-h" className="band-title max-w-[34ch]">
              Systems built for real organisations.
            </h2>
            <Link href="/case-studies" className="link-editorial text-[15px]">
              All work, including labelled demonstrations <span aria-hidden className="arrow">↗</span>
            </Link>
          </div>
          <div className="mt-6">
            <FeaturedWork items={showcaseItems()} />
          </div>
        </div>
      </section>

      <DeliveryPeople />
      <EnquirySection />
    </>
  );
}
