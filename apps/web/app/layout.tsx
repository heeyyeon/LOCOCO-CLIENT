import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { Providers } from '../components/providers';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['700', '500', '400'],
  display: 'swap',
});

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '500 700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lococo',
    template: 'Lococo | %s',
  },
  description: 'Kコスメと出会う 一番の近道',
  keywords: [
    'Kビューティー',
    'ダイソー',
    'オリーブヤング',
    "d'Alba",
    'anua',
    'medicube',
    'VT cosmetics',
    'rom&nd',
    'round lab',
    '韓国メイク',
    'Lips',
    '@cosme',
  ],
  verification: {
    google: 'kSp4ZBLdAObw2vrbpzFmceC7CaPyk4m15BLxUpbu',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: {
      default: 'Lococo',
      template: ' %s | Lococo',
    },
    description: 'Kコスメと出会う 一番の近道',
    images: '/images/home-banner.png',
    url: 'https://lococo.beauty',
    siteName: 'Lococo',
    locale: 'ja_JP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-GT92YY193R" />
      <GoogleTagManager gtmId="GTM-5QMBC6SP" />

      <body
        className={`${notoSansJP.variable} ${pretendard.variable} min-h-screen lg:flex lg:justify-center`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
