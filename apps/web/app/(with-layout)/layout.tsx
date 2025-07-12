import Footer from 'components/footer/footer';
import Header from 'components/header/header';

export default function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="w-screen">
        <Header />
      </div>
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[112.8rem]">{children}</div>
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
}
