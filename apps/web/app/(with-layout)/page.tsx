import { Suspense } from 'react';

import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeUpdateDate from './(home)/components/home-update-date';
import HomeReviewFallback from './(home)/components/server-wrapper/home-review-fallback';
import HomeReviewServer from './(home)/components/server-wrapper/home-review-server';
import HomeYoutubeServer from './(home)/components/server-wrapper/home-youtube-server';

export default function Main() {
  return (
    <div className="flex w-full flex-col">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeUpdateDate />
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <HomeSection.Product productSortType="popular" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <HomeSection.Product productSortType="new" />
        </HomeSection>
        <Suspense fallback={<HomeReviewFallback />}>
          <HomeReviewServer />
        </Suspense>
        <Suspense fallback={<div>로딩중</div>}>
          <HomeYoutubeServer />
        </Suspense>
      </div>
    </div>
  );
}
