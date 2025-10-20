'use client';

import React, { useEffect, useState } from 'react';

import { NextIntlClientProvider } from 'next-intl';

interface NextIntlClientProviderProps {
  children: React.ReactNode;
  locale: string;
}

export default function NextIntlClientCustomizedProvider({
  children,
  locale,
}: NextIntlClientProviderProps) {
  const [timeZone, setTimeZone] = useState<string>('UTC');

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timeZone);
    setTimeZone(timeZone);
  }, []);

  return (
    <NextIntlClientProvider locale={locale} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
