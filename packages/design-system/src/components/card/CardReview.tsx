import { cva } from 'class-variance-authority';
import { SvgCheck } from '../../icons/fill/components//Check';
import { SvgLikeFill } from '../../icons/fill/components/LikeFill';
import { Badge } from '../badge';

interface CardReviewProps {
  type?: 'video' | 'image';
  isShowRank?: boolean;
  rank?: number;
  brand: string;
  title: string;
  reviewId: number;
  isLiked: boolean;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
  label?: string;
  onLikeToggle?: (reviewId: number, isLiked: boolean) => void;
  onCardClick?: (reviewId: number) => void;
}
export default function CardReview({
  type = 'image',
  isShowRank,
  rank,
  brand,
  title,
  reviewId,
  isLiked,
  rating,
  reviewCount,
  likeCount,
  imageUrl,
  label,
  onLikeToggle,
  onCardClick,
}: CardReviewProps) {
  const imageWrapperVariant = cva(
    'relative bg-gray-700 border-[0.0625rem] border-gray-200',
    {
      variants: {
        type: {
          video: 'w-[16.5rem] h-[22rem]',
          image: 'w-[16.5rem] h-[16.5rem]',
        },
      },
    }
  );
  return (
    <article className="flex w-[16.5rem] cursor-pointer flex-col">
      <div className={imageWrapperVariant({ type })}>
        <img />
        <Badge rank={1} />
        <div className="absolute bottom-0 flex flex-col gap-[0.5rem] px-[1.6rem] py-[1.2rem]">
          <div className="flex flex-col justify-center">
            <p className="text-en-title2 font-[700] text-white">{brand}</p>
            <p className="text-jp-body2 font-[500] text-white">{title}</p>
          </div>
          <div className="flex gap-[0.5rem]">
            <SvgLikeFill size={24} fill="white" />
            <p className="text-en-body1 font-[500] text-white">{likeCount}</p>
          </div>
        </div>
      </div>
      <div className="flex h-[3.25rem] items-center justify-center gap-[0.5rem] border-b-[0.0625rem] border-pink-500">
        <SvgCheck size={24} fill="rgba(255, 72, 143, 1)" />
        <p className="text-jp-title3 font-[700] text-pink-500">{label}</p>
      </div>
    </article>
  );
}
