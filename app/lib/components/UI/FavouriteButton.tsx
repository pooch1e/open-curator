/**
 * FavouriteButton — toggles an artwork in or out of the user's favourites.
 */
'use client';
import { useFavourites } from '@/app/lib/hooks/useFavourites';
import type { MuseumItem } from '@/app/lib/types';

export default function FavouriteButton({ item }: { item: MuseumItem }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const isFavourited = isFavourite(item);

  const handleToggleFavourite = () => {
    if (isFavourited) {
      removeFavourite(item);
    } else {
      addFavourite(item);
    }
  };

  return (
    <button
      onClick={handleToggleFavourite}
      type="button"
      aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFavourited}
      className={`relative text-5xl transition-transform duration-200 cursor-pointer hover:text-red-500 ${
        isFavourited ? 'rotate-360 text-red-700' : 'text-white'
      }`}>
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isFavourited ? 'opacity-0' : 'opacity-100'
        }`}>
        +
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isFavourited ? 'opacity-100' : 'opacity-0'
        }`}>
        –
      </span>
    </button>
  );
}
