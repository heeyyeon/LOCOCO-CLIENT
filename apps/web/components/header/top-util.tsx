'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { apiRequest } from 'app/api/apiRequest';

import {
  SvgHistory,
  SvgLikeFill,
  SvgLogin,
  SvgMy,
  SvgOpen,
} from '@lococo/icons';
import { cn } from '@lococo/utils';

interface TopUtilItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const TopUtilItem = ({
  icon,
  label,
  onClick,
  disabled = false,
}: TopUtilItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-[3.2rem] cursor-pointer items-center justify-center gap-[0.8rem] whitespace-nowrap px-[1.6rem] py-[1rem] disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {icon}
      <p className="jp-body2 text-gray-600">{label}</p>
    </button>
  );
};

export default function TopUtil({ authStatus }: { authStatus: boolean }) {
  const router = useRouter();
  const [loginLabel, setLoginLabel] = useState('ログイン');

  useEffect(() => {
    if (authStatus) {
      setLoginLabel('ログアウト');
    } else {
      setLoginLabel('ログイン');
    }
  }, [authStatus]);

  const handleAuthClick = async () => {
    if (authStatus) {
      try {
        await apiRequest({ endPoint: '/api/auth/logout', method: 'POST' });
        router.refresh();
      } catch {
        alert('ログアウトに失敗しました');
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <nav
      className={cn(
        'flex w-full items-center justify-end self-stretch overflow-hidden px-[11.9rem] py-[2rem] transition-all duration-300 ease-out'
      )}
    >
      <TopUtilItem
        icon={<SvgMy className="text-gray-600" size={16} />}
        label="マイページ"
        onClick={() => console.log('마이페이지 클릭')}
        disabled={true}
      />
      <TopUtilItem
        icon={<SvgLikeFill className="text-gray-600" size={16} />}
        label="お気に入り"
        onClick={() => console.log('좋아요 클릭')}
        disabled={true}
      />
      <TopUtilItem
        icon={<SvgHistory className="text-gray-600" size={16} />}
        label="最近見た商품"
        onClick={() => console.log('내역 클릭')}
        disabled={true}
      />
      <TopUtilItem
        icon={
          authStatus ? (
            <SvgOpen className="fill-gray-600" size={16} />
          ) : (
            <SvgLogin className="text-gray-600" size={16} />
          )
        }
        label={loginLabel}
        onClick={handleAuthClick}
      />
    </nav>
  );
}
