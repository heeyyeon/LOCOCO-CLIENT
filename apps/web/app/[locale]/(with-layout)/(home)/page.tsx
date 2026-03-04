import { getTranslations } from 'next-intl/server';

import { RoleSetupHandler } from '../login-google/components/RoleSetupHandler';
import HomeBanner from './components/home-banner';
import HomeBestReviewSection from './components/home-best-review-section';
import HomeSection from './components/home-section';
import HomeSectionBestProducts from './components/home-section-best-products';
import HomeSectionCampaign from './components/home-section-campaign';
import HomeSectionNewProducts from './components/home-section-new-products';

export default async function Main() {
  const t = await getTranslations('main');

  return (
    <>
      <RoleSetupHandler />
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col bg-white">
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>{t('bestProducts')}</HomeSection.Header>
          <HomeSectionBestProducts />
        </HomeSection>

        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>{t('newProducts')}</HomeSection.Header>
          <HomeSectionNewProducts />
        </HomeSection>

        <HomeSection className="mb-[12rem] mt-[6rem]">
          <HomeSection.Header>{t('bestReviews')}</HomeSection.Header>
          <HomeBestReviewSection />
        </HomeSection>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-pink-100">
        <HomeSection className="mt-[6rem] w-[112.8rem]">
          <HomeSection.Header>{t('kBeautyCampaigns')}</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="KBeauty" seeMore={true} />
        </HomeSection>

        <HomeSection className="w-[112.8rem]">
          <HomeSection.Header>{t('openingSoon')}</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="openingSoon" seeMore={false} />
        </HomeSection>
      </div>
    </>
  );
}
