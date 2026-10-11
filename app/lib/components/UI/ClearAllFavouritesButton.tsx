/**
 * ClearAllFavouritesButton — confirms, then empties the user's favourites,
 * briefly showing a cleared state.
 */
'use client';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useFavourites } from '@/app/lib/hooks/useFavourites';

const CLEARED_FEEDBACK_MS = 2000;

export default function ClearAllFavouritesButton() {
  const { favourites, clearAllFavourites } = useFavourites();
  const [isCleared, setIsCleared] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const hasFavourites = favourites.length > 0;

  const handleClick = () => {
    if (!hasFavourites) return;
    if (!window.confirm(`Remove all ${favourites.length} favourites?`)) return;

    clearAllFavourites();
    setIsCleared(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsCleared(false),
      CLEARED_FEEDBACK_MS
    );
  };

  return (
    <div className="relative">
      <Button
        text={isCleared ? 'Favourites Cleared!' : 'Clear Favourites'}
        handleClick={handleClick}
        aria-label="Clear all favourited items"
        state={isCleared ? 'cleared' : hasFavourites ? 'active' : 'disabled'}
      />
      <div aria-live="polite" className="sr-only">
        {isCleared ? 'All favourites have been cleared.' : ''}
      </div>
    </div>
  );
}
