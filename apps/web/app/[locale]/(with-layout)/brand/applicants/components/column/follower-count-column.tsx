import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { followerCountFormatter } from '../../utils/follower-count-formatter';

export default function FollowerCountColumn({
  instagramFollower,
  tiktokFollower,
  instaLink,
  tiktokLink,
}: {
  instagramFollower: number;
  tiktokFollower: number;
  instaLink?: string;
  tiktokLink?: string;
}) {
  const t = useTranslations('brandApplicants.applicantsTable.SNS');

  const handleInstagramClick = (e: React.MouseEvent) => {
    if (!instaLink) {
      e.preventDefault();
      alert(t('noInstagramLink'));
      return;
    }
  };

  const handleTiktokClick = (e: React.MouseEvent) => {
    if (!tiktokLink) {
      e.preventDefault();
      alert(t('noTiktokLink'));
      return;
    }
  };

  return (
    <div className="flex w-[14.8rem] flex-col gap-[0.4rem]">
      <Link
        href={instaLink ?? ''}
        target="_blank"
        onClick={handleInstagramClick}
      >
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
      </Link>
      <Link href={tiktokLink ?? ''} target="_blank" onClick={handleTiktokClick}>
        <div className="flex items-center gap-[0.8rem]">
          <Image src="/tiktok.svg" alt="tiktok logo" width={20} height={20} />
          <p className="text-inter-body3 text-gray-800">
            {followerCountFormatter(tiktokFollower)}
          </p>
        </div>
      </Link>
    </div>
  );
}
