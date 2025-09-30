import { useMutation } from '@tanstack/react-query';
import { BrandMyPageUpdateRequest } from '@typescript-swagger/data-contracts';

import { patchBrandProfile } from '../api';

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: BrandMyPageUpdateRequest) => patchBrandProfile(data),
    onSuccess: () => {},
    onError: () => {},
  });
};
