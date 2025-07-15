// 상품 검색 응답 타입
export interface ProductSearchResponse {
  products: ProductItem[];
  pageInfo?: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    isLast: boolean;
  };
}

// 상품 아이템 타입
export interface ProductItem {
  productId: number;
  brandName: string;
  productName: string;
  unit: string;
  isLiked: boolean;
  rating: number;
  reviewCount: number;
  url: string;
}
