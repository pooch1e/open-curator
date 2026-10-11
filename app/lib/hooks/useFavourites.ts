/**
 * useFavourites — accessor for FavouritesContext that fails loudly when used
 * outside FavouritesProvider.
 */
'use client';
import { useContext } from 'react';
import { FavouritesContext } from '@/app/lib/contexts/FavouritesContext';

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }
  return context;
}
