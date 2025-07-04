import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface BedgeProps {
  rank: string;
}

export default function Badge({ rank }: BedgeProps) {
  const isFirst = rank === '1';

  return (
    <div
      className={cn(
        'text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center font-[700]',
        'absolute left-0 top-0 z-50',
        isFirst
          ? 'bg-pink-500 text-white'
          : 'border-b-[0.1rem] border-r-[0.1rem] border-pink-500 bg-pink-100 text-pink-500'
      )}
    >
      {rank}
    </div>
  );
}
