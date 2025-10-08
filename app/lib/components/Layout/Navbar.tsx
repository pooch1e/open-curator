import Link from 'next/link';
import Button from '../UI/Button';
export default function Navbar() {
  return (
    <nav role="navigation" aria-label="Main navigation" className="flex justify-between p-2 font-mono">
      <Link href={'/'}>
        <Button text={'Home'} aria-label="Go to Home page" />
      </Link>
      <Link href={'/collection'}>
        <Button text={'Collection'} aria-label="Go to Collection page" />
      </Link>
    </nav>
  );
}
