'use client';

import HomeSection from 'components/home/home';
import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';

export default function Main() {
  return (
    <main className="flex min-h-screen w-screen justify-center">
      <article className="flex w-[112.8rem] flex-col">
        <div className="text-jp-body2 mt-[4rem] flex w-full items-baseline justify-end font-[500] text-gray-600">
          更新日時 :<span className="text-en-body1">2025</span>年
          <span className="text-en-body1">06</span>月
          <span className="text-en-body1">30</span>日
        </div>
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgJapaneseReview className="fill-red" />}いいね数が多いレビュー
          </HomeSection.Header>
          <HomeSection.Review type="video" />
          <HomeSection.Review type="image" className="mt-[4.8rem]" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgKoreanReview />}
            人気のKビューティーYouTube動画
          </HomeSection.Header>
          <HomeSection.YouTube />
        </HomeSection>
      </article>
    </main>
  );
}
