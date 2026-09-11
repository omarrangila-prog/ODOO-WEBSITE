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
      colors: {
        midnight: 'var(--midnight)',
        graphite: 'var(--graphite)',
        surface: {
          dark: 'var(--surface-dark)',
          'dark-2': 'var(--surface-dark-2)',
        },
        ivory: {
          DEFAULT: 'var(--ivory)',
          soft: 'var(--ivory-soft)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
        },
        text: {
          dark: 'var(--text-dark)',
          'dark-muted': 'var(--text-dark-muted)',
        },
        violet: {
          DEFAULT: 'var(--violet)',
          bright: 'var(--violet-bright)',
        },
        magenta: 'var(--magenta)',
        green: 'var(--green)',
        cyan: 'var(--cyan)',
        amber: 'var(--amber)',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        cta: '0 12px 34px -14px rgba(124, 77, 255, 0.6), inset 0 1px 0 rgba(255,255,255,0.22)',
        float: '0 30px 80px -40px rgba(0,0,0,0.8)',
        'panel-light': '0 1px 2px rgba(17,18,22,0.04), 0 24px 60px -34px rgba(17,18,22,0.24)',
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
