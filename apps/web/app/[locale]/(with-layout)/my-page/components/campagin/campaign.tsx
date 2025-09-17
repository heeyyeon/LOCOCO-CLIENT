import React from 'react';

import Image from 'next/image';

import { cn } from '@lococo/utils';

export const CHIP_COLOR = {
  pink: '#6B7280', // gray-500
  red: '#EF4444', // red-500
  green: '#22C55E', // green-500
  blue: '#3B82F6', // blue-500
  gray: '#6B7280', // gray-500
} as const;

interface BracketChipProps {
  text: string;
  chipColor: keyof typeof CHIP_COLOR;
  className?: string;
}

interface CampaignProps {
  imageSrc: string;
  chipText: string;
  chipColor: keyof typeof CHIP_COLOR;
  deadline: string;
  title: string;
  button: React.ReactNode;
}

function BracketChip({ text, chipColor, className }: BracketChipProps) {
  return (
    <div
      className={cn(
        'body1 flex h-[3.2rem] w-[8.8rem] items-center justify-center text-white',
        className
      )}
      style={{
        backgroundColor: CHIP_COLOR[chipColor],
        clipPath: `polygon(
         100% 0%, 100% 8.35%, 100% 8.35%, 99.22% 8.652%, 98.583% 9.486%, 
         98.073% 10.737%, 97.678% 12.294%, 97.382% 14.043%, 97.172% 15.873%, 
         97.032% 17.671%, 96.949% 19.324%, 96.907% 20.72%, 96.894% 21.747%, 
         96.894% 74.951%, 96.894% 74.951%, 96.768% 79.104%, 96.405% 83.01%, 
         95.826% 86.625%, 95.054% 89.904%, 94.109% 92.801%, 93.015% 95.273%, 
         91.793% 97.274%, 90.464% 98.758%, 89.05% 99.682%, 87.574% 100%, 
         0% 100%, 0% 91.65%, 0% 91.65%, 0.78% 91.348%, 1.417% 90.514%, 
         1.927% 89.263%, 2.322% 87.706%, 2.618% 85.957%, 2.828% 84.127%, 
         2.968% 82.329%, 3.051% 80.676%, 3.093% 79.28%, 3.106% 78.253%, 
         3.106% 25.049%, 3.106% 25.049%, 3.232% 20.896%, 3.595% 16.99%, 
         4.174% 13.375%, 4.947% 10.096%, 5.891% 7.198%, 6.986% 4.727%, 
         8.208% 2.726%, 9.537% 1.242%, 10.951% 0.318%, 12.427% 0%, 100% 0%
       )`,
      }}
    >
      {text}
    </div>
  );
}

export default function Campaign({
  chipText,
  chipColor,
  deadline,
  imageSrc,
  title,
  button,
}: CampaignProps) {
  return (
    <div className="relative flex w-[28.4rem] flex-col rounded-[2.4rem]">
      <Image
        width={284}
        height={208}
        src={imageSrc}
        alt={`${title} image`}
        className="h-[20.8rem] w-full rounded-t-[2.4rem] object-cover"
      />
      <BracketChip
        text={chipText}
        chipColor={chipColor}
        className="absolute right-[1.6rem] top-[1.6rem]"
      />
      <div className="flex w-full flex-col gap-[0.6em] rounded-b-[1.6rem] border border-t-0 border-gray-200 bg-white p-[1.6rem]">
        <div>
          <p className="body4">{deadline}</p>
          <p className="title3">{title}</p>
        </div>

        {button}
      </div>
    </div>
  );
}
