'use server';

import { getCookie } from 'utils/cookie';

export async function isLogin() {
  const isUserAccessToken = await getCookie('AccessToken');
  if (!isUserAccessToken) {
    return false;
  } else {
    return true;
  }
}
