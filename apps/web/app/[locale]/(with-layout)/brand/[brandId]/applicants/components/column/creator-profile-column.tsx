import { Avatar } from '@lococo/design-system/avatar';

export default function CreatorProfileColumn({
  creatorProfileImageUrl,
  creatorFullName,
  creatorNickName,
}: {
  creatorProfileImageUrl: string;
  creatorFullName: string;
  creatorNickName: string;
}) {
  return (
    <div className="flex w-[24.4rem] items-center gap-[2.4rem]">
      <Avatar src={creatorProfileImageUrl} />
      <div className="flex flex-col">
        <p className="text-inter-body1 font-bold text-gray-800">
          {creatorFullName}
        </p>
        <p className="text-inter-body3 text-gray-600">@{creatorNickName}</p>
      </div>
    </div>
  );
}
