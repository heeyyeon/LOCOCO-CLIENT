import SideBar from './component/side-bar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-[112.8rem]">
      <SideBar />
      {children}
    </div>
  );
}
