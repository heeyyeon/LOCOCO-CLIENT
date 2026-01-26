import CampaignForm from './component/campaign-form';

import { getUserInfoForHeader } from 'components/gnb/api';
export default async function NewCampaign() {
   const userInfo = await getUserInfoForHeader();
  
  return <CampaignForm role={userInfo?.role}/>;
}
