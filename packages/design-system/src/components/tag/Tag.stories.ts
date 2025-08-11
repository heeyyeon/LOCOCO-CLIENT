import type { Meta, StoryObj } from '@storybook/react-vite';

import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'components/Tag',
  component: Tag,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { text: 'レシート' },
};
