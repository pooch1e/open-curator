/**
 * ClearAllFavouritesButton — confirms, then empties the user's favourites,
 * briefly showing a cleared state.
 */
'use client';
import { useEffect, useRef, useState } from 'react';
import { useFavouritesStore } from '@/app/lib/stores/favouritesStore';

const CLEARED_FEEDBACK_MS = 2000;

export default function ClearAllFavouritesButton() {
  const count = useFavouritesStore((state) => state.favourites.length);
  const clearAllFavourites = useFavouritesStore(
    (state) => state.clearAllFavourites
  );
  const [isCleared, setIsCleared] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = () => {
    if (!window.confirm(`Remove all ${count} saved works?`)) return;

    clearAllFavourites();
    setIsCleared(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsCleared(false),
      CLEARED_FEEDBACK_MS
    );
  };

  if (count === 0 && !isCleared) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isCleared}
        className={`font-crimson text-lg underline underline-offset-4 transition-colors ${
          isCleared
            ? 'text-green-400'
            : 'text-gray-300 hover:text-red-500 cursor-pointer'
        }`}>
        {isCleared ? 'Collection cleared' : 'Clear all'}
      </button>
      <span aria-live="polite" className="sr-only">
        {isCleared ? 'All saved works have been removed.' : ''}
      </span>
    </>
  );
}
