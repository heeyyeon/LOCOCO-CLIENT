import { queryOptions } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { PRODUCT_KEYS } from 'constants/query-key';
import { ApiResponseProductBrandInfoListResponse } from 'swagger-codegen/data-contracts';

interface GetProductsByBrandNameProps {
  productBrandName?: string;
  page?: number;
  size?: number;
}

export function getProductsByBrandName({
  productBrandName,
  page = 0,
  size = 12,
}: GetProductsByBrandNameProps = {}) {
  return queryOptions<ApiResponseProductBrandInfoListResponse>({
    queryKey: PRODUCT_KEYS.BRAND_LIST({
      productBrandName,
      page,
      size,
    }),
    queryFn: () =>
      apiRequest<ApiResponseProductBrandInfoListResponse>({
        endPoint: '/api/product-brand/products',
        method: 'GET',
        params: {
          ...(productBrandName && { productBrandName }),
          page: page.toString(),
          size: size.toString(),
        },
      }),
  });
}
