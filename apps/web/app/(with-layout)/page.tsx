'use client';

import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { getAccessToken } from 'app/api/token';
import { SvgJapaneseReview, SvgKoreanReview } from '@/icons';
import HomeSection from '../home/components/home';
import HomeBanner from '../home/components/home-banner';
import HomeUpdateDate from '../home/components/home-update-date';

export default function Main() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['youtube-trends'],
    queryFn: async () => {
      return await apiRequest({
        endPoint: 'api/youtube/trends',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      });
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  console.log(data.data.data);
  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    console.error('API 에러:', error);
    return (
      <div>
        <p>에러 발생: {error?.message}</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }

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
            {<SvgJapaneseReview className="fill-red" />}いいね数が多いレビュー
          </HomeSection.Header>
          <HomeSection.Review type="video" />
          <HomeSection.Review type="image" className="mt-[4.8rem]" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header>
            {<SvgKoreanReview />}
            人気のKビューティーYouTube動画
          </HomeSection.Header>
          <HomeSection.YouTube />
        </HomeSection>
      </div>
    </main>
  );
}
