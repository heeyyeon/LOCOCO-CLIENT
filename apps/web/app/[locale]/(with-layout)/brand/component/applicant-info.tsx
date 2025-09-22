'use client';

import Image from 'next/image';

import { ApplicantStatus } from 'types/applicant';

import { SvgArrowRight } from '@lococo/icons';

import Checkbox from '../../../../../../../packages/design-system/src/components/checkbox/Checkbox';
import InfoChip from '../../../../../../../packages/design-system/src/components/info-chip/InfoChip';
import { formatNumberCompact } from '../../../../../utils/format-number-compact';

interface ApplicantInfoProps {
  status: ApplicantStatus;
  profileImage: string;
  userName: string;
  snsId: string;
  instagramFollower: number;
  tiktokFollower: number;
  joinedCampaign: number;
  applicationDate: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  mode: 'recruiting' | 'selected';
  onSelect?: (selected: boolean) => void;
}

// 승인 상태 스타일 매핑
const getApprovalStatusStyle = (
  status: string
): { text: string; color: 'default' | 'green' | 'red' | 'blue' } => {
  const statusMap: Record<
    string,
    { text: string; color: 'default' | 'green' | 'red' | 'blue' }
  > = {
    PENDING: { text: '대기중', color: 'default' },
    APPROVED: { text: '승인', color: 'green' },
    REJECTED: { text: '거절', color: 'red' },
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
  mode,
}: ApplicantInfoProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelect?.(checked);
  };

  return (
    <tr
      className={`relative flex h-[12rem] w-[93.6rem] items-center border-b border-gray-400 ${
        status === 'selected' ? 'bg-pink-100' : ''
      }`}
    >
      {/* 체크박스 */}
      {mode === 'recruiting' && (
        <td className="ml-[1.6rem] mr-[1.4rem] bg-transparent">
          <Checkbox
            checked={status === 'selected' || status === 'selectedBlock'}
            disabled={status === 'block' || status === 'selectedBlock'}
            onCheckedChange={handleCheckboxChange}
            className="h-[2.4rem] w-[2.4rem] flex-shrink-0 rounded-[0.6rem]"
          />
        </td>
      )}

      {/* 크리에이터 프로필 이미지 */}
      <td className="mr-[2.4rem] flex-shrink-0">
        <Image
          width={72}
          height={72}
          src={profileImage}
          alt={userName}
          className="rounded-[5rem]"
        />
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
            src="/instagram.svg"
            alt="instagram logo"
            width={24}
            height={24}
          />
          <span className="body3 text-gray-800">
            {formatNumberCompact(instagramFollower)}
          </span>
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <Image src="/tiktok.svg" alt="tiktok logo" width={24} height={24} />
          <span className="body3 text-gray-800">
            {formatNumberCompact(tiktokFollower)}
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
      {mode === 'selected' && (
        <td className="absolute right-[1.6rem]">
          <SvgArrowRight />
        </td>
      )}
    </tr>
  );
}
