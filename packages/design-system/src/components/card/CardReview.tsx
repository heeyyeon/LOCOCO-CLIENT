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
  return (
    <article className="flex w-[26.4rem] cursor-pointer flex-col bg-gray-400">
      <div className="relative">
        <img />
        <Badge rank={1} />
      </div>
      <div>brand</div>
      <div>title</div>
      <div>description</div>
    </article>
  );
}
