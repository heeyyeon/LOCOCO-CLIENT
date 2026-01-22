'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@lococo/design-system/button';
import { Input } from '@lococo/design-system/input';
import { useRouter } from 'next/navigation';
import { setClientCookie } from '../utils/client-cookie';

type LoginRequest = {
  loginId: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: number;
    role: string;
  };
};

async function loginAdmin(body: LoginRequest): Promise<LoginResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
  if (!backendUrl) {
    throw new Error('API 서버 URL이 설정되지 않았습니다.');
  }

  const res = await fetch(`${backendUrl}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // CORS 쿠키 전송을 위해 필요
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('관리자 로그인에 실패했습니다.');
  }

  return res.json();
}

export default function HomePage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) => loginAdmin(payload),
    onSuccess: (data: LoginResponse) => {
      // 응답 body에서 받은 토큰을 쿠키로 저장
      // 개발 환경: Domain=localhost, Secure=false, SameSite=Lax
      // 운영 환경에서는 백엔드에서 Set-Cookie 헤더로 처리하되, Secure/SameSite 설정 조정 필요
      if (data.data?.accessToken) {
        setClientCookie('AccessToken', data.data.accessToken, {
          maxAge: 604800, // 7일
          path: '/',
          domain: 'lococo.beauty', // 개발 환경
          secure: false, // 개발 환경에서는 false (HTTP)
          sameSite: 'Lax', // 개발 환경에서는 Lax
        });
      }

      if (data.data?.refreshToken) {
        setClientCookie('RefreshToken', data.data.refreshToken, {
          maxAge: 604800 * 2, // 14일
          path: '/',
          domain: 'lococo.beauty',
          secure: false,
          sameSite: 'Lax',
        });
      }

      router.push('/main');
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ loginId, password });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-9 bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-semibold">LOCOCO Admin</h1>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            color="primary"
            variant="filled"
            size="md"
            rounded="md"
            fontType="InterBody1"
            disabled={loginMutation.isPending}
            onClick={handleLogin}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </div>
      </div>
    </main>
  );
}



