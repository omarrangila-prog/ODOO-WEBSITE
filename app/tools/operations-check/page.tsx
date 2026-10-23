import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageArt } from '@/components/cinema/PageArt';
import { RoadmapProvider } from '@/components/home/RoadmapContext';
import { FrictionDiagnostic } from '@/components/home/FrictionDiagnostic';
import { RoadmapAssembler } from '@/components/home/RoadmapAssembler';
import { MotionRoot } from '@/components/ui/motion/MotionRoot';

const PATH = '/tools/operations-check';
const DESCRIPTION =
  'A two-minute check of where your day-to-day operations lose time. Pick the friction your team feels and turn it into a roadmap request. Indicative only; no sign-up needed.';

export const metadata: Metadata = buildMetadata({
  title: 'Operations Check: Where Is Time Lost? | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

/**
 * The operational diagnostic, moved out of the homepage so that nobody has to
 * wade through it to reach the enquiry form. It is an optional tool: the result
 * is an indicative reading, not a calculation of cost, and the next step is a
 * request the visitor chooses to send.
 */
export default function OperationsCheckPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Operations check', path: PATH },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema('Operations check', PATH, DESCRIPTION)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <PageArt variant={4} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Tool</p>
          <h1 className="display-1 max-w-4xl">
            Where does your business <span className="signal-text">lose time?</span>
          </h1>
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Switch on the friction your team feels each week and read the result. It takes about two minutes, asks for no
            personal details, and is an indicative reading of your workflow, not a financial calculation.
          </p>
        </div>
      </section>

      <MotionRoot>
        <RoadmapProvider>
          <FrictionDiagnostic />
          <RoadmapAssembler />
        </RoadmapProvider>
      </MotionRoot>
    </>
  );
}
