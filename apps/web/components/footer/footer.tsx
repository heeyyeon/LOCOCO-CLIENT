import Link from 'next/link';

import { CATEGORY_NAME } from 'constants/category';

import {
  SvgArrowRight,
  SvgInstagramFill,
  SvgMailFill,
  SvgXTwitterFill,
} from '@lococo/icons';

const FOOTER = {
  title: 'Lococo',
  desc: '韓国コスメの信頼できるレビュー情報をお届け。韓国のビューティー知識を日本のユーザーに繋ぎます。',
  menu: [
    {
      title: 'カテゴリー',
      option: [
        {
          name: CATEGORY_NAME.FACIAL_CARE,
          href: '/search?middleCategory=FACIAL_CARE&searchType=PRODUCT',
        },
        {
          name: CATEGORY_NAME.FACE_MAKEUP,
          href: '/search?middleCategory=FACE_MAKEUP&searchType=PRODUCT',
        },
        {
          name: CATEGORY_NAME.EYE_MAKEUP,
          href: '/search?middleCategory=EYE_MAKEUP&searchType=PRODUCT',
        },
        {
          name: CATEGORY_NAME.LIP_MAKEUP,
          href: '/search?middleCategory=LIP_MAKEUP&searchType=PRODUCT',
        },
      ],
    },
    {
      title: 'サポート',
      option: [
        { name: 'よくある質問', href: '' },
        { name: 'お問い合わせ', href: '' },
        { name: 'お知らせ', href: '' },
      ],
    },
    {
      title: 'インフォメーション',
      option: [
        {
          name: 'プライバシーポリシー',
          href: 'https://pricey-sheep-acd.notion.site/233dc4218399800eaa99e2d52d0de45f',
        },
        {
          name: '利用規約',
          href: 'https://pricey-sheep-acd.notion.site/233dc4218399800285a4e44918ecf132',
        },
      ],
    },
  ],
  copyright: '© 2025 Lococo. All rights reserved.',
};

type MenuItem = {
  name: string;
  href: string;
};

type Menu = {
  title: string;
  option: MenuItem[];
};

interface FooterProps {
  title: string;
  desc: string;
  menu: Menu[];
  copyright: string;
}

export default function Footer() {
  return (
    <footer className="px-auto bottom-0 flex w-full min-w-[1366px] flex-col items-center justify-center bg-pink-100">
      <div className="mx-auto flex w-[1366px] gap-4 px-4 py-16 md:gap-8 lg:gap-[12rem]">
        <FooterLeft title={FOOTER.title} desc={FOOTER.desc} />
        <FooterRight menu={FOOTER.menu} />
      </div>
      <FooterBottom copyright={FOOTER.copyright} />
    </footer>
  );
}

function FooterLeft({ title, desc }: Pick<FooterProps, 'title' | 'desc'>) {
  return (
    <div className="flex flex-1 flex-col items-start gap-8 bg-pink-100 md:gap-12 lg:gap-[5.6rem]">
      <div className="flex w-full flex-col items-start gap-4 md:gap-6 lg:gap-[2.4rem]">
        <p className="title3 font-bold leading-loose">{title}</p>
        <p className="body2 font-medium text-gray-600">{desc}</p>
      </div>
      <div className="flex items-center gap-2 md:gap-[0.8rem]">
        <Link
          href="https://www.instagram.com/lococo.official/"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
          aria-label="ロココインスタグラムにアクセス"
          title="ロココインスタグラムにアクセス"
        >
          <SvgInstagramFill className="text-pink-500" />
        </Link>
        <Link
          href="https://x.com/Lococo_official"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
          aria-label="ロココXにアクセス"
          title="ロココXにアクセス"
        >
          <SvgXTwitterFill className="text-pink-500" />
        </Link>
        <Link
          href="mailto:lococo.official@gmail.com"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
          aria-label="ロココメールを送る"
          title="ロココメールを送る"
        >
          <SvgMailFill className="text-pink-500" />
        </Link>
      </div>
    </div>
  );
}

function FooterBottom({ copyright }: Pick<FooterProps, 'copyright'>) {
  return (
    <div className="flex min-h-[5.2rem] w-full items-center justify-center gap-4 border-t border-dashed border-pink-500 bg-pink-100 px-4 py-4">
      <p className="body1 bg-pink-100 text-center font-medium text-pink-500">
        {copyright}
      </p>
    </div>
  );
}

function FooterRight({ menu }: Pick<FooterProps, 'menu'>) {
  return (
    <div className="flex flex-1 items-start gap-4 bg-pink-100 md:gap-6 lg:gap-[2.4rem]">
      {menu.map(({ title, option }) => (
        <div
          key={title}
          className="flex min-w-0 flex-1 flex-col items-start gap-4 md:gap-6 lg:w-[16.8rem] lg:gap-[2.4rem]"
        >
          <p className="body1 font-bold">{title}</p>
          <div className="flex w-full flex-col items-start justify-start gap-2 md:gap-[0.8rem]">
            {option.map((item) =>
              item.href ? (
                <Link
                  href={item.href}
                  key={item.name}
                  className="flex h-[3.2rem] w-full items-center gap-2 py-[1rem] md:gap-[0.8rem]"
                >
                  <p className="body2 whitespace-nowrap font-medium">
                    {item.name}
                  </p>
                  <SvgArrowRight />
                </Link>
              ) : (
                <div
                  key={item.name}
                  className="flex h-[3.2rem] w-full cursor-default items-center gap-2 py-[1rem] md:gap-[0.8rem]"
                >
                  <p className="body2 cursor-not-allowed whitespace-nowrap font-medium">
                    {item.name}
                  </p>
                  <SvgArrowRight className="text-gray-400" />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
