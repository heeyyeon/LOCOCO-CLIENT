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

import { ApiResponseProductBrandNameListResponse } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class ProductBrand<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags PRODUCT BRAND
   * @name GetProductBrandNames
   * @summary 상품 브랜드 이름 리스트 조회 (전체 / A~Z / 0)
   * @request GET:/api/product-brand
   * @secure
   */
  getProductBrandNames = (
    query?: {
      startsWith?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseProductBrandNameListResponse, any>({
      path: `/api/product-brand`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
