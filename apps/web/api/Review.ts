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
<<<<<<< HEAD

=======
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
import {
  ApiResponseImageReviewsProductDetailResponse,
  ApiResponseMainImageReviewResponse,
  ApiResponseMainVideoReviewResponse,
  ApiResponseReviewMediaResponse,
  ApiResponseReviewReceiptResponse,
  ApiResponseReviewResponse,
<<<<<<< HEAD
  ApiResponseVideoReviewDetailResponse,
  ApiResponseVideoReviewProductDetailResponse,
  ApiResponseVoid,
  ReviewAdminRequest,
  ReviewMediaRequest,
  ReviewReceiptRequest,
  ReviewRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
=======
  ReviewMediaRequest,
  ReviewReceiptRequest,
  ReviewRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9

export class Review<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags REVIEW
   * @name CreateReview
   * @summary 리뷰 작성
   * @request POST:/api/reviews/{productId}
   * @secure
   */
  createReview = (
    productId: number,
    data: ReviewRequest,
<<<<<<< HEAD
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseReviewResponse, any>({
      path: `/api/reviews/${productId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name CreateAdminReview
   * @summary 어드민용 리뷰 작성 (기획 전용)
   * @request POST:/api/reviews/{productId}/{userId}
   * @secure
   */
  createAdminReview = (
    productId: number,
    userId: number,
    data: ReviewAdminRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/reviews/${productId}/${userId}`,
      method: "POST",
=======
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseReviewResponse, any>({
      path: `/api/reviews/${productId}`,
      method: 'POST',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name CreateReceiptPresignedUrl
   * @summary 영수증 presignedUrl 발급
   * @request POST:/api/reviews/receipt
   * @secure
   */
  createReceiptPresignedUrl = (
    data: ReviewReceiptRequest,
<<<<<<< HEAD
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseReviewReceiptResponse, any>({
      path: `/api/reviews/receipt`,
      method: "POST",
=======
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseReviewReceiptResponse, any>({
      path: `/api/reviews/receipt`,
      method: 'POST',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name CreateMediaPresignedUrl
   * @summary 사진 또는 영상 presignedUrl 발급
   * @request POST:/api/reviews/media
   * @secure
   */
  createMediaPresignedUrl = (
    data: ReviewMediaRequest,
<<<<<<< HEAD
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseReviewMediaResponse, any>({
      path: `/api/reviews/media`,
      method: "POST",
=======
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseReviewMediaResponse, any>({
      path: `/api/reviews/media`,
      method: 'POST',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name GetMainVideoReviews
   * @summary 메인페이지에서 영상 리뷰 조회
   * @request GET:/api/reviews/video
   * @secure
   */
  getMainVideoReviews = (params: RequestParams = {}) =>
    this.request<ApiResponseMainVideoReviewResponse, any>({
      path: `/api/reviews/video`,
<<<<<<< HEAD
      method: "GET",
=======
      method: 'GET',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name GetMainImageReviews
   * @summary 메인페이지에서 이미지 리뷰 조회
   * @request GET:/api/reviews/image
   * @secure
   */
  getMainImageReviews = (params: RequestParams = {}) =>
    this.request<ApiResponseMainImageReviewResponse, any>({
      path: `/api/reviews/image`,
<<<<<<< HEAD
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name GetVideoReviewDetails
   * @summary 영상 리뷰 상세 조회 (가장 마지막 뎁스)
   * @request GET:/api/reviews/details/{reviewId}/video
   * @secure
   */
  getVideoReviewDetails = (reviewId: number, params: RequestParams = {}) =>
    this.request<ApiResponseVideoReviewDetailResponse, any>({
      path: `/api/reviews/details/${reviewId}/video`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name GetVideoReviewsInProductDetail
   * @summary 제품 상세 페이지에서 영상 리뷰 조회
   * @request GET:/api/reviews/details/video
   * @secure
   */
  getVideoReviewsInProductDetail = (
    query: {
      /** @format int64 */
      productId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVideoReviewProductDetailResponse, any>({
      path: `/api/reviews/details/video`,
      method: "GET",
      query: query,
=======
      method: 'GET',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags REVIEW
   * @name GetImageReviewsInProductDetail
<<<<<<< HEAD
   * @summary 제품 상세 페이지에서 유저 리뷰 조회
=======
   * @summary 제품 상세 페에지에서 유저 리뷰 조회
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
   * @request GET:/api/reviews/details/image
   * @secure
   */
  getImageReviewsInProductDetail = (
    query: {
      /** @format int64 */
      productId: number;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
<<<<<<< HEAD
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseImageReviewsProductDetailResponse, any>({
      path: `/api/reviews/details/image`,
      method: "GET",
=======
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseImageReviewsProductDetailResponse, any>({
      path: `/api/reviews/details/image`,
      method: 'GET',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      query: query,
      secure: true,
      ...params,
    });
}
