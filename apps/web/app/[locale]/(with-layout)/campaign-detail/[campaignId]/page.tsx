import type { Metadata } from 'next';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}): Promise<Metadata> {
  const campaignId = (await params).campaignId;
  const campaignDetail = await getCampaignDetail(campaignId);
  return {
    title: `Lococo | ${campaignDetail.title}`,
    openGraph: {
      title: campaignDetail.title,
      // TODO: 로코코 OG IMAGE 추가되면 빈문자열 교체
      images: campaignDetail.thumbnailImages[0]?.url || '',
    },
  };
}
