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

import { ApiResponseVoid } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
