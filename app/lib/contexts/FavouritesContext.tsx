/**
 * FavouritesProvider — holds the user's favourited artworks and persists them
 * to localStorage, keyed by museum source + id.
 */
'use client';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react';
import type { FavouritesContextType, MuseumItem } from '@/app/lib/types';
import { getItemKey } from '@/app/lib/utils/museumItem';

const STORAGE_KEY = 'favourites';

export const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);

function isStoredItem(value: unknown): value is Partial<MuseumItem> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as MuseumItem).id === 'number'
  );
}

/**
 * Favourites saved before items carried a `source` are migrated by sniffing
 * their museum URL; anything else is dropped rather than trusted blindly.
 */
function parseStoredFavourites(raw: string): MuseumItem[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.filter(isStoredItem).map((item) => ({
    period: null,
    images: [],
    ...item,
    source:
      item.source ??
      (item.objectURL?.includes('artic.edu') ? 'chicago' : 'harvard'),
  })) as MuseumItem[];
}

export default function FavouritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favourites, setFavourites] = useState<MuseumItem[]>([]);
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavourites(parseStoredFavourites(stored));
    } catch (err) {
      console.warn('Could not load favourites from localStorage', err);
    } finally {
      setIsInitialised(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialised) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.warn('Could not save favourites to localStorage', err);
    }
  }, [favourites, isInitialised]);

  const favouriteKeys = useMemo(
    () => new Set(favourites.map(getItemKey)),
    [favourites]
  );

  const isFavourite = useCallback(
    (item: MuseumItem) => favouriteKeys.has(getItemKey(item)),
    [favouriteKeys]
  );

  const addFavourite = useCallback((item: MuseumItem) => {
    setFavourites((prev) =>
      prev.some((fav) => getItemKey(fav) === getItemKey(item))
        ? prev
        : [...prev, item]
    );
  }, []);

  const removeFavourite = useCallback((item: MuseumItem) => {
    setFavourites((prev) =>
      prev.filter((fav) => getItemKey(fav) !== getItemKey(item))
    );
  }, []);

  const clearAllFavourites = useCallback(() => setFavourites([]), []);

  const value = useMemo(
    () => ({
      favourites,
      isFavourite,
      addFavourite,
      removeFavourite,
      clearAllFavourites,
    }),
    [favourites, isFavourite, addFavourite, removeFavourite, clearAllFavourites]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
