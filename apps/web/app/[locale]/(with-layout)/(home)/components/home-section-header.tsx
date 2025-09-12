import { PropsWithChildren } from 'react';

export interface HomeSectionHeaderProps extends PropsWithChildren {
  moreInfoUrl?: string;
}

export default function HomeSectionHeader({
  children,
}: HomeSectionHeaderProps) {
  return (
    <div className="mt-[6rem] flex justify-between">
      {/* TODO 폰트 자동 지정 */}
      <h3 className="inter-head1 flex items-center gap-[1.2rem] font-[700] text-pink-500">
        {children}
      </h3>
    </div>
  );
}
