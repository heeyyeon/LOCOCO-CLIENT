import {
  KeywordImageReviewListResponse,
  KeywordVideoReviewListResponse,
  SearchProductsResponse,
} from '@typescript-swagger/data-contracts';

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message?: string;
}

// Specific API response types using the generic
export type ApiResponseSearchProductsResponse =
  ApiResponse<SearchProductsResponse>;
export type ApiKeywordVideoReviewListResponse =
  ApiResponse<KeywordVideoReviewListResponse>;
export type ApiKeywordImageReviewListResponse =
  ApiResponse<KeywordImageReviewListResponse>;
