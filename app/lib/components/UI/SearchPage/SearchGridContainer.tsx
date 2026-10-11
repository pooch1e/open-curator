/**
 * SearchGridContainer — list of search result cards.
 */
import SearchGridItem from './SearchGridItem';
import type { MuseumItem } from '@/app/lib/types';
import { getItemKey } from '@/app/lib/utils/museumItem';

export default function SearchGridContainer({
  results,
}: {
  results: MuseumItem[];
}) {
  return (
    <section className="pt-6 md:pt-10" aria-labelledby="search-results-heading">
      <h2 id="search-results-heading" className="sr-only">
        Search Results
      </h2>
      <ul className="flex flex-col gap-6 md:gap-10">
        {results.map((item) => (
          <SearchGridItem key={getItemKey(item)} item={item} />
        ))}
      </ul>
    </section>
  );
}
