'use client';

import ImageCarousel from './image-carousel';
import VideoPlayer from './video-player';

type Media = { type: 'video' | 'image'; url: string };
interface MediaViewerProps {
  mediaList: Media[];
}

export default function MediaViewer({ mediaList }: MediaViewerProps) {
  const video = mediaList.find((m) => m.type === 'video');
  const images = mediaList.filter((m) => m.type === 'image');

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-l-xl">
      {video && <VideoPlayer url={video.url} />}
      {images.length > 0 && (
        <ImageCarousel images={images.map((img) => img.url)} />
      )}
    </div>
  );
}
