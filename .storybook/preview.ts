import type { Preview } from '@storybook/nextjs-vite'
import '../src/styles/globals.css'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme selector',
    defaultValue: 'dark',
    toolbar: {
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme

      const iframe = window.parent?.document?.querySelector<HTMLIFrameElement>(
        '#storybook-preview-iframe',
      )

      if (iframe?.contentDocument?.documentElement) {
        iframe.contentDocument.documentElement.setAttribute('data-theme', theme)
      }

      return Story(context)
    },
  ],
}

export default preview
