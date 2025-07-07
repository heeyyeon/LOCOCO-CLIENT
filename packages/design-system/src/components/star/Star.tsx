import { SvgStar } from '../../icons/fill/components/Star';

interface StarProps {
  rating: number;
  size?: 'small' | 'medium';
  color?: 'yellow' | 'black';
  className?: string;
}

const SIZE_CLASS = {
  small: 'w-[2.4rem] h-[2.4rem]',
  medium: 'w-[3.6rem] h-[3.6rem]',
};

const COLOR_CLASS = {
  yellow: 'fill-yellow',
  black: 'fill-black',
};

const BASE_CLASS = {
  yellow: 'fill-gray-300',
  black: 'fill-gray-400',
};

export default function Star({
  rating,
  size = 'small',
  color = 'yellow',
  className,
}: StarProps) {
  const sizeClasses = SIZE_CLASS[size];
  const fillClasses = COLOR_CLASS[color];
  const baseClasses = BASE_CLASS[color];

  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100);

    if (fillPercentage === 0) {
      return (
        <SvgStar key={index} className={`${sizeClasses} ${baseClasses}`} />
      );
    }

    if (fillPercentage === 100) {
      return (
        <SvgStar key={index} className={`${fillClasses} ${sizeClasses}`} />
      );
    }

    return (
      <div key={index} className="relative">
        <SvgStar className={`${sizeClasses} ${baseClasses}`} />
        <div
          className="absolute left-0 top-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <SvgStar className={`${fillClasses} ${sizeClasses}`} />
        </div>
      </div>
    );
  });

  return (
    <div className={`flex ${className}`} aria-label={`별점 5점 중 ${rating}점`}>
      {stars}
    </div>
  );
}
