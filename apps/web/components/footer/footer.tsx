import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { SvgArrowRight, SvgMail, SvgTiktok, SvgX } from '@lococo/icons';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="mx-auto flex w-full min-w-[112.8rem] flex-col items-center gap-[5.6rem] border-gray-200 bg-pink-100 px-[11.9rem] py-[7.2rem]">
      <div className="flex w-[112.8rem] justify-between gap-[1rem]">
        <div className="flex min-w-[30.8rem] flex-col gap-[1.6rem]">
          <p className="text-inter-title3 font-bold text-gray-600">
            {t('slogan')}
          </p>
          <div className="flex items-center gap-[1.6rem]">
            <Link href="mailto:lococo.official@gmail.com">
              <SvgMail className="h-[3.2rem] w-[3.2rem] text-gray-600" />
            </Link>
            {/* TODO: 디자인 제공 인스타그램 svg fill 속성 문제로 direct svg import */}
            <Link href="https://www.instagram.com/lococo.official/">
              <Image
                src="/instagram-footer.svg"
                alt="instagram"
                width={28}
                height={28}
              />
            </Link>
            <Link href="https://www.tiktok.com/@lococo.official">
              <SvgTiktok className="h-[3.2rem] w-[3.2rem] text-gray-600" />
            </Link>
          </div>
        </div>

        <div className="flex w-full max-w-[64.1rem] justify-between">
          <div className="text-inter-body3 flex flex-col text-gray-600">
            <p>© 2025</p>
            <p>{t('copyright')}</p>
          </div>
          <div className="text-inter-body4 flex gap-[2.4rem] text-gray-600">
            {/* TODO: 추후 각 링크 추가 */}
            <div className="flex flex-col">
              <Link
                href={'/all/1'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.campaigns')} <SvgArrowRight />
              </Link>
              <Link
                href={'/how-it-work'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.howItWorks')} <SvgArrowRight />
              </Link>
            </div>
            <div className="flex flex-col">
              <Link
                href={'/how-it-work'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.campaignGuideline')} <SvgArrowRight />
              </Link>
              <Link
                href={'/privacy-policy'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.privacyPolicy')} <SvgArrowRight />
              </Link>
              <Link
                href={'/terms-of-service'}
                className="flex gap-[0.8rem] px-[1.6rem] py-[0.5rem]"
              >
                {t('links.termsOfService')} <SvgArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Image
        src="/images/logo-high-quality.png"
        alt="logo"
        className="w-[112.8rem]"
        width={800}
        height={200}
      />
    </footer>
  );
}
