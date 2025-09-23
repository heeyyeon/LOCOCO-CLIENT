import CampaignDueDate from '../component/campaign-due-date';
import CampaignEndInfo from '../component/campaign-end-info';
import CampaignInfo from '../component/campaign-info';
import CampaignStartInfo from '../component/campaign-start-info';
import CampaignWinnerAnnounce from '../component/campaign-winner-announce';

export default function CreateCampaign() {
  return (
    <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
      <h3>캠페인 정보</h3>
      <CampaignInfo />
      <CampaignStartInfo />
      <CampaignEndInfo />
      <CampaignWinnerAnnounce />
      <CampaignDueDate />

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
