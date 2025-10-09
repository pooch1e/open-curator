import FavouriteButton from '../FavouriteButton';

//collection data for container??
interface CollectionItem {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture?: string | null;
  medium?: string | null;
  department?: string | null;
  primaryimageurl?: string | null;
  objectURL?: string | null;
  images?: any[];
}
// !todo need to make the col start prop increase?
interface CollectionItemProps {
  collectionData: CollectionItem;
}
export default function CollectionItem({
  collectionData,
}: CollectionItemProps) {
  console.log(collectionData.objectURL, 'what am i in collection Item component');

  const artworkDescription = `${collectionData.title || 'Untitled artwork'}${
    collectionData.artist ? ` by ${collectionData.artist}` : ''
  }`;

  return (
    <>
      <article
        className="flex h-min grow flex-col gap-5 p-2 border-2"
        role="listitem">
        {/* Hero Image */}
        <div
          className="relative w-full aspect-4/3 object-contain md:aspect-video pb-[75%] md:pb-[56.25%]"
          role="img"
          aria-label={artworkDescription}>
          <div className="absolute size-full object-fill">
            {collectionData.primaryimageurl ? (
              <img
                src={collectionData.primaryimageurl}
                alt={`${artworkDescription}${
                  collectionData.date ? `, ${collectionData.date}` : ''
                }`}
                loading="lazy"
                className="relative h-full w-full inset-0 object-cover"
              />
            ) : (
              <div className="absolute h-full w-full inset-0 bg-gray-200 flex items-center justify-center">
                {collectionData.images?.[0]?.baseimageurl ? (
                  <img
                    src={collectionData.images[0].baseimageurl}
                    alt={`${artworkDescription}${
                      collectionData.date ? `, ${collectionData.date}` : ''
                    }`}
                    loading="lazy"
                    className="absolute h-full w-full inset-0 object-contain"
                  />
                ) : (
                  <div
                    className="text-gray-500"
                    aria-label="No image available">
                    No image available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-start justify-between gap-4">
          <div className="flex w-full flex-col gap-2">
            <header className="flex flex-col">
              <h3
                className="h5 w-full"
                id={`artwork-title-${collectionData.id}`}>
                {collectionData.title || 'Untitled'}
              </h3>
              {collectionData.artist && (
                <p
                  className="h6 uppercase"
                  aria-label={`Artist: ${collectionData.artist}`}>
                  {collectionData.artist}
                </p>
              )}
            </header>

            {/* Metadata List */}
            <dl
              className="text-primary relative flex flex-wrap gap-2"
              aria-labelledby={`artwork-title-${collectionData.id}`}>
              {collectionData.date && (
                <div className="flex items-center gap-2 text-base uppercase">
                  <dt className="sr-only">Date:</dt>
                  <dd>{collectionData.date}</dd>
                </div>
              )}
              {collectionData.culture && (
                <div className="flex items-center gap-2 text-base uppercase">
                  <span
                    className="flex items-center justify-center"
                    aria-hidden="true">
                    •
                  </span>
                  <dt className="sr-only">Culture:</dt>
                  <dd>{collectionData.culture}</dd>
                </div>
              )}
              {collectionData.medium && (
                <div className="flex items-center gap-2 text-base">
                  <span
                    className="flex items-center justify-center"
                    aria-hidden="true">
                    •
                  </span>
                  <dt className="sr-only">Medium:</dt>
                  <dd>{collectionData.medium}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        {collectionData.department && (
          <div className="text-primary flex flex-col justify-end grow">
            <p className="font-sans">
              <span className="sr-only">Department: </span>
              {collectionData.department}
            </p>
          </div>
        )}
        <div>
          {collectionData.objectURL && (
            <div className="text-primary flex flex-col justify-end grow">
              <a
                href={collectionData.objectURL ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-primary underline break-all">
                <span className="sr-only">Link to Artwork: </span>
                <p>Link to artwork</p>
              </a>
            </div>
          )}
        </div>
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
