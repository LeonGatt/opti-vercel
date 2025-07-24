import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '../badge'
import { ArrowRight } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'primary'],
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

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Badge',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Badge',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Badge',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Badge',
  },
}

export const Number: Story = {
  args: {
    children: '8',
  },
  render: (args) => {
    return (
      <div className="flex justify-around">
        <Badge {...args} rounded />
        <Badge children="99" variant="destructive" rounded />
        <Badge children="20+" variant="outline" rounded />
      </div>
    )
  },
}

export const WithIcon: Story = {
  render: (args) => {
    return (
      <div className="flex justify-around">
        <Badge>
          Link <ArrowRight />
        </Badge>
        <Badge variant="secondary">
          Link <ArrowRight />
        </Badge>
        <Badge variant="destructive">
          Link <ArrowRight />
        </Badge>
        <Badge variant="outline">
          Link <ArrowRight />
        </Badge>
      </div>
    )
  },
}

export const WithTabActive: Story = {
  args: {
    children: 'Badge',
  },
  render: (args) => {
    return <Badge {...args} tabIndex={0} />
  },
}
