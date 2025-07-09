type Media = 'video' | 'image';

export interface ReviewItem {
  type?: Media;
  ranking?: number;
  brandName: string;
  productName: string;
  reviewId: number;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
}
