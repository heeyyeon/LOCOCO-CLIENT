import React from 'react';

import CampaignForm from '../component/campaign-form';

export default function EditCampaign({ params }: { params: { id: string } }) {
  return <CampaignForm campaignId={params.id} />;
}
