import Image from 'next/image';

import { followerCountFormatter } from '../../utils/follower-count-formatter';

export default function FollowerCountColumn({
  instagramFollower,
  tiktokFollower,
}: {
  instagramFollower: number;
  tiktokFollower: number;
}) {
  return (
    <div className="flex w-[14.8rem] flex-col gap-[0.4rem]">
      <div className="flex items-center gap-[0.8rem]">
        <Image
          src="/instagram.svg"
          alt="instagram logo"
          width={20}
          height={20}
        />
        <p className="text-inter-body3 text-gray-800">
          {followerCountFormatter(instagramFollower)}
        </p>
      </div>
      <div className="flex items-center gap-[0.8rem]">
        <Image src="/tiktok.svg" alt="tiktok logo" width={20} height={20} />
        <p className="text-inter-body3 text-gray-800">
          {followerCountFormatter(tiktokFollower)}
        </p>
      </div>
    </div>
  );
}
