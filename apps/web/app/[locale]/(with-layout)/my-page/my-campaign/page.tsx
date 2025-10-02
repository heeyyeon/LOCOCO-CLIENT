'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import CardMyPage from 'components/card/card-my-page';
import {
  CREATOR_ACTION_CONFIG,
  CreatorAction,
} from 'components/card/utils/getCreatorConfig';
import CampaignListEmpty from 'components/empty/campgin-list-empty';
import LoadingSvg from 'components/loading/loading-svg';

import { Pagenation } from '@lococo/design-system/pagenation';

import { AddressModal } from '../@modal/(.)address-modal/AddressModal';
import useMyCampaign from '../hooks/use-my-campaign';

type ChipVariant =
  | 'OPEN_RESERVED'
  | 'COMPLETED'
  | 'DRAFT'
  | 'WAITING_APPROVAL'
  | 'RECRUITING'
  | 'RECRUITMENT_CLOSED'
  | 'IN_REVIEW';

const NEXT_ACTION_CHIP_VARIANT: Record<CreatorAction, ChipVariant> = {
  VIEW_DETAILS: 'RECRUITING',
  CONFIRM_ADDRESS: 'WAITING_APPROVAL',
  UPLOAD_FIRST_REVIEW: 'RECRUITING',
  REVISION_REQUESTED: 'IN_REVIEW',
  VIEW_NOTES: 'IN_REVIEW',
  UPLOAD_SECOND_REVIEW: 'IN_REVIEW',
  VIEW_RESULTS: 'COMPLETED',
  BRAND_APPROVAL_WAITING: 'WAITING_APPROVAL',
};

export default function MyCampaign() {
  const t = useTranslations('myPage.myCampaign');
  const searchParams = useSearchParams();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const openAddressModal = searchParams.get('openAddressModal');
    if (openAddressModal === 'true') {
      setIsAddressModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('openAddressModal');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const {
    data: campaignData,
    isPending,
    isError,
  } = useMyCampaign({
    page: currentPage - 1,
    size: 9,
  });

  useEffect(() => {
    if (campaignData?.totalPages) {
      setTotalPages(campaignData.totalPages);
    }
  }, [campaignData?.totalPages]);

  if (isPending) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

  if (isError || !campaignData?.campaigns?.length) {
    return <CampaignListEmpty emptyMessage={t('empty')} />;
  }

  return (
    <div className="mx-auto flex w-auto flex-col items-center justify-center pb-[6.4rem]">
      <p className="title1 w-[93.8rem] py-[1.6rem] text-start font-bold text-gray-800">
        {t('title')}
      </p>
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {campaignData.campaigns.map((campaign) => {
          const action = campaign.nextAction as CreatorAction;
          const config = CREATOR_ACTION_CONFIG[action];
          const isAddressAction = action === 'CONFIRM_ADDRESS';

          return (
            <CardMyPage
              key={campaign.campaignId}
              campaignId={campaign.campaignId || 0}
              campaignName={campaign.title}
              campaignImageUrl={campaign.campaignImageUrl}
              endTime={campaign.reviewSubmissionDeadline}
              chipContent={config?.chipContent}
              chipVariant={NEXT_ACTION_CHIP_VARIANT[action]}
              buttonLabel={t(`buttonText.${action.toLowerCase()}`)}
              buttonHref={
                isAddressAction
                  ? undefined
                  : config?.getRoutePath?.(campaign.campaignId || 0) ||
                    undefined
              }
              onButtonClick={
                isAddressAction ? () => setIsAddressModalOpen(true) : undefined
              }
            />
          );
        })}
      </div>
      <AddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
      />
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
}
