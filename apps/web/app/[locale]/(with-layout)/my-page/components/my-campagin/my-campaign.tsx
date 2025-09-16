'use client';

import React from 'react';

import { Button } from '@lococo/design-system/button';
import { cn } from '@lococo/utils';

import CardCampaign, {
  CHIP_COLOR,
} from '../../../../../../components/campaign/Campaign';
import { mockupCampaign } from '../../constant/mockup';

export default function MyCampaign() {
  const handleButtonClick = () => {};

  return (
    <div className="mx-auto flex w-auto flex-col items-center justify-center pb-[6.4rem]">
      <p className="title2 w-[93.8rem] py-[1.6rem] text-start text-gray-800">
        My Campaign
      </p>
      <div className="grid w-[93.8rem] grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {mockupCampaign.map((campaign, index) => {
          let chipColor = '';
          const buttonText =
            campaign.status == 'Active' ? 'View Note' : 'Not Open';

          switch (campaign.status) {
            case 'active':
              chipColor = 'green';
              break;
            case 'rejected':
              chipColor = 'red';
              break;
            case 'expired':
              chipColor = 'blue';
              break;
            default:
              chipColor = 'gray';
              break;
          }
          return (
            <CardCampaign
              key={index}
              imageSrc={campaign.imageSrc}
              chipText={campaign.chipText}
              chipColor={chipColor as keyof typeof CHIP_COLOR}
              deadline={campaign.deadline}
              title={campaign.title}
              button={
                <Button
                  variant={campaign.status == 'rejected' ? 'outline' : 'filled'}
                  size="sm"
                  onClick={handleButtonClick}
                  fontType="InterBody2"
                  color="primary"
                  className={cn(
                    'w-full',
                    campaign.status == 'rejected' &&
                      'border-[#EF4444] bg-white text-[#EF4444] hover:bg-white hover:text-[#EF4444]',
                    campaign.status == 'expired' && 'bg-gray-500'
                  )}
                >
                  {buttonText}
                </Button>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
