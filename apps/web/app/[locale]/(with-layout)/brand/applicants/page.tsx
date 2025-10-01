import { notFound } from 'next/navigation';

import { getBrandCampaignInfos } from '../api';
import { CampaignInfo } from './../types';
import ClientPage from './page.client';

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
