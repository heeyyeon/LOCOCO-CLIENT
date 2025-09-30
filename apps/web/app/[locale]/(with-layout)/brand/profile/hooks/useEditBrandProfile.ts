import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BrandMyPageUpdateRequest } from '@typescript-swagger/data-contracts';

import { patchBrandProfile } from '../api';

export const useEditBrandProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BrandMyPageUpdateRequest) => patchBrandProfile(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['brand', 'profile'] });
    },
    onError: () => {},
  });
};
