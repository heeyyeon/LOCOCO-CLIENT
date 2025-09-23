'use client';

import CampaignCarousel from './components/campaign-carousel';
import CampaignDetailImageWrapper from './components/campaign-detail-image-wrapper';
import CampaignInfoPanel from './components/campaign-info-panel';

export default function CampaignDetailPage() {
  return (
    <div className="mt-[0.3rem] flex flex-col items-center gap-[2.4rem]">
      {/* Main Campaign Image with Gallery */}
      <div className="flex w-[112.8rem] flex-col">
        {/* Campaign Gallery with Swiper */}
        <div className="flex justify-center gap-[2.4rem]">
          <CampaignCarousel campaignName="Glass Skin Glow Serum Campaign" />
          <CampaignInfoPanel />
        </div>
        <CampaignDetailImageWrapper />
      </div>
    </div>
  );
}
