import type { Meta, StoryObj } from '@storybook/react';
import Bedge from './Bedge';

const meta: Meta<typeof Bedge> = {
  title: 'components/Bedge',
  component: Bedge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Bedge>;

export const First: Story = {
  args: { rank: '1' },
};

export const SecondThird: Story = {
  args: { rank: '2' },
};
