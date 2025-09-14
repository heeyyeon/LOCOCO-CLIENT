import CampaignAll from '../../(home)/components/campaign-all';
import HomeSection from '../../(home)/components/home-section';

export default function AllCampaign() {
  return (
    <div className="flex w-full flex-col bg-pink-100">
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeSection className="mt-[0.4rem]">
          <HomeSection.Header>K-Beauty Campaigns</HomeSection.Header>
          <CampaignAll />
        </HomeSection>
      </div>
    </div>
  );
}
