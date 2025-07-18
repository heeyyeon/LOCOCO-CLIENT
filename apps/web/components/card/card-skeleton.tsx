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
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            #ebecef 0%,
            #ebecef 30%,
            #f8f9fa 50%,
            #ebecef 70%,
            #ebecef 100%
          );
          background-size: 200px 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
      {skeletonItems.map((item, index) => (
        <div
          key={index}
          className="shimmer w-full"
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
    <div className="flex items-center gap-[2.4rem] self-stretch">
      {Array.from({ length: 4 }, (_, index) => (
        <CardSkeleton key={index} type={type} />
      ))}
    </div>
  );
}
