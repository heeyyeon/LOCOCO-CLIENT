import SideBar from 'components/side-bar/side-bar';

const menuItems = [
  { label: '나의 캠페인', value: 'my-campaign' },
  { label: '프로필 편집', value: 'edit-profile' },
  { label: 'SNS 연결', value: 'connect-sns' },
  { label: '컨텐츠 제출', value: 'content-submissions' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
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
