'use client'
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
}

type FavouritesContextType = {
  favourites: Artwork[];
  addFavourite: (item: Artwork) => void;
  removeFavourite: (id: number) => void;
};

export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface ProvidorProps {
  children: React.ReactNode
}
export default function FavouritesProvidor({ children }: ProvidorProps) {
  const [favourites, setFavourites] = useState<Artwork[]>([]);
  const [isInitialised, setIsInitialised] = useState<boolean>(false)

  //load local storage on mount 
  useEffect(() => {
    try {
      const artworks = localStorage.getItem("favourites");
      if (artworks) {
        const parsedArtworks = JSON.parse(artworks);
        console.log('Loading favorites from localStorage:', parsedArtworks);
        setFavourites(parsedArtworks);
      } else {
        console.log('No favorites found in localStorage');
      }
    } catch (err) {
      console.log('Error loading favourites:', err);
    } finally {
      setIsInitialised(true)
    }
  }, [])


  //save to favs
  useEffect(() => {
    try {
      if (isInitialised) {
      const faves = JSON.stringify(favourites);
      localStorage.setItem('favourites', faves);
      console.log('Saving favorites to localStorage:', favourites);
      }
    } catch (err) {
      console.log('Error saving favourites:', err);
    }
  }, [favourites, isInitialised])



  const addFavourite = (item: Artwork) => {
    console.log('Adding favorite:', item);
    setFavourites((prev) => {
      const isAlreadyFavorited = prev.some(fav => fav.id === item.id);
      if (isAlreadyFavorited) {
        console.log('Item already in favorites, not adding again');
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavourite = (id: number) => {
    console.log('Removing favorite with id:', id);
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
