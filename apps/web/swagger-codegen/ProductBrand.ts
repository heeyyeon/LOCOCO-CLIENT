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
  ApiResponseProductBrandInfoListResponse,
  ApiResponseProductBrandNameListResponse,
} from "./data-contracts";
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
  /**
   * No description
   *
   * @tags PRODUCT BRAND
   * @name GetProductsByBrandName
   * @summary 브랜드 이름으로 상품 목록 조회 (페이지네이션, 리뷰 많은 순)
   * @request GET:/api/product-brand/products
   * @secure
   */
  getProductsByBrandName = (
    query?: {
      productBrandName?: string;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 12
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseProductBrandInfoListResponse, any>({
      path: `/api/product-brand/products`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
