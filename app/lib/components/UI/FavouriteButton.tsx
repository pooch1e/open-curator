'use client';

import { useFavourites } from '../../hooks/useFavourites';
import type { FavouriteButtonProps } from '../../config/types';

export default function FavouriteButton({ item }: FavouriteButtonProps) {
  const favourites = useFavourites();

  // check if work is already added to catalog
  const isFavourited = favourites?.favourites.some(
    (artwork) => artwork.id === item.id
  );

  const handleToggleFavourite = () => {
    if (isFavourited) {
      favourites?.removeFavourite(item.id);
    } else {
      favourites?.addFavourite(item);
    }
  };
  return (
    <button
      onClick={handleToggleFavourite}
      type="button"
      aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
      data-favourited={isFavourited}
      className={`relative text-5xl transition-transform duration-200 cursor-pointer ${
        isFavourited ? 'rotate-360 text-red-700' : 'text-white'
      } hover:text-red-500`}>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isFavourited ? 'opacity-0' : 'opacity-100'
        }`}>
        +
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isFavourited ? 'opacity-100' : 'opacity-0'
        }`}>
        –
      </span>
    </button>
  );
}
