import { ReactNode } from 'react';

export interface ReviewItems {
  type?: 'video' | 'image';
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
