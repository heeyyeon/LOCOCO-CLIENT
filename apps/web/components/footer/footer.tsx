import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import logoQuality from 'public/images/logo-high-quality.png';
// TODO: 디자인 제공 인스타그램 svg fill 속성 문제로 direct svg import
import instagramFooter from 'public/instagram-footer.svg';

import { SvgArrowRight, SvgMail, SvgX } from '@lococo/icons';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="mx-auto flex w-full min-w-[112rem] flex-col gap-[5.6rem] border-gray-200 bg-pink-100 px-[11.9rem] py-[7.2rem]">
      <div className="flex justify-between gap-[1rem]">
        <div className="flex min-w-[30.8rem] flex-col gap-[1.6rem]">
          <p className="text-inter-title3 font-bold text-gray-600">
            {t('slogan')}
          </p>
          <div className="flex items-center gap-[1.6rem]">
            <SvgMail className="h-[3.2rem] w-[3.2rem] text-gray-600" />
            <Image
              src={instagramFooter}
              alt="instagram"
              className="h-[2.8rem] w-[2.8rem]"
            ></Image>
            <SvgX className="h-[3.2rem] w-[3.2rem] text-gray-600" />
          </div>
        </div>

        <div className="flex w-full max-w-[64.1rem] justify-between">
          <div className="text-inter-body3 flex flex-col text-gray-600">
            <p>© 2025</p>
            <p>{t('copyright')}</p>
          </div>
          <div className="text-inter-body4 flex gap-[2.4rem] text-gray-600">
            <div className="flex flex-col">
              <Link
                href={'/'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.campaigns')} <SvgArrowRight />
              </Link>
              <Link
                href={'/'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.howItWorks')} <SvgArrowRight />
              </Link>
            </div>
            <div className="flex flex-col">
              <Link
                href={'/'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.campaignGuideline')} <SvgArrowRight />
              </Link>
              <Link
                href={'/'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.privacyPolicy')} <SvgArrowRight />
              </Link>
              <Link
                href={'/'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.FAQ')} <SvgArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Image src={logoQuality} alt="logo" className="w-full" />
    </footer>
  );
}
