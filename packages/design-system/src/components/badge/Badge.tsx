import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface BadgeProps {
  rank: 1 | 2 | 3;
  className?: string;
}

const OTHER_RANK_STYLE = `border-b-[0.1rem] border-r-[0.1rem] border-pink-500 bg-pink-100 text-pink-500`;

const badgeVariants = cva(
  `text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center font-[700] absolute left-0 top-0 z-50`,
  {
    variants: {
      rank: {
        1: 'bg-pink-500 text-white',
        2: OTHER_RANK_STYLE,
        3: OTHER_RANK_STYLE,
      },
    },
    defaultVariants: { rank: 1 },
  }
);

export default function Badge({ rank, className }: BadgeProps) {
  return <div className={cn(badgeVariants({ rank }), className)}>{rank}</div>;
}
