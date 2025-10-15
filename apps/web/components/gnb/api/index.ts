import { ApiResponseAfterLoginUserNameResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getUserInfoForHeader = async () => {
  const response = await apiRequest<ApiResponseAfterLoginUserNameResponse>({
    endPoint: '/api/user/name',
  });
  return response.data;
};
