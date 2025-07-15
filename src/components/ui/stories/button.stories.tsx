import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '../button'
import { ArrowRight, Check, Send } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
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

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button',
  },
}

export const Small: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button size="sm">Button</Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="secondary" size="sm">
          Button
        </Button>
        <Button variant="destructive" size="sm">
          Button
        </Button>
        <Button variant="ghost" size="sm">
          Button
        </Button>
        <Button variant="link" size="sm">
          Button
        </Button>
      </div>
    )
  },
}

export const Large: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button size="lg">Button</Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
        <Button variant="secondary" size="lg">
          Button
        </Button>
        <Button variant="destructive" size="lg">
          Button
        </Button>
        <Button variant="ghost" size="lg">
          Button
        </Button>
        <Button variant="link" size="lg">
          Button
        </Button>
      </div>
    )
  },
}

export const Icon: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button size="icon">
          <Check />
        </Button>
        <Button variant="outline" size="icon">
          <Check />
        </Button>
        <Button variant="secondary" size="icon">
          <Check />
        </Button>
        <Button variant="destructive" size="icon">
          <Check />
        </Button>
        <Button variant="ghost" size="icon">
          <Check />
        </Button>
        <Button variant="link" size="icon">
          <Check />
        </Button>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button disabled>
          <Check />
        </Button>
        <Button variant="outline" disabled>
          <Check />
        </Button>
        <Button variant="secondary" disabled>
          <Check />
        </Button>
        <Button variant="destructive" disabled>
          <Check />
        </Button>
        <Button variant="ghost" disabled>
          <Check />
        </Button>
        <Button variant="link" disabled>
          <Check />
        </Button>
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button loading>Button</Button>
        <Button loading variant="outline">
          Button
        </Button>
        <Button loading variant="secondary">
          Button
        </Button>
        <Button loading variant="destructive">
          Button
        </Button>
        <Button loading variant="ghost">
          Button
        </Button>
        <Button loading variant="link">
          Button
        </Button>
      </div>
    )
  },
}

export const WithIcon: Story = {
  render: () => {
    return (
      <div className="flex justify-around">
        <Button variant="outline" size="lg">
          <Send /> Send
        </Button>
        <Button variant="outline" size="lg">
          Learn more <ArrowRight />
        </Button>
      </div>
    )
  },
}
