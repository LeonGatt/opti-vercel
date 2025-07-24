import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs, TabsList, TabsTrigger } from '../tabs'
import { AppWindow, Code } from 'lucide-react'
import { Badge } from '../badge'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render(args) {
    return (
      <Tabs defaultValue="account">
        <TabsList {...args}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  },
}

export const WithCustomWidth: Story = {
  render(args) {
    return (
      <Tabs defaultValue="account">
        <TabsList {...args}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  },
}

export const WithIconLeft: Story = {
  render(args) {
    return (
      <Tabs defaultValue="preview">
        <TabsList {...args}>
          <TabsTrigger value="preview">
            <AppWindow className="size-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="size-4" /> Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
  },
}

export const WithIconRight: Story = {
  render(args) {
    return (
      <Tabs defaultValue="billing">
        <TabsList {...args}>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications <Badge rounded>8</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
  },
}

export const WithDisabledTab: Story = {
  render(args) {
    return (
      <Tabs defaultValue="account">
        <TabsList {...args}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger disabled value="password">
            Password
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
  },
}
