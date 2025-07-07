'use client';

import { inRange } from 'es-toolkit';
import {
  Badge,
  Button,
  SvgArrowUp,
  SvgErrorFill,
  SvgHome,
  SvgLikeFill,
} from '@lococo/design-system';
import CardProduct from '../components/card/card-products';
import CardReview from '../components/card/card-review';
import { MOCK_CARD_PRODUCT, MOCK_CARD_REVIEW } from '../mock/card-props-mock';

export default function Home() {
  return (
    <div>
      <Button size="small">ui 컴포넌트 핑크 버튼</Button>
      <div className="mt-12 flex space-x-14">
        <div>
          <p className="text-jp-head1 font-bold">head1 JP</p>
          <p className="text-jp-head2 font-bold">head2 JP</p>
          <p className="text-jp-head3 font-bold">head3 JP</p>
          <p className="text-jp-title1 font-bold">title1 JP</p>
          <p className="text-jp-title2 font-bold">title 2 JP</p>
          <p className="text-jp-title3 font-bold">title 3 JP</p>
          <p className="text-jp-body1 font-bold">body1 JP</p>
          <p className="text-jp-body2 font-medium">body2 JP</p>
          <p className="text-jp-caption1 font-bold">caption1 JP</p>
          <p className="text-jp-caption2 font-medium">caption2 JP</p>
          <p className="text-jp-caption3 font-regular">caption3 JP</p>
        </div>
        <div>
          <p className="text-en-head1 font-bold">head1 EN</p>
          <p className="text-en-title1 font-bold">title1 EN</p>
          <p className="text-en-title2 font-bold">title 2 EN</p>
          <p className="text-en-title3 font-bold">title 3 EN</p>
          <p className="text-en-body1 font-bold">body1 b EN</p>
          <p className="text-en-body1 font-medium">body1 m EN</p>
          <p className="text-en-caption1 font-bold">caption1 b EN</p>
          <p className="text-en-caption1 font-medium">caption1 m EN</p>
        </div>
      </div>
      <SvgHome />
      <SvgHome size={32} className="stroke-blue" />
      <SvgHome className="stroke-blue" />
      <SvgArrowUp className="fill-pink-400" />
      <SvgErrorFill />
      <SvgLikeFill className="fill-pink-400" />
      <Badge rank={1} className="bg-pink-200" />
      {MOCK_CARD_PRODUCT.map(
        ({
          productId,
          brand,
          title,
          description,
          isLiked,
          likeCount,
          rating,
          rank,
          reviewCount,
        }) => (
          <CardProduct
            key={productId}
            brand={brand}
            title={title}
            description={description}
            productId={productId}
            isLiked={isLiked}
            likeCount={likeCount}
            rating={rating}
            reviewCount={reviewCount}
            {...(inRange(rank, 1, 3) && { rank: rank })}
          />
        )
      )}
      {MOCK_CARD_REVIEW.map(
        ({ type, brand, title, reviewId, likeCount, rank }) => (
          <CardReview
            key={reviewId}
            type={type}
            brand={brand}
            title={title}
            reviewId={reviewId}
            likeCount={likeCount}
            {...(inRange(rank, 1, 3) && { rank: rank })}
          />
        )
      )}
    </div>
  );
}
