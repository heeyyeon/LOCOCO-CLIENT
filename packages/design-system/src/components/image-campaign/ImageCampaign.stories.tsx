import type { Meta, StoryObj } from '@storybook/react-vite';

import ImageCampaign from './ImageCampaign';

const meta: Meta<typeof ImageCampaign> = {
  title: 'Components/ImageCampagin',
  component: ImageCampaign,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the image is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: true,
    children: (
      <img src="https://placehold.co/100x100" alt="Beautiful landscape" />
    ),
  },
};
