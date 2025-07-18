import { useQuery } from '@tanstack/react-query';
import LoadingSvg from 'components/loading/loading-svg';
import { useParams } from 'next/navigation';
import { SvgImgPhoto } from '@/icons';
import { getReviewList } from '../apis';
import { PRODUCT_DETAIL_QUERY_KEYS } from '../queries';
import Review from './review';

interface ReviewListProps {
  authStatus: boolean;
}

export default function ReviewList({ authStatus }: ReviewListProps) {
  const { productId } = useParams();

  const { data: reviewList, isPending } = useQuery({
    queryKey: PRODUCT_DETAIL_QUERY_KEYS.REVIEW_LIST(Number(productId)),
    queryFn: () => getReviewList(Number(productId)),
  });

  if (isPending) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }
  const reviewListData = reviewList?.imageReviews;
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <h3 className="jp-head3 font-bold">写真付きレビュー</h3>
      {reviewListData && reviewListData.length > 0 ? (
        reviewListData.map((review) => (
          <Review
            authStatus={authStatus}
            key={review.reviewId}
            images={review.images}
            writtenTime={review.writtenTime}
            positiveComment={review.positiveComment}
            negativeComment={review.negativeComment}
            likeCount={review.likeCount}
            brandName={review.brandName}
            profileImageUrl={review.profileImageUrl}
            authorName={review.authorName}
            rating={review.rating}
            receiptUploaded={review.receiptUploaded}
            isMine={review.isMine}
            isLiked={review.isLiked}
            option={review.option}
            reviewId={review.reviewId}
            productName={review.productName}
            authorId={review.authorId}
            isAdmin={reviewList.isAdmin}
          />
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
