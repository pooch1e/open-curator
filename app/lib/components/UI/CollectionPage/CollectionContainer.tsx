import ClearAllFavouritesButton from '../ClearAllFavouritesButton';
import CollectionItem from './CollectionItem';
interface collectionContainerProps {
  favourites: any[];
}
// !todo convert to useclient later
export default function CollectionContainer({
  favourites,
}: collectionContainerProps) {
  return (
    <section className="py-8 px-4 md:py-12" aria-labelledby="collection-heading" role="region">
      <div className='p-2'>
        <ClearAllFavouritesButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 id="collection-heading" className="text-2xl md:text-3xl font-bold text-white mb-6">
          My Collection 
          <span aria-label={`${favourites.length} items in collection`}>({favourites.length})</span>
        </h1>

        {favourites.length === 0 ? (
          <p className="text-white" aria-live="polite">Your collection is empty. Add artworks to see them here.</p>
        ) : (
          <div 
            className="grid grid-cols-4 gap-x-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            role="list"
            aria-label={`Collection of ${favourites.length} artworks`}>
            {favourites.map((item) => (
              <CollectionItem key={item.id} collectionData={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
