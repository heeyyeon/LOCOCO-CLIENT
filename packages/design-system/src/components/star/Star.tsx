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
  const emptyStars = 5 - fullStars - (partialPercent > 0 ? 1 : 0);

  return (
    <div className="flex" role="img" aria-label={`별점 ${rating}점 중 5점`}>
      <div className="flex">
        {Array.from({ length: fullStars }, (_, index) => (
          <SvgStar
            key={index}
            className={`fill-${color} ${SIZE_CLASS[size]}`}
          />
        ))}
      </div>

      {partialPercent > 0 && (
        <div className="relative">
          <SvgStar className={`fill-gray-300 ${SIZE_CLASS[size]}`} />
          <div
            className="absolute left-0 top-0 overflow-hidden"
            style={{ width: `${partialPercent}%` }}
          >
            <SvgStar className={`fill-${color} ${SIZE_CLASS[size]}`} />
          </div>
        </div>
      )}

      {emptyStars > 0 && (
        <div className="flex">
          {Array.from({ length: emptyStars }, (_, index) => (
            <SvgStar
              key={`empty-${index}`}
              className={`fill-gray-300 ${SIZE_CLASS[size]}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
