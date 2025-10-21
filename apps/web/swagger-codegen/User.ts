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
  ApiResponseAfterLoginUserNameResponse,
  ApiResponseVoid,
  UserIdCheckRequest,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags USER
   * @name GetUserDisplayName
   * @summary 로그인한 사용자의 이름을 표시하는 API입니다.
   * @request GET:/api/user/name
   * @secure
   */
  getUserDisplayName = (params: RequestParams = {}) =>
    this.request<ApiResponseAfterLoginUserNameResponse, any>({
      path: `/api/user/name`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags USER
   * @name CheckUserId
   * @summary 사용자 ID 중복 체크 (Customer/Creator 공통)
   * @request GET:/api/user/check-id
   * @secure
   */
  checkUserId = (
    query: {
      request: UserIdCheckRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/user/check-id`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
