import FavouriteButton from '../FavouriteButton';
import type { CollectionItemProps } from '@/app/lib/config/types';
//collection data for container??

// !todo need to make the col start prop increase?

export default function CollectionItem({
  collectionData,
}: CollectionItemProps) {
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
        <div
          className="relative w-full aspect-[4/3]"
          role="img"
          aria-label={artworkDescription}>
          {collectionData.primaryimageurl ? (
            <img
              src={collectionData?.primaryimageurl}
              alt={`${artworkDescription}${
                collectionData.date ? `, ${collectionData.date}` : ''
              }`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-gray-200 flex items-center justify-center">
              {collectionData.images?.[0]?.baseimageurl ? (
                <img
                  src={collectionData.images[0].baseimageurl}
                  alt={`${artworkDescription}${
                    collectionData.date ? `, ${collectionData.date}` : ''
                  }`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <div className="text-gray-500" aria-label="No image available">
                  No image available
                </div>
              )}
            </div>
          )}
        </div>

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
