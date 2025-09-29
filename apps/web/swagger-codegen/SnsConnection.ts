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
  ApiResponseInstagramConnectionResponse,
  ApiResponseString,
  ApiResponseTikTokConnectionResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class SnsConnection<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SNS_CONNECTION
   * @name ConnectTikTok
   * @summary TikTok 계정 연동 / TikTok OAuth 인증 페이지로 리다이렉트
   * @request GET:/api/auth/sns/tiktok/connect
   * @secure
   */
  connectTikTok = (params: RequestParams = {}) =>
    this.request<ApiResponseString, any>({
      path: `/api/auth/sns/tiktok/connect`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SNS_CONNECTION
   * @name HandleTikTokCallback
   * @summary TikTok OAuth 콜백 / 인증 후 콜백을 처리 및 계정 연결
   * @request GET:/api/auth/sns/tiktok/callback
   * @secure
   */
  handleTikTokCallback = (
    query: {
      code: string;
      state: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseTikTokConnectionResponse, any>({
      path: `/api/auth/sns/tiktok/callback`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SNS_CONNECTION
   * @name ConnectInstagram
   * @summary Instagram 계정 연동 / Creator가 Instagram OAuth 인증 페이지로 리다이렉트
   * @request GET:/api/auth/sns/instagram/connect
   * @secure
   */
  connectInstagram = (params: RequestParams = {}) =>
    this.request<ApiResponseString, any>({
      path: `/api/auth/sns/instagram/connect`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SNS_CONNECTION
   * @name HandleInstagramCallback
   * @summary Instagram OAuth 콜백 / 인증 후 code로 액세스 토큰 교환 및 계정 연결
   * @request GET:/api/auth/sns/instagram/callback
   * @secure
   */
  handleInstagramCallback = (
    query: {
      code: string;
      state: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseInstagramConnectionResponse, any>({
      path: `/api/auth/sns/instagram/callback`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
}
