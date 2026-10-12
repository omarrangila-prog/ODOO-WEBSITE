import { Hero } from '@/components/home/Hero';
import { CapabilityStrip } from '@/components/home/CapabilityStrip';
import { EcosystemGrid } from '@/components/home/EcosystemGrid';
import { SystemsPlayground } from '@/components/home/SystemsPlayground';
import { ClientWall } from '@/components/home/ClientWall';
import { Manifesto } from '@/components/home/Manifesto';
import { GlobalDeliveryBand } from '@/components/home/GlobalDeliveryBand';
import { AnythingCustom } from '@/components/home/AnythingCustom';
import { IntentSelector } from '@/components/home/IntentSelector';
import { TrendingTopics } from '@/components/home/TrendingTopics';
import { RoadmapProvider } from '@/components/home/RoadmapContext';
import { FrictionDiagnostic } from '@/components/home/FrictionDiagnostic';
import { ServicesRail } from '@/components/home/ServicesRail';
import { CustomStory } from '@/components/home/CustomStory';
import { IndustriesCinema } from '@/components/home/IndustriesCinema';
import { JourneyRoute } from '@/components/home/JourneyRoute';
import { CaseStudiesEditorial } from '@/components/home/CaseStudiesEditorial';
import { TestimonialNarrative } from '@/components/home/TestimonialNarrative';
import { ExpertMoment } from '@/components/home/ExpertMoment';
import { Faq } from '@/components/home/Faq';
import { RoadmapAssembler } from '@/components/home/RoadmapAssembler';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPageSchema, localBusinessSchema } from '@/lib/seo';

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
        <ServicesRail />
        <TrendingTopics />
        <CustomStory />
        <IndustriesCinema />
        <GlobalDeliveryBand />
        <JourneyRoute />
        <CaseStudiesEditorial />
        <AnythingCustom />
        <TestimonialNarrative />
        <ExpertMoment />
        <Faq />
        <RoadmapAssembler />
      </RoadmapProvider>
    </>
  );
}
