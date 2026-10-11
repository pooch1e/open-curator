/**
 * CollectionContainer — the user's saved artworks: a serif search bar that
 * filters them, a count, and a gallery grid that opens a lightbox.
 */
'use client';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import CollectionItem from './CollectionItem';
import ImageModal from '../Modal/ImageModal';
import SearchBar from '../SearchPage/SearchBar';
import ClearAllFavouritesButton from '../ClearAllFavouritesButton';
import {
  useFavouritesHydrated,
  useFavouritesStore,
} from '@/app/lib/stores/favouritesStore';
import { useSearchFilter } from '@/app/lib/hooks/useSearchFilter';
import { getItemKey } from '@/app/lib/utils/museumItem';

function pluraliseWorks(count: number): string {
  return `${count} saved ${count === 1 ? 'work' : 'works'}`;
}

export default function CollectionContainer() {
  const favourites = useFavouritesStore((state) => state.favourites);
  const isHydrated = useFavouritesHydrated();
  const [query, setQuery] = useState('');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const visible = useSearchFilter(favourites, query);
  const isFiltering = query.trim().length > 0;
  const openIndex =
    modalIndex !== null && modalIndex < visible.length ? modalIndex : null;

  const closeModal = useCallback(() => setModalIndex(null), []);

  const countLabel = isFiltering
    ? `${visible.length} of ${pluraliseWorks(favourites.length)}`
    : pluraliseWorks(favourites.length);

  return (
    <section
      aria-labelledby="collection-heading"
      className="px-4 md:px-8 pb-16">
      <h1 id="collection-heading" className="sr-only">
        My Collection
      </h1>

      <div className="flex justify-center p-2 mt-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          label="Search your collection"
          placeholder="Search your collection"
          description="Filters your saved works by title, artist, medium, or culture."
        />
      </div>

      <div className="flex items-baseline justify-between gap-4 px-2 py-3">
        <p role="status" className="font-crimson text-lg text-gray-300">
          {isHydrated ? countLabel : ''}
        </p>
        <ClearAllFavouritesButton />
      </div>

      {!isHydrated ? null : favourites.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-crimson text-2xl">Your collection is empty.</p>
          <p className="text-gray-300">
            Press <span aria-hidden="true">+</span>
            <span className="sr-only">the add to favourites button</span> on any
            artwork to save it here.
          </p>
          <Link
            href="/"
            className="font-crimson text-xl underline underline-offset-4 hover:text-red-500">
            Browse artworks
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <p className="py-16 text-center font-crimson text-xl text-gray-300">
          No saved works match &ldquo;{query.trim()}&rdquo;.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item, index) => (
            <CollectionItem
              key={getItemKey(item)}
              item={item}
              onOpen={() => setModalIndex(index)}
            />
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <ImageModal
          items={visible}
          currentIndex={openIndex}
          onNavigate={setModalIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
