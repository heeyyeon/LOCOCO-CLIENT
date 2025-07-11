import { useState } from 'react';
import { Avatar } from '@lococo/design-system';
import { ReactionToggle } from '@lococo/design-system';
import { SvgLikeFill } from '@lococo/design-system';
import { SvgLikeOutline } from '@lococo/design-system';
import { SvgSend } from '@lococo/design-system';

interface MediaInfoProps {
  user: { name: string; avatarUrl?: string };
  date: string;
  likeCount: number;
}

export default function MediaInfo({ user, date, likeCount }: MediaInfoProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-10 flex h-[16rem] w-full items-center justify-between rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-[1.6rem]">
      <div className="mt-auto flex flex-col">
        <div className="mb-[1.2rem] flex flex-row items-center gap-[1.2rem]">
          <Avatar src={user?.avatarUrl} width={90} />
          <div className="en-body1 font-bold text-white">{user?.name}</div>
        </div>
        <div className="en-caption1 text-white">{date}</div>
      </div>
      <div className="pointer-events-auto flex flex-col items-center gap-4">
        <SvgSend className="h-[6.4rem] cursor-pointer fill-white transition-colors hover:fill-gray-400" />
        <ReactionToggle
          variant="vertical"
          pressed={isLiked}
          onPressedChange={setIsLiked}
          className="text-white"
        >
          {isLiked ? <SvgLikeFill /> : <SvgLikeOutline />}
          <span className="text-en-body1">{likeCount}</span>
        </ReactionToggle>
      </div>
    </div>
  );
}
