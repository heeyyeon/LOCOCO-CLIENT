import type { Meta, StoryObj } from '@storybook/react';
import CardReview from './CardReview';

const reviewMeta: Meta<typeof CardReview> = {
  title: 'components/Card/CardReview',
  component: CardReview,
  tags: ['autodocs'],
  argTypes: {
    isShowRank: { control: 'boolean' },
    rank: { control: { type: 'number', min: 1, max: 100 } },
    brand: { control: 'text' },
    title: { control: 'text' },
    reviewId: { control: 'number' },
    isLiked: { control: 'boolean' },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    reviewCount: { control: 'number' },
    likeCount: { control: 'number' },
    imageUrl: { control: 'text' },
    label: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default reviewMeta;

type ReviewStory = StoryObj<typeof CardReview>;

export const Image: ReviewStory = {
  args: {
    type: 'image',
    isShowRank: true,
    rank: 1,
    brand: '브랜드명',
    title: '상품 이름',
    reviewId: 1,
    isLiked: true,
    rating: 4,
    reviewCount: 450,
    likeCount: 234,
    imageUrl: undefined,
    label: '보러가기',
  },
};

export const Video: ReviewStory = {
  args: {
    type: 'video',
    isShowRank: true,
    rank: 1,
    brand: '브랜드명',
    title: '상품 이름',
    reviewId: 1,
    isLiked: true,
    rating: 4,
    reviewCount: 450,
    likeCount: 234,
    imageUrl: undefined,
    label: '보러가기',
  },
};
