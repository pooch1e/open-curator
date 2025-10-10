import Navbar from './Navbar';

export default function Header() {
  return (
    <>
      <header role="banner" className="">
        <h1
          className="font-serif text-center text-4xl p-2 mb-2"
          aria-label="openGallery - Museum Art Collection">
          OpenGallery
        </h1>
        <Navbar />
      </header>
      {/* custom border like HR */}
      <div className="flex justify-center">
        <div className="border-b-1 min-w-11/12 "></div>
      </div>
    </>
  );
}
