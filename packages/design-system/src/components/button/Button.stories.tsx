import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outline', 'text'] },
    color: { control: 'radio', options: ['primary', 'secondary'] },
    shape: { control: 'radio', options: ['default', 'round'] },
    size: { control: 'radio', options: ['large', 'medium', 'small'] },
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
    size: 'large',
  },
};

export const FilledPrimaryRound: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    shape: 'round',
    size: 'medium',
  },
};

export const FilledPrimaryWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'large',
    icon: <SvgErrorFill />,
    iconPosition: 'left',
  },
};

export const FilledPrimaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'large',
    icon: <SvgErrorFill />,
    iconPosition: 'right',
  },
};

export const OutlinePrimary: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'large',
  },
};

export const TextPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'large',
  },
};

export const FilledSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'large',
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'secondary',
    size: 'large',
  },
};

export const LargeTextSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'secondary',
    size: 'large',
  },
};

export const MediumFilledPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
  },
};

export const SmallTextPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'small',
  },
};
