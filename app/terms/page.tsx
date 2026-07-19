import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalLayout } from '@/components/ui/LegalLayout';
import { company } from '@/data/company';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'The terms that govern your use of the ODOOVATIONS website.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="14 July 2026" crumbLabel="Terms" crumbPath="/terms">
      <p>
        These Terms of Use govern your access to and use of the {company.name} website. This is a
        starting template and should be reviewed by a qualified professional before launch.
      </p>

      <h2>Use of this website</h2>
      <p>
        You may use this website for lawful purposes only. You agree not to misuse the website,
        attempt to gain unauthorised access, or interfere with its normal operation.
      </p>

      <h2>Information provided</h2>
      <p>
        Content on this website is provided for general information. Service descriptions,
        timelines and outcomes are indicative and depend on the specifics of each engagement.
        Nothing on this website constitutes a binding offer or guarantee of specific results.
      </p>

      <h2>Enquiries and submissions</h2>
      <p>
        By submitting the contact form, you confirm the information you provide is accurate and
        that you are authorised to share any documents you upload. You retain ownership of your
        materials; you grant us permission to use them solely to respond to your enquiry.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The design, text and branding of this website are the property of {company.name} unless
        otherwise stated. You may not reproduce them without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {company.name} is not liable for any indirect or
        consequential loss arising from use of this website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalLayout>
  );
}
