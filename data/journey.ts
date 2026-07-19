export interface JourneyStage {
  n: number;
  key: string;
  title: string;
  purpose: string;
  deliverable: string;
  activities: string[];
  clientRole: string[];
}

export const journeyStages: JourneyStage[] = [
  {
    n: 1,
    key: 'Discover',
    title: 'Discover',
    purpose: 'We understand the real workflow, bottlenecks, responsibilities and goals.',
    deliverable: 'Process Map',
    activities: ['Interviews with each department', 'Mapping current processes', 'Identifying bottlenecks'],
    clientRole: ['Give access to key people', 'Share how you work today'],
  },
  {
    n: 2,
    key: 'Blueprint',
    title: 'Blueprint',
    purpose: 'You receive a clear scope showing what will be configured, customised and integrated.',
    deliverable: 'Implementation Scope',
    activities: ['Module & configuration plan', 'Standard vs custom split', 'Timeline & phases'],
    clientRole: ['Review and confirm scope', 'Align stakeholders'],
  },
  {
    n: 3,
    key: 'Prototype',
    title: 'Prototype',
    purpose: 'Your team experiences the proposed workflow before full implementation.',
    deliverable: 'Working Workflow Preview',
    activities: ['Configured sandbox', 'Workflow walkthrough', 'Early feedback'],
    clientRole: ['Try the prototype', 'Give honest feedback'],
  },
  {
    n: 4,
    key: 'Build',
    title: 'Build',
    purpose: 'Modules, permissions, automations, integrations and reports are configured and tested.',
    deliverable: 'Configured & Tested System',
    activities: ['Full configuration', 'Roles & automations', 'Integration & testing'],
    clientRole: ['Participate in testing', 'Confirm business rules'],
  },
  {
    n: 5,
    key: 'Train',
    title: 'Train',
    purpose: 'Your team learns the system on real workflows, and existing data is prepared and validated.',
    deliverable: 'Team Enablement',
    activities: ['Data migration & validation', 'Role-based training', 'Reference materials'],
    clientRole: ['Provide source data', 'Attend training'],
  },
  {
    n: 6,
    key: 'Launch',
    title: 'Launch',
    purpose: 'The system goes live with a controlled, supported transition.',
    deliverable: 'Live Business System',
    activities: ['Controlled go-live', 'Cutover support', 'Early monitoring'],
    clientRole: ['Use the system daily', 'Flag issues quickly'],
  },
  {
    n: 7,
    key: 'Support',
    title: 'Support',
    purpose: 'The system is stabilised, improved and supported as your business grows.',
    deliverable: 'Stabilisation & Improvement',
    activities: ['Issue resolution', 'Performance & upgrades', 'Continuous improvement'],
    clientRole: ['Report issues via the channel', 'Plan enhancements with us'],
  },
];
