type Media = 'video' | 'image';

export interface ReviewItem {
  type?: Media;
  rank?: number;
  brand: string;
  title: string;
  reviewId: number;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
}
