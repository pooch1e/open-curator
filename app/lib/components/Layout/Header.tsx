import Navbar from './Navbar';
import SearchBar from '../UI/SearchBar';

export default function Header() {
  return (
    <>
      <div className="border-2">
        <h1 className="text-center text-4xl p-2 mb-2">openGallery</h1>
        <Navbar />
        <div className='flex justify-center p-2'>
          <SearchBar />
        </div>
      </div>
    </>
  );
}
