import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    color: {
      control: { type: 'text' },
      description: 'CSS 변수 이름 (e.g. --color-pink-500)',
    },
    width: {
      control: { type: 'text' },
      description: 'CSS width 값 (e.g. 100%, 300px)',
    },
    height: {
      control: { type: 'text' },
      description: 'CSS height 값 (e.g. 0.75rem, 12px)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 70,
  },
};

export const CustomColor: Story = {
  args: {
    value: 50,
    color: '--color-blue',
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
    color: '--color-green',
    width: '400px',
    height: '1rem',
  },
};

export const ThinBar: Story = {
  args: {
    value: 30,
    color: '--color-red',
    width: '300px',
    height: '4px',
  },
};
