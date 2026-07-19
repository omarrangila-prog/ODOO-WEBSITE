import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Secured admin data endpoint. Requires a Bearer token that matches ADMIN_TOKEN.
 * Returns non-PII operational summaries only (never raw lead PII in this demo
 * endpoint). Replace the in-memory summary with a real datastore query in prod.
 */
function authorised(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false; // no token configured → locked by default
  const header = req.headers.get('authorization') ?? '';
  const provided = header.replace(/^Bearer\s+/i, '');
  // constant-time-ish comparison
  if (provided.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= provided.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}

export async function GET(req: Request) {
  if (!authorised(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  // In production this reads from your datastore. Here we return the shape only.
  return NextResponse.json({
    ok: true,
    summary: {
      note: 'Operational summary only — no raw PII exposed here.',
      queues: ['FBR & Compliance', 'Custom Development', 'AI & Automation', 'Integration & CRM', 'Implementation'],
      scoreBands: ['hot', 'warm', 'cool'],
      retention: { anonymousDataDays: 180, consentReAskDays: 180 },
    },
  });
}
