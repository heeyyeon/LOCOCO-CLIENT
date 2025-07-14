import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  Tag,
  SvgArrowOutward,
  IconButton,
  SvgClose,
} from '@lococo/design-system';
import { cn } from '@/lib/utils';
import Comment from './comment';

interface ReviewInfoProps {
  onClose?: () => void;
  rating: number;
  id: number | string;
  productOption: string;
  positiveComment: string;
  negativeComment: string;
  productName: string;
  imageUrl: string;
  brandName: string;
}

export default function ReviewInfo({
  onClose,
  id,
  rating,
  productOption,
  positiveComment,
  negativeComment,
  productName,
  imageUrl,
  brandName,
}: ReviewInfoProps) {
  const router = useRouter();
  const handleProductClick = () => {
    router.push(`/product-detail/${id}`);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-r-xl">
      {/* 헤더 */}
      <header
        className={cn(
          'text-jp-body1 sticky top-0 z-10 flex h-[4.8rem] items-center justify-between border-b border-pink-500 bg-white pl-[1.6rem] font-bold'
        )}
      >
        <span>レビュー</span>
        <IconButton
          icon={<SvgClose />}
          color="tertiary"
          size="sm"
          onClick={onClose}
        />
      </header>

      {/* 바디: 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-[1.6rem] pb-[11rem]">
        <Star rating={rating} size="sm" color="yellow" />
        <div className="text-jp-caption1 mt-[1.2rem] flex items-center gap-[0.6rem] font-medium text-gray-600">
          <span>オプション :</span>
          <span>{productOption}</span>
        </div>
        <div className="mt-[1.2rem]">
          <Tag text="レシート" />
        </div>

        {/* 긍정/부정 리뷰 */}
        <div className="mt-[1.6rem]">
          <Comment type="positive">{positiveComment}</Comment>
        </div>
        <div className="-mx-[1.6rem] my-[1.6rem] h-[0.1rem] w-[calc(100%+3.2rem)] border-t border-dashed border-pink-500" />
        <div>
          <Comment type="negative">{negativeComment}</Comment>
        </div>
      </div>

      {/* 푸터: 항상 하단 고정 */}
      <footer className="absolute inset-x-0 bottom-0 flex items-center gap-[1.2rem] border-t border-pink-500 bg-white py-[1.2rem] pb-[1.6rem] pl-[1.6rem] pr-[0.8rem]">
        <div
          className="relative h-[6rem] w-[6rem] cursor-pointer overflow-hidden rounded-lg"
          onClick={handleProductClick}
        >
          <Image src={imageUrl} alt={productName} fill />
        </div>

        <div
          className="mr-[1.2rem] flex cursor-pointer flex-col items-start gap-[0.4rem]"
          onClick={handleProductClick}
        >
          <span className="jp-body1 truncate font-bold text-gray-800">
            {brandName}
          </span>
          <span className="jp-body2 w-[23.3rem] truncate text-gray-800">
            {productName}
          </span>
        </div>
        <SvgArrowOutward
          className="cursor-pointer fill-pink-500"
          onClick={handleProductClick}
        />
      </footer>
    </div>
  );
}
