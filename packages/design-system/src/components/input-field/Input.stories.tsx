import type { Meta, StoryObj } from '@storybook/react-vite';

import { SvgSearch } from '../../icons/fill/components/Search';
import Button from '../button/Button';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/InputField',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
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
    type: 'Inter',
    placeholder: 'Enter text...',
  },
};

export const NotoSansKR: Story = {
  args: {
    type: 'NotoSansKR',
    placeholder: '한국어 텍스트...',
  },
};

export const Search: Story = {
  args: {
    type: 'Inter',
    placeholder: 'Search...',
    leftIcon: <SvgSearch size={20} />,
  },
};

export const ButtonLeft: Story = {
  args: {
    type: 'NotoSansKR',
    placeholder: '검색...',
    leftIcon: (
      <Button variant="filled" color="primary" size="md">
        검색
      </Button>
    ),
  },
};
