import { SvgStar } from '../../icons/fill/components/Star';

interface StarProps {
  rating: number;
  size: 'small' | 'medium';
}

export default function Star({ rating, type }: StarProps) {
  const fullStars = Math.floor(rating);
  const partialPercent = Math.round((rating - fullStars) * 100);

  return (
    <div>
      <SvgStar />
    </div>
  );
}
