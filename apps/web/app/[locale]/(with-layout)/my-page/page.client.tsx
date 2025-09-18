'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import SideBar from '../../../../components/side-bar/side-bar';
import ConnectSNS from './components/connect-sns/connect-sns';
import ContentSubmissions from './components/content-submissions/content-submissions';
import EditProfile from './components/edit-profile/edit-profile';
import MyCampaign from './components/my-campagin/my-campaign';
import { mockup } from './constant/mockup';

export default function PageClient() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const t = useTranslations('myPage.menus');

  const MENU = {
    myCampaign: t('myCampaign'),
    editProfile: t('editProfile'),
    connectSNS: t('connectSNS'),
    contentSubmissions: t('contentSubmissions'),
  };

  const getActiveMenuFromTab = (tab: string | null) => {
    switch (tab) {
      case 'my-campaign':
        return MENU.myCampaign;
      case 'edit-profile':
        return MENU.editProfile;
      case 'connect-sns':
        return MENU.connectSNS;
      case 'content-submissions':
        return MENU.contentSubmissions;
      default:
        return MENU.myCampaign;
    }
  };

  const activeMenu = getActiveMenuFromTab(searchParams.get('tab'));

  const handleClickTab = (tab: string) => {
    const getTabFromMenu = (menuText: string) => {
      switch (menuText) {
        case MENU.myCampaign:
          return 'my-campaign';
        case MENU.editProfile:
          return 'edit-profile';
        case MENU.connectSNS:
          return 'connect-sns';
        case MENU.contentSubmissions:
          return 'content-submissions';
        default:
          return 'my-campaign';
      }
    };

    params.set('tab', getTabFromMenu(tab));
    router.push(`/my-page?${params.toString()}`);
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
