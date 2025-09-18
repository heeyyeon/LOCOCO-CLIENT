import { getTranslations } from 'next-intl/server';

import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeSectionCampaign from './(home)/components/home-section-campaign';
import TestComponent from './brand/test-component';

export default async function Main() {
  const t = await getTranslations('main');
  // 더미 데이터 생성

  return (
    <div className="flex w-full flex-col bg-pink-100">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>{t('kBeautyCampaigns')}</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="KBeauty" seeMore={true} />
        </HomeSection>

        <HomeSection>
          <HomeSection.Header>{t('openingSoon')}</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="openingSoon" seeMore={false} />
        </HomeSection>
      </div>
      <TestComponent />
    </div>
  );
}
