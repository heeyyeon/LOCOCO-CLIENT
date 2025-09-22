import { NextRequest, NextResponse } from 'next/server';

import { setCookie } from '../../../../../utils/action/cookie';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login-google', request.url));
  }

  try {
    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/google/login`
    );
    backendUrl.searchParams.set('code', code);
    if (state) backendUrl.searchParams.set('state', state);

    const response = await fetch(backendUrl.toString(), { method: 'GET' });

    if (response.ok) {
      const authData = await response.json();
      const { accessToken } = authData.data || {};

      if (accessToken) {
        await setCookie('AccessToken', accessToken);

        return NextResponse.redirect(
          new URL('/login-google/loading', request.url)
        );
      }
    }
  } catch {
    // 에러 시 로그인 페이지로 리다이렉트
  }

  return NextResponse.redirect(new URL('/login-google', request.url));
}
