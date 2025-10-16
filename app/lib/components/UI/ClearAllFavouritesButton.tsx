import Button from './Button';
import { useFavourites } from '../../hooks/useFavourites';
export default function ClearAllFavouritesButton() {
  const favourites = useFavourites();

  // check if work is already added to catalog
  const isFavourited = (favourites?.favourites?.length ?? 0) > 0

  

  const handleClick = () => {
    
    if (isFavourited) {
      favourites?.clearAllFavourites();
    }
  };

  return <Button text={'Clear Favourites'} handleClick={handleClick} />;
}
