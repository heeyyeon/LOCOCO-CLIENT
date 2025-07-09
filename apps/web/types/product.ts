export interface ProductItem {
  rank?: number;
  brand: string;
  title: string;
  description: string;
  productId: number;
  isLiked: boolean;
  rating: number;
  reviewCount: number;
  likeCount: number;
  imageUrl?: string;
}
