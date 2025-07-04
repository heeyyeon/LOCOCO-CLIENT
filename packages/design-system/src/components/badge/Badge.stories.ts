import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const First: Story = {
  args: { rank: '1' },
};

export const SecondThird: Story = {
  args: { rank: '2' },
};
