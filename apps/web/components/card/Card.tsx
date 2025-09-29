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
  hoverOption?: 'hover' | 'always';
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
  hoverOption = 'hover',
}: CardProps) {
  const card = useTranslations('card');

  const isValidImageUrl = (url: string) => {
    return (
      url &&
      url.trim() !== '' &&
      (url.startsWith('http') || url.startsWith('/'))
    );
  };

  const renderCampaignType = (type: string) => {
    if (type == 'GIVEAWAY') return 'Give away';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const fallbackImage = '/next.svg';
  return (
    <div
      className={cn(
        'relative w-[36rem] overflow-hidden rounded-[2.4rem]',
        hoverOption === 'hover' ? 'group h-[33.1rem]' : '',
        className
      )}
    >
      <Image
        width={360}
        height={216}
        unoptimized={true}
        src={
          isValidImageUrl(campaignImageUrl) ? campaignImageUrl : fallbackImage
        }
        alt={`${campaignName}${card('campaignThumbnailImage')}`}
      />
      <BracketChip
        dueDate={endTime}
        chipVariant={chipVariant}
        className="absolute right-[1.6rem] top-[1.6rem]"
      />
      <div
        className={cn(
          'flex w-full flex-col bg-white p-[1.6rem]',
          hoverOption === 'hover' &&
            'absolute bottom-0 h-[11.5rem] transition-all duration-300 group-hover:h-[17.9rem]'
        )}
      >
        <div className="flex flex-col gap-[0.8rem]">
          <div>
            <p className="body4 font-[500]">{brandName}</p>
            <p className="title3 truncate font-[700]">{campaignName}</p>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <InfoChip text={renderCampaignType(campaignType)} />
            <InfoChip
              icon={true}
              text={`${applicantNumber}/${recruitmentNumber}`}
            />
          </div>
        </div>

        <div
          className={cn(
            'mt-[1.6rem]',
            hoverOption === 'hover' &&
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          )}
        >
          <Link
            href={`/campaign/${campaignId}`}
            className="body2 flex h-[4.8rem] w-full items-center justify-center rounded-[3.2rem] bg-pink-100 font-[700] text-pink-500"
          >
            {card('goToApply')}
          </Link>
        </div>
      </div>
    </div>
  );
}
