'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import LoadingSvg from 'components/loading/loading-svg';

import { AddressModal } from '../@modal/(.)address-modal/AddressModal';
import Card from '../components/card/Card';
import Empty from '../components/empty/Empty';
import useMyCampaign from '../hooks/use-my-campaign';

export default function MyCampaign() {
  const t = useTranslations('myPage.myCampaign');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    const openAddressModal = searchParams.get('openAddressModal');
    if (openAddressModal === 'true') {
      setIsAddressModalOpen(true);

      const url = new URL(window.location.href);
      url.searchParams.delete('openAddressModal');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const { data: campaignList, isPending, isError } = useMyCampaign();
  if (isPending) {
    return <LoadingSvg />;
  }
  if (isError || !campaignList?.length) {
    return <Empty translationKey="myPage.myCampaign.empty" />;
  }
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
              handleButtonClick: () => {
                router.push(`/campaign/${campaign.campaignId}`);
              },
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED: {
              handleButtonClick: () => {
                setIsAddressModalOpen(true);
              },
              buttonText: t('buttonText.confirmAddress'),
            },
            REJECTED: {
              handleButtonClick: () => {
                router.push(`/campaign/${campaign.campaignId}`);
              },
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED_ADDRESS_CONFIRMED: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}`
                );
              },
              buttonText: t('buttonText.uploadFirstReview'),
            },
            APPROVED_FIRST_REVIEW_DONE: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}`
                );
              },
              buttonText: t('buttonText.revisionRequested'),
            },
            APPROVED_REVISION_REQUESTED: {
              handleButtonClick: () => {
                // 브랜드 노트 보기 모달 또는 페이지로 이동
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&viewNotes=true`
                );
              },
              buttonText: t('buttonText.viewNotes'),
            },
            APPROVED_REVISION_CONFIRMED: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}`
                );
              },
              buttonText: t('buttonText.uploadSecondReview'),
            },
            APPROVED_SECOND_REVIEW_DONE: {
              handleButtonClick: () => {
                router.push(
                  `/my-page/content-submissions?campaignId=${campaign.campaignId}&viewResults=true`
                );
              },
              buttonText: t('buttonText.viewResults'),
            },
            APPROVED_ADDRESS_NOT_CONFIRMED: {
              handleButtonClick: () => {
                router.push(`/campaign/${campaign.campaignId}`);
              },
              buttonText: t('buttonText.viewDetails'),
            },
            APPROVED_REVIEW_NOT_CONFIRMED: {
              handleButtonClick: () => {
                router.push(`/campaign/${campaign.campaignId}`);
              },
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
    </div>
  );
}
