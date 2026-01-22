import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from './query-provider';

export const metadata: Metadata = {
  title: 'LOCOCO Admin',
  description: 'LOCOCO 관리자 페이지',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}


