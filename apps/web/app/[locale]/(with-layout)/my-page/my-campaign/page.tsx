'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import LoadingSvg from 'components/loading/loading-svg';

import Pagenation from '../../../../../../../packages/design-system/src/components/pagenation/Pagenation';
import { AddressModal } from '../@modal/(.)address-modal/AddressModal';
import Card from '../components/card/Card';
import Empty from '../components/empty/Empty';
import useMyCampaign from '../hooks/use-my-campaign';

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
    page: currentPage - 1, // API는 0-based, UI는 1-based
    size: 9,
  });

  // totalPages 업데이트
  useEffect(() => {
    if (campaignData?.totalPages) {
      setTotalPages(campaignData.totalPages);
    }
  }, [campaignData?.totalPages]);

  if (isPending) {
    return <LoadingSvg />;
  }
  if (isError || !campaignData?.campaigns?.length) {
    return <Empty translationKey="myPage.myCampaign.empty" />;
  }

  const campaignList = campaignData.campaigns;
  console.log(campaignList);
  return (
    <div className="mx-auto flex w-auto flex-col items-center justify-center pb-[6.4rem]">
      <p className="title1 w-[93.8rem] py-[1.6rem] text-start font-bold text-gray-800">
        {t('title')}
      </p>
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {campaignList?.map((campaign) => {
          const mapLinkAndButtonText = {
            PENDING: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED: {
              handleButtonClick: () => {
                setIsAddressModalOpen(true);
              },
              buttonText: t('buttonText.confirmAddress'),
            },
            REJECTED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED_ADDRESS_CONFIRMED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.uploadFirstReview'),
            },
            APPROVED_FIRST_REVIEW_DONE: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.revisionRequested'),
            },
            APPROVED_REVISION_REQUESTED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewNotes'),
            },
            APPROVED_REVISION_CONFIRMED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.uploadSecondReview'),
            },
            APPROVED_SECOND_REVIEW_DONE: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewResults'),
            },
            APPROVED_ADDRESS_NOT_CONFIRMED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED_REVIEW_NOT_CONFIRMED: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewDetails'),
            },
          };

          const card = {
            campaignId: campaign.campaignId || 0,
            endTime: campaign.reviewSubmissionDeadline || '',
            brandName: campaign.title || '',
            deadline: campaign.reviewSubmissionDeadline || '',
            campaignImageUrl: campaign.basicInfo.profileImageUrl,
            participationStatus: campaign.participationStatus || '',
            handleButtonClick:
              mapLinkAndButtonText[
                campaign.participationStatus as keyof typeof mapLinkAndButtonText
              ].handleButtonClick,
            buttonText:
              mapLinkAndButtonText[
                campaign.participationStatus as keyof typeof mapLinkAndButtonText
              ].buttonText,
          };
          return <Card key={campaign.campaignId} {...card} />;
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
