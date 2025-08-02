import type { Meta, StoryObj } from '@storybook/react-vite';

import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outline', 'text'] },
    color: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    rounded: { control: 'boolean' },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const FilledPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
  },
};

export const FilledPrimaryRounded: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    rounded: true,
    size: 'md',
  },
};

export const FilledPrimaryWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    iconLeft: <SvgErrorFill />,
  },
};

export const FilledPrimaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    iconRight: <SvgErrorFill />,
  },
};

export const OutlineDefault: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'lg',
  },
};

export const TextPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'lg',
  },
};

export const FilledSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'lg',
  },
};

export const LargeTextSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'secondary',
    size: 'lg',
  },
};

export const MediumFilledPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'md',
  },
};

export const SmallTextPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'sm',
  },
};
