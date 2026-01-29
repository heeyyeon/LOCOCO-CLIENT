import { useQuery } from '@tanstack/react-query';
import { getProductBrandNames } from '../api';
import { ApiResponseProductBrandNameListResponse } from 'swagger-codegen/data-contracts';

export const useProductBrandNames = (startsWith?: string) => {
  const { data, isLoading, isError } = useQuery<ApiResponseProductBrandNameListResponse>({
    queryKey: ['productBrandNames', startsWith],
    queryFn: () => getProductBrandNames(startsWith),
  });

  return { data, isLoading, isError };
};