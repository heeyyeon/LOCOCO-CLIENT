import { apiRequest } from '../../../../../api/apiRequest';
import {
  CreatorRegisterRequest,
  CreatorRegisterResponse,
} from '../types/creator-form';

export const registerCreatorInfo = async (
  data: CreatorRegisterRequest
): Promise<CreatorRegisterResponse> => {
  return apiRequest<CreatorRegisterResponse>({
    endPoint: '/api/creator/register/info',
    method: 'PATCH',
    data,
  });
};
