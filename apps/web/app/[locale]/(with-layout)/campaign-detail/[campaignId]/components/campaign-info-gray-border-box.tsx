import { ReactNode } from 'react';

interface CampaignInfoGrayBorderBoxProps {
  children: ReactNode;
}

export default function CampaignInfoGrayBorderBox({
  children,
}: CampaignInfoGrayBorderBoxProps) {
  return (
    <div className="flex flex-col rounded-[32px] bg-gray-100 px-[24px] py-[16px]">
      {children}
    </div>
  );
}
