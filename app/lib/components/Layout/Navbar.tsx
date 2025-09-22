import Button from '../UI/Button';
export default function Navbar() {
  return (
    <div className="flex justify-between p-2 font-mono">
      <Button text={'Home'} />

      <Button text={'Collection'} />
    </div>
  );
}
