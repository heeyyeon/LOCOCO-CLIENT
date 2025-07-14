import {
  ApiResponseListVideoResponse,
  VideoResponse,
} from 'api/data-contracts';

/**
import { ApiResponseListVideoResponse } from '../api/data-contracts';
 * YouTube URL을 embed URL로 변환하는 함수
 * @param url - YouTube URL (watch?v= 형식)
 * @returns embed URL
 */
export function convertToEmbedUrl(url: string): string {
  // YouTube watch URL 패턴 매칭
  const watchPattern =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(watchPattern);

  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // 매칭되지 않는 경우 원본 URL 반환
  return url;
}
