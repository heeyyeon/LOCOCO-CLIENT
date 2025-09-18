'use client';

import Image from 'next/image';

import { ApplicantStatus } from 'types/applicant';

import Checkbox from '../../../../../../../packages/design-system/src/components/checkbox/Checkbox';
import InfoChip from '../../../../../../../packages/design-system/src/components/info-chip/InfoChip';

interface ApplicantInfoProps {
  status: ApplicantStatus;
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
const getApprovalStatusStyle = (
  status: string
): { text: string; color: 'default' | 'green' | 'red' | 'blue' } => {
  const statusMap: Record<
    string,
    { text: string; color: 'default' | 'green' | 'red' | 'blue' }
  > = {
    대기중: { text: '대기중', color: 'default' },
    승인: { text: '승인', color: 'green' },
    거절: { text: '거절', color: 'red' },
    검토중: { text: '검토중', color: 'blue' },
  };

  return statusMap[status] || { text: status, color: 'default' };
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
  const handleCheckboxChange = (checked: boolean) => {
    onSelect?.(checked);
  };

  return (
    <tr className="flex h-[12rem] w-[93.6rem] items-center border-b border-gray-400">
      {/* 체크박스 */}
      <td className="ml-[1.6rem] mr-[1.4rem]">
        <Checkbox
          checked={status === 'selected'}
          onCheckedChange={handleCheckboxChange}
          className="h-[2.4rem] w-[2.4rem] flex-shrink-0"
        />
      </td>

      {/* 크리에이터 프로필 이미지 */}
      <td className="mr-[2.4rem] flex-shrink-0">
        <Image width={72} height={72} src={profileImage} alt={userName} />
      </td>

      {/* 크리에이터 이름/아이디 */}
      <td className="mr-[3.2rem] flex w-[14.8rem] flex-col gap-[0.4rem]">
        <p className="body1 text-gray-800">{userName}</p>
        <p className="body3 text-gray-600">{snsId}</p>
      </td>

      {/* 팔로워 숫자 */}
      <td className="mr-[3.2rem] flex w-[14.8rem] flex-col gap-[0.4rem]">
        <div className="flex items-center gap-[0.8rem]">
          <Image
            src={profileImage}
            alt="instagram logo"
            width={24}
            height={24}
          />
          <span className="body3 text-gray-800">
            {formatNumber(instagramFollower)}
          </span>
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <Image src={profileImage} alt="tiktok logo" width={24} height={24} />
          <span className="body3 text-gray-800">
            {formatNumber(tiktokFollower)}
          </span>
        </div>
      </td>

      {/* 참여 캠페인 수 */}
      <td className="mr-[3.2rem] w-[14.8rem]">
        <span className="body3 text-gray-600">{joinedCampaign}</span>
      </td>

      {/* 지원 날짜 */}
      <td className="mr-[3.2rem] w-[14.8rem]">
        <span className="body3 text-gray-600">{applicationDate}</span>
      </td>

      {/* 승인 현황 */}
      <td className="w-fit">
        <InfoChip
          text={getApprovalStatusStyle(approvalStatus).text}
          color={getApprovalStatusStyle(approvalStatus).color}
        />
      </td>
    </tr>
  );
}
