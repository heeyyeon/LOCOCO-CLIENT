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

import {
  ApiResponseCampaignParticipatedResponse,
  ApiResponseCompletedReviewResponse,
  ApiResponseListCampaignParticipatedResponse,
  ApiResponseMediaPresignedUrlResponse,
  ApiResponseReviewUploadResponse,
  FirstReviewUploadRequest,
  MediaPresignedUrlRequest,
  SecondReviewUploadRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CampaignReview<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name UploadSecond
   * @summary 2차 리뷰 업로드
   * @request POST:/api/campaignReviews/{campaignId}/second
   * @secure
   */
  uploadSecond = (
    campaignId: number,
    data: SecondReviewUploadRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseReviewUploadResponse, any>({
      path: `/api/campaignReviews/${campaignId}/second`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name UploadFirst
   * @summary 1차 리뷰 업로드
   * @request POST:/api/campaignReviews/{campaignId}/first
   * @secure
   */
  uploadFirst = (
    campaignId: number,
    data: FirstReviewUploadRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseReviewUploadResponse, any>({
      path: `/api/campaignReviews/${campaignId}/first`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name CreateMediaPresignedUrl2
   * @summary 리뷰 작성 미디어 presignedUrl 발급
   * @request POST:/api/campaignReviews/media
   * @secure
   */
  createMediaPresignedUrl2 = (
    data: MediaPresignedUrlRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseMediaPresignedUrlResponse, any>({
      path: `/api/campaignReviews/media`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name GetCompletedReviews
   * @summary 완료된 캠페인 리뷰 결과 조회 (2차 리뷰)
   * @request GET:/api/campaignReviews/{campaignId}/results
   * @secure
   */
  getCompletedReviews = (campaignId: number, params: RequestParams = {}) =>
    this.request<ApiResponseCompletedReviewResponse, any>({
      path: `/api/campaignReviews/${campaignId}/results`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name GetMyReviewables
   * @summary 리뷰 업로드 가능한 캠페인 목록 조회 - 모든 참여중인 캠페인
   * @request GET:/api/campaignReviews/my/participation
   * @secure
   */
  getMyReviewables = (
    query?: {
      round?: "FIRST" | "SECOND";
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseListCampaignParticipatedResponse, any>({
      path: `/api/campaignReviews/my/participation`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name GetMyReviewableCampaign
   * @summary 리뷰 업로드 가능 정보 조회 - 특정 캠페인의 특정 라운드 또는 전체
   * @request GET:/api/campaignReviews/my/participation/{campaignId}
   * @secure
   */
  getMyReviewableCampaign = (
    campaignId: number,
    query?: {
      round?: "FIRST" | "SECOND";
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseCampaignParticipatedResponse, any>({
      path: `/api/campaignReviews/my/participation/${campaignId}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
