import type { Meta, StoryObj } from '@storybook/react-vite';

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
    isClick: {
      control: { type: 'boolean' },
    },
    handleClick: {
      action: 'clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    label: 'Tab',
    isClick: false,
    handleClick: () => {},
  },
};

export const Active: Story = {
  args: {
    label: 'Active Tab',
    isClick: true,
    handleClick: () => {},
  },
};

export const MultipleTabs: Story = {
  render: () => (
    <TabContainer>
      <Tab label="Home" isClick={true} handleClick={() => {}} />
      <Tab label="About" isClick={false} handleClick={() => {}} />
      <Tab label="Contact" isClick={false} handleClick={() => {}} />
    </TabContainer>
  ),
};
