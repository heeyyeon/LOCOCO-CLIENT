'use client';

import React from 'react';

import { mockupCampaign } from '../constant/mockup';
import CardCampaign from './card-campaign';

export default function MyCampaign() {
  return (
    <div className="flex flex-col justify-center pb-[6.4rem] pr-[11.9rem]">
      <p className="inter-title2 py-[1.6rem] text-gray-800">My Campaign</p>
      <div className="grid grid-cols-3 gap-[4rem] gap-y-[3.2rem]">
        {mockupCampaign.map((campaign, index) => (
          <CardCampaign
            key={index}
            imageSrc={campaign.imageSrc}
            chipText={campaign.chipText}
            chipVariant={
              campaign.chipVariant as 'notOpen' | 'active' | 'rejected'
            }
            deadline={campaign.deadline}
            title={campaign.title}
            buttonText={campaign.buttonText}
            handleButtonClick={campaign.handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
}
