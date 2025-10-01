import CollectionItem from './CollectionItem';
interface collectionContainerProps {
  favourites: any[];
}
// !todo convert to useclient later
export default function CollectionContainer({
  favourites,
}: collectionContainerProps) {
  return (
    <section className="pt-6 md:pt-10 gap-6 md:gap-10">
      <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-12 sm:gap-x-4 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6">
        {favourites.map((item) => {
          return (
            <div key={item.id}>
              <CollectionItem
                collectionData={item}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
