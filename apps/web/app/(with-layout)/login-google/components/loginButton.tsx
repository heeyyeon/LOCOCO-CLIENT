'use client';

import { SvgGoogle } from '@lococo/icons';

//todo: 폰트 추가(폰트 스타일/폰트 크기)
export default function LoginButton() {
  return (
    <div className="group relative mt-[8rem] flex h-[4.8rem] w-[29.6rem] cursor-pointer items-center rounded-[2.4rem] border border-[#747775] bg-white py-[1.2rem] hover:border-[#747775] hover:bg-[#F7F8F8]">
      <span className="absolute left-[2rem] flex items-center">
        <SvgGoogle size={20} />
      </span>
      <span className="flex w-full justify-center pl-[2rem] text-[#1F1F1F]">
        Continue with Google
      </span>
    </div>
  );
}
