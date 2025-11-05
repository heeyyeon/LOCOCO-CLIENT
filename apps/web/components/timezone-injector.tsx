// app/[locale]/TimezoneInjector.tsx
'use client';

import { useEffect } from 'react';

// app/[locale]/TimezoneInjector.tsx

// app/[locale]/TimezoneInjector.tsx

// app/[locale]/TimezoneInjector.tsx

export default function TimezoneInjector() {
  useEffect(() => {
    // 브라우저 타임존 감지 후 쿠키 저장
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.cookie = `userTimeZone=${userTimeZone}; path=/; max-age=2592000; Secure;`;
  }, []);

  return null; // UI 없음
}
