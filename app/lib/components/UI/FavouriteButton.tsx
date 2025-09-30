'use client';

import { useFavourites } from '../../hooks/useFavourites';

interface FavouriteButtonProps {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture?: string | null;
  medium?: string | null;
  department?: string | null;
  primaryimageurl?: string | null;
  objectURL?: string | null;
  images?: any[];
}

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
      className={`text-5xl transition-colors ${
        isFavourited ? 'text-red-700' : 'text-white'
      } hover:text-red-500`}
      onClick={handleToggleFavourite}
      type="button"
      aria-label={isFavourited ? 'Remove from favorites' : 'Add to favorites'}>
      {isFavourited ? '♥' : '♡'}
    </button>
  );
}
