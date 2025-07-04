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

export interface ApiResponseCategoryProductResponse {
  success?: boolean;
  /** @format int32 */
  status?: number;
  message?: string;
  data?: CategoryProductResponse;
}

export interface CategoryProductResponse {
  searchQuery?: string;
  mainCategory?: string;
  subCategory?: string;
  /** @format int32 */
  resultCount?: number;
  products?: ProductResponse[];
}

export interface ProductResponse {
  /** @format int64 */
  productId?: number;
  imageUrl?: string;
  productName?: string;
  /** @format int64 */
  reviewCount?: number;
  rating?: number;
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
