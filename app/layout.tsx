/**
 * RootLayout — loads fonts and global styles, sets site metadata, and wraps
 * every page in the app shell (skip link, header, main) that modals make inert.
 */
import './app.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Crimson_Pro } from 'next/font/google';
import Header from '@/app/lib/components/Layout/Header';
import FavouritesHydrator from '@/app/lib/stores/FavouritesHydrator';
import { APP_SHELL_ID } from '@/app/lib/config/appShell';

export const metadata: Metadata = {
  title: { default: 'OpenCurator', template: '%s · OpenCurator' },
  description:
    'Search open-access museum collections and curate your own selection of artworks.',
};

const prioriFont = localFont({
  src: [
    {
      path: '../public/fonts/PrioriSerBold.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-priori-serif',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${prioriFont.variable} ${crimsonPro.variable}`}>
      <head>
        <link rel="preconnect" href="https://nrs.harvard.edu" />
        <link rel="preconnect" href="https://www.artic.edu" />
      </head>
      <body className="bg-black text-white font-crimson">
        <FavouritesHydrator />
        <div id={APP_SHELL_ID}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-700 focus:text-white focus:rounded">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
