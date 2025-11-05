'use client';

import React, { useEffect, useState } from 'react';

import { NextIntlClientProvider } from 'next-intl';

interface NextIntlClientProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

export default function NextIntlClientCustomizedProvider({
  children,
  locale,
  messages,
}: NextIntlClientProviderProps) {
  const [timeZone, setTimeZone] = useState<string>('UTC');

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setTimeZone(timeZone);
  }, []);

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone={timeZone}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
