// components/Tab.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Tab, { TabProps } from './Tab';

const meta: Meta<TabProps> = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<TabProps>;

export const Default: Story = {
  args: {
    active: false,
    size: 'base',
  },
};

export const ActiveBase: Story = {
  args: {
    active: true,
    size: 'base',
  },
};

export const InactiveLarge: Story = {
  args: {
    active: false,
    size: 'large',
  },
};

export const ActiveLarge: Story = {
  args: {
    active: true,
    size: 'large',
  },
};
