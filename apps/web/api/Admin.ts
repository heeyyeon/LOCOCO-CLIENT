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

import { ApiResponseVoid } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";
=======
import { ApiResponseVoid } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ADMIN
   * @name DeleteReviewByAdmin
<<<<<<< HEAD
=======
   * @summary 어드민 리뷰 삭제
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
   * @request DELETE:/api/admin/reviews/{reviewId}
   * @secure
   */
  deleteReviewByAdmin = (
    reviewId: number,
    query: {
      /** @format int64 */
      userId: number;
    },
<<<<<<< HEAD
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/reviews/${reviewId}`,
      method: "DELETE",
=======
    params: RequestParams = {}
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/admin/reviews/${reviewId}`,
      method: 'DELETE',
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      query: query,
      secure: true,
      ...params,
    });
}
