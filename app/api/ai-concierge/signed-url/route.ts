import { NextResponse } from 'next/server';
import { conciergeRoutes } from '@/lib/concierge/routes';

/**
 * Starts an ElevenLabs conversation without exposing the API key: the server asks ElevenLabs for a one-time
 * signed WebSocket URL and hands only that to the browser.
 *
 * Abuse controls: same-site origin check, a per-IP limit (in memory, so per server instance; the agent's own
 * domain allowlist and ElevenLabs usage limits are the backstop), and a short timeout to ElevenLabs.
 */
export const dynamic = 'force-dynamic';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    return false;
  }
  e.count += 1;
  return e.count > MAX_PER_WINDOW;
}

function sameSite(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    const o = new URL(origin).hostname;
    const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').split(':')[0];
    return o === host || /(^|\.)odoovations\.com$/.test(o) || o === 'localhost';
  } catch {
    return false;
  }
}

let routesCache: string[] | null = null;

export async function POST(req: Request) {
  if (!sameSite(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0]!.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const key = process.env.ELEVENLABS_API_KEY;
  const agent = process.env.ELEVENLABS_AGENT_ID;
  if (!key || !agent) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agent)}`, {
      headers: { 'xi-api-key': key },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) {
      console.error('[ai-concierge] signed url failed', r.status);
      return NextResponse.json({ error: 'upstream' }, { status: 502 });
    }
    const body = (await r.json()) as { signed_url?: string };
    if (!body.signed_url) return NextResponse.json({ error: 'upstream' }, { status: 502 });
    routesCache ??= conciergeRoutes();
    return NextResponse.json(
      { signedUrl: body.signed_url, routes: routesCache, voiceId: process.env.ELEVENLABS_VOICE_ID || undefined },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (e) {
    console.error('[ai-concierge] signed url error', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
