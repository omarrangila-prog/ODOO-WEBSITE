import { CinematicHero } from '@/components/cinema/CinematicHero';
import { ProofSection } from '@/components/home/ProofSection';
import { SectionLabel } from '@/components/home/SectionLabel';
import { ServiceExplorer } from '@/components/home/ServiceExplorer';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { PlatformsSection } from '@/components/home/PlatformsSection';
import { WorkflowDemo } from '@/components/home/WorkflowDemo';
import { DeliveryPeople } from '@/components/home/DeliveryPeople';
import { EnquirySection, homeFaqs } from '@/components/home/EnquirySection';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPageSchema, localBusinessSchema, faqSchema } from '@/lib/seo';

/**
 * Homepage, eight sections:
 *
 *  01 hero · 02 evidence · 03 service explorer · 04 featured work ·
 *  05 platforms & integrations · 06 interactive demonstration ·
 *  07 delivery & people · 08 project enquiry
 *
 * What the earlier ten-section page held, and where it went:
 *  - "Transformation", "Build / Automate / Grow", "Why ODOOVATIONS": the claims
 *    were repeated in the hero, the explorer and the delivery section, so they
 *    were cut rather than moved.
 *  - The seven-division index: now the service explorer (section 03).
 *  - The team overview and "how we work": merged into section 07.
 *  - The operational diagnostic and roadmap assembler: now an optional tool at
 *    /tools/operations-check, linked from the enquiry section.
 *  - Industries, the client roster and the full FAQ: /industries,
 *    /company/clients and /faq, as before.
 */
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
          faqSchema(homeFaqs),
        ]}
      />

      <CinematicHero />
      <ProofSection />

      <section aria-labelledby="services-h" className="band band-alt">
        <div className="band-inner">
          <SectionLabel index="03">What we build</SectionLabel>
          <h2 id="services-h" className="band-title mt-4 max-w-[22ch]">
            Find the right kind of help.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-text-dark-muted">
            Five areas, one team. Pick the one closest to your problem; each card opens the page that explains it in full.
          </p>
          <div className="mt-8">
            <ServiceExplorer />
          </div>
        </div>
      </section>

      <FeaturedWork />
      <PlatformsSection />

      <section aria-labelledby="demo-h" className="band band-alt">
        <div className="band-inner">
          <SectionLabel index="06">Interactive demonstration</SectionLabel>
          <h2 id="demo-h" className="band-title mt-4 max-w-[24ch]">
            See what happens when your systems talk.
          </h2>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-text-dark-muted">
            Choose a workflow and step through it. Notice which steps a machine performs and which still belong to a person.
          </p>
          <div className="mt-8">
            <WorkflowDemo />
          </div>
        </div>
      </section>

      <DeliveryPeople />
      <EnquirySection />
    </>
  );
}
