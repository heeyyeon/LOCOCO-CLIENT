import { NextRequest, NextResponse } from 'next/server';

import { setCookie } from 'utils/action/cookie';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 TikTok 콜백 API Route 호출됨');

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    console.log('📋 콜백 파라미터:', { code: !!code, state, error });

    // 에러 처리
    if (error) {
      console.error('TikTok OAuth 에러:', error);
      return NextResponse.redirect(
        new URL(`/my-page?tab=connect-sns&error=${error}`, request.url)
      );
    }

    // 코드가 없으면 에러
    if (!code) {
      return NextResponse.redirect(
        new URL('/my-page?tab=connect-sns&error=no_code', request.url)
      );
    }

    // 백엔드 API 서버로 콜백 처리 요청
    const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    if (!backendUrl) {
      throw new Error('API 서버 URL이 설정되지 않았습니다.');
    }

    const callbackUrl = new URL(`${backendUrl}/api/auth/tiktok/callback`);
    callbackUrl.searchParams.set('code', code);
    if (state) callbackUrl.searchParams.set('state', state);

    console.log('🌐 백엔드 콜백 URL:', callbackUrl.toString());

    // 백엔드로 콜백 처리 요청
    const response = await fetch(callbackUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ 백엔드 콜백 처리 실패:', response.status, errorText);
      throw new Error(
        `백엔드 콜백 처리 실패: ${response.status} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log('✅ 백엔드 콜백 결과:', result);

    // 성공 시 프론트엔드로 리다이렉트
    if (result.success) {
      // 토큰 저장 (필요한 경우)
      if (result.data?.accessToken) {
        await setCookie('AccessToken', result.data.accessToken);
        console.log('🍪 AccessToken 저장 완료');
      }

      return NextResponse.redirect(
        new URL('/my-page?tab=connect-sns&success=true', request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/my-page?tab=connect-sns&error=${result.message || 'callback_failed'}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error('TikTok 콜백 오류:', error);
    return NextResponse.redirect(
      new URL('/my-page?tab=connect-sns&error=callback_failed', request.url)
    );
  }
}
