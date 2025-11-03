'use client';

import SideBar from '../../../../../../components/side-bar/side-bar';
import SideBarSkeleton from '../../../../../../components/side-bar/side-bar-skeleton';
import { useProfile } from '../../apis/profile-api';

interface ClientSideBarProps {
  menus: Array<{ label: string; value: string }>;
  defaultActiveMenu: string;
}

export default function ClientSideBar({
  menus,
  defaultActiveMenu,
}: ClientSideBarProps) {
  const profileQuery = useProfile();

  // 프로필 데이터가 있으면 사용, 없으면 기본값 사용
  const profileData = profileQuery.data?.data?.creatorBasicInfo;
  const userName = profileData?.creatorName || 'User';
  //const userEmail = profileData?.email || '';
  const userProfileImage = profileData?.profileImageUrl;
  //TODO: email, instagram 추가
  const userEmail = profileData?.email || '';

  const creatorType = profileQuery.data?.data?.creatorType || '';

  if (profileQuery.isLoading) {
    return <SideBarSkeleton />;
  }

  return (
    <SideBar
      name={userName}
      email={userEmail}
      userType={creatorType}
      profileImage={userProfileImage}
      instagram={''}
      menus={menus}
      defaultActiveMenu={defaultActiveMenu}
    />
  );
}
