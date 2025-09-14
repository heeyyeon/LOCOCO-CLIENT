import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeSectionCampaign from './(home)/components/home-section-campaign';

export default function Main() {
  return (
    <div className="flex w-full flex-col bg-pink-100">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>K-Beauty Campaigns</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="KBeauty" seeMore={true} />
        </HomeSection>

        <HomeSection>
          <HomeSection.Header>Opening Soon</HomeSection.Header>
          <HomeSectionCampaign kindOfCard="openingSoon" seeMore={false} />
        </HomeSection>
      </div>
    </div>
  );
}
