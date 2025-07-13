'use client';

import { useId } from 'react';
import Link from 'next/link';
import { SvgLine } from '@lococo/design-system';

export default function LoginButton() {
  const uuid = useId();

  return (
    <Link
      href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007625456&redirect_uri=${process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URL}&state=${uuid}&scope=profile%20openid&nonce=09876xyz`}
      className="jp-body1 relative mt-[12rem] flex h-[4.8rem] cursor-pointer items-center rounded-[0.6rem] bg-[#06C755] pl-[5.4rem] pr-[5.4rem] font-bold text-white"
    >
      <span className="absolute left-[2.1rem] flex items-center">
        <SvgLine size={20} />
      </span>
      <span className="flex w-[18.4rem] justify-center">LINEでログイン</span>
    </Link>
  );
}
