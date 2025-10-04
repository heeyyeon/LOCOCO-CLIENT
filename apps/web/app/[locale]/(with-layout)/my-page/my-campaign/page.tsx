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

const isValidCreatorAction = (action?: string): action is CreatorAction => {
  return !!action && Object.keys(CREATOR_ACTION_CONFIG).includes(action);
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
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem] pb-[6.4rem]">
        {campaignData.campaigns.map((campaign) => {
          const participationStatus = campaign.participationStatus
            ? campaign.participationStatus.charAt(0).toUpperCase() +
              campaign.participationStatus.slice(1).toLowerCase()
            : 'Pending';
          if (!isValidCreatorAction(campaign.nextAction)) {
            return (
              <CardMyPage
                key={campaign.campaignId}
                campaignId={campaign.campaignId || 0}
                campaignName={campaign.title}
                campaignImageUrl={campaign.campaignImageUrl}
                endTime={campaign.reviewSubmissionDeadline}
                chipContent={participationStatus}
                chipVariant={campaign.participationStatus}
                buttonLabel={t('buttonText.view_details') || '자세히 보기'}
                buttonHref={`/campaign-detail/${campaign.campaignId}`}
              />
            );
          }

          const action = campaign.nextAction;
          const config = CREATOR_ACTION_CONFIG[action];
          const isAddressAction = action === 'CONFIRM_ADDRESS';

          return (
            <CardMyPage
              key={campaign.campaignId}
              campaignId={campaign.campaignId || 0}
              campaignName={campaign.title}
              campaignImageUrl={campaign.campaignImageUrl}
              endTime={campaign.reviewSubmissionDeadline}
              chipContent={participationStatus}
              chipVariant={campaign.participationStatus as any}
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
