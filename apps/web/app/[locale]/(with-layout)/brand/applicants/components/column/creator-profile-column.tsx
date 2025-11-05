import { Avatar } from '@lococo/design-system/avatar';

import { ApplicantData } from '../../types';

export default function CreatorProfileColumn({
  profileImageUrl,
  creatorFullName,
  creatorNickname,
}: Pick<
  ApplicantData['creator'],
  'profileImageUrl' | 'creatorFullName' | 'creatorNickname'
>) {
  return (
    <div className="flex w-[24.4rem] items-center gap-[2.4rem]">
      <Avatar src={profileImageUrl} />
      <div className="flex flex-col">
        <p className="text-inter-body1 font-bold text-gray-800">
          {creatorFullName}
        </p>
        <p className="text-inter-body3 text-gray-600">@{creatorNickname}</p>
      </div>
    </div>
  );
}
