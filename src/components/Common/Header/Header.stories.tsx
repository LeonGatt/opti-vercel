import type { Header as HeaderType } from '@/payload-types'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeaderClient } from './Header.client'

const mockHeader: HeaderType = {
  id: 'mock-header-1',
  navItems: [
    {
      link: {
        type: 'custom',
        reference: null,
        url: '/',
        label: 'Test',
        color: 'default',
      },
      id: '1',
    },
    {
      link: {
        type: 'custom',
        reference: null,
        url: '/',
        label: 'Test 2',
        color: 'default',
      },
      id: '2',
    },
  ],
}

const meta: Meta<typeof HeaderClient> = {
  title: 'Header',
  component: HeaderClient,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof HeaderClient>

export const Default: Story = {
  args: {
    data: mockHeader,
  },
}

export const WithManyLinks: Story = {
  args: {
    data: {
      ...mockHeader,
      navItems: [
        ...(Array.isArray(mockHeader?.navItems) ? mockHeader.navItems : []),
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/test-3',
            label: 'Test 3',
            color: 'default',
          },
          id: '3',
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/test-4',
            label: 'Test 4',
            color: 'default',
          },
          id: '4',
        },
      ],
    },
  },
}
