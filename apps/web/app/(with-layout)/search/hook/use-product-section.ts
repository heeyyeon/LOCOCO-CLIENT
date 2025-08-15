'use client';

import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { PRODUCT_KEYS } from 'constants/query-key';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';

import { ApiResponseSearchProductsResponse } from '../types/search';

interface UseProductSectionDataProps {
  keyword?: string;
  middleCategory?: CategoryNameEng;
  subCategory?: CategoryOptionEng;
  page?: number;
  size?: number;
  enabled?: boolean;
}

//search바로 상품 검색
export const useProductSearch = ({
  keyword = '',
  page = 0,
  size = 8,
  enabled = true,
}: UseProductSectionDataProps) => {
  return useQuery<ApiResponseSearchProductsResponse>({
    queryKey: [...PRODUCT_KEYS.PRODUCT_LIST({ page, size }), 'search', keyword],
    queryFn: () =>
      apiRequest<ApiResponseSearchProductsResponse>({
        endPoint: `/api/products/search`,
        method: 'GET',
        params: {
          keyword,
          searchType: 'PRODUCT',
          page: page.toString(),
          size: size.toString(),
        },
      }),
    enabled: enabled && !!keyword.trim(),
  });
};

// 카테고리별 상품 검색
export const useCategoryProductSearch = ({
  middleCategory,
  subCategory,
  page = 0,
  size = 8,
  enabled = true,
}: UseProductSectionDataProps) => {
  if (subCategory === 'ALL') {
    subCategory = undefined;
  }

  return useQuery<ApiResponseSearchProductsResponse>({
    queryKey: [
      ...PRODUCT_KEYS.PRODUCT_LIST({ page, size }),
      'category',
      middleCategory,
      subCategory,
    ],
    queryFn: () =>
      apiRequest<ApiResponseSearchProductsResponse>({
        endPoint: `/api/products/categories/search`,
        method: 'GET',
        params: {
          middleCategory: middleCategory ?? '',
          searchType: 'PRODUCT',
          page: page.toString(),
          size: size.toString(),
          ...(subCategory && { subCategory }),
        },
      }),
    enabled: enabled && !!middleCategory,
  });
};

export default function useProductSectionData({
  keyword = '',
  middleCategory,
  subCategory,
  page = 0,
  size = 8,
}: UseProductSectionDataProps) {
  if (keyword) {
    const { data, isPending } = useQuery<ApiResponseSearchProductsResponse>({
      queryKey: [
        ...PRODUCT_KEYS.PRODUCT_LIST({ page, size }),
        'search',
        keyword,
      ],
      queryFn: () =>
        apiRequest<ApiResponseSearchProductsResponse>({
          endPoint: `/api/products/search`,
          method: 'GET',
          params: {
            keyword,
            searchType: 'PRODUCT',
            page: page.toString(),
            size: size.toString(),
          },
        }),
    });
    return { data, isPending };
  } else {
    const { data, isPending } = useQuery<ApiResponseSearchProductsResponse>({
      queryKey: [
        ...PRODUCT_KEYS.PRODUCT_LIST({ page, size }),
        'category',
        middleCategory as CategoryNameEng,
        subCategory as CategoryOptionEng | undefined,
      ],
      queryFn: () => {
        const params: Record<string, string> = {
          middleCategory: middleCategory ?? '',
          searchType: 'PRODUCT',
          page: page.toString(),
          size: size.toString(),
          ...(subCategory && subCategory !== 'ALL' && { subCategory }),
        };

        return apiRequest<ApiResponseSearchProductsResponse>({
          endPoint: `/api/products/categories/search`,
          method: 'GET',
          params,
        });
      },
    });
    return { data, isPending };
  }
}
