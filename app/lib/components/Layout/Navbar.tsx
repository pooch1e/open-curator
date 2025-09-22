import Button from '../UI/Button';
export default function Navbar() {
  return (
    <div className="flex justify-between p-2">
      <Button text={'Home'} />

      <Button text={'Collection'} />
    </div>
  );
}
