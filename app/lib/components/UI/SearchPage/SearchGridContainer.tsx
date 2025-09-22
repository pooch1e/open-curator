import SearchGridItem from './SearchGridItem';
export default function SearchGridContainer({ results }) {
  return (
    <section className="pt-6 md:pt-10 gap-6 md:gap-10">
      <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-12 sm:gap-x-4 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6">
        {results.map((item) => {
          return (
            <SearchGridItem key={item.id} type={item.type} title={item.title} />
          );
        })}
      </div>
    </section>
  );
}
