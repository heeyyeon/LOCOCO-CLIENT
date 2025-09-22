import Footer from 'components/footer/footer';
import Gnb from 'components/gnb/gnb';

export default async function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col px-[1rem]">
      <Gnb />
      <div className="flex w-full min-w-[112.8rem] flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
