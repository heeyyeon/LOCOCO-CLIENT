export function getClientCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function setClientCookie(
  name: string,
  value: string,
  options?: {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  }
): void {
  if (typeof document === 'undefined') return;

  const {
    maxAge = 604800, // 7일 (초 단위)
    path = '/',
    domain,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    secure = false, // 개발 환경에서는 false
    sameSite = 'Lax', // 개발 환경에서는 Lax
  } = options || {};

  let cookieString = `${name}=${value}; path=${path}`;

  if (maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

export function deleteClientCookie(name: string): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

