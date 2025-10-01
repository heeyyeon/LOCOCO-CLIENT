'use server';

import { cookies } from 'next/headers';

import { getServerCookie } from './cookie';

export async function checkIsLoggedIn() {
  const isUserAccessToken = await getServerCookie('AccessToken');
  if (!isUserAccessToken) {
    return false;
  } else {
    return true;
  }
}

export async function deleteServerCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('AccessToken');
}
