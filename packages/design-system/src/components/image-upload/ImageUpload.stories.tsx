import type { Meta, StoryObj } from '@storybook/react-vite';

import ImageUpload from './ImageUpload';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    handleFileChange: {
      action: 'file change',
      description: 'Function to handle file selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
