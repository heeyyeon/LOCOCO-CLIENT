import { getTranslations } from 'next-intl/server';

import ClientSideBar from './component/client-side-bar/ClientSideBar';

export interface MenuItem {
  label: string;
  value: string;
}

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('brandMyPageSideBar');

  const menuItems: MenuItem[] = [
    { label: t('myCampaign'), value: 'campaign' },
    { label: t('editProfile'), value: 'profile' },
    { label: t('makeNewCampaign'), value: 'create-campaign' },
    { label: t('checkApplicants'), value: 'applicants' },
    { label: t('checkContents'), value: 'contents-performance' },
  ];
  return (
    <div className="mx-auto flex w-[112rem]">
      <ClientSideBar menus={menuItems} defaultActiveMenu="campaign" />
      {children}
    </div>
  );
}
