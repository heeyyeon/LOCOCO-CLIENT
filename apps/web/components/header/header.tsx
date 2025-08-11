import { MainHeader } from './main-header';
import TopUtil from './top-util';

interface HeaderProps {
  authStatus: boolean;
}

export function Header({ authStatus }: HeaderProps) {
  return (
    <>
      <TopUtil authStatus={authStatus} />
      <MainHeader />
    </>
  );
}
