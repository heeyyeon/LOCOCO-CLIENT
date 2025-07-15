import Footer from 'components/footer/footer';
import Header from 'components/header/header';

export default function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen min-w-[1366px] flex-col">
      <Header />
      <div className="flex w-full flex-col">{children}</div>
      <Footer />
    </div>
  );
}
