import React from 'react';

export default function HomeYoutubeFallback() {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="mb-[12rem] grid grid-cols-3 gap-[2.4rem]">
      {skeletonItems.map((index) => (
        <article
          className="relative h-[20.3rem] w-full overflow-hidden rounded-md bg-gray-100"
          key={`skeleton-${index}`}
        ></article>
      ))}
    </div>
  );
}
