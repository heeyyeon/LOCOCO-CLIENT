import { Tab, TabContainer } from '@lococo/design-system/tab';
import { SvgAvatarCircle } from '@lococo/icons';

// TODO 대체 예정 레이아웃 용도
export default function SideBar() {
  return (
    <div className="mr-[2.4rem] mt-[1.6rem] flex w-[16.8rem] flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[2rem] border-b border-gray-400">
        <div>
          <SvgAvatarCircle size={96} />
        </div>
        <div className="flex flex-col gap-[0.4rem]">
          <span className="title2 font-[700]">Chanel</span>
          <span className="caption2 mb-[1.6rem] font-[500]">
            Chanel1233@naver.com
          </span>
        </div>
      </div>
      <nav>
        <TabContainer variant="vertical" className="flex w-full items-start">
          {/* TODO 수정 */}
          <Tab label="나의 캠페인" value="나의 캠페인" className="p-0" />
          <Tab label="프로필 편집" value="프로필 편집" className="p-0" />
          <Tab
            label="새 캠페인 만들기"
            value="새 캠페인 만들기"
            className="p-0"
          />
          <Tab label="지원자 확인" value="지원자 확인" className="p-0" />
          <Tab label="컨텐츠 확인" value="컨텐츠 확인" className="p-0" />
          <Tab label="대시보드" value="대시보드" className="p-0" />
        </TabContainer>
      </nav>
    </div>
  );
}
