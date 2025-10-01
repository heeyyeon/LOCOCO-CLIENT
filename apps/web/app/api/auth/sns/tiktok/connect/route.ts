import { NextRequest, NextResponse } from 'next/server';

import { getServerCookie } from 'utils/action/cookie';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo');

    const accessToken = await getServerCookie('AccessToken');
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    if (!backendUrl) {
      throw new Error('API 서버 URL이 설정되지 않았습니다.');
    }

    const connectUrl = new URL(`${backendUrl}/api/auth/sns/tiktok/connect`);
    if (returnTo) {
      connectUrl.searchParams.set('returnTo', returnTo);
    }

    const response = await fetch(connectUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
    });

    if (response.status === 302 || response.status === 307) {
      const location = response.headers.get('location');
      if (location) {
        return NextResponse.redirect(location);
      }
    }

    throw new Error(`백엔드 요청 실패: ${response.status}`);
  } catch {
    return NextResponse.json(
      { error: 'TikTok 연결 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
