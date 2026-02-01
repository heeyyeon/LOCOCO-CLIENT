import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createProduct } from '../api';
import {
  AdminProductCreateRequest,
  ApiResponseAdminProductCreateResponse,
} from '../../../../web/swagger-codegen/data-contracts';

interface UseProductRegistrationOptions {
  onSuccess?: () => void;
}

export const useProductRegistration = (
  options?: UseProductRegistrationOptions
): UseMutationResult<
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
        options?.onSuccess?.();
        router.push('/product-registration');
      }
    },
    onError: (error) => {
      console.error('상품 등록 실패:', error);
    },
  });
};