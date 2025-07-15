// oembed api를 통해서 존재하는 영상인지 확인
export async function validateYoutubeVideo(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    return response.ok;
  } catch {
    return false;
  }
}
