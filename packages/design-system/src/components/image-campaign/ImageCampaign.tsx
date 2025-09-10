import { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface ImageCampaignProps {
  selected: boolean;
  children: ReactNode;
  className?: string;
}

export default function ImageCampaign({
  selected,
  children,
  ...props
}: ImageCampaignProps) {
  const containerClasses = cn(
    'h-[7.2rem] w-[7.2rem] rounded-[1.6rem] overflow-hidden',
    selected ? 'border border-pink-500' : 'border border-gray-200'
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
}
