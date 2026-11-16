'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Minus, PhoneOff, Send, Volume2, VolumeX, X, MessageCircle } from 'lucide-react';
import { ConciergeAvatar, type AvatarState } from './ConciergeAvatar';
import { TalkingPortrait } from './TalkingPortrait';
import { enabledLanguages, type ConciergeLanguage } from '@/lib/concierge/languages';
import { safeInternalPath, safeTopic } from '@/lib/concierge/guard';
import { company } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';

type Item = { id: number; role: 'user' | 'agent' | 'system'; text: string; link?: { href: string; label: string; external?: boolean } };

interface Props {
  open: boolean;
  lang: ConciergeLanguage;
  onLang: (l: ConciergeLanguage) => void;
  onMinimise: () => void;
  onClose: () => void;
}

export function ConciergePanel(props: Props) {
  return (
    <ConversationProvider>
      <Panel {...props} />
    </ConversationProvider>
  );
}

const ERR: Record<string, string> = {
  not_configured: 'The AI concierge is not switched on for this site yet. You can still reach the team through the contact page.',
  rate_limited: 'Too many conversations were started from this connection. Please try again in a few minutes.',
  forbidden: 'This conversation could not be started from this page.',
  upstream: 'The voice service is not responding right now. Please try again, or contact the team directly.',
  mic: 'Microphone access was blocked, so voice is off. You can type instead, or allow the microphone in your browser settings.',
  generic: 'Something went wrong with the conversation. Please try again, or contact the team directly.',
};

let nextId = 1;

function Panel({ open, lang, onLang, onMinimise, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');
  const [speakerOff, setSpeakerOff] = useState(false);
  const [mode, setMode] = useState<'voice' | 'text' | null>(null);
  const [starting, setStarting] = useState(false);
  const [teleport, setTeleport] = useState<string | null>(null);
  const [avatarOverride, setAvatarOverride] = useState<AvatarState | null>('greeting');
  const routesRef = useRef<Set<string>>(new Set());
  const pendingRef = useRef<string | null>(null);
  const ampRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef(0); // live voice level 0–1, read by the talking portrait
  const waveRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const langRef = useRef(lang);
  const t = lang.t;

  const push = useCallback((item: Omit<Item, 'id'>) => setItems((xs) => [...xs, { ...item, id: nextId++ }]), []);

  const conversation = useConversation({
    onConnect: () => {
      track('concierge_connected', { language: langRef.current.id });
      if (pendingRef.current) {
        const p = pendingRef.current;
        pendingRef.current = null;
        window.setTimeout(() => conversationRef.current?.sendUserMessage(p), 150);
      }
    },
    onDisconnect: () => {
      setMode(null);
      setAvatarOverride('goodbye');
      window.setTimeout(() => setAvatarOverride(null), 1500);
    },
    onMessage: ({ message, role }) => {
      const clean = String(message ?? '').trim();
      if (!clean || /^[.…\s]+$/.test(clean)) return;
      push({ role: role === 'user' ? 'user' : 'agent', text: clean });
    },
    onError: (message) => {
      console.warn('[concierge]', message);
      track('concierge_error', { kind: 'session' });
      push({ role: 'system', text: /permission|notallowed|microphone/i.test(String(message)) ? ERR.mic! : ERR.generic! });
    },
  });
  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;
  const { status, isSpeaking } = conversation;
  const connected = status === 'connected';

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  // Keep the transcript scrolled to the newest line.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [items]);

  // Focus into the panel when it opens; Escape minimises.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && panelRef.current?.contains(document.activeElement)) onMinimise();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onMinimise]);

  useEffect(() => {
    const id = window.setTimeout(() => setAvatarOverride((s) => (s === 'greeting' ? null : s)), 1700);
    return () => window.clearTimeout(id);
  }, []);

  // Tell the agent which page the visitor is on as they browse (no reply is triggered).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (connected && pathname !== lastPath.current) conversationRef.current.sendContextualUpdate(`The visitor is now on the page ${pathname}.`);
    lastPath.current = pathname;
  }, [pathname, connected]);

  // Drive the avatar's sway and the waveform from the agent's voice level, only while it speaks.
  useEffect(() => {
    if (!connected || mode !== 'voice') return;
    let raf = 0;
    const amp = ampRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loop = () => {
      const c = conversationRef.current;
      const f = isSpeaking ? c.getOutputByteFrequencyData() : null;
      let level = 0;
      if (f && f.length) {
        // Energy in the speech band drives the mouth; syllables rise and fall with it.
        let sum = 0;
        const n = Math.max(1, Math.floor(f.length * 0.6));
        for (let i = 0; i < n; i++) sum += f[i]!;
        level = Math.min(1, Math.max(0, (sum / n / 255 - 0.06) * 3.2));
      }
      levelRef.current = level;
      if (!reduce) amp?.style.setProperty('--cg-amp', (level * 0.6).toFixed(3));
      const bars = waveRef.current?.children;
      if (bars) {
        for (let i = 0; i < bars.length; i++) {
          const v = f && f.length ? f[Math.floor((i + 1) * (f.length / (bars.length + 2)))]! / 255 : 0;
          (bars[i] as HTMLElement).style.setProperty('--h', v.toFixed(2));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      amp?.style.setProperty('--cg-amp', '0');
      levelRef.current = 0;
    };
  }, [connected, isSpeaking, mode]);

  const clientTools = useMemo(
    () => ({
      navigate_to_page: ({ path }: { path?: unknown }) => {
        const safe = safeInternalPath(path, routesRef.current);
        if (!safe) return 'That page is not on this website. Suggest a page from the knowledge base instead.';
        track('concierge_link_clicked', { path: safe });
        setTeleport(safe);
        window.setTimeout(() => setTeleport(null), 1800);
        push({ role: 'system', text: `→ ${safe}`, link: { href: safe, label: 'Open again' } });
        router.push(safe);
        return `Opened ${safe}. The conversation continues on the new page.`;
      },
      open_contact_form: ({ topic }: { topic?: unknown }) => {
        const tpc = safeTopic(topic);
        track('concierge_contact_opened', { page: pathname });
        router.push(`/contact${tpc ? `?interest=${encodeURIComponent(tpc)}` : ''}#form`);
        push({ role: 'system', text: 'The enquiry form is open. Nothing is sent until you press its send button.' });
        return 'The contact form is open with the topic filled in. The visitor fills in and sends it themselves.';
      },
      show_whatsapp: () => {
        track('concierge_whatsapp_shown', {});
        push({ role: 'system', text: 'Message the team on WhatsApp:', link: { href: whatsappLink(company.whatsapp, company.whatsappMessage), label: 'Open WhatsApp', external: true } });
        return 'A WhatsApp button is now shown in the chat.';
      },
    }),
    [router, pathname, push],
  );

  const start = useCallback(
    async (kind: 'voice' | 'text', firstText?: string) => {
      if (starting) return;
      setStarting(true);
      if (firstText) pendingRef.current = firstText;
      try {
        const r = await fetch('/api/ai-concierge/signed-url', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
        const body = (await r.json().catch(() => ({}))) as { signedUrl?: string; routes?: string[]; voiceId?: string; error?: string };
        if (!r.ok || !body.signedUrl) {
          track('concierge_error', { kind: body.error ?? 'http' });
          push({ role: 'system', text: ERR[body.error ?? 'generic'] ?? ERR.generic!, link: { href: '/contact', label: 'Contact page' } });
          pendingRef.current = null;
          return;
        }
        routesRef.current = new Set(body.routes ?? []);
        track(kind === 'voice' ? 'concierge_voice_started' : 'concierge_text_started', { language: lang.id });
        setMode(kind);
        conversationRef.current.startSession({
          signedUrl: body.signedUrl,
          connectionType: 'websocket',
          stripAudioTags: true,
          textOnly: kind === 'text',
          overrides: {
            agent: { language: lang.agentLanguage, firstMessage: t.firstMessage },
            ...(body.voiceId ? { tts: { voiceId: body.voiceId } } : {}),
            conversation: { textOnly: kind === 'text' },
          },
          dynamicVariables: { current_page: pathname, visitor_language: lang.label },
          clientTools,
        });
      } catch {
        track('concierge_error', { kind: 'network' });
        push({ role: 'system', text: ERR.upstream! });
        pendingRef.current = null;
      } finally {
        setStarting(false);
      }
    },
    [starting, push, lang, t.firstMessage, pathname, clientTools],
  );

  const end = useCallback(() => {
    conversationRef.current.endSession();
    pendingRef.current = null;
  }, []);

  // Close ends any live session and releases the microphone.
  const close = useCallback(() => {
    if (status !== 'disconnected') end();
    onClose();
  }, [status, end, onClose]);

  useEffect(() => () => conversationRef.current.endSession(), []);

  const send = useCallback(
    (msg: string) => {
      const m = msg.trim().slice(0, 600);
      if (!m) return;
      setText('');
      if (connected) {
        push({ role: 'user', text: m });
        conversationRef.current.sendUserMessage(m);
      } else {
        push({ role: 'user', text: m });
        void start(mode === 'voice' ? 'voice' : 'text', m);
      }
    },
    [connected, push, start, mode],
  );

  // A voice session transcribes the visitor's speech itself; typed messages are echoed locally above, so drop the
  // SDK's echo of typed text to avoid showing it twice.
  useEffect(() => {
    setItems((xs) => xs.filter((x, i) => !(x.role === 'user' && i > 0 && xs[i - 1]!.role === 'user' && xs[i - 1]!.text === x.text)));
  }, [items.length]);

  const toggleSpeaker = () => {
    const off = !speakerOff;
    setSpeakerOff(off);
    conversationRef.current.setVolume({ volume: off ? 0 : 1 });
  };

  const changeLang = (id: string) => {
    const l = enabledLanguages().find((x) => x.id === id);
    if (!l || l.id === lang.id) return;
    onLang(l);
    if (status !== 'disconnected') {
      end();
      push({ role: 'system', text: `${l.label}: ${l.t.startVoice} / ${l.t.send}` });
    }
  };

  const avatarState: AvatarState =
    avatarOverride ?? (status === 'connecting' || starting ? 'thinking' : connected ? (isSpeaking ? 'speaking' : 'listening') : 'idle');
  const statusText = status === 'connecting' || starting ? t.connecting : connected && mode === 'voice' ? (isSpeaking ? t.speaking : t.listening) : '';

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label={t.heading}
      hidden={!open}
      lang={lang.htmlLang}
      dir={lang.dir}
      className={`cg-panel-in fixed inset-x-2 bottom-2 z-[var(--z-overlay)] flex max-h-[min(88dvh,820px)] flex-col overflow-hidden rounded-[22px] border border-line-strong shadow-float sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[min(420px,calc(100vw-2.5rem))] ${open ? '' : 'hidden'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'rgba(12, 10, 20, 0.98)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-line-strong px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[14px] font-semibold leading-tight text-text-dark">{t.heading}</p>
          <p className="mt-0.5 text-[11.5px] leading-tight text-text-dark-muted">{t.aiNote}</p>
        </div>
        <label className="sr-only" htmlFor="cg-lang">Language</label>
        <select
          id="cg-lang"
          value={lang.id}
          onChange={(e) => changeLang(e.target.value)}
          className="h-9 max-w-[6.75rem] rounded-lg border border-line-strong bg-white/[0.04] px-2 text-[13px] text-text-dark"
          dir="ltr"
        >
          {enabledLanguages().map((l) => (
            <option key={l.id} value={l.id} className="bg-[#140f20]">
              {l.label}
            </option>
          ))}
        </select>
        <button type="button" onClick={onMinimise} aria-label="Minimise" className="grid h-9 w-9 place-items-center rounded-lg text-text-dark-muted hover:bg-white/10 hover:text-text-dark">
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <button type="button" onClick={close} aria-label="Close and end conversation" className="grid h-9 w-9 place-items-center rounded-lg text-text-dark-muted hover:bg-white/10 hover:text-text-dark">
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Stage: the host, full size */}
      <div className={`cg-ring-live cg-state-${avatarState} relative h-[clamp(190px,32dvh,330px)] shrink-0 overflow-hidden border-b border-line-strong bg-[radial-gradient(90%_75%_at_50%_100%,#3d2680,#1a1233_55%,#0c0a14)] transition-shadow`}>
        <div ref={ampRef} className={`cg-state-${avatarState} absolute inset-x-0 bottom-0 top-3`}>
          <div className="cg-portrait h-full w-full">
            <TalkingPortrait levelRef={levelRef} speaking={connected && mode === 'voice' && isSpeaking} className="h-full w-full object-contain object-bottom" />
          </div>
        </div>
        {teleport && (
          <div className="cg-bubble-in absolute inset-x-0 top-12 z-10 mx-auto w-fit max-w-[90%] rounded-full border border-violet/50 bg-[rgb(12_10_20/0.88)] px-3.5 py-1.5 text-[12.5px] font-semibold text-text-dark shadow-float" role="status">
            ✦ {teleport}
          </div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line-strong bg-[rgb(12_10_20/0.75)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-bright">
          <span className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-green' : 'bg-text-dark-muted'}`} aria-hidden />
          AI
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 bg-[linear-gradient(to_top,rgb(12_10_20/0.92),transparent)] px-4 pb-3 pt-10">
          <p className="min-h-[1.25rem] text-[13px] font-medium text-violet-bright" aria-live="polite">
            {statusText}
            {(status === 'connecting' || starting) && (
              <span className="cg-dots ml-1 align-middle" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            )}
          </p>
          <div ref={waveRef} className={`cg-wave ${connected && mode === 'voice' ? '' : 'opacity-0'}`} aria-hidden>
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Voice controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-line-strong px-4 py-2.5">
        {connected && mode === 'voice' ? (
          <button type="button" onClick={end} className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#ff8a8f]/50 px-4 text-[13px] font-semibold text-[#ffb3b6] hover:bg-[#ff8a8f]/10">
            <PhoneOff className="h-4 w-4" aria-hidden /> {t.endVoice}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (connected) end();
              void start('voice');
            }}
            disabled={starting || status === 'connecting'}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,#6a3df0,#8247f5)] px-5 text-[14px] font-semibold text-white disabled:opacity-60"
          >
            <Mic className="h-4 w-4" aria-hidden /> {t.startVoice}
          </button>
        )}
        {connected && mode === 'voice' && (
          <button
            type="button"
            onClick={() => conversation.setMuted(!conversation.isMuted)}
            aria-pressed={conversation.isMuted}
            aria-label={conversation.isMuted ? 'Unmute microphone' : 'Mute microphone'}
            className="grid h-[42px] w-[42px] place-items-center rounded-full border border-line-strong text-text-dark hover:bg-white/10"
          >
            {conversation.isMuted ? <MicOff className="h-4 w-4" aria-hidden /> : <Mic className="h-4 w-4" aria-hidden />}
          </button>
        )}
        {connected && mode === 'voice' && (
          <button
            type="button"
            onClick={toggleSpeaker}
            aria-pressed={speakerOff}
            aria-label={speakerOff ? 'Turn sound on' : 'Turn sound off'}
            className="grid h-[42px] w-[42px] place-items-center rounded-full border border-line-strong text-text-dark hover:bg-white/10"
          >
            {speakerOff ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          </button>
        )}
      </div>

      {/* Transcript */}
      <div ref={listRef} className="min-h-[96px] flex-1 space-y-2.5 overflow-y-auto px-4 py-3" aria-live="polite" aria-label="Conversation" role="log" tabIndex={0}>
        {items.length === 0 && (
          <div>
            <p className="text-[14px] leading-relaxed text-text-dark">{t.firstMessage}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.suggestions.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 text-start text-[13px] text-text-dark hover:border-violet/60 hover:bg-white/[0.07]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {items.map((m) => (
          <Bubble key={m.id} item={m} />
        ))}
        {connected && mode === 'text' && items.length > 0 && items[items.length - 1]!.role === 'user' && (
          <p className="text-[13px] text-text-dark-muted">
            {t.thinking}
          </p>
        )}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-line-strong px-3 py-2.5"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          send(text);
        }}
      >
        <label htmlFor="cg-input" className="sr-only">
          {t.typePlaceholder}
        </label>
        <input
          id="cg-input"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.typePlaceholder}
          maxLength={600}
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-xl border border-line-strong bg-white/[0.04] px-3 text-[15px] text-text-dark placeholder:text-text-dark-muted focus:border-violet/70 focus:outline-none"
        />
        <button type="submit" aria-label={t.send} disabled={!text.trim() || starting} className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(100deg,#6a3df0,#8247f5)] text-white disabled:opacity-50">
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </form>
      <p className="px-4 pb-3 text-[11.5px] leading-snug text-text-dark-muted">
        {t.privacy}{' '}
        <Link href="/privacy#ai-concierge" className="text-violet-bright underline underline-offset-2">
          Privacy
        </Link>
      </p>
    </div>
  );
}

/** Agent text may contain markdown links or site paths; only links to this site become clickable. */
function Bubble({ item }: { item: Item }) {
  const mine = item.role === 'user';
  const sys = item.role === 'system';
  const parts = useMemo(() => linkify(item.text), [item.text]);
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed ${
          mine ? 'rounded-br-md bg-[#2a1f4d] text-text-dark' : sys ? 'border border-line-strong bg-white/[0.03] text-text-dark-muted' : 'rounded-bl-md bg-white/[0.06] text-text-dark'
        }`}
      >
        {parts.map((p, i) =>
          typeof p === 'string' ? (
            <span key={i}>{p}</span>
          ) : (
            <Link key={i} href={p.href} className="font-medium text-violet-bright underline underline-offset-2" onClick={() => track('concierge_link_clicked', { path: p.href })}>
              {p.label}
            </Link>
          ),
        )}
        {item.link && (
          <a
            href={item.link.href}
            {...(item.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="mt-2 flex min-h-[40px] w-fit items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-text-dark hover:bg-white/10"
          >
            {item.link.external && <MessageCircle className="h-4 w-4 text-green" aria-hidden />}
            {item.link.label}
          </a>
        )}
      </div>
    </div>
  );
}

const LINK = /\[([^\]]{1,80})\]\(((?:https?:\/\/(?:www\.)?odoovations\.com)?\/[a-z0-9\-/#?=&%]*)\)|(?:https?:\/\/(?:www\.)?odoovations\.com)(\/[a-z0-9\-/]*)/gi;

function linkify(text: string): (string | { href: string; label: string })[] {
  const out: (string | { href: string; label: string })[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const raw = m[2] ?? m[3] ?? '/';
    const href = raw.replace(/^https?:\/\/(?:www\.)?odoovations\.com/i, '') || '/';
    out.push({ href, label: m[1] ?? href });
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
