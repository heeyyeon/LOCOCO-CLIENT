import { Suspense } from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';

import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeUpdateDate from './(home)/components/home-update-date';
import HomeProductFallback from './(home)/components/server-wrapper/home-product-fallback';
import HomeProductServer from './(home)/components/server-wrapper/home-product-server';
import HomeReviewFallback from './(home)/components/server-wrapper/home-review-fallback';
import HomeReviewServer from './(home)/components/server-wrapper/home-review-server';
import HomeYoutubeFallback from './(home)/components/server-wrapper/home-youtube-fallback';
import HomeYoutubeServer from './(home)/components/server-wrapper/home-youtube-server';

export default function Main() {
  return (
    <div className="flex w-full flex-col">
      <HomeBanner />
      <div className="flex w-full items-center justify-center bg-gray-500">
        <Card
          brand="브랜드"
          title="상품명"
          src="/img"
          dueDate="2025.09.30"
          chipVariant={getChipVariantByDate('2025.09.31')}
        />
      </div>
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeUpdateDate />
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <Suspense fallback={<HomeProductFallback />}>
            <HomeProductServer productSortType="popular" />
          </Suspense>
        </HomeSection>

        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <Suspense fallback={<HomeProductFallback />}>
            <HomeProductServer productSortType="new" />
          </Suspense>
        </HomeSection>
        <Suspense fallback={<HomeReviewFallback />}>
          <HomeReviewServer />
        </Suspense>
        <Suspense fallback={<HomeYoutubeFallback />}>
          <HomeYoutubeServer />
        </Suspense>
      </div>
    </div>
  );
}
