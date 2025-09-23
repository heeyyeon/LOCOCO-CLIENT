import { getTranslations } from 'next-intl/server';

import SideBar from 'components/side-bar/side-bar';

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
    { label: t('checkContents'), value: 'content' },
    { label: t('dashboard'), value: 'dashboard' },
  ];
  return (
    <div className="mx-auto flex w-[112.8rem]">
      <SideBar
        name="Chanel"
        email="Chanel1233@naver.com"
        menus={menuItems}
        defaultActiveMenu="campaign"
      />
      {children}
    </div>
  );
}
