import { useQuery } from '@tanstack/react-query';

import { checkIdAvailability } from '../creator/apis/duplicate-check';
import { CREATOR_KEYS } from './query-keys';

export const useIdAvailability = (id: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: CREATOR_KEYS.ID_AVAILABILITY(id),
    queryFn: () => checkIdAvailability(id),
    enabled: enabled && !!id,
    retry: false,
  });
};
