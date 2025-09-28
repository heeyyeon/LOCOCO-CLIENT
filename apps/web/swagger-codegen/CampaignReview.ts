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
   * @name GetMyReviewables
   * @summary 리뷰 업로드 가능한 정보 조회 - 크리에이터가 참여중인 캠페인 관련 정보 조회 (리스트 반환)
   * @request GET:/api/campaignReviews/my/participation
   * @secure
   */
  getMyReviewables = (params: RequestParams = {}) =>
    this.request<ApiResponseListCampaignParticipatedResponse, any>({
      path: `/api/campaignReviews/my/participation`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags CAMPAIGN REVIEW
   * @name GetMyReviewableCampaign
   * @summary 리뷰 업로드 가능 정보 단건 조회 - 크리에이터가 참여 중인 특정 캠페인
   * @request GET:/api/campaignReviews/my/participation/{campaignId}
   * @secure
   */
  getMyReviewableCampaign = (campaignId: number, params: RequestParams = {}) =>
    this.request<ApiResponseCampaignParticipatedResponse, any>({
      path: `/api/campaignReviews/my/participation/${campaignId}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
