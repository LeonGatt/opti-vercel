import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Logos3Custom from './logos3-custom'
import { genRichText } from '@/utilities/richtext'
import { faker } from '@faker-js/faker';
import { de } from '@payloadcms/translations/languages/de';

const meta: Meta<typeof Logos3Custom> = {
  title: 'Blocks/Logos3Custom',
  component: Logos3Custom,
  parameters: {
    layout: 'padded',
  }
}

export default meta

type Story = StoryObj<typeof Logos3Custom>

const logoArr = Array.from({ length: 6}, () => ({
  id: faker.string.numeric(5),
  updatedAt: faker.date.recent().toISOString(),
  createdAt: faker.date.past().toISOString(),
  url: faker.image.urlLoremFlickr({ height: 20, width: 100}),
  filename: faker.system.commonFileName('svg'),
  mimeType: faker.system.fileExt('image/svg+xml'),
  filesize: faker.number.int({ min: 1000, max: 10000 }),
  width: 100,
  height: 20
  })
)

export const Default: Story = {
  args: {
    richText: {
        ...genRichText([{type: 'heading', tag: 'h2', text: faker.lorem.words(2)}])
    },
    logos: logoArr
  },
}

export const LogoOnly: Story ={
  args: {
    logos: logoArr
  }
}
