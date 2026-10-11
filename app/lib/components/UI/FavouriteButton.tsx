/**
 * FavouriteButton — toggles an artwork in or out of the user's favourites.
 */
'use client';
import {
  useFavouritesStore,
  useIsFavourite,
} from '@/app/lib/stores/favouritesStore';
import type { MuseumItem } from '@/app/lib/types';
import { getDisplayTitle } from '@/app/lib/utils/museumItem';

interface FavouriteButtonProps {
  item: MuseumItem;
  className?: string;
}

export default function FavouriteButton({
  item,
  className = '',
}: FavouriteButtonProps) {
  const isFavourited = useIsFavourite(item);
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);
  const title = getDisplayTitle(item);

  return (
    <button
      type="button"
      onClick={() =>
        isFavourited ? removeFavourite(item) : addFavourite(item)
      }
      aria-label={
        isFavourited
          ? `Remove ${title} from favourites`
          : `Add ${title} to favourites`
      }
      aria-pressed={isFavourited}
      className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-4xl leading-none transition-colors duration-200 cursor-pointer hover:text-red-500 ${
        isFavourited ? 'text-red-600' : 'text-white'
      } ${className}`}>
      <span aria-hidden="true" className="-mt-1">
        {isFavourited ? '–' : '+'}
      </span>
    </button>
  );
}
