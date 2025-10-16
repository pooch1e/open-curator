'use client';
import { useState } from 'react';
import Button from './Button';
import { useFavourites } from '../../hooks/useFavourites';

export default function ClearAllFavouritesButton() {
  const favourites = useFavourites();
  const [isCleared, setIsCleared] = useState(false);

  const isFavourited = (favourites?.favourites?.length ?? 0) > 0;

  const handleClick = () => {
    if (isFavourited) {
      favourites?.clearAllFavourites();
      setIsCleared(true);
      setTimeout(() => setIsCleared(false), 2000); 
    }
  };

  return (
    <div className="relative">
      <Button
        text={isCleared ? 'Favourites Cleared!' : 'Clear Favourites'}
        handleClick={handleClick}
        aria-label="Clear all favourited items"
        state={isCleared ? 'cleared' : isFavourited ? 'active' : 'disabled'}
      />
      <div aria-live="polite" className="sr-only">
        {isCleared ? 'All favourites have been cleared.' : ''}
      </div>
    </div>
  );
}
