'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import LoadingSvg from 'components/loading/loading-svg';

import Pagenation from '../../../../../../../packages/design-system/src/components/pagenation/Pagenation';
import { AddressModal } from '../@modal/(.)address-modal/AddressModal';
import Card from '../components/card/Card';
import Empty from '../components/empty/Empty';
import useMyCampaign from '../hooks/use-my-campaign';

export default function MyCampaign() {
  const t = useTranslations('myPage.myCampaign');
  const router = useRouter();
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
    return <Empty translationKey="myPage.myCampaign.empty" />;
  }

  const campaignList = campaignData.campaigns;

  return (
    <div className="mx-auto flex w-auto flex-col items-center justify-center pb-[6.4rem]">
      <p className="title1 w-[93.8rem] py-[1.6rem] text-start font-bold text-gray-800">
        {t('title')}
      </p>
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {campaignList?.map((campaign) => {
          const mapLinkAndButtonText = {
            VIEW_DETAILS: {
              handleButtonClick: () => {},
              buttonText: t('buttonText.viewDetails'),
            },
            CONFIRM_ADDRESS: {
              handleButtonClick: () => {
                setIsAddressModalOpen(true);
              },
              buttonText: t('buttonText.confirmAddress'),
            },
            UPLOAD_FIRST_REVIEW: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&round=FIRST`
                );
              },
              buttonText: t('buttonText.uploadFirstReview'),
            },
            REVISION_REQUESTED: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&round=SECOND`
                );
              },
              buttonText: t('buttonText.revisionRequested'),
            },
            VIEW_NOTES: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&round=SECOND`
                );
              },
              buttonText: t('buttonText.viewNotes'),
            },
            UPLOAD_SECOND_REVIEW: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&round=SECOND`
                );
              },
              buttonText: t('buttonText.uploadSecondReview'),
            },
            VIEW_RESULTS: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/final-review?campaignId=${campaign.campaignId}`
                );
              },
              buttonText: t('buttonText.viewResults'),
            },
          };

          const card = {
            campaignId: campaign.campaignId || 0,
            endTime: campaign.reviewSubmissionDeadline || '',
            brandName: campaign.title || '',
            deadline: campaign.reviewSubmissionDeadline || '',
            campaignImageUrl: campaign.campaignImageUrl,
            participationStatus: campaign.participationStatus || '',
            handleButtonClick:
              mapLinkAndButtonText[
                campaign.nextAction as keyof typeof mapLinkAndButtonText
              ]?.handleButtonClick,
            buttonText:
              mapLinkAndButtonText[
                campaign.nextAction as keyof typeof mapLinkAndButtonText
              ]?.buttonText,
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
