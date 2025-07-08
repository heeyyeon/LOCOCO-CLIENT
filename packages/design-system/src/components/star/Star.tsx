import { cva } from 'class-variance-authority';
import { SvgStar } from '../../icons/fill/components/Star';

const sizeColorVariant = cva('', {
  variants: {
    size: {
      sm: 'w-[2.4rem] h-[2.4rem]',
      md: 'w-[3.6rem] h-[3.6rem]',
    },
    fillColor: { yellow: 'fill-yellow', black: 'fill-black' },
    emptyColor: { yellow: 'fill-gray-300', black: 'fill-gray-400' },
  },
});

interface StarProps {
  rating: number;
  size?: 'sm' | 'md';
  color?: 'yellow' | 'black';
  className?: string;
}

/**
 *
 * @param rating 별 이미지로 확인할 별점(소수점 첫째자리까지 표현)
 * @param size 24px의 sm, 36px의 md
 * @param color 채우는 별 이미지의 색을 yellow, black 중 선택(이에 따라 채워지지 않은 별의 색도 변경됨)
 * @returns
 */
export default function Star({
  rating,
  size = 'sm',
  color = 'yellow',
  className,
}: StarProps) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100);

    if (fillPercentage === 0) {
      return (
        <SvgStar
          key={index}
          className={sizeColorVariant({ size, emptyColor: color })}
        />
      );
    }

    if (fillPercentage === 100) {
      return (
        <SvgStar
          key={index}
          className={sizeColorVariant({ size, fillColor: color })}
        />
      );
    }

    return (
      <div key={index} className="relative">
        <SvgStar className={sizeColorVariant({ size, emptyColor: color })} />
        <div
          className="absolute left-0 top-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <SvgStar className={sizeColorVariant({ size, fillColor: color })} />
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
