import { notFound } from 'next/navigation';

import { getCampaignDetail } from './apis';
import ClientPage from './page.client';
import { CampaignDetailData } from './types';

export default async function CampaignDetail({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  let data: CampaignDetailData;
  try {
    data = await getCampaignDetail(campaignId);
    console.log(data);
  } catch {
    notFound();
  }

  return (
    <ClientPage
      title={data.title}
      campaignType={data.campaignType}
      brandName={data.brandName}
      language={data.language}
      applyStartDate={data.applyStartDate}
      applyDeadline={data.applyDeadline}
      creatorAnnouncementDate={data.creatorAnnouncementDate}
      reviewSubmissionDeadline={data.reviewSubmissionDeadline}
      deliverableRequirements={data.deliverableRequirements}
      participationRewards={data.participationRewards}
      eligibilityRequirements={data.eligibilityRequirements}
      thumbnailImages={data.thumbnailImages}
      detailImages={data.detailImages}
      userSpecificCampaignStatus={data.userSpecificCampaignStatus}
      isProCampaign={data.isProCampaign}
      currentUserRole={data.currentUserRole}
      creatorRoleInfo={data.creatorRoleInfo}
    />
  );
}
