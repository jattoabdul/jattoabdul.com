import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  safelist: ['dark'],
  theme: {
    extend: {
      colors: {
        // Base system colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand colors
        cinnabar: {
          '50': 'hsl(var(--cinnabar-50))',
          '100': 'hsl(var(--cinnabar-100))',
          '200': 'hsl(var(--cinnabar-200))',
          '300': 'hsl(var(--cinnabar-300))',
          '400': 'hsl(var(--cinnabar-400))',
          '500': 'hsl(var(--cinnabar-500))',
          '600': 'hsl(var(--cinnabar-600))',
          '700': 'hsl(var(--cinnabar-700))',
          '800': 'hsl(var(--cinnabar-800))',
          '900': 'hsl(var(--cinnabar-900))',
          '950': 'hsl(var(--cinnabar-950))',
          DEFAULT: 'hsl(var(--cinnabar))',
          foreground: 'hsl(var(--cinnabar-foreground))',
        },
        wheat: {
          '50': 'hsl(var(--wheat-50))',
          '100': 'hsl(var(--wheat-100))',
          '200': 'hsl(var(--wheat-200))',
          '300': 'hsl(var(--wheat-300))',
          '400': 'hsl(var(--wheat-400))',
          '500': 'hsl(var(--wheat-500))',
          '600': 'hsl(var(--wheat-600))',
          '700': 'hsl(var(--wheat-700))',
          '800': 'hsl(var(--wheat-800))',
          '900': 'hsl(var(--wheat-900))',
          '950': 'hsl(var(--wheat-950))',
          DEFAULT: 'hsl(var(--wheat))',
          foreground: 'hsl(var(--wheat-foreground))',
        },
        smoky: {
          DEFAULT: 'hsl(var(--smoky-primary))',
          light: 'hsl(var(--smoky-light))',
          dark: 'hsl(var(--smoky-dark))',
          faded: 'hsl(var(--smoky-faded))',
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

        // Chart colors
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },

        // Utility colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        'avant-garde': ['var(--font-avant-garde)', 'system-ui', 'sans-serif'],
        'nunito-sans': ['var(--font-nunito-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'navbar-height': 'var(--navbar-height)',
        'footer-height': 'var(--footer-height)',
        'sidebar-width': 'var(--sidebar-width)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        navbar: 'var(--navbar-height)',
        footer: 'var(--footer-height)',
      },
      width: {
        sidebar: 'var(--sidebar-width)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionDuration: {
        slow: '700ms',
        medium: '300ms',
        fast: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
