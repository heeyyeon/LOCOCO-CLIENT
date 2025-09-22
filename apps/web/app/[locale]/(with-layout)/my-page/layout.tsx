import { getTranslations } from 'next-intl/server';

import SideBar from 'components/side-bar/side-bar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('myPage.menus');
  const menuItems = [
    { label: t('myCampaign'), value: 'my-campaign' },
    { label: t('editProfile'), value: 'edit-profile' },
    { label: t('connectSNS'), value: 'connect-sns' },
    { label: t('contentSubmissions'), value: 'content-submissions' },
  ];

  return (
    <div className="mx-auto flex w-[112.8rem]">
      <SideBar
        name="Chanel"
        email="Chanel1233@naver.com"
        menus={menuItems}
        defaultActiveMenu="my-campaign"
      />
      {children}
    </div>
  );
}
