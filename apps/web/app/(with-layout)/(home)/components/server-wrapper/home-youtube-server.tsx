import React from 'react';

import { ApiResponseListTrendsYoutubeResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';
import { validateYoutubeVideoList } from 'utils/youtube';

import { SvgKoreanReview } from '@lococo/icons';

import HomeSection from '../home-section';

interface VideoWithAllProps {
  url: string;
  id: number;
  topic: string;
  title: string;
  popularity: number;
  viewCount: number;
  uploadedAt: string;
}

export default async function HomeYoutubeServer() {
  try {
    const response = await apiRequest<ApiResponseListTrendsYoutubeResponse>({
      endPoint: '/api/youtube/trends',
    });

    const videos = response.data;

    // videos 없을 때(로딩중)
    if (!videos) {
      return <div className="h-[43rem] w-[112.8rem] bg-white" />;
    }

    const videoUrls = videos
      .map((video) => video.url || '')
      .filter((url) => url);
    const validatedVideoUrls = await validateYoutubeVideoList(videoUrls, 25);
    const showVideos: VideoWithAllProps[] = videos
      .map((video, index) => ({
        ...video,
        url: validatedVideoUrls[index] || video.url,
      }))
      .slice(0, 6);
    return (
      <HomeSection>
        <HomeSection.Header>
          {<SvgKoreanReview width={40} height={29} />}
          人気のKビューティーYouTube動画
        </HomeSection.Header>
        <HomeSection.YouTube showVideos={showVideos} />
      </HomeSection>
    );
  } catch {
    return <div>영상 불러오기 실패</div>;
  }
}
