import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
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
            'Odoo Implementation and Custom Development in Pakistan',
            '/',
            'ODOOVATIONS provides Odoo implementation, custom module development, integrations, automation and support for businesses in Pakistan and worldwide.',
          ),
          localBusinessSchema(),
        ]}
      />
      <Hero />
      <Manifesto />
      <IntentSelector />
      <RoadmapProvider>
        <FrictionDiagnostic />
        <ServicesRail />
        <TrendingTopics />
        <CustomStory />
        <IndustriesCinema />
        <JourneyRoute />
        <CaseStudiesEditorial />
        <TestimonialNarrative />
        <ExpertMoment />
        <Faq />
        <RoadmapAssembler />
      </RoadmapProvider>
    </>
  );
}
