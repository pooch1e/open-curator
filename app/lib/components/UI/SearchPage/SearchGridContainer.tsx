import SearchGridItem from './SearchGridItem';
import { useFavourites } from '@/app/lib/hooks/useFavourites';

export default function SearchGridContainer({ results }: any) {
  const favourites = useFavourites();

  const sortedResults = [...results].sort((a, b) => {
    const isAFavourite = favourites?.favourites?.some((fav) => fav.id === a.id);
    const isBFavourite = favourites?.favourites?.some((fav) => fav.id === b.id);

    if (isAFavourite && !isBFavourite) return -1;
    if (!isAFavourite && isBFavourite) return 1;
    return 0;
  });

  return (
    <section className="pt-6 md:pt-10 gap-6 md:gap-10" aria-label="Museum artworks collection" role="region">
      <h2 className="sr-only">Search Results</h2>
      <div 
        className="grid grid-cols-4 gap-x-4 sm:grid-cols-12 sm:gap-x-4 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6"
        role="list"
        aria-label={`${sortedResults.length} artworks found`}>
        {sortedResults.map((item: any) => {
          return (
            <SearchGridItem
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              date={item.dated}
              medium={item.medium}
              objectURL={item.objectURL}
              period={item.period}
              description={item.description}
              culture={item.culture}
              images={item?.images}
              primaryImageUrl={item.primaryimageurl}
            />
          );
        })}
      </div>
    </section>
  );
}
