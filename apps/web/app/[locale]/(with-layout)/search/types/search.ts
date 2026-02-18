import {
  BrandImageReviewListResponse,
  BrandVideoReviewListResponse,
  SimpleProductResponse,
} from '@typescript-swagger/data-contracts';

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message?: string;
}

export interface SearchProductsResponse {
  products: SimpleProductResponse[];
}

export type ApiResponseSearchProductsResponse =
  ApiResponse<SearchProductsResponse>;
export type ApiKeywordVideoReviewListResponse =
  ApiResponse<BrandVideoReviewListResponse>;
export type ApiKeywordImageReviewListResponse =
  ApiResponse<BrandImageReviewListResponse>;
