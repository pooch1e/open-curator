import Link from 'next/link';
import Button from '../UI/Button';
export default function Navbar() {
  return (
    <div className="flex justify-between p-2 font-mono">
      <Link href={'/'}>
        <Button text={'Home'} />
      </Link>
      <Link href={'/collection'}>
        <Button text={'Collection'} />
      </Link>
    </div>
  );
}
