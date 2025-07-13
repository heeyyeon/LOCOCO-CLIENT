import React from 'react';
import MediaInfo from './MediaInfo';
import MediaViewer from './MediaViewer';

export interface Media {
  type: 'video' | 'image';
  url: string;
}
export interface User {
  name: string;
  avatarUrl?: string;
}
export interface ReviewModalLayoutProps {
  mediaList: Media[];
  user: User;
  date: string;
  likeCount: number;
  children: React.ReactNode;
}

export default function ReviewModalLayout({
  mediaList,
  user,
  date,
  likeCount,
  children,
}: ReviewModalLayoutProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-[55.2rem] w-[97.2rem] rounded-xl bg-white">
        {/* 좌측: 미디어 + 하단정보 */}
        <div className="relative flex w-[55.2rem] flex-col">
          <MediaViewer mediaList={mediaList} />
          <MediaInfo user={user} date={date} likeCount={likeCount} />
        </div>
        {/* 우측: 리뷰 내용 (작업 예정) */}
        <div className="flex-1 px-[1.6rem]">{children}</div>
      </div>
    </div>
  );
}
