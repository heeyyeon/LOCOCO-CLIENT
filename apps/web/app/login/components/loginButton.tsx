'use client';

import { SvgLine } from '@lococo/design-system';

export default function LoginButton() {
  return (
    <button
      type="button"
      className="jp-body1 relative mt-[12rem] flex h-[4.8rem] cursor-pointer items-center rounded-[0.6rem] bg-[#06C755] pl-[5.4rem] pr-[5.4rem] font-bold text-white"
    >
      <span className="absolute left-[2.1rem] flex items-center">
        <SvgLine size={20} />
      </span>
      <span className="flex w-[18.4rem] justify-center">LINEでログイン</span>
    </button>
  );
}
