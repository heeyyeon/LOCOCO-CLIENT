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
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    rounded: { control: 'radio', options: ['none', 'sm', 'md'] },
    fontType: {
      control: 'radio',
      options: ['InterTitle3', 'InterBody1', 'InterBody2', 'InterBody4'],
    },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

// FILLED VARIANTS
export const FilledPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    fontType: 'InterTitle3',
  },
};

export const FilledPrimaryMedium: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'md',
    fontType: 'InterBody1',
  },
};

export const FilledPrimarySmall: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'sm',
    fontType: 'InterBody2',
  },
};

export const FilledPrimaryWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const FilledPrimaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    iconRight: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const FilledPrimaryMediumWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'md',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterBody1',
  },
};

export const FilledPrimaryMediumWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'md',
    iconRight: <SvgErrorFill />,
  },
};

export const FilledPrimarySmallWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'sm',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterBody2',
  },
};

export const FilledPrimarySmallWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'sm',
    iconRight: <SvgErrorFill />,
    fontType: 'InterBody2',
  },
};

// OUTLINE VARIANTS
export const OutlineDefault: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'lg',
    fontType: 'InterTitle3',
  },
};

export const OutlineDefaultMedium: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'md',
    fontType: 'InterBody1',
  },
};

export const OutlineDefaultSmall: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'sm',
    fontType: 'InterBody2',
  },
};

export const OutlineDefaultWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'lg',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const OutlineDefaultWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    color: 'primary',
    size: 'lg',
    iconRight: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

// TEXT VARIANTS
export const TextPrimary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'lg',
    fontType: 'InterTitle3',
  },
};

export const TextPrimaryMedium: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'md',
    fontType: 'InterBody1',
  },
};

export const TextPrimarySmall: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'sm',
    fontType: 'InterBody2',
  },
};

export const TextPrimaryWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'lg',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const TextPrimaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'lg',
    iconRight: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

// SECONDARY VARIANTS
export const FilledSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'lg',
    fontType: 'InterTitle3',
  },
};

export const FilledSecondaryMedium: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'md',
    fontType: 'InterBody1',
  },
};

export const FilledSecondarySmall: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'sm',
    fontType: 'InterBody2',
  },
};

export const FilledSecondaryWithLeftIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'lg',
    iconLeft: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const FilledSecondaryWithRightIcon: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'secondary',
    size: 'lg',
    iconRight: <SvgErrorFill />,
    fontType: 'InterTitle3',
  },
};

export const TextSecondary: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'secondary',
    size: 'lg',
    fontType: 'InterTitle3',
  },
};

export const TextSecondaryMedium: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'secondary',
    size: 'md',
    fontType: 'InterBody1',
  },
};

export const TextSecondarySmall: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'secondary',
    size: 'sm',
    fontType: 'InterBody2',
  },
};

// DISABLED VARIANTS
export const FilledPrimaryDisabled: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    fontType: 'InterTitle3',
    disabled: true,
  },
};

export const TextPrimaryDisabled: Story = {
  args: {
    children: 'Label',
    variant: 'text',
    color: 'primary',
    size: 'lg',
    fontType: 'InterTitle3',
    disabled: true,
  },
};

// ROUNDED VARIANTS
export const FilledPrimaryRoundedNone: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    rounded: 'none',
    fontType: 'InterTitle3',
  },
};

export const FilledPrimaryRoundedSmall: Story = {
  args: {
    children: 'Label',
    variant: 'filled',
    color: 'primary',
    size: 'lg',
    rounded: 'sm',
    fontType: 'InterTitle3',
  },
};
