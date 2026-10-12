import { Hero } from '@/components/home/Hero';
import { CapabilityStrip } from '@/components/home/CapabilityStrip';
import { EcosystemGrid } from '@/components/home/EcosystemGrid';
import { SystemsPlayground } from '@/components/home/SystemsPlayground';
import { ClientWall } from '@/components/home/ClientWall';
import { Manifesto } from '@/components/home/Manifesto';
import { GlobalDeliveryBand } from '@/components/home/GlobalDeliveryBand';
import { AnythingCustom } from '@/components/home/AnythingCustom';
import { IntentSelector } from '@/components/home/IntentSelector';
import { RoadmapProvider } from '@/components/home/RoadmapContext';
import { FrictionDiagnostic } from '@/components/home/FrictionDiagnostic';
import { IndustriesCinema } from '@/components/home/IndustriesCinema';
import { CaseStudiesEditorial } from '@/components/home/CaseStudiesEditorial';
import { RealWork } from '@/components/home/RealWork';
import { ExpertMoment } from '@/components/home/ExpertMoment';
import { Faq } from '@/components/home/Faq';
import { RoadmapAssembler } from '@/components/home/RoadmapAssembler';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPageSchema, localBusinessSchema } from '@/lib/seo';

/**
 * Homepage — a directed story, not a catalogue.
 *
 * Order: what we do (hero, capabilities, ecosystem) → who trusts us
 * (clients) → what do you need (selector) → how it works (playground,
 * diagnostic) → proof (industries, work) → reassurance (global, custom,
 * people) → questions → start.
 *
 * Deliberately NOT here, and why:
 *  - ServicesRail, CustomStory and JourneyRoute are Odoo-specific depth
 *    (the rail alone was 5,760px, 22% of the page). They live on /services,
 *    the Odoo & ERP hub, where someone researching Odoo actually lands.
 *  - TrendingTopics duplicated the resources hub.
 *  - TestimonialNarrative is held back until named, verified client
 *    testimonials exist; an unattributed testimonial section is worse than
 *    none.
 *  - The FAQ shows six company-level questions and links to /faq, which
 *    owns the FAQPage schema.
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
        ]}
      />
      <Hero />
      <CapabilityStrip />
      <Manifesto />
      <EcosystemGrid />
      <ClientWall />
      <IntentSelector />
      <SystemsPlayground />
      <RoadmapProvider>
        <FrictionDiagnostic />
        <IndustriesCinema />
        <RealWork />
        <CaseStudiesEditorial />
        <GlobalDeliveryBand />
        <AnythingCustom />
        <ExpertMoment />
        <Faq />
        <RoadmapAssembler />
      </RoadmapProvider>
    </>
  );
}
