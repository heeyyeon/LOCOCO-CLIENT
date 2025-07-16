import { getCookie } from 'utils/cookie';

export async function getAuthStatus() {
  const isUserAccessToken = await getCookie('AccessToken');
  if (isUserAccessToken) {
    return { userToken: isUserAccessToken };
  }
}
