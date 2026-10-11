/**
 * SearchBar — large search input with a submit button and loading state.
 */
interface SearchBarProps {
  searchQuery: string;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SEARCH_INPUT_ID = 'museum-search';
const SEARCH_DESCRIPTION_ID = 'search-description';

export default function SearchBar({
  searchQuery,
  onQueryChange,
  onSubmit,
  isLoading,
}: SearchBarProps) {
  return (
    <form
      role="search"
      className="relative w-full min-w-[200px]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
        Search museum collections by title, artist, or medium
      </label>
      <input
        id={SEARCH_INPUT_ID}
        type="text"
        className="w-full h-36 bg-transparent font-serif placeholder:text-6xl placeholder:text-white text-white text-6xl border border-red-700 rounded-md pl-3 pr-28 py-4 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow"
        value={searchQuery}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search Art"
        aria-describedby={SEARCH_DESCRIPTION_ID}
      />
      <p id={SEARCH_DESCRIPTION_ID} className="sr-only">
        Typing filters the artworks shown. Press Enter or the search button to
        search the full collection.
      </p>
      <button
        type="submit"
        disabled={isLoading}
        className="absolute h-34 top-1 right-1 flex items-center justify-center rounded w-1/6 py-3 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        aria-label={isLoading ? 'Searching collections' : 'Search collections'}>
        {isLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Searching...</span>
          </div>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21L16.65 16.65" />
          </svg>
        )}
      </button>
    </form>
  );
}
