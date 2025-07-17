'use client';

import { useQuery } from '@tanstack/react-query';
import LoadingSvg from 'components/loading/loading-svg';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { lineLogin } from '../apis';
import { LINE_LOGIN_QUERY_KEYS } from '../queries/queries';

export default function LineLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';
  const lineLoginRedirectURL =
    process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URL || '';

  const { isSuccess } = useQuery({
    queryKey: LINE_LOGIN_QUERY_KEYS.LINE_LOGIN(
      code,
      state,
      lineLoginRedirectURL
    ),
    queryFn: () => lineLogin({ code, state, lineLoginRedirectURL }),
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSvg />
    </div>
  );
}
