import React from 'react';

import Image from 'next/image';

import { Button } from '@lococo/design-system/button';
import { InfoChip } from '@lococo/design-system/info-chip';
import { SvgAvatar } from '@lococo/icons';

interface SideBarProps {
  profileImage?: string;
  name?: string;
  email?: string;
  instagram?: string;
  level?: string;
  menus: string[];
  activeMenu: string;
  handleClickTab: (tab: string) => void;
}

export default function SideBar({
  activeMenu,
  handleClickTab,
  profileImage,
  name,
  email,
  instagram,
  level,
  menus,
}: SideBarProps) {
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

      <div className="align-self-stretch flex flex-col items-start justify-start">
        {menus.map((item) => (
          <Button
            key={item}
            variant="text"
            color={activeMenu === item ? 'primary' : 'secondary'}
            size="md"
            className="px-0"
            onClick={() => handleClickTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
