import FavouriteButton from '../FavouriteButton'
import Tooltip from '../Tooltip/Tooltip'
import type { CollectionItemProps } from '@/app/lib/config/types'

interface ExtendedCollectionItemProps extends CollectionItemProps {
  onImageClick?: () => void
}

export default function CollectionItem({
  collectionData,
  onImageClick,
}: ExtendedCollectionItemProps) {
  console.log(
    collectionData.objectURL,
    'what am i in collection Item component'
  );

  const artworkDescription = `${collectionData.title || 'Untitled artwork'}${
    collectionData.artist ? ` by ${collectionData.artist}` : ''
  }`;

  return (
    <>
      <article
        className="flex h-full flex-col gap-5 p-2 border-2"
        role="listitem">
        {/* Hero Image */}
        <Tooltip
          content={
            <div className="text-center">
              <p className="font-medium font-crimson mb-1">
                {collectionData.title || 'Untitled'}
              </p>
              {collectionData.artist && (
                <p className="text-xs font-light font-crimson text-gray-300">
                  by {collectionData.artist}
                </p>
              )}
              <p className="text-xs font-light font-crimson text-gray-400 mt-1">
                Click to view fullscreen
              </p>
            </div>
          }
        >
          <div
            className="relative w-full aspect-[4/3] cursor-pointer transition-transform duration-200 hover:scale-105"
            role="img"
            aria-label={artworkDescription}
            onClick={onImageClick}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200 z-10 rounded-lg" />
            
            {collectionData.primaryimageurl ? (
              <img
                src={collectionData?.primaryimageurl}
                alt={`${artworkDescription}${
                  collectionData.date ? `, ${collectionData.date}` : ''
                }`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="absolute inset-0 h-full w-full bg-gray-200 flex items-center justify-center rounded-lg">
                {collectionData.images?.[0]?.baseimageurl ? (
                  <img
                    src={collectionData.images[0].baseimageurl}
                    alt={`${artworkDescription}${
                      collectionData.date ? `, ${collectionData.date}` : ''
                    }`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500" aria-label="No image available">
                    No image available
                  </div>
                )}
              </div>
            )}
            
            {/* Click indicator */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="15 3h6v6M10 14l9-9M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7"/>
              </svg>
            </div>
          </div>
        </Tooltip>

        {/* Main */}
        <div className="flex flex-col gap-4 flex-grow">
          {/* Title Artist */}
          <header className="flex flex-col gap-2">
            <h3
              className="text-lg w-full font-medium font-crimson"
              id={`artwork-title-${collectionData.id}`}>
              {collectionData.title || 'Untitled'}
            </h3>
            {collectionData.artist && (
              <p
                className="text-sm uppercase font-crimson font-medium"
                aria-label={`Artist: ${collectionData.artist}`}>
                {collectionData.artist}
              </p>
            )}
          </header>

          {/* Metadata Section */}
          {(collectionData.date ||
            collectionData.culture ||
            collectionData.medium) && (
            <section aria-labelledby={`artwork-title-${collectionData.id}`}>
              <dl className="text-primary flex flex-col gap-1">
                {collectionData.date && (
                  <div className="flex items-center gap-2 text-sm">
                    <dd className="uppercase font-crimson font-light">{collectionData.date}</dd>
                  </div>
                )}
                {collectionData.culture && (
                  <div className="flex items-center gap-2 text-sm">
                    <dd className="uppercase font-crimson font-light">{collectionData.culture}</dd>
                  </div>
                )}
                {collectionData.medium && (
                  <div className="flex items-center gap-2 text-sm">
                    <dd className="font-crimson font-light text-xs">{collectionData.medium}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-2 mt-auto border-t pt-3">
          {collectionData.department && (
            <div className="text-primary">
              <p className="font-crimson font-light text-xs text-gray-400">
                {collectionData.department}
              </p>
            </div>
          )}
          {collectionData.objectURL && (
            <div className="text-primary">
              <a
                href={collectionData.objectURL ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-crimson font-normal text-sm text-red-400 underline hover:no-underline transition-all">
                View at Museum
              </a>
            </div>
          )}
        </footer>
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
      </article>
    </>
  );
}
