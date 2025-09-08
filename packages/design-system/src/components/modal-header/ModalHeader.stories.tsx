import type { Meta, StoryObj } from '@storybook/react-vite';

import ModalHeader from './ModalHeader';

const HeaderMeta: Meta<typeof ModalHeader> = {
  title: 'Components/ModalHeader',
  component: ModalHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Header text',
    },
    isHover: {
      control: 'boolean',
      description: 'Whether the header is in hover state',
    },
  },
};

export default HeaderMeta;

type HeaderStory = StoryObj<typeof ModalHeader>;

export const Default: HeaderStory = {
  args: {
    text: 'Modal Title',
    isHover: false,
  },
};
