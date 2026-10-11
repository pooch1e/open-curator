/**
 * Header — animated OpenCurator wordmark, main navigation, and divider.
 */
import Navbar from './Navbar';

export default function Header() {
  return (
    <>
      <header>
        <p className="font-serif text-center text-4xl p-2 mb-2 overflow-hidden">
          <span className="animate-expand-text">OpenCurator</span>
        </p>
        <Navbar />
      </header>

      <div className="flex justify-center">
        <div className="border-b min-w-11/12 mt-3" />
      </div>
    </>
  );
}
