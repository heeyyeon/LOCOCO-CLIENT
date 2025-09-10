import { useState } from 'react';

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
    value: {
      control: { type: 'text' },
    },
    selected: {
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
    value: 'Tab',
    selected: false,
    handleClick: () => {},
  },
};

export const Active: Story = {
  args: {
    value: 'Active Tab',
    selected: true,
    handleClick: () => {},
  },
};

export const MultipleTabs: Story = {
  render: () => {
    const [value, setValue] = useState('첫 번째 탭');

    return (
      <TabContainer>
        <Tab
          label="첫 번째 탭"
          value="첫 번째 탭"
          selected={value === '첫 번째 탭'}
          handleClick={setValue}
        />
        <Tab
          label="두 번째 탭"
          value="두 번째 탭"
          selected={value === '두 번째 탭'}
          handleClick={setValue}
        />
        <Tab
          label="세 번째 탭"
          value="세 번째 탭"
          selected={value === '세 번째 탭'}
          handleClick={setValue}
        />
      </TabContainer>
    );
  },
};
