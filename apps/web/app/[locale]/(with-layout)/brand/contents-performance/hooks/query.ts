import { useQuery } from '@tanstack/react-query';

import { getContentsPerformance } from '../api';

export const useContentsPerformance = (
  campaignId: string | undefined,
  page: number = 0,
  size: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['contentsPerformance', campaignId, page, size],
    queryFn: () => getContentsPerformance(campaignId, page, size),
    enabled: enabled && !!campaignId,
  });
};
