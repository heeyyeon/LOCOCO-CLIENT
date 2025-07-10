'use client';

import { SvgStar } from '@lococo/design-system';
import { cn } from '@/lib/utils';
import { ContentWithLabel } from './content-with-label';
import { ErrorNotice } from '@/components';

interface Props {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
}

export default function ProductRating({ value, onChange, error }: Props) {
  return (
    <ContentWithLabel
      label="商品はいかがでしたか？"
      className="justify-between border-b border-gray-400 pb-[2.8rem]"
    >
      <div className="flex flex-col gap-[0.8rem]">
        <div className="flex items-center gap-[0.8rem]">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            const isActive = starNumber <= value;

            return (
              <button
                key={`${index}-star`}
                type="button"
                className="flex items-center justify-center transition-colors hover:scale-110"
                onClick={() => onChange(starNumber)}
              >
                <SvgStar
                  className={cn(
                    'size-[2.4rem] transition-colors',
                    isActive ? 'fill-yellow' : 'fill-gray-400'
                  )}
                />
              </button>
            );
          })}
        </div>
        {error && <ErrorNotice message={error} />}
      </div>
    </ContentWithLabel>
  );
}
