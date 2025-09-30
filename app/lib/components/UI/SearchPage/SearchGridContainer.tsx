import SearchGridItem from './SearchGridItem';
export default function SearchGridContainer({ results }: any) {
  return (
    <section className="pt-6 md:pt-10 gap-6 md:gap-10">
      <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-12 sm:gap-x-4 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6">
        {results.map((item: any) => {
          return (
            <SearchGridItem
              key={item.id}
              title={item.title}
              artist={item.artist}
              date={item.dated}
              medium={item.medium}
              objectURL={item.url}
              period={item.period}
              description={item.description}
              culture={item.culture}
              images={item?.images}
            />
          );
        })}
      </div>
    </section>
  );
}
