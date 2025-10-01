import '../app.css';
import FavouritesProvidor from '../lib/contexts/FavouritesContext';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <FavouritesProvidor>
          <main>{children}</main>
        </FavouritesProvidor>
      </body>
    </html>
  );
}
