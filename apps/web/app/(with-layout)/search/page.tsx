import { Suspense } from 'react';
import SearchPageClient from './page.client';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
