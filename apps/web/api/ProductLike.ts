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
<<<<<<< HEAD

import { ApiResponseVoid } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";
=======
import { ApiResponseToggleLikeResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';
>>>>>>> f5dd48a (feat: api 연결)
=======

import { ApiResponseToggleLikeResponse } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";
>>>>>>> 55da300 (feat: api 연결)

export class ProductLike<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags PRODUCT LIKE
<<<<<<< HEAD
   * @name ToggleLike
=======
   * @name ToggleLike1
>>>>>>> f5dd48a (feat: api 연결)
   * @summary 상품 좋아요 토글 (추가/취소)
   * @request POST:/api/likes/products/{productId}
   * @secure
   */
<<<<<<< HEAD
  toggleLike = (productId: number, params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/likes/products/${productId}`,
      method: "POST",
=======
  toggleLike1 = (productId: number, params: RequestParams = {}) =>
    this.request<ApiResponseToggleLikeResponse, any>({
      path: `/api/likes/products/${productId}`,
<<<<<<< HEAD
      method: 'POST',
>>>>>>> f5dd48a (feat: api 연결)
=======
      method: "POST",
>>>>>>> 55da300 (feat: api 연결)
      secure: true,
      ...params,
    });
}
