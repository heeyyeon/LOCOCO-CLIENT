import { useQuery } from '@tanstack/react-query';

import { getBrandProfile } from '../api';

export const useBrandProfile = () => {
  return useQuery({
    queryKey: ['brand', 'profile'],
    queryFn: getBrandProfile,
  });
};
