import { apiRequest } from 'app/api/apiRequest';
import { convertToEmbedUrl, validateYoutubeVideos } from 'utils/youtube';
import { ReactNode, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ApiResponseListVideoResponse } from '../../../../api/data-contracts';
import HomeSectionProduct from './home-section-product';
import HomeSectionReview from './home-section-review';

export default function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(`mt-[12rem] flex w-full flex-col gap-[3.2rem]`, className)}
    >
      {children}
    </section>
  );
}

interface HomeSectionHeaderProps extends PropsWithChildren {
  moreInfoUrl?: string;
}

function HomeSectionHeader({ children, moreInfoUrl }: HomeSectionHeaderProps) {
  return (
    <section className="mt-[6rem] flex justify-between">
      <h3 className="jp-head1 flex items-center gap-[1.2rem] font-[700]">
        {children}
      </h3>
      {moreInfoUrl && (
        <Link href={moreInfoUrl} className="jp-title2 font-[700]">
          더보기
        </Link>
      )}
    </section>
  );
}

async function HomeSectionYouTube() {
  try {
    const response = await apiRequest<ApiResponseListVideoResponse>({
      endPoint: 'api/youtube/trends',
      // TODO 쿠키로 헤더 전송 로직 완료되면 지우기
      headers: { Authorization: `Bearer ${process.env.NEXT_TMP_ACCESS_TOKEN}` },
    });

    const videos = response.data;

    // videos 로딩이 완료되지 않으면
    if (!videos || videos.length === 0) {
      return <div>로딩중</div>;
    }

    const validatedVideos = await validateYoutubeVideos(videos, 25);
    const showVideos = validatedVideos?.slice(0, 6);

    return (
      <div className="mb-[12rem] grid grid-cols-3 gap-[2.4rem]">
        {showVideos?.map((video) => (
          <article className="h-[20.3rem] w-full bg-gray-100" key={video.id}>
            <iframe
              width="100%"
              height="100%"
              src={convertToEmbedUrl(video.url || '')}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </article>
        ))}
      </div>
    );
  } catch {
    return <div>영상 불러오는 중 오류 발생</div>;
  }
}

HomeSection.Header = HomeSectionHeader;
HomeSection.Product = HomeSectionProduct;
HomeSection.Review = HomeSectionReview;
HomeSection.YouTube = HomeSectionYouTube;
