import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['default', 'search'],
    },
    placeholder: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'default',
    placeholder: 'Text',
  },
};

export const Hover: Story = {
  args: { ...Default.args },
};

export const Focus: Story = {
  args: { ...Default.args },
};

export const Typing: Story = {
  args: { ...Default.args, value: 'Text' },
};

export const SearchDefault: Story = {
  args: {
    type: 'search',
    placeholder: 'Text',
  },
};

export const SearchHover: Story = {
  args: { ...SearchDefault.args },
};

export const SearchFocus: Story = {
  args: { ...SearchDefault.args },
};

export const SearchTyping: Story = {
  args: { ...SearchDefault.args, value: 'Text' },
};
