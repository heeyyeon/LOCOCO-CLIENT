import { Meta, StoryObj } from '@storybook/react-vite';

import ModalButton, { ModalButtonWrapper } from './ModalButton';

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
    onClick: () => console.log('Default button clicked'),
  },
};

export const LeftButton: Story = {
  args: {
    text: 'Button',
    variant: 'left',
    onClick: () => console.log('Left button clicked'),
  },
};

export const RightButton: Story = {
  args: {
    text: 'Button',
    variant: 'right',
    onClick: () => console.log('Right button clicked'),
  },
};

export const ButtonWrapper: Story = {
  render: () => (
    <ModalButtonWrapper
      children={[
        {
          text: 'Cancel',
          variant: 'left',
          onClick: () => console.log('Cancel clicked'),
        },
        {
          text: 'Save',
          variant: 'right',
          onClick: () => console.log('Save clicked'),
        },
      ]}
    />
  ),
  parameters: {
    layout: 'centered',
  },
};

export default ButtonMeta;
