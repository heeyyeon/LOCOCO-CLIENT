'use client';

import { useTranslations } from 'next-intl';

import SideBar from '../../../../../../components/side-bar/side-bar';
import SideBarSkeleton from '../../../../../../components/side-bar/side-bar-skeleton';
import { useBrandProfile } from '../../hooks/use-brand-profile';

interface ClientSideBarProps {
  menus: Array<{ label: string; value: string }>;
  defaultActiveMenu: string;
}

export default function ClientSideBar({
  menus,
  defaultActiveMenu,
}: ClientSideBarProps) {
  const t = useTranslations('brandMyPageSideBar');
  const profileQuery = useBrandProfile();

  // 프로필 데이터가 있으면 사용, 없으면 기본값 사용
  const profileData = profileQuery.data;
  const userName = profileData?.data?.brandName || t('brand');
  //const userEmail = profileData?.email || '';
  const userProfileImage = profileData?.data?.profileImageUrl;
  //TODO: email, instagram 추가
  const userEmail = profileData?.data?.email;

  const userType = t('brand');

  if (profileQuery.isLoading) {
    return <SideBarSkeleton />;
  }

  return (
    <SideBar
      name={userName}
      userType={userType}
      profileImage={userProfileImage}
      instagram={''}
      menus={menus}
      defaultActiveMenu={defaultActiveMenu}
      email={userEmail}
    />
  );
}
