import { Meta, StoryObj } from '@storybook/react-vite';

import ModalButton from './ModalButton';

const ButtonMeta: Meta<typeof ModalButton> = {
  title: 'Components/ModalButton',
  component: ModalButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text',
    },
  },
  args: {
    text: 'Button',
  },
};
type Story = StoryObj<typeof ModalButton>;

export const DefaultButton: Story = {
  args: {
    text: 'Button',
    variant: 'default',
    onClick: () => {},
  },
};

export const LeftButton: Story = {
  args: {
    text: 'Button',
    variant: 'left',
    onClick: () => {},
  },
};

export const RightButton: Story = {
  args: {
    text: 'Button',
    variant: 'right',
    onClick: () => {},
  },
};

export const ButtonWrapper: Story = {
  render: () => (
    <div className="flex items-center">
      <ModalButton text="Cancel" variant="left" onClick={() => {}} />
      <div className="h-[5.6rem] w-[2px] bg-pink-500" />
      <ModalButton text="Save" variant="right" onClick={() => {}} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export default ButtonMeta;
