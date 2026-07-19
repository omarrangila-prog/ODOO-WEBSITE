import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Code2,
  Cable,
  Zap,
  BarChart3,
  BrainCircuit,
  LifeBuoy,
  GraduationCap,
} from 'lucide-react';

export interface EcoService {
  id: string;
  name: string;
  icon: LucideIcon;
  statement: string; // large editorial headline
  body: string;
  deliverables: string[];
  href: string;
  ctaLabel: string;
}

export const ecoServices: EcoService[] = [
  {
    id: 'implementation',
    name: 'Odoo Implementation',
    icon: Boxes,
    statement: 'One Connected System, Built Around How You Actually Work.',
    body: 'End-to-end setup of the modules your business needs — configured to match your real workflow, not a generic template.',
    deliverables: ['Workflow-first configuration', 'Right-sized module scope', 'Data migration & training', 'Go-live support'],
    href: '/services/odoo-implementation-pakistan',
    ctaLabel: 'Explore Implementation',
  },
  {
    id: 'custom',
    name: 'Custom Development',
    icon: Code2,
    statement: 'When Standard Odoo Stops, We Build What Your Business Needs.',
    body: 'Precise custom modules for the gaps standard Odoo cannot cover — only where they create measurable value.',
    deliverables: ['Custom workflows & approvals', 'Industry-specific modules', 'Automated pricing', 'External API integration'],
    href: '/services/custom-odoo-development',
    ctaLabel: 'Explore Custom Development',
  },
  {
    id: 'integration',
    name: 'Integration',
    icon: Cable,
    statement: 'Keep the Tools You Trust. Connect the Work That Matters.',
    body: 'Bring Odoo together with e-commerce, payments, couriers, banking and custom APIs into one reliable flow of information.',
    deliverables: ['Shopify / WooCommerce sync', 'Payment & courier links', 'Banking & biometric feeds', 'Custom API bridges'],
    href: '/services/odoo-integration',
    ctaLabel: 'Explore Integration',
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Zap,
    statement: 'Remove the Repetitive Work That Slows Your Team Down.',
    body: 'Automate approvals, notifications, reordering and routine data entry so your people focus on decisions, not admin.',
    deliverables: ['Approval automations', 'Automated reordering', 'Scheduled notifications', 'Rule-based workflows'],
    href: '/services/custom-odoo-development',
    ctaLabel: 'Explore Automation',
  },
  {
    id: 'reporting',
    name: 'Reporting',
    icon: BarChart3,
    statement: 'Replace Late Spreadsheets With Live, Trusted Numbers.',
    body: 'Real-time dashboards and reports drawn from one source of truth, so management always sees the current picture.',
    deliverables: ['Live KPI dashboards', 'Custom reports', 'Drill-down analysis', 'Scheduled delivery'],
    href: '/services/odoo-consulting',
    ctaLabel: 'Explore Reporting',
  },
  {
    id: 'ai',
    name: 'AI Dashboards',
    icon: BrainCircuit,
    statement: 'Turn Your Operational Data Into Guidance, Not Just Charts.',
    body: 'AI-assisted dashboards that surface anomalies, trends and next actions from the data your system already holds.',
    deliverables: ['AI-assisted insights', 'Anomaly detection', 'Natural-language summaries', 'Decision prompts'],
    href: '/services/custom-odoo-development',
    ctaLabel: 'Explore AI Dashboards',
  },
  {
    id: 'support',
    name: 'Support',
    icon: LifeBuoy,
    statement: 'Go-Live Is the Start of the Relationship, Not the End.',
    body: 'Ongoing support and maintenance — issue resolution, performance, safe upgrades and continuous improvement.',
    deliverables: ['Prioritised issue resolution', 'Performance tuning', 'Safe upgrades', 'Continuous improvement'],
    href: '/services/odoo-support-maintenance',
    ctaLabel: 'Explore Support',
  },
  {
    id: 'training',
    name: 'Training',
    icon: GraduationCap,
    statement: 'A System Is Only as Good as the Team That Uses It.',
    body: 'Role-based training on your real workflows — in English or Urdu — so adoption sticks and your investment pays off.',
    deliverables: ['Role-based sessions', 'Real-workflow practice', 'Reference materials', 'New-staff onboarding'],
    href: '/services/odoo-training',
    ctaLabel: 'Explore Training',
  },
];
