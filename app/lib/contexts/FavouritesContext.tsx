'use client';
import { useEffect, useState, createContext } from 'react';

export type Artwork = {
  id: number;
  title: string | null;
  artist: string | null;
  culture?: string | null;
  medium?: string | null;
  department?: string | null;
  primaryimageurl?: string | null;
  objectURL?: string | null;
  date: string | null;
  images?: any[];
};

type FavouritesContextType = {
  favourites: Artwork[];
  addFavourite: (item: Artwork) => void;
  removeFavourite: (id: number) => void;
  clearAllFavourites: () => void;
};

export const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);

interface ProvidorProps {
  children: React.ReactNode;
}
export default function FavouritesProvidor({ children }: ProvidorProps) {
  const [favourites, setFavourites] = useState<Artwork[]>([]);
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

  const addFavourite = (item: Artwork) => {
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
