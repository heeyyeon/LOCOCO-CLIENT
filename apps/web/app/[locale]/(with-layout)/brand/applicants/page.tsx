import { notFound } from 'next/navigation';

import { getBrandCampaignInfos } from './apis';
import ClientPage from './page.client';
import { CampaignInfo } from './types';

export default async function page() {
  let campaignInfos: CampaignInfo[] = [];

  try {
    const response = await getBrandCampaignInfos();
    campaignInfos = response.data.campaignInfos;
  } catch {
    // TODO: 에러 핸들링 로직 추가
    notFound();
  }

  return <ClientPage campaignInfos={campaignInfos} />;
}
