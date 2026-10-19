/**
 * Checks data/team.ts against the figures the owner reported. If a number is
 * changed on purpose (someone joins or leaves), change it here too: this file
 * is the written record of what was reported, so an accidental edit to the
 * team data fails loudly instead of quietly publishing a wrong count.
 *
 * Run: npm run team:check
 */
import {
  departments,
  getRole,
  getDepartment,
  departmentRolePositions,
  reportedRolePositions,
  internPositions,
  verifiedUniqueEmployees,
  profiles,
} from '../data/team';

const reported: [string, string, number][] = [
  ['executive-leadership', 'ceo', 1], ['executive-leadership', 'cto', 1], ['executive-leadership', 'cfo', 1],
  ['software-engineering', 'senior-software-dev', 8], ['software-engineering', 'junior-software-dev', 10],
  ['software-engineering', 'web-software-dev', 10], ['software-engineering', 'software-intern', 7],
  ['odoo-engineering', 'senior-odoo-dev', 5], ['odoo-engineering', 'odoo-dev', 8],
  ['ai-data', 'ai-specialist', 5], ['ai-data', 'ai-intern', 5], ['ai-data', 'data-scientist', 1],
  ['creative-production', 'video-editor', 2], ['creative-production', 'motion-specialist', 4], ['creative-production', 'graphic-designer', 2],
  ['quality-assurance', 'qa-tester', 2],
  ['infrastructure', 'server-manager', 1], ['infrastructure', 'server-ops', 1],
  ['business-operations', 'hr-coordination', 1], ['business-operations', 'workflow-verification', 1],
  ['business-operations', 'accounting-domain', 1], ['business-operations', 'inventory-domain', 1], ['business-operations', 'senior-supervisor', 1],
  ['sales-business-development', 'sales-executive', 2],
  ['reception-front-desk', 'receptionist', 2],
];
const mustBeUnconfirmed = ['client-communication-staff', 'freelance-network'];

const failures: string[] = [];
const expect = (ok: boolean, msg: string) => { if (!ok) failures.push(msg); };

for (const [d, r, n] of reported) {
  const got = getRole(d, r).count;
  expect(got === n, `${d}/${r}: reported ${n}, data says ${got}`);
}
for (const id of mustBeUnconfirmed) {
  const r = departments.flatMap((d) => d.roles).find((x) => x.id === id);
  expect(r?.count === null, `${id}: no number was supplied, so its count must stay null (found ${r?.count})`);
}

expect(departments.length === 12, `expected 12 departments, found ${departments.length}`);
expect(departmentRolePositions(getDepartment('odoo-engineering')) === 13, 'Odoo engineering must total 13 role positions');
expect(internPositions() === 12, `expected 12 intern positions (7 + 5), found ${internPositions()}`);
expect(reportedRolePositions() === 83, `expected 83 reported role positions (79 + 2 sales + 2 reception), found ${reportedRolePositions()}`);

// Honesty guards.
expect(verifiedUniqueEmployees === null || Number.isInteger(verifiedUniqueEmployees), 'verifiedUniqueEmployees must be null or a whole number');
const text = JSON.stringify(departments);
for (const banned of [/official odoo partner(?!\b.{0,40}(not|no|does not))/i, /gold partner/i, /24\/7/, /certified partner/i]) {
  // Mentions are allowed only inside a denial; the caveat strings contain them as denials.
  const hits = text.match(new RegExp(banned.source, 'gi')) ?? [];
  for (const h of hits) {
    const i = text.toLowerCase().indexOf(h.toLowerCase());
    const around = text.slice(Math.max(0, i - 80), i + h.length + 80).toLowerCase();
    expect(/\b(not|no|nor|does not|do not|without)\b/.test(around), `possible unsupported claim near: …${around}…`);
  }
}
for (const p of profiles.filter((x) => x.approved)) {
  expect(Boolean(p.name.trim()), 'approved profile without a name');
  expect(Boolean(getRole(p.departmentId, p.roleId)), `profile ${p.name} points at an unknown role`);
}

console.log(`${reported.length} reported role rows checked, ${departments.length} departments, ${reportedRolePositions()} reported role positions.`);
if (failures.length) {
  console.error(`\nFAILED (${failures.length}):`);
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log('team data OK');
