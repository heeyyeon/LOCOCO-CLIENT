'use client';

import CampaignCarousel from './components/campaign-carousel';
import CampaignDetailImageWrapper from './components/campaign-detail-image-wrapper';
import CampaignInfoPanel from './components/campaign-info-panel';

interface CampaignDetailPageProps {
  title: string;
  campaignType: string;
  brandName: string;
  language: string;
  applyStartDate: string;
  applyDeadline: string;
  creatorAnnouncementDate: string;
  reviewSubmissionDeadline: string;
  deliverableRequirements: string[];
  participationRewards: string[];
  eligibilityRequirements: string[];
  thumbnailImages: { id: number; url: string; displayOrder: number }[];
  detailImages: { id: number; url: string; displayOrder: number }[];
  campaignStatusCode: string;
}

export default function CampaignDetailPage({
  title,
  campaignType,
  brandName,
  language,
  applyStartDate,
  applyDeadline,
  creatorAnnouncementDate,
  reviewSubmissionDeadline,
  deliverableRequirements,
  participationRewards,
  eligibilityRequirements,
  thumbnailImages,
  detailImages,
  campaignStatusCode,
}: CampaignDetailPageProps) {
  const parsingThumbnailImages = thumbnailImages
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((image) => image.url);

  const parsingDetailImages = detailImages
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((image) => image.url);
  return (
    <div className="mt-[0.3rem] flex flex-col items-center gap-[2.4rem]">
      {/* Main Campaign Image with Gallery */}
      <div className="flex w-[112.8rem] flex-col">
        {/* Campaign Gallery with Swiper */}
        <div className="flex justify-center gap-[2.4rem]">
          <CampaignCarousel images={parsingThumbnailImages} />
          <CampaignInfoPanel
            title={title}
            campaignType={campaignType}
            brandName={brandName}
            language={language}
            applyStartDate={applyStartDate}
            applyDeadline={applyDeadline}
            creatorAnnouncementDate={creatorAnnouncementDate}
            reviewSubmissionDeadline={reviewSubmissionDeadline}
            deliverableRequirements={deliverableRequirements}
            participationRewards={participationRewards}
            eligibilityRequirements={eligibilityRequirements}
            campaignStatusCode={campaignStatusCode}
          />
        </div>
        <CampaignDetailImageWrapper images={parsingDetailImages} />
      </div>
    </div>
  );
}
