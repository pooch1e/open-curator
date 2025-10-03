import CollectionItem from './CollectionItem';
interface collectionContainerProps {
  favourites: any[];
}
// !todo convert to useclient later
export default function CollectionContainer({
  favourites,
}: collectionContainerProps) {
  return (
    <section className="py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          My Collection ({favourites.length})
        </h1>

        <div className="grid grid-cols-4 gap-x-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favourites.map((item) => (
            <CollectionItem key={item.id} collectionData={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
