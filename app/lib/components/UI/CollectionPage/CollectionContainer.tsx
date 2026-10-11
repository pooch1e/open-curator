/**
 * CollectionContainer — grid of the user's favourited artworks with a
 * lightbox modal for browsing them full size.
 */
'use client';
import { useCallback, useState } from 'react';
import ClearAllFavouritesButton from '../ClearAllFavouritesButton';
import CollectionItem from './CollectionItem';
import ImageModal from '../Modal/ImageModal';
import type { MuseumItem } from '@/app/lib/types';
import { getItemKey } from '@/app/lib/utils/museumItem';

interface CollectionContainerProps {
  favourites: MuseumItem[];
}

export default function CollectionContainer({
  favourites,
}: CollectionContainerProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => setModalIndex(null), []);

  return (
    <section
      className="py-8 px-4 md:py-12"
      aria-labelledby="collection-heading">
      <div className="px-6 py-2">
        <ClearAllFavouritesButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1
          id="collection-heading"
          className="text-2xl md:text-3xl font-bold text-white mb-6 text-center p-4">
          My Collection <span className="p-4">({favourites.length})</span>
        </h1>

        {favourites.length === 0 ? (
          <p className="text-white">
            Your collection is empty. Add artworks to see them here.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {favourites.map((item, index) => (
              <CollectionItem
                key={getItemKey(item)}
                item={item}
                onImageClick={() => setModalIndex(index)}
              />
            ))}
          </ul>
        )}
      </div>

      {modalIndex !== null && (
        <ImageModal
          onClose={closeModal}
          items={favourites}
          currentIndex={modalIndex}
          onNavigate={setModalIndex}
        />
      )}
    </section>
  );
}
