import { useQuery } from '@tanstack/react-query';
import { productApi } from '../api/client';

// 검색바로 검색할 때 사용하는 쿼리
export const useProductSearch = (
  keyword: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['product-search', keyword, page, size],
    queryFn: () =>
      productApi.search({
        keyword,
        searchType: 'PRODUCT',
        page,
        size,
      }),
    enabled: enabled && !!keyword.trim(),
    staleTime: 5 * 60 * 1000,
  });
};

// 리뷰 검색 (비디오)
export const useReviewVideoSearch = (
  keyword: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['review-video-search', keyword, page, size],
    queryFn: () =>
      productApi.search({
        keyword,
        searchType: 'REVIEW',
        mediaType: 'VIDEO',
        page,
        size,
      }),
    enabled: enabled && !!keyword.trim(),
    staleTime: 5 * 60 * 1000,
  });
};

// 리뷰 검색 (이미지)
export const useReviewImageSearch = (
  keyword: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['review-image-search', keyword, page, size],
    queryFn: () =>
      productApi.search({
        keyword,
        searchType: 'REVIEW',
        mediaType: 'IMAGE',
        page,
        size,
      }),
    enabled: enabled && !!keyword.trim(),
    staleTime: 5 * 60 * 1000,
  });
};

// 카테고리별 상품 검색
export const useCategoryProductSearch = (
  middleCategory: string,
  subCategory?: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [
      'category-product-search',
      middleCategory,
      subCategory,
      page,
      size,
    ],
    queryFn: () =>
      productApi.searchProductsByCategory({
        middleCategory: middleCategory as any,
        subCategory: subCategory as any,
        searchType: 'PRODUCT',
        page,
        size,
      }),
    enabled: enabled && !!middleCategory,
    staleTime: 5 * 60 * 1000,
  });
};

// 카테고리별 리뷰 검색 (비디오)
export const useCategoryReviewVideoSearch = (
  middleCategory: string,
  subCategory?: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [
      'category-review-video-search',
      middleCategory,
      subCategory,
      page,
      size,
    ],
    queryFn: () =>
      productApi.searchProductsByCategory({
        middleCategory: middleCategory as any,
        subCategory: subCategory as any,
        searchType: 'REVIEW',
        mediaType: 'VIDEO',
        page,
        size,
      }),
    enabled: enabled && !!middleCategory,
    staleTime: 5 * 60 * 1000,
  });
};

// 카테고리별 리뷰 검색 (이미지)
export const useCategoryReviewImageSearch = (
  middleCategory: string,
  subCategory?: string,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [
      'category-review-image-search',
      middleCategory,
      subCategory,
      page,
      size,
    ],
    queryFn: () =>
      productApi.searchProductsByCategory({
        middleCategory: middleCategory as any,
        subCategory: subCategory as any,
        searchType: 'REVIEW',
        mediaType: 'IMAGE',
        page,
        size,
      }),
    enabled: enabled && !!middleCategory,
    staleTime: 5 * 60 * 1000,
  });
};
