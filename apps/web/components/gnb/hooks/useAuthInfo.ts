import { useQuery } from '@tanstack/react-query';

import { getUserInfoForHeader } from '../api';

interface UseAuthInfoOptions {
  enabled?: boolean;
}

export const useAuthInfo = (options?: UseAuthInfoOptions) => {
  return useQuery({
    queryKey: ['auth', 'userInfo'],
    queryFn: getUserInfoForHeader,
    enabled: options?.enabled ?? true,
  });
};
