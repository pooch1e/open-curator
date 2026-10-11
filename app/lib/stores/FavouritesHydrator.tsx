/**
 * FavouritesHydrator — loads persisted favourites after mount and keeps them
 * in sync when another tab changes them.
 */
'use client';
import { useEffect } from 'react';
import { useFavouritesStore } from './favouritesStore';

export default function FavouritesHydrator() {
  useEffect(() => {
    useFavouritesStore.persist.rehydrate();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === useFavouritesStore.persist.getOptions().name) {
        useFavouritesStore.persist.rehydrate();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return null;
}
