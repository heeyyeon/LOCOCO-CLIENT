import { apiRequest } from 'app/api/apiRequest';

import type {
  DuplicateCheckResponse,
  DuplicateCheckResult,
} from '../types/duplicate-check';

export const checkIdAvailability = async (
  id: string
): Promise<DuplicateCheckResult> => {
  try {
    const response = await apiRequest<DuplicateCheckResponse>({
      endPoint: '/api/user/check-id',
      method: 'GET',
      params: { userId: id },
    });

    return { success: response.success };
  } catch (error: unknown) {
    if (typeof error === 'string') {
      try {
        const parsedError = JSON.parse(error);
        if (parsedError.status === 409) {
          return { success: false };
        }
      } catch {
        // JSON 파싱 실패 시 기본 에러 처리
      }
    }
    throw error;
  }
};
