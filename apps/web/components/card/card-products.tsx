import { ProductItems } from 'type/product';
import Image from 'next/image';
import {
  Badge,
  SvgLikeFill,
  SvgLikeOutline,
  SvgStar,
} from '@lococo/design-system';

/**
 *
 * @param rank (optional) Card에서 뱃지에 나타낼 순위를 나타내는 props, {...(inRange(rank, 1, 3) && { rank: rank })}와 같이 사용하여 불필요할 시 넣지 않으면 됨
 * @param brand 브랜드명
 * @param title 상품명
 * @param description 상품 상세 설명 ex. 피그마 기준 용량 옵션
 * @param productId 서버에서 제공한 상품 고유 ID
 * @param isLiked 현재 사용자가 해당 상품에 대해 좋아요를 눌렀는지
 * @param rating 5점 만점 기준 평점
 * @param reviewCount 해당 상품에 대한 총 리뷰 수
 * @param imageUrl 대표 이미지 주소
 * @param handleCardClick 전체 카드 클릭 시에 작동할 이벤트
 * @param handleLickToggle 좋아요 버튼 눌렀을 때 작동할 이벤트
 * @returns
 */
export default function CardProduct({
  rank,
  brand,
  title,
  description,
  productId,
  isLiked,
  rating,
  reviewCount,
  imageUrl,
  handleCardClick,
  handleLikeToggle,
}: ProductItems) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLikeToggle?.(productId, isLiked);
  };

  return (
    <article
      className="flex w-[26.4rem] cursor-pointer flex-col"
      onClick={() => handleCardClick?.(productId)}
    >
      <div className="relative border-[0.1rem] border-gray-200">
        {imageUrl ? (
          <Image
            className="h-[26.4rem] w-[26.4rem] object-cover"
            src={imageUrl}
            alt={title}
          />
        ) : (
          <div className="flex h-[26.4rem] w-[26.4rem] items-center justify-center">
            상품 이미지 준비중
          </div>
        )}
        {rank && <Badge rank={rank} />}
      </div>
      <div className="flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-dashed border-pink-500">
        <p className="text-jp-body1 font-[700]">{brand}</p>
        <button onClick={handleLikeClick}>
          {isLiked ? (
            <SvgLikeFill size={24} className="fill-pink-500" />
          ) : (
            <SvgLikeOutline size={24} className="fill-white" />
          )}
        </button>
      </div>
      <div className="flex h-[4.4rem] items-center border-b-[0.1rem] border-dashed border-pink-500">
        <p className="text-jp-body2 font-[500]">{title}</p>
      </div>
      <div className="text-en-caption1 flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-pink-500 text-gray-600">
        <p>{description}</p>
        <div className="flex items-center">
          <SvgStar size={16} className="fill-yellow" />
          <p>
            {rating}/5({reviewCount})
          </p>
        </div>
      </div>
    </article>
  );
}
