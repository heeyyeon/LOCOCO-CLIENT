import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductBrandNames } from '../api';
import { ApiResponseProductBrandNameListResponse } from '../../../../web/swagger-codegen/data-contracts';

export const useProductBrandNames = (
  startsWith?: string
): UseQueryResult<ApiResponseProductBrandNameListResponse, Error> => {
  return useQuery<ApiResponseProductBrandNameListResponse, Error>({
    queryKey: ['productBrandNames', startsWith],
    queryFn: () => getProductBrandNames(startsWith),
  });
};