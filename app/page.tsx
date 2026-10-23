import { CinematicHero } from '@/components/cinema/CinematicHero';
import { Transformation } from '@/components/cinema/Transformation';
import { CapabilityIndex } from '@/components/cinema/CapabilityIndex';
import { SelectedWork } from '@/components/cinema/SelectedWork';
import { BuildAutomateGrow } from '@/components/cinema/BuildAutomateGrow';
import { TeamOverview } from '@/components/cinema/TeamOverview';
import { HowWeWork } from '@/components/cinema/HowWeWork';
import { WhyOdoovations } from '@/components/cinema/WhyOdoovations';
import { FinalContact } from '@/components/cinema/FinalContact';
import { SystemsPlayground } from '@/components/home/SystemsPlayground';
import { RoadmapProvider } from '@/components/home/RoadmapContext';
import { FrictionDiagnostic } from '@/components/home/FrictionDiagnostic';
import { RoadmapAssembler } from '@/components/home/RoadmapAssembler';
import { MotionRoot } from '@/components/ui/motion/MotionRoot';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPageSchema, localBusinessSchema } from '@/lib/seo';

/**
 * Homepage, ODOOVATIONS 3.0: ten sections, paced as one story.
 *
 *  01 hero · 02 transformation · 03 capabilities · 04 selected work ·
 *  05 build / automate / grow · 06 the people · 07 how we work ·
 *  08 interactive systems · 09 why ODOOVATIONS · 10 start
 *
 * Section 08 keeps the working tools from the previous homepage: the connected
 * workflow playground, and the operational diagnostic that feeds the roadmap and
 * the contact form. They are a lead path, not decoration, so they stay.
 *
 * What moved out, and where it lives: the Industries explorer is on
 * /industries and in the Expertise menu; the client roster is on
 * /company/clients; the FAQ is on /faq; Odoo-specific depth is on /services.
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
      <MotionRoot>
        <CinematicHero />
        <Transformation />
        <CapabilityIndex />
        <SelectedWork />
        <BuildAutomateGrow />
        <TeamOverview />
        <HowWeWork />
        <SystemsPlayground />
        <RoadmapProvider>
          <FrictionDiagnostic />
          <RoadmapAssembler />
        </RoadmapProvider>
        <WhyOdoovations />
        <FinalContact />
      </MotionRoot>
    </>
  );
}
