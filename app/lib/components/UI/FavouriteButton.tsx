'use client';

import { useState } from 'react';
import { useFavourites } from '../../hooks/useFavourites';
import type { Artwork } from '../../contexts/FavouritesContext';
export default function FavouriteButton({
  id,
  title,
  artist,
  imageUrl,
  url,
  date,
}: Artwork) {
  const favourites = useFavourites();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // check if work is already added to catalog
  const isFavourited = favourites?.favourites.some(
    (artwork) => artwork.id === id
  );
  const handleIsClicked = () => {
    setIsClicked((prev) => !prev);
    if (isFavourited) {
      favourites?.removeFavourite(id);
    } else {
      favourites?.addFavourite({ id, title, artist, imageUrl, url, date });
    }
  };
  return (
    <button
      className={`text-5xl transition-colors ${
        isFavourited ? 'text-red-700' : 'text-white'
      } hover:text-red-500`}
      onClick={handleIsClicked}>
      {isFavourited ? 'X' : '+'}
    </button>
  );
}
