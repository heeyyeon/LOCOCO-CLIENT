import { Badge } from '../badge';

interface CardProductProps {
  isShowRank?: boolean;
  rank?: number;
  brand: string;
  title: string;
  description: string;
  productId: number;
  isLiked: boolean;
  rating?: number;
  reviewCount?: number;
  likeCount: number;
  imageUrl?: string;
  onLikeToggle?: (productId: number, isLiked: boolean) => void;
  onCardClick?: (productId: number) => void;
}

export default function CardProduct({ brand, title, description }) {
  return (
    <article className="flex w-[26.4rem] cursor-pointer flex-col bg-gray-400">
      <div className="relative border-[0.1rem] border-gray-200">
        <img className="h-[26.4rem] w-[26.4rem]" />
        <Badge rank={1} />
      </div>
      <div className="flex h-[4.4rem] items-center justify-between">
        <p className="text-jp-body1 font-[700]">{brand}</p>
        <div>하트이미지</div>
      </div>
      <div className="flex h-[4.4rem] items-center">
        <p className="text-jp-body2 font-[500]">{title}</p>
      </div>
      <div className="text-en-caption1 flex h-[4.4rem] items-center justify-between">
        <p>{description}</p>
        <div>별점</div>
      </div>
    </article>
  );
}
