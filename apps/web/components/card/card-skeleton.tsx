'use client';

interface CardSkeletonProps {
  type: 'PRODUCT' | 'REVIEW_IMAGE' | 'REVIEW_VIDEO';
}

const SKELETON_CONFIG = {
  PRODUCT: [
    { height: '26.4rem' },
    { height: '3.8rem' },
    { height: '3.8rem' },
    { height: '3.8rem' },
  ],
  REVIEW_IMAGE: [{ height: '35.2rem' }, { height: '4.6rem' }],
  REVIEW_VIDEO: [{ height: '26.4rem' }, { height: '4.6rem' }],
} as const;

export function CardSkeleton({ type }: CardSkeletonProps) {
  const skeletonItems = SKELETON_CONFIG[type];

  return (
    <div className="flex w-[26.4rem] flex-col items-start gap-[0.6rem]">
      {skeletonItems.map((item, index) => (
        <div
          key={index}
          className="w-full bg-gray-200"
          style={{ height: item.height }}
        />
      ))}
    </div>
  );
}

export default function CardSkeletonWrapper({
  type,
}: {
  type: 'PRODUCT' | 'REVIEW_IMAGE' | 'REVIEW_VIDEO';
}) {
  return (
    <div className="flex w-full items-center gap-[2.4rem] self-stretch">
      {Array.from({ length: 4 }, (_, index) => (
        <CardSkeleton key={index} type={type} />
      ))}
    </div>
  );
}
