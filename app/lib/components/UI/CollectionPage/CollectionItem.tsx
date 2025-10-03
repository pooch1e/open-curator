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
  console.log(collectionData.artist, 'what am i in collection Item component');
  
  return (
    <div className="flex h-min grow flex-col gap-5 p-2 border-2  ">
      {/* Hero Image */}
      <div
        id="hero"
        className="relative w-full aspect-4/3  object-contain md:aspect-video pb-[75%] md:pb-[56.25%]">
        <div className="absolute size-full object-fill">
          {collectionData.primaryimageurl ? (
            <img
              src={collectionData.primaryimageurl}
              alt={collectionData.title || 'Artwork'}
              loading="lazy"
              className="relative h-full w-full inset-0 object-cover"
            />
          ) : (
            <div className="absolute h-full w-full inset-0 bg-gray-200 flex items-center justify-center">
              <img
                src={collectionData.images?.baseimageurl}
                alt={collectionData.title || 'Artwork'}
                loading="lazy"
                className="absolute h-full w-full inset-0 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <h3 className="h5 w-full">{collectionData.title || 'Untitled'}</h3>
            {collectionData.artist && (
              <h4 className="h6 uppercase">{collectionData.artist}</h4>
            )}
          </div>

          {/* Metadata List */}
          <ul className="text-primary relative flex flex-wrap gap-2">
            {collectionData.date && (
              <li className="flex items-center gap-2 text-base uppercase">
                {collectionData.date}
              </li>
            )}
            {collectionData.culture && (
              <li className="flex items-center gap-2 text-base uppercase">
                <span
                  className="flex items-center justify-center"
                  aria-hidden="true">
                  •
                </span>
                {collectionData.culture}
              </li>
            )}
            {collectionData.medium && (
              <li className="flex items-center gap-2 text-base">
                <span
                  className="flex items-center justify-center"
                  aria-hidden="true">
                  •
                </span>
                {collectionData.medium}
              </li>
            )}
          </ul>
        </div>
      </div>
      {collectionData.department && (
        <div className="text-primary flex flex-col justify-end grow">
          <p className="font-sans">{collectionData.department}</p>
        </div>
      )}
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
  );
}
