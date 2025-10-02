'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from 'i18n/navigation';

import { cn } from '@lococo/utils';

import InfoChip from '../../../../packages/design-system/src/components/info-chip/InfoChip';
import BracketChip from './BracketChip';

interface CardMyPageProps {
  campaignName?: string;
  campaignImageUrl?: string;
  endTime?: string;
  chipContent?: string;
  chipVariant?:
    | 'OPEN_RESERVED'
    | 'COMPLETED'
    | 'DRAFT'
    | 'WAITING_APPROVAL'
    | 'RECRUITING'
    | 'RECRUITMENT_CLOSED'
    | 'IN_REVIEW';
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  recruitmentNumber?: number;
  applicantNumber?: number;
  campaignId: number;
  className?: string;
}

export default function CardMyPage({
  campaignName,
  campaignImageUrl,
  endTime,
  chipContent,
  chipVariant,
  buttonLabel,
  buttonHref,
  recruitmentNumber,
  applicantNumber,
  onButtonClick,
  className,
}: CardMyPageProps) {
  const card = useTranslations('card');
  const fallbackImage = '/logo.svg';

  const buttonContent = (
    <div className="body2 flex h-[4.8rem] w-full items-center justify-center rounded-[3.2rem] bg-pink-100 font-[700] text-pink-500">
      {buttonLabel}
    </div>
  );

  return (
    <div
      className={cn(
        'relative flex h-[34.2rem] w-[28.4rem] flex-col overflow-hidden rounded-[2.4rem] border border-gray-200',
        className
      )}
    >
      <div className="relative flex-1">
        <Image
          fill
          className="object-cover"
          src={campaignImageUrl || fallbackImage}
          alt={`${campaignName}${card('campaignThumbnailImage')}`}
        />
        <BracketChip
          content={chipContent}
          chipVariant={chipVariant}
          className="absolute right-[1.6rem] top-[1.6rem]"
        />
      </div>
      <div className="flex h-[17.9rem] w-full flex-col bg-white p-[1.6rem]">
        <div className="flex flex-col gap-[0.8rem]">
          <div>
            {endTime && <p className="body4 font-[500]">{endTime}</p>}
            <p className="title3 truncate font-[700]">{campaignName}</p>
          </div>
          {recruitmentNumber !== undefined && applicantNumber !== undefined && (
            <div className="flex items-center gap-[0.8rem]">
              <InfoChip icon text={`${applicantNumber}/${recruitmentNumber}`} />
            </div>
          )}
        </div>
        <div className="mt-[1.6rem]">
          {onButtonClick ? (
            <button onClick={onButtonClick} className="w-full">
              {buttonContent}
            </button>
          ) : buttonHref ? (
            <Link href={buttonHref}>{buttonContent}</Link>
          ) : (
            <div className="opacity-50">{buttonContent}</div>
          )}
        </div>
      </div>
    </div>
  );
}
