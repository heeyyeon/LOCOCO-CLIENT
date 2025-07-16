import { apiRequest } from 'app/api/apiRequest';
import { LineLoginResponse, LineLoginData } from '../types';

export const lineLogin = async ({
  code,
  state,
  lineLoginRedirectURL,
}: {
  code: string;
  state: string;
  lineLoginRedirectURL: string;
}): Promise<LineLoginData> => {
  const response = await apiRequest<LineLoginResponse>({
    endPoint: `/api/auth/line/login?code=${code}&state=${state}&redirectUri=${lineLoginRedirectURL}`,
    method: 'GET',
  });

  if (!response.data) {
    throw new Error('로그인 정보를 가져올 수 없습니다.');
  }

  return response.data;
};
