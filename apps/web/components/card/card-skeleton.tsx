interface CardSkeletonProps {
  type: 'PRODUCT' | 'REVIEW_IMAGE' | 'REVIEW_VIDEO';
}

const SKELETON_CONFIG = {
  PRODUCT: [
    { height: '26.4rem', width: 'full' }, // 이미지
    { height: '3.8rem', width: 'full' }, // 제목
    { height: '3.8rem', width: 'full' }, // 가격
    { height: '3.8rem', width: 'full' }, // 브랜드
  ],
  REVIEW_IMAGE: [
    { height: '35.2rem', width: 'full' }, // 이미지
    { height: '4.6rem', width: 'full' }, // 텍스트
  ],
  REVIEW_VIDEO: [
    { height: '26.4rem', width: 'full' }, // 비디오 썸네일
    { height: '4.6rem', width: 'full' }, // 텍스트
  ],
} as const;

export default function CardSkeleton({ type }: CardSkeletonProps) {
  const skeletonItems = SKELETON_CONFIG[type];

  return (
    <div className="flex w-[26.4rem] flex-col items-start gap-[0.6rem]">
      {skeletonItems.map((item, index) => (
        <div
          key={index}
          className={`h-[${item.height}] w-${item.width} animate-pulse bg-gray-200`}
        />
      ))}
    </div>
  );
}
