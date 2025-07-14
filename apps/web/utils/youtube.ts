import { VideoResponse } from 'api/data-contracts';

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  /youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
] as const;

/**
import { ApiResponseListVideoResponse } from '../api/data-contracts';
 * YouTube URL을 embed URL로 변환하는 함수
 * @param url - YouTube URL (watch?v= 형식)
 * @returns embed URL
 */
export function convertToEmbedUrl(url: string): string {
  // 이미 embed URL인 경우 그대로 반환
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // 비디오 ID 추출 후 embed URL 생성
  const videoId = extractYoutubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 매칭되지 않는 경우 원본 URL 반환
  return url;
}

// 전체 url에서 영상 id만 추출
function extractYoutubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

// oembed api를 통해서 존재하는 영상인지 확인
async function validateYoutubeVideo(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    return response.ok;
  } catch {
    return false;
  }
}

/**
 *
 * @param videos 서버에서 받은 원본 video response 배열
 * @param batchSize 병렬로 검증할 수
 * @returns 검증된(존재하는) 영상 VideoResponse타입으로 반환
 */
export async function validateYoutubeVideos(
  videos: VideoResponse[],
  batchSize: number = 25
) {
  const validatedVideos: VideoResponse[] = [];

  for (let i = 0; i < videos.length; i += batchSize) {
    const batch = videos.slice(i, i + batchSize);
    const validationPromises = batch.map(async (video) => {
      const videoId = extractYoutubeVideoId(video.url || '');
      if (!videoId) return { video, isValid: false };

      const isValid = await validateYoutubeVideo(videoId);
      return { video, isValid };
    });
    const batchResults = await Promise.all(validationPromises);
    batchResults.forEach(({ video, isValid }) => {
      if (isValid) {
        validatedVideos.push(video);
      }
    });
  }
  return validatedVideos;
}
