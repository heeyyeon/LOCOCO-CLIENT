'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAuth } from 'hooks/use-auth';
import { Link, useRouter } from 'i18n/navigation';

import { SvgProfileIcon } from '@lococo/icons';

import {
  type UserRole,
  saveRoleToLocalStorage,
} from '../../app/[locale]/(with-layout)/login-google/utils/role-storage';
import { SelectRoleModal } from '../sign-up/select-role-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuthInfo } from './hooks/useAuthInfo';

export default function GnbAuth() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('gnb');

  const { data: userInfo } = useAuthInfo({
    enabled: isLoggedIn === true,
  });

  const handleSignup = () => {
    setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (role: 'creator' | 'brand' | 'user') => {
    const roleMapping: Record<string, UserRole> = {
      creator: 'CREATOR',
      brand: 'BRAND',
      user: 'CUSTOMER',
    };

    const selectedRole = roleMapping[role];
    if (selectedRole) {
      saveRoleToLocalStorage(selectedRole);
      setIsRoleModalOpen(false);
      router.push('/login-google?mode=signup');
    }
  };

  const handleRouteMyPage = () => {
    if (!userInfo || userInfo?.role === 'PENDING') {
      setIsRoleModalOpen(true);
      return;
    }

    if (userInfo?.role === 'BRAND') {
      router.push('/brand/campaign');
    } else if (userInfo?.role === 'CREATOR') {
      router.push('/my-page/my-campaign');
    } else if (userInfo?.role === 'CUSTOMER') {
      router.push('/my-page/my-campaign');
    }
  };

  return (
    <div className="flex h-[5.6rem] items-center gap-4">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="relative">
            <button className="flex h-[5.6rem] cursor-pointer items-center gap-[1rem] px-[1rem] py-[1.6rem] text-black">
              <SvgProfileIcon size={32} />
              <span>{userInfo?.displayName}</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="body4 mt-[0.4rem] w-[var(--radix-dropdown-menu-trigger-width)] font-[500]"
          >
            <DropdownMenuItem onClick={handleRouteMyPage}>
              {t('myPage')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>{t('logOut')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            href={'/login-google?mode=login'}
            className="body1 px-[1.6rem] py-[1rem] font-[700]"
          >
            {t('login')}
          </Link>
          <button
            onClick={handleSignup}
            className="body1 cursor-pointer px-[1.6rem] py-[1rem] font-[700] text-pink-500"
          >
            {t('signUp')}
          </button>
        </>
      )}

      <SelectRoleModal
        open={isRoleModalOpen}
        onOpenChange={setIsRoleModalOpen}
        onSelectRole={handleRoleSelect}
      />
    </div>
  );
}
