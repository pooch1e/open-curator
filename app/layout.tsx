import './app.css';
import Header from './lib/components/Layout/Header';
import FavouritesProvidor from './lib/contexts/FavouritesContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <FavouritesProvidor>
          <Header />
          <main>{children}</main>
        </FavouritesProvidor>
      </body>
    </html>
  );
}
