/**
 * Creates or updates the ODOOVATIONS AI Concierge on ElevenLabs from the repo: knowledge base, client tools,
 * agent prompt, voice, security and overrides. The repo is the source of truth; rerun after content changes.
 *
 *   npx tsx scripts/concierge-setup.ts            # dry run: writes audit/concierge/knowledge-base.md, prints the plan
 *   npx tsx scripts/concierge-setup.ts --apply    # writes to ElevenLabs
 *   (if Node fetch fails on this network, prefix NODE_OPTIONS=--dns-result-order=ipv4first)
 *
 * Reads ELEVENLABS_API_KEY, and ELEVENLABS_AGENT_ID / ELEVENLABS_KB_ID / ELEVENLABS_VOICE_ID if set, from the
 * environment or .env.local. On first --apply it creates the agent and appends its id to .env.local.
 * CONCIERGE_EXTRA_HOSTS (comma-separated) adds hostnames, e.g. a Vercel preview host, to the agent allowlist.
 */
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { conciergeKnowledge, conciergeDirectory } from '../lib/concierge/knowledge';
import { CONCIERGE_PROMPT, CONCIERGE_TOOLS } from '../lib/concierge/prompt';
import { conciergeLanguages } from '../lib/concierge/languages';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]!]) process.env[m[1]!] = m[2]!.trim();
  }
}

const APPLY = process.argv.includes('--apply');
const KEY = process.env.ELEVENLABS_API_KEY;
const API = 'https://api.elevenlabs.io';
// "Sarah": a calm, reassuring premade female voice. Change ELEVENLABS_VOICE_ID after listening tests.
const VOICE = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
const HOSTS = ['odoovations.com', 'www.odoovations.com', 'localhost', ...(process.env.CONCIERGE_EXTRA_HOSTS ?? '').split(',').map((s) => s.trim()).filter(Boolean)];

async function call<T>(method: string, path: string, body?: unknown, attempt = 1): Promise<T> {
  let r: Response;
  try {
    r = await fetch(API + path, {
      method,
      headers: { 'xi-api-key': KEY!, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(90_000),
    });
  } catch (e) {
    // Network errors only (no response), so a retry cannot create a duplicate the server already accepted… except
    // on a timeout after the server received the request; the GET-before-create below limits that for tools.
    if (attempt < 4) {
      console.warn(`${method} ${path}: ${(e as Error).message}; retrying (${attempt})`);
      await new Promise((res) => setTimeout(res, 2000 * attempt));
      return call<T>(method, path, body, attempt + 1);
    }
    throw e;
  }
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${text.slice(0, 800)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

function remember(name: string, value: string) {
  const env = existsSync('.env.local') ? readFileSync('.env.local', 'utf8') : '';
  if (new RegExp(`^${name}=`, 'm').test(env)) writeFileSync('.env.local', env.replace(new RegExp(`^${name}=.*$`, 'm'), `${name}=${value}`));
  else appendFileSync('.env.local', `${env.endsWith('\n') || !env ? '' : '\n'}${name}=${value}\n`);
  process.env[name] = value;
}

async function main() {
  const kb = conciergeKnowledge();
  mkdirSync('audit/concierge', { recursive: true });
  writeFileSync('audit/concierge/knowledge-base.md', kb);
  console.log(`Knowledge base: ${kb.length.toLocaleString()} characters → audit/concierge/knowledge-base.md`);
  console.log(`Voice: ${VOICE}; allowlist: ${HOSTS.join(', ')}; languages: ${[...new Set(conciergeLanguages.map((l) => l.agentLanguage))].join(', ')}`);
  if (!APPLY) return console.log('Dry run. Add --apply to write to ElevenLabs.');
  if (!KEY) throw new Error('ELEVENLABS_API_KEY is not set.');

  // 1. Knowledge base: upload a fresh document; the old one is removed after the agent points at the new one.
  const doc = await call<{ id: string; name: string }>('POST', '/v1/convai/knowledge-base/text', {
    name: `ODOOVATIONS website ${new Date().toISOString().slice(0, 10)}`,
    text: kb,
  });
  console.log('Knowledge base document:', doc.id);
  const dir = await call<{ id: string; name: string }>('POST', '/v1/convai/knowledge-base/text', {
    name: `ODOOVATIONS site directory ${new Date().toISOString().slice(0, 10)}`,
    text: conciergeDirectory(),
  });
  console.log('Directory document (always in context):', dir.id);

  // 2. Client tools: update by name if they exist, otherwise create.
  const existing = await call<{ tools: { id: string; tool_config: { name: string } }[] }>('GET', '/v1/convai/tools');
  const toolIds: string[] = [];
  for (const t of CONCIERGE_TOOLS) {
    const found = existing.tools.find((x) => x.tool_config.name === t.name);
    const res = found
      ? await call<{ id: string }>('PATCH', `/v1/convai/tools/${found.id}`, { tool_config: t })
      : await call<{ id: string }>('POST', '/v1/convai/tools', { tool_config: t });
    toolIds.push(res.id);
    console.log(`Tool ${t.name}:`, res.id, found ? '(updated)' : '(created)');
  }

  // 3. Agent.
  const en = conciergeLanguages[0]!.t;
  const config = {
    name: 'ODOOVATIONS AI Concierge',
    conversation_config: {
      agent: {
        first_message: en.firstMessage,
        language: 'en',
        dynamic_variables: { dynamic_variable_placeholders: { current_page: '/', visitor_language: 'English (UK)' } },
        prompt: {
          prompt: CONCIERGE_PROMPT,
          llm: 'claude-haiku-5-5', // fast, multilingual and good at following the truth rules
          temperature: 0.3,
          tool_ids: toolIds,
          knowledge_base: [
            { type: 'text', id: doc.id, name: doc.name, usage_mode: 'auto' },
            { type: 'text', id: dir.id, name: dir.name, usage_mode: 'prompt' },
          ],
          rag: { enabled: true, embedding_model: 'multilingual_e5_large_instruct' },
        },
      },
      tts: { voice_id: VOICE },
      conversation: { max_duration_seconds: 900 },
    },
    platform_settings: {
      // Voice audio is not recorded. Transcripts are kept 30 days so the team can find and fix wrong answers,
      // then deleted. The privacy page says the same; change both together.
      privacy: { record_voice: false, retention_days: 30, delete_audio: true },
      auth: { enable_auth: true, allowlist: HOSTS.map((hostname) => ({ hostname })), require_origin_header: true },
      overrides: {
        conversation_config_override: {
          agent: { first_message: true, language: true },
          tts: { voice_id: true },
          conversation: { text_only: true },
        },
      },
    },
  };

  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (agentId) {
    await call('PATCH', `/v1/convai/agents/${agentId}`, config);
    console.log('Agent updated:', agentId);
  } else {
    const created = await call<{ agent_id: string }>('POST', '/v1/convai/agents/create', config);
    remember('ELEVENLABS_AGENT_ID', created.agent_id);
    console.log('Agent created:', created.agent_id, '(saved to .env.local)');
  }

  const old = (process.env.ELEVENLABS_KB_ID ?? '').split(',').filter(Boolean);
  remember('ELEVENLABS_KB_ID', `${doc.id},${dir.id}`);
  for (const id of old) {
    if (id === doc.id || id === dir.id) continue;
    try {
      await call('DELETE', `/v1/convai/knowledge-base/${id}`);
      console.log('Old knowledge base document removed:', id);
    } catch (e) {
      console.warn('Could not remove an old document (remove it in the dashboard):', id, (e as Error).message.slice(0, 200));
    }
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
