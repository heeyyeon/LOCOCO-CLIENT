import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface BadgeProps {
  rank: number;
  className?: string;
}

const OTHER_RANK_STYLE = `border-b-[0.1rem] border-r-[0.1rem] border-pink-500 bg-pink-100 text-pink-500`;

const badgeVariants = cva(
  `text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center font-[700] absolute left-0 top-0 z-50`,
  {
    variants: {
      variant: {
        first: 'bg-pink-500 text-white',
        other: OTHER_RANK_STYLE,
      },
    },
    defaultVariants: { variant: 'other' },
  }
);

export default function Badge({ rank, className }: BadgeProps) {
  const variant = rank === 1 ? 'first' : 'other';

  return (
    <div className={cn(badgeVariants({ variant }), className)}>{rank}</div>
  );
}
