import { ProductItem } from 'types/product';
import Image from 'next/image';
import {
  Badge,
  SvgLikeFill,
  SvgLikeOutline,
  SvgStar,
} from '@lococo/design-system';

/**
 * 상품 카드 컴포넌트
 *
 * @param ranking (optional) Card에서 뱃지에 나타낼 순위를 나타내는 props, {...(inRange(rank, 1, 3) && { rank: rank })}와 같이 사용하여 불필요할 시 넣지 않으면 됨
 * @param brandName 브랜드명
 * @param productName 상품명
 * @param unit 상품 상세 설명 ex. 피그마 기준 용량 옵션
 * @param productId 서버에서 제공한 상품 고유 ID
 * @param isLiked 현재 사용자가 해당 상품에 대해 좋아요를 눌렀는지
 * @param rating 5점 만점 기준 평점
 * @param reviewCount 해당 상품에 대한 총 리뷰 수
 * @param imageUrl 대표 이미지 주소
 * @param handleCardClick 전체 카드 클릭 시에 작동할 이벤트
 */

interface CardProductProps extends ProductItem {
  handleCardClick: (productId: number) => void;
}

export default function CardProduct({
  ranking,
  brandName,
  productName,
  unit,
  productId,
  isLiked,
  rating,
  reviewCount,
  imageUrl,
  handleCardClick,
}: CardProductProps) {
  return (
    <article
      className="flex w-[26.4rem] cursor-pointer flex-col"
      onClick={() => handleCardClick?.(productId)}
    >
      <div className="relative border-[0.1rem] border-gray-200">
        {imageUrl ? (
          <Image
            height={264}
            width={264}
            className="h-[26.4rem] w-[26.4rem] object-cover"
            src={imageUrl}
            alt={productName}
          />
        ) : (
          <div className="flex h-[26.4rem] w-[26.4rem] items-center justify-center">
            상품 이미지 준비중
          </div>
        )}
        {ranking && <Badge rank={ranking} />}
      </div>
      <div className="flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-dashed border-pink-500">
        <p className="jp-body1 font-[700]">{brandName}</p>
        <div>
          {isLiked ? (
            <SvgLikeFill size={24} className="fill-pink-500" />
          ) : (
            <SvgLikeOutline size={24} className="fill-white" />
          )}
        </div>
      </div>
      <div className="flex h-[4.4rem] items-center border-b-[0.1rem] border-dashed border-pink-500">
        <p className="jp-body2 font-[500]">{productName}</p>
      </div>
      <div className="en-caption1 flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-pink-500 text-gray-600">
        <p>{unit}</p>
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
