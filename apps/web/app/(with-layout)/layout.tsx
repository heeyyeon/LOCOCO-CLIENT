import Footer from 'components/footer/footer';
import Header from 'components/header/header';

export default function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
