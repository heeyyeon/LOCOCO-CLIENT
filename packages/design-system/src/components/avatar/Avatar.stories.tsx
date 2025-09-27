import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const NoImage: Story = {
  args: {},
};

export const WithImage: Story = {
  args: { src: 'https://placehold.co/100x100' },
};

export const WithImageAndNotRounded: Story = {
  args: { src: 'https://placehold.co/100x100', rounded: false },
};

export const WithImageAndRounded: Story = {
  args: { src: 'https://placehold.co/100x100', rounded: true },
};
