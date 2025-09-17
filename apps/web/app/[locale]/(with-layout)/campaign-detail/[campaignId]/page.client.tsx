'use client';

import CampaignCarousel from './components/campaign-carousel';

// import CampaignInfoPanel from './components/campaign-info-panel';

export default function CampaignDetailPage() {
  return (
    <div className="mt-[0.3rem] flex">
      {/* Main Campaign Image with Gallery */}
      <div className="relative mx-auto flex w-full min-w-[112.8rem] justify-center gap-[2.4rem]">
        {/* Campaign Gallery with Swiper */}
        <CampaignCarousel campaignName="Glass Skin Glow Serum Campaign" />

        {/* Campaign Info Panel */}
        {/* <CampaignInfoPanel /> */}
      </div>

      {/* TODO: Mobile */}
      {/* <div className="h-[820px] lg:hidden" /> */}
    </div>
  );
}
