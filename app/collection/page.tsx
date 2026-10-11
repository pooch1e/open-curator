/**
 * Collection page — shows the artworks the user has favourited.
 */
'use client';
import CollectionContainer from '@/app/lib/components/UI/CollectionPage/CollectionContainer';
import { useFavourites } from '@/app/lib/hooks/useFavourites';

export default function CollectionPage() {
  const { favourites } = useFavourites();
  return <CollectionContainer favourites={favourites} />;
}
