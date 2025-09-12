'use client';

import Image from 'next/image';

import { Link } from 'i18n/navigation';

import { cn } from '@lococo/utils';

import InfoChip from '../../../../packages/design-system/src/components/info-chip/InfoChip';
import BracketChip from './BracketChip';

interface CardProps {
  dueDate: string;
  chipVariant: 'expired' | 'active'; // variant 확장 가능
  brand: string;
  title: string;
  label: string;
  maxApplicants: number;
  currentApplicants: number;
  productThumbnailSrc: string;
  campaignId: number;
  className?: string;
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
}: CardProps) {
  return (
    <div
      className={cn(
        'group relative h-[33.1rem] w-[36rem] overflow-hidden rounded-[2.4rem] bg-gray-700',
        className
      )}
    >
      <Image
        width={360}
        height={216}
        src={productThumbnailSrc}
        alt={`${title}상품 카드`}
      />
      <BracketChip
        dueDate={dueDate}
        chipVariant={chipVariant}
        className="absolute right-[1.6rem] top-[1.6rem]"
      />
      <div className="absolute bottom-0 flex h-[11.5rem] w-full flex-col gap-[0.8rem] bg-white p-[1.6rem] transition-all duration-300 group-hover:h-[16.3rem]">
        <div>
          <p className="inter-body4">{brand}</p>
          <p className="inter-title3">{title}</p>
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <InfoChip text={label} />
          <InfoChip
            icon={true}
            text={`${currentApplicants}/${maxApplicants}`}
          />
        </div>
        <div className="mt-auto">
          <Link
            href={`/campaign/${campaignId}`}
            className="inter-body2 h-[4.8rem] w-full rounded-[3.2rem] bg-pink-100 font-[700] text-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Go to Apply
          </Link>
        </div>
      </div>
    </div>
  );
}
