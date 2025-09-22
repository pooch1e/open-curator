import './app.css'
import Header from './lib/components/Layout/Header';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-black text-white'>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
