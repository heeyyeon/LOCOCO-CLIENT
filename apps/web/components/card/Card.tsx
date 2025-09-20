'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from 'i18n/navigation';

import { cn } from '@lococo/utils';

import InfoChip from '../../../../packages/design-system/src/components/info-chip/InfoChip';
import BracketChip from './BracketChip';

interface CardProps {
  endTime: string;
  chipVariant: 'disabled' | 'default' | 'approved' | 'declined' | 'progress';
  brandName: string;
  campaignName: string;
  campaignType: string;
  recruitmentNumber: number;
  applicantNumber: number;
  campaignImageUrl: string;
  campaignId: number;
  className?: string;
}

export default function Card({
  endTime,
  brandName,
  campaignName,
  campaignType,
  recruitmentNumber,
  applicantNumber,
  campaignImageUrl,
  campaignId,
  chipVariant,
  className,
}: CardProps) {
  const card = useTranslations('card');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const fallbackImage = '/next.svg';
  return (
    <div
      className={cn(
        'group relative h-[33.1rem] w-[36rem] overflow-hidden rounded-[2.4rem]',
        className
      )}
    >
      <Image
        width={360}
        height={216}
        src={isValidUrl(campaignImageUrl) ? campaignImageUrl : fallbackImage}
        alt={`${campaignName}${card('campaignThumbnailImage')}`}
      />
      <BracketChip
        dueDate={endTime}
        chipVariant={chipVariant}
        className="absolute right-[1.6rem] top-[1.6rem]"
      />
      <div className="absolute bottom-0 flex h-[11.5rem] w-full flex-col justify-between bg-white p-[1.6rem] transition-all duration-300 group-hover:h-[17.9rem]">
        <div className="flex flex-col gap-[0.8rem]">
          <div>
            <p className="body4">{brandName}</p>
            <p className="title3 truncate">{campaignName}</p>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <InfoChip text={campaignType} />
            <InfoChip
              icon={true}
              text={`${applicantNumber}/${recruitmentNumber}`}
            />
          </div>
        </div>
        <div>
          <Link
            href={`/campaign/${campaignId}`}
            className="body2 flex h-[4.8rem] w-[32.8rem] items-center justify-center rounded-[3.2rem] bg-pink-100 font-[700] text-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {card('goToApply')}
          </Link>
        </div>
      </div>
    </div>
  );
}
