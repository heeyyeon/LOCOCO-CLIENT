import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ErrorNotice from '../error-notice/ErrorNotice';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'components/Textarea',
  component: Textarea,
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
  render: (args) => {
    const [text, setText] = useState('');

    return (
      <Textarea.Container>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          {...args}
        />
        {args.maxLength && text.length > args.maxLength && (
          <ErrorNotice message="error text" />
        )}
      </Textarea.Container>
    );
  },
  args: {
    placeholder: 'text',
    maxLength: 10,
  },
};
