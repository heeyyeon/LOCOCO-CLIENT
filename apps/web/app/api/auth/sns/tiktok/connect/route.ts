import { NextRequest, NextResponse } from 'next/server';

import { getServerCookie } from 'utils/action/cookie';

export async function GET(request: NextRequest) {
  try {
    console.log('🔗 TikTok 연결 API Route 호출됨');

    // 사용자 인증 확인
    const accessToken = await getServerCookie('AccessToken');
    if (!accessToken) {
      console.log('❌ 인증되지 않은 사용자');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('✅ 인증된 사용자, 백엔드로 요청 전달');

    // 백엔드 API 서버로 fetch 요청 (인증 헤더 포함)
    const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    if (!backendUrl) {
      throw new Error('API 서버 URL이 설정되지 않았습니다.');
    }

    const connectUrl = `${backendUrl}/api/auth/sns/tiktok/connect`;
    console.log('🌐 백엔드 연결 URL:', connectUrl);

    try {
      // 백엔드로 fetch 요청 (Authorization 헤더 포함)
      const response = await fetch(connectUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        redirect: 'manual', // 수동 리다이렉트 처리
      });

      console.log('📡 백엔드 응답 상태:', response.status);

      if (response.status === 302 || response.status === 307) {
        // 리다이렉트 응답인 경우 Location 헤더에서 URL 추출
        const location = response.headers.get('location');
        if (location) {
          console.log('🔄 리다이렉트 URL:', location);

          // ⚠️ ngrok URL 체크
          if (location.includes('ngrok')) {
            console.error(
              '🚨 경고: 백엔드가 ngrok URL로 리다이렉트하려고 합니다!'
            );
            console.error(
              '🔧 백엔드의 TIKTOK_REDIRECT_URI 환경 변수를 확인하세요.'
            );
            console.error('📍 현재 리다이렉트 URL:', location);
          }

          return NextResponse.redirect(location);
        }
      }

      // 다른 응답인 경우 에러 처리
      const errorText = await response.text();
      console.error('❌ 백엔드 응답 오류:', response.status, errorText);
      throw new Error(`백엔드 요청 실패: ${response.status}`);
    } catch (error) {
      console.error('❌ 백엔드 요청 중 오류:', error);
      throw error;
    }
  } catch (error) {
    console.error('TikTok 연결 오류:', error);
    return NextResponse.json(
      { error: 'TikTok 연결 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
