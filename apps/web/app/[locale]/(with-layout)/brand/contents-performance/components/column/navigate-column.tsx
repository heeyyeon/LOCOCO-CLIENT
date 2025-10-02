import { useRouter } from 'i18n/navigation';

import { IconButton } from '@lococo/design-system/icon-button';
import { SvgArrowRight } from '@lococo/icons';

import { ReviewStatus } from '../../types';

interface NavigateColumnProps {
  isActive: boolean;

  campaignReviewId?: number;
  reviewStatus?: ReviewStatus;
  postUrl?: string;
}

export default function NavigateColumn({
  isActive,
  campaignReviewId,
  reviewStatus,
  postUrl,
}: NavigateColumnProps) {
  const router = useRouter();

  const formatUrl = (url: string | undefined): string => {
    if (!url) return '';
    // 이미 프로토콜이 있는 경우
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // 프로토콜이 없으면 https:// 추가
    return `https://${url}`;
  };

  const handleNavigate = () => {
    if (reviewStatus === 'REVISING' || reviewStatus === 'PENDING_REVISION') {
      router.push(`/brand/feedback?campaignReviewId=${campaignReviewId}`);
    } else if (reviewStatus === 'FINAL_UPLOADED') {
      const formattedUrl = formatUrl(postUrl);
      window.open(formattedUrl, '_blank');
    }
  };

  return isActive ? (
    <IconButton
      icon={<SvgArrowRight className="text-gray-400" />}
      onClick={handleNavigate}
    />
  ) : (
    <></>
  );
}
