'use client';

import HomeSection from 'components/home/home';
import Image from 'next/image';
import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';

export default function Main() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full justify-center bg-gray-300">
        <Image
          src={
            'https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4='
          }
          alt="배너"
          width={1366}
          height={560}
          className="h-[56rem] w-[136.6rem] object-contain"
        />
      </div>
      <div className="flex w-[112.8rem] flex-col">
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
      </div>
    </main>
  );
}
