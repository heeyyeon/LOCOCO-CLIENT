import { ReactNode } from 'react';

import { cn } from '@lococo/utils';

import HomeSectionCampaign from './home-section-campaign';
import HomeSectionHeader from './home-section-header';
import HomeSectionProduct from './home-section-product';
import HomeSectionReview from './home-section-review';
import HomeSectionYouTube from './home-section-youtube';

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
HomeSection.Product = HomeSectionProduct;
HomeSection.Review = HomeSectionReview;
HomeSection.YouTube = HomeSectionYouTube;
HomeSection.Campaign = HomeSectionCampaign;
