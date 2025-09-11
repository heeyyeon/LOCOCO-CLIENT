import { cn } from '@lococo/utils';

import { formatBracketDate } from './utils/getChipVariantByDate';

interface BracketChipProps {
  dueDate: string;
  chipVariant: 'expired' | 'active';
  className?: string;
}

export default function BracketChip({
  dueDate,
  chipVariant,
  className,
}: BracketChipProps) {
  return (
    <div
      className={cn(
        'inter-body1 flex h-[3.2rem] w-[8.8rem] items-center justify-center text-white',
        chipVariant === 'expired' ? 'bg-gray-500' : 'bg-pink-500',
        className
      )}
      style={{
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
      {formatBracketDate(dueDate)}
    </div>
  );
}
