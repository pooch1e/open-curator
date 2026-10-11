/**
 * Navbar — primary site navigation between search and the user's collection.
 */
import Button from '@/app/lib/components/UI/Button';

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="flex justify-between p-4">
      <Button href="/" text="Home" />
      <Button href="/collection" text="Collection" />
    </nav>
  );
}
