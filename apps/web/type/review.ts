import { ReactNode } from 'react';

type media = 'video' | 'image';

export interface ReviewItems {
  type?: media;
  rank?: number;
  brand: string;
  title: string;
  reviewId: number;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
  handleCardClick?: (reviewId: number) => void;
  children?: ReactNode;
}
