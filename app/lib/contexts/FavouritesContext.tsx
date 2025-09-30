import { useEffect, useState, createContext } from 'react';

type Artwork {
  id: number,
  title: string,
  artist : string,
  imageUrl: string,
  url: string,
  date : string 
}

type FavouritesContextType = {
  favourites: Artwork[];
  addFavourite: (item: Artwork) => void;
  removeFavourite: (id: string) => void;
};

export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface ProvidorProps {
  children: React.ReactNode
}
export default function FavouritesProvidor({ children }: ProvidorProps) {
  const [favourites, setFavourites] = useState<Artwork[]>([]);

  //load local storage on mount 
  useEffect(() => {
    try {
      const artworks = localStorage.getItem("favourites");
      if (artworks) {
      setFavourites(JSON.parse(artworks))
      }
    
  } catch (err) {
      console.log(err)
      console.log('error mounting favourites')
    }
  }, [])


  //save to favs
  useEffect(() => {
    try {
    const faves = JSON.stringify(favourites)
    localStorage.setItem('favourites', faves)
  } catch (err) {
    console.log('error saving favourites')
  }
}, [favourites])



  const addFavourite = (item : Artwork) => {
    setFavourites((prev) => [...prev, item]);
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
