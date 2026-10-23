import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        /* Above this width the header can afford the full brand lockup
           (wordmark + tagline), roomier nav spacing and the phone number.
           Below it, those are progressively dropped so the primary CTA is
           never pushed off-screen. */
        hd: '1700px',
      },
      /* RGB-channel colours: `rgb(var(--x-rgb) / <alpha-value>)` is what lets
         Tailwind apply opacity (border-violet/40, bg-ink/10). With plain
         var(--x) hex values those modifiers generated no CSS at all. */
      colors: {
        midnight: 'rgb(var(--midnight-rgb) / <alpha-value>)',
        graphite: 'rgb(var(--graphite-rgb) / <alpha-value>)',
        surface: {
          dark: 'var(--surface-dark)',
          'dark-2': 'var(--surface-dark-2)',
        },
        ivory: {
          DEFAULT: 'rgb(var(--ivory-rgb) / <alpha-value>)',
          soft: 'rgb(var(--ivory-soft-rgb) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted-rgb) / <alpha-value>)',
        },
        text: {
          dark: 'rgb(var(--text-dark-rgb) / <alpha-value>)',
          'dark-muted': 'rgb(var(--text-dark-muted-rgb) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--violet-rgb) / <alpha-value>)',
          bright: 'rgb(var(--violet-bright-rgb) / <alpha-value>)',
        },
        ultraviolet: 'rgb(var(--ultraviolet-rgb) / <alpha-value>)',
        magenta: 'rgb(var(--magenta-rgb) / <alpha-value>)',
        green: 'rgb(var(--green-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--cyan-rgb) / <alpha-value>)',
        amber: 'rgb(var(--amber-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Times New Roman', 'serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: 'var(--content-max)',
        page: 'var(--page-max)',
        reading: '46rem',
      },
      borderColor: {
        line: 'var(--line-dark)',
        'line-strong': 'var(--line-dark-strong)',
        'line-light': 'var(--line-light)',
      },
      borderRadius: {
        editorial: '28px',
        panel: '20px',
        control: '14px',
      },
      boxShadow: {
        cta: '0 12px 34px -14px rgba(130, 71, 245, 0.6), inset 0 1px 0 rgba(255,255,255,0.22)',
        float: '0 30px 80px -40px rgba(0,0,0,0.8)',
        'panel-light': '0 1px 0 rgba(255,255,255,0.03) inset, 0 24px 60px -34px rgba(0,0,0,0.9), 0 0 0 1px rgba(190,175,230,0.05)',
        lift: '0 20px 50px -28px rgba(0,0,0,0.6)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        /* Two identical rows sit side by side; shifting by half the track
           width lands the second row exactly where the first started. */
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'float-y': 'floatY 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
