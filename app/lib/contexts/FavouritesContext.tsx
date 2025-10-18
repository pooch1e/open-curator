'use client';
import { useEffect, useState, createContext } from 'react';
import type {
  MuseumItem,
  FavouritesContextType,
  FavouritesProviderProps,
} from '@/app/lib/config/types';

export const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);

export default function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [favourites, setFavourites] = useState<MuseumItem[]>([]);
  const [isInitialised, setIsInitialised] = useState<boolean>(false);

  //load local storage on mount
  useEffect(() => {
    try {
      const artworks = localStorage.getItem('favourites');
      if (artworks) {
        const parsedArtworks = JSON.parse(artworks);
        setFavourites(parsedArtworks);
      }
    } catch (err) {
      // Silently handle localStorage errors
    } finally {
      setIsInitialised(true);
    }
  }, []);

  //save to favs
  useEffect(() => {
    try {
      if (isInitialised) {
        const faves = JSON.stringify(favourites);
        localStorage.setItem('favourites', faves);
      }
    } catch (err) {
      // Silently handle localStorage errors
    }
  }, [favourites, isInitialised]);

  const addFavourite = (item: MuseumItem) => {
    setFavourites((prev) => {
      const isAlreadyFavorited = prev.some((fav) => fav.id === item.id);
      if (isAlreadyFavorited) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavourite = (id: number) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearAllFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}
