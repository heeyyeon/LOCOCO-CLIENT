import React from 'react';

import { Button } from '@lococo/design-system/button';
import { InfoChip } from '@lococo/design-system/info-chip';
import { SvgAvatar } from '@lococo/icons';

import { MENU, Menu } from '../constant/menu';
import { mockup } from '../constant/mockup';

interface SideBarProps {
  activeTab: Menu;
  handleClickTab: (tab: Menu) => void;
}

export default function SideBar({ activeTab, handleClickTab }: SideBarProps) {
  return (
    <div className="flex w-auto flex-col items-start gap-[1.6rem] pl-[11.9rem] pt-[1.6rem]">
      <SvgAvatar size={98} className="rounded-full" />
      <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
        <p className="inter-title2 no-wrap text-nowrap text-gray-800">
          {mockup.profile.name}
        </p>
        <p className="inter-caption2 text-gray-800">{mockup.profile.email}</p>
        <p className="inter-caption2 text-gray-800">
          {mockup.profile.instagram}
        </p>
        <InfoChip text={mockup.profile.level} color="default" size="md" icon />
      </div>
      <div className="h-[1px] w-full bg-gray-400" />

      <div className="align-self-stretch flex flex-col items-start justify-start">
        <Button
          variant="text"
          color={activeTab === MENU.myCampaign ? 'primary' : 'secondary'}
          size="md"
          fontType="InterBody1"
          className="px-0"
          onClick={() => handleClickTab(MENU.myCampaign)}
        >
          {MENU.myCampaign}
        </Button>
        <Button
          variant="text"
          color={activeTab === MENU.editProfile ? 'primary' : 'secondary'}
          size="lg"
          fontType="InterBody1"
          className="px-0"
          onClick={() => handleClickTab(MENU.editProfile)}
        >
          {MENU.editProfile}
        </Button>
        <Button
          variant="text"
          color={activeTab === MENU.connectSNS ? 'primary' : 'secondary'}
          size="lg"
          fontType="InterBody1"
          className="px-0"
          onClick={() => handleClickTab(MENU.connectSNS)}
        >
          {MENU.connectSNS}
        </Button>
        <Button
          variant="text"
          color={
            activeTab === MENU.contentSubmissions ? 'primary' : 'secondary'
          }
          size="lg"
          fontType="InterBody1"
          className="px-0"
          onClick={() => handleClickTab(MENU.contentSubmissions)}
        >
          {MENU.contentSubmissions}
        </Button>
        <Button
          variant="text"
          color={activeTab === MENU.myAnalytics ? 'primary' : 'secondary'}
          size="lg"
          fontType="InterBody1"
          className="px-0"
        >
          {MENU.myAnalytics}
        </Button>
      </div>
    </div>
  );
}
