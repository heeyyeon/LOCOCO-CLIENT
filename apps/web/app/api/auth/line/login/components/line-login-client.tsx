'use client';

import { useQuery } from '@tanstack/react-query';
import { Auth } from 'api/Auth';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LINE_LOGIN_QUERY_KEYS } from '../queries/queries';

export default function LineLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  const auth = new Auth();
  const { isSuccess } = useQuery({
    queryKey: LINE_LOGIN_QUERY_KEYS.LINE_LOGIN(code, state),
    queryFn: () => auth.lineLogin({ code, state }),
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  return <div>...</div>;
}
