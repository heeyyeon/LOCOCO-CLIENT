'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { cn } from '@lococo/utils';

import BracketChip, { getChipText, getChipVariant } from './Barket';

interface CardProps {
  endTime: string;
  brandName: string;
  className?: string;
  deadline: string;
  participationStatus: string;
  handleButtonClick?: () => void;
  buttonText?: string;
  campaignImageUrl?: string;
}

export default function Card({
  deadline,
  brandName,
  campaignImageUrl,
  className,
  participationStatus,
  handleButtonClick,
  buttonText,
}: CardProps) {
  const card = useTranslations('card');

  const isValidImageUrl = (url: string) => {
    return (
      url &&
      url.trim() !== '' &&
      (url.startsWith('http') || url.startsWith('/'))
    );
  };
  const fallbackImage = '/next.svg';

  return (
    <div
      className={cn(
        'relative w-[28.4rem] overflow-hidden rounded-[2.4rem]',
        className
      )}
    >
      <div className="relative h-[20.8rem] w-full overflow-hidden">
        <Image
          width={284}
          height={208}
          unoptimized={true}
          src={
            isValidImageUrl(campaignImageUrl || '')
              ? campaignImageUrl || ''
              : fallbackImage
          }
          alt={`${brandName}${card('campaignThumbnailImage')}`}
          className="h-full w-full object-cover"
        />
      </div>
      <BracketChip
        text={getChipText(participationStatus)}
        chipVariant={getChipVariant(participationStatus)}
        className="absolute right-[1.6rem] top-[1.6rem]"
      />
      <div className="flex w-full flex-col bg-white p-[1.6rem]">
        <div className="flex flex-col gap-[0.8rem]">
          <div>
            <p className="body4">{deadline}</p>
            <p className="title3 truncate">{brandName}</p>
          </div>
        </div>

        {handleButtonClick && buttonText && (
          <div className="mt-[1.6rem]">
            <button
              onClick={handleButtonClick}
              className={cn(
                'body2 flex h-[4.8rem] w-full cursor-pointer items-center justify-center rounded-[3.2rem] bg-pink-500 font-[700] text-white',
                participationStatus === 'REJECTED' &&
                  'border-red text-red border bg-white',
                participationStatus === 'COMPLETED' &&
                  'bg-gray-200 text-gray-500'
              )}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
