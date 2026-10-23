import type { CSSProperties, ReactNode } from 'react';
import type { VisualKind } from '@/data/service-explorer';

/**
 * Small line illustrations, one per kind of service. They hint at the shape of
 * a system (a ledger, a stock shelf, a chat) and are plainly decoration: no
 * numbers, no names, nothing that could be mistaken for a client's screen.
 *
 * Motion is CSS only and limited to transform, opacity and stroke-dashoffset.
 * It is paused by default (see `.mv` in globals.css) and runs only while the
 * panel is on screen or the card is hovered or focused, so off-screen cards
 * cost nothing. Reduced motion shows the resting drawing.
 */

const d = (i: number): CSSProperties => ({ ['--i' as string]: i }) as CSSProperties;

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 84"
      aria-hidden
      focusable="false"
      className="mv h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function MicroVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'modules':
      return (
        <Frame>
          {[0, 1, 2].flatMap((c) =>
            [0, 1].map((r) => (
              <rect key={`${c}${r}`} x={22 + c * 38} y={14 + r * 30} width="30" height="24" rx="5" className="mv-pulse" style={d(c * 2 + r)} />
            )),
          )}
          <path d="M52 26h8M52 56h8M90 26h8M90 56h8" opacity=".5" />
        </Frame>
      );
    case 'ledger':
      return (
        <Frame>
          <rect x="24" y="8" width="112" height="68" rx="6" opacity=".55" />
          {[0, 1, 2].map((i) => (
            <g key={i} className="mv-rise" style={d(i)}>
              <path d={`M36 ${24 + i * 14}h46`} />
              <path d={`M108 ${24 + i * 14}h16`} />
            </g>
          ))}
          <path d="M36 66h88" opacity=".6" />
          <path d="M104 66h20" className="mv-pulse" style={d(3)} strokeWidth="2.4" />
        </Frame>
      );
    case 'stock':
      return (
        <Frame>
          <path d="M20 74h120" opacity=".6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={28 + i * 22} y={26} width="14" height="48" rx="3" className="mv-grow" style={{ ...d(i), transformOrigin: `${35 + i * 22}px 74px` }} />
          ))}
          <path d="M22 26h116" strokeDasharray="3 5" opacity=".45" />
        </Frame>
      );
    case 'receipt':
      return (
        <Frame>
          <path d="M52 8h56v62l-7-5-7 5-7-5-7 5-7-5-7 5-7-5-7 5z" opacity=".8" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M62 ${22 + i * 10}h${i === 3 ? 18 : 36}`} className="mv-rise" style={d(i)} />
          ))}
        </Frame>
      );
    case 'route':
      return (
        <Frame>
          <path d="M22 60C48 60 40 24 80 24s32 36 58 36" opacity=".45" />
          <path d="M22 60C48 60 40 24 80 24s32 36 58 36" className="mv-flow" strokeDasharray="6 10" />
          <circle cx="22" cy="60" r="5" />
          <circle cx="80" cy="24" r="5" />
          <circle cx="138" cy="60" r="5" />
        </Frame>
      );
    case 'sync':
      return (
        <Frame>
          <rect x="14" y="22" width="40" height="40" rx="7" />
          <rect x="106" y="22" width="40" height="40" rx="7" />
          <path d="M60 34h40M60 50h40" opacity=".45" />
          <path d="M60 34h40" className="mv-flow" strokeDasharray="6 10" />
          <path d="M100 50H60" className="mv-flow" strokeDasharray="6 10" />
          <path d="M94 29l6 5-6 5M66 45l-6 5 6 5" />
        </Frame>
      );
    case 'apps':
      return (
        <Frame>
          {[0, 1, 2].flatMap((c) =>
            [0, 1, 2].map((r) => (
              <rect key={`${c}${r}`} x={48 + c * 22} y={10 + r * 22} width="16" height="16" rx="4" className="mv-pulse" style={d(c + r * 3)} />
            )),
          )}
        </Frame>
      );
    case 'blocks':
      return (
        <Frame>
          <rect x="44" y="52" width="72" height="18" rx="4" />
          <rect x="44" y="30" width="72" height="18" rx="4" opacity=".7" />
          <rect x="44" y="8" width="72" height="18" rx="4" className="mv-drop" />
          <path d="M122 61h12M122 39h12" opacity=".4" />
        </Frame>
      );
    case 'migrate':
      return (
        <Frame>
          <rect x="14" y="14" width="34" height="56" rx="5" opacity=".6" />
          <path d="M22 26h18M22 36h18M22 46h18" opacity=".5" />
          <rect x="112" y="14" width="34" height="56" rx="5" />
          <path d="M120 26h18M120 36h18M120 46h18" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="58" cy={28 + i * 14} r="2.6" fill="currentColor" stroke="none" className="mv-travel" style={d(i)} />
          ))}
        </Frame>
      );
    case 'support':
      return (
        <Frame>
          <path d="M80 8l32 11v22c0 16-13 28-32 35-19-7-32-19-32-35V19z" opacity=".7" />
          <path d="M66 42l10 10 20-22" className="mv-draw" pathLength={1} strokeDasharray={1} />
        </Frame>
      );
    case 'workflow':
      return (
        <Frame>
          <circle cx="26" cy="42" r="10" />
          <rect x="64" y="30" width="32" height="24" rx="6" />
          <circle cx="134" cy="42" r="10" />
          <path d="M36 42h28M96 42h28" opacity=".45" />
          <path d="M36 42h28M96 42h28" className="mv-flow" strokeDasharray="4 8" />
        </Frame>
      );
    case 'chat':
      return (
        <Frame>
          <path d="M20 14h70a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H42l-12 9v-9h-10a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z" transform="translate(-6 0)" opacity=".8" />
          <path d="M72 50h70a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8h-4v8l-12-8H72a8 8 0 0 1-8-8v-6a8 8 0 0 1 8-8z" transform="translate(-4 -4)" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={96 + i * 12} cy="64" r="2.4" fill="currentColor" stroke="none" className="mv-pulse" style={d(i)} />
          ))}
        </Frame>
      );
    case 'agent':
      return (
        <Frame>
          <rect x="52" y="22" width="56" height="42" rx="12" />
          <circle cx="68" cy="42" r="3.2" fill="currentColor" stroke="none" />
          <circle cx="92" cy="42" r="3.2" fill="currentColor" stroke="none" />
          <path d="M80 22V12M74 12h12" opacity=".7" />
          <circle cx="80" cy="43" r="30" className="mv-ring" opacity=".35" />
        </Frame>
      );
    case 'approval':
      return (
        <Frame>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={32 + i * 48} cy="42" r="12" opacity={i === 2 ? 0.55 : 1} />
              {i < 2 && <path d={`M${44 + i * 48} 42h24`} opacity=".45" />}
              <path d={`M${26 + i * 48} 42l4 4 8-9`} className="mv-draw" style={d(i)} pathLength={1} strokeDasharray={1} />
            </g>
          ))}
        </Frame>
      );
    case 'browser':
      return (
        <Frame>
          <rect x="18" y="8" width="124" height="68" rx="7" opacity=".7" />
          <path d="M18 24h124" opacity=".6" />
          <circle cx="28" cy="16" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="36" cy="16" r="1.8" fill="currentColor" stroke="none" />
          <rect x="28" y="32" width="48" height="12" rx="3" className="mv-rise" style={d(0)} />
          <rect x="28" y="50" width="30" height="16" rx="3" className="mv-rise" style={d(1)} />
          <rect x="64" y="50" width="30" height="16" rx="3" className="mv-rise" style={d(2)} />
          <rect x="100" y="32" width="32" height="34" rx="3" className="mv-rise" style={d(3)} />
        </Frame>
      );
    case 'cart':
      return (
        <Frame>
          <path d="M34 20h14l8 34h52l8-26H52" opacity=".85" />
          <circle cx="64" cy="64" r="4" />
          <circle cx="104" cy="64" r="4" />
          <rect x="70" y="6" width="16" height="14" rx="3" className="mv-fall" />
        </Frame>
      );
    case 'store':
      return (
        <Frame>
          <path d="M26 26l8-16h92l8 16z" />
          <path d="M26 26c0 6 6 8 10 8s10-2 10-8c0 6 6 8 10 8s10-2 10-8c0 6 6 8 10 8s10-2 10-8c0 6 6 8 10 8s10-2 10-8" opacity=".7" />
          <path d="M34 36v38h92V36" opacity=".7" />
          <rect x="46" y="48" width="20" height="26" rx="3" className="mv-pulse" style={d(0)} />
          <rect x="76" y="48" width="38" height="14" rx="3" className="mv-pulse" style={d(1)} />
        </Frame>
      );
    case 'editor':
      return (
        <Frame>
          <rect x="36" y="8" width="88" height="68" rx="6" opacity=".7" />
          <path d="M48 24h40M48 36h64M48 48h52" />
          <path d="M104 48v10" strokeWidth="2.2" className="mv-blink" />
        </Frame>
      );
    case 'growth':
      return (
        <Frame>
          <path d="M20 72h124M20 72V12" opacity=".55" />
          <path d="M26 62l26-14 20 8 28-26 32-16" className="mv-draw" pathLength={1} strokeDasharray={1} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={26 + i * 36} cy={[62, 48, 30, 14][i]} r="2.6" fill="currentColor" stroke="none" className="mv-pulse" style={d(i)} />
          ))}
        </Frame>
      );
    case 'film':
      return (
        <Frame>
          <rect x="14" y="16" width="132" height="52" rx="6" opacity=".7" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={22 + i * 24} y="26" width="18" height="32" rx="3" opacity=".55" />
          ))}
          <path d="M60 10v64" strokeWidth="2.2" className="mv-scrub" />
        </Frame>
      );
    case 'calendar':
      return (
        <Frame>
          <rect x="22" y="10" width="116" height="66" rx="7" opacity=".7" />
          <path d="M22 28h116" opacity=".6" />
          {[0, 1, 2, 3, 4, 5].flatMap((c) =>
            [0, 1].map((r) => (
              <rect key={`${c}${r}`} x={32 + c * 17} y={36 + r * 17} width="11" height="11" rx="2.5" className={c === 2 && r === 0 ? 'mv-pulse' : ''} style={d(0)} opacity={c === 2 && r === 0 ? 1 : 0.5} />
            )),
          )}
        </Frame>
      );
    default:
      return null;
  }
}
