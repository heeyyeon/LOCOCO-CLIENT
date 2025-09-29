import React from 'react';

import CampaignForm from '../component/campaign-form';

export default async function EditCampaign({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CampaignForm campaignId={id} />;
}
