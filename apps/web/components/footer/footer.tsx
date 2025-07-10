import { CATEGORY_NAME } from 'constants/category';
import Link from 'next/link';
import {
  SvgInstagramFill,
  SvgTwitterFill,
  SvgArrowRight,
} from '@lococo/design-system';

const FOOTER = {
  title: 'Lococo',
  desc: '韓国コスメの信頼できるレビュー情報をお届け。韓国のビューティー知識を日本のユーザーに繋ぎます。',
  menu: [
    {
      title: 'カテゴリー',

      option: Object.values(CATEGORY_NAME),
    },
    {
      title: 'サポート',
      option: ['よくある質問', 'お問い合わせ', 'お知らせ'],
    },
    {
      title: 'インフォメーション',
      option: ['プライバシーポリシー', '利用規約'],
    },
  ],
  copyright: '© 2025 Lococo. All rights reserved.',
};

type Menu = {
  title: string;
  option: string[];
};

interface FooterProps {
  title: string;
  desc: string;
  menu: Menu[];
  copyright: string;
}

export default function Footer() {
  return (
    <footer className="bottom-0 flex w-full flex-col items-center justify-center overflow-hidden bg-pink-100">
      <div className="flex w-full items-center gap-[12rem] px-[11.9rem] py-16">
        <FooterLeft title={FOOTER.title} desc={FOOTER.desc} />
        <FooterRight menu={FOOTER.menu} />
      </div>
      <div className="flex h-[5.2rem] w-full items-center justify-center gap-4 border-t border-dashed border-pink-500 p-4">
        <FooterBottom copyright={FOOTER.copyright} />
      </div>
    </footer>
  );
}

function FooterLeft({ title, desc }: Pick<FooterProps, 'title' | 'desc'>) {
  return (
    <div className="flex w-[45.6rem] flex-col items-start gap-[5.6rem] bg-pink-100">
      <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
        <p className="en-title3 font-bold leading-loose">{title}</p>
        <p className="jp-body2 font-medium text-gray-600">{desc}</p>
      </div>
      <div className="flex items-center gap-[0.8rem]">
        <Link
          href="https://www.instagram.com/lococo.official/"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
        >
          <SvgInstagramFill fill="text-pink-500" />
        </Link>
        <Link
          href="https://x.com/Lococo_official"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
        >
          <SvgTwitterFill fill="text-pink-500" />
        </Link>
        <Link
          href="/"
          className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-1"
        ></Link>
      </div>
    </div>
  );
}

function FooterBottom({ copyright }: Pick<FooterProps, 'copyright'>) {
  return (
    <p className="en-body1 bg-pink-100 font-medium text-pink-500">
      {copyright}
    </p>
  );
}

function FooterRight({ menu }: Pick<FooterProps, 'menu'>) {
  return (
    <div className="bg-pink-100)] flex items-start gap-[2.4rem]">
      {menu.map(({ title, option }) => (
        <div
          key={title}
          className="flex w-[16.8rem] flex-col items-start gap-[2.4rem]"
        >
          <p className="jp-body1 font-bold">{title}</p>
          <div className="flex flex-col items-start justify-start gap-[0.8rem] self-stretch">
            {option.map((item) => (
              <Link
                href="/"
                key={item}
                className="flex h-[3.2rem] items-center gap-[0.8rem] self-stretch py-[1rem]"
              >
                <p className="jp-body2 font-medium">{item}</p>
                <SvgArrowRight />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
