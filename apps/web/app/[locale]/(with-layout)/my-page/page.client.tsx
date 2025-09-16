'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import SideBar from '../../../../components/side-bar/side-bar';
import ConnectSNS from './components/connect-sns';
import ContentSubmissions from './components/content-submissions/ContentSubmissions';
import EditProfile from './components/edit-profile/EditProfile';
import MyCampaign from './components/my-campaign';
import { mockup } from './constant/mockup';

export default function PageClient() {
  const t = useTranslations('myPage.menus');

  const MENU = {
    myCampaign: t('myCampaign'),
    editProfile: t('editProfile'),
    connectSNS: t('connectSNS'),
    contentSubmissions: t('contentSubmissions'),
  };

  const [activeMenu, setActiveMenu] = useState<string>(MENU.myCampaign);
  const handleClickTab = (tab: string) => {
    setActiveMenu(tab);
  };

  return (
    <div className="flex w-full items-start gap-[2.4rem]">
      <SideBar
        profileImage={mockup.profile.profileImage}
        name={mockup.profile.name}
        email={mockup.profile.email}
        instagram={mockup.profile.instagram}
        level={mockup.profile.level}
        activeMenu={activeMenu}
        handleClickTab={handleClickTab}
        menus={Object.values(MENU)}
      />
      {activeMenu === MENU.myCampaign && <MyCampaign />}
      {activeMenu === MENU.editProfile && <EditProfile />}
      {activeMenu === MENU.connectSNS && <ConnectSNS />}
      {activeMenu === MENU.contentSubmissions && <ContentSubmissions />}
    </div>
  );
}
