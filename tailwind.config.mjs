import typography from '@tailwindcss/typography'
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '86rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
      },
      colors: {
        softBlack: 'var(--softBlack)',
        darkGray: 'var(--darkGray)',
        lightGray: 'var(--lightGray)',
        brandBlue: 'var(--brandBlue)',
        colorText: 'var(--colorText)',
        blue: {
          1: 'var(--blue01)',
          2: 'var(--blue02)',
          3: 'var(--blue03)',
        },
        orange: {
          1: 'var(--orange01)',
          2: 'var(--orange02)',
          3: 'var(--orange03)',
        },
        gray: {
          1: 'var(--gray01)',
          2: 'var(--gray02)',
          3: 'var(--gray03)',
          4: 'var(--gray04)',
        },
        white: 'var(--white)',
        black: 'var(--black)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        success: 'var(--success)',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        border: 'hsla(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Custom Themed Aliases
        colorBackground: 'var(--colorBackground)',
        colorForeground: 'var(--colorForeground)',
        colorHeading: 'var(--colorHeading)',
        colorCaption: 'var(--colorCaption)',
        colorHeaderBackground: 'var(--colorHeaderBackground)',
        colorHeaderForeground: 'var(--colorHeaderForeground)',
        colorFooterBackground: 'var(--colorFooterBackground)',
        colorFooterForeground: 'var(--colorFooterForeground)',
        colorAdminBarBackground: 'var(--colorAdminBarBackground)',
        colorAdminBarBackgroundDark: 'var(--colorAdminBarBackgroundDark)',
        colorAdminBarForeground: 'var(--colorAdminBarForeground)',
      },
      fontFamily: {
        display: ['var(--fontFamilyDisplay)'],
        h1: ['var(--fontFamilyH1)'],
        h2: ['var(--fontFamilyH2)'],
        h3: ['var(--fontFamilyH3)'],
        h4: ['var(--fontFamilyH4)'],
        body: ['var(--fontFamilyBody)'],
        strong: ['var(--fontFamilyStrong)'],
        tiny: ['var(--fontFamilyTiny)'],
      },
      spacing: {
        'vertical-lg': 'var(--spacingVerticalLarge)',
        'vertical-md': 'var(--spacingVerticalMedium)',
        'vertical-sm': 'var(--spacingVerticalSmall)',
        'padding-block': 'var(--paddingVerticalBlock)',
        'margin-block': 'var(--marginVerticalBlock)',
        hero: 'var(--paddingVerticalHero)',
      },
      maxWidth: {
        copy: 'var(--maxWidthCopy)',
        heading: 'var(--maxWidthHeading)',
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
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--colorForeground)',
            '--tw-prose-headings': 'var(--colorForeground)',
            color: 'var(--colorForeground)',
            a: { color: 'inherit' },
          },
        },
      }),
    },
  },
}

export default config
