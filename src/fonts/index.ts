import localFont from 'next/font/local'

// HaasGrot Text - for general text
export const haasGrotText = localFont({
  src: [
    {
      path: './HaasGrotText-55Roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './HaasGrotText-65Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './HaasGrotText-75Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

// HaasGrot Display - for headings
export const haasGrotDisplay = localFont({
  src: [
    {
      path: './HaasGrotDisp-55Roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './HaasGrotDisp-65Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './HaasGrotDisp-75Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
})

// HaasGrot Body - same as sans but with different variable name
export const haasGrotBody = localFont({
  src: [
    {
      path: './HaasGrotText-55Roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './HaasGrotText-65Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './HaasGrotText-75Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})
