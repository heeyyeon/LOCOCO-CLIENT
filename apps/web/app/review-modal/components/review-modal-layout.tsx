import React from 'react';
import MediaInfo from './media-info';
import MediaViewer from './media-viewer';
import ReviewInfo from './review-info';

export interface Media {
  type: 'video' | 'image';
  url: string;
}
export interface User {
  name: string;
  avatarUrl?: string;
}
export interface ReviewModallayoutProps {
  //좌측
  mediaList: Media[];
  user: User;
  date: string;
  likeCount: number;
  // 우측
  brandName: string;
  productName: string;
  productOption: string;
  rating: number;
  isReceipt?: boolean;
  positiveComment: string;
  negativeComment: string;
  imageUrl: string;
  authorName: string;
  uploadAt: string;
  children?: React.ReactNode;
}

export default function ReviewModallayout({
  mediaList,
  user,
  date,
  likeCount,
  brandName,
  productName,
  productOption,
  rating,
  positiveComment,
  negativeComment,
  imageUrl,
}: ReviewModallayoutProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-[55.2rem] rounded-xl bg-white">
        {/* 좌측: 미디어 + 하단정보 */}
        <div className="relative flex w-[55.2rem] flex-col">
          <MediaViewer mediaList={mediaList} />
          <MediaInfo user={user} date={date} likeCount={likeCount} />
        </div>
        {/* 우측: 리뷰 상세 */}
        <div className="relative flex w-[38.4rem] flex-col">
          <ReviewInfo
            brandName={brandName}
            productName={productName}
            productOption={productOption}
            rating={rating}
            positiveComment={positiveComment}
            negativeComment={negativeComment}
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
