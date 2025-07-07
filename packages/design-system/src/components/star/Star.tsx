import { SvgStar } from '../../icons/fill/components/Star';

interface StarProps {
  rating: number;
  size: 'small' | 'medium';
}

export default function Star({ rating, size }: StarProps) {
  const fullStars = Math.floor(rating);
  const partialPercent = Math.round((rating - fullStars) * 100);

  return (
    <div className="relative">
      <SvgStar className="fill-gray-300" />
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${partialPercent}%` }}
      >
        <SvgStar className="fill-yellow-400" />
      </div>
    </div>
  );
}
