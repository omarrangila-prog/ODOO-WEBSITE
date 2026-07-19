import { NextResponse } from 'next/server';
import { unsubscribe } from '@/lib/leadintel/emailAutomation';

export const runtime = 'nodejs';

/**
 * Unsubscribe endpoint. Adds the email to the suppression list so no further
 * MARKETING email is sent. Transactional (enquiry) email is unaffected.
 * GET (link from an email) and POST both supported.
 */
function handle(email: string | null) {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email is required.' }, { status: 400 });
  }
  unsubscribe(email);
  return NextResponse.json({ ok: true, message: 'You have been unsubscribed from marketing emails.' });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  return handle(url.searchParams.get('email'));
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const email = form?.get('email');
  return handle(email ? String(email) : null);
}
