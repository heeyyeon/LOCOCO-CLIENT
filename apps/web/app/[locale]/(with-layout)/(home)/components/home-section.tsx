import { ReactNode } from 'react';

import { cn } from '@lococo/utils';

import HomeSectionCampaign from './home-section-campaign';
import HomeSectionHeader from './home-section-header';

export default function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(`mt-[12rem] flex w-full flex-col gap-[1.6rem]`, className)}
    >
      {children}
    </section>
  );
}

HomeSection.Header = HomeSectionHeader;
HomeSection.Campaign = HomeSectionCampaign;
