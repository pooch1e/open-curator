/**
 * Favourites store — the user's saved artworks, persisted to localStorage
 * via Zustand and keyed by museum source + id.
 */
import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import type { MuseumItem } from '@/app/lib/types';
import { getItemKey } from '@/app/lib/utils/museumItem';

const STORAGE_KEY = 'favourites';
const STORE_VERSION = 1;

interface FavouritesState {
  favourites: MuseumItem[];
  addFavourite: (item: MuseumItem) => void;
  removeFavourite: (item: MuseumItem) => void;
  clearAllFavourites: () => void;
}

type PersistedFavourites = Pick<FavouritesState, 'favourites'>;

/**
 * Before Zustand, favourites were stored as a bare array. Wrapping that shape
 * as version 0 routes it through `migrate` instead of discarding it.
 */
const storage: PersistStorage<PersistedFavourites> = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? { state: { favourites: parsed }, version: 0 }
      : parsed;
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
};

function isStoredItem(value: unknown): value is Partial<MuseumItem> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as MuseumItem).id === 'number'
  );
}

/**
 * Version 0 items predate `source`; Harvard was the only other museum the UI
 * ever showed, so anything not from artic.edu is attributed to Harvard.
 */
function migrateFavourites(persisted: unknown): PersistedFavourites {
  const stored = (persisted as Partial<PersistedFavourites> | undefined)
    ?.favourites;
  if (!Array.isArray(stored)) return { favourites: [] };

  const favourites = stored.filter(isStoredItem).map((item) => ({
    ...item,
    period: item.period ?? null,
    images: item.images ?? [],
    source:
      item.source ??
      (item.objectURL?.includes('artic.edu') ? 'chicago' : 'harvard'),
  })) as MuseumItem[];

  return { favourites };
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set) => ({
      favourites: [],
      addFavourite: (item) =>
        set(({ favourites }) =>
          favourites.some((fav) => getItemKey(fav) === getItemKey(item))
            ? { favourites }
            : { favourites: [...favourites, item] }
        ),
      removeFavourite: (item) =>
        set(({ favourites }) => ({
          favourites: favourites.filter(
            (fav) => getItemKey(fav) !== getItemKey(item)
          ),
        })),
      clearAllFavourites: () => set({ favourites: [] }),
    }),
    {
      name: STORAGE_KEY,
      version: STORE_VERSION,
      storage,
      migrate: migrateFavourites,
      partialize: ({ favourites }) => ({ favourites }),
      // Rehydrated from FavouritesHydrator after mount so the first client
      // render matches the server's empty state.
      skipHydration: true,
    }
  )
);

export function useIsFavourite(item: MuseumItem): boolean {
  const key = getItemKey(item);
  return useFavouritesStore((state) =>
    state.favourites.some((fav) => getItemKey(fav) === key)
  );
}

const subscribeToHydration = (onChange: () => void) =>
  useFavouritesStore.persist.onFinishHydration(onChange);

export function useFavouritesHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => useFavouritesStore.persist.hasHydrated(),
    () => false
  );
}
