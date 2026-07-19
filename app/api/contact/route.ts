import { NextResponse } from 'next/server';
import { contactSchema, validateFileMeta } from '@/lib/validation';
import { processLead } from '@/lib/leadintel/pipeline';
import type { SessionData } from '@/lib/leadintel/session';

export const runtime = 'nodejs';

/* -------------------------------------------------------------------------
   Simple in-memory rate limiter (per-IP). For production behind multiple
   instances, replace with a shared store (e.g. Upstash Redis).
   ------------------------------------------------------------------------- */
const RATE_LIMIT = 5; // submissions
const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function getIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many submissions. Please try again shortly.' },
        { status: 429 },
      );
    }

    const form = await req.formData();

    const raw = {
      fullName: String(form.get('fullName') ?? ''),
      company: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      country: String(form.get('country') ?? ''),
      industry: String(form.get('industry') ?? ''),
      companySize: String(form.get('companySize') ?? ''),
      currentSystems: String(form.get('currentSystems') ?? ''),
      timeline: String(form.get('timeline') ?? ''),
      budget: String(form.get('budget') ?? ''),
      challenge: String(form.get('challenge') ?? ''),
      services: String(form.get('services') ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      preferredContact: String(form.get('preferredContact') ?? ''),
      consent: form.get('consent') === 'true',
      marketingConsent: String(form.get('marketingConsent') ?? ''),
      sessionData: String(form.get('sessionData') ?? ''),
      website: String(form.get('website') ?? ''),
    };

    // Honeypot: silently accept (do not tip off bots) but do nothing.
    if (raw.website && raw.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? 'Please check your details and try again.' },
        { status: 400 },
      );
    }

    // Validate optional file metadata (never trust the client).
    const file = form.get('file');
    let fileMeta: { name: string; size: number; type: string } | null = null;
    if (file && file instanceof File && file.size > 0) {
      const err = validateFileMeta(file.name, file.size, file.type);
      if (err) {
        return NextResponse.json({ ok: false, error: err }, { status: 400 });
      }
      fileMeta = { name: file.name, size: file.size, type: file.type };
      // NOTE: No storage strategy is configured. We intentionally DO NOT persist
      // uploaded files. Wire up secure storage (e.g. S3 with signed URLs) before
      // enabling file retention. See README + LAUNCH_CHECKLIST.md.
    }

    // Legacy notification email (unchanged behaviour).
    await deliver(parsed.data, fileMeta);

    // Lead-intelligence pipeline: attach anonymous session, score, route to a
    // sales queue, create/update the Odoo CRM lead, and run consent-aware email
    // automation. Any downstream failure is non-fatal — the enquiry is still
    // captured and the user still gets a success response.
    let session: SessionData | null = null;
    try {
      session = parsed.data.sessionData ? (JSON.parse(parsed.data.sessionData) as SessionData) : null;
    } catch {
      session = null;
    }
    const marketingConsent =
      parsed.data.marketingConsent === true || parsed.data.marketingConsent === 'true';

    try {
      await processLead(
        {
          fullName: parsed.data.fullName,
          company: parsed.data.company,
          email: parsed.data.email,
          phone: parsed.data.phone,
          country: parsed.data.country,
          industry: parsed.data.industry,
          companySize: parsed.data.companySize,
          currentSystems: parsed.data.currentSystems,
          timeline: parsed.data.timeline,
          budget: parsed.data.budget,
          challenge: parsed.data.challenge,
          services: parsed.data.services,
          preferredContact: parsed.data.preferredContact,
          contactPermission: parsed.data.consent, // asked us to contact them
          marketingConsent,
        },
        session,
      );
    } catch {
      /* pipeline failures must not break the user's success response */
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Never leak internal errors to the client.
    return NextResponse.json(
      { ok: false, error: 'We could not process your message. Please try again.' },
      { status: 500 },
    );
  }
}

type ParsedContact = ReturnType<typeof contactSchema.parse>;

/**
 * Delivery adapter.
 * - If RESEND_API_KEY is set, sends an email via Resend.
 * - Otherwise runs the DEV ADAPTER: validates + logs a redacted summary and
 *   returns success without sending. Sensitive contents are not logged in prod.
 */
async function deliver(
  data: ParsedContact,
  fileMeta: { name: string; size: number; type: string } | null,
): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    if (process.env.NODE_ENV !== 'production') {
      // Redacted summary only — no full message body or PII beyond what's needed to debug.
      console.info('[contact] DEV ADAPTER — submission received', {
        company: data.company,
        country: data.country,
        industry: data.industry,
        services: data.services,
        hasFile: Boolean(fileMeta),
      });
    }
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL ?? 'odoovations@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@odoovations.com';

  const lines = [
    `New workflow enquiry from ${data.fullName} (${data.company})`,
    '',
    `Email: ${data.email}`,
    `Phone/WhatsApp: ${data.phone}`,
    `Country: ${data.country}`,
    `Industry: ${data.industry}`,
    `Company size: ${data.companySize}`,
    `Current systems: ${data.currentSystems || '—'}`,
    `Timeline: ${data.timeline || '—'}`,
    `Budget: ${data.budget || '—'}`,
    `Preferred contact: ${data.preferredContact}`,
    `Services: ${data.services.join(', ')}`,
    '',
    'Challenge:',
    data.challenge,
    '',
    fileMeta ? `Attached file: ${fileMeta.name} (${fileMeta.type}, ${fileMeta.size} bytes)` : 'No file attached.',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `New Odoo enquiry — ${data.company}`,
      text: lines,
    }),
  });

  if (!res.ok) {
    throw new Error('Email delivery failed');
  }
}
