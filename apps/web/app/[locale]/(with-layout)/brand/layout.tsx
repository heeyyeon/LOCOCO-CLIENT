import SideBar from 'components/side-bar/side-bar';

export interface MenuItem {
  label: string;
  value: string;
}

const menuItems: MenuItem[] = [
  { label: '나의 캠페인', value: 'campaign' },
  { label: '프로필 편집', value: 'profile' },
  { label: '새 캠페인 만들기', value: 'create-campaign' },
  { label: '지원자 확인', value: 'applicants' },
  { label: '컨텐츠 확인', value: 'content' },
  { label: '대시보드', value: 'dashboard' },
];

export default function layout({ children }: { children: React.ReactNode }) {
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
