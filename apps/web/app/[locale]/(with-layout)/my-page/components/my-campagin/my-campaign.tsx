'use client';

import React, { useState } from 'react';

import { Button } from '@lococo/design-system/button';
import { cn } from '@lococo/utils';

import { AddressModal } from '../../@modal/(.)address-modal/AddressModal';
import { mockupCampaign } from '../../constant/mockup';
import Campaign, { CHIP_COLOR } from '../campagin/Campaign';

type CampaignConfig = {
  chipColor: string;
  buttonText: string;
  buttonVariant: 'filled' | 'outline';
  buttonColor: 'primary' | 'secondary';
  buttonClassName: string;
  handleButtonClick: () => void;
};

const getCampaignConfig = (
  status: string,
  onConfirmAddress: () => void
): CampaignConfig => {
  const configs: Record<string, CampaignConfig> = {
    not_open: {
      chipColor: 'gray',
      buttonText: 'Not Open',
      buttonVariant: 'filled',
      buttonColor: 'secondary',
      buttonClassName: 'bg-gray-200 text-gray-500 cursor-not-allowed',
      handleButtonClick: () => {},
    },
    pending: {
      chipColor: 'gray',
      buttonText: 'View Details',
      buttonVariant: 'filled',
      buttonColor: 'secondary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 내가 지원한 캠페인 상세 페이지로 이동
      },
    },
    approved: {
      chipColor: 'green',
      buttonText: 'Confirm Address',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: onConfirmAddress,
    },
    active: {
      chipColor: 'green',
      buttonText: 'Upload 1st Review',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 리뷰 업로드 페이지로 이동
      },
    },
    active_review_uploaded: {
      chipColor: 'green',
      buttonText: 'Upload 1st Review',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 리뷰 업로드 페이지로 이동
      },
    },
    active_revision_requested: {
      chipColor: 'green',
      buttonText: 'Upload 1st Review',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 리뷰 업로드 페이지로 이동
      },
    },
    active_revision_confirmed: {
      chipColor: 'green',
      buttonText: 'Upload 1st Review',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 리뷰 업로드 페이지로 이동
      },
    },
    completed: {
      chipColor: 'green',
      buttonText: 'View Results',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 크리에이터가 업로드한 리뷰 페이지로 이동
      },
    },
    expired_address: {
      chipColor: 'blue',
      buttonText: 'View Details',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 내가 지원한 캠페인 상세 페이지로 이동
      },
    },
    expired_review: {
      chipColor: 'blue',
      buttonText: 'View Details',
      buttonVariant: 'filled',
      buttonColor: 'primary',
      buttonClassName: '',
      handleButtonClick: () => {
        // TODO: 내가 지원한 캠페인 상세 페이지로 이동
      },
    },
    rejected: {
      chipColor: 'red',
      buttonText: 'View Details',
      buttonVariant: 'outline',
      buttonColor: 'primary',
      buttonClassName:
        'border-[#EF4444] bg-white text-[#EF4444] hover:bg-white hover:text-[#EF4444]',
      handleButtonClick: () => {
        // TODO: 내가 지원한 캠페인 상세 페이지로 이동
      },
    },
  };

  return (
    configs[status] || {
      chipColor: 'gray',
      buttonText: '',
      buttonVariant: 'filled',
      buttonColor: 'secondary',
      buttonClassName: '',
      handleButtonClick: () => {},
    }
  );
};

export default function MyCampaign() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleConfirmAddressButtonClick = () => {
    setIsAddressModalOpen(true);
  };

  return (
    <div className="mx-auto flex w-auto flex-col items-center justify-center pb-[6.4rem]">
      <p className="title2 w-[93.8rem] py-[1.6rem] text-start text-gray-800">
        My Campaign
      </p>
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {mockupCampaign.map((campaign, index) => {
          const config = getCampaignConfig(
            campaign.status,
            handleConfirmAddressButtonClick
          );
          return (
            <Campaign
              key={index}
              imageSrc={campaign.imageSrc}
              chipText={campaign.chipText}
              chipColor={config.chipColor as keyof typeof CHIP_COLOR}
              deadline={campaign.deadline}
              title={campaign.title}
              button={
                config.buttonText ? (
                  <Button
                    variant={config.buttonVariant}
                    size="sm"
                    onClick={config.handleButtonClick}
                    fontType="InterBody2"
                    color={config.buttonColor}
                    className={cn('w-full', config.buttonClassName)}
                  >
                    {config.buttonText}
                  </Button>
                ) : null
              }
            />
          );
        })}
      </div>

      <AddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
      />
    </div>
  );
}
