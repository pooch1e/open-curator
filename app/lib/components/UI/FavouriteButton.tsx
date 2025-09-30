'use client';

import { useState } from 'react';
export default function FavouriteButton() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleIsClicked = () => {
    setIsClicked((prev) => !prev);
  };
  return (
    <button className="text-5xl hover:text-red-700" onClick={handleIsClicked}>
      {isClicked ? 'N' : '+'}
    </button>
  );
}
