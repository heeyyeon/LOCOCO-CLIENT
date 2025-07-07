import { SvgStar } from '../../icons/fill/components/Star';

interface StarProps {
  rating: number;
  size?: 'small' | 'medium';
  color?: string;
}

const SIZE_CLASS = {
  small: 'w-[2.4rem] h-[2.4rem]',
  medium: 'w-[3.6rem] h-[3.6rem]',
};

export default function Star({
  rating,
  size = 'small',
  color = 'yellow',
}: StarProps) {
  const fullStars = Math.floor(rating);
  const partialPercent = Math.round((rating - fullStars) * 100);

  return (
    <div className="relative">
      <SvgStar className={`fill-gray-300 ${SIZE_CLASS[size]}`} />
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${partialPercent}%` }}
      >
        <SvgStar className={`fill-${color} ${SIZE_CLASS[size]}`} />
      </div>
    </div>
  );
}
