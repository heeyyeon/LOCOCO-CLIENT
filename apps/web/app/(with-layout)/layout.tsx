import Footer from 'components/footer/footer';
import Header from 'components/header/header';

export default function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-scroll">
      <Header />
      <div className="flex w-full flex-col">{children}</div>
      <Footer />
    </div>
  );
}
