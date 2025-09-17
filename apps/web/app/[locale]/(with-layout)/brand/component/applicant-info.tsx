'use client';

import Image from 'next/image';

import InfoChip from 'node_modules/@lococo/design-system/src/components/info-chip/InfoChip';

interface ApplicantInfoProps {
  status: 'default' | 'selected' | 'nonSelected';
  profileImage: string;
  userName: string;
  snsId: string;
  instagramFollower: number;
  tiktokFollower: number;
  joinedCampaign: number;
  applicationDate: string;
  approvalStatus: string;
  onSelect?: (selected: boolean) => void;
}

// 숫자 포맷팅 함수
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// 승인 상태 스타일 매핑
const getApprovalStatusStyle = (status: string) => {
  const statusMap: Record<string, { text: string; className: string }> = {
    대기중: { text: '대기중', className: 'bg-gray-100 text-gray-600' },
    승인: { text: '승인', className: 'bg-green-100 text-green-600' },
    거절: { text: '거절', className: 'bg-red-100 text-red-600' },
    검토중: { text: '검토중', className: 'bg-blue-100 text-blue-600' },
  };

  return (
    statusMap[status] || {
      text: status,
      className: 'bg-gray-100 text-gray-600',
    }
  );
};

export default function ApplicantInfo({
  status,
  profileImage,
  userName,
  snsId,
  instagramFollower,
  tiktokFollower,
  joinedCampaign,
  applicationDate,
  approvalStatus,
  onSelect,
}: ApplicantInfoProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(e.target.checked);
  };

  return (
    <tr className="flex h-[12rem] w-[93.6rem] items-center border-b border-gray-400">
      <input
        type="checkbox"
        checked={status === 'selected'}
        onChange={handleCheckboxChange}
        className="ml-[1.6rem] mr-[1.4rem] h-[2.4rem] w-[2.4rem] rounded-[0.1rem] border-gray-400"
      />
      {/* 크리에이터 정보 */}
      <div className="mr-[2.4rem] flex-shrink-0">
        <Image width={72} height={72} src={profileImage} alt={userName} />
      </div>
      <div className="flex items-center gap-[3.2rem]">
        {/* 크리에이터 */}
        <td className="flex w-[14.8rem] flex-col gap-[0.4rem]">
          <p className="body1 text-gray-800">{userName}</p>
          <p className="body3 text-gray-600">{snsId}</p>
        </td>

        {/* 팔로워 숫자 */}
        <td className="flex w-[14.8rem] flex-col gap-[0.4rem]">
          <div className="flex items-center gap-[0.8rem]">
            <Image src={''} alt="instagram logo" width={24} height={24} />
            <span className="body3 text-gray-800">
              {formatNumber(instagramFollower)}
            </span>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <Image src={''} alt="tiktok logo" width={24} height={24} />
            <span className="body3 text-gray-800">
              {formatNumber(tiktokFollower)}
            </span>
          </div>
        </td>

        {/* 참여 캠페인 수 */}
        <td className="w-[14.8rem]">
          <span className="body3 text-gray-600">{joinedCampaign}</span>
        </td>

        {/* 지원 날짜 */}
        <td className="w-[14.8rem]">
          <span className="body3 text-gray-600">{applicationDate}</span>
        </td>

        {/* 승인 현황 */}
        <td className="w-[14.8rem]">
          <InfoChip
            text={getApprovalStatusStyle(approvalStatus).text}
            color={'green'}
          />
        </td>
      </div>
    </tr>
  );
}
