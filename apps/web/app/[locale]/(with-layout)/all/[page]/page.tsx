import HomeSection from '../../(home)/components/home-section';
import HomeSectionAllCampaign from '../../(home)/components/home-section-all-campaign';

export default function AllCampaign() {
  return (
    <div className="flex w-full flex-col bg-pink-100">
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeSection className="mt-[0.4rem]">
          <HomeSection.Header>K-Beauty Campaigns</HomeSection.Header>
          <HomeSectionAllCampaign />
        </HomeSection>
      </div>
    </div>
  );
}
