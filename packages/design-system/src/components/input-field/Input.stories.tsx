import type { Meta, StoryObj } from '@storybook/react-vite';

import { SvgSearch } from '../../icons/fill/components/Search';
import Button from '../button/Button';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/InputField',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    fontType: {
      control: { type: 'radio' },
      options: ['Inter', 'NotoSansKR'],
    },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    fontType: 'Inter',
    placeholder: 'Enter text...',
  },
};

export const NotoSansKR: Story = {
  args: {
    fontType: 'NotoSansKR',
    placeholder: '한국어 텍스트...',
  },
};

export const Search: Story = {
  args: {
    fontType: 'Inter',
    placeholder: 'Search...',
    rightIcon: <SvgSearch size={20} />,
  },
};

export const ButtonLeft: Story = {
  args: {
    fontType: 'NotoSansKR',
    placeholder: '검색...',
    rightIcon: (
      <Button variant="filled" color="primary" size="md">
        label
      </Button>
    ),
  },
};
