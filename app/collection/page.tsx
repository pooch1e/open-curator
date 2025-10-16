'use client';
import CollectionContainer from '../lib/components/UI/CollectionPage/CollectionContainer';
import { useFavourites } from '../lib/hooks/useFavourites';

export default function CollectionPage() {
  const collection = useFavourites();
  return <CollectionContainer favourites={collection?.favourites || []} />;
}
