'use client';

import { useFavourites } from '../../hooks/useFavourites';
import type { FavouriteButtonProps } from '../../config/types';

export default function FavouriteButton({
  id,
  title,
  artist,
  date,
  culture,
  medium,
  department,
  primaryimageurl,
  objectURL,
  images,
}: FavouriteButtonProps) {
  const favourites = useFavourites();

  // check if work is already added to catalog
  const isFavourited = favourites?.favourites.some(
    (artwork) => artwork.id === id
  );

  const handleToggleFavourite = () => {
    if (isFavourited) {
      favourites?.removeFavourite(id);
    } else {
      favourites?.addFavourite({
        id,
        title,
        artist,
        date,
        culture,
        medium,
        department,
        primaryimageurl,
        objectURL,
        images,
      });
    }
  };
  return (
    <button
      onClick={handleToggleFavourite}
      type="button"
      aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
      data-favourited={isFavourited}
      className={`relative text-5xl transition-transform duration-200 ${
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
