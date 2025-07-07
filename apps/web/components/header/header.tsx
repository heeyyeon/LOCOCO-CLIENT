import React from 'react';
import {
  SvgHistory,
  SvgLikeFill,
  SvgLogin,
  SvgLogo,
  SvgMy,
  SvgSearch,
} from '@lococo/design-system';
import { HEADER_MENUS } from '../../app/constants/header';

export default function Header() {
  return (
    <div className="sticky top-0 flex h-[13.6rem] w-[136.6rem] flex-col">
      <TopUtil />
      <Gnb />
    </div>
  );
}

function TopUtil() {
  return (
    <div className="flex h-[7.2rem] w-full bg-white pb-[2rem] pl-[11.9rem] pr-[11.9rem] pt-[2rem] text-gray-600">
      <SvgMy />
      <SvgLikeFill />
      <SvgHistory />
      <SvgLogin />
    </div>
  );
}

function Gnb() {
  return (
    <div className="flex h-[6.4rem] w-[136.6rem] gap-[2rem] border-b border-b-[0.1rem] px-[11.9rem]">
      <SvgLogo className="h-[2.7rem] w-[16rem]" />
      <div className="flex h-[6rem] w-full">
        {HEADER_MENUS.map((menu) => (
          <div className="text-jp-title2 flex h-[6rem] w-[13.6rem] gap-[1rem] pb-[1rem] pl-[3.2rem] pr-[3.2rem] pt-[1rem] font-bold">
            {menu.title}
          </div>
        ))}
      </div>
      <div className="h-[6.4rem] w-[6.4rem] p-[1.4rem]">
        <SvgSearch />
      </div>
    </div>
  );
}
