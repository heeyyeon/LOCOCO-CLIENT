'use server';

import { getServerCookie } from './cookie';

export async function checkIsLoggedIn() {
  const isUserAccessToken = await getServerCookie('AccessToken');
  if (!isUserAccessToken) {
    return false;
  } else {
    return true;
  }
}
