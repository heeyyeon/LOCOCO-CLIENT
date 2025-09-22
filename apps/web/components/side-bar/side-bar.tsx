'use client';

import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { MenuItem } from 'app/[locale]/(with-layout)/brand/layout';
import { useRouter } from 'i18n/navigation';

import { InfoChip } from '@lococo/design-system/info-chip';
import { Tab, TabContainer } from '@lococo/design-system/tab';
import { SvgAvatar } from '@lococo/icons';

interface SideBarProps {
  name?: string;
  email?: string;
  level?: string;
  profileImage?: string;
  instagram?: string;
  menus: MenuItem[];
}

export default function SideBar({
  profileImage,
  name,
  email,
  instagram,
  level,
  menus,
}: SideBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMenu = searchParams.get('tab') || 'campaign';

  const handleClickTab = (item: MenuItem) => {
    router.push(`?tab=${item.value}`);
  };
  return (
    <div className="flex w-auto flex-col items-start gap-[1.6rem] pl-[11.9rem] pt-[1.6rem]">
      {profileImage ? (
        <Image
          src={profileImage}
          alt="profile"
          className="rounded-full"
          width={98}
          height={98}
        />
      ) : (
        <SvgAvatar size={98} className="rounded-full" />
      )}
      <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
        <p className="title2 no-wrap text-nowrap text-gray-800">{name}</p>
        <p className="caption2 text-gray-800">{email}</p>
        <p className="caption2 text-gray-800">{instagram}</p>
        {level && <InfoChip text={level} color="default" size="md" icon />}
      </div>
      <div className="h-[1px] w-full bg-gray-400" />

      <nav>
        <TabContainer variant="vertical" className="flex w-full items-start">
          {menus.map((menu) => (
            <Tab
              key={menu.value}
              label={menu.label}
              value={menu.value}
              selected={activeMenu === menu.value}
              className="p-0"
              onClick={() => handleClickTab(menu)}
            />
          ))}
        </TabContainer>
      </nav>
    </div>
  );
}
