import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'i18n/navigation';
import { createProduct } from '../api';
import { 
  AdminProductCreateRequest,
  ApiResponseAdminProductCreateResponse 
} from 'swagger-codegen/data-contracts';

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
        router.push('/brand/product-registration');
      }
    },
    onError: (error) => {
      console.error('상품 등록 실패:', error);
    },
  });
};