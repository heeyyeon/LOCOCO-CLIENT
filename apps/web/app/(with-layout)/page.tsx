import PopUpModal from 'components/modal/pop-up-modal';
import { Button } from '@/components';
import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';
import HomeBanner from './(home)/components/home-banner';
import HomeSection from './(home)/components/home-section';
import HomeUpdateDate from './(home)/components/home-update-date';
import {
  emptyReviewData,
  getImageReviews,
} from './(home)/utils/getReviewItems';
import { getUserStatus } from './(home)/utils/getUserStatus';

export default async function Main() {
  const reviewImageData = await getImageReviews();
  const isUserLogin = await getUserStatus();
  return (
    <div className="flex w-full flex-col">
      <HomeBanner />
      <div className="mx-auto flex w-[112.8rem] flex-col">
        <HomeUpdateDate />
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header>レビュー数が多い商品</HomeSection.Header>
          <HomeSection.Product
            productSortType="popular"
            authStatus={isUserLogin}
          />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>新作アイテム</HomeSection.Header>
          <HomeSection.Product authStatus={isUserLogin} productSortType="new" />
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
      <PopUpModal>
        <PopUpModal.Trigger>
          <button>이거누르면켜짐</button>
        </PopUpModal.Trigger>
        <PopUpModal.Content>
          <PopUpModal.Header className="jp-body1 font-[700]">
            お知らせ
          </PopUpModal.Header>
          <PopUpModal.Body>
            <h3 className="jp-title2 font-[700]"> サービスを準備中です。</h3>
            <p className="jp-caption3 font-[400]">
              近日中にご案内できるよう進めております。
            </p>
          </PopUpModal.Body>
          <PopUpModal.Footer>
            <Button
              size="lg"
              color="primary"
              variant="filled"
              rounded={true}
              className="jp-title2 font-[700]"
            >
              確認
            </Button>
          </PopUpModal.Footer>
        </PopUpModal.Content>
      </PopUpModal>
    </div>
  );
}
