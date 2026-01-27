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
  AdminCampaignCreateRequest,
  AdminLoginRequest,
  AdminProductCreateRequest,
  ApiResponseAdminCampaignBasicResponse,
  ApiResponseAdminCampaignListResponse,
  ApiResponseAdminCreatorListResponse,
  ApiResponseAdminLoginResponse,
  ApiResponseAdminProductCreateResponse,
  ApiResponseCampaignBasicResponse,
  ApiResponseProductImageResponse,
  ApiResponseVoid,
  ApproveCampaignIdsRequest,
  ApproveCreatorsRequest,
  CampaignModifyRequest,
  DeleteCampaignIdsRequest,
  DeleteCreatorsRequest,
  ProductImagePresignedUrlRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ADMIN
   * @name CreateProductImagePresignedUrl
   * @summary 어드민 상품 이미지 업로드용 presignedUrl 발급
   * @request POST:/api/admin/products/images
   * @secure
   */
  createProductImagePresignedUrl = (
    data: ProductImagePresignedUrlRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseProductImageResponse, any>({
      path: `/api/admin/products/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name CreateProduct
   * @summary 어드민 상품 등록
   * @request POST:/api/admin/product
   * @secure
   */
  createProduct = (
    data: AdminProductCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseAdminProductCreateResponse, any>({
      path: `/api/admin/product`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name Login
   * @summary 어드민 로그인
   * @request POST:/api/admin/login
   * @secure
   */
  login = (data: AdminLoginRequest, params: RequestParams = {}) =>
    this.request<ApiResponseAdminLoginResponse, any>({
      path: `/api/admin/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name ApproveCreators
   * @summary 어드민 크리에이터 승인 - 복수 승인 가능
   * @request POST:/api/admin/creators/approval
   * @secure
   */
  approveCreators = (
    data: ApproveCreatorsRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/creators/approval`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name GetAllCampaigns
   * @summary 어드민 - 전체 캠페인 리스트 조회(페이지네이션)
   * @request GET:/api/admin/campaigns
   * @secure
   */
  getAllCampaigns = (
    query?: {
      status?: "PENDING" | "APPROVED";
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseAdminCampaignListResponse, any>({
      path: `/api/admin/campaigns`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name CreateCampaignForAdmin
   * @summary 어드민 - 캠페인 생성
   * @request POST:/api/admin/campaigns
   * @secure
   */
  createCampaignForAdmin = (
    data: AdminCampaignCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseCampaignBasicResponse, any>({
      path: `/api/admin/campaigns`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name DeleteCampaigns
   * @summary 어드민 캠페인 삭제(soft delete) - 복수 삭제 가능
   * @request DELETE:/api/admin/campaigns
   * @secure
   */
  deleteCampaigns = (
    data: DeleteCampaignIdsRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/campaigns`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name ApproveCampaign
   * @summary 어드민 캠페인 신청 승인
   * @request POST:/api/admin/campaigns/{campaignId}/approval
   * @secure
   */
  approveCampaign = (campaignId: number, params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/campaigns/${campaignId}/approval`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name ApproveCampaigns
   * @summary 어드민 캠페인 신청 승인 - 복수 승인 가능
   * @request POST:/api/admin/campaigns/approval
   * @secure
   */
  approveCampaigns = (
    data: ApproveCampaignIdsRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/campaigns/approval`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name GetCampaignDetail
   * @summary 발행한 캠페인 정보 단건 조회(수정 페이지 진입 시 정보 반환 용)
   * @request GET:/api/admin/campaigns/{campaignId}
   * @secure
   */
  getCampaignDetail = (campaignId: number, params: RequestParams = {}) =>
    this.request<ApiResponseAdminCampaignBasicResponse, any>({
      path: `/api/admin/campaigns/${campaignId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name ModifyCampaign
   * @summary 어드민 - 캠페인 수정
   * @request PATCH:/api/admin/campaigns/{campaignId}
   * @secure
   */
  modifyCampaign = (
    campaignId: number,
    data: CampaignModifyRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/campaigns/${campaignId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name GetAllCreators
   * @summary 어드민 - 전체 크리에이터 리스트 조회(페이지네이션)
   * @request GET:/api/admin/creators
   * @secure
   */
  getAllCreators = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseAdminCreatorListResponse, any>({
      path: `/api/admin/creators`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ADMIN
   * @name InactivateCreators
   * @summary 어드민 크리에이터 삭제 - 복수 삭제 가능
   * @request DELETE:/api/admin/creators
   * @secure
   */
  inactivateCreators = (
    data: DeleteCreatorsRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/creators`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
