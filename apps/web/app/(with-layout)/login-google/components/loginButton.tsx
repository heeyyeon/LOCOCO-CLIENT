'use client';

import { SvgGoogle } from '@lococo/icons';

export default function LoginButton() {
  return (
    <button className="group relative mt-[8rem] flex h-[4.8rem] w-[29.6rem] cursor-pointer items-center rounded-[2.4rem] border border-[#747775] bg-white py-[1.2rem] hover:border-[#747775] hover:bg-[#F7F8F8]">
      <span className="absolute left-[2rem] flex items-center">
        <SvgGoogle size={20} />
      </span>
      <span className="inter-body1 flex w-full justify-center pl-[2rem] font-bold text-[#1F1F1F]">
        Continue with Google
      </span>
    </button>
  );
}
