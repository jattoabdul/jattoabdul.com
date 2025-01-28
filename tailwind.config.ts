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
          DEFAULT: 'hsl(var(--ruby))',
          light: 'hsl(var(--ruby-light))',
          dark: 'hsl(var(--ruby-dark))',
          foreground: 'hsl(var(--ruby-foreground))',
        },
        sapphire: {
          DEFAULT: 'hsl(var(--sapphire))',
          light: 'hsl(var(--sapphire-light))',
          dark: 'hsl(var(--sapphire-dark))',
          foreground: 'hsl(var(--sapphire-foreground))',
        },
        emerald: {
          DEFAULT: 'hsl(var(--emerald))',
          light: 'hsl(var(--emerald-light))',
          dark: 'hsl(var(--emerald-dark))',
          foreground: 'hsl(var(--emerald-foreground))',
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
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // Utility colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Chart colors
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
