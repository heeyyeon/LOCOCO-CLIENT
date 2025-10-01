import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@lococo/design-system/select';

interface CampaignInfo {
  campaignId: number;
  campaignTitle: string;
  startDate: string;
  endDate: string;
}

export default function CampaignSelect({
  campaignInfos,
  selectedCampaign,
  handleCampaignChange,
}: {
  campaignInfos: CampaignInfo[];
  selectedCampaign: CampaignInfo | undefined;
  handleCampaignChange: (campaignId: string) => void;
}) {
  return (
    <SelectRoot
      value={selectedCampaign?.campaignId.toString()}
      onValueChange={handleCampaignChange}
    >
      {/* TODO: SELECT 디자인시스템 폰트 변경, tailwind 디자인 토큰 적용 안되는 이슈 확인*/}
      <SelectTrigger className="data-[placeholder]:text-body4 data-[slot]:text-[1.4rem] data-[placeholder]:text-gray-800 data-[slot]:text-gray-800">
        <SelectValue
          placeholder={
            campaignInfos.length > 0
              ? `캠페인을 선택하세요.`
              : '생성한 캠페인이 없습니다.'
          }
        />
      </SelectTrigger>
      <SelectContent className="text-[1.4rem]">
        {campaignInfos.map((campaignInfo) => (
          <SelectItem
            key={campaignInfo.campaignId}
            value={campaignInfo.campaignId.toString()}
          >
            {campaignInfo.campaignTitle}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
