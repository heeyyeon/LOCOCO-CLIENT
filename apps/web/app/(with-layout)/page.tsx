import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';
import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeUpdateDate from './(home)/components/home-update-date';
import { getAuthStatus } from './(home)/utils/getAuthStatus';
import {
  emptyReviewData,
  getImageReviews,
} from './(home)/utils/getReviewItems';

export default async function Main() {
  const reviewImageData = await getImageReviews();
  const authStatus = await getAuthStatus();
  return (
    <div className="flex w-full flex-col">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeUpdateDate />
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <HomeSection.Product
            productSortType="new"
            authStatus={authStatus?.userToken}
          />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <HomeSection.Product
            authStatus={authStatus?.userToken}
            productSortType="popular"
          />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgJapaneseReview className="fill-red" width={40} height={29} />}
            いいね数が多いレビュー
          </HomeSection.Header>
          {/* <HomeSection.Review type="video" /> */}
          <HomeSection.Review
            reviewCardList={reviewImageData?.data || emptyReviewData}
            type="image"
            className="mt-[4.8rem]"
          />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgKoreanReview width={40} height={29} />}
            人気のKビューティーYouTube動画
          </HomeSection.Header>
          <HomeSection.YouTube />
        </HomeSection>
      </div>
    </div>
  );
}
