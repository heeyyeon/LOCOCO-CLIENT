import { getCookie } from 'utils/client-cookie';

export async function getUserStatus() {
  const isUserAccessToken = !!(await getCookie('AccessToken'));
  if (isUserAccessToken) {
    return true;
  } else {
    return false;
  }
}
