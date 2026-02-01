import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createProduct } from '../api';
import {
  AdminProductCreateRequest,
  ApiResponseAdminProductCreateResponse,
} from '../../../../web/swagger-codegen/data-contracts';

export const useProductRegistration = (): UseMutationResult<
  ApiResponseAdminProductCreateResponse,
  Error,
  AdminProductCreateRequest
> => {
  const router = useRouter();

  return useMutation<
    ApiResponseAdminProductCreateResponse,
    Error,
    AdminProductCreateRequest
  >({
    mutationFn: (data: AdminProductCreateRequest) => createProduct(data),
    onSuccess: (response) => {
      if (response.success) {
        router.push('/product-registration');
      }
    },
    onError: (error) => {
      console.error('상품 등록 실패:', error);
    },
  });
};