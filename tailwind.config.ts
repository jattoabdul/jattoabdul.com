import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          surface: 'var(--bg-surface)',
          raised: 'var(--bg-raised)',
          sunken: 'var(--bg-sunken)',
          accent: 'var(--bg-accent)',
          code: 'var(--bg-code)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          2: 'var(--fg-2)',
          3: 'var(--fg-3)',
          'on-accent': 'var(--fg-on-accent)',
        },
        border: {
          DEFAULT: 'var(--border)',
          mid: 'var(--border-mid)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          h: 'var(--accent-h)',
          light: 'var(--accent-light)',
          mid: 'var(--accent-mid)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      maxWidth: {
        text: '680px',
        hero: '775px',
        wide: '960px',
        shell: '1120px',
        nav: '1024px',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 1.4s ease-in-out infinite',
        'fade-in': 'fadeIn 200ms ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
