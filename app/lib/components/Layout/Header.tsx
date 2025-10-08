import Navbar from './Navbar';


export default function Header() {

  return (
    <header role="banner" className="border-2">
      <h1 className="text-center text-4xl p-2 mb-2" aria-label="openGallery - Museum Art Collection">
        openGallery
      </h1>
      <Navbar />
    </header>
  );
}
