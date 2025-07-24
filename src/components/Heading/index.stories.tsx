import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Heading } from './index'

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    children: 'Heading Component',
    tag: 'h2',
    size: 'lg',
    className: '',
  },
}

export const AllTags: Story = {
  render: ({ children }) => (
    <div className="space-y-4">
      <Heading tag="h1">{children}</Heading>
      <Heading tag="h2">{children}</Heading>
      <Heading tag="h3">{children}</Heading>
      <Heading tag="h4">{children}</Heading>
      <Heading tag="h5">{children}</Heading>
      <Heading tag="h6">{children}</Heading>
    </div>
  ),
  args: {
    children: 'Welcome to the Heading Component',
  },
}
