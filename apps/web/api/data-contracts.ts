/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiResponseVoid {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: any;
}

export interface ApiResponseListVideoResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: VideoResponse[];
}

export interface VideoResponse {
  /** @format int64 */
  id?: number;
  topic?: string;
  title?: string;
  url?: string;
  /** @format int32 */
  popularity?: number;
  /** @format int64 */
  viewCount?: number;
  /** @format date-time */
  uploadedAt?: string;
}

export interface ProductSearchRequest {
  /**
   * @minLength 0
   * @maxLength 20
   */
  keyword: string;
}

export interface ApiResponseNameBrandProductResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: NameBrandProductResponse;
}

export interface NameBrandProductResponse {
  searchQuery?: string;
  products?: ProductResponse[];
  pageInfo?: PageableResponse;
}

export interface PageableResponse {
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  numberOfElements?: number;
  isLast?: boolean;
}

export interface ProductResponse {
  /** @format int64 */
  productId?: number;
  imageUrls?: string[];
  productName?: string;
  brandName?: string;
  unit?: string;
  /** @format int64 */
  reviewCount?: number;
  /** @format double */
  rating?: number;
}

export interface ApiResponseProductDetailResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: ProductDetailResponse;
}

export interface ProductDetailResponse {
  products?: ProductResponse[];
  productOptions?: string[];
  /** @format int64 */
  normalPrice?: number;
  productDetail?: string;
  ingredients?: string;
  shippingInfo?: string;
  oliveYoungUrl?: string;
  q10Url?: string;
  middleCategory?: "FACIAL_CARE" | "FACE_MAKEUP" | "EYE_MAKEUP" | "LIP_MAKEUP";
  subCategory?:
    | "TONER"
    | "MOISTURIZER"
    | "ESSENCE_SERUM"
    | "CREAM"
    | "FOUNDATION"
    | "POWDER_COMPACT"
    | "CONCEALER"
    | "BLUSHER"
    | "EYEBROW"
    | "EYESHADOW"
    | "EYELINER"
    | "LIPSTICK"
    | "LIP_TINT";
}

export interface ApiResponseProductDetailYoutubeResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: ProductDetailYoutubeResponse;
}

export interface ProductDetailYoutubeResponse {
  youtubeUrls?: string[];
}

export interface ApiResponseObject {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: any;
}

export interface ApiResponseCategoryPopularProductResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: CategoryPopularProductResponse;
}

export interface CategoryPopularProductResponse {
  searchQuery?: string;
  products?: ProductResponse[];
  pageInfo?: PageableResponse;
}

export interface ApiResponseCategoryNewProductResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: CategoryNewProductResponse;
}

export interface CategoryNewProductResponse {
  searchQuery?: string;
  products?: ProductResponse[];
  pageInfo?: PageableResponse;
}

export interface ApiResponseLineLoginResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: LineLoginResponse;
}

export interface LineLoginResponse {
  loginStatus?: "LOGIN" | "REGISTER";
}
