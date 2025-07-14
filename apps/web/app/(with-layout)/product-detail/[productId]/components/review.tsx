import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Avatar } from '@lococo/design-system';
import { Star } from '@lococo/design-system';
import { Tag } from '@lococo/design-system';
import { ReactionToggle } from '@lococo/design-system';
import { SvgGoodOutline } from '@lococo/design-system';
import { getReviewList } from '../apis';
import { PRODUCT_DETAIL_QUERY_KEYS } from '../queries';
import CommentBox from './comment-box';

//TODO: isAuthor 분기처리
//TODO: 좋아요 로직 추가
export default function Review() {
  const { productId } = useParams();
  const { data: reviewList } = useQuery({
    queryKey: PRODUCT_DETAIL_QUERY_KEYS.REVIEW(Number(productId)),
    queryFn: () => getReviewList(Number(productId)),
  });

  return (
    <div className="flex h-fit w-full justify-between gap-[2.4rem] border-b-2 border-pink-500 py-[2.4rem]">
      <div className="flex w-[84rem] flex-col gap-[2.4rem]">
        <CommentBox type="positive">{reviewList?.positiveComment}</CommentBox>
        <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
        <CommentBox type="negative">{reviewList?.negativeComment}</CommentBox>

        <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-[1.2rem]">
            <p className="jp-title3 font-bold text-gray-800">参考になった</p>

            <ReactionToggle variant="horizontal" pressed={true}>
              <div className="flex items-center gap-[0.4rem]">
                <SvgGoodOutline />
                <p className="en-body1 text-gray-800">
                  {reviewList?.likeCount}
                </p>
              </div>
            </ReactionToggle>
          </div>
        </div>
      </div>

      <div className="flex w-[26.4rem] flex-col items-stretch gap-[1.2rem]">
        <div className="flex items-center gap-[1.2rem]">
          <Avatar src={reviewList?.profileImageUrl}></Avatar>
          <p className="en-title2 text-gray-800">{reviewList?.authorName}</p>
        </div>

        <div className="flex h-full flex-col gap-[1.2rem]">
          <Star rating={Number(reviewList?.rating)} />
          <p className="jp-caption1 text-gray-600">オプション</p>
          {reviewList?.receiptUploaded && (
            <Tag text={'レシート'} className="inline-flex" />
          )}
        </div>

        <p className="en-caption1 self-end text-gray-600">
          {reviewList?.writtenTime}
        </p>
      </div>
    </div>
  );
}
