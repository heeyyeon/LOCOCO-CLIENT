//import ModalFooter from 'components/modal/modal';
// import { ReviewInfoFooter } from './review-info-footer';
import Image from 'next/image';
import { Star, Tag } from '@lococo/design-system';
import { cn } from '@/lib/utils';
import Comment from './comment';

interface ReviewInfoProps {
  onClose?: () => void;
  rating: number;
  productOption: string;
  positiveComment: string;
  negativeComment: string;
  productName: string;
  imageUrl: string;
  brandName: string;
}

export default function ReviewInfo({
  onClose,
  rating,
  productOption,
  positiveComment,
  negativeComment,
  productName,
  imageUrl,
  brandName,
}: ReviewInfoProps) {
  return (
    <>
      {/* 헤더 */}
      <header
        className={cn(
          'text-jp-body1 fixed flex h-[4.8rem] w-[38.4rem] shrink-0 items-center gap-[1rem] self-stretch border-b border-pink-500 p-[0.8rem] pl-[1.6rem] font-bold'
        )}
      >
        <span>レビュー</span>
      </header>

      {/* 바디 */}
      <div className="mt-[4.8rem] p-[1.6rem]">
        <Star rating={rating} size="sm" color="yellow" />
        <div className="text-jp-caption1 mt-[1.2rem] flex flex-row items-center gap-[0.6rem] font-medium text-gray-600">
          <span>オプション :</span>
          <span>{productOption}</span>
        </div>
        <div className="mt-[1.2rem]">
          <Tag text="レシート" />
        </div>
      </div>

      {/* 긍정/부정 리뷰 */}
      <div className="p-[1.6rem]">
        <Comment type="positive">{positiveComment}</Comment>
      </div>
      <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
      <div className="p-[1.6rem]">
        <Comment type="negative">{negativeComment}</Comment>
      </div>

      {/* 푸터 */}
      <div className="flex items-center gap-[1.2rem] border-t border-pink-500 bg-white p-[1.6rem] py-[1.2rem]">
        <Image
          src={imageUrl}
          alt={productName}
          width={60}
          height={60}
          className="rounded-lg"
        />

        <div className="flex flex-col items-start gap-[0.4rem]">
          <span className="jp-body1 truncate font-bold text-gray-800">
            {brandName}
          </span>
          <span className="jp-body2 w-[23.3rem] truncate text-gray-800">
            {productName}
          </span>
        </div>
      </div>
    </>
  );
}
