import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';
import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeUpdateDate from './(home)/components/home-update-date';

export default function Main() {
  return (
    <main className="flex w-full flex-col">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeUpdateDate />
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgJapaneseReview className="fill-red" width={40} height={29} />}
            いいね数が多いレビュー
          </HomeSection.Header>
          <HomeSection.Review type="video" />
          <HomeSection.Review type="image" className="mt-[4.8rem]" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgKoreanReview width={40} height={29} />}
            人気のKビューティーYouTube動画
          </HomeSection.Header>
          <HomeSection.YouTube />
        </HomeSection>
      </div>
    </main>
  );
}
