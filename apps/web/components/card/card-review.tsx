import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { Badge, SvgLikeFill } from '@lococo/design-system';

interface CardReviewProps {
  type?: 'video' | 'image';
  rank?: number;
  brand: string;
  title: string;
  reviewId: number;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
  handleCardClick?: (reviewId: number) => void;
}

const imageWrapperVariant = cva(
  'relative border-[0.0625rem] border-gray-200 flex items-center justify-center bg-gray-200',
  {
    variants: {
      type: {
        video: 'w-[16.5rem] h-[22rem]',
        image: 'w-[16.5rem] h-[16.5rem]',
      },
    },
  }
);

export default function CardReview({
  type = 'image',
  rank,
  brand,
  title,
  reviewId,
  likeCount,
  imageUrl,
  handleCardClick,
}: CardReviewProps) {
  return (
    <article
      className="flex w-[16.5rem] cursor-pointer flex-col"
      onClick={() => handleCardClick?.(reviewId)}
    >
      <div className={imageWrapperVariant({ type })}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-sm text-gray-400">이미지 준비중</p>
        )}
        {rank && <Badge rank={rank} />}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[0.5rem] p-[1.6rem_1.6rem_1.2rem]">
          <div>
            <p className="text-en-title2 font-[700] text-white">{brand}</p>
            <p className="text-jp-body2 font-[500] text-white">{title}</p>
          </div>
          <div className="flex items-center gap-[0.5rem]">
            <SvgLikeFill size={24} fill="white" />
            <p className="text-en-body1 font-[500] text-white">{likeCount}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
