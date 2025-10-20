import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requestedLocale = await requestLocale;
  const userTimeZone = (await cookies()).get('userTimeZone')?.value || 'UTC';
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    timeZone: userTimeZone,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
