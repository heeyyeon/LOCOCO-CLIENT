'use client';

import React, { useState } from 'react';

import ConnectSNS from './components/connect-sns';
import ContentSubmissions from './components/content-submissions';
import EditProfile from './components/edit-profile';
import MyCampaign from './components/my-campaign';
import SideBar from './components/side-bar';
import { MENU, Menu } from './constant/menu';

export default function PageClient() {
  const [activeTab, setActiveTab] = useState<Menu>(MENU.myCampaign);
  const handleClickTab = (tab: Menu) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full items-start gap-[2.4rem]">
      <SideBar activeTab={activeTab} handleClickTab={handleClickTab} />
      {activeTab === MENU.myCampaign && <MyCampaign />}
      {activeTab === MENU.editProfile && <EditProfile />}
      {activeTab === MENU.connectSNS && <ConnectSNS />}
      {activeTab === MENU.contentSubmissions && <ContentSubmissions />}
    </div>
  );
}
