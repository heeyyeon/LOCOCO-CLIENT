import { cva } from 'class-variance-authority';
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
  const imageWrapperVariant = cva('relative bg-gray-300', {
    variants: {
      type: {
        video: 'w-[16.5rem] h-[22rem]',
        image: 'w-[16.5rem] h-[16.5rem]',
      },
    },
  });
  return (
    <article className="flex w-[26.4rem] cursor-pointer flex-col">
      <div className={imageWrapperVariant({ type })}>
        <img />
        <Badge rank={1} />
        <div className="absolute bottom-0 px-[1.6rem] py-[1.2rem]">
          <div className="flex flex-col justify-center">
            <p className="text-en-title2 font-[700]">{brand}</p>
            <p className="text-jp-body2 font-[500]">{title}</p>
          </div>
          <div></div>
        </div>
      </div>
      <div>label</div>
    </article>
  );
}
