import Image from 'next/image';

import logo from '../../public/images/logo.png';
import GnbAuth from './gnb-auth';
import GnbLanguage from './gnb-language';
import GnbMenu from './gnb-menu';

export default function Gnb() {
  return (
    <header className="flex h-[7.2rem] w-full items-center justify-between px-[11.9rem]">
      <Image
        src={logo}
        alt="logo"
        width={162}
        height={27}
        className="h-[27px] w-[162px]"
      />
      <GnbMenu></GnbMenu>
      <div>
        <GnbLanguage></GnbLanguage>
        <GnbAuth />
      </div>
    </header>
  );
}
