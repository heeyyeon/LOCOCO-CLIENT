import type { Meta, StoryObj } from '@storybook/react-vite';

import Star from './Star';

const meta: Meta<typeof Star> = {
  title: 'Components/Star',
  component: Star,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '별점을 표시하는 컴포넌트입니다. sm과 md 두 가지 크기와 다양한 색상을 지원합니다.',
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
      options: ['sm', 'md'],
      description: '별점 크기 (sm: 24px, md: 36px)',
    },
    color: {
      control: { type: 'text' },
      description: '별 색상 (Tailwind 색상명 또는 CSS 색상값)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4.5,
    size: 'sm',
    color: 'yellow',
  },
};

export const smSize: Story = {
  args: {
    rating: 4.2,
    size: 'sm',
    color: 'yellow',
  },
  parameters: {
    docs: {
      description: {
        story: 'sm 크기의 별점 표시입니다. (24px)',
      },
    },
  },
};

export const mdSize: Story = {
  args: {
    rating: 4.2,
    size: 'md',
    color: 'yellow',
  },
  parameters: {
    docs: {
      description: {
        story: 'md 크기의 별점 표시입니다. (36px)',
      },
    },
  },
};

export const YellowStar: Story = {
  args: {
    rating: 4.5,
    size: 'md',
    color: 'yellow',
  },
};

export const BlackStar: Story = {
  args: {
    rating: 4.5,
    size: 'md',
    color: 'black',
  },
};

// 특수 케이스
export const FullStars: Story = {
  args: {
    rating: 5.0,
    size: 'md',
    color: 'yellow',
  },
  parameters: {
    docs: {
      description: {
        story: '만점 (5.0점)인 경우입니다.',
      },
    },
  },
};

export const HalfStar: Story = {
  args: {
    rating: 2.5,
    size: 'md',
    color: 'yellow',
  },
  parameters: {
    docs: {
      description: {
        story: '정확히 반별 (0.5점)인 경우입니다.',
      },
    },
  },
};

export const NoStars: Story = {
  args: {
    rating: 0,
    size: 'md',
    color: 'yellow',
  },
  parameters: {
    docs: {
      description: {
        story: '별점이 없는 (0점) 경우입니다.',
      },
    },
  },
};
