'use server';

import { getCookie } from 'utils/client-cookie';

export async function checkIsLoggedIn() {
  const isUserAccessToken = await getCookie('AccessToken');
  if (!isUserAccessToken) {
    return false;
  } else {
    return true;
  }
}
