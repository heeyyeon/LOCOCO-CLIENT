import React from 'react';

export default function HomeBanner() {
  return (
    <div className="w-full bg-white">
      <div className="flex min-w-[1366px] justify-center">
        <video
          src="/video/home-banner-video.mp4"
          width={1366}
          height={560}
          autoPlay
          muted
          loop
          playsInline
          className="block"
          preload="metadata"
        />
      </div>
    </div>
  );
}
