import type { Meta, StoryObj } from '@storybook/react';
import Star from './Star';

const meta: Meta<typeof Star> = {
  title: 'Components/Star',
  component: Star,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '별점을 표시하는 컴포넌트입니다. review와 detail 두 가지 타입을 지원합니다.',
      },
    },
  },
  argTypes: {
    rating: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
      description: '0부터 5까지의 별점',
    },
    size: {
      control: { type: 'select' },
      options: ['review', 'detail'],
      description: '별점 표시 타입',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ReviewType: Story = {
  args: {
    rating: 4.5,
    size: 'small',
  },
};

export const DetailType: Story = {
  args: {
    rating: 4.2,
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Detail 타입의 별점 표시입니다.',
      },
    },
  },
};
