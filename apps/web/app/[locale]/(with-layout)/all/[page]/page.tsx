import { getTranslations } from 'next-intl/server';

import CampaignAll from '../../(home)/components/campaign-all';
import HomeSection from '../../(home)/components/home-section';

export default async function AllCampaign() {
  const t = await getTranslations('main'); // main 필드에 똑같은 값이 있어서 재활용
  return (
    <div className="flex w-full flex-col bg-pink-100">
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeSection className="mt-[0.4rem]">
          <HomeSection.Header>{t('K-Beauty Campaigns}')}</HomeSection.Header>
          <CampaignAll />
        </HomeSection>
      </div>
    </div>
  );
}
