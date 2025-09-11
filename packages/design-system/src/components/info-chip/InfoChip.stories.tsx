import type { Meta, StoryObj } from '@storybook/react-vite';

import InfoChip from './InfoChip';

const meta: Meta<typeof InfoChip> = {
  title: 'Components/InfoChip',
  component: InfoChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'green', 'red', 'blue'],
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'lg'],
    },
    text: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default chip',
    color: 'default',
    size: 'md',
  },
};

export const Green: Story = {
  args: {
    text: 'Success',
    color: 'green',
    size: 'md',
  },
};

export const Red: Story = {
  args: {
    text: 'Error',
    color: 'red',
    size: 'md',
  },
};

export const Blue: Story = {
  args: {
    text: 'Info',
    color: 'blue',
    size: 'md',
    icon: true,
  },
};

// Size variants
export const Large: Story = {
  args: {
    text: 'Large chip',
    color: 'default',
    size: 'lg',
    icon: true,
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    text: 'With icon',
    color: 'green',
    size: 'md',
    icon: true,
  },
};
