import { Suspense } from 'react';
import SearchPageClient from './page.client';

export default function Page() {
  return (
    <Suspense fallback={<div className="h-full w-full bg-white" />}>
      <SearchPageClient />
    </Suspense>
  );
}
