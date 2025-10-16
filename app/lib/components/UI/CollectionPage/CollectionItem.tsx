import FavouriteButton from '../FavouriteButton';
import type { CollectionItemProps } from '@/app/lib/config/types';

interface ExtendedCollectionItemProps extends CollectionItemProps {
  onImageClick?: () => void;
}

export default function CollectionItem({
  collectionData,
  onImageClick,
}: ExtendedCollectionItemProps) {
  const artworkDescription = `${collectionData.title || 'Untitled artwork'}${
    collectionData.artist ? ` by ${collectionData.artist}` : ''
  }`;

  return (
    <article
      className="group relative flex h-full flex-col gap-5 p-4 border border-gray-800 bg-gray-900/30 rounded-xl shadow-sm hover:shadow-md hover:border-red-600/40 transition-all duration-300"
      role="listitem">
      {/* Hero Image */}
      <div
        className="relative w-full aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-gray-700/60 hover:border-red-600/50 transition-all duration-300"
        role="img"
        aria-label={artworkDescription}
        onClick={onImageClick}>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-lg" />

        {collectionData.primaryimageurl ? (
          <img
            src={collectionData.primaryimageurl}
            alt={`${artworkDescription}${
              collectionData.date ? `, ${collectionData.date}` : ''
            }`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : collectionData.images?.[0]?.baseimageurl ? (
          <img
            src={collectionData.images[0].baseimageurl}
            alt={`${artworkDescription}${
              collectionData.date ? `, ${collectionData.date}` : ''
            }`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain rounded-lg bg-gray-800 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
            No image available
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2">
            <path d="M15 3h6v6M10 14l9-9M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-grow">
        {/* Title & Artist */}
        <header className="flex flex-col gap-1">
          <h3
            className="text-lg md:text-xl font-medium font-crimson italic tracking-tight group-hover:text-red-500 transition-colors"
            id={`artwork-title-${collectionData.id}`}>
            {collectionData.title || 'Untitled'}
          </h3>
          {collectionData.artist && (
            <p
              className="text-sm uppercase font-crimson font-medium text-gray-300 tracking-wide"
              aria-label={`Artist: ${collectionData.artist}`}>
              {collectionData.artist}
            </p>
          )}
        </header>

        {(collectionData.date ||
          collectionData.culture ||
          collectionData.medium) && (
          <section
            aria-labelledby={`artwork-title-${collectionData.id}`}
            className="mt-1">
            <dl className="flex flex-col gap-1 text-sm text-gray-400 font-crimson">
              {collectionData.date && <dd>{collectionData.date}</dd>}
              {collectionData.culture && <dd>{collectionData.culture}</dd>}
              {collectionData.medium && (
                <dd className="text-xs text-gray-500">
                  {collectionData.medium}
                </dd>
              )}
            </dl>
          </section>
        )}
      </div>

      <footer className="flex flex-col gap-2 mt-auto border-t border-gray-800/60 pt-3">
        {collectionData.department && (
          <p className="font-crimson font-light text-xs text-gray-500">
            {collectionData.department}
          </p>
        )}

        {collectionData.objectURL && (
          <a
            href={collectionData.objectURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-crimson font-medium text-sm text-red-400 hover:text-red-500 underline underline-offset-2 transition-colors">
            View at Museum →
          </a>
        )}
      </footer>

      <div className="flex justify-center">
        <FavouriteButton
          id={collectionData.id}
          title={collectionData.title}
          artist={collectionData.artist}
          date={collectionData.date}
          culture={collectionData.culture}
          medium={collectionData.medium}
          objectURL={collectionData.objectURL}
          primaryimageurl={collectionData.primaryimageurl}
          images={collectionData.images}
        />
      </div>
    </article>
  );
}
