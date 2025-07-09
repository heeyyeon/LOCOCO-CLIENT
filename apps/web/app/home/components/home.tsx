import { ReactNode, PropsWithChildren } from 'react';
import Link from 'next/link';
import HomeSectionProduct from './home-section-product';
import HomeSectionReview from './home-section-review';

export default function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex w-full flex-col gap-[3.2rem] mt-[12rem]${className}`}
    >
      {children}
    </section>
  );
}

interface HomeSectionHeaderProps extends PropsWithChildren {
  moreInfoUrl?: string;
}

function HomeSectionHeader({ children, moreInfoUrl }: HomeSectionHeaderProps) {
  return (
    <section className="mt-[6rem] flex justify-between">
      <h3 className="jp-head1 flex items-center gap-[1.2rem] font-[700]">
        {children}
      </h3>
      {moreInfoUrl && (
        <Link href={moreInfoUrl} className="jp-title2 font-[700]">
          더보기
        </Link>
      )}
    </section>
  );
}

function HomeSectionYouTube() {
  return (
    <div className="mb-[12rem] grid grid-cols-3 gap-[2.4rem]">
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
      <article className="h-[20.3rem] w-full bg-gray-100"></article>
    </div>
  );
}

HomeSection.Header = HomeSectionHeader;
HomeSection.Product = HomeSectionProduct;
HomeSection.Review = HomeSectionReview;
HomeSection.YouTube = HomeSectionYouTube;
