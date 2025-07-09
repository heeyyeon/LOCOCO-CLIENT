'use client';

import MoreButton from './moreButton';

export default function RenderReviews() {
  return (
    <section className="flex w-[136.6rem] flex-col items-start px-[11.9rem] pb-[12rem] pt-0">
      {
        //동영상 리뷰
      }
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="text-jp-head3 font-bold text-gray-700">動画レビュー</p>
        <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
          {/* 콘텐츠 */}
        </div>
        <MoreButton />
      </div>
      {
        //사진이 있는 리뷰
      }
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[4.8rem]">
        <p className="text-jp-head3 font-bold text-gray-700">
          写真付きレビュー
        </p>
        <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[4.8rem]"></div>
      </div>
    </section>
  );
}
