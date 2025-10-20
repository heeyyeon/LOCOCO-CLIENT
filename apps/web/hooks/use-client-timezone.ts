'use client';

import { useEffect, useState } from 'react';

/**
 * 클라이언트에서만 안전하게 timezone을 감지하는 훅
 * SSR과 hydration mismatch를 방지합니다.
 */
export function useClientTimeZone(): string {
  const [timeZone, setTimeZone] = useState<string>('UTC');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 클라이언트에서 hydration이 완료된 후에만 실행
    setIsHydrated(true);

    try {
      const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(detectedTimeZone);
    } catch (error) {
      console.warn('Failed to detect timezone, falling back to UTC:', error);
      setTimeZone('UTC');
    }
  }, []);

  // hydration이 완료되지 않았으면 UTC 반환 (SSR 일치)
  return isHydrated ? timeZone : 'UTC';
}
