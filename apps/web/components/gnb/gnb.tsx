import Image from 'next/image';

import GnbAuth from './gnb-auth';
import GnbLanguage from './gnb-language';
import GnbMenu from './gnb-menu';

export default function Gnb() {
  return (
    <header className="body1 flex h-[7.2rem] w-screen min-w-[112.8rem] justify-center font-[700]">
      <div className="flex w-[112.8rem] justify-between">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={162}
          height={27}
          className="object-contain"
        />
        <GnbMenu />
        <div className="flex h-full items-center gap-[1.6rem]">
          <GnbAuth />
          <GnbLanguage />
        </div>
      </div>
    </header>
  );
}
