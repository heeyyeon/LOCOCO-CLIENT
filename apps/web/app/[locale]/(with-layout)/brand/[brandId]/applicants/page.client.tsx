'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useFormatter } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import dayjs from 'dayjs';
import { usePathname, useRouter } from 'i18n/navigation';

import { Button } from '@lococo/design-system/button';
import { SvgCalender, SvgDownload } from '@lococo/icons';

import CampaignSelect from './components/campaign-select';
import { koDateRangeFormatter } from './utils/ko-date-range-formatter';

interface CampaignInfo {
  campaignId: number;
  campaignTitle: string;
  startDate: string;
  endDate: string;
}
const campaignInfos = [
  {
    campaignId: 11,
    campaignTitle: 'Upcoming K-Beauty Fall Collection',
    startDate: '2025-09-08T09:00:00Z',
    endDate: '2025-10-05T23:59:59Z',
  },
  {
    campaignId: 12,
    campaignTitle: 'Active Summer Essence Campaign',
    startDate: '2025-08-25T09:00:00Z',
    endDate: '2025-09-25T23:59:59Z',
  },
  {
    campaignId: 13,
    campaignTitle: '캠페인을 만들어봅시다 호호',
    startDate: '2025-09-18T07:32:08.995Z',
    endDate: '2025-09-21T07:32:08.995Z',
  },
  {
    campaignId: 14,
    campaignTitle: 'Hydrating Mask Review Campaign',
    startDate: '2025-08-15T09:00:00Z',
    endDate: '2025-09-20T23:59:59Z',
  },
  {
    campaignId: 50,
    campaignTitle: 'A',
    startDate: '2025-09-15T13:27:50Z',
    endDate: '2025-09-21T13:28:37Z',
  },
  {
    campaignId: 52,
    campaignTitle: '캠페인을 만들어봅시다',
    startDate: '2025-09-16T07:32:08.995Z',
    endDate: '2025-09-21T07:32:08.995Z',
  },
];

export default function BrandApplicantsPageClient() {
  const format = useFormatter();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const campaignIdQueryString = searchParams.get('campaignId');

  const [selectedCampaign, setSelectedCampaign] = useState<
    CampaignInfo | undefined
  >(undefined);

  const latestCampaignId = [...campaignInfos]
    .sort((campaignA, campaignB) =>
      dayjs(campaignB.startDate).diff(dayjs(campaignA.startDate))
    )[0]
    ?.campaignId.toString();

  const handleCampaignChange = useCallback(
    (campaignId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const campaign = campaignInfos.find(
        (campaign) => campaign.campaignId.toString() === campaignId
      );
      setSelectedCampaign(campaign);
      params.set('campaignId', campaignId);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    // campaign값이 없고 최신 캠페인이 존재할 때 최신 캠페인 자동 지정
    if (latestCampaignId && !campaignIdQueryString) {
      const params = new URLSearchParams(searchParams.toString());

      params.set('campaignId', latestCampaignId);
      router.replace(`${pathname}?${params.toString()}`);
      handleCampaignChange(latestCampaignId);
      return;
    }
    // campaign query 값이 존재하거나 변경될 때 Select 값 동기화
    if (campaignIdQueryString) {
      setSelectedCampaign(
        campaignInfos.find(
          (campaign) => campaign.campaignId.toString() === campaignIdQueryString
        )
      );
    }
  }, [
    campaignIdQueryString,
    pathname,
    router,
    latestCampaignId,
    searchParams,
    handleCampaignChange,
  ]);

  return (
    <div className="flex w-full flex-col gap-[1.6rem] px-[1.6rem]">
      <div className="flex w-full justify-between">
        <CampaignSelect
          campaignInfos={campaignInfos}
          selectedCampaign={selectedCampaign}
          handleCampaignChange={handleCampaignChange}
        />
        <Button
          variant="outline"
          color="primary"
          size="sm"
          rounded="sm"
          className="grow-0"
        >
          <SvgDownload />
          Export
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-[0.8rem]">
          <SvgCalender className="size-[2rem] text-gray-600" />
          <p className="text-inter-body3 text-gray-600">
            {selectedCampaign?.startDate && selectedCampaign?.endDate
              ? koDateRangeFormatter(
                  selectedCampaign.startDate,
                  selectedCampaign.endDate,
                  format
                )
              : ''}
          </p>
        </div>
      </div>

      {/* <ApplicantsList /> */}
    </div>
  );
}
