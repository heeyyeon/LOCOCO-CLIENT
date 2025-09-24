import type { Meta, StoryObj } from '@storybook/react-vite';

import { SvgClose } from '../../icons/fill/components/Close';
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
  },
};

export default HeaderMeta;

type HeaderStory = StoryObj<typeof ModalHeader>;

export const Default: HeaderStory = {
  args: {
    text: 'Modal Title',
  },
};

export const WithRightContent: HeaderStory = {
  args: {
    text: 'Modal Title',
    rightContent: <SvgClose />,
  },
};
