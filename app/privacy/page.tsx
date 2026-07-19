import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalLayout } from '@/components/ui/LegalLayout';
import { company } from '@/data/company';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How ODOOVATIONS collects, uses and protects the information you share, including workflow documents submitted through our contact form.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="14 July 2026" crumbLabel="Privacy Policy" crumbPath="/privacy">
      <p>
        This Privacy Policy explains how {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
        uses and protects the information you provide when you contact us or use this website.
        This is a starting template and should be reviewed by a qualified professional before
        launch to ensure it reflects your actual data practices and local requirements.
      </p>

      <h2>Information we collect</h2>
      <p>When you submit our contact form, we collect the details you provide, which may include:</p>
      <ul>
        <li>Your name, company name, work email and phone or WhatsApp number.</li>
        <li>Your country, industry, company size and current systems.</li>
        <li>Your described workflow challenge and any documents you choose to upload.</li>
        <li>Your preferred contact method and service interests.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and propose a suitable next step.</li>
        <li>To prepare a scope or proposal at your request.</li>
        <li>To communicate with you about your project.</li>
      </ul>
      <p>We do not sell your information. We do not use it for unrelated marketing without your consent.</p>

      <h2>Workflow documents</h2>
      <p>
        Documents you upload are treated as confidential business information. They are used only
        to understand your requirements. We do not publish uploaded files or expose them publicly.
        Retention and storage of uploaded documents depend on the storage strategy configured for
        this website; where no storage is configured, documents are not persisted by the website.
      </p>

      <h2>Data security</h2>
      <p>
        We apply reasonable technical and organisational measures to protect your information,
        including server-side validation, file-type and size restrictions, and secure handling of
        credentials through environment variables. No method of transmission is completely secure.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-respecting analytics only when configured, to understand aggregate website
        usage. Where used, analytics are configured to minimise personal data collection.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information you have
        provided. To make a request, contact us at{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions about this policy, email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalLayout>
  );
}
