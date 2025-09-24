import { apiRequest } from 'app/api/apiRequest';

import type {
  DuplicateCheckResponse,
  DuplicateCheckResult,
} from '../types/duplicate-check';

export const checkIdAvailability = async (
  id: string
): Promise<DuplicateCheckResult> => {
  const response = await apiRequest<DuplicateCheckResponse>({
    endPoint: '/api/user/check-id',
    method: 'GET',
    params: { userId: id },
  });

  return {
    success: response.success,
  };
};
