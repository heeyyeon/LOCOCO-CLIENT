import { cn } from '../../lib/utils';

interface BadgeProps {
  rank: string;
}

export default function Badge({ rank }: BadgeProps) {
  const isFirst = rank === '1';

  return (
    <div
      className={cn(
        // 공통 베이스 스타일
        'text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center font-[700]',
        // 조건부 스타일
        isFirst
          ? 'bg-pink-500 text-white'
          : 'border-b-[0.1rem] border-r-[0.1rem] border-pink-500 bg-pink-100 text-pink-500'
      )}
    >
      {rank}
    </div>
  );
}
