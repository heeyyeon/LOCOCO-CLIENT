export interface ProductItems {
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
  handleLikeToggle?: (productId: number, isLiked: boolean) => void;
  handleCardClick?: (productId: number) => void;
}
