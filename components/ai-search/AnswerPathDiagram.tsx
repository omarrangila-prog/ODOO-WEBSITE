import { LiveOnScreen } from '@/components/home/LiveOnScreen';

/**
 * How an AI search answer comes together, drawn as an idea and nothing more: a question goes in, the
 * system draws on sources, and the part a business can work on is the sources. No result, score or
 * example answer is shown. The dashes drift toward the middle bar only while the figure is on screen
 * and never under reduced motion (the site's .mv rules).
 */
const chips = [
  { x: 14, t: ['Your', 'website'] },
  { x: 114, t: ['Profiles &', 'listings'] },
  { x: 214, t: ['Reviews &', 'directories'] },
  { x: 314, t: ['Articles', '& press'] },
];

export function AnswerPathDiagram({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <LiveOnScreen className="mv mx-auto w-full max-w-[440px]">
        <svg viewBox="0 0 420 340" role="img" aria-label="A buyer asks a question, an AI search experience draws on sources such as your website, profiles and listings, reviews and directories, and articles, and writes an answer. The sources are the part a business can improve." className="h-auto w-full">
          <defs>
            <linearGradient id="aip-bar" x1="0" x2="1">
              <stop offset="0" stopColor="#8247f5" stopOpacity="0.28" />
              <stop offset="1" stopColor="#c4a8ff" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          <rect x="70" y="6" width="280" height="44" rx="22" fill="#0f0b1b" stroke="#beafe6" strokeOpacity="0.4" />
          <text x="210" y="33" textAnchor="middle" fill="#f7f6fa" fontSize="15" fontFamily="inherit">A buyer asks a question</text>

          <line x1="210" y1="52" x2="210" y2="86" stroke="#c4a8ff" strokeOpacity="0.7" strokeWidth="1.5" />
          <path d="M205 80 L210 87 L215 80" fill="none" stroke="#c4a8ff" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="14" y="90" width="392" height="64" rx="16" fill="url(#aip-bar)" stroke="#c4a8ff" strokeOpacity="0.5" />
          <text x="210" y="117" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="600" fontFamily="inherit">The AI search experience</text>
          <text x="210" y="139" textAnchor="middle" fill="#cfc6e6" fontSize="13" fontFamily="inherit">retrieves pages and sources, then writes an answer</text>

          {chips.map((c) => (
            <g key={c.t.join()}>
              <line x1={c.x + 46} y1="206" x2={c.x + 46} y2="156" stroke="#a77bff" strokeOpacity="0.45" strokeWidth="1.5" />
              <line className="mv-flow" x1={c.x + 46} y1="206" x2={c.x + 46} y2="156" stroke="#f1eaff" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 14" />
              <rect x={c.x} y="206" width="92" height="56" rx="14" fill="#0f0b1b" stroke="#beafe6" strokeOpacity="0.4" />
              <text x={c.x + 46} y="231" textAnchor="middle" fill="#f7f6fa" fontSize="12.5" fontFamily="inherit">{c.t[0]}</text>
              <text x={c.x + 46} y="248" textAnchor="middle" fill="#f7f6fa" fontSize="12.5" fontFamily="inherit">{c.t[1]}</text>
            </g>
          ))}

          <path d="M14 276 L14 284 L406 284 L406 276" fill="none" stroke="#c4a8ff" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
          <text x="210" y="312" textAnchor="middle" fill="#c4a8ff" fontSize="14" fontWeight="600" fontFamily="inherit">What a business can improve</text>
        </svg>
      </LiveOnScreen>
      <figcaption className="mt-3 text-center text-[13px] text-text-dark-muted">An illustration of the idea, not a real result.</figcaption>
    </figure>
  );
}
