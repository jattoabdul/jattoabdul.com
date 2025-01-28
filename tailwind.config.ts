import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  safelist: ['dark'],
  theme: {
    extend: {
      colors: {
        // Base system colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Gem colors
        ruby: {
          '50': 'hsl(var(--ruby-50))',
          '100': 'hsl(var(--ruby-100))',
          '200': 'hsl(var(--ruby-200))',
          '300': 'hsl(var(--ruby-300))',
          '400': 'hsl(var(--ruby-400))',
          '500': 'hsl(var(--ruby-500))',
          '600': 'hsl(var(--ruby-600))',
          '700': 'hsl(var(--ruby-700))',
          '800': 'hsl(var(--ruby-800))',
          '900': 'hsl(var(--ruby-900))',
          '950': 'hsl(var(--ruby-950))',
          DEFAULT: 'hsl(var(--ruby))',
          foreground: 'hsl(var(--ruby-foreground))',
        },
        sapphire: {
          '50': 'hsl(var(--sapphire-50))',
          '100': 'hsl(var(--sapphire-100))',
          '200': 'hsl(var(--sapphire-200))',
          '300': 'hsl(var(--sapphire-300))',
          '400': 'hsl(var(--sapphire-400))',
          '500': 'hsl(var(--sapphire-500))',
          '600': 'hsl(var(--sapphire-600))',
          '700': 'hsl(var(--sapphire-700))',
          '800': 'hsl(var(--sapphire-800))',
          '900': 'hsl(var(--sapphire-900))',
          '950': 'hsl(var(--sapphire-950))',
          DEFAULT: 'hsl(var(--sapphire))',
          foreground: 'hsl(var(--sapphire-foreground))',
        },
        jade: {
          '50': 'hsl(var(--jade-50))',
          '100': 'hsl(var(--jade-100))',
          '200': 'hsl(var(--jade-200))',
          '300': 'hsl(var(--jade-300))',
          '400': 'hsl(var(--jade-400))',
          '500': 'hsl(var(--jade-500))',
          '600': 'hsl(var(--jade-600))',
          '700': 'hsl(var(--jade-700))',
          '800': 'hsl(var(--jade-800))',
          '900': 'hsl(var(--jade-900))',
          '950': 'hsl(var(--jade-950))',
          DEFAULT: 'hsl(var(--jade))',
          foreground: 'hsl(var(--jade-foreground))',
        },

        // UI Component colors
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // Utility colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
