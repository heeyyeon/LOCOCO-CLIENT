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

import { ApiResponseCategoryProductResponse } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Product<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags PRODUCT
   * @name SearchProductsByCategory
   * @summary 카테고리 별 상품 검색
   * @request GET:/api/products/categories/search
   * @secure
   */
  searchProductsByCategory = (
    query: {
      middleCategoryId: string;
      subCategoryId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseCategoryProductResponse, any>({
      path: `/api/products/categories/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
