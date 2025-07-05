import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

interface InputProps {
  variant?: 'default' | 'search';
  error?: string;
  placeholder?: string;
  value?: string;
}

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'search'],
    },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<InputProps>;

// Default
export const Default: Story = {
  args: {
    variant: 'default',
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

export const Error: Story = {
  args: { ...Default.args, error: 'error text' },
};

// Search
export const SearchDefault: Story = {
  args: {
    variant: 'search',
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
