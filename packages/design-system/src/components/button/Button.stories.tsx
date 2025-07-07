import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outline', 'text'] },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'default'],
    },
    rounded: { control: 'boolean' },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
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
    icon: <SvgErrorFill />,
    iconPosition: 'left',
  },
};

export const FilledPrimaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    icon: <SvgErrorFill />,
    iconPosition: 'right',
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
