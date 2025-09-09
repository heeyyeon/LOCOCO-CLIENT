import type { Meta, StoryObj } from '@storybook/react';

import { Tab, TabContainer } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    icClick: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    label: 'Tab',
    icClick: false,
  },
};

export const Active: Story = {
  args: {
    label: 'Active Tab',
    icClick: true,
  },
};

export const MultipleTabs: Story = {
  render: () => (
    <TabContainer>
      <Tab label="Home" icClick={true} />
      <Tab label="About" icClick={false} />
      <Tab label="Contact" icClick={false} />
    </TabContainer>
  ),
};
