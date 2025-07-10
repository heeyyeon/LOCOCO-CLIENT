'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type NewParamsType = { [key: string]: string };

export default function useCustomSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsRaw = useSearchParams();
  let searchParams = new URLSearchParams(searchParamsRaw.toString());

  const setNewParams = (newParams: NewParamsType) => {
    for (const [key, value] of Object.entries(newParams)) {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
    }
    return searchParams.toString();
  };

  const setSearchParams = (newParams: NewParamsType) => {
    return router.push(`${pathname}?${setNewParams(newParams)}`);
  };

  const resetSearchParams = () => {
    searchParams = new URLSearchParams();
    return router.push(pathname);
  };

  return {
    setSearchParams,
    resetSearchParams,
  };
}
