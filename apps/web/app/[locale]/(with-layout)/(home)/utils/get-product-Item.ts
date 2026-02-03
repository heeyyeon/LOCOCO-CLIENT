import { queryOptions } from '@tanstack/react-query';
import {
  ApiResponseNewProductsByCategoryResponse,
  ApiResponsePopularProductsByCategoryResponse,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';
import { PRODUCT_KEYS } from 'constants/query-key';
import { MainProductsCategoryKey } from 'constants/tab-category';

interface GetPopularProductsByCategoryProps {
  productCategory?: MainProductsCategoryKey;
}

interface GetNewProductsByCategoryProps {
  productCategory?: MainProductsCategoryKey;
}

export function getPopularProductsByCategory({
  productCategory,
}: GetPopularProductsByCategoryProps) {
  return queryOptions<ApiResponsePopularProductsByCategoryResponse>({
    queryKey: [...PRODUCT_KEYS.BEST_PRODUCTS(), 'popular', productCategory],
    queryFn: () =>
      apiRequest<ApiResponsePopularProductsByCategoryResponse>({
        endPoint: `/api/products/categories/popular`,
        method: 'GET',
        params: productCategory ? { productCategory } : undefined,
      }),
  });
}

export function getNewProductsByCategory({
  productCategory,
}: GetNewProductsByCategoryProps) {
  return queryOptions<ApiResponseNewProductsByCategoryResponse>({
    queryKey: [...PRODUCT_KEYS.NEW_PRODUCTS(), 'new', productCategory],
    queryFn: () =>
      apiRequest<ApiResponseNewProductsByCategoryResponse>({
        endPoint: `/api/products/categories/new`,
        method: 'GET',
        params: productCategory ? { productCategory } : undefined,
      }),
  });
}
