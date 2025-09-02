import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { origin, pathname } = nextUrl;

  // next-intl 미들웨어 실행하여 locale 처리
  const response = intlMiddleware(req);

  // 지원하지 않는 locale 접근시 default locale로 리다이렉트
  const unsupportedLocale = ['fr', 'ru', 'ja', 'zh'];
  const firstSegment = pathname.split('/')[1]; // 현재 locale
  const pathWithoutLocale = pathname.replace(`/${firstSegment}`, '') || '/';

  if (firstSegment && unsupportedLocale.includes(firstSegment)) {
    const redirectPath = `/${routing.defaultLocale}${pathWithoutLocale}`;
    const redirectUrl = new URL(redirectPath, origin);
    return NextResponse.redirect(redirectUrl);
  }

  const accessTokenCookie = cookies.get('AccessToken');
  const isLoggedIn = accessTokenCookie !== undefined;

  // TODO: 추후 routing을 관리하는 파일로 분리
  // 로그인이 필요한 페이지 (인증이 필요한 페이지) - locale 제외한 경로
  const AUTH_REQUIRED_PATH = ['/product-detail/:productId/write-review'];
  // 로그인 후 접근 불가능한 페이지 - locale 제외한 경로
  const LOGIN_RESTRICTED_PATH = ['/login', '/api/auth/line/login'];

  // 인증이 필요한 페이지 체크
  const isAuthRequired = AUTH_REQUIRED_PATH.some((path) => {
    const regex = new RegExp(path.replace(':productId', '[^/]+'));
    return regex.test(pathWithoutLocale);
  });

  const currentLocale =
    firstSegment && !unsupportedLocale.includes(firstSegment)
      ? firstSegment
      : routing.defaultLocale;

  if (isAuthRequired) {
    if (!isLoggedIn) {
      const loginPath = `/${currentLocale}/login`;
      return NextResponse.redirect(new URL(loginPath, origin));
    } else {
      return NextResponse.next();
    }
  }

  // 로그인한 상태에서 접근할 수 없는 페이지 체크
  const isLoginRestricted = LOGIN_RESTRICTED_PATH.some((pattern) => {
    return pathWithoutLocale === pattern;
  });

  if (isLoginRestricted) {
    if (isLoggedIn) {
      const homePath = `/${currentLocale}`;
      return NextResponse.redirect(new URL(homePath, origin));
    } else {
      return NextResponse.next();
    }
  }

  // next-intl 미들웨어 응답 반환
  return response;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    // 모든 경로에서 실행하되 정적 파일은 제외
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
