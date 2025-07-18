import { Suspense } from 'react';
import { getUserStatus } from '../(home)/utils/getUserStatus';
import SearchPageClient from './page.client';

export default async function Page() {
  const isUserLogin = await getUserStatus();
  return (
    <Suspense fallback={<div className="h-full w-full bg-white" />}>
      <SearchPageClient authStatus={isUserLogin} />
    </Suspense>
  );
}
