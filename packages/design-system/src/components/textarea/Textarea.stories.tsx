import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorNotice from '../error-notice/ErrorNotice';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'components/Textarea',
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'text',
    maxLength: 10,
    value: '안녕하세요',
  },
};

export const NoText: Story = {
  args: {
    ...Default.args,
    placeholder: '1000자',
    value: '',
  },
};

export const NoMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: undefined,
  },
};

export const TextLengthOverTextarea: StoryObj<typeof Textarea> = {
  parameters: {
    docs: {
      description: {
        story: 'maxLength 초과 시 에러 메시지가 표시된 Textarea입니다.',
      },
    },
  },
  args: {
    ...Default.args,
    value: '안녕하세요안녕하세요안녕하세요안녕하세요',
  },
  render: (args) => {
    return (
      <Textarea.Container>
        <Textarea {...args} />
        {args.maxLength && args.value.length > args.maxLength && (
          <ErrorNotice message="error text" />
        )}
      </Textarea.Container>
    );
  },
};
