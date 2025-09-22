'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from 'i18n/navigation';

import { cn } from '@lococo/utils';

import InfoChip from '../../../../packages/design-system/src/components/info-chip/InfoChip';
import BracketChip from './BracketChip';

interface CardProps {
  dueDate: string;
  chipVariant: 'expired' | 'active' | 'approved' | 'declined' | 'progress';
  brand: string;
  title: string;
  label?: string;
  maxApplicants: number;
  currentApplicants: number;
  productThumbnailSrc: string;
  campaignId: number;
  className?: string;
  hoverOption?: 'hover' | 'always';
}

export default function Card({
  dueDate,
  brand,
  title,
  label,
  maxApplicants,
  currentApplicants,
  productThumbnailSrc,
  campaignId,
  chipVariant,
  className,
  hoverOption = 'hover',
}: CardProps) {
  const card = useTranslations('card');

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
        src={productThumbnailSrc}
        alt={`${title}${card('campaignThumbnailImage')}`}
      />
      <BracketChip
        dueDate={dueDate}
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
            <p className="body4">{brand}</p>
            <p className="title3">{title}</p>
          </div>
          {label && (
            <div className="flex items-center gap-[0.8rem]">
              <InfoChip text={label} />
              <InfoChip
                icon={true}
                text={`${currentApplicants}/${maxApplicants}`}
              />
            </div>
          )}
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
