'use client';

import { useRouter } from 'next/navigation';

import LoadingSvg from 'components/loading/loading-svg';

import { useRoleSetup } from '../hooks/useRoleSetup';

export default function GoogleLoginLoading() {
  const router = useRouter();

  useRoleSetup({
    onUserRoleSet: () => {
      router.push('/');
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <LoadingSvg />
      </div>
    </div>
  );
}
