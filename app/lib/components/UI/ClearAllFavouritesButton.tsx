import Button from './Button';
import { useFavourites } from '../../hooks/useFavourites';
export default function ClearAllFavouritesButton() {
  const favourites = useFavourites();

  // check if work is already added to catalog
  const isFavourited = favourites?.favourites?.length > 0 
  console.log(isFavourited)
  

  const handleClick = () => {
    console.log('clear favourites clicked')
    if (isFavourited) {
      favourites?.clearAllFavourites();
    }
  };

  return <Button text={'clear favourites'} handleClick={handleClick} />;
}
