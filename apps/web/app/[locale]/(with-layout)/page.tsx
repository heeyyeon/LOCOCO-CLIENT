// import { Suspense } from 'react';
import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeSectionCampaign from './(home)/components/home-section-campaign';

// import HomeProductFallback from './(home)/components/server-wrapper/home-product-fallback';
// import HomeProductServer from './(home)/components/server-wrapper/home-product-server';
// import HomeReviewFallback from './(home)/components/server-wrapper/home-review-fallback';
// import HomeReviewServer from './(home)/components/server-wrapper/home-review-server';
// import HomeYoutubeFallback from './(home)/components/server-wrapper/home-youtube-fallback';
// import HomeYoutubeServer from './(home)/components/server-wrapper/home-youtube-server';

export default function Main() {
  return (
    <div className="flex w-full flex-col bg-pink-100">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        {/* <HomeSection className="mt-[6rem]">
          <Suspense fallback={<HomeProductFallback />}>
            <HomeProductServer productSortType="popular" />
          </Suspense>
        </HomeSection> */}

        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>K-Beauty Campaigns</HomeSection.Header>
          <HomeSectionCampaign />
        </HomeSection>

        <HomeSection>
          <HomeSection.Header>Opening Soon</HomeSection.Header>
          <HomeSectionCampaign />
        </HomeSection>

        {/* <HomeSection>
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
        </Suspense> */}
      </div>
    </div>
  );
}
