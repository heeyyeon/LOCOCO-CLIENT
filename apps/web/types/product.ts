export interface ProductItem {
  ranking?: number;
  brandName: string;
  productName: string;
  unit: string;
  productId: number;
  isLiked: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
}
