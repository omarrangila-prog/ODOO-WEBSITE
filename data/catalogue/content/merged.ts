/**
 * Public tier names for briefs merged into established pages (data/catalogue/routes.ts). Their packages are
 * shown on those pages by components/catalogue/MergedPackages.tsx. The AI search briefs (S001–S003) are
 * excluded: their bespoke pages carry the AI Search packages already.
 */
const D: [string, string, string] = ['Workflow Discovery', 'Operations Blueprint', 'System Blueprint'];
export const mergedTierNames: Record<string, [string, string, string]> = {
  S054: ['First workstream', 'Three workstreams', 'Six workstreams'],
  S055: ['1 story', '3 stories', '6 stories'],
  S056: ['1 dataset', '3 datasets', '6 datasets'],
  S057: ['1 integration flow', '3 flows', '6 flows'],
  S058: ['5 support hours', '12 support hours', '25 support hours'],
  'S059-1': ['2 hours, 5 people', '6 hours, 10 people', '12 hours, 20 people'],
  S061: ['First workstream', 'Three workstreams', 'Six workstreams'],
  S163: D,
  S164: D,
  S165: D,
  S166: D,
  S167: D,
  S168: D,
  'EXT-I09': D,
  'EXT-I11': D,
  'EXT-I12': D,
  'EXT-I17': D,
};
