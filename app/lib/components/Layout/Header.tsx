import Navbar from './Navbar';

export default function Header() {
  return (
    <>
      <header role="banner" className="">
        <h1
          className="font-serif text-center text-4xl p-2 mb-2 overflow-hidden"
          aria-label="openGallery - Museum Art Collection">
          <span className="inline-block animate-expand-text">OpenGallery</span>
        </h1>
        <Navbar />
      </header>
     
      <div className="flex justify-center">
        <div className="border-b-1 min-w-11/12 mt-3 "></div>
      </div>
    </>
  );
}
