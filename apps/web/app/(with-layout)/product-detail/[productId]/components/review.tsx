import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Avatar, SvgImgPhoto } from '@lococo/design-system';
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
    queryKey: PRODUCT_DETAIL_QUERY_KEYS.REVIEW_LIST(Number(productId)),
    queryFn: () => getReviewList(Number(productId)),
  });

  const reviewListData = reviewList?.imageReviews;
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <h3 className="jp-head3 font-bold">写真付きレビュー</h3>
      {reviewListData && reviewListData.length > 0 ? (
        reviewListData.map((review) => (
          <div
            key={review.reviewId}
            className="flex h-fit w-full justify-between gap-[2.4rem] border-b-2 border-pink-500 py-[2.4rem]"
          >
            <div className="flex w-[84rem] flex-col gap-[2.4rem]">
              <CommentBox type="positive" text={review.positiveComment} />
              <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
              <CommentBox type="negative" text={review.negativeComment} />
              <div className="flex gap-[1.26em]">
                {review.images?.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    alt="reviewImage"
                    width={100}
                    height={100}
                    className="h-[10rem] w-[10rem] object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-[1.2rem]">
                  <p className="jp-title3 font-bold text-gray-800">
                    参考になった
                  </p>

                  <ReactionToggle variant="horizontal" pressed={true}>
                    <div className="flex items-center gap-[0.4rem]">
                      <SvgGoodOutline />
                      <p className="en-body1 text-gray-800">
                        {review.likeCount}
                      </p>
                    </div>
                  </ReactionToggle>
                </div>
              </div>
            </div>

            <div className="flex w-[26.4rem] flex-col items-stretch gap-[1.2rem]">
              <div className="flex items-center gap-[1.2rem]">
                <Avatar src={review.profileImageUrl} />
                <p className="en-title2 text-gray-800">{review.authorName}</p>
              </div>

              <div className="flex h-full flex-col gap-[1.2rem]">
                <Star rating={Number(review.rating)} />
                <p className="jp-caption1 text-gray-600">オプション</p>
                {review.receiptUploaded && (
                  <Tag text={'レシート'} className="inline-flex" />
                )}
              </div>

              <p className="en-caption1 self-end text-gray-600">
                {dayjs(review.writtenTime).format('YYYY年MM月DD日')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="flex h-[31.1rem] flex-col items-center justify-center gap-[2.4rem]">
            <SvgImgPhoto size={100} className="fill-pink-300" />
            <p className="jp-body1 font-[700]">
              登録された動画レビューはありません。
            </p>
          </div>
        </>
      )}
    </div>
  );
}
