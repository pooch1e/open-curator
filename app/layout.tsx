import './app.css';
import Header from './lib/components/Layout/Header';
import FavouritesProvidor from './lib/contexts/FavouritesContext';
import localFont from 'next/font/local';
import { Crimson_Pro } from 'next/font/google';

const prioriFont = localFont({
  src: [{ path: '../public/fonts/PrioriSerBold.woff2', weight: '400', style: 'normal' }],
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
        <link rel="preconnect" href="https://hvrd.art" />
        <link rel="preconnect" href="https://images.metmuseum.org" />
        <link rel="preconnect" href="https://www.artic.edu" />
        <link rel="preconnect" href="https://data.nma.gov.au" />

        <link rel="dns-prefetch" href="https://api.harvardartmuseums.org" />
        <link rel="dns-prefetch" href="https://collectionapi.metmuseum.org" />
      </head>
      <body className="bg-black text-white font-crimson">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-700 focus:text-white focus:rounded">
          Skip to main content
        </a>
        <FavouritesProvidor>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </FavouritesProvidor>
      </body>
    </html>
  );
}
