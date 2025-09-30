import React from 'react';

import { SvgEmptyImage } from '@lococo/icons';
import { cn } from '@lococo/utils';

interface CampaignListEmptyProps {
  emptyMessage: string;
  className?: string;
}

export default function CampaignListEmpty({
  emptyMessage,
  className,
}: CampaignListEmptyProps) {
  return (
    <section
      className={cn(
        'flex h-[69.4rem] w-full flex-col items-center justify-center gap-[3.2rem]',
        className
      )}
    >
      <SvgEmptyImage size={120} className="fill-pink-300" />
      <p className="title2 font-[700] text-gray-700">{emptyMessage}</p>
    </section>
  );
}
