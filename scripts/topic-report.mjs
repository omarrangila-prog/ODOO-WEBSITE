/**
 * Emits topic-priority.csv and search-intent-map.csv from the file-based topic
 * and solution/service data. Run: node scripts/topic-report.mjs
 * (Uses a tiny inline TS->JS read by importing the compiled data is overkill;
 * instead we parse the source with a lightweight require of the .ts via tsx is
 * unavailable, so we mirror the scoring formula here for the report only.)
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';

mkdirSync('reports', { recursive: true });
const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;

// Read topics.ts and extract the objects we need via regex (report-only).
const src = readFileSync('data/topics.ts', 'utf8');
const weights = { odooRelevance: 0.3, commercialIntent: 0.25, pakistanRelevance: 0.15, trendMomentum: 0.1, searchConsoleOpportunity: 0.1, sourceConfidence: 0.05, freshness: 0.05 };

const blocks = [...src.matchAll(/\{\s*id: '([^']+)',[\s\S]*?homepage: (true|false),\s*\}/g)];
const rows = [];
for (const b of blocks) {
  const chunk = b[0];
  const get = (k) => Number((chunk.match(new RegExp(k + ': (\\d+)')) || [])[1] || 0);
  const str = (k) => (chunk.match(new RegExp(k + ": '([^']*)'")) || [])[1] || '';
  const s = {
    odooRelevance: get('odooRelevance'),
    commercialIntent: get('commercialIntent'),
    pakistanRelevance: get('pakistanRelevance'),
    trendMomentum: get('trendMomentum'),
    searchConsoleOpportunity: get('searchConsoleOpportunity'),
    sourceConfidence: get('sourceConfidence'),
    freshness: get('freshness'),
  };
  const score = Math.round(Object.keys(weights).reduce((a, k) => a + s[k] * weights[k], 0));
  const band = score >= 80 ? 'High' : score >= 60 ? 'Resource' : score >= 40 ? 'Monitor' : 'Hold';
  rows.push({ id: b[1], status: str('status'), cluster: str('cluster'), target: str('targetHref'), score, band, homepage: b[2] });
}

writeFileSync('reports/topic-priority.csv',
  ['id,status,cluster,priorityScore,band,homepage,target',
    ...rows.map((r) => [r.id, r.status, r.cluster, r.score, r.band, r.homepage, esc(r.target)].join(','))].join('\n'));

// Search-intent map (from solutions + key services/locations)
const intentMap = [
  ['/', 'brand + overview', 'ODOOVATIONS / Odoo implementation company', 'brand'],
  ['/services/odoo-implementation-pakistan', 'commercial', 'Odoo implementation Pakistan', 'service'],
  ['/services/custom-odoo-development', 'commercial', 'Custom Odoo development', 'service'],
  ['/services/odoo-integration', 'commercial', 'Odoo integration services', 'service'],
  ['/services/odoo-migration', 'commercial', 'Odoo migration services', 'service'],
  ['/services/odoo-ai-dashboards', 'commercial', 'Odoo AI dashboards', 'service'],
  ['/services/odoo-business-automation', 'commercial', 'Odoo business automation', 'service'],
  ['/locations/odoo-services-karachi', 'local', 'Odoo services Karachi', 'location'],
  ['/locations/odoo-services-pakistan', 'national', 'Odoo services in Pakistan', 'location'],
  ['/solutions/fbr-digital-invoicing-pakistan', 'compliance intent', 'FBR digital invoicing Pakistan', 'solution'],
  ['/solutions/odoo-whatsapp-integration', 'integration intent', 'Odoo WhatsApp integration', 'solution'],
  ['/solutions/odoo-ai-agents', 'AI intent', 'Odoo AI agents', 'solution'],
];
writeFileSync('reports/search-intent-map.csv',
  ['url,intent,primaryKeyword,type', ...intentMap.map((r) => r.map(esc).join(','))].join('\n'));

console.log(`topic-priority.csv: ${rows.length} topics`);
rows.forEach((r) => console.log(`  ${r.id}: ${r.score} (${r.band}) status=${r.status} homepage=${r.homepage}`));
console.log(`search-intent-map.csv: ${intentMap.length} pages`);
