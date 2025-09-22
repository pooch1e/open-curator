import Navbar from './Navbar';
import Hamburger from './Hamburger';
export default function Header() {
  return (
    <>
      <div className="border-2">
        <h1 className='text-center text-2xl p-2 mb-2'>openGallery</h1>
        <Navbar />
      </div>
    </>
  );
}
