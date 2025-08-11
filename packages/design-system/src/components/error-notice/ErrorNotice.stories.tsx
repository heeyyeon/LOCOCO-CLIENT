import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorNotice from './ErrorNotice';

const meta: Meta<typeof ErrorNotice> = {
  title: 'components/ErrorNotice',
  component: ErrorNotice,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorNotice>;

export const Default: Story = {
  args: {
    message: 'error message',
  },
};

export const LongMessage: Story = {
  args: {
    message: '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
  },
};
