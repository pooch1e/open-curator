'use client';
import CollectionContainer from '../lib/components/UI/CollectionPage/CollectionContainer';
import { useFavourites } from '../lib/hooks/useFavourites';
// deals with 'backend' functions
export default function CollectionPage() {
  const collection = useFavourites();
  console.log(collection?.favourites, 'in page')
  return <CollectionContainer favourites={collection?.favourites} />;
}
